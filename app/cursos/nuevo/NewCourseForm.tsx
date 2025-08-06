'use client'

import Input from '@/components/Input'
import MainButton from '@/components/MainButton'
import { useToast } from '@/components/ui/use-toast'
import { fetchCourse } from '@/utils/canvas'
import { createClient } from '@/utils/supabase/client'
import { useState, useEffect } from 'react'

const DEFAULT_COLOR = '#eeeeee'
const DEFAULT_PROFESSOR_GROUP = 1000

interface Props {
  userInfoId?: string
}

export default function NewCourseForm({ userInfoId }: Props) {
  const { toast } = useToast()
  const supabase = createClient()
  const [pending, setPending] = useState(false)
  const [canvasLoading, setCanvasLoading] = useState(false)
  const [formData, setFormData] = useState({
    canvasId: '',
    title: '',
    abbreviature: '',
    semester: '',
    color: DEFAULT_COLOR,
    img: ''
  })

  // Effect para fetchear datos cuando cambia el Canvas ID
  useEffect(() => {
    const fetchCanvasData = async (canvasId: string) => {
      if (!canvasId.trim()) return
      
      setCanvasLoading(true)
      try {
        const response = await fetchCourse(canvasId)
        if (!response) {
          toast({
            title: 'Advertencia',
            description: 'No se encontró el curso en Canvas con ese ID',
            variant: 'destructive'
          })
          return
        }

        // Debug logging
        console.log('Canvas course response:', response)
        console.log('Available fields:', Object.keys(response))
        console.log('course_code:', response.course_code)
        console.log('name:', response.name)
        console.log('start_at:', response.start_at)
        console.log('image_download_url:', response.image_download_url)
        
        // Obtener datos automáticamente
        const year = response.start_at?.split('-')[0] ?? new Date().getFullYear()
        const month = parseInt(response.start_at?.split('-')[1]) ?? new Date().getMonth()
        const semester = month < 7 ? 1 : 2
        
        // Obtener abreviatura de manera más robusta
        let abbreviature = ''
        if (response.course_code && typeof response.course_code === 'string') {
          abbreviature = response.course_code.split('-')[0].trim()
        }
        if (!abbreviature && response.name && typeof response.name === 'string') {
          abbreviature = response.name.substring(0, 8).trim()
        }
        if (!abbreviature) {
          abbreviature = 'CURSO'
        }

        // Autocompletar formulario
        setFormData(prev => ({
          ...prev,
          title: response.name || prev.title,
          abbreviature: abbreviature || prev.abbreviature,
          semester: `${year}-${semester}` || prev.semester,
          img: response.image_download_url || prev.img
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
  }, [formData.canvasId, toast])

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
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCourseCreationError = (error: any) => {
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

    try {
      const courseData = {
        title: formData.title.trim(),
        abbreviature: formData.abbreviature.trim(),
        semester: formData.semester.trim(),
        color: formData.color || DEFAULT_COLOR,
        img: formData.img.trim() || 'https://bit.ly/2k1H1t6',
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

      // Limpiar formulario
      setFormData({
        canvasId: '',
        title: '',
        abbreviature: '',
        semester: '',
        color: DEFAULT_COLOR,
        img: ''
      })

    } catch (error) {
      console.error('Error creating course:', error)
      handleCourseCreationError(error)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <form
        className='animate-in flex-1 flex flex-col w-full justify-center items-center gap-2 text-foreground'
        onSubmit={handleSubmit}
      >
        <fieldset className='flex flex-col gap-6 max-w-md w-full' disabled={pending}>
          {/* Canvas ID - Opcional */}
          <div className="space-y-2">
            <Input 
              label='ID Canvas (opcional)' 
              name='canvasId'
              value={formData.canvasId}
              onChange={(e) => handleInputChange('canvasId', e.target.value)}
              placeholder="Ingresa el ID del curso en Canvas para autocompletar"
            />
            {canvasLoading && (
              <p className="text-sm text-blue-600 dark:text-blue-400">
                🔄 Obteniendo datos de Canvas...
              </p>
            )}
          </div>

          {/* Campos principales */}
          <Input 
            label='Nombre del curso' 
            name='title' 
            required
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Ej: Introducción a la Programación"
          />
          
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
          
          <Input 
            label='Color' 
            name='color' 
            type='color' 
            value={formData.color}
            onChange={(e) => handleInputChange('color', e.target.value)}
          />
          
          <Input 
            label='URL de imagen (opcional)' 
            name='img'
            value={formData.img}
            onChange={(e) => handleInputChange('img', e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          
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
