"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Wrench } from "lucide-react";
import type { Program, AgeGroup, AgeGroupId } from "@/types/sanity";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Blob, WaveDivider } from "@/components/brand";

interface Props {
  programs: Program[];
  ageGroups: AgeGroup[];
  whatsapp?: string;
}

export default function WorkshopsLandingClient({ programs, ageGroups, whatsapp }: Props) {
  const groups = (["ages-6-9", "ages-10-13", "ages-14-plus"] as const).map((id) => {
    const ag = ageGroups.find((g) => g.key === id);
    const count = programs.filter((p) => p.ageGroup === id && p.type === "workshop").length;
    return {
      id,
      name: ag?.name ?? id,
      range: ag?.range ?? "",
      tagline: ag?.tagline ?? "",
      count,
    };
  });

  const styles: Record<string, { bg: string; text: string; sticker: string }> = {
    "ages-6-9": { bg: "bg-primary", text: "text-white", sticker: "🎨" },
    "ages-10-13": { bg: "bg-brand-orange", text: "text-white", sticker: "🛠️" },
    "ages-14-plus": { bg: "bg-brand-teal", text: "text-white", sticker: "⭐" },
  };

  const displayWhatsapp = whatsapp || "+92 316 5322764";
  const waLink = `https://wa.me/${displayWhatsapp.replace(/[^0-9+]/g, "")}`;

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.96_0.02_188)] via-[oklch(0.96_0.02_188)] to-[oklch(0.96_0.02_195)] text-brand-teal">
        <div className="absolute inset-0 bg-confetti-light opacity-60" />
        <Blob className="-left-20 -top-20 h-80 w-80" color="white" opacity={0.12} />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-12 md:px-8 md:pb-32 md:pt-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Workshops" }]} />
          <div className="max-w-2xl animate-[fade-up_0.6s_ease-out]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal/10 px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wide">
              <Wrench className="h-3.5 w-3.5" /> Workshops
            </span>
            <h1 className="mt-4 font-display text-5xl font-black leading-tight md:text-6xl">
              Workshops <span className="inline-block animate-bounce-soft">🛠️</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-brand-teal/85">
              Hands-on sessions where kids learn by doing. Pick the right age group below to find their next favourite thing.
            </p>
          </div>
        </div>
        <WaveDivider toColor="var(--color-background)" />
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl font-extrabold text-brand-teal md:text-4xl">
              Choose Your Age Group
            </h2>
            <p className="mt-3 text-text-soft">Programs designed for where your child is right now.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {groups.map((g) => {
              const s = styles[g.id];
              return (
                <Link
                  key={g.id}
                  href={`/workshops/${g.id}`}
                  className={`group relative overflow-hidden rounded-3xl ${s.bg} ${s.text} p-7 shadow-soft transition-all hover:-translate-y-2 hover:shadow-lift`}
                >
                  <div
                    aria-hidden
                    className="absolute -right-3 -top-2 text-7xl opacity-30 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                  >
                    {s.sticker}
                  </div>
                  <div className="relative">
                    <div className="font-display text-sm font-extrabold uppercase tracking-wider opacity-80">
                      {g.range}
                    </div>
                    <h3 className="mt-1 font-display text-3xl font-black">{g.name}</h3>
                    <p className="mt-2 text-base opacity-90">{g.tagline}</p>
                    <div className="mt-8 flex items-center justify-between">
                      <span className="rounded-full bg-white/20 px-3 py-1 font-display text-xs font-extrabold">
                        {g.count} programs available
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 font-display text-sm font-extrabold text-brand-teal transition-transform group-hover:translate-x-1">
                        Explore <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-16 rounded-3xl bg-brand-mint p-8 text-center md:p-12">
            <Sparkles className="mx-auto h-8 w-8 text-primary" />
            <h3 className="mt-3 font-display text-2xl font-extrabold text-brand-teal">
              Not sure which is the right fit?
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-text-soft">
              Send us a quick WhatsApp message and we&apos;ll help you pick the perfect program for your child.
            </p>
            <a
              href={waLink}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-display text-sm font-extrabold text-white shadow-soft transition-transform hover:scale-105"
            >
              Chat with us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
