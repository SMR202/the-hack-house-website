import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { PROGRAMS_BY_SECTION_QUERY } from "@/sanity/lib/queries";
import type { Program, ProgramSectionId } from "@/types/sanity";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProgramCard } from "@/components/program-card";
import { Blob, WaveDivider } from "@/components/brand";
import { programSections, sectionById } from "@/data/sections";

interface Props {
  params: Promise<{ sectionSlug: string }>;
}

export function generateStaticParams() {
  return programSections.map((section) => ({ sectionSlug: section.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sectionSlug } = await params;
  const section = sectionById[sectionSlug as ProgramSectionId];

  if (!section) {
    return { title: "Section not found · The Hack House" };
  }

  return {
    title: `${section.title} · The Hack House`,
    description: section.description,
    openGraph: {
      title: `${section.title} · The Hack House`,
      description: section.description,
    },
  };
}

export default async function SectionPage({ params }: Props) {
  const { sectionSlug } = await params;
  const section = sectionById[sectionSlug as ProgramSectionId];

  if (!section) {
    notFound();
  }

  const programs = await sanityFetch<Program[]>({
    query: PROGRAMS_BY_SECTION_QUERY,
    params: { section: section.id },
  });

  const subsectionFor = (program: Program) => {
    if (program.subsectionLabel && section.subsections.includes(program.subsectionLabel)) {
      return program.subsectionLabel;
    }
    if (section.id === "haven-montessori" && program.subsectionLabel === "Haven Montessori") {
      return "Montessori";
    }
    if (section.id === "haven-autism") {
      return "Haven Autism";
    }
    return program.subsectionLabel ?? section.subsections[0];
  };

  const grouped = section.subsections.map((label) => ({
    label,
    programs: programs.filter((program) => subsectionFor(program) === label),
  }));
  const uncategorized = programs.filter(
    (program) => !section.subsections.includes(subsectionFor(program)),
  );

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.96_0.02_188)] via-white to-[oklch(0.96_0.04_55)] text-brand-teal">
        <div className="absolute inset-0 bg-confetti-light opacity-50" />
        <Blob className="-left-24 -top-12 h-80 w-80" color="white" opacity={0.18} />
        <Blob className="-right-32 bottom-0 h-96 w-96" color="var(--color-brand-yellow)" opacity={0.2} />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-10 md:px-8 md:pb-32 md:pt-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: section.title }]} />
          <div className="max-w-3xl animate-[fade-up_0.6s_ease-out]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wide shadow-soft">
              <span>{section.emoji}</span> {section.subtitle}
            </span>
            <h1 className="mt-4 font-display text-5xl font-black leading-tight md:text-6xl">
              {section.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-brand-teal/85">{section.description}</p>
            <Link
              href="/register"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 font-display text-sm font-extrabold text-brand-orange-foreground shadow-glow-orange transition-transform hover:scale-[1.03]"
            >
              Register or Enquire <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <WaveDivider toColor="var(--color-background)" />
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          {programs.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-soft">
              <div className="text-5xl">{section.emoji}</div>
              <h2 className="mt-4 font-display text-2xl font-extrabold text-brand-teal">Offerings coming soon</h2>
              <p className="mx-auto mt-2 max-w-xl text-text-soft">
                This section is ready in the site structure. Add offerings in Sanity using this section to show them here.
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {[...grouped, ...(uncategorized.length ? [{ label: "Other", programs: uncategorized }] : [])]
                .filter((group) => group.programs.length > 0)
                .map((group) => (
                  <div key={group.label}>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
                          {section.title}
                        </p>
                        <h2 className="mt-1 font-display text-3xl font-black text-brand-teal md:text-4xl">
                          {group.label}
                        </h2>
                      </div>
                      <span className="font-display text-sm font-bold text-text-soft">
                        {group.programs.length} {group.programs.length === 1 ? "offering" : "offerings"}
                      </span>
                    </div>
                    <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {group.programs.map((program) => (
                        <ProgramCard key={program.id} program={program} />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
