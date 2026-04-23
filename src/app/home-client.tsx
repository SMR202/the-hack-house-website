"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight, Sparkles, Palette, ChefHat, FlaskConical, Trophy, Drama, Music,
  Search, FileText, MessageCircle, Star, Quote, Play,
} from "lucide-react";
import type { Program, Testimonial, CategoryItem, HeroSlide } from "@/types/sanity";
import { ProgramCard } from "@/components/program-card";
import { Squiggle, Blob, WaveDivider } from "@/components/brand";

interface HomePageClientProps {
  featured: Program[];
  testimonials: Testimonial[];
  categories: CategoryItem[];
  heroSlides: HeroSlide[];
}

const fallbackSlides: HeroSlide[] = [
  {
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80",
    title: "Watercolor Wonders",
    subtitle: "Saturdays · Ages 6–9",
    badge: "🎨 Arts",
  },
  {
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80",
    title: "Tiny Chefs Kitchen",
    subtitle: "Sundays · Ages 6–9",
    badge: "🍳 Cooking",
  },
  {
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=80",
    title: "Stage Stars Drama",
    subtitle: "Fridays · Ages 9–12",
    badge: "🎭 Drama",
  },
];

const fallbackCategories: CategoryItem[] = [
  { id: "arts", label: "Arts & Crafts", emoji: "🎨" },
  { id: "cooking", label: "Cooking", emoji: "🍳" },
  { id: "science", label: "Science", emoji: "🔬" },
  { id: "sports", label: "Sports", emoji: "⚽" },
  { id: "drama", label: "Drama", emoji: "🎭" },
  { id: "music", label: "Music", emoji: "🎵" },
];

export default function HomePageClient({ featured, testimonials, categories, heroSlides }: HomePageClientProps) {
  const slides = heroSlides.length > 0 ? heroSlides : fallbackSlides;
  const cats = categories.length > 0 ? categories : fallbackCategories;

  return (
    <>
      <Hero slides={slides} />
      <FeaturedPrograms featured={featured} />
      <ActivityCategoriesStrip categories={cats} />
      <HowItWorks />
      <Testimonials testimonials={testimonials} />
    </>
  );
}

/* ---------------- HERO ---------------- */

const stickerData = [
  { emoji: "🎨", className: "left-[6%] top-[18%]", rot: -8 },
  { emoji: "🍳", className: "left-[12%] top-[68%]", rot: 6 },
  { emoji: "⚽", className: "right-[8%] top-[14%]", rot: 10 },
  { emoji: "🎭", className: "right-[12%] top-[72%]", rot: -6 },
  { emoji: "🔬", className: "left-[40%] top-[8%]", rot: 4 },
  { emoji: "🎵", className: "right-[36%] bottom-[6%]", rot: -10 },
];

function Hero({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  return (
    <section className="relative overflow-hidden bg-brand-teal text-white">
      <div className="absolute inset-0 bg-confetti-dark opacity-70" aria-hidden />
      <Blob className="-left-32 top-0 h-[480px] w-[480px]" color="var(--color-primary)" opacity={0.18} />
      <Blob className="-right-40 bottom-0 h-[520px] w-[520px]" color="var(--color-brand-orange)" opacity={0.14} />

      {/* Floating stickers (hidden on small) */}
      {stickerData.map((s, i) => (
        <div
          key={i}
          aria-hidden
          className={`pointer-events-none absolute hidden md:flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-lift animate-float ${s.className}`}
          style={{ ["--rot" as string]: `${s.rot}deg`, animationDelay: `${i * 0.4}s`, transform: `rotate(${s.rot}deg)` }}
        >
          {s.emoji}
        </div>
      ))}

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-12 md:px-8 md:pb-32 md:pt-20 lg:grid-cols-2">
        {/* Left */}
        <div className="animate-[fade-up_0.7s_ease-out]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wide text-white shadow-glow-orange">
            <Sparkles className="h-3.5 w-3.5" /> Summer 2025 Registrations Open!
          </span>
          <h1 className="mt-5 font-display text-5xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            A Place to<br />
            Explore, Create<br />
            <span className="text-primary">& Grow </span>
            <span className="inline-block animate-bounce-soft">🌟</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-white/80">
            Workshops & summer camps packed with creativity, adventure, and fun — for kids aged 5 to 14.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/workshops"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-7 py-3.5 font-display text-base font-extrabold text-white shadow-glow-orange transition-transform hover:scale-[1.03]"
            >
              Browse Programs <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-7 py-3.5 font-display text-base font-extrabold text-white transition-colors hover:bg-white hover:text-brand-teal"
            >
              <Play className="h-4 w-4 fill-current" /> How It Works
            </a>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
            <span>✓ 500+ Happy Kids</span>
            <span>✓ All Activities</span>
            <span>✓ All Skill Levels</span>
          </div>
        </div>

        {/* Right slideshow */}
        <div
          className="relative mx-auto h-[420px] w-full max-w-md md:h-[480px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            aria-hidden
            className="absolute -top-6 left-12 z-10 inline-flex items-center gap-1 rounded-full bg-brand-yellow px-3 py-1.5 font-display text-xs font-extrabold text-brand-teal shadow-lift"
          >
            ⭐ Featured This Month
          </div>
          {slides.map((s, i) => {
            const offset = (i - active + slides.length) % slides.length;
            const isTop = offset === 0;
            const styles =
              offset === 0
                ? "translate-x-0 translate-y-0 rotate-0 scale-100 opacity-100 z-30"
                : offset === 1
                  ? "translate-x-6 translate-y-6 rotate-3 scale-[0.95] opacity-90 z-20"
                  : "-translate-x-6 translate-y-12 -rotate-3 scale-[0.9] opacity-80 z-10";
            return (
              <div
                key={i}
                className={`absolute inset-0 overflow-hidden rounded-[28px] bg-white shadow-lift transition-all duration-700 ${styles}`}
              >
                <div className="relative h-3/5 overflow-hidden">
                  <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 font-display text-xs font-extrabold text-brand-teal">
                    {s.badge}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-extrabold text-brand-teal">{s.title}</h3>
                  <p className="mt-1 text-sm text-text-soft">{s.subtitle}</p>
                  {isTop && (
                    <Link
                      href="/workshops"
                      className="mt-3 inline-flex items-center gap-1 font-display text-sm font-bold text-primary"
                    >
                      Explore <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
          <div className="absolute -bottom-8 left-1/2 z-40 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-brand-orange" : "w-2 bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <WaveDivider fromColor="transparent" toColor="var(--color-background)" />
    </section>
  );
}

/* ---------------- FEATURED ---------------- */

function FeaturedPrograms({ featured }: { featured: Program[] }) {
  return (
    <section className="relative overflow-hidden bg-background py-20">
      <Blob className="-right-20 top-20 h-72 w-72" color="var(--color-brand-orange)" opacity={0.08} />
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-primary">What&apos;s On</p>
          <h2 className="mt-2 inline-block font-display text-4xl font-black text-brand-teal md:text-5xl">
            Featured Programs <span className="ml-1">🌈</span>
          </h2>
          <Squiggle className="mx-auto mt-1 h-3 w-44" />
          <p className="mt-4 text-text-soft">A little something for every kind of kid.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProgramCard key={p.id} program={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/workshops"
            className="inline-flex items-center gap-1 font-display text-base font-extrabold text-brand-orange hover:underline underline-offset-4"
          >
            See All Programs <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CATEGORIES ---------------- */

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  arts: Palette,
  cooking: ChefHat,
  science: FlaskConical,
  sports: Trophy,
  drama: Drama,
  music: Music,
};

function ActivityCategoriesStrip({ categories }: { categories: CategoryItem[] }) {
  return (
    <section className="relative overflow-hidden bg-brand-mint py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-black text-brand-teal md:text-5xl">
            Something for Every Kid <span>🎯</span>
          </h2>
          <p className="mt-3 text-text-soft">Explore the full menu of Hack House activities.</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.filter((c) => c.id !== "all").map((c) => {
            const Icon = categoryIcons[c.id];
            return (
              <Link
                key={c.id}
                href="/workshops"
                className="group flex flex-col items-center gap-3 rounded-3xl bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-mint text-primary transition-transform group-hover:scale-110">
                  {Icon && <Icon className="h-7 w-7" />}
                </div>
                <span className="font-display text-sm font-extrabold text-brand-teal">{c.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */

function HowItWorks() {
  const steps = [
    { n: 1, icon: Search, emoji: "🔍", title: "Find a Program", desc: "Browse workshops and camps by age or activity." },
    { n: 2, icon: FileText, emoji: "📝", title: "Fill the Form", desc: "Quick registration — takes under 2 minutes." },
    { n: 3, icon: MessageCircle, emoji: "💸", title: "Pay on WhatsApp", desc: "Send your payment screenshot to confirm your spot." },
  ];
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-background py-20">
      <Blob className="-left-20 top-10 h-80 w-80" color="var(--color-primary)" opacity={0.08} />
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-black text-brand-teal md:text-5xl">
            Getting Started is Simple <span>🎯</span>
          </h2>
          <p className="mt-3 text-text-soft">From &quot;what&apos;s a Hack House?&quot; to &quot;see you Saturday!&quot; in three steps.</p>
        </div>

        <div className="relative mt-16">
          {/* dashed curve */}
          <svg
            aria-hidden
            viewBox="0 0 1000 80"
            className="absolute left-0 right-0 top-12 hidden h-20 w-full px-12 lg:block"
            preserveAspectRatio="none"
          >
            <path
              d="M80,40 C260,-10 460,90 540,40 C620,-10 820,90 920,40"
              stroke="var(--color-brand-orange)"
              strokeWidth="3"
              strokeDasharray="2 10"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-3xl bg-white p-7 text-center shadow-soft">
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-2 font-display text-[80px] font-black leading-none text-brand-mint"
                >
                  {s.n}
                </div>
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-mint text-3xl">
                  {s.emoji}
                </div>
                <h3 className="relative mt-4 font-display text-xl font-extrabold text-brand-teal">{s.title}</h3>
                <p className="relative mt-2 text-sm text-text-soft">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/workshops"
            className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-7 py-3.5 font-display text-base font-extrabold text-white shadow-glow-orange transition-transform hover:scale-[1.03]"
          >
            Start Exploring <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */

function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.97_0.04_55)] py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-black text-brand-teal md:text-5xl">
            Parents & Kids Love It <span className="text-brand-pink">❤️</span>
          </h2>
          <p className="mt-3 text-text-soft">A few kind words from the Hack House family.</p>
        </div>

        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {testimonials.map((t, idx) => (
            <article
              key={t._id ?? idx}
              className="snap-start shrink-0 w-[320px] sm:w-[380px] rounded-3xl bg-white p-7 shadow-soft"
            >
              <Quote className="h-9 w-9 text-primary/70" />
              <p className="mt-3 text-base leading-relaxed text-brand-teal">&quot;{t.quote}&quot;</p>
              <div className="mt-5 flex gap-0.5 text-brand-yellow">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <div className="font-display text-sm font-extrabold text-brand-teal">{t.parent}</div>
                  <div className="text-xs text-text-soft">{t.childAge}</div>
                </div>
                <span className="rounded-full bg-brand-mint px-2.5 py-1 text-[11px] font-display font-extrabold text-primary">
                  {t.program}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
