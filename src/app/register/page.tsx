import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { ALL_PROGRAMS_QUERY } from "@/sanity/lib/queries";
import type { Program } from "@/types/sanity";
import RegisterClient from "./register-client";

export const metadata: Metadata = {
  title: "Register — The Hack House",
  description: "Secure your child's spot in a Hack House workshop or summer camp.",
  openGraph: {
    title: "Register — The Hack House",
    description: "Secure your child's spot in a Hack House program.",
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
