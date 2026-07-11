import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { ALL_CORE_PROGRAMS_QUERY, ALL_AGE_GROUPS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { Program, AgeGroup, SiteSettings } from "@/types/sanity";
import WorkshopsLandingClient from "../workshops/workshops-client";

export const metadata: Metadata = {
  title: "Programs — The Hack House",
  description:
    "Haven Autism programs from The Hack House, with age-based support for communication, confidence, and everyday growth.",
  openGraph: {
    title: "Programs — The Hack House",
    description: "Haven Autism programs designed around care, structure, and confidence.",
  },
};

export default async function ProgramsPage() {
  const [programs, ageGroups, settings] = await Promise.all([
    sanityFetch<Program[]>({ query: ALL_CORE_PROGRAMS_QUERY }),
    sanityFetch<AgeGroup[]>({ query: ALL_AGE_GROUPS_QUERY }),
    sanityFetch<SiteSettings | null>({ query: SITE_SETTINGS_QUERY }),
  ]);

  return <WorkshopsLandingClient programs={programs} ageGroups={ageGroups} whatsapp={settings?.whatsappNumber} />;
}
