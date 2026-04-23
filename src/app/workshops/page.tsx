import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { ALL_WORKSHOPS_QUERY, ALL_AGE_GROUPS_QUERY } from "@/sanity/lib/queries";
import type { Program, AgeGroup } from "@/types/sanity";
import WorkshopsLandingClient from "./workshops-client";

export const metadata: Metadata = {
  title: "Workshops — The Hack House",
  description:
    "Hands-on weekend workshops for kids aged 5–14. Arts, cooking, science, sports, drama, music. Choose your age group and dive in.",
  openGraph: {
    title: "Workshops — The Hack House",
    description: "Hands-on sessions where kids learn by doing.",
  },
};

export default async function WorkshopsPage() {
  const [programs, ageGroups] = await Promise.all([
    sanityFetch<Program[]>({ query: ALL_WORKSHOPS_QUERY }),
    sanityFetch<AgeGroup[]>({ query: ALL_AGE_GROUPS_QUERY }),
  ]);

  return <WorkshopsLandingClient programs={programs} ageGroups={ageGroups} />;
}
