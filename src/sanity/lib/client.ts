import "server-only";
import { createClient, type QueryParams } from "next-sanity";
import { projectId, dataset, apiVersion } from "../env";
import {
  ALL_PROGRAMS_QUERY,
  ALL_PROGRAM_SLUGS_QUERY,
  ALL_TESTIMONIALS_QUERY,
  FEATURED_PROGRAMS_QUERY,
  PROGRAM_BY_SLUG_QUERY,
  PROGRAMS_BY_OWNER_QUERY,
  RELATED_PROGRAMS_QUERY,
  SITE_SETTINGS_QUERY,
} from "./queries";
import {
  programs as legacyPrograms,
  stats,
  team,
  testimonials,
} from "@/data/programs";
import type { Program, ProgramOwner, SiteSettings } from "@/types/sanity";

const hasSanityConfig = Boolean(projectId && dataset);
let readClient: ReturnType<typeof createClient> | null = null;

function getReadClient() {
  if (!hasSanityConfig) return null;
  if (readClient) return readClient;

  const token = process.env.SANITY_API_TOKEN ?? process.env.SANITY_EDITOR_TOKEN;
  if (!token) {
    throw new Error("A server-only Sanity token is required to read the private dataset");
  }

  readClient = createClient({ projectId, dataset, apiVersion, token, useCdn: false });
  return readClient;
}

export async function sanityFetch<T = unknown>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}): Promise<T> {
  const client = getReadClient();
  if (!client) return localFetch<T>(query, params);

  return client.fetch<T>(query, params, {
    next: { revalidate: tags.length ? false : revalidate, tags },
  });
}

export function getSiteSettings() {
  return sanityFetch<SiteSettings | null>({
    query: SITE_SETTINGS_QUERY,
    revalidate: 0,
  });
}

function legacyOwner(program: Record<string, unknown>): ProgramOwner {
  if (program.id === "haven-therapy-services") return "haven-autism";
  if (program.type === "montessori" || program.section === "haven-montessori") {
    return "haven-montessori";
  }
  return "hack-house";
}

const retainedLegacyPrograms = legacyPrograms.filter((program) => {
  if (!program.section || program.section === "haven-montessori") return true;
  return program.section === "crash-courses-children" && [
    "toddler-tot-program",
    "little-leaders-growth",
    "teen-led-program",
  ].includes(program.id);
});

const localPrograms: Program[] = retainedLegacyPrograms.map((program) => ({
  _id: `local-${program.id}`,
  id: program.id,
  title: program.title,
  owner: legacyOwner(program as unknown as Record<string, unknown>),
  ageLabel: program.ageLabel,
  duration: program.duration,
  price: program.price,
  spotsLeft: program.spotsLeft,
  totalSpots: program.totalSpots,
  dates: program.dates,
  time: program.time,
  location: program.location,
  image: program.image,
  gallery: program.gallery,
  shortDescription: program.shortDescription,
  longDescription: program.longDescription,
  highlights: program.highlights?.length ? program.highlights : program.whatKidsWillDo,
  instructor: program.instructor,
  featured: program.featured,
  order: program.order,
}));

function localFetch<T>(query: string, params: QueryParams): T {
  const siteSettings: SiteSettings = {
    _id: "local-site-settings",
    title: "The Hack House",
    description: "Programs from The Hack House, Haven Autism, and Haven Montessori.",
    stats,
    team,
    heroSlides: [],
  };

  if (query === ALL_PROGRAMS_QUERY) return localPrograms as T;
  if (query === FEATURED_PROGRAMS_QUERY) {
    const featured = localPrograms.filter((program) => program.featured);
    return (featured.length ? featured : localPrograms.slice(0, 6)) as T;
  }
  if (query === PROGRAMS_BY_OWNER_QUERY) {
    return localPrograms.filter((program) => program.owner === params.owner) as T;
  }
  if (query === PROGRAM_BY_SLUG_QUERY) {
    return (localPrograms.find((program) => program.id === params.slug) ?? null) as T;
  }
  if (query === RELATED_PROGRAMS_QUERY) {
    return localPrograms
      .filter((program) => program.id !== params.slug && program.owner === params.owner)
      .slice(0, 3) as T;
  }
  if (query === ALL_PROGRAM_SLUGS_QUERY) {
    return localPrograms.map((program) => ({ programId: program.id })) as T;
  }
  if (query === ALL_TESTIMONIALS_QUERY) return testimonials as T;
  if (query === SITE_SETTINGS_QUERY) return siteSettings as T;
  return null as T;
}
