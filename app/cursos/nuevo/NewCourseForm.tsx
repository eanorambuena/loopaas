'use client'
import React from 'react'
import Input from '@/components/Input'
import MainButton from '@/components/MainButton'
import OrganizationSelector from '@/components/OrganizationSelector'
import { useToast } from '@/components/ui/use-toast'
import { LinkPreview } from '@/components/ui/link-preview'
import { createClient } from '@/utils/supabase/client'
import { ORGANIZATION_PLAN_FREE } from '@/lib/constants'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const DEFAULT_COLOR = '#eeeeee'
const DEFAULT_PROFESSOR_GROUP = 1000

interface Props {
  userInfoId?: string
}

export default function NewCourseForm({ userInfoId }: Props) {
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClient()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [pending, setPending] = useState(false)
  const [canvasLoading, setCanvasLoading] = useState(false)
  const [canvasTokenStatus, setCanvasTokenStatus] = useState<{
    hasAnyToken: boolean
    tokenSource: string
  } | null>(null)

  const [formData, setFormData] = useState({
    canvasId: '',
    title: '',
    abbreviature: '',
    semester: '',
    color: DEFAULT_COLOR,
    img: '',
    organizationId: ''
  })

  // Store selected organization info
  const [selectedOrg, setSelectedOrg] = useState<{ id: string, name: string, plan: string, courseCount: number } | null>(null)
  const [orgsList, setOrgsList] = useState<{ id: string, name: string, plan: string, courseCount: number }[]>([])

  // Verificar el estado del token de Canvas al montar el componente
  useEffect(() => {
    const checkTokenStatus = async () => {
      try {
        const response = await fetch('/api/canvas/token-status')
        if (response.ok) {
          const status = await response.json()
          setCanvasTokenStatus(status)
          console.log('Canvas token status:', status)
        }
      } catch (error) {
        console.error('Error checking Canvas token status:', error)
      }
    }

    checkTokenStatus()
  }, [])

  // Effect para fetchear datos cuando cambia el Canvas ID
  useEffect(() => {
    const fetchCanvasData = async (canvasId: string) => {
      if (!canvasId.trim()) return
      
      // Verificar si tenemos token disponible
      if (canvasTokenStatus && !canvasTokenStatus.hasAnyToken) {
        toast({
          title: 'Token de Canvas requerido',
          description: 'Para obtener datos de Canvas, necesitas configurar un token de Canvas en tu perfil o contactar al administrador.',
          variant: 'destructive'
        })
        return
      }
      
      setCanvasLoading(true)
      try {
        const response = await fetch(`/api/canvas/course/${canvasId}`)
        
        if (!response.ok) {
          const errorData = await response.json()
          console.error('API error:', errorData)
          
          let errorMessage = 'No se pudo obtener la información del curso desde Canvas'
          
          if (response.status === 401) {
            errorMessage = 'Error de autenticación con Canvas. Por favor verifica tu token de Canvas en tu perfil.'
          } else if (response.status === 404) {
            errorMessage = 'No se encontró el curso con ese ID en Canvas.'
          } else if (errorData.error) {
            errorMessage = errorData.error
          }
          
          toast({
            title: 'Error',
            description: errorMessage,
            variant: 'destructive'
          })
          return
        }

        const data = await response.json()
        
        if (!data) {
          toast({
            title: 'Advertencia',
            description: 'No se encontró el curso en Canvas con ese ID',
            variant: 'destructive'
          })
          return
        }

        // Debug logging
        console.log('Canvas course response:', data)
        console.log('Available fields:', Object.keys(data))
        console.log('course_code:', data.course_code)
        console.log('name:', data.name)
        console.log('start_at:', data.start_at)
        console.log('image_download_url:', data.image_download_url)
        
        // Obtener datos automáticamente
        const year = data.start_at?.split('-')[0] ?? new Date().getFullYear()
        const month = parseInt(data.start_at?.split('-')[1]) ?? new Date().getMonth()
        const semester = month < 7 ? 1 : 2
        
        // Obtener abreviatura de manera más robusta
        let abbreviature = ''
        if (data.course_code && typeof data.course_code === 'string') {
          abbreviature = data.course_code.split('-')[0].trim()
        }
        if (!abbreviature && data.name && typeof data.name === 'string') {
          abbreviature = data.name.substring(0, 8).trim()
        }
        if (!abbreviature) {
          abbreviature = 'CURSO'
        }

        // Autocompletar formulario
        setFormData(prev => ({
          ...prev,
          title: data.name || prev.title,
          abbreviature: abbreviature || prev.abbreviature,
          semester: `${year}-${semester}` || prev.semester,
          img: data.image_download_url || prev.img
        }))

        toast({
          title: 'Datos obtenidos de Canvas',
          description: 'Los campos se han autocompletado con la información disponible',
          variant: 'success'
        })

      } catch (error) {
        console.error('Error fetching Canvas course:', error)
        toast({
          title: 'Error',
          description: 'No se pudo obtener la información del curso desde Canvas',
          variant: 'destructive'
        })
      } finally {
        setCanvasLoading(false)
      }
    }

    if (formData.canvasId && formData.canvasId.length > 0) {
      const timer = setTimeout(() => {
        fetchCanvasData(formData.canvasId)
      }, 1000) // Debounce de 1 segundo

      return () => clearTimeout(timer)
    }
  }, [formData.canvasId, toast, canvasTokenStatus])

  // Función para validar si es una URL de imagen válida
  const isValidImageUrl = (url: string) => {
    if (!url || !url.trim()) return false
    try {
      const urlObj = new URL(url)
      
      // Verificar que sea HTTP o HTTPS
      if (!['http:', 'https:'].includes(urlObj.protocol)) return false
      
      // Verificar extensiones de archivo (más flexible)
      const pathname = urlObj.pathname.toLowerCase()
      if (/\.(jpg|jpeg|png|gif|bmp|webp|avif|svg)(\?.*)?$/i.test(pathname)) {
        return true
      }
      
      // Verificar dominios conocidos de imágenes
      const hostname = urlObj.hostname.toLowerCase()
      const imageHosts = [
        'images.unsplash.com',
        'unsplash.com',
        'i.imgur.com',
        'imgur.com',
        'picsum.photos',
        'via.placeholder.com',
        'placehold.co',
        'placeholder.com',
        'dummyimage.com',
        'fakeimg.pl',
        'loremflickr.com',
        'cdn.pixabay.com',
        'images.pexels.com',
        'source.unsplash.com',
        'raw.githubusercontent.com',
        'github.com',
        'githubusercontent.com',
        'bit.ly',
        'tinyurl.com',
        't.co'
      ]
      
      // Si es de un dominio conocido de imágenes, considerarla válida
      if (imageHosts.some(host => hostname.includes(host))) {
        return true
      }
      
      // Para otros dominios, ser más permisivo con rutas que sugieren imágenes
      if (/\/(image|img|photo|pic|picture|avatar|thumbnail|thumb)/i.test(pathname)) {
        return true
      }
      
      // Si tiene parámetros que sugieren una imagen
      if (urlObj.search && /[?&](format|type|ext)=(jpg|jpeg|png|gif|webp)/i.test(urlObj.search)) {
        return true
      }
      
      // Como último recurso, aceptar URLs que parezcan válidas
      // (esto permite URLs dinámicas de servicios de imágenes)
      return urlObj.hostname.length > 0
      
    } catch {
      return false
    }
  }

  

  // Fetch organizations for local use (for plan info)
  useEffect(() => {
    async function fetchOrganizationsWithCourseCounts() {
      try {
        const response = await fetch('/api/organizations')
        if (!response.ok) return
        const data = await response.json()
        // Para cada organización, obtener el número de cursos
        const orgs = data.organizations || []
        const counts = await Promise.all(orgs.map(async (org: any) => {
          try {
            const res = await fetch(`/api/organization-courses?organizationId=${org.id}`)
            if (!res.ok) return 0
            const d = await res.json()
            return d.count || 0
          } catch { return 0 }
        }))
        const orgsWithCounts = orgs.map((org: any, idx: number) => ({ ...org, courseCount: counts[idx] }))
        setOrgsList(orgsWithCounts)
      } catch {}
    }
    fetchOrganizationsWithCourseCounts()
  }, [])

  // Early return después de todos los hooks
  if (!userInfoId) return null

  const addProfessorToCourse = async (courseId: string) => {
    await supabase.from('professors').insert({ teacherInfoId: userInfoId, courseId })

    await supabase.from('students').insert({ 
      userInfoId: userInfoId, 
      courseId, 
      group: DEFAULT_PROFESSOR_GROUP 
    })
  }

  // Función para manejar cambios en el formulario
  const handleInputChange = (name: string, value: string) => {
    if (name === 'organizationId') {
      const org = orgsList.find(o => o.id === value)
      console.log('[DEBUG] Organización seleccionada:', org)
      setSelectedOrg(org || null)
  if (org && org.plan.toLowerCase() === ORGANIZATION_PLAN_FREE.toLowerCase() && org.courseCount >= 3) {
        console.log('[DEBUG] Límite alcanzado para organización free:', org)
        setShowUpgradeModal(true)
        return
      }
      setFormData(prev => ({ ...prev, organizationId: value }))
      console.log('[DEBUG] Organización válida, actualizando formData:', value)
      return
    }
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCourseCreationError = (error: any) => {
    if (error.code === 'PLAN_LIMIT_EXCEEDED') {
      setShowUpgradeModal(true)
      return
    }
    if (error.code === '23505') {
      return toast({
        title: 'Error',
        description: 'El curso ya existe. Si crees que esto es un error, por favor ponte en contacto con nosotros.',
        variant: 'destructive'
      })
    }
    return toast({
      title: 'Error',
      description: `Hubo un error al crear el curso. Por favor intenta de nuevo o ponte en contacto con nosotros. Código de error: ${error.code}`,
      variant: 'destructive'
    })
  }

  // Función unificada para manejar el submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPending(true)

    // Validar campos requeridos
    if (!formData.title.trim()) {
      setPending(false)
      return toast({
        title: 'Error',
        description: 'El nombre del curso es requerido',
        variant: 'destructive'
      })
    }

    if (!formData.abbreviature.trim()) {
      setPending(false)
      return toast({
        title: 'Error',
        description: 'La abreviatura del curso es requerida',
        variant: 'destructive'
      })
    }

    if (!formData.semester.trim()) {
      setPending(false)
      return toast({
        title: 'Error',
        description: 'El semestre es requerido',
        variant: 'destructive'
      })
    }

    if (!formData.organizationId.trim()) {
      setPending(false)
      return toast({
        title: 'Error',
        description: 'La organización es requerida',
        variant: 'destructive'
      })
    }

    try {
      const courseData = {
        title: formData.title.trim(),
        abbreviature: formData.abbreviature.trim(),
        semester: formData.semester.trim(),
        color: formData.color || DEFAULT_COLOR,
        img: formData.img.trim() || 'https://bit.ly/2k1H1t6',
        organizationId: formData.organizationId.trim(),
        teacherInfoId: userInfoId,
        ...(formData.canvasId.trim() && { canvasId: formData.canvasId.trim() })
      }

      const { error, data } = await supabase
        .from('courses')
        .insert([courseData])
        .select()
        .single()

      if (error) {
        throw error
      }

      if (data && data.id) {
        await addProfessorToCourse(data.id)
      }

      toast({
        title: 'Éxito',
        description: `Curso "${formData.title}" creado correctamente`,
        variant: 'success'
      })

      // Redirigir a la página del curso creado
      setTimeout(() => {
        router.push(`/cursos/${data.abbreviature}/${data.semester}`)
      }, 1000) // Esperar 1 segundo para mostrar el toast

    } catch (error) {
      console.error('Error creating course:', error)
      handleCourseCreationError(error)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="w-full max-w-2xl">
      {/* Modal de upgrade */}
      {showUpgradeModal && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col items-center">
            <h2 className="text-xl font-bold mb-2 text-center">¡Has alcanzado el límite de cursos!</h2>
            <p className="mb-4 text-center">Para crear más cursos necesitas actualizar tu plan a <span className="font-semibold text-emerald-700 dark:text-emerald-400">Pro</span>.</p>
            <button
              className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800 transition mb-2"
              onClick={() => { 
                console.log('[DEBUG] Botón Ver planes Pro clickeado, cerrando modal y redirigiendo')
                setShowUpgradeModal(false) 
                router.push('/pricing') 
              }}
            >Ver planes Pro</button>
            <button
              className="text-sm text-gray-500 hover:underline"
              onClick={() => {
                console.log('[DEBUG] Botón Cerrar modal clickeado, limpiando selección de organización')
                setShowUpgradeModal(false)
                setFormData(prev => ({ ...prev, organizationId: '' }))
              }}
            >Cerrar</button>
          </div>
        </div>
      )}
      <form
        className='animate-in flex-1 flex flex-col w-full justify-center items-center gap-2 text-foreground'
        onSubmit={handleSubmit}
      >
        <fieldset className='flex flex-col gap-6 max-w-2xl w-full' disabled={pending || showUpgradeModal}>
          {/* Selector de Organización */}
          <OrganizationSelector
            value={formData.organizationId}
            onChange={(organizationId) => handleInputChange('organizationId', organizationId)}
            label="Organización"
            placeholder="Selecciona una organización"
            required
          />
          
          {/* Canvas ID - Opcional */}
          <div className="space-y-2">
            <Input 
              label='ID Canvas (opcional)' 
              name='canvasId'
              value={formData.canvasId}
              onChange={(e) => handleInputChange('canvasId', e.target.value)}
              placeholder="Ingresa el ID del curso en Canvas para autocompletar"
            />
            {canvasTokenStatus && !canvasTokenStatus.hasAnyToken && (
              <p className="text-sm text-amber-600 dark:text-amber-400">
                ⚠️ Sin token de Canvas configurado. La integración con Canvas no estará disponible.
              </p>
            )}
            {canvasTokenStatus && canvasTokenStatus.hasAnyToken && (
              <p className="text-sm text-green-600 dark:text-green-400">
                ✅ Token de Canvas disponible ({canvasTokenStatus.tokenSource})
              </p>
            )}
            {canvasLoading && (
              <p className="text-sm text-blue-600 dark:text-blue-400">
                🔄 Obteniendo datos de Canvas...
              </p>
            )}
          </div>

          {/* Grid de campos principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre del curso - Span completo */}
            <div className="md:col-span-2">
              <Input 
                label='Nombre del curso' 
                name='title' 
                required
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Ej: Introducción a la Programación"
              />
            </div>
            
            {/* Abreviatura y Semestre en la misma fila */}
            <Input 
              label='Abreviatura' 
              name='abbreviature' 
              required
              value={formData.abbreviature}
              onChange={(e) => handleInputChange('abbreviature', e.target.value)}
              placeholder="Ej: IIC1103"
            />
            
            <Input 
              label='Semestre (ej: 2024-1)' 
              name='semester' 
              required
              value={formData.semester}
              onChange={(e) => handleInputChange('semester', e.target.value)}
              placeholder="2024-1"
            />
          </div>

          {/* Color e Imagen en la misma fila */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-1">
              <label htmlFor="color" className="text-md block mb-2">Color</label>
              <div className="relative">
                <input
                  type="color"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  className="absolute opacity-0 w-full h-12 cursor-pointer"
                />
                <div 
                  className="w-full h-12 rounded-md border bg-inherit flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
                  style={{ borderColor: formData.color !== DEFAULT_COLOR ? formData.color : undefined }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transition-colors"
                    style={{ color: formData.color !== DEFAULT_COLOR ? formData.color : 'currentColor' }}
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                    <path d="M19 6h1a2 2 0 0 1 2 2a5 5 0 0 1 -5 5l-5 0v2" />
                    <path d="M10 15m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3 space-y-3">
              <div className="relative">
                <Input 
                  label='URL de imagen (opcional)' 
                  name='img'
                  value={formData.img}
                  onChange={(e) => handleInputChange('img', e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                {formData.img && (
                  <button
                    type="button"
                    onClick={() => handleInputChange('img', '')}
                    className="absolute right-2 top-8 p-1 text-muted-foreground hover:text-destructive transition-colors rounded-full hover:bg-destructive/10"
                    title="Limpiar URL de imagen"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Preview de la imagen */}
              {formData.img && isValidImageUrl(formData.img) && (
                <div className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg border border-border/50">
                  <span className="text-sm text-muted-foreground">Vista previa:</span>
                  <LinkPreview 
                    url={formData.img}
                    imageSrc={formData.img}
                    isStatic
                    width={120}
                    height={80}
                    className="font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Ver imagen del curso
                  </LinkPreview>
                  <span className="text-xs text-green-600 dark:text-green-400">✓ URL válida</span>
                </div>
              )}
              
              {formData.img && !isValidImageUrl(formData.img) && (
                <div className="flex items-center gap-2 p-2 bg-amber-50 dark:bg-amber-950/20 rounded border border-amber-200 dark:border-amber-800">
                  <span className="text-xs text-amber-600 dark:text-amber-400">⚠️ Verifica que la URL sea una imagen válida</span>
                </div>
              )}
            </div>
          </div>
          
          <MainButton 
            type="submit" 
            disabled={pending || canvasLoading}
            pendingText='Creando curso...'
          >
            Crear Curso
          </MainButton>
        </fieldset>
      </form>
    </div>
  )
}
