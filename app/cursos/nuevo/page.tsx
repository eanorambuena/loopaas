import { isProfessorServer } from '@/utils/isProfessorServer'
import { getCurrentUser, getUserInfo } from '@/utils/queries'
import { UserInfoSchema } from '@/utils/schema'
import { redirect } from 'next/navigation'
import NewCourseForm from './NewCourseForm'

export default async function Page() {
  const user = await getCurrentUser()
  const userInfo = await getUserInfo(user.id) as UserInfoSchema

  const isCourseProfessor = await isProfessorServer({
    userInfoId: userInfo.id!
  })
  
  if (!isCourseProfessor) return redirect('/cursos')

  return (
    <div className="animate-in flex-1 flex flex-col justify-center items-center gap-6 p-6 opacity-0 px-3 w-full md:max-w-md">
      <h1 className='text-3xl font-bold'>Nuevo Curso</h1>
      <NewCourseForm userInfoId={userInfo.id} />
    </div>
  )
}
