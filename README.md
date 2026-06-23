# Svyne Event Frontend

Single React app for the Svyne multi-tenant event platform. One codebase serves four portals — **public**, **admin**, **staff**, **developer** — selected by subdomain. All structured data goes over **gRPC-Web** to `svyne-event-backend`; the only REST call is multipart image upload.

## Quick start

```bash
pnpm install
pnpm gen:proto          # generate gRPC stubs from ../svyne-event-backend/protos
cp .env.example .env    # set VITE_BACKEND_URL if not :60262
pnpm dev                # http://localhost:5173
```

Locally one dev server serves every portal. Switch with the **dev portal switcher** in the nav, or `?portal=admin|developer|staff`, or `VITE_PORTAL`.

## Scripts

| script | what |
|---|---|
| `pnpm dev` | Vite dev server |
| `pnpm build` | `tsc -b && vite build` (must be 0 warnings) |
| `pnpm lint` | ESLint flat config + custom `no-business-calc-in-jsx` rule |
| `pnpm gen:proto` | regenerate `src/shared/proto/` from backend `.proto` files |
| `pnpm preview` | preview the production build |

## Environment

| var | default | use |
|---|---|---|
| `VITE_BACKEND_URL` | `http://localhost:60262` | gRPC-Web + upload base URL |
| `VITE_GOOGLE_CLIENT_ID` | — | enables Google sign-in button when set |
| `VITE_PORTAL` | `public` | default portal in dev |

## Architecture

- `src/shared/apiClient.ts` — the only place gRPC clients are created (transport + auth interceptor).
- `src/shared/session.ts` — `callRpc()` refreshes on `UNAUTHENTICATED`, routes on `PERMISSION_DENIED`.
- `src/shared/{auth,roles,subdomain,theme,ui,components,hooks,lib}` — cross-cutting concerns.
- `src/features/{auth,public,admin,developer,staff}/{pages,services,hooks}` — feature-based; TSX is presentational, logic in services + hooks.
- `src/app/*Routes.tsx` — per-portal route trees, lazy-loaded by `App.tsx` (code-split).

## Roles

`0` Attendee · `1` Admin · `2` Staff · `3` Sub-Tenant · `99` Developer. Tenant/role/identity come from JWT claims; the backend resolves and enforces them. Developers carry `tenants_id = null` and bypass tenant context.

## Rules

See `../RULES.md`. Highlights enforced here: no comments in hand-written source, gRPC-Web only (Axios only for `/uploads/images`), no business math in `.tsx`, files ≤ 500–600 lines, 0-warning builds. The `event-platform/no-business-calc-in-jsx` ESLint rule fails the build on arithmetic over `*Cents`/`*Count`/`*Capacity`/etc. in `.tsx`.

## Known backend gaps

Wired on the frontend, awaiting backend RPCs: tenant branding config (colors/logo), a booking price-quote RPC, and anonymous (pre-login) public tenant resolution from subdomain.
