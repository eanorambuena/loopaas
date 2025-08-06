import { createClient } from '@/utils/supabase/server'
import Badge from '@/components/Badge'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import Link from 'next/link'

export default async function CourseCard({ course }: { course: any }) {
  const supabase = createClient()

  const { data: professorToBeDisplayed } = await supabase
    .from('userInfo')
    .select('*')
    .eq('id', course.teacherInfoId)

  if (!professorToBeDisplayed) return null

  const teacherName = `${professorToBeDisplayed[0].firstName} ${professorToBeDisplayed[0].lastName}`

  return (
    <Link href={`/cursos/${course.abbreviature}/${course.semester}`}>
      <CardContainer containerClassName="p-0 w-fit h-fit">
        <CardBody className='size-64 bg-gray-50 dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl border overflow-hidden flex flex-col p-0'>
          <CardItem className="w-full h-32 overflow-hidden">
            <img src={course.img} alt={course.title} className="w-full h-full object-cover rounded-t-xl" />
          </CardItem>
          <CardItem className="flex gap-1 px-2 py-2.5 flex-col flex-1" translateZ="20">
            <div className="flex gap-2 justify-between items-center">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate uppercase">{course.abbreviature}</p>
              <Badge>{course.semester}</Badge>
            </div>
            <h3 className="text-sm font-bold line-clamp-2 flex-1 text-gray-900 dark:text-white leading-tight">{course.title}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{teacherName}</p>
          </CardItem>
        </CardBody>
      </CardContainer>
    </Link>
  )
}
