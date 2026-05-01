# Implementation Checklist (Current Codebase)

This checklist is based on the code that already exists and is ordered by practical impact.

---

## Phase 1: Real Authentication + Route Protection

### Goal
Replace mock login with DB-backed auth and enforce JWT/role rules on protected APIs.

### Backend tasks
- [ ] Replace mock user lookup in `backend/src/auth/auth.service.ts` with `UserEntity` repository lookup by email.
- [ ] Compare password with `bcrypt`/`argon2` instead of plain string match.
- [ ] Add `JwtAuthGuard` and apply to protected controllers:
  - `backend/src/users/users.controller.ts`
  - `backend/src/books/books.controller.ts`
  - `backend/src/borrow/borrow.controller.ts`
  - `backend/src/resources/resources.controller.ts` (at least upload).
- [ ] Add role guard/decorator and enforce minimum RBAC:
  - Admin: create librarian.
  - Librarian/Admin: create/update/delete books, issue/return borrows, upload resources.
  - Reader/Student: read-only resources/books where appropriate.
- [ ] Return consistent 401/403 errors for unauthorized/forbidden access.

### Frontend tasks
- [ ] Handle 401/403 centrally in `frontend/src/services/api-client.ts` (e.g., clear session and redirect).
- [ ] Hide/disable UI actions by role where needed:
  - `frontend/src/app/dashboard/page.tsx`
  - Any pages exposing privileged actions.

### Done criteria
- Login works against DB users.
- Protected endpoints reject missing/invalid token.
- Role-restricted actions are blocked server-side and reflected in UI.

---

## Phase 2: Password Security Migration

### Goal
Move from SHA-256 password storage to secure password hashing.

### Tasks
- [ ] Update user creation hash logic in `backend/src/users/users.service.ts` to `bcrypt`/`argon2`.
- [ ] Update auth verification in `backend/src/auth/auth.service.ts` accordingly.
- [ ] Add migration strategy for existing users:
  - Option A: reset seeded/local users.
  - Option B: one-time migration script for hash conversion if plaintext source exists.
- [ ] Update env/docs if hash config requires parameters.

### Done criteria
- No new SHA-256 password hashes are created.
- Auth uses secure verify function.

---

## Phase 3: Borrow Persistence Completeness

### Goal
Ensure borrow table/schema is fully represented in migrations and stable at runtime.

### Tasks
- [ ] Confirm `BorrowEntity` fields/indexes in `backend/src/borrow/borrow.entity.ts`.
- [ ] Create missing migration for borrow table in `backend/src/database/migrations/`.
- [ ] Run migration and verify `POST /borrow/issue`, `PATCH /borrow/:id/return`, `GET /borrow`.
- [ ] Add/confirm constraints for active borrow uniqueness by `bookId` (if desired at DB level too).

### Done criteria
- Fresh database can run migrations and support full borrow flow without manual SQL.

---

## Phase 4: Frontend Data Consistency (Remove Remaining Mock Paths)

### Goal
Ensure pages use live backend data consistently.

### Tasks
- [ ] Review `frontend/src/app/books/[id]/page.tsx` and replace any `mock-books` dependency with API fetch.
- [ ] Confirm list/detail shape alignment between:
  - `frontend/src/services/books.service.ts`
  - backend `books` responses.
- [ ] Normalize empty/loading/error states for:
  - `frontend/src/app/books/page.tsx`
  - `frontend/src/app/borrowed/page.tsx`
  - `frontend/src/app/resources/page.tsx`

### Done criteria
- Book, borrow, and resource core pages render from backend only.
- Error and loading states are user-friendly and consistent.

---

## Phase 5: Resources Domain Hardening

### Goal
Make resources more than filesystem listing; support better metadata and control.

### Tasks
- [ ] Decide storage strategy:
  - Keep local disk for MVP, but track metadata in DB.
- [ ] Add `ResourceEntity` + migration (if DB tracking chosen).
- [ ] Persist upload metadata in service/controller flow:
  - `backend/src/resources/resources.controller.ts`
  - `backend/src/resources/resources.service.ts`
- [ ] Add optional fields (category, uploadedBy, title) and validation.
- [ ] Enforce role checks on upload endpoint.

### Done criteria
- Uploaded resources are queryable with stable metadata, not only inferred from file names.

---

## Phase 6: Testing Baseline

### Goal
Protect critical flows with minimum reliable tests.

### Backend tasks
- [ ] Add unit tests for:
  - `auth.service.ts` (success/failure login)
  - `books.service.ts` (duplicate ISBN handling)
  - `borrow.service.ts` (issue/return validations)
- [ ] Add at least one e2e path for auth + protected route access.

### Frontend tasks
- [ ] Add smoke test coverage for login flow and one protected page render.

### Done criteria
- Core domains have baseline test coverage.
- Regressions in auth/borrow/books are easier to catch.

---

## Phase 7: Developer Experience + Repo Hygiene

### Goal
Keep local/dev artifacts and secrets out of version control and simplify setup.

### Tasks
- [ ] Ensure `.gitignore` covers generated artifacts and local env files:
  - `frontend/.next/`
  - `frontend/.env.local`
  - `backend/.env`
  - uploads folders if not intended for git.
- [ ] Keep `.env.example` files updated in:
  - `backend/.env.example`
  - `frontend` (add example if missing).
- [ ] Add concise run/setup notes in root or project READMEs.

### Done criteria
- Clean `git status` during normal development.
- New developer can start backend/frontend with minimal friction.

---

## Suggested Execution Order (If You Want Strict Steps)

1. Phase 1
2. Phase 2
3. Phase 3
4. Phase 4
5. Phase 5
6. Phase 6
7. Phase 7

This order minimizes security risk first, then data correctness, then quality-of-life.
