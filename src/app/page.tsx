import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import {
  FEATURED_PROGRAMS_QUERY,
  ALL_TESTIMONIALS_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/lib/queries";
import type { Program, Testimonial, SiteSettings } from "@/types/sanity";
import HomePageClient from "./home-client";

export const metadata: Metadata = {
  title: "The Hack House — A Place to Explore, Create & Grow",
  description:
    "Workshops & summer camps for kids aged 5–14. Arts, cooking, science, sports, drama, music — find their spark at The Hack House.",
  openGraph: {
    title: "The Hack House — A Place to Explore, Create & Grow",
    description: "Workshops & summer camps packed with creativity, adventure, and fun.",
    images: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

export default async function HomePage() {
  const [featured, testimonials, settings] = await Promise.all([
    sanityFetch<Program[]>({ query: FEATURED_PROGRAMS_QUERY }),
    sanityFetch<Testimonial[]>({ query: ALL_TESTIMONIALS_QUERY }),
    sanityFetch<SiteSettings | null>({ query: SITE_SETTINGS_QUERY }),
  ]);

  return (
    <HomePageClient
      featured={featured}
      testimonials={testimonials}
      categories={settings?.categories ?? []}
      heroSlides={settings?.heroSlides ?? []}
    />
  );
}
