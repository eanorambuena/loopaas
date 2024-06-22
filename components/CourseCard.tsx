import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import Badge from "@/components/Badge"

export default async function CourseCard({ course }: { course: any }) {
  const supabase = createClient()

  const { data: teacher } = await supabase
    .from("userInfo")
    .select("*")
    .eq("id", course.teacherInfoId)

  if (!teacher) return null

  const teacherName = `${teacher[0].firstName} ${teacher[0].lastName}`

  return (
    <Link
      className="w-full max-w-4xl rounded-md bg-[#eeeeee] dark:text-gray-900 hover:scale-105 transition-transform duration-300 hover:shadow-[0_20px_30px_rgba(8,_184,_112,_0.7)]"
      href={`/cursos/${course.abbreviature}/${course.semester}`}
      style={{ backgroundColor: course.color }}
    >
      <img src={course.img} alt={course.title} className="w-full rounded-t-md" />
      <div className="flex gap-2 p-4 flex-col">
        <div className="flex gap-2 justify-between">
          <p className="text-sm font-normal text-gray-400 dark:text-gray-600">{course.abbreviature}</p>
          <Badge>{course.semester}</Badge>
        </div>
        <h3 className="text-xl font-bold">{course.title}</h3>
        <p className="text-sm font-normal">{teacherName}</p>
      </div>
    </Link>
  )
}
