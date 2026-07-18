import type { Metadata } from "next";
import { OwnerProgramsPage } from "@/components/owner-programs-page";
import { sanityFetch } from "@/sanity/lib/client";
import { PROGRAMS_BY_OWNER_QUERY } from "@/sanity/lib/queries";
import type { Program } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Haven Autism · The Hack House",
  description: "Individualized support and developmental programs from Haven Autism.",
};

export default async function HavenAutismPage() {
  const programs = await sanityFetch<Program[]>({
    query: PROGRAMS_BY_OWNER_QUERY,
    params: { owner: "haven-autism" },
  });
  return <OwnerProgramsPage ownerId="haven-autism" programs={programs} />;
}
