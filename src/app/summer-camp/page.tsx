import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { ALL_CAMPS_QUERY, ALL_AGE_GROUPS_QUERY } from "@/sanity/lib/queries";
import type { Program, AgeGroup } from "@/types/sanity";
import SummerCampClient from "./summer-camp-client";

export const metadata: Metadata = {
  title: "Summer Camp — The Hack House",
  description:
    "The best summer your child has ever had. Day camps and residential adventures for kids aged 5–14, all summer long.",
  openGraph: {
    title: "Summer Camp — The Hack House",
    description: "The best summer your child has ever had ☀️",
    images: [
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

export default async function SummerCampPage() {
  const [camps, ageGroups] = await Promise.all([
    sanityFetch<Program[]>({ query: ALL_CAMPS_QUERY }),
    sanityFetch<AgeGroup[]>({ query: ALL_AGE_GROUPS_QUERY }),
  ]);

  return <SummerCampClient camps={camps} ageGroups={ageGroups} />;
}
