
# The Hack House — Multi-Screen Marketing Site

A joyful, premium kids' activity & education brand site. Built as a real multi-route TanStack Start app (not a single scrolling page) so every screen has its own URL, SSR, and SEO. All visuals follow the strict turquoise/orange/teal palette with Nunito + Inter typography, watercolor blob accents, wavy dividers, confetti dot patterns, and floating activity sticker badges.

## Routes & Screens

1. **`/` Home** — Sticky frosted navbar, deep teal hero with confetti dots & floating activity stickers, 3-card brochure slideshow (tilted stack, auto-advance, dot nav), Featured Programs (3 cards w/ age & category badges, hover lift), Activity Categories strip (Arts, Cooking, Science, Sports, Drama, Music — no tech), 3-step "How It Works" with dashed orange curve, scrolling testimonials carousel, dark teal footer.
2. **`/workshops`** — Gradient hero, 3 age-group cards (Little Explorers 6–9, Junior Creators 10–13, Teen Makers 14+).
3. **`/workshops/ages-6-9`** (+ `ages-10-13`, `ages-14-plus`) — Filter pill bar by category, program grid, friendly empty state.
4. **`/programs/$programId`** — Program detail: hero w/ overlay, 2-col layout, "What Kids Will Do" checklist, masonry gallery w/ lightbox, instructor card, sticky right sidebar (price, dates, animated spots-left bar, Register CTA, WhatsApp link), "You Might Also Like".
5. **`/summer-camp`** — Warm orange→teal gradient hero, 3 camp age-group cards (Mini Adventurers, Camp Creators, Explorer Teens) with Day/Residential tags.
6. **`/register`** — 4-section form (About Your Child, Parent/Guardian, Program Details w/ Workshop|Camp toggle, Anything Else), pre-fills program from query param, large rounded inputs w/ turquoise focus, inline validation.
7. **`/register/success`** — Confetti burst, animated turquoise checkmark, registration summary, green WhatsApp payment instruction card, suggested programs.
8. **`/about`** — Hero, Our Story 2-col, oversized turquoise mission quote, team grid w/ playful role titles, count-up stats strip, map + contact.

## Global Components

- **Navbar** with hover dropdowns: Workshops & Summer Camp dropdowns slide down as rounded white cards with mini age-group cards (icon + tagline + hover highlight).
- **Mobile nav**: full-screen slide-in from right, accordion sections for Workshops/Summer Camp, sticky Register CTA at bottom.
- **Footer** (dark teal w/ subtle confetti pattern, 4 columns, WhatsApp + socials).
- **Wavy SVG section dividers**, watercolor blob backgrounds, hand-drawn squiggle underline SVG component.

## Design System

- Palette tokens added to `styles.css` as semantic CSS vars: turquoise `#29B8B0`, orange `#E8873A`, dark teal `#1A3C40`, mint white `#F8FBFB`, soft yellow `#FFD166`, soft pink `#FF8FAB`, plus text tokens. Tailwind utilities map via `@theme inline` (bg-primary, bg-accent-orange, etc.).
- Fonts: Nunito (headings, badges) + Inter (body) loaded via Google Fonts in `__root.tsx`.
- Card radius 24px, soft layered shadows, 1.03 hover scale on buttons, -6px lift on cards.
- Activity icons via Lucide (Palette, ChefHat, FlaskConical, Trophy, Drama, Music) — no tech iconography anywhere.

## Animations

Tailwind keyframes for fade-up, scale-in, slide-in, confetti burst, count-up (IntersectionObserver hook), spots progress bar fill, frosted-glass navbar on scroll, slideshow crossfade w/ pause-on-hover.

## Content & Data

In-memory programs dataset (12–15 sample programs across categories & age groups) shared by home, listing, and detail pages. Testimonials, team members, and stats as typed local data. No backend needed for this scope.

## SEO

Each route defines its own `head()` with unique title, description, and og:title/og:description. Hero image used as og:image on home, program detail uses program photo.

## Mobile

All screens fully responsive. Program detail gets a bottom-pinned Register button on mobile; sidebar collapses below content; gallery becomes 2-col.

## Out of Scope (this build)

- Real backend / database / auth
- Real WhatsApp send (button opens `wa.me` link)
- Lightbox library (will use a lightweight custom modal)
- CMS — content is hard-coded sample data ready to be swapped later
