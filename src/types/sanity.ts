/* ------------------------------------------------------------------ */
/*  Sanity-derived types — mirrors the original programs.ts types     */
/* ------------------------------------------------------------------ */

export type AgeGroupId = "ages-6-9" | "ages-10-13" | "ages-14-plus";
export type ProgramSectionId =
  | "haven-autism"
  | "haven-montessori"
  | "party-hall"
  | "crash-courses-adults"
  | "crash-courses-children";
export type ParticipantKind = "child" | "adult" | "event" | "family";
export type CategoryId =
  | "autism"
  | "montessori"
  | "early-learning"
  | "therapy"
  | "life-skills"
  | "parent-support"
  | "arts"
  | "cooking"
  | "science"
  | "sports"
  | "drama"
  | "music";

export interface Program {
  _id?: string;
  id: string;
  title: string;
  category: CategoryId;
  categoryLabel: string;
  categoryEmoji: string;
  section?: ProgramSectionId;
  subsectionLabel?: string;
  participantKind?: ParticipantKind;
  ageGroup: AgeGroupId;
  ageLabel: string;
  duration: string;
  price: string;
  spotsLeft: number;
  totalSpots: number;
  dates: string;
  time: string;
  location: string;
  image: string;
  gallery: string[];
  shortDescription: string;
  longDescription: string;
  whatKidsWillDo: string[];
  highlights?: string[];
  instructor: {
    name: string;
    role: string;
    bio: string;
    photo: string;
  };
  type: "program" | "montessori";
  campType?: "Haven Montessori" | "Early Years" | "Practical Life" | "Day Camp" | "Residential";
  featured?: boolean;
  order?: number;
}

export interface AgeGroup {
  _id?: string;
  id: AgeGroupId;
  key: AgeGroupId;
  name: string;
  range: string;
  tagline: string;
  campName: string;
  campRange: string;
}

export interface Testimonial {
  _id?: string;
  quote: string;
  parent: string;
  childAge: string;
  program: string;
  rating: number;
}

export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  badge: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface CategoryItem {
  id: string;
  label: string;
  emoji: string;
}

export interface SiteSettings {
  _id?: string;
  title: string;
  description?: string;
  stats: StatItem[];
  team: TeamMember[];
  categories: CategoryItem[];
  heroSlides: HeroSlide[];
  whatsappNumber?: string;
}
