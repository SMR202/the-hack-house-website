import type { Program } from "@/types/sanity";

export type ProgramSectionId =
  | "haven-autism"
  | "haven-montessori"
  | "party-hall"
  | "crash-courses-adults"
  | "crash-courses-children";

export type ParticipantKind = "child" | "adult" | "event" | "family";

export interface ProgramSection {
  id: ProgramSectionId;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  emoji: string;
  accent: string;
  href: string;
  participantKind: ParticipantKind;
  subsections: string[];
}

export const programSections: ProgramSection[] = [
  {
    id: "haven-autism",
    title: "Haven Autism",
    shortTitle: "Autism",
    subtitle: "Supportive programs for children",
    description:
      "Structured learning, creativity, communication, and confidence-building programs for children who benefit from extra care.",
    emoji: "💙",
    accent: "bg-primary",
    href: "/sections/haven-autism",
    participantKind: "child",
    subsections: ["Haven Autism"],
  },
  {
    id: "haven-montessori",
    title: "Haven Montessori",
    shortTitle: "Montessori",
    subtitle: "Montessori and daycare paths",
    description:
      "Prepared classrooms and daycare options for early learners, with calm routines and practical independence.",
    emoji: "🌱",
    accent: "bg-brand-teal",
    href: "/sections/haven-montessori",
    participantKind: "child",
    subsections: ["Montessori", "Day Care Monthly", "Day Care Hourly"],
  },
  {
    id: "party-hall",
    title: "Party Hall",
    shortTitle: "Party Hall",
    subtitle: "Hall bookings and event packages",
    description:
      "Flexible party hall packages for birthdays, gatherings, and family events with optional catering and decor.",
    emoji: "🎉",
    accent: "bg-brand-orange",
    href: "/sections/party-hall",
    participantKind: "event",
    subsections: ["Hall Only", "Hall + Catering", "Hall + Catering + Decor"],
  },
  {
    id: "crash-courses-adults",
    title: "Crash Courses for Adults",
    shortTitle: "Adult Courses",
    subtitle: "Focused 2-hour adult courses",
    description:
      "Short, practical crash courses for adults who want guided learning in Quran, cooking, crochet, and hands-on skills.",
    emoji: "📚",
    accent: "bg-brand-yellow",
    href: "/sections/crash-courses-adults",
    participantKind: "adult",
    subsections: ["Quran Course", "Cooking Classes", "Crochet Course"],
  },
  {
    id: "crash-courses-children",
    title: "Crash Courses for Children",
    shortTitle: "Children Courses",
    subtitle: "Creative short courses by age",
    description:
      "Two-hour children's crash courses grouped by age, with art, cooking, leadership, and early-years activities.",
    emoji: "✨",
    accent: "bg-brand-pink",
    href: "/sections/crash-courses-children",
    participantKind: "child",
    subsections: [
      "Toddler Tot Program",
      "Little Leaders Growth Program",
      "Teen Led Program",
      "Painting & Sketch",
      "Cooking",
    ],
  },
];

export const sectionById = Object.fromEntries(
  programSections.map((section) => [section.id, section]),
) as Record<ProgramSectionId, ProgramSection>;

export function getProgramSectionId(program: Pick<Program, "section" | "type">): ProgramSectionId {
  if (program.section) return program.section;
  return program.type === "montessori" ? "haven-montessori" : "haven-autism";
}

export function getProgramSection(program: Pick<Program, "section" | "type">) {
  return sectionById[getProgramSectionId(program)];
}

export function getParticipantKind(program: Pick<Program, "participantKind" | "section" | "type">): ParticipantKind {
  return program.participantKind ?? getProgramSection(program).participantKind;
}
