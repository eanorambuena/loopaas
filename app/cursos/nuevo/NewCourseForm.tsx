'use client'

import Input from '@/components/Input'
import MainButton from '@/components/MainButton'
import { useToast } from '@/components/ui/use-toast'
import { fetchCourse } from '@/utils/canvas'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

const DEFAULT_COLOR = '#eeeeee'

interface Props {
  userInfoId?: string
}

export default function NewCourseForm({ userInfoId }: Props) {
  const { toast } = useToast()
  const supabase = createClient()
  const [pending, setPending] = useState(false)

  if (!userInfoId) return null

  // --- CANVAS FORM ---
  const handleCanvasSubmit = async (e: any) => {
    e.preventDefault()
    setPending(true)
    const formData = new FormData(e.target)
    const color = formData.get('color') as string
    const canvasId = formData.get('canvasId') as string
    const response = await fetchCourse(canvasId)
    if (!response) {
      setPending(false)
      return toast({
        title: 'Error',
        description: 'No se encontró el curso en Canvas',
        variant: 'destructive'
      })
    }
    const year = response.start_at?.split('-')[0] ?? new Date().getFullYear()
    const month = parseInt(response.start_at?.split('-')[1]) ?? new Date().getMonth()
    const semester = month < 7 ? 1 : 2
    const abbreviature = response.course_code?.split('-')[0]
    const { error, data } = await supabase
      .from('courses')
      .insert([
        {
          title: response.name,
          abbreviature,
          img: response.image_download_url ?? 'https://bit.ly/2k1H1t6',
          semester: `${year}-${semester}`,
          color: color,
          canvasId,
          teacherInfoId: userInfoId
        }
      ])
      .select()
      .single()
    setPending(false)
    if (error) {
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
    if (data && data.id) {
      await supabase.from('professors').insert({ teacherInfoId: userInfoId, courseId: data.id })
    }
    return toast({
      title: 'Éxito',
      description: 'Curso creado correctamente',
      variant: 'success'
    })
  }

  // --- MANUAL FORM ---
  const handleManualSubmit = async (e: any) => {
    e.preventDefault()
    setPending(true)
    const formData = new FormData(e.target)
    const title = formData.get('title') as string
    const abbreviature = formData.get('abbreviature') as string
    const semester = formData.get('semester') as string
    const color = formData.get('color') as string
    const img = formData.get('img') as string || 'https://bit.ly/2k1H1t6'
    const { error, data } = await supabase
      .from('courses')
      .insert([
        {
          title,
          abbreviature,
          img,
          semester,
          color,
          teacherInfoId: userInfoId
        }
      ])
      .select()
      .single()
    setPending(false)
    if (error) {
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
    if (data && data.id) {
      await supabase.from('professors').insert({ teacherInfoId: userInfoId, courseId: data.id })
    }
    return toast({
      title: 'Éxito',
      description: 'Curso creado correctamente',
      variant: 'success'
    })
  }

  return (
    <Tabs defaultValue="canvas" className="w-full max-w-md">
      <TabsList className="w-full mb-2">
        <TabsTrigger value="canvas" className="flex-1">Importar desde Canvas</TabsTrigger>
        <TabsTrigger value="manual" className="flex-1">Crear manualmente</TabsTrigger>
      </TabsList>
      <div className="relative min-h-[320px] w-full">
        <TabsContent value="canvas" className="w-full">
          <form
            className='animate-in flex-1 flex flex-col w-full justify-center items-center gap-2 text-foreground'
            onSubmit={handleCanvasSubmit}
          >
            <fieldset className='flex flex-col gap-6 max-w-md w-full'>
              <Input label='ID Canvas' name='canvasId' required />
              <Input label='Color' name='color' type='color' defaultValue={DEFAULT_COLOR} />
              <MainButton pendingText='Creando curso...'>Crear Curso desde Canvas</MainButton>
            </fieldset>
          </form>
        </TabsContent>
        <TabsContent value="manual" className="w-full">
          <form
            className='animate-in flex-1 flex flex-col w-full justify-center items-center gap-2 text-foreground'
            onSubmit={handleManualSubmit}
          >
            <fieldset className='flex flex-col gap-6 max-w-md w-full'>
              <Input label='Nombre del curso' name='title' required />
              <Input label='Abreviatura' name='abbreviature' required />
              <Input label='Semestre (ej: 2024-1)' name='semester' required />
              <Input label='Color' name='color' type='color' defaultValue={DEFAULT_COLOR} />
              <Input label='URL de imagen (opcional)' name='img' />
              <MainButton pendingText='Creando curso...'>Crear Curso Manualmente</MainButton>
            </fieldset>
          </form>
        </TabsContent>
      </div>
    </Tabs>
  )
}
