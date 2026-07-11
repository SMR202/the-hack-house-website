"use client";

import * as React from "react";
import Link from "next/link";
import {
  Calendar, Clock, Hourglass, Users, MapPin, MessageCircle, Share2,
  CheckCircle2, X as XIcon, ArrowRight, Award,
} from "lucide-react";
import type { Program } from "@/types/sanity";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProgramCard } from "@/components/program-card";
import { getParticipantKind, getProgramSection } from "@/data/sections";

export default function ProgramDetailClient({ program, related }: { program: Program; related: Program[] }) {
  const fillPct = Math.round(((program.totalSpots - program.spotsLeft) / program.totalSpots) * 100);
  const urgency = program.spotsLeft <= 3;
  const section = getProgramSection(program);
  const participantKind = getParticipantKind(program);
  const highlights = program.highlights?.length ? program.highlights : (program.whatKidsWillDo ?? []);
  const gallery = program.gallery ?? [];
  const relatedPrograms = related ?? [];
  const participantNoun =
    participantKind === "adult" ? "adult" : participantKind === "event" ? "event" : "child";
  const highlightsTitle =
    participantKind === "adult"
      ? "What You Will Do"
      : participantKind === "event"
        ? "Package Highlights"
        : "What Kids Will Do";
  const aboutLine =
    participantKind === "event"
      ? "Every Hack House event package is coordinated with the team, with clear timing, setup expectations, and WhatsApp follow-up before your booking."
      : "Every Haven session is led by a vetted instructor, capped at small group sizes, and built around joyful learning with practical support.";

  const [lightbox, setLightbox] = React.useState<string | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[420px] overflow-hidden md:h-[520px]">
        <img src={program.image} alt={program.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-teal via-brand-teal/70 to-brand-teal/20" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-10 pt-8 md:px-8 md:pb-14">
          <div className="text-white">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: section.title, href: section.href },
                { label: program.title },
              ]}
            />
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-orange px-3 py-1 font-display text-xs font-extrabold">
                {program.ageLabel}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 font-display text-xs font-extrabold text-brand-teal">
                {program.categoryEmoji} {program.categoryLabel}
              </span>
              {section.id !== "haven-autism" && (
                <span className="inline-flex items-center rounded-full bg-brand-yellow px-3 py-1 font-display text-xs font-extrabold text-brand-teal">
                  {section.title}
                </span>
              )}
              {program.subsectionLabel && (
                <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 font-display text-xs font-extrabold text-white">
                  {program.subsectionLabel}
                </span>
              )}
            </div>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-black md:text-6xl">{program.title}</h1>
          </div>
        </div>
      </section>

      <section className="relative bg-background pb-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pt-12 md:px-8 lg:grid-cols-[1fr_360px]">
          {/* Left content */}
          <div className="min-w-0">
            <p className="text-lg leading-relaxed text-brand-teal">{program.shortDescription}</p>

            <h2 className="mt-10 font-display text-2xl font-extrabold text-brand-teal">{highlightsTitle}</h2>
            <ul className="mt-4 grid gap-3">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-soft">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-brand-teal">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-display text-2xl font-extrabold text-brand-teal">About This Program</h2>
            <div className="mt-3 space-y-4 text-text-soft leading-relaxed">
              <p>{program.longDescription}</p>
              <p>{aboutLine}</p>
            </div>

            <h2 className="mt-10 font-display text-2xl font-extrabold text-brand-teal">Photos</h2>
            <div className="mt-4 columns-2 gap-3 md:columns-3 [&>*]:mb-3">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightbox(src)}
                  className="block w-full overflow-hidden rounded-2xl shadow-soft transition-transform hover:scale-[1.02]"
                  style={{ breakInside: "avoid" }}
                >
                  <img src={src} alt={`${program.title} session ${i + 1}`} className="w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>

            {/* Instructor */}
            <div className="mt-10 flex flex-col items-start gap-5 rounded-3xl bg-white p-6 shadow-soft sm:flex-row sm:items-center">
              <img
                src={program.instructor.photo}
                alt={program.instructor.name}
                className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-brand-mint"
              />
              <div className="min-w-0 flex-1">
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-mint px-2.5 py-1 font-display text-[11px] font-extrabold uppercase tracking-wide text-primary">
                  <Award className="h-3 w-3" /> Program Lead
                </span>
                <h3 className="mt-2 font-display text-lg font-extrabold text-brand-teal">{program.instructor.name}</h3>
                <p className="text-sm font-semibold text-text-soft">{program.instructor.role}</p>
                <p className="mt-1.5 text-sm text-text-soft">{program.instructor.bio}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-white p-6 shadow-lift">
              <div className="font-display text-4xl font-black text-brand-orange">{program.price}</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-text-soft">
                {participantKind === "event" ? "booking package" : `per ${participantNoun}`}
              </div>

              <ul className="mt-5 space-y-3 text-sm text-brand-teal">
                <SidebarRow icon={<Calendar className="h-4 w-4" />} label="Dates" value={program.dates} />
                <SidebarRow icon={<Clock className="h-4 w-4" />} label="Time" value={program.time} />
                <SidebarRow icon={<Hourglass className="h-4 w-4" />} label="Duration" value={program.duration} />
                <SidebarRow icon={<MapPin className="h-4 w-4" />} label="Location" value={program.location} />
              </ul>

              <div className="mt-5 rounded-2xl bg-brand-mint p-4">
                <div className="flex items-center justify-between text-xs font-display font-extrabold text-brand-teal">
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {program.spotsLeft} {participantKind === "event" ? "slots" : "spots"} left
                  </span>
                  <span className={urgency ? "text-brand-orange" : "text-text-soft"}>
                    {urgency ? "Filling fast!" : `${program.totalSpots - program.spotsLeft}/${program.totalSpots} booked`}
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full animate-progress rounded-full bg-gradient-to-r from-primary to-brand-orange"
                    style={{ ["--fill" as string]: `${fillPct}%` }}
                  />
                </div>
              </div>

              <Link
                href={`/register?program=${program.id}`}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-3.5 font-display text-base font-extrabold text-white shadow-glow-orange transition-transform hover:scale-[1.02]"
              >
                {participantKind === "event" ? "Enquire About This Package" : "Register for This Offering"}
              </Link>

              <button
                type="button"
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.share) {
                    navigator.share({ title: program.title, url: location.href }).catch(() => {});
                  } else if (typeof navigator !== "undefined") {
                    navigator.clipboard?.writeText(location.href);
                  }
                }}
                className="mt-3 flex w-full items-center justify-center gap-2 font-display text-sm font-bold text-primary hover:underline"
              >
                <Share2 className="h-4 w-4" /> Share this Program
              </button>

              <a
                href="https://wa.me/15555555555"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#25D366] px-5 py-2.5 font-display text-sm font-extrabold text-[#25D366] hover:bg-[#25D366]/5"
              >
                <MessageCircle className="h-4 w-4" /> Questions? Chat with us
              </a>
            </div>
          </aside>
        </div>

        {relatedPrograms.length > 0 && (
          <div className="mx-auto mt-20 max-w-7xl px-6 md:px-8">
            <h2 className="font-display text-3xl font-extrabold text-brand-teal">You Might Also Like</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPrograms.map((p) => (
                <ProgramCard key={p.id} program={p} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Mobile pinned register */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-mint bg-white p-3 shadow-lift lg:hidden">
        <div className="flex items-center gap-3">
          <div>
            <div className="font-display text-xl font-extrabold text-brand-orange">{program.price}</div>
            <div className="text-[11px] text-text-soft">
              {program.spotsLeft} {participantKind === "event" ? "slots" : "spots"} left
            </div>
          </div>
          <Link
            href={`/register?program=${program.id}`}
            className="ml-auto inline-flex items-center justify-center gap-1 rounded-full bg-brand-orange px-5 py-3 font-display text-sm font-extrabold text-white shadow-glow-orange"
          >
            {participantKind === "event" ? "Enquire" : "Register"} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-teal/90 p-4 animate-[fade-in_0.2s_ease-out]"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-5 top-5 rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
            onClick={() => setLightbox(null)}
          >
            <XIcon className="h-6 w-6" />
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-lift"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

function SidebarRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-mint text-primary">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-display font-extrabold uppercase tracking-wider text-text-soft">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </li>
  );
}
