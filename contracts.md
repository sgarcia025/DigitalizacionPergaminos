# Pergaminos IDP Platform - API Contracts & Integration Plan

## A) API Contracts

### 1. Authentication & Tenant Management
```
POST /api/auth/login
Body: { email: string, password: string }
Response: { token: string, user: {}, tenants: Tenant[] }

GET /api/tenants
Headers: { Authorization: Bearer <token> }
Response: Tenant[]

POST /api/auth/tenant/select
Body: { tenantId: string }
Headers: { Authorization: Bearer <token> }
Response: { success: boolean }
```

### 2. File Upload & Processing
```
POST /api/upload
Headers: { Authorization: Bearer <token>, X-Tenant-ID: string }
Body: FormData { file: File, name: string }
Response: { id: string, status: "Uploaded", message: string }

GET /api/files/{id}/status
Headers: { Authorization: Bearer <token>, X-Tenant-ID: string }
Response: { status: "Processing" | "QA" | "Ready" | "Error", progress?: number }

GET /api/files/{id}
Headers: { Authorization: Bearer <token>, X-Tenant-ID: string }
Response: FileDetails with metadata, pages, QA results
```

### 3. File Management
```
GET /api/files
Headers: { Authorization: Bearer <token>, X-Tenant-ID: string }
Query: { search?: string, status?: string, limit?: number, offset?: number }
Response: { files: File[], total: number }

GET /api/files/{id}/pages
Headers: { Authorization: Bearer <token>, X-Tenant-ID: string }
Response: { pages: Page[], qa_flags: QAFlag[] }

POST /api/files/{id}/qa/retry
Headers: { Authorization: Bearer <token>, X-Tenant-ID: string }
Response: { success: boolean, message: string }

GET /api/files/{id}/final.pdf
Headers: { Authorization: Bearer <token>, X-Tenant-ID: string }
Response: PDF file stream
```

### 4. Semantic Search
```
POST /api/search
Headers: { Authorization: Bearer <token>, X-Tenant-ID: string }
Body: { query: string, filters?: SearchFilters }
Response: { answer: string, citations: Citation[], chunks: Chunk[] }
```

### 5. Dashboard & Analytics
```
GET /api/dashboard/stats
Headers: { Authorization: Bearer <token>, X-Tenant-ID: string }
Response: { processedToday: number, inQueue: number, withIssues: number, ... }
```

## B) Mocked Data in Frontend (mock.js replacement needed)

### Current Mock Data Locations:
1. **Dashboard Stats** - `/app/frontend/src/app/(dashboard)/dashboard/page.tsx:14-20`
   - mockStats object with KPIs
   - Replace with API call to GET /api/dashboard/stats

2. **Recent Files** - `/app/frontend/src/app/(dashboard)/dashboard/page.tsx:22-50`
   - mockRecentFiles array
   - Replace with API call to GET /api/files?limit=4

3. **Files List** - `/app/frontend/src/app/(dashboard)/files/page.tsx:17-65`
   - mockFiles array with file metadata
   - Replace with API call to GET /api/files

4. **Tenant Data** - Multiple locations
   - mockTenants in sidebar/topbar components  
   - Replace with API call to GET /api/tenants

5. **Upload Functionality** - `/app/frontend/src/app/(dashboard)/upload/page.tsx:96-120`
   - Mock upload process with setTimeout
   - Replace with actual FormData POST to /api/upload

## C) Backend Implementation Tasks

### 1. Authentication System
- [ ] JWT token generation and validation middleware
- [ ] User model with tenant associations
- [ ] Login endpoint with tenant permissions
- [ ] Tenant selection and validation

### 2. File Upload & Storage
- [ ] Multipart file upload handling
- [ ] PDF validation (type, size, pages)
- [ ] File storage (local or cloud)
- [ ] Database models for files, pages, metadata

### 3. AI Processing Pipeline
- [ ] OpenAI integration for document analysis
- [ ] OCR and text extraction
- [ ] Quality assurance checks
- [ ] Confidence scoring system

### 4. Document Management
- [ ] File status tracking (Uploaded → Processing → QA → Ready)
- [ ] Page-level metadata and thumbnails
- [ ] QA flag generation and management
- [ ] PDF assembly and final document generation

### 5. Search & Analytics
- [ ] Semantic search with embeddings
- [ ] Dashboard metrics calculation
- [ ] Search history and caching

## D) Frontend & Backend Integration Plan

### Phase 1: Authentication & Basic Navigation
1. Replace tenant mocks with API calls
2. Implement JWT token storage and management
3. Add authentication guards to routes
4. Update Topbar tenant selector with real data

### Phase 2: File Upload Flow
1. Replace upload mock with real FormData submission
2. Add progress tracking and error handling
3. Implement file status polling
4. Update success/error states

### Phase 3: File Management
1. Replace file list mocks with paginated API calls
2. Add search functionality backend integration
3. Implement file detail view with real data
4. Add download functionality for ready files

### Phase 4: Dashboard Integration
1. Replace KPI mocks with real-time statistics
2. Add recent files feed from API
3. Implement refresh mechanisms
4. Add error boundaries and loading states

### Phase 5: Advanced Features
1. Implement semantic search interface
2. Add QA retry functionality
3. File processing retry mechanisms
4. Real-time status updates with WebSockets/polling

## E) Key Integration Points

### API Client Setup
- Base URL: `process.env.NEXT_PUBLIC_API_URL`
- Headers: Authorization Bearer + X-Tenant-ID
- Error handling and retry logic
- Request/response interceptors

### State Management
- Replace local useState with React Query for server state
- Zustand for client-side state (current tenant, user)
- Optimistic updates for better UX

### Error Handling
- Global error boundaries
- Toast notifications for user feedback  
- Retry mechanisms for failed requests
- Offline handling

### Security
- Token refresh mechanisms
- CSRF protection
- File upload security validation
- Tenant isolation enforcement

This contracts file will guide the seamless transition from mock data to full backend integration while maintaining the existing UI/UX experience.