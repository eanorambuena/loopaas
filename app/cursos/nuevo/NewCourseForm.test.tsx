import '@testing-library/jest-dom'
vi.mock('react-dom', () => ({
  ...vi.importActual('react-dom'),
  useFormStatus: () => ({ pending: false, action: undefined })
}))
vi.mock('@/utils/supabase/client', () => ({
  createClient: () => ({
    from: () => ({ select: () => ({ data: [], error: null }) }),
    auth: { getUser: () => ({ data: null }) },
  })
}))
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    pathname: '/',
    query: {},
  })
}))
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import NewCourseForm from './NewCourseForm'
import React from 'react'

// Mock de fetch para simular la API de organizaciones y plan-usage
beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (url === '/api/organizations') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          organizations: [
            { id: 'org1', name: 'Org Free', plan: 'Free', currentUsage: { courses: 3 } }
          ]
        })
      }) as any
    }
    if (url === '/api/plan-usage') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          organizations: [
            { organizationId: 'org1', plan: 'Free', currentUsage: { courses: 3 } }
          ]
        })
      }) as any
    }
    if (url.startsWith('/api/courses/create')) {
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ code: 'PLAN_LIMIT_EXCEEDED', current: 3, limit: 3 })
      }) as any
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({}) }) as any
  })
})

afterEach(() => {
  vi.resetAllMocks()
})

describe('Flujo de límite de cursos y modal de upgrade', () => {
  it('muestra el modal de upgrade al intentar crear un cuarto curso en una organización Free', async () => {
    render(<NewCourseForm userInfoId="user1" />)


    // Esperar a que cargue el selector de organización (combobox)
    await waitFor(() => expect(screen.getByRole('combobox')).toBeInTheDocument())

    // Seleccionar la organización Free
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'org1' } })

    // Llenar los campos requeridos
    fireEvent.change(screen.getByLabelText('Nombre del curso'), { target: { value: 'Curso 4' } })
    fireEvent.change(screen.getByLabelText('Abreviatura'), { target: { value: 'C4' } })
    fireEvent.change(screen.getByLabelText('Semestre (ej: 2024-1)'), { target: { value: '2024-2' } })

    // Enviar el formulario
    fireEvent.click(screen.getByRole('button', { name: /crear curso/i }))

    // Esperar a que aparezca el modal de upgrade
    await waitFor(() => {
      expect(
        screen.getByText((content, node) =>
          node?.textContent?.toLowerCase().includes('has alcanzado el límite de cursos')
        )
      ).toBeInTheDocument()
      expect(
        screen.getByText((content, node) =>
          node?.textContent?.toLowerCase().includes('pro')
        )
      ).toBeInTheDocument()
    })
  })
})
