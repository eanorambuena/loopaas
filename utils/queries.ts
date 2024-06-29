import { User } from "@supabase/supabase-js"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { evaluationPath } from "./paths"
import { Course, Evaluation, Grade, LinearQuestion, QuestionCriterion, Response, Section } from "./schema"
import { createClient } from "./supabase/server"

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
  let students: any[] = []
  for (const group of groups) {
    for (const student of group.students) {
      const { email, firstName, lastName, img } = student
      const password = "a"
      const origin = headers().get("origin")
      await supabase.auth.signUp({
        email: 'eanorambuena@uc.cl',
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
            firstName,
            lastName,
            img
          }
        ])
      if (!data) continue
      students.push({
        courseId: course.id,
        userInfoId: (data as any)[0].id,
        group: group.name
      })
    }
  }
  await supabase
    .from("students")
    .insert(students)

  return redirect(`/cursos/${course.abbreviature}/${course.semester}/estudiantes`)
}

interface PathParams {
  abbreviature: string
  semester: string
  id: string
}

export async function getEvaluationByParams(params: PathParams) {
  const supabase = createClient()
  const { data: evaluation } = await supabase
    .from('evaluations')
    .select('*')
    .eq('id', params.id)
    .single()
  if (!evaluation) return redirect(evaluationPath(params))
  return evaluation as Evaluation
}

export async function getGroupMates(params: PathParams, userInfoId: string, evaluation: Evaluation) {
  const REDIRECT_PATH = evaluationPath(params)
  const supabase = createClient()

  const { data: student } = await supabase
    .from('students')
    .select('*')
    .eq('courseId', evaluation.courseId)
    .eq('userInfoId', userInfoId)
    .single()
  if (!student) return redirect(REDIRECT_PATH)

  const { data: groupStudents } = await supabase
    .from('students')
    .select('*')
    .eq('courseId', evaluation.courseId)
    .neq('userInfoId', userInfoId)
    .eq('group', student.group)
  if (!groupStudents) return redirect(REDIRECT_PATH)

  return groupStudents
}

export async function getEvaluationWithSections(params: PathParams, user: User) {
  const supabase = createClient()
  const evaluation = await getEvaluationByParams(params)
  const userInfo = await getUserInfo(user.id)
  if (!userInfo) return redirect(evaluationPath(params))
  const groupStudents = await getGroupMates(params, userInfo.id, evaluation)

  const sections: Section[] = []
  for (const mate of groupStudents) {
    const { data: mateInfo } = await supabase
      .from('userInfo')
      .select('*')
      .eq('id', mate.userInfoId)
      .single()
    sections.push({
      title: `Por favor, califica a ${mateInfo.firstName} ${mateInfo.lastName}`,
      mateId: mate.userInfoId,
    })
  }
  return {
    ...evaluation,
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

export async function getGrades(evaluation: Evaluation, userInfoId: string) {
  const supabase = createClient()
  const { data: grades } = await supabase
    .from('grades')
    .select('*')
    .eq('evaluationId', evaluation.id)
    .eq('userInfoId', userInfoId)
    .single()
  return grades
}

interface ResponsesByUserInfoId {
  [userInfoId: string]: Response[]
}

export async function getResponsesByUserInfoId(evaluation: Evaluation) {
  const supabase = createClient()
  const { data: responses } = await supabase
    .from('responses')
    .select('*')
    .eq('evaluationId', evaluation.id)
    .order('created_at', { ascending: false })
  if (!responses) return
  const grouped: ResponsesByUserInfoId = {}
  for (const response of responses) {
    if (!grouped[response.userInfoId]) grouped[response.userInfoId] = [response]
    else grouped[response.userInfoId].push(response)
  }
  return grouped
}

export async function getCourseById(courseId: string) {
  const supabase = createClient()
  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .single()
  return course as Course | null
}

export async function getUserInfoById(userInfoId: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from("userInfo")
    .select("*")
    .eq("id", userInfoId)
    .single()
  return data
}

export async function saveGrades(evaluation: Evaluation, students: any) {
  const responsesByUserInfoId = await getResponsesByUserInfoId(evaluation)
  if (!responsesByUserInfoId) return

  const lastResponseByUserInfoId: Record<string, Response> = {}
  Object.entries(responsesByUserInfoId).forEach(async ([userInfoId, responses]) => {
    const response = responses[0] // consider only the last response
    lastResponseByUserInfoId[userInfoId] = response
  })

  const course = await getCourseById(evaluation.courseId)
  if (!course) return

  const firstQuestion = Object.values(evaluation.questions)[0] as LinearQuestion
  const newGradesByUserInfoId: Record<string, number> = {}
  const pathParams = { abbreviature: course.abbreviature, semester: course.semester, id: evaluation.id }

  for (const student of students) {
    const groupMates = await getGroupMates(pathParams, student.userInfoId, evaluation)

    const studentCriteriaScores: Record<string, number[]> = {}
    groupMates.forEach((mate: any) => {
      const mateResponse = lastResponseByUserInfoId[mate.userInfoId]
      if (!mateResponse) return

      const mateData = JSON.parse(mateResponse.data) as string[]
      const parsedMateData = mateData.map((value) => value.split('--'))

      const studentScores = parsedMateData.filter(value => value[0] === student.userInfoId)
      studentScores.forEach(([_, criterionLabel, score]) => {
        if (!studentCriteriaScores[criterionLabel]) studentCriteriaScores[criterionLabel] = []
        studentCriteriaScores[criterionLabel].push(parseInt(score))
      })
    })

    const maxGrade = 1
    const nullScore = 3
    const minScore = 1

    const weightsSum = firstQuestion.criteria.reduce((acc, criterion) => acc + criterion.weight, 0)
    const numberOfGroupMates = groupMates.length
    const evaluationScore = Object.entries(studentCriteriaScores).reduce((acc, [criterionLabel, scores]) => {
      const criterion = firstQuestion.criteria.find((criterion: QuestionCriterion) => criterion.label === criterionLabel)
      const weight = criterion?.weight ?? 0
      if (scores.length < numberOfGroupMates) {
        const missingScores = Array(numberOfGroupMates - scores.length).fill(nullScore)
        scores.push(...missingScores)
      }
      const averageScore = scores.reduce((acc, score) => acc + score, 0) / numberOfGroupMates
      return acc + (averageScore * weight) / weightsSum
    }, 0)
    
    const evaluationGrade = (evaluationScore - nullScore) * (maxGrade / (nullScore - minScore))
    newGradesByUserInfoId[student.userInfoId] = evaluationGrade
  }

  const newGrades: Grade[] = []
  for (const [userInfoId, grade] of Object.entries(newGradesByUserInfoId)) {
    const grades = await getGrades(evaluation, userInfoId)
    const groupGrade = parseFloat(grades?.groupGrade ?? '4.0')
    const newGrade = {
      evaluationId: evaluation.id,
      userInfoId,
      groupGrade: groupGrade.toFixed(2),
      evaluationGrade: grade.toFixed(2),
      finalGrade: (groupGrade + grade).toFixed(2),
    }
    newGrades.push(newGrade)
  }

  const supabase = createClient()
  for (const grade of newGrades) {
    const { data: error } = await supabase
      .from('grades')
      .upsert(grade)
    if (error) redirect(`${evaluationPath(pathParams)}/resultados?message=No se pudieron guardar las notas`)
  }
}
