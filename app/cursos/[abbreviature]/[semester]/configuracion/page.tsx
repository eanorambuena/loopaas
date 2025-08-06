'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { LinkPreview } from '@/components/ui/link-preview'
import DeleteCourseButton from '../DeleteCourseButton'
import MainButton from '@/components/MainButton'

const DEFAULT_COLOR = '#eeeeee'

export default function ConfiguracionCursoPage() {
  const router = useRouter()
  const params = useParams() as { abbreviature: string, semester: string }
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [course, setCourse] = useState<any>(null)
  const [isProfessor, setIsProfessor] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const res = await fetch(`/api/course-info?abbreviature=${params.abbreviature}&semester=${params.semester}`)
      const data = await res.json()
      setCourse(data.course)
      setIsProfessor(data.isProfessor)
      setLoading(false)
    }
    fetchData()
  }, [params.abbreviature, params.semester])

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setCourse({ ...course, [e.target.name]: e.target.value })
  }

  const handleInputChange = (name: string, value: string) => {
    setCourse((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/update-course', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...course })
    })
    setSaving(false)
    if (res.ok) {
      toast({ title: 'Curso actualizado', variant: 'success' })
      router.refresh()
    } else {
      toast({ title: 'Error al actualizar', variant: 'destructive' })
    }
  }

  if (loading) {
    return (
      <div className="animate-in flex flex-col gap-8 p-6 opacity-0 w-full max-w-2xl mx-auto">
        <div className="text-center space-y-4">
          <div className="h-10 bg-secondary/50 rounded animate-pulse"></div>
          <div className="h-6 bg-secondary/30 rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          <div className="h-16 bg-secondary/20 rounded animate-pulse"></div>
          <div className="h-16 bg-secondary/20 rounded animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (!course) return <div className="p-6 text-center">No se encontró el curso</div>

  return (
    <div className="animate-in flex flex-col gap-8 p-6 opacity-0 w-full max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className='text-4xl font-bold tracking-tight'>Configuración del curso</h1>
        <p className="text-muted-foreground text-lg">
          Modifica la información y configuración de tu curso
        </p>
      </div>
      
      <form onSubmit={handleSave} className="w-full">
        <fieldset className='flex flex-col gap-6 w-full' disabled={saving}>
          {/* Grid de campos principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre del curso - Span completo */}
            <div className="md:col-span-2">
              <Input 
                label='Nombre del curso' 
                name='title' 
                required
                value={course.title || ''}
                onChange={handleChange}
                placeholder="Ej: Introducción a la Programación"
              />
            </div>
            
            {/* Abreviatura y Semestre en la misma fila */}
            <Input 
              label='Abreviatura' 
              name='abbreviature' 
              required
              value={course.abbreviature || ''}
              onChange={handleChange}
              placeholder="Ej: IIC1103"
            />
            
            <Input 
              label='Semestre (ej: 2024-1)' 
              name='semester' 
              required
              value={course.semester || ''}
              onChange={handleChange}
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
                  value={course.color || DEFAULT_COLOR}
                  onChange={handleChange}
                  className="absolute opacity-0 w-full h-12 cursor-pointer"
                />
                <div 
                  className="w-full h-12 rounded-md border bg-inherit flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
                  style={{ borderColor: (course.color && course.color !== DEFAULT_COLOR) ? course.color : undefined }}
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
                    style={{ color: (course.color && course.color !== DEFAULT_COLOR) ? course.color : 'currentColor' }}
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
                  value={course.img || ''}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                {course.img && (
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
              {course.img && isValidImageUrl(course.img) && (
                <div className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg border border-border/50">
                  <span className="text-sm text-muted-foreground">Vista previa:</span>
                  <LinkPreview 
                    url={course.img}
                    imageSrc={course.img}
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
              
              {course.img && !isValidImageUrl(course.img) && (
                <div className="flex items-center gap-2 p-2 bg-amber-50 dark:bg-amber-950/20 rounded border border-amber-200 dark:border-amber-800">
                  <span className="text-xs text-amber-600 dark:text-amber-400">⚠️ Verifica que la URL sea una imagen válida</span>
                </div>
              )}
            </div>
          </div>
          
          <MainButton 
            type="submit" 
            disabled={saving}
            pendingText='Guardando cambios...'
          >
            Guardar cambios
          </MainButton>
        </fieldset>
      </form>

      {/* Danger Zone */}
      {isProfessor && (
        <div className="mt-8 border-2 border-red-600 rounded-lg p-6 bg-red-50 dark:bg-red-950/90">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
            <span aria-label="Peligro" title="Peligro">⚠️</span> Danger Zone
          </h2>
          <p className="mb-4 font-semibold">Eliminar el curso es irreversible. Todos los datos asociados se perderán.</p>
          <DeleteCourseButton courseId={course.id} />
        </div>
      )}
    </div>
  )
}
