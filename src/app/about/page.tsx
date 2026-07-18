import type { Metadata } from "next";
import { getSiteSettings } from "@/sanity/lib/client";
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
  const settings = await getSiteSettings();
  return (
    <AboutPageClient
      team={settings?.team ?? []}
      stats={settings?.stats ?? []}
      settings={settings}
    />
  );
}
