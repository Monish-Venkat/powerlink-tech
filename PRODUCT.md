# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three confirmed segments, all in and around Bangalore, Karnataka:
- Homeowners dealing with power cuts, shopping for UPS/inverter systems, batteries, or rooftop solar.
- Businesses and shops (e.g. clinics, offices) needing reliable backup power for equipment that can't tolerate outages.
- Anyone — residential or commercial — specifically looking for CCTV/surveillance installation, independent of power-backup needs.

## Product Purpose

PowerLink Technologies is a local power-backup, solar, and security dealer and installer. The site's job is to build trust, showcase real installed work, and convert visitors into WhatsApp enquiries/quote requests — it is a lead-generation and credibility surface, not an e-commerce checkout.

## Positioning

Confirmed as a three-part claim (no single mechanism dominates):
1. **Full-service, not just sales** — free site assessment, professional installation, and ongoing AMC/maintenance, where competitors just sell the box.
2. **Trusted local track record** — 18 years serving Bangalore, 1500+ customers; a known local business, not a faceless online reseller.
3. **Authorized multi-brand dealer** — genuine products from Luminous, Exide, Amaron, LIVGUARD, Microtek, and Hikvision, with manufacturer warranty support.

## Operating Context

- Founded 2008 by Venkatesan K.
- Core categories: UPS & inverters, inverter batteries, CCTV security systems (Hikvision), solar panels/inverters/water heaters.
- Primary conversion path is WhatsApp (+91 99018 93191) — every product card, chatbot flow, and CTA routes there rather than to a cart or contact form.
- Deployed as a static Vite/React site on Cloudflare Workers (Wrangler).

## Capabilities and Constraints

- Existing stack: Vite + React 18 + TypeScript, Tailwind CSS, shadcn/ui, React Router. Do not re-ask; this is settled.
- On-site AI chatbot (rule-based, not a real LLM) handles common product questions and funnels to WhatsApp.
- Real project photography exists for solar and UPS installations (`public/prj/`); a real product demo video exists for the Microtek inbuilt-lithium UPS (`public/videos/microtek-lithium-ups.mp4`).
- Product images for the general catalog are currently hot-linked from third-party sites (Amazon, IndiaMART, brand sites) rather than self-hosted — a known fragility, not a design decision.

## Brand Commitments

- Name: PowerLink Technologies. Founder: Venkatesan K. Tagline pattern used sitewide: "Founded by Venkatesan K • Serving since 2008."
- Phone: +91 99018 93191. Email: info@powerlinktechnologies.in. Location: Bangalore, Karnataka.
- Visual identity settled in this redesign: deep navy + trustworthy blue + warm amber (energy/solar accent), replacing an earlier multi-hue cyan/purple/pink scheme. Logo mark is a simple "PLT" wordmark tile — no separate logo asset exists yet.

## Evidence on Hand

- Real: project photos in `public/prj/solar/` and `public/prj/ups/` (dental clinic UPS install, Ramamurthy Nagar solar install, Narsapura installs); Microtek lithium-UPS product video.
- **Not real — explicitly flagged:** the three testimonial quotes currently on the homepage ("Dental Clinic," "Residential Customer," "Business Owner") were written by the previous design pass as placeholders and are not actual customer feedback. The user will supply real reviews/case studies later. Future work must not add further fabricated quotes, pricing, certifications, or customer counts beyond the confirmed 1500+/18-year figures above — and should treat replacing these three placeholders as an open action item, not invent new ones in their place.

## Product Principles

1. Every path should lead to a WhatsApp conversation — that's the actual conversion event, not a form or cart.
2. Service credibility (assessment → install → AMC) is as much the product as the hardware brands sold.
3. Local, personal trust (18 years, named founder, real Bangalore project photos) is the core differentiator over anonymous online sellers — lean on real evidence, never invented proof.
4. Three customer segments (home backup, business backup, security-only) should each find their own on-ramp; don't collapse the site into a single generic pitch.

## Accessibility & Inclusion

No product-specific accessibility requirement has been established beyond standard web best practice (contrast, focus states, reduced-motion support already implemented in `index.css`).
