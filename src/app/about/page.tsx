import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/types/sanity";
import AboutPageClient from "./about-client";

export const metadata: Metadata = {
  title: "About · The Hack House",
  description:
    "We're a community of educators, makers, and big kids on a mission to help every child find their spark. Meet the team behind The Hack House.",
  openGraph: {
    title: "About · The Hack House",
    description: "Every child has a spark. We just give them the space to shine.",
    images: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

export default async function AboutPage() {
  const settings = await sanityFetch<SiteSettings | null>({ query: SITE_SETTINGS_QUERY });
  return (
    <AboutPageClient
      team={settings?.team ?? []}
      stats={settings?.stats ?? []}
      whatsapp={settings?.whatsappNumber}
    />
  );
}
