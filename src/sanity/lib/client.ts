import { createClient, type QueryParams } from "next-sanity";
import { projectId, dataset, apiVersion } from "../env";
import {
  AGE_GROUP_BY_KEY_QUERY,
  ALL_AGE_GROUP_KEYS_QUERY,
  ALL_AGE_GROUPS_QUERY,
  ALL_CORE_PROGRAMS_QUERY,
  ALL_MONTESSORI_QUERY,
  ALL_PROGRAMS_QUERY,
  ALL_PROGRAM_SLUGS_QUERY,
  ALL_TESTIMONIALS_QUERY,
  FEATURED_PROGRAMS_QUERY,
  PROGRAM_BY_SLUG_QUERY,
  PROGRAMS_BY_AGE_AND_TYPE_QUERY,
  PROGRAMS_BY_SECTION_QUERY,
  RELATED_PROGRAMS_QUERY,
  SITE_SETTINGS_QUERY,
} from "./queries";
import {
  ageGroups as localAgeGroups,
  programs as localPrograms,
  stats,
  team,
  testimonials,
} from "@/data/programs";

const hasSanityConfig = Boolean(projectId && dataset);

export const client = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
  : null;

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
  if (!client) {
    return localFetch<T>(query, params);
  }

  return client.fetch<T>(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  });
}

function localFetch<T>(query: string, params: QueryParams): T {
  const ageGroupList = Object.values(localAgeGroups).map((ageGroup) => ({
    ...ageGroup,
    key: ageGroup.id,
  }));
  const siteSettings = {
    _id: "local-site-settings",
    title: "The Hack House",
    description: "Parent company for Haven Autism and Haven Montessori.",
    stats,
    team,
    categories: [
      { id: "autism", label: "Autism Support", emoji: "💙" },
      { id: "montessori", label: "Montessori", emoji: "🌱" },
      { id: "early-learning", label: "Early Learning", emoji: "📚" },
      { id: "therapy", label: "Therapy", emoji: "🤝" },
      { id: "life-skills", label: "Life Skills", emoji: "✨" },
      { id: "parent-support", label: "Parent Support", emoji: "🏡" },
      { id: "arts", label: "Arts & Crafts", emoji: "🎨" },
      { id: "cooking", label: "Cooking", emoji: "🍳" },
    ],
    heroSlides: [
      {
        image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80",
        title: "Haven Autism",
        subtitle: "Individualized support · Ages 5–14",
        badge: "💙 Programs",
      },
      {
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80",
        title: "Haven Montessori",
        subtitle: "Prepared classrooms · Early years",
        badge: "🌱 Montessori",
      },
    ],
    whatsappNumber: "+92 316 5322764",
  };
  const sectionFor = (program: { section?: string; type: string }) =>
    program.section ?? (program.type === "montessori" ? "haven-montessori" : "haven-autism");

  if (query === ALL_PROGRAMS_QUERY) {
    return localPrograms as T;
  }

  if (query === FEATURED_PROGRAMS_QUERY) {
    return localPrograms.filter((program) => program.type === "program").slice(0, 3) as T;
  }

  if (query === ALL_CORE_PROGRAMS_QUERY) {
    return localPrograms.filter((program) => sectionFor(program) === "haven-autism") as T;
  }

  if (query === ALL_MONTESSORI_QUERY) {
    return localPrograms.filter((program) => sectionFor(program) === "haven-montessori") as T;
  }

  if (query === PROGRAMS_BY_SECTION_QUERY) {
    return localPrograms.filter((program) => sectionFor(program) === params.section) as T;
  }

  if (query === PROGRAMS_BY_AGE_AND_TYPE_QUERY) {
    return localPrograms.filter(
      (program) => program.ageGroup === params.ageGroup && program.type === params.type,
    ) as T;
  }

  if (query === PROGRAM_BY_SLUG_QUERY) {
    return (localPrograms.find((program) => program.id === params.slug) ?? null) as T;
  }

  if (query === RELATED_PROGRAMS_QUERY) {
    return localPrograms
      .filter(
        (program) =>
          program.id !== params.slug &&
          (program.category === params.category || program.ageGroup === params.ageGroup),
      )
      .slice(0, 3) as T;
  }

  if (query === ALL_PROGRAM_SLUGS_QUERY) {
    return localPrograms.map((program) => ({ programId: program.id })) as T;
  }

  if (query === ALL_AGE_GROUPS_QUERY) {
    return ageGroupList as T;
  }

  if (query === AGE_GROUP_BY_KEY_QUERY) {
    return (ageGroupList.find((ageGroup) => ageGroup.key === params.key) ?? null) as T;
  }

  if (query === ALL_AGE_GROUP_KEYS_QUERY) {
    return ageGroupList.map((ageGroup) => ({ ageGroup: ageGroup.key })) as T;
  }

  if (query === ALL_TESTIMONIALS_QUERY) {
    return testimonials as T;
  }

  if (query === SITE_SETTINGS_QUERY) {
    return siteSettings as T;
  }

  return null as T;
}
