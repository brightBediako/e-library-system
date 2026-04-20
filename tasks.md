# MVP Build Plan (Frontend First → Backend)

## Phase 1: Frontend Setup

### Task 1: Initialize Project
- Create Next.js app
- Verify app runs locally

### Task 2: Setup Folder Structure
- Create folders: components, features, services, store, hooks
- Confirm structure compiles

### Task 3: Install Core Dependencies
- Install axios, react-query, zustand (or redux toolkit)
- Verify no errors

---

## Phase 2: Authentication UI

### Task 4: Build Login Page UI
- Create login form (email, password)
- Test UI rendering

### Task 5: Create Auth State
- Setup global auth store
- Test setting and retrieving user state

### Task 6: Connect Login API (Mock)
- Create mock API service
- Simulate login response

### Task 7: Handle Login Flow
- Save token to state
- Redirect to dashboard

---

## Phase 3: Layout & Navigation

### Task 8: Create Base Layout
- Header + Sidebar
- Test layout rendering

### Task 9: Role-Based Sidebar
- Show menu based on role
- Test switching roles manually

---

## Phase 4: Dashboard

### Task 10: Dashboard UI
- Create dashboard page
- Add placeholder stats

---

## Phase 5: Library (Frontend Only)

### Task 11: Book List UI
- Create table/grid view
- Use mock data

### Task 12: Book Details Page
- Display single book info
- Route testing

### Task 13: Search UI
- Input + filter UI
- Test filtering mock data

---

## Phase 6: Digital Resources

### Task 14: Resource List UI
- Display PDFs/resources
- Mock data

### Task 15: PDF Viewer Integration
- Embed PDF viewer
- Test loading sample file

---

## Phase 7: Borrowing UI

### Task 16: Borrowed Books Page
- List borrowed items
- Mock data

### Task 17: Due Date Display
- Show due dates and status
- Test overdue highlighting

---

## Phase 8: API Integration Layer

### Task 18: Setup Axios Instance
- Base URL + interceptors
- Test request

### Task 19: Setup React Query
- Configure provider
- Test basic fetch

---

## Phase 9: Backend Setup

### Task 20: Initialize Backend (NestJS)
- Create project
- Run server

### Task 21: Setup Database Connection
- Connect PostgreSQL
- Test connection

---

## Phase 10: Auth Backend

### Task 22: Create Auth Module
- Login endpoint
- Return JWT

### Task 23: Validate Login from Frontend
- Replace mock API
- Test real login

---

## Phase 11: Users Module

### Task 24: Create Users Entity
- Define schema
- Migrate DB

### Task 25: Fetch Users API
- Create endpoint
- Test response

---

## Phase 12: Books Module

### Task 26: Create Books Entity
- Schema definition
- Migration

### Task 27: Books API
- CRUD endpoints
- Test with Postman

### Task 28: Connect Frontend Book List
- Replace mock data
- Test rendering

---

## Phase 13: Borrow Module

### Task 29: Borrow Entity
- Define schema

### Task 30: Borrow API
- Issue/return endpoints

### Task 31: Connect Borrow UI
- Fetch real data
- Test flow

---

## Phase 14: Resources Module

### Task 32: Upload Endpoint
- Handle file upload

### Task 33: Resource API
- Fetch resources

### Task 34: Connect Resource UI
- Replace mock data

---

## Phase 15: Finalization

### Task 35: Error Handling
- Global error UI

### Task 36: Loading States
- Add loaders

### Task 37: Role Guards
- Protect routes

---

## Final Note

Each task is:
- Independent
- Testable
- Small in scope

Follow strictly in order for clean build progression.
