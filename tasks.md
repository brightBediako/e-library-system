# E-Library MVP Build Tasks (Granular)

This plan is derived from `architecture.md` and ordered for incremental delivery.

## Locked Tech Stack for This Plan

- Backend: Node.js + NestJS
- Frontend: React + Next.js
- Database: PostgreSQL
- Cache/Queue: Redis
- Search: PostgreSQL full-text for MVP, Elasticsearch optional in Phase 2
- Storage: S3 in production, local storage in development
- Infra: Docker + Nginx

## Phase 0: Project Foundation

### T001 - Create monorepo root skeleton
- **Start:** Repository has only docs or minimal files.
- **Finish:** Root folders exist: `apps/`, `docs/`, `infra/`.
- **One concern:** Initial folder scaffolding only.
- **Test:** Run directory check and confirm required folders exist.

### T002 - Initialize backend app shell
- **Start:** `apps/api` does not exist.
- **Finish:** `apps/api/src/main/server.ts`, `app.ts`, `router.ts` created and bootable.
- **One concern:** Backend runtime entrypoint setup.
- **Test:** Start API and confirm health endpoint returns `200`.

### T003 - Initialize frontend app shell
- **Start:** `apps/web` does not exist.
- **Finish:** `apps/web/src/app` route shell renders a landing page.
- **One concern:** Frontend runtime entrypoint setup.
- **Test:** Start web app and confirm root page loads successfully.

### T003A - Add Dockerfile for NestJS API
- **Start:** API container image definition missing.
- **Finish:** `apps/api/Dockerfile` builds and runs API.
- **One concern:** API containerization only.
- **Test:** Build image and run container; health endpoint returns `200`.

### T003B - Add Dockerfile for Next.js web app
- **Start:** Web container image definition missing.
- **Finish:** `apps/web/Dockerfile` builds and runs web app.
- **One concern:** Web containerization only.
- **Test:** Build image and run container; landing page loads.

### T003C - Add Nginx reverse proxy config
- **Start:** No reverse proxy routing.
- **Finish:** `infra/nginx/default.conf` routes `/` to web and `/api` to API.
- **One concern:** Edge routing only.
- **Test:** Through Nginx, both web page and `/api/v1/health` respond.

### T003D - Add Docker Compose baseline stack
- **Start:** Multi-service local run not defined.
- **Finish:** Compose file includes `nginx`, `web`, `api`, `postgres`, `redis`, and optional `elasticsearch`.
- **One concern:** Local orchestration definition.
- **Test:** `docker compose up` starts services and app is reachable via Nginx.

### T004 - Add shared environment config loader
- **Start:** No centralized env validation.
- **Finish:** Backend validates required env vars at startup.
- **One concern:** Environment safety and startup checks.
- **Test:** Missing required env var causes startup failure with clear message.

### T005 - Add centralized error response middleware
- **Start:** Unstructured error responses.
- **Finish:** All uncaught errors return standardized JSON shape.
- **One concern:** Error response format consistency.
- **Test:** Trigger known error and verify response schema.

### T006 - Add request logging middleware
- **Start:** No request-level logs.
- **Finish:** API logs method, path, status, duration for every request.
- **One concern:** Operational observability baseline.
- **Test:** Hit endpoint and verify structured log output.

### T007 - Create base database connection module
- **Start:** No DB integration.
- **Finish:** API can connect to PostgreSQL through shared DB module.
- **One concern:** DB connectivity only.
- **Test:** Run connection check endpoint and verify success.

### T007A - Create base Redis connection module
- **Start:** No Redis integration.
- **Finish:** API can connect to Redis through shared cache/queue module.
- **One concern:** Redis connectivity only.
- **Test:** Ping command returns `PONG` from application health check.

### T008 - Add migration runner
- **Start:** Schema cannot be versioned.
- **Finish:** CLI/script runs forward migrations from `db/migrations`.
- **One concern:** Schema versioning pipeline.
- **Test:** Run migration command and verify migration history table updates.

### T009 - Add seed runner
- **Start:** No reproducible seed data.
- **Finish:** Seed command inserts baseline roles and sample users.
- **One concern:** Seed tooling only.
- **Test:** Run seeds and confirm expected records exist.

## Phase 1: Auth and RBAC

### T010 - Create `roles` table migration
- **Start:** No role persistence.
- **Finish:** `roles` table with unique role names exists.
- **One concern:** Role schema.
- **Test:** Insert duplicate role name fails with unique constraint.

### T011 - Create `users` table migration
- **Start:** No user persistence.
- **Finish:** `users` table with status and role foreign key exists.
- **One concern:** User schema.
- **Test:** User insert with invalid role id fails with FK constraint.

### T012 - Implement password hashing utility
- **Start:** Plain password handling not defined.
- **Finish:** Utility hashes and verifies passwords securely.
- **One concern:** Credential cryptography helper.
- **Test:** Verify hash/compare unit tests pass.

### T013 - Implement login API endpoint
- **Start:** No login endpoint.
- **Finish:** `POST /api/v1/auth/login` issues access token for valid credentials.
- **One concern:** Authentication endpoint.
- **Test:** Valid credentials return token; invalid returns `401`.

### T014 - Implement auth guard middleware
- **Start:** Protected endpoints not enforced.
- **Finish:** Guard rejects missing/invalid bearer token.
- **One concern:** Token validation gate.
- **Test:** Protected route without token returns `401`.

### T015 - Implement role guard middleware
- **Start:** Role restrictions not enforced.
- **Finish:** Guard supports role policy checks per endpoint.
- **One concern:** Authorization by role.
- **Test:** Student access to librarian-only route returns `403`.

### T016 - Implement frontend login screen
- **Start:** No login UI.
- **Finish:** Login form submits credentials and stores session token.
- **One concern:** Auth UI flow.
- **Test:** Successful login redirects to role-appropriate dashboard.

### T017 - Implement frontend route protection
- **Start:** Private routes accessible anonymously.
- **Finish:** Protected routes redirect unauthenticated users to login.
- **One concern:** Client-side route guard.
- **Test:** Open private route while logged out and confirm redirect.

## Phase 2: Catalog and Inventory

### T018 - Create `books` table migration
- **Start:** No catalog metadata table.
- **Finish:** `books` table supports title, author, ISBN, category, subject.
- **One concern:** Book metadata schema.
- **Test:** Insert book with duplicate ISBN is rejected if configured unique.

### T019 - Create `book_copies` table migration
- **Start:** No copy-level inventory.
- **Finish:** `book_copies` table includes accession/barcode, status, shelf location.
- **One concern:** Inventory unit schema.
- **Test:** Duplicate accession number fails.

### T020 - Implement create-book API
- **Start:** Cannot add new book metadata.
- **Finish:** Librarian can create book record.
- **One concern:** Catalog create endpoint.
- **Test:** Valid payload creates row; invalid payload returns `400`.

### T021 - Implement list/search-books API
- **Start:** No discovery endpoint.
- **Finish:** Search supports title/author/ISBN keyword query.
- **One concern:** Catalog query endpoint.
- **Test:** Query returns filtered results only.

### T021A - Add PostgreSQL full-text search indexes
- **Start:** Search uses basic filters only.
- **Finish:** FTS/trigram indexes created for title/author/subject search.
- **One concern:** Postgres search performance.
- **Test:** Search query plan uses created index.

### T022 - Implement create-copy API
- **Start:** Cannot register physical copies.
- **Finish:** Librarian can add copy records linked to a book.
- **One concern:** Copy registration endpoint.
- **Test:** Copy with invalid book id returns `404` or FK error.

### T023 - Implement update-copy-status API
- **Start:** Copy status transitions are manual/nonexistent.
- **Finish:** Endpoint updates copy state (`available`, `loaned`, `lost`, etc.).
- **One concern:** Copy state management.
- **Test:** Invalid status value returns validation error.

### T024 - Build librarian catalog management pages
- **Start:** No catalog admin UI.
- **Finish:** UI supports add book, add copy, list/search.
- **One concern:** Catalog admin screens.
- **Test:** Create book from UI and verify it appears in list.

## Phase 3: Circulation (Issue/Return/Renew)

### T025 - Create `loans` table migration
- **Start:** No loan transaction schema.
- **Finish:** `loans` table stores borrower, copy, issue date, due date, return date, status.
- **One concern:** Loan schema.
- **Test:** Loan row cannot reference nonexistent copy/user.

### T026 - Create `reservations` table migration
- **Start:** No hold queue schema.
- **Finish:** `reservations` table supports FIFO ordering and status.
- **One concern:** Reservation schema.
- **Test:** Reservation status constrained to allowed values.

### T027 - Implement issue-book service with DB transaction
- **Start:** Issue logic not atomic.
- **Finish:** Service atomically creates loan and marks copy as loaned.
- **One concern:** Transaction-safe issue flow.
- **Test:** Simulated failure rolls back both loan and copy update.

### T028 - Implement return-book service
- **Start:** No return workflow.
- **Finish:** Return sets return date/status and marks copy available.
- **One concern:** Return logic.
- **Test:** Returning an already returned loan fails validation.

### T029 - Implement renew-loan service
- **Start:** Renewal policy missing.
- **Finish:** Renewal extends due date when policy allows.
- **One concern:** Renewal rules.
- **Test:** Renewal denied when max renewals reached.

### T030 - Implement issue/return/renew API endpoints
- **Start:** Services not exposed via API.
- **Finish:** Controller routes available under `/api/v1/circulation`.
- **One concern:** Circulation API surface.
- **Test:** Endpoint integration tests pass for happy and failure paths.

### T031 - Implement reservation create/cancel API
- **Start:** Students cannot place holds.
- **Finish:** Reservation endpoints support create and cancel.
- **One concern:** Reservation API.
- **Test:** Duplicate active reservation for same user/book is rejected.

### T032 - Build librarian circulation desk UI
- **Start:** No desk workflow screens.
- **Finish:** UI supports issue, return, and renew by copy accession/user ID.
- **One concern:** Circulation operations UI.
- **Test:** End-to-end desk action updates visible loan status.

## Phase 4: Student Portal

### T033 - Build student catalog search page
- **Start:** Student-facing discovery absent.
- **Finish:** Students can search and filter visible resources.
- **One concern:** Student search interface.
- **Test:** Search term and filters return expected items.

### T034 - Build student active loans page
- **Start:** Students cannot view borrowed items.
- **Finish:** Page shows active loans, due dates, statuses.
- **One concern:** Student loan visibility.
- **Test:** Student sees only own loans.

### T035 - Build student borrowing history page
- **Start:** Borrow history unavailable.
- **Finish:** Page lists completed and past loan records for logged-in student.
- **One concern:** Student history view.
- **Test:** Returned loans appear in history.

### T036 - Build student reservation actions
- **Start:** No student hold actions in UI.
- **Finish:** Student can place/cancel reservations from resource page.
- **One concern:** Reservation interaction UI.
- **Test:** Reservation count and status update immediately after action.

## Phase 5: Digital Library

### T037 - Create `digital_resources` table migration
- **Start:** No digital resource metadata schema.
- **Finish:** Table stores title, type, storage key, uploader, access scope.
- **One concern:** Digital metadata schema.
- **Test:** Invalid access scope value fails validation.

### T038 - Integrate object storage client
- **Start:** No file storage integration.
- **Finish:** Backend uploads files to S3-compatible bucket.
- **One concern:** Storage adapter.
- **Test:** Test upload returns valid storage key and retrievable object.

### T038A - Implement local storage adapter
- **Start:** Development storage mode not available.
- **Finish:** Local filesystem adapter works with same storage interface as S3 adapter.
- **One concern:** Local storage support for development.
- **Test:** Upload in `local` mode stores file in configured upload path.

### T039 - Implement digital resource upload API
- **Start:** No upload endpoint.
- **Finish:** Authorized users can upload file + metadata with MIME checks.
- **One concern:** Upload API with validation.
- **Test:** Unsupported MIME type upload is rejected.

### T040 - Implement digital resource listing API
- **Start:** No retrieval endpoint.
- **Finish:** Students/staff list resources filtered by access policy.
- **One concern:** Access-filtered listing endpoint.
- **Test:** User cannot view restricted resources outside scope.

### T041 - Build digital library management UI
- **Start:** No admin digital resource screens.
- **Finish:** Librarian UI supports upload, list, and metadata update.
- **One concern:** Digital resource admin UI.
- **Test:** Uploaded resource appears in list with correct metadata.

### T042 - Build student digital library access UI
- **Start:** No student resource access page.
- **Finish:** Students can browse and open authorized digital resources.
- **One concern:** Student digital resource experience.
- **Test:** Unauthorized resource open attempt is blocked.

## Phase 6: Procurement

### T043 - Create `suppliers` table migration
- **Start:** Supplier registry missing.
- **Finish:** Supplier table stores contact and status fields.
- **One concern:** Supplier schema.
- **Test:** Duplicate supplier identity rule enforced (as configured).

### T044 - Create `purchases` and `purchase_items` migrations
- **Start:** Purchase tracking schema missing.
- **Finish:** Purchase header/items tables linked to suppliers and books.
- **One concern:** Procurement transaction schema.
- **Test:** Purchase item cannot exist without purchase header.

### T045 - Implement supplier CRUD APIs
- **Start:** No supplier endpoints.
- **Finish:** Librarian/admin can create, update, list suppliers.
- **One concern:** Supplier API operations.
- **Test:** Disabled supplier cannot be selected in new purchase creation.

### T046 - Implement purchase capture API
- **Start:** No purchase recording endpoint.
- **Finish:** API stores purchase with line items.
- **One concern:** Purchase entry endpoint.
- **Test:** Total amount matches sum of line item amounts.

### T047 - Implement stock intake from purchase API
- **Start:** Purchased stock not linked to inventory.
- **Finish:** Intake action creates corresponding `book_copies`.
- **One concern:** Procurement-to-inventory reconciliation.
- **Test:** Intake increments available copy count correctly.

### T048 - Build procurement UI screens
- **Start:** No procurement screens.
- **Finish:** UI supports supplier management, purchase entry, stock intake.
- **One concern:** Procurement interface.
- **Test:** Complete purchase-to-intake flow works from UI.

## Phase 7: Reporting and Exports

### T049 - Implement circulation summary report API
- **Start:** No circulation analytics endpoint.
- **Finish:** Endpoint returns issued, returned, overdue totals by date range.
- **One concern:** Circulation reporting query.
- **Test:** Report output matches fixture data calculations.

### T050 - Implement inventory status report API
- **Start:** No stock visibility report.
- **Finish:** Endpoint returns counts by copy status and category.
- **One concern:** Inventory reporting query.
- **Test:** Sum of status buckets equals total copy count.

### T051 - Implement procurement summary report API
- **Start:** No procurement reporting.
- **Finish:** Endpoint returns purchases by period and supplier.
- **One concern:** Procurement reporting query.
- **Test:** Period filter correctly excludes out-of-range purchases.

### T052 - Implement digital usage report API
- **Start:** No digital access metrics endpoint.
- **Finish:** Endpoint returns resource access/download activity aggregates.
- **One concern:** Digital usage reporting query.
- **Test:** Access log fixtures produce expected aggregate totals.

### T053 - Implement CSV export service
- **Start:** Report export unavailable.
- **Finish:** Selected report can be exported as CSV.
- **One concern:** CSV export generation.
- **Test:** Exported CSV contains expected columns and row count.

### T054 - Build reporting dashboard UI
- **Start:** No report UI.
- **Finish:** Admin can run report filters and trigger exports.
- **One concern:** Reporting user interface.
- **Test:** Dashboard filters return and render correct report payload.

## Phase 8: Jobs, Notifications, and Audit

### T055 - Implement overdue scan background job
- **Start:** Overdue marking is manual.
- **Finish:** Scheduled job updates overdue statuses daily.
- **One concern:** Automated overdue detection.
- **Test:** Seeded past-due loans become overdue after job run.

### T055A - Move background jobs to Redis queue
- **Start:** Jobs are synchronous or cron-only.
- **Finish:** Overdue and notification jobs are queued and processed via Redis worker.
- **One concern:** Async queue processing.
- **Test:** Enqueued job is consumed and marked completed by worker.

### T056 - Implement reservation-ready notifier job
- **Start:** Users not alerted when reserved copy becomes available.
- **Finish:** Job detects eligible reservations and emits notifications.
- **One concern:** Reservation notification automation.
- **Test:** Returning a reserved copy triggers notification event.

### T057 - Implement audit log table and writer
- **Start:** Privileged actions not audit-trailed.
- **Finish:** Key actions write structured audit entries.
- **One concern:** Audit persistence.
- **Test:** Issue/return/upload/procurement actions produce audit rows.

### T058 - Add API idempotency support for critical writes
- **Start:** Retry-safe writes not guaranteed.
- **Finish:** Critical POST operations support idempotency keys.
- **One concern:** Duplicate prevention on retries.
- **Test:** Replaying same idempotency key does not duplicate records.

## Phase 9: Quality, Security, and Readiness

### T059 - Add request validation schemas for all write endpoints
- **Start:** Partial or inconsistent input validation.
- **Finish:** Every create/update route validates payload shape and types.
- **One concern:** Input contract enforcement.
- **Test:** Invalid payloads consistently return `400` with field details.

### T060 - Add module-level unit tests for core services
- **Start:** Business logic untested.
- **Finish:** Unit tests cover auth, circulation, digital access policy, procurement reconciliation.
- **One concern:** Service-level correctness testing.
- **Test:** Unit test suite passes with target coverage threshold.

### T061 - Add integration tests for end-to-end MVP flows
- **Start:** Cross-module regressions not guarded.
- **Finish:** Tests cover login, catalog add, issue/return, reservation, upload, purchase intake, report query.
- **One concern:** End-to-end integration confidence.
- **Test:** Integration suite passes in CI/local run.

### T062 - Add seed dataset for demo institution
- **Start:** Demo and QA data setup is manual.
- **Finish:** Seed includes roles, sample users, books, copies, loans, digital resources, suppliers.
- **One concern:** Repeatable demo dataset.
- **Test:** Fresh DB + seed yields usable demo environment.

### T063 - Add operational runbook docs
- **Start:** No documented startup/ops steps.
- **Finish:** Docs cover setup, migration, seeding, backup basics, and troubleshooting.
- **One concern:** Operational documentation.
- **Test:** New developer follows runbook and boots system successfully.

## Phase 10 (Optional): Elasticsearch Enablement

### T064 - Add Elasticsearch client module
- **Start:** Elasticsearch integration absent.
- **Finish:** API has pluggable Elasticsearch client initialized by env flag.
- **One concern:** Search engine adapter wiring.
- **Test:** Health check confirms Elasticsearch connectivity when enabled.

### T065 - Implement catalog indexing job
- **Start:** Books are not indexed in Elasticsearch.
- **Finish:** Book create/update events enqueue index updates.
- **One concern:** Index synchronization.
- **Test:** Updated book appears in Elasticsearch index with latest fields.

### T066 - Implement search driver switch
- **Start:** Search always uses PostgreSQL.
- **Finish:** `SEARCH_DRIVER` toggles between PostgreSQL and Elasticsearch strategies.
- **One concern:** Strategy selection by configuration.
- **Test:** Same search endpoint returns results using selected driver.

## Definition of MVP Done

MVP is complete when tasks `T001` through `T063` are done and the following are demonstrable in one institution context:
- Librarian can manage catalog, copies, circulation, digital resources, and procurement.
- Student can authenticate, search resources, manage reservations, and view borrowing records.
- Admin can run and export operational reports.
- Overdue automation and audit logging are active.
