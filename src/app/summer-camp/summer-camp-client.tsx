"use client";

import Link from "next/link";
import { ArrowRight, Sun } from "lucide-react";
import { ageGroups, programs } from "@/data/programs";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProgramCard } from "@/components/program-card";
import { Blob, WaveDivider } from "@/components/brand";

export default function SummerCampClient() {
  const camps = programs.filter((p) => p.type === "camp");

  const groupCards = (["ages-6-9", "ages-10-13", "ages-14-plus"] as const).map((id) => {
    const ag = ageGroups[id];
    const camp = camps.find((c) => c.ageGroup === id);
    return { id, ag, camp };
  });

  const styles: Record<string, { bg: string; sticker: string }> = {
    "ages-6-9": { bg: "bg-brand-orange", sticker: "🌈" },
    "ages-10-13": { bg: "bg-primary", sticker: "🚀" },
    "ages-14-plus": { bg: "bg-brand-teal", sticker: "🏕️" },
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-orange via-[oklch(0.7_0.13_60)] to-brand-teal text-white">
        <div className="absolute inset-0 bg-confetti-dark opacity-50" />
        <Blob className="-left-24 -top-12 h-80 w-80" color="white" opacity={0.18} />
        <Blob className="-right-32 bottom-0 h-96 w-96" color="var(--color-brand-yellow)" opacity={0.2} />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-10 md:px-8 md:pb-32 md:pt-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Summer Camp" }]} />
          <div className="max-w-2xl animate-[fade-up_0.6s_ease-out]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wide">
              <Sun className="h-3.5 w-3.5" /> Summer 2025
            </span>
            <h1 className="mt-4 font-display text-5xl font-black leading-tight md:text-6xl">
              Summer Camp <span className="inline-block animate-bounce-soft">☀️</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/90">
              The best summer your child has ever had. Day camps and overnight adventures, all summer long.
            </p>
          </div>
        </div>
        <WaveDivider toColor="var(--color-background)" />
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl font-extrabold text-brand-teal md:text-4xl">
              Pick Your Adventure
            </h2>
            <p className="mt-3 text-text-soft">Three camps, three age groups, one unforgettable summer.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {groupCards.map(({ id, ag, camp }) => {
              const s = styles[id];
              return (
                <Link
                  key={id}
                  href={camp ? `/programs/${camp.id}` : "/summer-camp"}
                  className={`group relative overflow-hidden rounded-3xl ${s.bg} p-7 text-white shadow-soft transition-all hover:-translate-y-2 hover:shadow-lift`}
                >
                  <div
                    aria-hidden
                    className="absolute -right-3 -top-2 text-7xl opacity-30 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                  >
                    {s.sticker}
                  </div>
                  <div className="relative">
                    <div className="font-display text-sm font-extrabold uppercase tracking-wider opacity-90">
                      {ag.campRange}
                    </div>
                    <h3 className="mt-1 font-display text-3xl font-black">{ag.campName}</h3>
                    <p className="mt-2 text-base opacity-90">{ag.tagline}</p>
                    {camp && (
                      <div className="mt-4 flex items-center gap-2">
                        <span className="rounded-full bg-white/20 px-3 py-1 font-display text-xs font-extrabold">
                          {camp.campType}
                        </span>
                        <span className="rounded-full bg-white/20 px-3 py-1 font-display text-xs font-extrabold">
                          {camp.duration}
                        </span>
                      </div>
                    )}
                    <div className="mt-8 flex items-center justify-between">
                      <span className="font-display text-xl font-extrabold">{camp?.price}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 font-display text-sm font-extrabold text-brand-teal transition-transform group-hover:translate-x-1">
                        Explore <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-20">
            <h3 className="font-display text-2xl font-extrabold text-brand-teal">All summer programs</h3>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {camps.map((c) => (
                <ProgramCard key={c.id} program={c} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
