import Link from "next/link";
import type { Program } from "@/data/programs";
import { ArrowRight } from "lucide-react";

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Link
      href={`/programs/${program.id}`}
      className="group block overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-brand-orange px-3 py-1 font-display text-xs font-extrabold text-white shadow-soft">
          {program.ageLabel}
        </span>
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 font-display text-xs font-extrabold text-brand-teal shadow-soft">
          <span>{program.categoryEmoji}</span> {program.categoryLabel}
        </span>
        {program.type === "camp" && program.campType && (
          <span className="absolute bottom-4 left-4 inline-flex items-center rounded-full bg-brand-yellow px-3 py-1 font-display text-xs font-extrabold text-brand-teal shadow-soft">
            {program.campType}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-extrabold text-brand-teal">{program.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-text-soft">{program.shortDescription}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-full bg-brand-mint px-2.5 py-1 font-display font-bold text-brand-teal">
              {program.duration}
            </span>
            <span className="font-display text-base font-extrabold text-brand-orange">{program.price}</span>
          </div>
          <span className="inline-flex items-center gap-1 font-display text-sm font-bold text-primary transition-transform group-hover:translate-x-0.5">
            Details <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
