# System Architecture (Single-Tenant → Multi-Tenant Ready)

## 1. Complete System Architecture

### Overview
A modular, scalable architecture designed for a single school deployment with future multi-tenant expansion.

```
[ Client (Browser) ]
        |
        v
[ Nginx (Reverse Proxy) ]
        |
        v
[ Backend API (NestJS) ]
        |
  -------------------------
  |          |           |
  v          v           v
[PostgreSQL][Redis] [File Storage]
                        |
                        v
                 (Local / S3)
```

### Key Characteristics
- Single-tenant initially (one school)
- Modular backend for future multi-tenant upgrade
- Hybrid-ready (local + cloud sync later)

---

## 2. File and Folder Structure

### Backend (NestJS)

```
/backend
 ├── src
 │   ├── modules
 │   │   ├── auth
 │   │   ├── users
 │   │   ├── roles
 │   │   ├── books
 │   │   ├── borrow
 │   │   ├── resources
 │   │   ├── courses
 │   │   └── notifications
 │   ├── common
 │   │   ├── guards
 │   │   ├── interceptors
 │   │   ├── filters
 │   │   └── decorators
 │   ├── config
 │   ├── database
 │   └── main.ts
 ├── docker
 └── package.json
```

---

### Frontend (Next.js)

```
/frontend
 ├── src
 │   ├── app (or pages)
 │   ├── components
 │   ├── features
 │   │   ├── auth
 │   │   ├── dashboard
 │   │   ├── library
 │   │   ├── resources
 │   │   ├── borrow
 │   │   └── admin
 │   ├── services
 │   ├── store
 │   ├── hooks
 │   └── utils
 ├── public
 └── package.json
```

---

## 3. Responsibilities of Each Component

### Nginx
- Reverse proxy
- SSL termination
- Route traffic to backend
- Serve static assets

### Backend (NestJS)
- Business logic
- Authentication and authorization
- API endpoints
- Data validation
- Integration with DB, Redis, storage

### PostgreSQL
- Store relational data:
  - Users
  - Books
  - Borrow records
  - Resources

### Redis
- Caching frequently accessed data
- Session/token storage
- Queue management

### File Storage
- Store PDFs, documents
- Local disk (initial)
- Future: cloud sync

### Frontend (Next.js)
- UI rendering
- Role-based dashboards
- API communication
- State management

---

## 4. State Management Strategy

### Recommended Approach
Use Redux Toolkit or Zustand

### Global State
- Auth (user, token, role)
- Notifications
- UI state (theme, modals)

### Server State
Use:
- React Query (TanStack Query)

Handles:
- API fetching
- Caching
- Background refetching

---

## 5. Service Integrations

### Authentication Service
- JWT-based authentication
- Role-based access control

### File Upload Service
- Handles uploads (PDFs, docs)
- Stores metadata in DB

### Search Service
- Basic DB search initially
- Upgrade to Elasticsearch later

### Notification Service
- In-app notifications
- Email (optional)

### Queue Service
- Background jobs
- File processing
- Sync tasks

---

## 6. Future Multi-Tenant Upgrade Path

### Option 1: Database-per-tenant
- Separate DB per school

### Option 2: Shared DB + tenant_id
- Add tenant_id to all tables

Recommended:
- Start single-tenant
- Design schema with tenant_id optional

---

## 7. Deployment Strategy

### Local Deployment
- Docker containers
- Local server in school

### Cloud Deployment
- VPS or cloud provider
- Centralized management

---

## Final Note

This architecture is:
- Simple enough to build fast
- Strong enough to scale
- Flexible for Ghana deployment realities
