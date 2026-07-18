import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Program, ProgramOwner } from "@/types/sanity";
import { getProgramOwner } from "@/data/program-owners";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProgramCard } from "@/components/program-card";
import { Blob, WaveDivider } from "@/components/brand";

export function OwnerProgramsPage({ ownerId, programs }: { ownerId: ProgramOwner; programs: Program[] }) {
  const owner = getProgramOwner(ownerId);

  return (
    <>
      <section className="relative overflow-hidden bg-[oklch(0.96_0.02_195)] text-brand-teal">
        <div className="absolute inset-0 bg-confetti-light opacity-50" />
        <Blob className="-left-24 -top-12 h-80 w-80" color="var(--color-primary)" opacity={0.12} />
        <Blob className="-right-32 bottom-0 h-96 w-96" color="var(--color-brand-orange)" opacity={0.12} />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-10 md:px-8 md:pb-32 md:pt-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: owner.shortTitle }]} />
          <div className="max-w-3xl animate-[fade-up_0.6s_ease-out]">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 font-display text-xs font-extrabold uppercase shadow-soft">
              <span>{owner.emoji}</span> {owner.shortTitle}
            </span>
            <h1 className="mt-4 font-display text-5xl font-black leading-tight md:text-6xl">{owner.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-brand-teal/85">{owner.description}</p>
            <Link
              href="/register"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 font-display text-sm font-extrabold text-brand-orange-foreground shadow-glow-orange"
            >
              Register or Enquire <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <WaveDivider toColor="var(--color-background)" />
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-primary">Explore</p>
              <h2 className="mt-1 font-display text-3xl font-black text-brand-teal md:text-4xl">Programs</h2>
            </div>
            <span className="font-display text-sm font-bold text-text-soft">
              {programs.length} {programs.length === 1 ? "program" : "programs"}
            </span>
          </div>
          {programs.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => <ProgramCard key={program.id} program={program} />)}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-soft">
              <div className="text-5xl">{owner.emoji}</div>
              <h3 className="mt-4 font-display text-2xl font-extrabold text-brand-teal">Programs coming soon</h3>
              <p className="mt-2 text-text-soft">New programs will appear here as soon as they are published.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
