"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, MessageCircle, ArrowRight } from "lucide-react";
import type { Program } from "@/types/sanity";
import { ProgramCard } from "@/components/program-card";

const seeded = (value: number) => {
  const result = Math.sin(value * 999) * 43758.5453;
  return result - Math.floor(result);
};

const confettiBits = Array.from({ length: 32 }).map((_, i) => ({
  id: i,
  left: seeded(i + 1) * 100,
  cx: (seeded(i + 33) - 0.5) * 600,
  cy: 200 + seeded(i + 65) * 400,
  cr: (seeded(i + 97) - 0.5) * 720,
  color: ["#29B8B0", "#E8873A", "#FFD166", "#FF8FAB", "#FFFFFF"][i % 5],
  delay: seeded(i + 129) * 0.4,
  size: 6 + seeded(i + 161) * 8,
}));

export default function SuccessPageClient({ programs, whatsapp }: { programs: Program[]; whatsapp?: string }) {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref") ?? undefined;
  const whatsappHref = whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, "")}` : null;

  const suggested = programs.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-20">
      {/* Confetti burst */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {confettiBits.map((c) => (
          <span
            key={c.id}
            className="absolute top-32 animate-confetti rounded-sm"
            style={{
              left: `${c.left}%`,
              width: c.size,
              height: c.size * 1.4,
              backgroundColor: c.color,
              animationDelay: `${c.delay}s`,
              ["--cx" as string]: `${c.cx}px`,
              ["--cy" as string]: `${c.cy}px`,
              ["--cr" as string]: `${c.cr}deg`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-2xl px-6 text-center md:px-8">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-glow-teal animate-check-pop">
          <svg viewBox="0 0 52 52" className="h-12 w-12">
            <path
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="60"
              className="animate-check-draw"
              d="M14 27 l8 8 l16 -16"
            />
          </svg>
        </div>

        <h1 className="mt-6 font-display text-4xl font-black text-brand-teal md:text-5xl">
          You&apos;re All Set! 🎉
        </h1>
        <p className="mt-3 text-lg text-text-soft">
          We&apos;ve received your request.
        </p>

        {/* Summary card */}
        <div className="mt-10 rounded-3xl bg-white p-6 text-left shadow-lift md:p-8">
          <div className="font-display text-xs font-extrabold uppercase tracking-wider text-primary">
            Your request
          </div>
          <div className="mt-3 grid gap-3">
            <Row icon={<Check className="h-4 w-4" />} label="Status" value="Request received" />
            {reference && <Row icon={<Check className="h-4 w-4" />} label="Reference" value={reference} />}
          </div>
        </div>

        {/* Payment instructions */}
        <div className="mt-6 rounded-3xl bg-[#25D366]/10 p-6 text-left ring-2 ring-[#25D366]/30 md:p-8">
          <h2 className="font-display text-xl font-extrabold text-brand-teal">
            One Last Step
          </h2>
          <ol className="mt-4 space-y-2.5 text-sm text-brand-teal">
            <Step n={1}>Our team will review your request</Step>
            <Step n={2}>We&apos;ll confirm availability and pricing on WhatsApp</Step>
            <Step n={3}>Send any requested payment confirmation there to lock your booking</Step>
          </ol>
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-display text-base font-extrabold text-white shadow-soft transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="h-5 w-5" /> Open WhatsApp <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>

        <Link href="/" className="mt-8 inline-block font-display text-sm font-bold text-primary hover:underline">
          ← Back to home
        </Link>
      </div>

      {suggested.length > 0 && <div className="mx-auto mt-16 max-w-7xl px-6 md:px-8">
        <h2 className="font-display text-2xl font-extrabold text-brand-teal text-center">
          While you wait, check out more offerings
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {suggested.map((p) => (
            <ProgramCard key={p.id} program={p} />
          ))}
        </div>
      </div>}
    </section>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-mint text-primary">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-display font-extrabold uppercase tracking-wider text-text-soft">{label}</div>
        <div className="font-semibold text-brand-teal">{value}</div>
      </div>
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#25D366] font-display text-xs font-extrabold text-white">
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}
