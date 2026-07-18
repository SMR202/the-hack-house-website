import type { ProgramOwner } from "@/types/sanity";

export interface ProgramOwnerDetails {
  id: ProgramOwner;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
  emoji: string;
  accent: string;
}

export const programOwners: ProgramOwnerDetails[] = [
  {
    id: "hack-house",
    title: "The Hack House Programs",
    shortTitle: "Programs",
    description: "Creative, practical, and confidence-building programs from The Hack House.",
    href: "/programs",
    emoji: "✨",
    accent: "bg-brand-orange",
  },
  {
    id: "haven-autism",
    title: "Haven Autism",
    shortTitle: "Haven Autism",
    description: "Individualized support and developmental programs for children and families.",
    href: "/haven-autism",
    emoji: "💙",
    accent: "bg-primary",
  },
  {
    id: "haven-montessori",
    title: "Haven Montessori",
    shortTitle: "Haven Montessori",
    description: "Prepared environments that support independence, focus, and early learning.",
    href: "/haven-montessori",
    emoji: "🌱",
    accent: "bg-brand-teal",
  },
];

export const programOwnerById = Object.fromEntries(
  programOwners.map((owner) => [owner.id, owner]),
) as Record<ProgramOwner, ProgramOwnerDetails>;

export const getProgramOwner = (owner: ProgramOwner) => programOwnerById[owner];
