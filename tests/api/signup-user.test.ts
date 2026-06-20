import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock dependencies before importing the route
vi.mock('@/drizzle/db', () => ({
  db: {
    query: {
      users: {
        findFirst: vi.fn(),
      },
    },
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        returning: vi.fn().mockResolvedValue([{ id: 'new-user-id', email: 'test@example.com' }]),
        onConflictDoNothing: vi.fn(),
      })),
      onConflictDoNothing: vi.fn(),
    })),
  },
}))

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('hashed-password'),
  },
}))

describe('POST /api/signup-user', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should reject empty email', async () => {
    const { POST } = await import('@/app/api/signup-user/route')
    const request = new Request('http://localhost/api/signup-user', {
      method: 'POST',
      body: JSON.stringify({ email: '', password: '123456' }),
    })
    const response = await POST(request as any)
    const data = await response.json()
    expect(response.status).toBe(400)
    expect(data.message).toContain('requeridos')
  })

  it('should reject empty password', async () => {
    const { POST } = await import('@/app/api/signup-user/route')
    const request = new Request('http://localhost/api/signup-user', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com', password: '' }),
    })
    const response = await POST(request as any)
    const data = await response.json()
    expect(response.status).toBe(400)
    expect(data.message).toContain('requeridos')
  })

  it('should accept non-UC email addresses', async () => {
    const { db } = await import('@/drizzle/db')
    const { default: bcrypt } = await import('bcryptjs')

    // Mock no existing user
    vi.mocked(db.query.users.findFirst).mockResolvedValue(null as any)

    // Mock successful insert
    const mockInsert = vi.fn(() => ({
      values: vi.fn(() => ({
        returning: vi.fn().mockResolvedValue([{ id: 'new-id', email: 'test@gmail.com' }]),
        onConflictDoNothing: vi.fn(),
      })),
      onConflictDoNothing: vi.fn(),
    }))
    vi.mocked(db.insert).mockImplementation(mockInsert as any)

    const { POST } = await import('@/app/api/signup-user/route')
    const request = new Request('http://localhost/api/signup-user', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@gmail.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      }),
    })

    const response = await POST(request as any)
    expect(response.status).toBe(200)

    // Verify bcrypt was called (password was hashed)
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10)
  })

  it('should accept UC email addresses', async () => {
    const { db } = await import('@/drizzle/db')

    vi.mocked(db.query.users.findFirst).mockResolvedValue(null as any)

    const mockInsert = vi.fn(() => ({
      values: vi.fn(() => ({
        returning: vi.fn().mockResolvedValue([{ id: 'new-id', email: 'user@uc.cl' }]),
        onConflictDoNothing: vi.fn(),
      })),
      onConflictDoNothing: vi.fn(),
    }))
    vi.mocked(db.insert).mockImplementation(mockInsert as any)

    const { POST } = await import('@/app/api/signup-user/route')
    const request = new Request('http://localhost/api/signup-user', {
      method: 'POST',
      body: JSON.stringify({
        email: 'user@uc.cl',
        password: 'password123',
        firstName: 'UC',
        lastName: 'Student',
      }),
    })

    const response = await POST(request as any)
    expect(response.status).toBe(200)
  })

  it('should reject duplicate email', async () => {
    const { db } = await import('@/drizzle/db')

    // Mock existing user
    vi.mocked(db.query.users.findFirst).mockResolvedValue({
      id: 'existing-id',
      email: 'existing@example.com',
    } as any)

    const { POST } = await import('@/app/api/signup-user/route')
    const request = new Request('http://localhost/api/signup-user', {
      method: 'POST',
      body: JSON.stringify({
        email: 'existing@example.com',
        password: 'password123',
      }),
    })

    const response = await POST(request as any)
    const data = await response.json()
    expect(response.status).toBe(400)
    expect(data.message).toContain('ya existe')
  })
})
