import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Calendar, MessageCircle, ArrowRight, User } from "lucide-react";
import { programs } from "@/data/programs";
import { ProgramCard } from "@/components/program-card";

interface SuccessSearch {
  child?: string;
  program?: string;
  dates?: string;
  whatsapp?: string;
}

export const Route = createFileRoute("/register/success")({
  head: () => ({
    meta: [
      { title: "You're All Set! · The Hack House" },
      { name: "description", content: "Registration received. Complete your payment to confirm your spot." },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (s): SuccessSearch => ({
    child: typeof s.child === "string" ? s.child : undefined,
    program: typeof s.program === "string" ? s.program : undefined,
    dates: typeof s.dates === "string" ? s.dates : undefined,
    whatsapp: typeof s.whatsapp === "string" ? s.whatsapp : undefined,
  }),
  component: SuccessPage,
});

const confettiBits = Array.from({ length: 32 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  cx: (Math.random() - 0.5) * 600,
  cy: 200 + Math.random() * 400,
  cr: (Math.random() - 0.5) * 720,
  color: ["#29B8B0", "#E8873A", "#FFD166", "#FF8FAB", "#FFFFFF"][i % 5],
  delay: Math.random() * 0.4,
  size: 6 + Math.random() * 8,
}));

function SuccessPage() {
  const { child, program, dates, whatsapp } = Route.useSearch();
  const suggested = programs.filter((p) => p.title !== program).slice(0, 3);

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
          You're All Set! 🎉
        </h1>
        <p className="mt-3 text-lg text-text-soft">
          We've received {child ? `${child}'s` : "your"} registration.
        </p>

        {/* Summary card */}
        <div className="mt-10 rounded-3xl bg-white p-6 text-left shadow-lift md:p-8">
          <div className="font-display text-xs font-extrabold uppercase tracking-wider text-primary">
            Your registration
          </div>
          <div className="mt-3 grid gap-3">
            {child && (
              <Row icon={<User className="h-4 w-4" />} label="Child" value={child} />
            )}
            {program && (
              <Row icon={<Check className="h-4 w-4" />} label="Program" value={program} />
            )}
            {dates && (
              <Row icon={<Calendar className="h-4 w-4" />} label="Dates" value={dates} />
            )}
            {whatsapp && (
              <Row icon={<MessageCircle className="h-4 w-4" />} label="WhatsApp" value={whatsapp} />
            )}
          </div>
        </div>

        {/* Payment instructions */}
        <div className="mt-6 rounded-3xl bg-[#25D366]/10 p-6 text-left ring-2 ring-[#25D366]/30 md:p-8">
          <h2 className="font-display text-xl font-extrabold text-brand-teal">
            One Last Step — Complete Your Payment
          </h2>
          <ol className="mt-4 space-y-2.5 text-sm text-brand-teal">
            <Step n={1}>Make your payment to <strong>Hack House · 1234-567-890</strong></Step>
            <Step n={2}>Screenshot the confirmation</Step>
            <Step n={3}>Send it to our WhatsApp to confirm your spot</Step>
          </ol>
          <a
            href="https://wa.me/15555555555"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-display text-base font-extrabold text-white shadow-soft transition-transform hover:scale-[1.02]"
          >
            <MessageCircle className="h-5 w-5" /> Open WhatsApp <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <Link to="/" className="mt-8 inline-block font-display text-sm font-bold text-primary hover:underline">
          ← Back to home
        </Link>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-6 md:px-8">
        <h2 className="font-display text-2xl font-extrabold text-brand-teal text-center">
          While you wait, check out more programs
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {suggested.map((p) => (
            <ProgramCard key={p.id} program={p} />
          ))}
        </div>
      </div>
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
