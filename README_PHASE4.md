# HST ENTERPRISES — Phase 4 Admin & Backend Starter

This phase adds a PostgreSQL/Prisma schema, protected admin API routes, a simple admin dashboard, enquiry storage, project CRUD endpoints, and tender/certificate creation/list endpoints.

## Requirements
- Node.js 20.9+
- PostgreSQL running locally or remotely
- npm

## 1. Install dependencies
The project uses Next.js 15, Prisma and PostgreSQL. Run:

```bash
npm install
npm install @prisma/client
npm install -D prisma
```

## 2. Configure the database
Copy `.env.example` to `.env.local` and set `DATABASE_URL` to your PostgreSQL database. Set a long random `ADMIN_API_KEY` too. Never commit `.env.local`.

Example:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/hst_enterprises?schema=public"
ADMIN_API_KEY="replace-with-a-long-random-secret"
```

## 3. Create tables
```bash
npx prisma generate
npx prisma migrate dev --name phase4_initial
```

If Prisma reports that the database does not exist, create a PostgreSQL database named `hst_enterprises` first, or change the connection URL to an existing database.

## 4. Start the site
```bash
npm run dev
```
Open:
- Public website: `http://localhost:3000`
- Admin portal: `http://localhost:3000/admin`

## Available endpoints
- `POST /api/enquiries` — public enquiry form submission
- `GET /api/admin/overview` — summary counts (requires `x-admin-key`)
- `GET /api/admin/projects` — list projects (requires `x-admin-key`)
- `POST /api/admin/projects` — create project (requires `x-admin-key`)
- `PATCH /api/admin/projects/:id` — update project (requires `x-admin-key`)
- `DELETE /api/admin/projects/:id` — delete project (requires `x-admin-key`)
- `GET /api/admin/enquiries` — list enquiries (requires `x-admin-key`)
- `PATCH /api/admin/enquiries/:id` — update enquiry status (requires `x-admin-key`)
- `GET/POST /api/admin/certificates` — list/create certificates (requires `x-admin-key`)
- `GET/POST /api/admin/tenders` — list/create tender records (requires `x-admin-key`)

## Important security note
This is a development starter, not a production-ready identity system. The dashboard sends a shared admin key from the browser to protected API routes; the key is not saved in localStorage, but it is still present in the running page's memory and network requests. Use only in a controlled development environment. Before production, replace this with individual admin accounts, hashed passwords, secure HTTP-only session cookies, CSRF protections where applicable, rate limiting, validation, audit logs, and role-based permissions. Never use a real long-term secret in a public browser app.

The enquiry endpoint should also get rate limiting and spam protection before production. File upload handling is not included yet; document URLs are plain text fields, not secure uploads.

## Project content note
The demo portfolio items are placeholders. Only publish verified projects, real tender information, and valid company certificates.
