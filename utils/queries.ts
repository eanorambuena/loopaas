import { createClient } from "./supabase/server"

export async function getCourse(abbreviature: string, semester: string) {
  const supabase = createClient()

  return (await supabase
    .from("courses")
    .select("*")
    .eq("abbreviature", abbreviature)
    .eq("semester", semester))
    .data?.[0]
}

export async function getCourseStudents(course: any) {
  const supabase = createClient()

  let students = (await supabase
    .from("students")
    .select("*")
    .eq("courseId", course.id)
    .order("created_at", { ascending: false }))
    .data

  if (!students) return []

  for (const student of students) {
    const { data: userInfo } = await supabase
      .from("userInfo")
      .select("*")
      .eq("id", student.userInfoId)

    student.userInfo = userInfo?.[0]
  }

  return students
}
