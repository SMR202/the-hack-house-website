import type { Metadata } from "next";
import { Suspense } from "react";
import { sanityFetch } from "@/sanity/lib/client";
import { ALL_PROGRAMS_QUERY } from "@/sanity/lib/queries";
import type { Program } from "@/types/sanity";
import SuccessPageClient from "./success-client";

export const metadata: Metadata = {
  title: "You're All Set! · The Hack House",
  description: "Registration received. Complete your payment to confirm your spot.",
  robots: { index: false },
};

export default async function SuccessPage() {
  const programs = await sanityFetch<Program[]>({ query: ALL_PROGRAMS_QUERY });
  return (
    <Suspense>
      <SuccessPageClient programs={programs} />
    </Suspense>
  );
}
