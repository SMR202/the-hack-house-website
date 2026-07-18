import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRegistrationRateLimit } from "@/lib/rate-limit";
import { getWriteClient } from "@/sanity/lib/write-client";

const MAX_BODY_BYTES = 12_000;
const sources = [
  "",
  "A friend or family member",
  "Instagram",
  "Facebook",
  "Google search",
  "School newsletter",
  "Other",
] as const;

const registrationSchema = z
  .object({
    participantName: z.string().trim().min(2).max(100),
    participantAge: z.string().trim().regex(/^(?:[1-9]|[1-9][0-9])$/),
    contactName: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(160).transform((value) => value.toLowerCase()),
    whatsapp: z
      .string()
      .trim()
      .min(7)
      .max(30)
      .refine((value) => {
        const digitCount = value.replace(/\D/g, "").length;
        return digitCount >= 7 && digitCount <= 15;
      }),
    owner: z.enum(["hack-house", "haven-autism", "haven-montessori"]),
    programId: z.string().trim().min(1).max(120),
    source: z.enum(sources).optional().default(""),
    notes: z.string().trim().max(1200).optional().default(""),
    consent: z.literal(true),
    website: z.string().max(0).optional().default(""),
  })
  .strict();

function jsonResponse(
  body: { error: string } | { reference: string },
  status: number,
  headers?: Record<string, string>,
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function hasAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";

  try {
    const originUrl = new URL(origin);
    if (!["http:", "https:"].includes(originUrl.protocol)) return false;

    const allowedHosts = new Set([
      new URL(request.url).host,
      request.headers.get("host"),
      request.headers.get("x-forwarded-host")?.split(",")[0]?.trim(),
      process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).host : undefined,
      process.env.VERCEL_PROJECT_PRODUCTION_URL,
      process.env.VERCEL_URL,
    ].filter((value): value is string => Boolean(value)));

    return allowedHosts.has(originUrl.host);
  } catch {
    return false;
  }
}

function getRateLimitKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  const userAgent = request.headers.get("user-agent")?.slice(0, 120) || "unknown";
  return `${ip}:${userAgent}`;
}

export async function POST(request: Request) {
  try {
    if (!hasAllowedOrigin(request)) {
      return jsonResponse({ error: "This request is not allowed." }, 403);
    }

    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return jsonResponse({ error: "Content type must be application/json." }, 415);
    }

    const contentLength = Number(request.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return jsonResponse({ error: "Request body is too large." }, 413);
    }

    const rateLimit = checkRegistrationRateLimit(getRateLimitKey(request));
    if (!rateLimit.allowed) {
      return jsonResponse(
        { error: "Too many requests. Please try again later." },
        429,
        { "Retry-After": String(rateLimit.retryAfterSeconds) },
      );
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return jsonResponse({ error: "Request body is too large." }, 413);
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return jsonResponse({ error: "Request body must be valid JSON." }, 400);
    }

    const payload = registrationSchema.safeParse(body);
    if (!payload.success) {
      return jsonResponse({ error: "Please check the form and try again." }, 400);
    }

    const program = await getWriteClient().fetch<{ title?: string; owner?: string } | null>(
      `*[_type == "program" && slug.current == $programId][0]{
        title,
        owner
      }`,
      { programId: payload.data.programId },
    );
    if (!program || program.owner !== payload.data.owner) {
      return jsonResponse({ error: "That program is no longer available." }, 400);
    }

    const document = await getWriteClient().create({
      _type: "registration",
      participantName: payload.data.participantName,
      participantAge: payload.data.participantAge,
      contactName: payload.data.contactName,
      email: payload.data.email,
      whatsapp: payload.data.whatsapp,
      owner: payload.data.owner,
      programId: payload.data.programId,
      programTitle: program.title,
      source: payload.data.source,
      notes: payload.data.notes,
      consent: payload.data.consent,
      submittedAt: new Date().toISOString(),
      status: "new",
    });

    return jsonResponse({ reference: document._id }, 201);
  } catch (error) {
    console.error("Registration submission failed", error);
    return jsonResponse({ error: "We could not submit your request. Please try WhatsApp instead." }, 500);
  }
}
