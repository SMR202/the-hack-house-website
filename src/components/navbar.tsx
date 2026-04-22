import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Sparkles, Palette, ChefHat, FlaskConical, Trophy, Drama, Music } from "lucide-react";
import { HouseLogo } from "./brand";
import { ageGroups } from "@/data/programs";

const workshopAgeLinks = [
  { id: "ages-6-9", icon: Palette, color: "text-primary" },
  { id: "ages-10-13", icon: FlaskConical, color: "text-brand-orange" },
  { id: "ages-14-plus", icon: Sparkles, color: "text-brand-pink" },
] as const;

const campAgeLinks = [
  { id: "ages-6-9", icon: ChefHat, color: "text-primary" },
  { id: "ages-10-13", icon: Drama, color: "text-brand-orange" },
  { id: "ages-14-plus", icon: Music, color: "text-brand-pink" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openDrop, setOpenDrop] = React.useState<null | "workshops" | "camps">(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const open = (which: "workshops" | "camps") => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDrop(which);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDrop(null), 120);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "frosted shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <HouseLogo className="h-9 w-9" />
          <span className="font-display text-xl font-extrabold tracking-tight text-brand-teal md:text-2xl">
            Hack House
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink to="/">Home</NavLink>
          <DropdownTrigger
            label="Workshops"
            onMouseEnter={() => open("workshops")}
            onMouseLeave={scheduleClose}
            isOpen={openDrop === "workshops"}
          >
            <Dropdown
              isOpen={openDrop === "workshops"}
              onMouseEnter={() => open("workshops")}
              onMouseLeave={scheduleClose}
            >
              <DropdownHeader title="Workshops by age" subtitle="Hands-on weekly sessions" />
              <div className="grid gap-2">
                {workshopAgeLinks.map((l) => {
                  const ag = ageGroups[l.id];
                  const Icon = l.icon;
                  return (
                    <Link
                      key={l.id}
                      to="/workshops/$ageGroup"
                      params={{ ageGroup: l.id }}
                      onClick={() => setOpenDrop(null)}
                      className="group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-brand-mint"
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-brand-mint ${l.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-display text-sm font-bold text-brand-teal">
                          {ag.name} <span className="text-text-soft font-medium">· {ag.range}</span>
                        </div>
                        <div className="text-xs text-text-soft">{ag.tagline}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Link
                to="/workshops"
                onClick={() => setOpenDrop(null)}
                className="mt-3 block rounded-xl bg-brand-mint px-3 py-2 text-center text-sm font-bold text-primary hover:bg-primary/15"
              >
                Browse all workshops →
              </Link>
            </Dropdown>
          </DropdownTrigger>

          <DropdownTrigger
            label="Summer Camp"
            onMouseEnter={() => open("camps")}
            onMouseLeave={scheduleClose}
            isOpen={openDrop === "camps"}
          >
            <Dropdown
              isOpen={openDrop === "camps"}
              onMouseEnter={() => open("camps")}
              onMouseLeave={scheduleClose}
            >
              <DropdownHeader title="Summer Camp" subtitle="The best summer ever ☀️" />
              <div className="grid gap-2">
                {campAgeLinks.map((l) => {
                  const ag = ageGroups[l.id];
                  const Icon = l.icon;
                  return (
                    <Link
                      key={l.id}
                      to="/summer-camp"
                      onClick={() => setOpenDrop(null)}
                      className="group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-brand-mint"
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-brand-mint ${l.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-display text-sm font-bold text-brand-teal">
                          {ag.campName} <span className="text-text-soft font-medium">· {ag.campRange}</span>
                        </div>
                        <div className="text-xs text-text-soft">{ag.tagline}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Dropdown>
          </DropdownTrigger>

          <NavLink to="/about">About Us</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/register"
            className="hidden items-center gap-1.5 rounded-full bg-brand-orange px-5 py-2.5 font-display text-sm font-extrabold text-white shadow-glow-orange transition-transform hover:scale-[1.03] md:inline-flex"
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

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: true }}
      activeProps={{ className: "text-primary after:scale-x-100" }}
      className="group relative px-3 py-2 font-display text-sm font-bold text-brand-teal transition-colors hover:text-primary after:absolute after:bottom-1 after:left-3 after:h-0.5 after:w-[calc(100%-1.5rem)] after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100"
    >
      {children}
    </Link>
  );
}

function DropdownTrigger({
  label,
  onMouseEnter,
  onMouseLeave,
  isOpen,
  children,
}: {
  label: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button
        type="button"
        className={`inline-flex items-center gap-1 px-3 py-2 font-display text-sm font-bold transition-colors ${
          isOpen ? "text-primary" : "text-brand-teal hover:text-primary"
        }`}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {children}
    </div>
  );
}

function Dropdown({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  children,
}: {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute left-1/2 top-full z-50 w-[340px] -translate-x-1/2 pt-3 animate-[slide-down_0.2s_ease-out]"
    >
      <div className="overflow-hidden rounded-3xl border border-brand-mint bg-white p-4 shadow-lift">
        {children}
      </div>
    </div>
  );
}

function DropdownHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-3 px-1">
      <div className="font-display text-base font-extrabold text-brand-teal">{title}</div>
      <div className="text-xs text-text-soft">{subtitle}</div>
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = React.useState<null | "workshops" | "camps">(null);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-brand-teal/40 animate-[fade-in_0.2s_ease-out]"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-lift animate-[slide-in-right_0.3s_cubic-bezier(0.22,1,0.36,1)]">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <HouseLogo className="h-8 w-8" />
            <span className="font-display text-lg font-extrabold text-brand-teal">Hack House</span>
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
          <Link
            to="/"
            onClick={onClose}
            className="block rounded-2xl px-4 py-3 font-display text-base font-bold text-brand-teal hover:bg-brand-mint"
          >
            Home
          </Link>
          <MobileAccordion
            label="Workshops"
            isOpen={expanded === "workshops"}
            onToggle={() => setExpanded(expanded === "workshops" ? null : "workshops")}
          >
            {workshopAgeLinks.map((l) => {
              const ag = ageGroups[l.id];
              return (
                <Link
                  key={l.id}
                  to="/workshops/$ageGroup"
                  params={{ ageGroup: l.id }}
                  onClick={onClose}
                  className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-teal hover:bg-brand-mint"
                >
                  <span className="font-display font-extrabold">{ag.name}</span>{" "}
                  <span className="text-text-soft">· {ag.range}</span>
                </Link>
              );
            })}
            <Link
              to="/workshops"
              onClick={onClose}
              className="block rounded-xl px-3 py-2.5 text-sm font-bold text-primary hover:bg-brand-mint"
            >
              Browse all workshops →
            </Link>
          </MobileAccordion>
          <MobileAccordion
            label="Summer Camp"
            isOpen={expanded === "camps"}
            onToggle={() => setExpanded(expanded === "camps" ? null : "camps")}
          >
            {campAgeLinks.map((l) => {
              const ag = ageGroups[l.id];
              return (
                <Link
                  key={l.id}
                  to="/summer-camp"
                  onClick={onClose}
                  className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-teal hover:bg-brand-mint"
                >
                  <span className="font-display font-extrabold">{ag.campName}</span>{" "}
                  <span className="text-text-soft">· {ag.campRange}</span>
                </Link>
              );
            })}
          </MobileAccordion>
          <Link
            to="/about"
            onClick={onClose}
            className="block rounded-2xl px-4 py-3 font-display text-base font-bold text-brand-teal hover:bg-brand-mint"
          >
            About Us
          </Link>
        </nav>
        <div className="border-t border-brand-mint p-4">
          <Link
            to="/register"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-3.5 font-display text-base font-extrabold text-white shadow-glow-orange"
          >
            Register Now <Sparkles className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileAccordion({
  label,
  isOpen,
  onToggle,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-2xl px-4 py-3 font-display text-base font-bold text-brand-teal hover:bg-brand-mint"
      >
        {label}
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="ml-3 grid gap-1 border-l-2 border-brand-mint py-1 pl-3">{children}</div>}
    </div>
  );
}
