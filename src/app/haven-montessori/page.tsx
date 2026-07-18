import type { Metadata } from "next";
import { OwnerProgramsPage } from "@/components/owner-programs-page";
import { sanityFetch } from "@/sanity/lib/client";
import { PROGRAMS_BY_OWNER_QUERY } from "@/sanity/lib/queries";
import type { Program } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Haven Montessori · The Hack House",
  description: "Prepared environments that support independence, focus, and early learning.",
};

export default async function HavenMontessoriPage() {
  const programs = await sanityFetch<Program[]>({
    query: PROGRAMS_BY_OWNER_QUERY,
    params: { owner: "haven-montessori" },
  });
  return <OwnerProgramsPage ownerId="haven-montessori" programs={programs} />;
}
