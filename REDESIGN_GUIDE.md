# HST ENTERPRISES — Corporate Redesign Guide

## Design direction
- Deep Navy `#101C33`: navigation, footer, hero and primary actions.
- Champagne Gold `#C9A45C`: CTA accents, dividers and small highlights only.
- Soft White `#F5F7FA`: content sections and neutral surfaces.
- Slate Blue `#26364D`: secondary dark surfaces.
- Technical Teal `#16A085`: reserved for status/confirmation UI.

## What changed in this source
1. Corrected `next.config.ts` remote image pattern (`protocol: https`, `hostname: images.unsplash.com`).
2. Updated Tailwind colour tokens to the corporate palette.
3. Added a shared Framer Motion route-entry transition in `src/app/template.tsx`.
4. Added a lightweight IntersectionObserver reveal effect to `SiteShell`, with a reduced-motion opt-out and visible-by-default content if JS/observer is unavailable.
5. Refined global spacing, buttons, cards, focus states, mobile sizing and reduced-motion CSS.
6. The language selector now persists the selected language in localStorage for the shell controls. The homepage already has its own full Hindi/English copy; inner-page body copy remains English until the page-specific translation pass is completed.

## Next implementation order
- Pass 1: shared design system and motion (included).
- Pass 2: create a shared language context and translate About, Services, Projects, Tenders, Certificates and Contact page copy.
- Pass 3: connect contact form to `POST /api/enquiries` and add validation, rate limiting and server-side spam protection.
- Pass 4: replace sample portfolio entries with verified project data and approved photographs.
- Pass 5: replace Phase 4 shared-key browser admin access with server-side session authentication before production.

## Run locally
```bash
npm install
npm run dev
```
Then open `http://localhost:3000`. If the development server is already running after a `next.config.ts` change, stop it with Ctrl+C and restart it.

## Performance notes
- The scroll reveal uses the browser's IntersectionObserver rather than a scroll listener.
- Reduced-motion preferences disable nonessential motion.
- Use optimized local WebP/AVIF project photography in production; avoid autoplay video backgrounds.
- Use Three.js only if a real 3D building model is available; current immersive effects remain CSS/Framer Motion based.

## Production warning
This is a starter project, not a production security audit. Review admin authentication, environment secrets, data validation, rate limiting, privacy notice, real contact details, accessibility and all company claims before launch.
