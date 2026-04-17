# E-Library System Architecture (Ghana Tertiary MVP)

## 1) Complete System Architecture

This system is designed for a **single tertiary institution first** (nursing school, college of education, etc.) and structured to scale to multi-school later.

### Locked Tech Stack (MVP)

- **Backend API:** Node.js + NestJS
- **Frontend:** React + Next.js
- **Database:** PostgreSQL
- **Cache/Queue:** Redis
- **Search:** PostgreSQL full-text first; Elasticsearch enabled in Phase 2 when needed
- **File Storage:** S3-compatible object storage in production, local storage in development
- **Containerization:** Docker + Docker Compose
- **Edge/Reverse Proxy:** Nginx

### Architectural Style

- **Modular monolith (MVP)** for faster delivery and easier operations.
- Clear domain modules to allow future extraction into services.
- **API-first backend** consumed by web app and future mobile clients.
- Event logging and reporting pipeline embedded from day one for audit needs.

### High-Level Layers

```mermaid
flowchart LR
  endUser[StudentOrLibrarian] --> webApp[WebClient]
  webApp --> apiGateway[BackendAPI]
  apiGateway --> authModule[AuthAndRBAC]
  apiGateway --> catalogModule[CatalogAndInventory]
  apiGateway --> circulationModule[CirculationEngine]
  apiGateway --> digitalModule[DigitalLibrary]
  apiGateway --> procurementModule[Procurement]
  apiGateway --> reportingModule[ReportingAndExports]
  authModule --> db[(PostgreSQL)]
  catalogModule --> db
  circulationModule --> db
  digitalModule --> objectStorage[(ObjectStorage)]
  digitalModule --> db
  procurementModule --> db
  reportingModule --> db
  reportingModule --> cache[(Redis)]
  circulationModule --> jobRunner[BackgroundJobs]
  reportingModule --> jobRunner
```

### Core Domains

- **Identity & Access**: login, password reset, role-based permissions.
- **Catalog & Inventory**: books metadata, copy-level stock tracking, status control.
- **Circulation**: issue, return, renewal, reservation queue, overdue computation.
- **Digital Library**: upload/manage PDFs, lecture notes, dissertations with access rules.
- **Procurement**: supplier records, purchase entries, received stock linking to inventory.
- **Reporting**: operational + accreditation-facing reports and exports.

### Deployment Topology (MVP)

- **Frontend**: Next.js web app (admin + student portal).
- **Backend**: NestJS REST API server with modular services.
- **Database**: PostgreSQL (primary transactional store).
- **Cache/Queue**: Redis (session cache, report cache, async jobs).
- **Search**: PostgreSQL full-text search for MVP; optional Elasticsearch service for advanced search.
- **Object Storage**: S3-compatible bucket for digital resources (local filesystem in development).
- **Scheduler/Worker**: NestJS background worker for overdue scans, report jobs, notifications.
- **Reverse Proxy**: Nginx routes `web` and `api`, handles TLS and basic caching.

### Security and Compliance Baseline

- Role-based access at endpoint + service level.
- Audit events for key operations (issue/return/upload/procurement updates).
- File upload scanning and MIME validation.
- Access rules by role/program level for restricted resources.
- Encrypted transport (HTTPS) and salted password hashing.

## 2) Proposed File and Folder Structure

```text
e-library-system/
  architecture.md
  README.md
  docs/
    api-contracts.md
    domain-rules.md
    deployment.md
  apps/
    web/
      src/
        app/
          routes/
          layouts/
        features/
          auth/
          catalog/
          circulation/
          digital-library/
          procurement/
          reporting/
          student-portal/
        components/
          ui/
          forms/
          tables/
        services/
          api-client/
          query-hooks/
        store/
          slices/
          selectors/
        utils/
        tests/
      public/
    api/
      src/
        main/
          server.ts
          app.ts
          router.ts
        config/
        modules/
          auth/
            auth.controller.ts
            auth.service.ts
            auth.repository.ts
            auth.validation.ts
          users/
          roles/
          catalog/
            books.controller.ts
            books.service.ts
            copies.service.ts
            catalog.repository.ts
          circulation/
            loans.controller.ts
            loans.service.ts
            renewals.service.ts
            reservations.service.ts
            overdue.worker.ts
          digital-library/
            resources.controller.ts
            resources.service.ts
            storage.service.ts
            access-policy.service.ts
          procurement/
            suppliers.controller.ts
            purchases.controller.ts
            procurement.service.ts
          reporting/
            reporting.controller.ts
            reporting.service.ts
            export.service.ts
        shared/
          middleware/
          guards/
          errors/
          logger/
          events/
          constants/
          types/
        db/
          migrations/
          seeds/
          schema/
        jobs/
          scheduler.ts
          workers/
        tests/
  infra/
    docker/
    scripts/
    env/
```

## 3) Responsibilities of Each Component

### Frontend Components

- **`features/auth`**
  - Login/session lifecycle and route protection.
  - Role-aware UI rendering.
- **`features/catalog`**
  - Book and copy management screens.
  - Catalog search/filter interfaces.
- **`features/circulation`**
  - Issue/return/renew workflows.
  - Reservation queue management views.
- **`features/student-portal`**
  - Student dashboard (active loans/history/holds).
  - Resource discovery and account state.
- **`features/digital-library`**
  - File upload UI and metadata forms.
  - Access-level assignment and file availability.
- **`features/procurement`**
  - Supplier and purchase forms.
  - Stock intake records.
- **`features/reporting`**
  - Report filters, previews, and export actions.

### Backend Components

- **`modules/auth`**
  - Credential verification and token/session management.
  - Permission checks and role policies.
- **`modules/catalog`**
  - Book metadata lifecycle.
  - Copy-level stock state transitions.
- **`modules/circulation`**
  - Transaction-safe issue/return/renew operations.
  - Due-date logic, overdue identification, hold fulfillment.
- **`modules/digital-library`**
  - Object storage upload pipeline.
  - Resource metadata persistence and access decisions.
- **`modules/procurement`**
  - Supplier management and purchase records.
  - Reconciliation of received stock into catalog copies.
- **`modules/reporting`**
  - Aggregated metrics across circulation, inventory, procurement, and digital usage.
  - CSV/PDF export generation.
- **`shared`**
  - Cross-cutting concerns (guards, logging, errors, common types).
- **`jobs`**
  - Scheduled tasks (overdue scans, digest reports, cache refreshes).

### Data Layer Responsibilities

- **PostgreSQL**
  - Source of truth for transactional and historical records.
  - Constraints for integrity (foreign keys, unique ISBN+copy accession rules).
- **Redis**
  - Short-lived caching for expensive report queries.
  - Queue backend for background processing.
- **Object Storage**
  - Durable storage for PDF/doc assets.
  - Stores file blobs; database stores metadata + access rules.

## 4) State Management Strategy and Service Integrations

### State Management Strategy (Frontend)

- **Server State**: use query-based caching (e.g., React Query pattern).
  - API data cached by query keys.
  - Automatic background refresh for loan/reservation lists.
- **Client/UI State**: feature-local state + lightweight global store.
  - Global store only for session context, selected institution settings, and cross-feature filters.
  - Form state kept local to modules for isolation and testability.
- **Normalization**
  - Normalize frequently reused entities (`books`, `copies`, `users`) to reduce rerenders.
- **Optimistic Updates**
  - Allowed for reversible actions (e.g., reservation create/cancel).
  - Avoid optimistic updates for critical stock mutations (issue/return) until backend confirms success.

### Backend State and Transaction Strategy

- Wrap **issue/return/renew** flows in DB transactions.
- Use row-level locking for copy status updates to prevent double-issue races.
- Emit domain events (`LoanIssued`, `LoanReturned`, `ResourceUploaded`) to job workers.
- Cache report summaries with short TTL and explicit invalidation on key writes.

### External/Service Integrations

- **Email/SMS Notifications**
  - Overdue reminders, reservation ready notices, account alerts.
- **Object Storage Provider**
  - S3-compatible API for digital resources.
- **Reporting Export Tools**
  - CSV/PDF generation for audits/accreditation submissions.
- **Future Payments Integration (Phase 2)**
  - Mobile Money reference capture for fine settlement workflows.

### Integration Contract Principles

- Version API routes (`/api/v1/...`) from start.
- Strict request validation at module boundaries.
- Idempotency keys for non-read operations where retries are likely.
- Structured audit logs for all privileged actions.

## 5) Minimal Docker Compose Blueprint

This is a minimal service blueprint for the selected stack. It keeps Elasticsearch present but optional for MVP runtime.

```yaml
version: "3.9"
services:
  nginx:
    image: nginx:stable-alpine
    container_name: elib_nginx
    depends_on:
      - web
      - api
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./infra/nginx/default.conf:/etc/nginx/conf.d/default.conf:ro

  web:
    build: ./apps/web
    container_name: elib_web
    environment:
      NODE_ENV: production
      NEXT_PUBLIC_API_BASE_URL: http://api:4000/api/v1
    ports:
      - "3000:3000"
    depends_on:
      - api

  api:
    build: ./apps/api
    container_name: elib_api
    environment:
      NODE_ENV: production
      PORT: 4000
      DATABASE_URL: postgresql://elib:elib@postgres:5432/elib_db
      REDIS_URL: redis://redis:6379
      JWT_SECRET: change_me
      STORAGE_DRIVER: s3
      S3_ENDPOINT: https://s3.amazonaws.com
      S3_BUCKET: elib-files
      S3_ACCESS_KEY_ID: change_me
      S3_SECRET_ACCESS_KEY: change_me
      LOCAL_UPLOAD_DIR: /app/uploads
      SEARCH_DRIVER: postgres
      ELASTICSEARCH_URL: http://elasticsearch:9200
    volumes:
      - api_uploads:/app/uploads
    ports:
      - "4000:4000"
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    container_name: elib_postgres
    environment:
      POSTGRES_USER: elib
      POSTGRES_PASSWORD: elib
      POSTGRES_DB: elib_db
    volumes:
      - pg_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    container_name: elib_redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.13.4
    container_name: elib_elasticsearch
    environment:
      discovery.type: single-node
      xpack.security.enabled: "false"
      ES_JAVA_OPTS: -Xms512m -Xmx512m
    ports:
      - "9200:9200"
    profiles:
      - search
    volumes:
      - es_data:/usr/share/elasticsearch/data

volumes:
  pg_data:
  redis_data:
  es_data:
  api_uploads:
```

### Port Layout

- `80/443` -> Nginx entrypoint
- `3000` -> Next.js web app
- `4000` -> NestJS API
- `5432` -> PostgreSQL
- `6379` -> Redis
- `9200` -> Elasticsearch (optional, `search` profile)

### Env Layout

- **Backend core**
  - `PORT`, `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`
- **Storage**
  - `STORAGE_DRIVER` (`s3` or `local`)
  - `LOCAL_UPLOAD_DIR`
  - `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`
- **Search**
  - `SEARCH_DRIVER` (`postgres` for MVP, `elasticsearch` later)
  - `ELASTICSEARCH_URL`
- **Frontend**
  - `NEXT_PUBLIC_API_BASE_URL`

## Recommended MVP Priorities

1. Auth + roles + foundational schema.
2. Catalog/copies + circulation transactions.
3. Student portal search/history/reservations.
4. Digital upload/access controls.
5. Procurement linking to inventory.
6. Reporting and export.

