# HST ENTERPRISES — Phase 1

Premium bilingual (English/Hindi) Next.js homepage for an engineering, building maintenance and facility services company.

## Requirements
- Node.js 20.9+
- npm

## Setup
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Production build
```bash
npm run build
npm start
```

## Main files
- `src/app/page.tsx` — homepage, language toggle, service cards and enquiry form
- `src/app/globals.css` — visual theme, responsive layout and building illustration
- `src/app/layout.tsx` — metadata and global stylesheet
- `tailwind.config.ts` — Tailwind theme
- `package.json` — dependencies and scripts

## Before publishing
1. Replace `info@hstenterprises.example` in `src/app/page.tsx` with the company's real enquiry email.
2. Add verified phone number, registered office address, GST/PAN and relevant registrations/certifications only if applicable.
3. Add real project photographs, work orders and client references only with permission.
4. The current form opens the visitor's email application using `mailto:`. To save enquiries online, connect a backend/API and add spam protection.
5. The building illustration is CSS-drawn; no external image or 3D model is required.
6. Review all service claims against the company's actual capabilities and tender eligibility before publishing.

## Notes
The site is a Phase 1 frontend prototype. It does not include a database, authentication, admin dashboard, tender feed or backend form storage.


## Phase 3 additions
- Interactive building systems explorer embedded on the homepage.
- Animated, filterable project gallery with detail modal on `/projects`.
- Responsive CSS building illustration.
- Gallery items are placeholders; replace with verified projects and approved images before publishing.


Phase 4 adds `prisma/schema.prisma`, protected API routes, a starter admin portal at `/admin`, and a database-backed public enquiry endpoint at `POST /api/enquiries`. See `README_PHASE4.md` for setup and security limitations.
