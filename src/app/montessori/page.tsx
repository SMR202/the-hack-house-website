import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { ALL_MONTESSORI_QUERY, ALL_AGE_GROUPS_QUERY } from "@/sanity/lib/queries";
import type { Program, AgeGroup } from "@/types/sanity";
import MontessoriClient from "./montessori-client";

export const metadata: Metadata = {
  title: "Haven Montessori — The Hack House",
  description:
    "Haven Montessori from The Hack House, a prepared early-learning environment for independence, focus, and joyful growth.",
  openGraph: {
    title: "Haven Montessori — The Hack House",
    description: "Prepared classrooms for early learners in the Haven family.",
    images: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

export default async function MontessoriPage() {
  const [programs, ageGroups] = await Promise.all([
    sanityFetch<Program[]>({ query: ALL_MONTESSORI_QUERY }),
    sanityFetch<AgeGroup[]>({ query: ALL_AGE_GROUPS_QUERY }),
  ]);

  return <MontessoriClient programs={programs} ageGroups={ageGroups} />;
}
