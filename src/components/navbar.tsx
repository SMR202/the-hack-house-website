"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { HouseLogo } from "./brand";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/haven-autism", label: "Haven Autism" },
  { href: "/haven-montessori", label: "Haven Montessori" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!mobileOpen) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const previousStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      Object.assign(body.style, previousStyles);
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "frosted shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <Link href="/" aria-label="The Hack House home" className="flex items-center">
          <HouseLogo className="h-14 w-14 md:h-16 md:w-16" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <NavLink key={item.href} href={item.href} pathname={pathname}>{item.label}</NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/register"
            className="hidden items-center gap-1.5 rounded-full bg-brand-orange px-5 py-2.5 font-display text-sm font-extrabold text-brand-orange-foreground shadow-glow-orange transition-transform hover:scale-[1.03] md:inline-flex"
          >
            Register Now <Sparkles className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="inline-flex items-center justify-center rounded-full p-2 text-brand-teal lg:hidden"
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

function NavLink({ href, pathname, children }: { href: string; pathname: string; children: React.ReactNode }) {
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={`group relative px-3 py-2 font-display text-sm font-bold transition-colors hover:text-primary after:absolute after:bottom-1 after:left-3 after:h-0.5 after:w-[calc(100%-1.5rem)] after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100 ${
        isActive ? "text-primary after:scale-x-100" : "text-brand-teal"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return createPortal(
    <div
      className="fixed left-0 top-0 z-[60] h-[100dvh] w-screen overflow-hidden overscroll-contain lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      data-lenis-prevent
    >
      <div
        className="absolute inset-0 bg-brand-teal/40 animate-[fade-in_0.2s_ease-out]"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 flex h-[100dvh] w-[88%] max-w-sm flex-col bg-white shadow-lift animate-[slide-in-right_0.3s_cubic-bezier(0.22,1,0.36,1)]">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center">
            <HouseLogo className="h-16 w-16" />
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="rounded-full p-2 text-brand-teal hover:bg-brand-mint"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block rounded-2xl px-4 py-3 font-display text-base font-bold text-brand-teal hover:bg-brand-mint"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-brand-mint p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Link
            href="/register"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-3.5 font-display text-base font-extrabold text-brand-orange-foreground shadow-glow-orange"
          >
            Register Now <Sparkles className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}
