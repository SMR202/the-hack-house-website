import type { Metadata } from "next";
import { getSiteSettings, sanityFetch } from "@/sanity/lib/client";
import {
  FEATURED_PROGRAMS_QUERY,
  ALL_TESTIMONIALS_QUERY,
} from "@/sanity/lib/queries";
import type { Program, Testimonial } from "@/types/sanity";
import HomePageClient from "./home-client";

export const metadata: Metadata = {
  title: "The Hack House — A Place to Explore, Create & Grow",
  description: "Explore programs from The Hack House, Haven Autism, and Haven Montessori.",
  openGraph: {
    title: "The Hack House — A Place to Explore, Create & Grow",
    description: "The Hack House programs, Haven Autism, and Haven Montessori under one roof.",
    images: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

export default async function HomePage() {
  const [featured, testimonials, settings] = await Promise.all([
    sanityFetch<Program[]>({ query: FEATURED_PROGRAMS_QUERY }),
    sanityFetch<Testimonial[]>({ query: ALL_TESTIMONIALS_QUERY }),
    getSiteSettings(),
  ]);

  return (
    <HomePageClient
      featured={featured}
      testimonials={testimonials}
      heroSlides={settings?.heroSlides ?? []}
    />
  );
}
