import Link from "next/link";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { HouseLogo } from "./brand";

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-brand-teal text-white">
      <div className="absolute inset-0 bg-confetti-dark opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <HouseLogo className="h-10 w-10" />
              <span className="font-display text-2xl font-extrabold">Hack House</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-white/75">
              A place to explore, create & grow. Workshops and camps for kids aged 5–14, all year round.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://wa.me/15555555555"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </a>
              <SocialIcon href="#" label="Instagram"><Instagram className="h-4 w-4" /></SocialIcon>
              <SocialIcon href="#" label="Facebook"><Facebook className="h-4 w-4" /></SocialIcon>
            </div>
          </div>
          <FooterCol title="Quick Links">
            <FLink href="/">Home</FLink>
            <FLink href="/about">About Us</FLink>
            <FLink href="/register">Register</FLink>
          </FooterCol>
          <FooterCol title="Workshops">
            <FLink href="/workshops">All workshops</FLink>
            <FLink href="/workshops/ages-6-9">Little Explorers</FLink>
            <FLink href="/workshops/ages-10-13">Junior Creators</FLink>
            <FLink href="/workshops/ages-14-plus">Teen Makers</FLink>
          </FooterCol>
          <FooterCol title="Summer Camp">
            <FLink href="/summer-camp">All camps</FLink>
            <FLink href="/about">Our team</FLink>
          </FooterCol>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} The Hack House. Made with care for curious kids.</div>
          <div>123 Maple Lane · Hello@hackhouse.kids · +1 (555) 555-5555</div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
    >
      {children}
    </a>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-white/90">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm text-white/70">{children}</ul>
    </div>
  );
}

function FLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}
