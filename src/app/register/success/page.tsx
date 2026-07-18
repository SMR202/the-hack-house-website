import type { Metadata } from "next";
import { Suspense } from "react";
import SuccessPageClient from "./success-client";
import { getSiteSettings, sanityFetch } from "@/sanity/lib/client";
import { ALL_PROGRAMS_QUERY } from "@/sanity/lib/queries";
import type { Program } from "@/types/sanity";

export const metadata: Metadata = {
  title: "You're All Set! · The Hack House",
  description: "Your request was received. The Hack House team will follow up on WhatsApp.",
  robots: { index: false },
};

export default async function SuccessPage() {
  const [programs, settings] = await Promise.all([
    sanityFetch<Program[]>({ query: ALL_PROGRAMS_QUERY }),
    getSiteSettings(),
  ]);
  return (
    <Suspense>
      <SuccessPageClient programs={programs} whatsapp={settings?.whatsappNumber} />
    </Suspense>
  );
}
