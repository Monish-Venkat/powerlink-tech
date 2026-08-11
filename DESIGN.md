---
name: PowerLink Technologies
description: A trusted local power-and-security dealer's site — deep teal authority, one confident teal accent, copper only for energy moments.
colors:
  primary-dark: "hsl(200 65% 10%)"
  primary-light: "hsl(175 22% 97%)"
  primary-black: "hsl(200 62% 7%)"
  accent-blue: "hsl(174 72% 38%)"
  accent-cyan: "hsl(186 78% 46%)"
  accent-amber: "hsl(22 78% 48%)"
  border-neutral: "hsl(190 20% 87%)"
typography:
  display:
    fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "2.25rem (md: 3rem-4.5rem depending on surface)"
    fontWeight: 700
    lineHeight: 1.1
  headline:
    fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "1.875rem (md: 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "1rem (lg sections: 1.125rem-1.25rem)"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "0.1em"
rounded:
  xl: "12px"
  2xl: "16px"
  3xl: "24px"
  full: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.accent-blue}"
    textColor: "{colors.primary-light}"
    rounded: "{rounded.2xl}"
    padding: "24px 32px"
  button-primary-hover:
    backgroundColor: "{colors.accent-cyan}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.accent-blue}"
    rounded: "{rounded.2xl}"
    padding: "24px 32px"
  chip-outline:
    backgroundColor: "transparent"
    textColor: "{colors.accent-blue}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
  chip-outline-hover:
    backgroundColor: "{colors.accent-blue}"
    textColor: "{colors.primary-light}"
  card-product:
    backgroundColor: "{colors.primary-light}"
    rounded: "{rounded.3xl}"
---

# Design System: PowerLink Technologies

## Overview

**Creative North Star: "The Trusted Local Authority"**

PowerLink is a family power-and-security business, not a marketplace — the site's job is to feel like a serious, established local company you'd hand your home's electricity to, not a dropshipped storefront. The system is built on a single deep teal, one confident teal accent used everywhere action happens, and a warm copper reserved for the rare energy/solar moment. This is the second confirmed palette for this project: an earlier cyan/purple/pink mix gave way to a navy+blue system, which itself was replaced by this deep-teal+copper system after user feedback that the navy+blue combination felt "not attractive." Both prior palettes are confirmed visual rejections; new work should not reintroduce a third hue family into the core palette without an equally deliberate decision.

The page rhythm is a deliberate light/dark deck with a varied cadence rather than one repeated interval: the hero and final CTA run generous (`py-24`–`py-28`) as high-weight "peaks," the FAQ runs tighter (`py-16`) as a dense list, and everything else sits at `py-20`–`py-24`. Alternating white and deep-teal full-bleed sections give the scroll a heartbeat and let each section reset visual weight. Every section heading fuses a small icon badge directly with its H2 (icon centered above the heading text) — this replaced an earlier uppercase text "eyebrow" label that sat as a separate line above each heading; the eyebrow pattern is a confirmed rejection now (see Typography's Named Rule).

Depth reads differently by background: light sections lean on soft, often colored box-shadows and glassmorphism; dark sections abandon shadows (they don't read on the dark teal) in favor of low-opacity radial "glows." Corners are uniformly soft — nothing in the custom UI is sharp. The `--radius` gap flagged in the previous revision of this document (shadcn primitives resolving to a hard 0px corner) has been fixed: `--radius: 1rem` is now defined in `index.css`.

Motion is deliberately restrained compared to the previous revision: a decorative floating-particle field behind the hero and on the 404 page has been removed (it used an off-brand leftover color and added visual noise with no meaning), several icon/badge elements that pulsed forever with no state meaning have been stilled, and two duplicate/dead `.animate-gradient` keyframe definitions plus roughly twenty other unused animation utilities have been deleted from `index.css`. The hero is now the one authored focal moment: badge, headline, copy, and CTAs cascade in on load with a staggered, confident-deceleration entrance (`ease-confident`, no bounce) rather than every section reusing the same fade-and-rise. A pulse is used in exactly one place with real meaning: the chatbot's "online" status dot.

**Key Characteristics:**
- One dominant accent (teal) carries all interactive weight; copper is rationed to energy contexts only.
- Alternating light/dark full-bleed sections structure the page, with a deliberately varied spacing cadence (peaks at hero/CTA, a tighter FAQ) rather than one repeated interval.
- Every section heading pairs an icon badge (centered above) with its H2 — no separate text label precedes a heading anywhere in the system.
- Heavy, consistent corner rounding (12–24px, full pills for chips/badges) — no sharp corners in custom UI, and the shadcn radius token now actually backs this up.
- Display type (`font-display` → Space Grotesk, self-hosted) carries the brand's voice on headlines and stat numerals; body copy stays on Inter for readability.
- WhatsApp is the one conversion path; its buttons deliberately break the teal system for a green brand color, on purpose.
- Motion is purposeful, not ambient: one authored hero entrance, meaningful state feedback (hover, active category, online status), no decorative infinite loops.

## Colors

A one-hue brand system (deep teal + teal accent) with copper rationed to a single category of content.

### Primary
- **Trust Teal** (`hsl(174 72% 38%)`, token `--accent-blue`): the only color used for buttons, links, icons, active nav states, and focus rings. If in doubt about what color a new interactive element should be, it's this one. The token and utility class names retain their original "blue" naming from the previous palette revision for stability across the codebase — only the underlying HSL value changed.

### Secondary
- **Cyan Teal** (`hsl(186 78% 46%)`, token `--accent-cyan`): the second stop in every brand gradient (`executive-gradient`, `clean-gradient`, `gradient-text`, `gradient-text-hero`, `neon-border`). Previously this existed only as a repeated raw HSL literal with drifting lightness (48–55%) and no CSS custom property — that gap is now closed; `--accent-cyan` is the single source of truth and every gradient references it via `var()`.

### Tertiary
- **Copper** (`hsl(22 78% 48%)`, token `--accent-amber`): reserved for energy/solar moments — the "Trusted Since 2008" hero badge, solar-section icon badge, testimonial star ratings, the Location contact tile. It is not a general-purpose second brand color. Token/class names keep the "amber" naming from the prior revision.

### Neutral
- **Deep Teal** (`hsl(200 65% 10%)`, token `--primary-dark`): dark section backgrounds (hero, CCTV, contact/CTA), dark text on light backgrounds. Also now backs the shadcn `--primary` token, which previously held a stale, mismatched navy value left over from the original scaffold — that mismatch is fixed.
- **Cloud White** (`hsl(175 22% 97%)`, token `--primary-light`): light section backgrounds, light text on dark backgrounds.
- **Near Black** (`hsl(200 62% 7%)`, token `--primary-black`): the footer background — one step darker than `primary-dark`, used only there.
- **Border Gray** (`hsl(190 20% 87%)`, shadcn `--border`): hairline borders on light-background cards, retinted to sit in the same hue family as the rest of the neutrals instead of the old blue-gray.

### Named Rules
**The One-Hue Rule.** All interactive color lives in Trust Teal. A new button, link, or icon does not get to introduce its own accent color; it uses `--accent-blue` (teal) or it uses copper because it is genuinely an energy/solar moment — there is no third option.

**The WhatsApp Exception.** Every WhatsApp-facing CTA uses the green→emerald gradient (`from-green-500 to-emerald-600`) instead of the brand system. This is intentional brand recognition for the conversion action, not an inconsistency to "fix." Corollary: a non-WhatsApp action (e.g. the Phone contact tile, which opens the native dialer, not WhatsApp) should not borrow the green either — it previously did, which was a mismatch, and now uses teal instead.

**The One-Gradient-Text Rule.** Gradient-clip text (`.gradient-text`/`.gradient-text-warm`) is confirmed decoration per craft-floor and was previously scattered across ~13 headings — a real "this looks AI-generated" contributor flagged by both the mechanical detector and direct user feedback. It now appears in exactly one place: the hero's "Every Need," the single moment the brief treats as worth the effect. Every other heading emphasis (stat numbers, "PowerLink Technologies," "Our Mission," "Values," "Future?," the 404 digits) is solid `text-accent-blue` at full weight — size and color carry the emphasis, not a clip-text trick. Don't add a second gradient-text spot without removing the hero's claim to being the one.

## Typography

**Display Font:** Space Grotesk (self-hosted, `public/fonts/space-grotesk-*.woff2`, variable weight 500–700), applied via the `font-display` utility class.
**Body/Label Font:** Inter (self-hosted, `public/fonts/inter-*.woff2`, variable weight 400–800), applied globally as `font-sans` (the base font for `<body>`).

Both are self-hosted (not loaded from a CDN) with `latin`+`latin-ext` subsets only, `font-display: swap`, and the two most-used files preloaded from `index.html`. No runtime dependency on an external font host.

**Character:** Space Grotesk's geometric, slightly technical character carries the brand's voice on headlines, hero copy, and stat numerals — distinct from a generic platform sans, without being a novelty display face. Inter stays on body copy for maximum readability at small sizes.

### Hierarchy
- **Display** (`font-display`, 700, 2.25rem → up to 4.5rem depending on surface, tight leading): page-level H1/H2 hero headlines (`Power Solutions for Every Need`, `About PowerLink Technologies`), the 404 page's giant digits.
- **Headline** (`font-display`, 700, 1.875rem → 2.25rem at `md:`): section H2s (`UPS, Inverters & Batteries`, `Solar Solutions`), always paired with an icon badge above rather than a text label.
- **Title** (`font-display`, 700, 1.5rem): card-level titles — product names, footer brand lockup, service card titles.
- **Body** (Inter, 400, 1rem, up to 1.125–1.25rem in hero/lede copy, `leading-relaxed`): paragraph copy, generally at 60–80% opacity over its base text color rather than a separate muted color token.
- **Label** (Inter, 600, 0.875rem, `tracking-widest`, uppercase): small metadata only — brand names on product cards, the "Authorized dealer" strip label. No longer used as a heading kicker (see Named Rule below).

### Named Rules
**The Fused-Icon Rule.** Every major content section pairs a small icon badge with its H2 — icon centered above the heading, both reading as one heading unit, never a separate uppercase text line preceding the heading. This replaced an earlier "eyebrow" pattern (a small uppercase label sitting above every H2, e.g. "POWER BACKUP" → "UPS, Inverters & Batteries") that is now a confirmed rejection: the heading carries its own weight, and the icon badge gives a scannable topic cue without a redundant label doing the same job in words. Implemented as the file-local `SectionHeading` component in `Index.tsx`. On narrow viewports the icon stays centered *above* the heading (never inline-beside it) so a wrapped multi-line heading doesn't leave the icon visually orphaned against only one line of text.

## Layout

Centered container (Tailwind default: `2rem` side padding, capped at `1400px` from the `2xl` breakpoint). Sections are full-bleed and alternate light (`bg-primary-light`/white) and dark (`bg-solar-section`, deep teal) backgrounds down the page. Vertical rhythm is deliberately uneven rather than one repeated value: hero `py-28`, most product/feature sections `py-24`, denser sections (services, testimonials, about/stats) `py-20`, the FAQ list `py-16`, final contact/CTA `py-24` — peaks at the entrance and the close, a tighter beat where content is list-like. Content grids step `grid-cols-1` → `md:grid-cols-2` → `lg:grid-cols-3` (products, services, testimonials) with `gap-6` to `gap-8`. Two-column layouts (About mission/vision, the featured-product video block) go straight to `lg:grid-cols-2` without an intermediate `md` step.

### Named Rules
**The Alternating Deck Rule.** No two adjacent full-bleed sections share the same light/dark treatment. If a new section is being inserted, check its neighbors before choosing a background.

**The Header-Scale Rule.** A page header's brand lockup (logo + wordmark + tagline) must fit on one to two lines at 375px width. `About.tsx`'s header previously used larger type/logo sizing than `Index.tsx`'s equivalent header and wrapped to three lines on narrow phones; it now scales down below the `sm:` breakpoint to match.

## Elevation & Depth

Hybrid, split by background: **light sections use shadows; dark sections use glows.** Shadows never appear on the dark teal backgrounds — they're invisible there — so dark sections substitute soft, low-opacity radial-gradient "blooms" (`hsl(var(--accent-blue) / 0.14)`, `hsl(var(--accent-amber) / 0.08)`) positioned at section corners instead.

### Shadow Vocabulary
- **Card rest** (`shadow-xl` / `.elevation-soft`: `0 2px 8px rgba(0,0,0,.05), 0 8px 24px rgba(0,0,0,.08)`): default resting state for white cards on light sections.
- **Card hover glow** (`.hover-subtle-glow`: `0 0 30px hsl(var(--accent-blue)/.4), 0 0 60px hsl(var(--accent-blue)/.2), 0 8px 24px rgba(0,0,0,.15)` + `translateY(-4px) scale(1.02)`): the standard interactive-card hover — a colored glow, not a generic drop shadow.
- **Executive shadow** (`.professional-shadow`: layered teal-tinted shadows, now referencing `var(--primary-dark)` instead of a hardcoded literal): reserved for the hero's primary CTA button.

### Named Rules
**The No-Shadow-On-Navy Rule.** Never apply a `box-shadow`-based elevation to an element sitting directly on a `bg-solar-section`/`primary-dark` background expecting it to be visible — use a radial glow instead. (Rule name kept from the prior navy-era revision; the background is teal now, the physics are the same.)

**The No-Decorative-Glass Rule.** `.glass-card` and `.neon-border` (blur + translucency + a pulsing rainbow border) have been removed entirely — every usage sat on a flat or barely-textured background with nothing worth blurring, making the effect pure decoration, another confirmed AI-tell. Cards that were glass are now solid white (light sections) or `bg-white/5` with a hairline border (dark sections), with real shadow depth instead. Backdrop blur is still legitimate where something busy actually sits behind an element (e.g. the ChatBot panel over page content) — the rule is "blur must reveal something," not "never blur."

## Shapes

Uniformly soft. Every piece of custom UI uses `rounded-xl` (12px) through `rounded-3xl` (24px), with `rounded-full` for chips, badges, and icon pills. There is no sharp-corner idiom anywhere in the custom implementation.

**Resolved gap:** the shadcn primitives (`Card`, `Button` base, `Input`, and the Badge/Accordion internals) reference `rounded-lg`/`rounded-md`/`rounded-full`, which Tailwind maps to `var(--radius)`. `--radius` was previously undefined, silently collapsing any bare primitive to a hard 0px corner. `--radius: 1rem` is now defined in `index.css`, so bare primitives now render with soft corners consistent with the rest of the system.

## Components

### Buttons
- **Shape:** `rounded-xl`–`rounded-2xl` (12–16px) for standard CTAs; `rounded-full` for the Projects page's large pill CTAs.
- **Primary:** `.executive-gradient` — an animated diagonal gradient from Trust Teal to Cyan Teal (`background-size: 200% 200%`, 8s drift) with a radial white highlight overlay (`::after`) suggesting a light source from above. White text, bold weight.
- **Outline:** transparent background, 2px Trust Teal border, fills solid Trust Teal with white text on hover.
- **Hover/Active:** `.hover-scale` — springy `scale(1.04)` on hover, `scale(0.96)` on active (`cubic-bezier(0.34, 1.56, 0.64, 1)`). This springy curve is reserved for small tactile control feedback (buttons); larger layout-level entrances (the hero, the chatbot panel) use the confident, no-overshoot curve instead — see the Named Rule in the (removed) Overview note on motion.
- **WhatsApp buttons:** always `from-green-500 to-emerald-600`, never the teal system — see The WhatsApp Exception.

### Chips / Pills
- **Category tag** (on product cards): solid gradient fill (`from-accent-blue to-secondary/80`), white bold text, `rounded-2xl`, floated over the product image.
- **Quick-reply / filter chip** (chatbot quick replies, section filters): outline style — transparent/5%-tint background, 1px `accent-blue/30` border, `accent-blue` text, `rounded-full`; fills solid `accent-blue` with white text on hover. Two distinct chip idioms exist on purpose: the gradient tag *labels* an image, the outline pill *is* an interactive control.

### Cards / Containers
- **Corner style:** `rounded-3xl` (24px) for product cards; default shadcn `rounded-lg` (now backed by a real `--radius`) elsewhere.
- **Background:** solid white/`primary-light` on light sections; `bg-white/5` with a hairline border on dark sections. No decorative glass (see The No-Decorative-Glass Rule).
- **Border:** thin `accent-blue/15–20%` hairline on most cards — a colored border, not a neutral gray one.
- **Hover:** lift + glow (see Elevation), sometimes paired with an image `scale-105` zoom inside an `overflow-hidden` frame.
- **Internal padding:** `p-6`–`p-8` depending on card density.

### Process Flow (replaces a generic card grid)
The "Complete Service, End to End" section is a connected sequence, not four identical icon-cards — a confirmed craft-floor tell ("same-size cards of icon plus heading plus text as the page structure") that both the mechanical detector's spirit and direct user feedback flagged. It's now numbered icon nodes (white circle, teal border, small gradient number badge) joined by a single line — horizontal through the node centers on `lg:` and up, vertical between stacked nodes below it — with title/description per step. No `<Card>` wrapper, no per-item background box. Reuses the same "dot + connecting line" grammar as the About page's history Timeline, deliberately, so the device reads as a system signature rather than two unrelated one-offs.

### Inputs / Fields
- **Style:** `rounded-xl`, 1px `primary-dark/15` border, `primary-light` background (not pure white) — used in the chatbot's message input, overriding the shadcn default.
- **Focus:** border shifts to `accent-blue` plus a 1px `accent-blue/40` focus ring — a restrained ring, not a heavy glow.

### Navigation
- Sticky, `bg-primary-dark` header at all times (not transparent-then-solid, except the Projects page which adds a glassmorphism blur past a scroll threshold). Active/hover nav links get a soft `accent-blue/10` fill plus `accent-blue` text; several pages additionally sweep a fill or underline in from one side on hover. Mobile nav is a slide-down panel (`max-height` transition) under an animated hamburger-to-X icon. Header brand lockups scale down below `sm:` (see The Header-Scale Rule).

### ChatBot Widget (signature component)
The one component with real personality. A floating rounded-2xl launcher button (`.clean-gradient`, teal, with a small green "online" dot) expands into a `rounded-3xl` white panel with an `.executive-gradient` header. Message bubbles use asymmetric corner rounding — bot bubbles are `rounded-2xl rounded-bl-md`, user bubbles are `rounded-2xl rounded-br-md` — so the "flat" corner points toward its sender like a real chat thread. Quick-reply options render as the outline chip idiom described above. The panel's open animation uses the confident no-overshoot curve (not the springy button curve); the "online" status dot is the system's one deliberate ambient pulse, chosen because it has genuine meaning (liveness), unlike the decorative pulses removed elsewhere.

## Signature Interactions

Four technically-driven additions, chosen to make the site feel alive without competing with each other — one focal visual moment (the hero) plus a considered interaction layer everywhere else, per the brief's explicit direction.

### Living Circuit Hero (the one focal moment)
`src/components/CircuitHero.tsx` — a hand-rolled Canvas2D animated background filling the hero, replacing the removed SVG grid-pattern overlay. Procedurally generates 10–26 axis-aligned "circuit trace" polylines (PCB-style right-angle segments) sized to the viewport; static traces and junction nodes are drawn once to an offscreen buffer, and only a subset of traces (with a small amber minority, matching the copper-rationing rule) carry a traveling glow "pulse," redrawn each frame — this keeps the per-frame cost to a handful of small radial-gradient fills instead of re-stroking the whole network. A soft `lighter`-blended glow follows the cursor within the hero. Respects `prefers-reduced-motion` (renders one static frame, no loop), pauses via `IntersectionObserver` when scrolled out of view, and regenerates the trace layout via `ResizeObserver` so it never looks stretched. This is the site's one "wow" — nothing else on the page competes with it for that role.

### Cinematic Navigation
`src/hooks/useViewTransitionNavigate.ts` wraps every internal route change (header nav, footer Quick Links, About/Projects CTA buttons) in the View Transitions API (`document.startViewTransition` + `flushSync`) when the browser supports it; unsupported browsers just navigate normally, no fallback code needed beyond the feature check. The site header carries `view-transition-name: site-header` on all three pages so it morphs in place across a route change instead of cross-fading with the rest of the page — it reads as the same persistent element, because it is one. Timing: `0.32s` for the page cross-fade, `0.2s` for the header, both on the confident no-overshoot curve.

### Named Rules
**The Primary-Only Magnetic Rule.** `src/hooks/useMagnetic.ts` gives a button a few pixels of pointer-tracking lean plus a `scale(1.04)`, springing back with the system's tactile overshoot curve on leave. Applied only to the single highest-intent action in a given area — hero "Explore Products," every product card's "Get Instant Quote," the featured-product WhatsApp CTA, and each page's final CTA — never to outline/secondary buttons, nav, or chat controls. Diluting it onto every clickable thing would turn a considered signal into noise. Implementation detail: the hook writes `transform: translate(...) scale(...)` directly via inline style, so any element using it must not also carry `.hover-scale` or a Tailwind `hover:scale-*` class — inline style always wins the cascade, and stacking both silently drops one.

**The Scroll-Timeline Progressive-Enhancement Rule.** The hero's two ambient gradient orbs drift apart and scale up as you scroll past, via `animation-timeline: scroll(root)` inside `@supports (animation-timeline: scroll())` — Chrome/Edge/Safari get the parallax, Firefox and older browsers simply keep the orbs in their static resting position. No JavaScript scroll listener anywhere in this feature.

## Do's and Don'ts

### Do:
- **Do** put every primary CTA through WhatsApp (`wa.me/919901893191`) with a prefilled, context-specific message — that's the one real conversion event on this site, not a form or cart.
- **Do** pair every major section heading with an icon badge centered above it (The Fused-Icon Rule) — never a separate text eyebrow.
- **Do** alternate light/dark full-bleed section backgrounds down the page, with a deliberately varied spacing cadence rather than one repeated interval (The Alternating Deck Rule).
- **Do** keep copper rationed to energy/solar contexts; it is a tertiary accent, not a second workhorse color.
- **Do** use a colored glow instead of a shadow for any element sitting on a dark teal background (The No-Shadow-On-Navy Rule).
- **Do** reserve the springy `hover-scale` curve for small control feedback (buttons); use the confident no-overshoot curve for section- or panel-level entrances.
- **Do** give a page header's brand lockup a smaller variant below `sm:` so it never wraps past two lines (The Header-Scale Rule).
- **Do** keep gradient-clip text to the one hero spot (The One-Gradient-Text Rule); everywhere else, solid color plus weight/size is the emphasis mechanism.
- **Do** reserve the magnetic pointer-attraction effect for the single primary CTA in a given area (The Primary-Only Magnetic Rule) — it is a considered signal, not a hover default.

### Don't:
- **Don't** introduce a new hue family (the earlier cyan/purple/pink mix, and then the navy+blue system this one replaced, are both confirmed rejections).
- **Don't** reintroduce a text "eyebrow" label above a heading — fuse an icon with the heading instead (The Fused-Icon Rule).
- **Don't** add decorative, infinitely-looping motion (floating particles, pulsing icons/badges with no state meaning) — the previous revision had several of these, plus a full SVG grid-pattern overlay repeated across four pages, and all of it was removed as animation/visual debt, not preserved as style.
- **Don't** add or imply real customer testimonials, review counts, or certifications beyond the confirmed "18 years / 1500+ customers" figures — the current three homepage testimonials are explicitly-flagged placeholders (see `PRODUCT.md`), not a pattern to extend.
- **Don't** give WhatsApp buttons the teal treatment, or give a non-WhatsApp button the green treatment — the color-coding of that one exception is load-bearing, not decorative.
- **Don't** add backdrop blur as decoration on a flat or barely-textured background (The No-Decorative-Glass Rule) — `.glass-card`/`.neon-border` were removed for exactly this.
- **Don't** rebuild a repeated-content section as four-or-more identical `<Card>` icon+heading+text tiles by reflex — check whether the content is actually a sequence, a comparison, or a list first, and pick a structure that says so (see Process Flow).
- **Don't** combine `useMagnetic` with `.hover-scale` or a Tailwind `hover:scale-*` class on the same element — the inline transform from the hook wins the cascade and silently drops the other.
