import { redirect } from "next/navigation"
import { createClient } from "./supabase/server"
import { Course, Evaluation } from "./schema"
import { User } from "@supabase/supabase-js"

export async function getCourse(abbreviature: string, semester: string) {
  const supabase = createClient()
  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("abbreviature", abbreviature)
    .eq("semester", semester)
    .single()
  return course as Course | null
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

  console.log({s: groups.students})
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
          userInfoId: (data as any)[0].id,
          group: student.group
        }
      ])
  }
}

interface PathParams {
  abbreviature: string
  semester: string
  id: string
}

export async function getEvaluation(params: PathParams, user: any) {
  const REDIRECT_PATH = `/cursos/${params.abbreviature}/${params.semester}/evaluaciones`
  const supabase = createClient()

  const { data: _evaluation } = await supabase
    .from('evaluations')
    .select('*')
    .eq('id', params.id)
    .single()
  if (!_evaluation) return redirect(REDIRECT_PATH)

  const userInfo = await getUserInfo(user.id)
  if (!userInfo) return redirect(REDIRECT_PATH)

  const { data: student } = await supabase
    .from('students')
    .select('*')
    .eq('courseId', _evaluation.courseId)
    .eq('userInfoId', userInfo.id)
    .single()
  if (!student) return redirect(REDIRECT_PATH)

  const { data: groupStudents } = await supabase
    .from('students')
    .select('*')
    .eq('courseId', _evaluation.courseId)
    .neq('userInfoId', userInfo.id)
    .eq('group', student.group)
  if (!groupStudents) return redirect(REDIRECT_PATH)

  const sections: any = []
  for (const mate of groupStudents) {
    const { data: mateInfo } = await supabase
      .from('userInfo')
      .select('*')
      .eq('id', mate.userInfoId)
      .single()
    sections.push(`Por favor, califica a ${mateInfo.firstName} ${mateInfo.lastName}`)
  }
  return {
    ..._evaluation,
    sections,
  } as Evaluation
}

export async function getCurrentUser() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return redirect('/login')
  return user
}

export async function getUserInfo(userId: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from("userInfo")
    .select("*")
    .eq("userId", userId)
    .single()
  return data
}

export async function getIsCourseProfessor(course: Course, user: User) {
  const userInfo = await getUserInfo(user.id)
  return course.teacherInfoId === userInfo.id
}
