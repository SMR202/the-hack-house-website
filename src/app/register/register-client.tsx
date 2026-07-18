"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { Program, ProgramOwner, RegistrationPayload } from "@/types/sanity";
import { MessageCircle, ArrowRight, Phone, Mail, User, Heart, Info, AlertCircle, Loader2 } from "lucide-react";
import { Blob } from "@/components/brand";
import { programOwners } from "@/data/program-owners";

interface FormState {
  participantName: string;
  participantAge: string;
  contactName: string;
  email: string;
  whatsapp: string;
  owner: ProgramOwner | "";
  programId: string;
  source: string;
  notes: string;
  consent: boolean;
  website: string;
}

export default function RegisterClient({ programs }: { programs: Program[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const programParam = searchParams.get("program") ?? undefined;
  const preselected = programParam ? programs.find((program) => program.id === programParam) : undefined;

  const [form, setForm] = React.useState<FormState>({
    participantName: "",
    participantAge: "",
    contactName: "",
    email: "",
    whatsapp: "",
    owner: preselected?.owner ?? "",
    programId: preselected?.id ?? "",
    source: "",
    notes: "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormState, string>>>({});
  const [submitError, setSubmitError] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmitError("");
  };

  const availablePrograms = form.owner
    ? programs.filter((program) => program.owner === form.owner)
    : [];

  const validate = () => {
    const nextErrors: typeof errors = {};
    if (!form.participantName.trim()) nextErrors.participantName = "Please enter the participant name";
    if (!form.participantAge.trim()) nextErrors.participantAge = "Please enter the participant age";
    if (!form.contactName.trim()) nextErrors.contactName = "Please enter your name";
    if (!form.email.trim()) nextErrors.email = "Please enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "That doesn't look like a valid email";
    if (!form.whatsapp.trim()) nextErrors.whatsapp = "We'll need a WhatsApp number to send instructions";
    if (!form.owner) nextErrors.owner = "Please pick a program area";
    if (!form.programId) nextErrors.programId = "Please pick a program";
    if (!form.consent) nextErrors.consent = "Please confirm that we may contact you";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    if (!validate()) {
      document.querySelector("[data-error=true]")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      const payload: RegistrationPayload = {
        participantName: form.participantName,
        participantAge: form.participantAge,
        contactName: form.contactName,
        email: form.email,
        whatsapp: form.whatsapp,
        owner: form.owner as ProgramOwner,
        programId: form.programId,
        source: form.source,
        notes: form.notes,
        consent: form.consent,
        website: form.website,
      };
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { reference?: string; error?: string };
      if (!response.ok || !result.reference) throw new Error(result.error || "We could not submit your request.");
      router.push(`/register/success?ref=${encodeURIComponent(result.reference)}`);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not submit your request. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.96_0.04_55)] via-[oklch(0.96_0.02_188)] to-[oklch(0.96_0.02_195)] py-16 text-brand-teal md:py-20">
        <div className="absolute inset-0 bg-confetti-light opacity-50" />
        <Blob className="-left-24 top-0 h-80 w-80" color="white" opacity={0.15} />
        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-8">
          <h1 className="font-display text-4xl font-black md:text-5xl">
            Register or Enquire <span className="inline-block animate-bounce-soft">📝</span>
          </h1>
          <p className="mt-3 text-lg text-brand-teal/90">Choose a program area, pick a program, and we&apos;ll follow up on WhatsApp.</p>
        </div>
      </section>

      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-2xl px-6 md:px-8">
          {preselected && (
            <div className="mb-8 flex items-start gap-3 rounded-2xl border-2 border-primary/30 bg-primary/10 p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="text-sm text-brand-teal">
                <span className="font-display font-extrabold">Selected program: </span>
                {preselected.title}{preselected.ageLabel ? ` · ${preselected.ageLabel}` : ""}{preselected.dates ? ` · ${preselected.dates}` : ""}
              </div>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-10" noValidate>
            <input
              type="text"
              value={form.website}
              onChange={(event) => set("website", event.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <Section label="About the Participant" icon={<User className="h-4 w-4" />}>
              <Field label="Participant Full Name" required error={errors.participantName}>
                <input
                  value={form.participantName}
                  onChange={(event) => set("participantName", event.target.value)}
                  maxLength={100}
                  data-error={!!errors.participantName}
                  placeholder="e.g. Aisha Khan"
                  className={inputCls(!!errors.participantName)}
                />
              </Field>
              <Field label="Participant Age" required error={errors.participantAge}>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={form.participantAge}
                  onChange={(event) => set("participantAge", event.target.value)}
                  data-error={!!errors.participantAge}
                  placeholder="e.g. 8"
                  className={inputCls(!!errors.participantAge)}
                />
              </Field>
            </Section>

            <Section label="Parent or Guardian" icon={<Heart className="h-4 w-4" />}>
              <Field label="Contact Full Name" required error={errors.contactName}>
                <input
                  value={form.contactName}
                  onChange={(event) => set("contactName", event.target.value)}
                  maxLength={100}
                  data-error={!!errors.contactName}
                  placeholder="e.g. Sarah Khan"
                  className={inputCls(!!errors.contactName)}
                />
              </Field>
              <Field label="Email Address" required error={errors.email}>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-soft" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => set("email", event.target.value)}
                    maxLength={160}
                    data-error={!!errors.email}
                    placeholder="you@example.com"
                    className={inputCls(!!errors.email, "pl-11")}
                  />
                </div>
              </Field>
              <Field label="WhatsApp Number" required error={errors.whatsapp} helper="We'll send confirmation and next steps here.">
                <div className="relative">
                  <MessageCircle className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#25D366]" />
                  <input
                    type="tel"
                    value={form.whatsapp}
                    onChange={(event) => set("whatsapp", event.target.value)}
                    maxLength={30}
                    data-error={!!errors.whatsapp}
                    placeholder="+92 300 1234567"
                    className={inputCls(!!errors.whatsapp, "pl-11")}
                  />
                </div>
              </Field>
            </Section>

            <Section label="Program Details" icon={<Phone className="h-4 w-4" />}>
              <Field label="Program Area" required error={errors.owner}>
                <select
                  value={form.owner}
                  onChange={(event) => {
                    set("owner", event.target.value as ProgramOwner | "");
                    set("programId", "");
                  }}
                  data-error={!!errors.owner}
                  className={inputCls(!!errors.owner)}
                >
                  <option value="">Select a program area</option>
                  {programOwners.map((owner) => <option key={owner.id} value={owner.id}>{owner.title}</option>)}
                </select>
              </Field>
              <Field label="Program" required error={errors.programId}>
                <select
                  value={form.programId}
                  onChange={(event) => set("programId", event.target.value)}
                  data-error={!!errors.programId}
                  className={inputCls(!!errors.programId)}
                >
                  <option value="">Select a program</option>
                  {availablePrograms.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.title}{program.ageLabel ? ` · ${program.ageLabel}` : ""}{program.price ? ` · ${program.price}` : ""}
                    </option>
                  ))}
                </select>
              </Field>
            </Section>

            <Section label="Anything Else?" icon={<Info className="h-4 w-4" />}>
              <Field label="How did you hear about us?">
                <select value={form.source} onChange={(event) => set("source", event.target.value)} className={inputCls(false)}>
                  <option value="">Select an option</option>
                  <option>A friend or family member</option>
                  <option>Instagram</option>
                  <option>Facebook</option>
                  <option>Google search</option>
                  <option>School newsletter</option>
                  <option>Other</option>
                </select>
              </Field>
              <Field label="Additional notes">
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(event) => set("notes", event.target.value)}
                  maxLength={1200}
                  placeholder="Anything else you'd like us to know?"
                  className={inputCls(false)}
                />
              </Field>
              <label className="flex items-start gap-3 text-sm text-brand-teal">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) => set("consent", event.target.checked)}
                  data-error={!!errors.consent}
                  className="mt-1 h-4 w-4 accent-[var(--color-primary)]"
                />
                <span>I agree that The Hack House may contact me about this request.</span>
              </label>
              {errors.consent && <span className="block text-xs font-semibold text-destructive">{errors.consent}</span>}
            </Section>

            {submitError && (
              <div className="flex items-start gap-3 rounded-2xl border-2 border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive" role="alert">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-6 py-4 font-display text-base font-extrabold text-brand-orange-foreground shadow-glow-orange transition-transform hover:scale-[1.01] disabled:cursor-wait disabled:opacity-70"
            >
              {submitting ? <><Loader2 className="h-5 w-5 animate-spin" /> Submitting...</> : <>Submit Request <ArrowRight className="h-5 w-5" /></>}
            </button>
            <p className="flex items-center justify-center gap-2 text-center text-xs text-text-soft">
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              After submitting, we&apos;ll send confirmation and next steps to your WhatsApp number.
            </p>
            <p className="text-center text-xs text-text-soft">
              Prefer to chat first? <Link href="/" className="font-bold text-primary hover:underline">Back to home</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

function Section({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft md:p-8">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-display text-xs font-extrabold uppercase tracking-wider text-primary">
        {icon}{label}
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Field({ label, required, error, helper, children }: { label: string; required?: boolean; error?: string; helper?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-display text-sm font-extrabold text-brand-teal">
        {label}{required && <span className="ml-1 text-brand-orange">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {error ? <span className="mt-1.5 block text-xs font-semibold text-destructive">{error}</span> : helper ? <span className="mt-1.5 block text-xs text-text-soft">{helper}</span> : null}
    </label>
  );
}

function inputCls(error: boolean, extra = "") {
  return [
    "w-full rounded-2xl border-2 bg-background px-4 py-3 text-base text-brand-teal transition-all placeholder:text-text-soft/70 focus:outline-none",
    error ? "border-destructive focus:ring-4 focus:ring-destructive/20" : "border-brand-mint focus:border-primary focus:ring-4 focus:ring-primary/20",
    extra,
  ].filter(Boolean).join(" ");
}
