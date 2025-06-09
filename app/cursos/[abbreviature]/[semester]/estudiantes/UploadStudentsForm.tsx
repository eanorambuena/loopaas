import Input from '@/components/Input'
import SecondaryButton from '@/components/SecondaryButton'
import { saveStudents } from '@/utils/actions/saveStudents'

export default function UploadStudentsForm() {
  return (
    <form action={saveStudents} className='flex flex-col gap-4 border border-foreground/20 rounded-md p-4'>
      <legend className='text-lg font-semibold'>
        Importar estudiantes desde CSV con formato:<br />
        <span className='text-sm font-normal'>APELLIDOS;NOMBRES;PASSWORD;CORREO;GRUPO</span>
      </legend>
      <Input
        type='textarea'
        name='csv'
        label='CSV de estudiantes'
        placeholder='APELLIDOS;NOMBRES;PASSWORD;CORREO;GRUPO'
        defaultValue=''
        required
      />
      <SecondaryButton
        className='w-full'
        type='submit'
        pendingText='Guardando estudiantes...'
      >
        Importar estudiantes desde CSV
      </SecondaryButton>
    </form>
  )
}
