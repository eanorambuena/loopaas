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

export async function createCourseStudents(course: any, groups: any) {
  const supabase = createClient()

  console.log(groups.students)
  return
  for (const user in groups.students)
  {
    const student = user as any
    const { email } = student
    const password = "a"
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })
    const { data } = await supabase
      .from("userInfo")
      .insert([
        {
          email,
          firstName: "a",
          lastName: "b",
          img: "c"
        }
      ])
    if (!data) continue
    supabase
      .from("students")
      .insert([
        {
          courseId: course.id,
          userInfoId: (data[0] as any).id,
          group: student.group
        }
      ])
  }
}
