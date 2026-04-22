import * as React from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ageGroups, categories, programs, type AgeGroupId, type CategoryId } from "@/data/programs";
import { ProgramCard } from "@/components/program-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Blob, WaveDivider } from "@/components/brand";

export const Route = createFileRoute("/workshops/$ageGroup")({
  head: ({ params }) => {
    const ag = ageGroups[params.ageGroup as AgeGroupId];
    const title = ag ? `${ag.name} (${ag.range}) — Workshops` : "Workshops";
    return {
      meta: [
        { title: `${title} · The Hack House` },
        {
          name: "description",
          content: ag
            ? `${ag.name} workshops for ${ag.range}. ${ag.tagline}. Browse arts, cooking, science, sports, drama, and music programs at The Hack House.`
            : "Workshops at The Hack House.",
        },
        { property: "og:title", content: `${title} · The Hack House` },
        {
          property: "og:description",
          content: ag ? `${ag.tagline} — workshops designed for ${ag.range}.` : "Workshops at The Hack House.",
        },
      ],
    };
  },
  loader: ({ params }) => {
    if (!ageGroups[params.ageGroup as AgeGroupId]) throw notFound();
    return {};
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <div className="text-5xl">🤔</div>
      <h1 className="mt-3 font-display text-3xl font-extrabold text-brand-teal">Age group not found</h1>
      <Link to="/workshops" className="mt-5 inline-block font-display font-bold text-primary">
        ← Back to all workshops
      </Link>
    </div>
  ),
  component: AgeGroupPage,
});

function AgeGroupPage() {
  const { ageGroup } = Route.useParams();
  const ag = ageGroups[ageGroup as AgeGroupId];
  const [filter, setFilter] = React.useState<CategoryId | "all">("all");

  const list = programs.filter((p) => p.ageGroup === ageGroup && p.type === "workshop");
  const filtered = filter === "all" ? list : list.filter((p) => p.category === filter);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-brand-teal text-white">
        <div className="absolute inset-0 bg-confetti-dark opacity-60" />
        <Blob className="-right-20 top-0 h-80 w-80" color="var(--color-brand-orange)" opacity={0.18} />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-10 md:px-8 md:pb-24 md:pt-14">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Workshops", to: "/workshops" },
              { label: ag.range },
            ]}
          />
          <div className="flex flex-col gap-2">
            <span className="font-display text-sm font-extrabold uppercase tracking-wider text-brand-yellow">
              {ag.range}
            </span>
            <h1 className="font-display text-5xl font-black md:text-6xl">
              {ag.name} <span className="inline-block">✨</span>
            </h1>
            <p className="mt-2 max-w-xl text-lg text-white/85">{ag.tagline}.</p>
          </div>
        </div>
        <WaveDivider toColor="var(--color-background)" />
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:px-0">
            {categories.map((c) => {
              const active = filter === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setFilter(c.id)}
                  className={`shrink-0 rounded-full border-2 px-4 py-2 font-display text-sm font-extrabold transition-all ${
                    active
                      ? "border-brand-orange bg-brand-orange text-white shadow-glow-orange"
                      : "border-brand-mint bg-white text-brand-teal hover:border-primary hover:text-primary"
                  }`}
                >
                  <span className="mr-1">{c.emoji}</span>
                  {c.label}
                </button>
              );
            })}
          </div>

          <div className="mt-10">
            {filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => (
                  <ProgramCard key={p.id} program={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white p-10 text-center shadow-soft">
      <div className="text-6xl">🌱</div>
      <h3 className="mt-4 font-display text-2xl font-extrabold text-brand-teal">Coming soon!</h3>
      <p className="mt-2 text-text-soft">
        We're cooking up new programs in this category. Check back soon — or send us a WhatsApp to be notified first.
      </p>
      <a
        href="https://wa.me/15555555555"
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-display text-sm font-extrabold text-white"
      >
        Notify me
      </a>
    </div>
  );
}
