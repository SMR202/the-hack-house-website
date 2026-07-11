"use client";

import * as React from "react";
import { MessageCircle, MapPin, Mail, Phone } from "lucide-react";
import type { TeamMember, StatItem } from "@/types/sanity";
import { Blob, Squiggle, useCountUp, WaveDivider } from "@/components/brand";

export default function AboutPageClient({ team, stats, whatsapp }: { team: TeamMember[]; stats: StatItem[]; whatsapp?: string }) {
  const displayWhatsapp = whatsapp || "+92 316 5322764";
  const waLink = `https://wa.me/${displayWhatsapp.replace(/[^0-9+]/g, "")}`;
  return (
    <>
      <section className="relative h-[420px] overflow-hidden md:h-[500px]">
        <img
          src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1600&q=80"
          alt="Kids enjoying a Hack House session"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.96_0.02_195)] via-[oklch(0.96_0.02_195)]/70 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-12 md:px-8 md:pb-16">
          <h1 className="font-display text-5xl font-black text-brand-teal md:text-6xl">
            About The Hack House <span className="inline-block animate-bounce-soft">🏠</span>
          </h1>
          <p className="mt-3 max-w-xl text-lg text-brand-teal/90">
            The parent company behind Haven Autism and Haven Montessori, built to help every child grow with care.
          </p>
        </div>
        <WaveDivider toColor="var(--color-background)" />
      </section>

      {/* Story */}
      <section className="relative overflow-hidden bg-background py-16 md:py-24">
        <Blob className="-left-20 top-20 h-72 w-72" color="var(--color-primary)" opacity={0.1} />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:px-8 lg:grid-cols-2">
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-primary">Our Story</p>
            <h2 className="mt-2 font-display text-4xl font-black text-brand-teal md:text-5xl">
              Built by parents, for kids
            </h2>
            <Squiggle className="mt-1 h-3 w-44" />
            <div className="mt-6 space-y-4 text-text-soft leading-relaxed">
              <p>
                The Hack House brings Haven Autism and Haven Montessori under one parent company, with one big idea:
                children grow best when they are understood, supported, and given room to move at their own pace.
              </p>
              <p>
                Today we run structured programs, Montessori classrooms, and family support for children across different
                learning needs. Our instructors are vetted, our group sizes are small, and our routines are built with care.
              </p>
              <p>
                We&apos;re more than a center name. We&apos;re the home behind the Haven programs families come back to.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img className="aspect-square rounded-3xl object-cover shadow-soft" src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=600&q=80" alt="" />
            <img className="aspect-square translate-y-6 rounded-3xl object-cover shadow-soft" src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80" alt="" />
            <img className="aspect-square translate-y-6 rounded-3xl object-cover shadow-soft" src="https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=600&q=80" alt="" />
            <img className="aspect-square rounded-3xl object-cover shadow-soft" src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80" alt="" />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="relative overflow-hidden bg-brand-mint py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-8">
          <div className="font-display text-7xl leading-none text-primary md:text-8xl">&quot;</div>
          <blockquote className="-mt-6 font-display text-2xl font-bold italic text-primary md:text-4xl">
            Every child has a spark. We just give them the space to shine.
          </blockquote>
          <div className="mt-4 font-display text-sm font-extrabold uppercase tracking-wider text-brand-teal">
            — Maya Okafor, Founder
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-4xl font-black text-brand-teal md:text-5xl">Meet The Team</h2>
            <p className="mt-3 text-text-soft">The grown-ups your kids will love hanging out with.</p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <div key={m.name} className="rounded-3xl bg-white p-6 text-center shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                <img
                  src={m.photo}
                  alt={m.name}
                  className="mx-auto h-28 w-28 rounded-full object-cover ring-4 ring-brand-mint"
                />
                <h3 className="mt-4 font-display text-lg font-extrabold text-brand-teal">{m.name}</h3>
                <p className="font-display text-sm font-bold text-brand-orange">{m.role}</p>
                <p className="mt-2 text-sm text-text-soft">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-[oklch(0.96_0.02_195)] py-16 text-brand-teal">
        <div className="absolute inset-0 bg-confetti-light opacity-50" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4 md:px-8">
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Contact + Map */}
      <section className="bg-background py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl shadow-soft">
            <iframe
              title="Hack House location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.13%2C51.50%2C-0.10%2C51.52&amp;layer=mapnik"
              className="h-[380px] w-full border-0"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl font-black text-brand-teal md:text-4xl">Come say hi</h2>
            <p className="mt-3 text-text-soft">
              Drop in for a tour, or chat to us on WhatsApp — we love hearing from new families.
            </p>
            <ul className="mt-6 space-y-3">
              <ContactRow icon={<MapPin className="h-4 w-4" />} label="Visit" value="123 Maple Lane, Hackville · Open Mon–Sat" />
              <ContactRow icon={<Mail className="h-4 w-4" />} label="Email" value="hello@hackhouse.kids" />
              <ContactRow icon={<Phone className="h-4 w-4" />} label="Phone" value={displayWhatsapp} />
            </ul>
            <a
              href={waLink}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-display text-sm font-extrabold text-white shadow-soft transition-transform hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, suffix, label, icon }: { value: number; suffix: string; label: string; icon: string }) {
  const { value: v, ref } = useCountUp(value);
  return (
    <div className="text-center">
      <div className="text-4xl">{icon}</div>
      <div className="mt-2 font-display text-4xl font-black md:text-5xl">
        <span ref={ref}>{v}</span>
        {suffix}
      </div>
      <div className="mt-1 font-display text-sm font-bold text-brand-teal/80">{label}</div>
    </div>
  );
}

function ContactRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-mint text-primary">
        {icon}
      </span>
      <div>
        <div className="text-[11px] font-display font-extrabold uppercase tracking-wider text-text-soft">{label}</div>
        <div className="font-semibold text-brand-teal">{value}</div>
      </div>
    </li>
  );
}
