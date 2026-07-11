import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { ALL_PROGRAMS_QUERY } from "@/sanity/lib/queries";
import type { Program } from "@/types/sanity";
import RegisterClient from "./register-client";

export const metadata: Metadata = {
  title: "Register — The Hack House",
  description: "Register or enquire for Hack House programs, daycare, party hall packages, and crash courses.",
  openGraph: {
    title: "Register — The Hack House",
    description: "Register or enquire for a Hack House offering.",
  },
};

import { Suspense } from "react";

export default async function RegisterPage() {
  const programs = await sanityFetch<Program[]>({ query: ALL_PROGRAMS_QUERY });
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterClient programs={programs} />
    </Suspense>
  );
}
