export type ProgramOwner = "hack-house" | "haven-autism" | "haven-montessori";

export interface Program {
  _id?: string;
  id: string;
  title: string;
  owner: ProgramOwner;
  ageLabel?: string;
  duration?: string;
  price?: string;
  spotsLeft?: number;
  totalSpots?: number;
  dates?: string;
  time?: string;
  location?: string;
  image: string;
  gallery?: string[];
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  instructor?: {
    name: string;
    role: string;
    bio: string;
    photo: string;
  };
  featured?: boolean;
  order?: number;
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

export interface SiteSettings {
  _id?: string;
  title: string;
  description?: string;
  stats: StatItem[];
  team: TeamMember[];
  heroSlides: HeroSlide[];
  whatsappNumber?: string;
  email?: string;
  address?: string;
  mapUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
}

export interface RegistrationPayload {
  participantName: string;
  participantAge?: string;
  contactName: string;
  email: string;
  whatsapp: string;
  owner: ProgramOwner;
  programId: string;
  source?: string;
  notes?: string;
  consent: boolean;
  website?: string;
}
