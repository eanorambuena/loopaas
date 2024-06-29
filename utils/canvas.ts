"use server"

import { redirect } from "next/navigation"
import { createClient } from "./supabase/server"

const CANVAS_URL = 'https://cursos.canvas.uc.cl'

export async function getAuthorizationHeader() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return redirect("/login")

  const { data: userInfo } = await supabase
    .from("userInfo")
    .select("*")
    .eq("userId", user.id)
    .single()

  if (!userInfo) return redirect("/login")

  const canvasToken = userInfo.canvasToken ?? process.env.NEXT_CANVAS_API_TOKEN

  return {
    headers: {
      Authorization: `Bearer ${canvasToken}`,
      mode: 'no-cors'
    }
  }
}

export async function fetchGroups(course: any) {
  const response = await fetch(`${CANVAS_URL}/api/v1/courses/${course.canvasId}/groups`, await getAuthorizationHeader())
  let groups = (await response.json())
    .map((group: any) => ({
      id: group.id,
      name: group.name,
    }))

  for (const group of groups) {
    const response = await fetch(`${CANVAS_URL}/api/v1/groups/${group.id}/users`, await getAuthorizationHeader())
    const studentsData = await response.json()

    let students: any[] = []
    for (const studentData of studentsData) {
      const response = await fetch(`${CANVAS_URL}/api/v1/users/${studentData.id}/profile`, await getAuthorizationHeader())
      const student = await response.json()
      const sortableNameData = student.sortable_name.split(", ")
      const firstName = sortableNameData[1]
      const lastName = sortableNameData[0]
      const email = `${student.login_id}@estudiante.uc.cl`
      students.push({
        id: student.id,
        avatarUrl: student.avatar_url,
        firstName,
        lastName,
        email,
      })
    }
    group.students = students
  }
  return groups.filter((group: any) => group.students.length > 0)
}

export async function fetchCourse(canvasId: string) {
  try {
    const response = await fetch(`${CANVAS_URL}/api/v1/courses/${canvasId}?include[]=course_image`, await getAuthorizationHeader())
    return await response.json()
  }
  catch (error) {
    console.log(error)
    return null
  }
}
