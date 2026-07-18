import Link from "next/link";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { HouseLogo } from "./brand";

import type { SiteSettings } from "@/types/sanity";

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const displayWhatsapp = settings?.whatsappNumber;
  const waLink = displayWhatsapp ? `https://wa.me/${displayWhatsapp.replace(/\D/g, "")}` : null;
  const contactDetails = [settings?.address, settings?.email, displayWhatsapp].filter(Boolean).join(" · ");

  return (
    <footer className="relative mt-20 overflow-hidden bg-[oklch(0.96_0.02_195)] text-brand-teal">
      <div className="absolute inset-0 bg-confetti-light opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center">
              <HouseLogo className="h-24 w-24" />
            </div>
            <p className="mt-4 max-w-sm text-sm text-brand-teal/75">
              Parent company for Haven Autism and Haven Montessori, with child-centered programs for growing families.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {waLink && (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-105"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp us
                </a>
              )}
              {settings?.instagramUrl && <SocialIcon href={settings.instagramUrl} label="Instagram"><Instagram className="h-4 w-4" /></SocialIcon>}
              {settings?.facebookUrl && <SocialIcon href={settings.facebookUrl} label="Facebook"><Facebook className="h-4 w-4" /></SocialIcon>}
            </div>
          </div>
          <FooterCol title="Quick Links">
            <FLink href="/">Home</FLink>
            <FLink href="/about">About</FLink>
            <FLink href="/register">Register</FLink>
          </FooterCol>
          <FooterCol title="Programs">
            <FLink href="/programs">The Hack House</FLink>
            <FLink href="/haven-autism">Haven Autism</FLink>
            <FLink href="/haven-montessori">Haven Montessori</FLink>
          </FooterCol>
          <FooterCol title="The Hack House">
            <FLink href="/about">About us</FLink>
            <FLink href="/about">Our team</FLink>
          </FooterCol>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-brand-teal/10 pt-6 text-xs text-brand-teal/60 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} The Hack House. Made with care for curious kids.</div>
          {contactDetails && <div>{contactDetails}</div>}
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal transition-colors hover:bg-brand-teal/20"
    >
      {children}
    </a>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-brand-teal/90">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm text-brand-teal/70">{children}</ul>
    </div>
  );
}

function FLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="transition-colors hover:text-brand-teal/90">
        {children}
      </Link>
    </li>
  );
}
