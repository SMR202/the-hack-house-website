"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { Program, AgeGroupId, ProgramSectionId } from "@/types/sanity";
import { MessageCircle, ArrowRight, Phone, Mail, User, Heart, Info } from "lucide-react";
import { Blob } from "@/components/brand";
import { getParticipantKind, getProgramSectionId, programSections, sectionById } from "@/data/sections";

interface FormState {
  childName: string;
  childAge: string;
  medical: string;
  parentName: string;
  email: string;
  whatsapp: string;
  section: ProgramSectionId | "";
  ageGroup: AgeGroupId | "";
  programId: string;
  source: string;
  notes: string;
}

export default function RegisterClient({ programs }: { programs: Program[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const programParam = searchParams.get("program") ?? undefined;

  const preselected = programParam ? programs.find((p) => p.id === programParam) : undefined;

  const [form, setForm] = React.useState<FormState>({
    childName: "",
    childAge: "",
    medical: "",
    parentName: "",
    email: "",
    whatsapp: "",
    section: preselected ? getProgramSectionId(preselected) : "",
    ageGroup: preselected?.ageGroup ?? "",
    programId: preselected?.id ?? "",
    source: "",
    notes: "",
  });
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormState, string>>>({});

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const selectedProgram = programs.find((p) => p.id === form.programId);
  const selectedSection = form.section ? sectionById[form.section] : undefined;
  const participantKind = selectedProgram
    ? getParticipantKind(selectedProgram)
    : selectedSection?.participantKind ?? "child";
  const isEvent = participantKind === "event";
  const isAdult = participantKind === "adult";

  const availablePrograms = programs.filter((p) => {
    const matchesSection = form.section === "" || getProgramSectionId(p) === form.section;
    const matchesAge = isEvent || isAdult || form.ageGroup === "" || p.ageGroup === form.ageGroup;
    return matchesSection && matchesAge;
  });

  const validate = () => {
    const e: typeof errors = {};
    if (!form.childName.trim()) e.childName = isEvent ? "Please enter an event name" : "Please enter the participant name";
    if (!form.childAge.trim()) e.childAge = isEvent ? "Please enter expected guests" : "Please enter the participant age";
    if (!form.parentName.trim()) e.parentName = "Please enter your name";
    if (!form.email.trim()) e.email = "Please enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "That doesn't look like a valid email";
    if (!form.whatsapp.trim()) e.whatsapp = "We'll need a WhatsApp number to send instructions";
    if (!form.section) e.section = "Please pick a section";
    if (!form.programId) e.programId = "Please pick an offering";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      const firstErr = document.querySelector("[data-error=true]");
      firstErr?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const program = programs.find((p) => p.id === form.programId);
    const params = new URLSearchParams();
    if (form.childName) params.set("child", form.childName);
    if (program?.title) params.set("program", program.title);
    if (program?.dates) params.set("dates", program.dates);
    if (form.whatsapp) params.set("whatsapp", form.whatsapp);
    router.push(`/register/success?${params.toString()}`);
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
          <p className="mt-3 text-lg text-brand-teal/90">Choose a section, pick an offering, and we&apos;ll follow up on WhatsApp.</p>
        </div>
      </section>

      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-2xl px-6 md:px-8">
          {preselected && (
            <div className="mb-8 flex items-start gap-3 rounded-2xl border-2 border-primary/30 bg-primary/10 p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="text-sm text-brand-teal">
                <span className="font-display font-extrabold">Selected offering: </span>
                {preselected.title} · {preselected.ageLabel} · {preselected.dates}
              </div>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-10">
            <Section
              label={isEvent ? "Event Details" : isAdult ? "Participant Details" : "About Your Child"}
              icon={<User className="h-4 w-4" />}
            >
              <Field
                label={isEvent ? "Event Name" : isAdult ? "Participant Full Name" : "Child's Full Name"}
                required
                error={errors.childName}
              >
                <input
                  value={form.childName}
                  onChange={(e) => set("childName", e.target.value)}
                  data-error={!!errors.childName}
                  placeholder={isEvent ? "e.g. Zoya's Birthday" : isAdult ? "e.g. Aisha Khan" : "e.g. Lily Chen"}
                  className={inputCls(!!errors.childName)}
                />
              </Field>
              <Field label={isEvent ? "Expected Guests" : isAdult ? "Participant Age" : "Child's Age"} required error={errors.childAge}>
                <input
                  type="number"
                  min={isEvent ? 1 : 1}
                  max={isEvent ? 300 : 99}
                  value={form.childAge}
                  onChange={(e) => set("childAge", e.target.value)}
                  data-error={!!errors.childAge}
                  placeholder={isEvent ? "e.g. 35" : isAdult ? "e.g. 28" : "e.g. 8"}
                  className={inputCls(!!errors.childAge)}
                />
              </Field>
              <Field
                label={isEvent ? "Event Requirements" : "Medical Conditions / Special Needs"}
                helper={isEvent ? "Food, decor, timing, or setup notes. Optional." : "This helps us provide the best care. Optional."}
              >
                <textarea
                  rows={3}
                  value={form.medical}
                  onChange={(e) => set("medical", e.target.value)}
                  placeholder={isEvent ? "Theme, food preferences, decor notes..." : "Allergies, dietary needs, anything we should know..."}
                  className={inputCls(false)}
                />
              </Field>
            </Section>

            <Section label={isEvent || isAdult ? "Contact Details" : "Parent or Guardian"} icon={<Heart className="h-4 w-4" />}>
              <Field label={isEvent || isAdult ? "Contact Full Name" : "Parent Full Name"} required error={errors.parentName}>
                <input
                  value={form.parentName}
                  onChange={(e) => set("parentName", e.target.value)}
                  data-error={!!errors.parentName}
                  placeholder="e.g. Sarah Chen"
                  className={inputCls(!!errors.parentName)}
                />
              </Field>
              <Field label="Email Address" required error={errors.email}>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-soft" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    data-error={!!errors.email}
                    placeholder="you@example.com"
                    className={inputCls(!!errors.email, "pl-11")}
                  />
                </div>
              </Field>
              <Field
                label="WhatsApp Number"
                required
                error={errors.whatsapp}
                helper="We'll send confirmation and next steps here."
              >
                <div className="relative">
                  <MessageCircle className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#25D366]" />
                  <input
                    type="tel"
                    value={form.whatsapp}
                    onChange={(e) => set("whatsapp", e.target.value)}
                    data-error={!!errors.whatsapp}
                    placeholder="+1 (555) 555-5555"
                    className={inputCls(!!errors.whatsapp, "pl-11")}
                  />
                </div>
              </Field>
            </Section>

            <Section label="Offering Details" icon={<Phone className="h-4 w-4" />}>
              <Field label="Section" required error={errors.section}>
                <select
                  value={form.section}
                  onChange={(e) => {
                    const v = e.target.value as ProgramSectionId | "";
                    set("section", v);
                    set("ageGroup", "");
                    set("programId", "");
                  }}
                  data-error={!!errors.section}
                  className={inputCls(!!errors.section)}
                >
                  <option value="">Select a section</option>
                  {programSections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.title}
                    </option>
                  ))}
                </select>
              </Field>
              {!isEvent && !isAdult && (
                <Field label="Age Group">
                  <select
                    value={form.ageGroup}
                    onChange={(e) => {
                      const v = e.target.value as AgeGroupId | "";
                      set("ageGroup", v);
                      set("programId", "");
                    }}
                    className={inputCls(false)}
                  >
                    <option value="">Any age group</option>
                    <option value="ages-6-9">Ages 6–9</option>
                    <option value="ages-10-13">Ages 10–13</option>
                    <option value="ages-14-plus">Ages 14+</option>
                  </select>
                </Field>
              )}
              <Field label="Offering" required error={errors.programId}>
                <select
                  value={form.programId}
                  onChange={(e) => set("programId", e.target.value)}
                  data-error={!!errors.programId}
                  className={inputCls(!!errors.programId)}
                >
                  <option value="">Select an offering</option>
                  {availablePrograms.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} · {p.ageLabel} · {p.price}
                    </option>
                  ))}
                </select>
              </Field>
            </Section>

            <Section label="Anything Else?" icon={<Info className="h-4 w-4" />}>
              <Field label="How did you hear about us?">
                <select
                  value={form.source}
                  onChange={(e) => set("source", e.target.value)}
                  className={inputCls(false)}
                >
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
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Anything else you'd like us to know?"
                  className={inputCls(false)}
                />
              </Field>
            </Section>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-6 py-4 font-display text-base font-extrabold text-brand-orange-foreground shadow-glow-orange transition-transform hover:scale-[1.01]"
            >
              Submit Request <ArrowRight className="h-5 w-5" />
            </button>
            <p className="flex items-center justify-center gap-2 text-center text-xs text-text-soft">
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              After submitting, we&apos;ll send confirmation and next steps to your WhatsApp number.
            </p>

            <p className="text-center text-xs text-text-soft">
              Prefer to chat first?{" "}
              <Link href="/" className="font-bold text-primary hover:underline">
                Back to home
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

function Section({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft md:p-8">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-display text-xs font-extrabold uppercase tracking-wider text-primary">
        {icon}
        {label}
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  helper,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block font-display text-sm font-extrabold text-brand-teal">
        {label}
        {required && <span className="ml-1 text-brand-orange">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <span className="mt-1.5 block text-xs font-semibold text-destructive">{error}</span>
      ) : helper ? (
        <span className="mt-1.5 block text-xs text-text-soft">{helper}</span>
      ) : null}
    </label>
  );
}

function inputCls(error: boolean, extra = "") {
  return [
    "w-full rounded-2xl border-2 bg-background px-4 py-3 text-base text-brand-teal transition-all placeholder:text-text-soft/70 focus:outline-none",
    error ? "border-destructive focus:ring-4 focus:ring-destructive/20" : "border-brand-mint focus:border-primary focus:ring-4 focus:ring-primary/20",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}
