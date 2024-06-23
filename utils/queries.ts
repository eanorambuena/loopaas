import { redirect } from "next/navigation"
import { createClient } from "./supabase/server"
import { Course, Evaluation, Grade, LinearQuestion, QuestionCriterion, Response, Section } from "./schema"
import { User } from "@supabase/supabase-js"
import { sendEmail } from "./resend"
import { evaluationPath } from "./paths"

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
  const supabase = createClient()
  const responsesByUserInfoId = await getResponsesByUserInfoId(evaluation)
  if (!responsesByUserInfoId) return

  const lastResponseByUserInfoId: Record<string, Response> = {}
  Object.entries(responsesByUserInfoId).forEach(async ([userInfoId, responses]) => {
    const response = responses[0] // consider only the last response
    lastResponseByUserInfoId[userInfoId] = response
  })

  const course = await getCourseById(evaluation.courseId)
  if (!course) return

  const firstQuestion = evaluation.questions[0] as LinearQuestion
  
  const newGradesByUserInfoId: Record<string, number> = {}
  const pathParams = { abbreviature: course.abbreviature, semester: course.semester, id: evaluation.id }
  students.forEach(async (student: any) => {
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

    const weightsSum = firstQuestion.criteria.reduce((acc, criterion) => acc + criterion.weight, 0)
    const numberOfGroupMates = groupMates.length
    const evaluationScore = Object.entries(studentCriteriaScores).reduce((acc, [criterionLabel, scores]) => {
      const criterion = firstQuestion.criteria.find((criterion: QuestionCriterion) => criterion.label === criterionLabel)
      const weight = criterion?.weight ?? 0
      if (scores.length < numberOfGroupMates) {
        const missingScores = Array(numberOfGroupMates - scores.length).fill(3)
        scores.push(...missingScores)
      }
      const averageScore = scores.reduce((acc, score) => acc + score, 0) / numberOfGroupMates
      return acc + (averageScore * weight) / weightsSum
    }, 0)
    const maxGrade = 1
    const nullScore = 3
    const minScore = 1
    const evaluationGrade = (evaluationScore - nullScore) * (maxGrade / (nullScore - minScore))
    newGradesByUserInfoId[student.userInfoId] = evaluationGrade
  })

  const newGrades: Grade[] = []
  Object.entries(newGradesByUserInfoId).forEach(async ([userInfoId, grade]) => {
    const grades = await getGrades(evaluation, userInfoId)
    const groupGrade = parseFloat(grades?.groupGrade || '0.0') ?? 4.0
    newGrades.push({
      evaluationId: evaluation.id,
      userInfoId,
      groupGrade: groupGrade.toFixed(2),
      evaluationGrade: grade.toFixed(2),
      finalGrade: (groupGrade + grade).toFixed(2),
    })
  })

  console.log({newGrades})
  const { data: error } = await supabase
    .from('grades')
    .insert(newGrades)
  console.log({error})  
  
  const professorUserInfo = await getUserInfoById(course.teacherInfoId)
  sendEmail({
    from: 'onboarding@resend.dev',
    to: professorUserInfo.email,
    subject: 'IDSApp | Envío de Notas',
    html: `<h1>Notas</h1>
    <p>${JSON.stringify(newGrades)}</p>`
  })
}
