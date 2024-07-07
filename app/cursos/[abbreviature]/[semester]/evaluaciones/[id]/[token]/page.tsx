import SecondaryLink from '@/components/SecondaryLink'
import { getCourse, getCurrentUser, getEvaluationByParams, getEvaluationWithSections, getIsCourseProfessor, getUserInfo } from '@/utils/queries'
import EvaluationForm from '../EvaluationForm'
import Fallback from '@/components/Fallback'
import { Section, UserInfoSchema } from '@/utils/schema'
import { createClient } from '@/utils/supabase/server'
import { sign, verify } from '@/utils/jwt'

interface Params {
  abbreviature: string
  semester: string
  id: string
  token: string
}

interface Props {
  params: Params
}

export default async function Page({ params }: Props) {
  const course = await getCourse(params.abbreviature, params.semester)
  if (!course) return <Fallback>No se encontró el curso</Fallback>

  console.log({ token: sign({ ucUsername: 'eanorambuena' }) })
  const payload = verify(params.token)
  if (!payload) return <Fallback>Token inválido</Fallback>

  const userInfoId = '0'
  const supabase = createClient()
  let evaluation = await getEvaluationByParams(params)
  if (!evaluation) return <Fallback>No se encontró la evaluación</Fallback>
  const sections: Section[] = []
  evaluation.sections = sections

  return (
    <div className='animate-in flex-1 flex flex-col gap-6 p-6 opacity-0 max-w-4xl px-3'>
      <h1 className='text-3xl font-bold'>{evaluation.title}</h1>
      <h2 className='text-xl'>Respondiendo como <strong>@{payload.ucUsername}</strong></h2>
      <EvaluationForm evaluation={evaluation} userInfoId={userInfoId} />
    </div>
  )
}
