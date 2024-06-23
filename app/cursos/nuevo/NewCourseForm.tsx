'use client'

import Input from '@/components/Input'
import MainButton from '@/components/MainButton'
import { useToast } from '@/components/ui/use-toast'
import { fetchCourse } from '@/utils/canvas'
import { createClient } from '@/utils/supabase/client'

const DEFAULT_COLOR = '#eeeeee'

interface Props {
  userInfoId: string
}

export default function NewCourseForm({ userInfoId }: Props) {
  const supabase = createClient()
  const { toast } = useToast()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const color = formData.get('color') as string
    const canvasId = formData.get('canvasId') as string
    const response = await fetchCourse(canvasId)
    if (!response) {
      return toast({
        title: 'Error',
        description: 'No se encontró el curso en Canvas',
        variant: 'destructive'
      })
    }
    const year = response.start_at?.split('-')[0] ?? new Date().getFullYear()
    const month = parseInt(response.start_at?.split('-')[1]) ?? new Date().getMonth()
    const semester = month < 7 ? 1 : 2
    const abbreviature = response.course_code.split('-')[0]
    const { error } = await supabase
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
      if (error) {
        if (error.code = '23505') {
          return toast({
            title: 'Error',
            description: 'El curso ya existe',
            variant: 'destructive'
          })
        }
        return toast({
          title: 'Error',
          description: `Hubo un error al crear el curso. Por favor intenta de nuevo o ponte en contacto con nosotros. Código de error: ${error.code}`,
          variant: 'destructive'
        })
      }
    return toast({
      title: 'Éxito',
      description: 'Curso creado correctamente',
      variant: 'success'
    })
  }

  return (
    <form className='animate-in flex-1 flex flex-col w-full justify-center items-center gap-2 text-foreground' onSubmit={handleSubmit}>
      <fieldset className='flex flex-col gap-6 max-w-md'>
        <Input label='ID Canvas' name='canvasId' required />
        <label htmlFor='color' className='text-md'>Color</label>
        <input type='color' id='color' name='color' defaultValue={DEFAULT_COLOR} className='rounded-md bg-inherit border mb-6' />
        <MainButton pendingText='Creando curso...'>
          Crear Curso
        </MainButton>
      </fieldset>
    </form>
  )
}
