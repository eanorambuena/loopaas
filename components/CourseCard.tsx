import { createClient } from '@/utils/supabase/server'
import Badge from '@/components/Badge'
import Card from '@/components/Card'
import { CardItem } from '@/components/ui/3d-card'

export default async function CourseCard({ course }: { course: any }) {
  const supabase = createClient()

  const { data: professorToBeDisplayed } = await supabase
    .from('userInfo')
    .select('*')
    .eq('id', course.teacherInfoId)

  if (!professorToBeDisplayed) return null

  const teacherName = `${professorToBeDisplayed[0].firstName} ${professorToBeDisplayed[0].lastName}`

  return (
    <Card
      path={`/cursos/${course.abbreviature}/${course.semester}`}
      className='w-fit max-w-4xl'
    >
      <CardItem>
        <img src={course.img} alt={course.title} className="w-full rounded-t-md" />
      </CardItem>
      <CardItem className="flex gap-2 p-4 flex-col rounded-b-md">
        <div className="flex gap-2 justify-between">
          <p className="text-sm font-normal text-gray-400 dark:text-gray-600">{course.abbreviature}</p>
          <Badge>{course.semester}</Badge>
        </div>
        <h3 className="text-xl font-bold">{course.title}</h3>
        <p className="text-sm font-normal">{teacherName}</p>
      </CardItem>
    </Card>
  )
}
