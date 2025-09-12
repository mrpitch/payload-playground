# API Documentation

This document covers the API structure, endpoints, and integration patterns for the PayloadCMS Playground project.

## API Overview

The project uses a hybrid API approach combining:
- **PayloadCMS REST API** - For content management
- **Next.js API Routes** - For custom business logic
- **Server Actions** - For form handling and mutations

## PayloadCMS API

### Base URL
```
http://localhost:3000/api
```

### Authentication
All PayloadCMS API endpoints require authentication via JWT tokens.

```typescript
// Example API call with authentication
const response = await fetch('/api/users', {
  headers: {
    'Authorization': `JWT ${token}`,
    'Content-Type': 'application/json',
  },
})
```

### Core Collections

#### Users
```typescript
// GET /api/users
// POST /api/users
// GET /api/users/{id}
// PATCH /api/users/{id}
// DELETE /api/users/{id}

interface TUser {
  id: string
  email: string
  password: string
  role: 'admin' | 'editor' | 'user'
  createdAt: string
  updatedAt: string
}
```

#### Pages
```typescript
// GET /api/pages
// POST /api/pages
// GET /api/pages/{id}
// PATCH /api/pages/{id}
// DELETE /api/pages/{id}

interface TPage {
  id: string
  title: string
  slug: string
  content: TContentBlock[]
  meta: TMetaData
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}
```

#### Posts
```typescript
// GET /api/posts
// POST /api/posts
// GET /api/posts/{id}
// PATCH /api/posts/{id}
// DELETE /api/posts/{id}

interface TPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: TContentBlock[]
  author: TUser
  categories: TCategory[]
  featuredImage: TMedia
  publishedAt: string
  createdAt: string
  updatedAt: string
}
```

#### Media
```typescript
// GET /api/media
// POST /api/media
// GET /api/media/{id}
// PATCH /api/media/{id}
// DELETE /api/media/{id}

interface TMedia {
  id: string
  alt: string
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  url: string
  createdAt: string
  updatedAt: string
}
```

### Query Parameters

#### Pagination
```typescript
// GET /api/posts?limit=10&page=1
interface TPaginationParams {
  limit?: number
  page?: number
  sort?: string
}
```

#### Filtering
```typescript
// GET /api/posts?where[status][equals]=published
// GET /api/posts?where[author][equals]=user-id
// GET /api/posts?where[createdAt][greater_than]=2024-01-01

interface TWhereClause {
  [field: string]: {
    equals?: any
    not_equals?: any
    in?: any[]
    not_in?: any[]
    exists?: boolean
    greater_than?: number | string
    greater_than_equal?: number | string
    less_than?: number | string
    less_than_equal?: number | string
    like?: string
    contains?: string
  }
}
```

#### Population
```typescript
// GET /api/posts?populate=author,categories,featuredImage
interface TPopulationParams {
  populate?: string | string[]
  depth?: number
}
```

## Next.js API Routes

### Custom Endpoints

#### Authentication
```typescript
// POST /api/auth/login
interface TLoginRequest {
  email: string
  password: string
}

interface TLoginResponse {
  user: TUser
  token: string
  refreshToken: string
}

// POST /api/auth/register
interface TRegisterRequest {
  email: string
  password: string
  name: string
}

// POST /api/auth/refresh
interface TRefreshRequest {
  refreshToken: string
}

// POST /api/auth/logout
// No body required
```

#### User Management
```typescript
// GET /api/user/profile
// Returns current user profile

// PATCH /api/user/profile
interface TUpdateProfileRequest {
  name?: string
  email?: string
  avatar?: string
}

// POST /api/user/change-password
interface TChangePasswordRequest {
  currentPassword: string
  newPassword: string
}
```

#### Content Operations
```typescript
// POST /api/content/preview
interface TPreviewRequest {
  collection: string
  data: any
}

interface TPreviewResponse {
  url: string
  expiresAt: string
}

// POST /api/content/duplicate
interface TDuplicateRequest {
  collection: string
  id: string
}

// POST /api/content/bulk-delete
interface TBulkDeleteRequest {
  collection: string
  ids: string[]
}
```

## Server Actions

### Authentication Actions

```typescript
// src/lib/actions/login.ts
export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  // Validation
  const validatedFields = loginSchema.safeParse({ email, password })
  
  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }
  
  // Authentication logic
  // ...
}

// src/lib/actions/register.ts
export async function registerAction(formData: FormData) {
  // Registration logic
}

// src/lib/actions/logout.ts
export async function logoutAction() {
  // Logout logic
}
```

### User Actions

```typescript
// src/lib/actions/user.ts
export async function updateProfileAction(formData: FormData) {
  // Profile update logic
}

export async function changePasswordAction(formData: FormData) {
  // Password change logic
}
```

## Data Fetching Patterns

### Server Components

```typescript
// Direct database access in Server Components
async function getPosts(): Promise<TPost[]> {
  const posts = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'published' }
    },
    sort: '-publishedAt',
    limit: 10
  })
  
  return posts.docs
}

export default async function PostsPage() {
  const posts = await getPosts()
  
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

### Client Components with React Query

```typescript
// Client-side data fetching
function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('/api/posts')
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

function PostsList() {
  const { data: posts, isLoading, error } = usePosts()
  
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  
  return (
    <div>
      {posts?.docs.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

### Form Handling

```typescript
// Using Server Actions with forms
function ContactForm() {
  return (
    <form action={contactAction}>
      <input name="name" type="text" required />
      <input name="email" type="email" required />
      <textarea name="message" required />
      <button type="submit">Send Message</button>
    </form>
  )
}

async function contactAction(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string
  
  // Process form data
  // Send email, save to database, etc.
  
  redirect('/thank-you')
}
```

## Error Handling

### API Error Responses

```typescript
interface TApiError {
  message: string
  code: string
  details?: any
}

// Example error handling
async function fetchWithErrorHandling(url: string) {
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      const error: TApiError = await response.json()
      throw new Error(error.message)
    }
    
    return response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
```

### Server Action Error Handling

```typescript
async function createPostAction(formData: FormData) {
  try {
    const validatedData = postSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
    })
    
    const post = await payload.create({
      collection: 'posts',
      data: validatedData,
    })
    
    return { success: true, post }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: 'Validation failed', details: error.errors }
    }
    
    return { error: 'Failed to create post' }
  }
}
```

## Type Safety

### Generated Types

```typescript
// Auto-generated from PayloadCMS collections
import type { TPost, TUser, TMedia } from '@/payload/payload-types'

// Custom API response types
interface TApiResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number | null
  prevPage: number | null
}

// Usage
const posts: TApiResponse<TPost> = await fetch('/api/posts').then(r => r.json())
```

## Rate Limiting & Security

### API Rate Limiting

```typescript
// Implement rate limiting for API routes
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

export async function POST(request: Request) {
  const ip = request.ip ?? '127.0.0.1'
  const { success } = await ratelimit.limit(ip)
  
  if (!success) {
    return new Response('Rate limit exceeded', { status: 429 })
  }
  
  // Continue with request processing
}
```

### Input Validation

```typescript
// Zod schemas for API validation
const createPostSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  status: z.enum(['draft', 'published']),
  author: z.string().uuid(),
})

export async function POST(request: Request) {
  const body = await request.json()
  
  try {
    const validatedData = createPostSchema.parse(body)
    // Process validated data
  } catch (error) {
    return Response.json({ error: 'Invalid input' }, { status: 400 })
  }
}
```

## Testing APIs

### Unit Tests

```typescript
// Testing API routes
import { POST } from '@/app/api/posts/route'

describe('/api/posts', () => {
  it('should create a new post', async () => {
    const request = new Request('http://localhost:3000/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Test Post',
        content: 'Test content',
        status: 'draft',
      }),
    })
    
    const response = await POST(request)
    const data = await response.json()
    
    expect(response.status).toBe(201)
    expect(data.title).toBe('Test Post')
  })
})
```

### Integration Tests

```typescript
// Testing with test database
describe('Posts API Integration', () => {
  beforeEach(async () => {
    // Setup test database
    await setupTestDB()
  })
  
  afterEach(async () => {
    // Cleanup test database
    await cleanupTestDB()
  })
  
  it('should handle full CRUD operations', async () => {
    // Test create, read, update, delete
  })
})
```

This API documentation provides comprehensive coverage of all API endpoints, patterns, and best practices used in the PayloadCMS Playground project.
