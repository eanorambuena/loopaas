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
  let response = await fetch(`${CANVAS_URL}/api/v1/courses/${course.canvasId}/groups`, await getAuthorizationHeader())
  let groups = (await response.json())
    .map((group: any) => ({
      id: group.id,
      name: group.name,
      students: group.users,
    }))

  for (const group of groups) {
    let response = await fetch(`${CANVAS_URL}/api/v1/groups/${group.id}/users`, await getAuthorizationHeader())
    let students = (await response.json())
      .map((student: any) => ({
        id: student.id,
        name: student.name,
      }))
    group.students = students
  }
  
  return groups
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
