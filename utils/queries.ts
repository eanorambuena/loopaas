import { User } from '@supabase/supabase-js'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { evaluationPath } from './paths'
import { Course, Evaluation, Grade, LinearQuestion, QuestionCriterion, Response, Section, UserInfoSchema } from './schema'
import { createClient } from './supabase/server'
import { sendEmail } from './resend'
import { userInfo } from 'os'

export async function getCourse(abbreviature: string, semester: string) {
  const supabase = createClient()
  try {
    const { data: course, error } = await supabase
      .from('courses')
      .select('*')
      .eq('abbreviature', abbreviature)
      .eq('semester', semester)
      .single()
    if (error) throw error
    return course as Course | null
  }
  catch (error) {
    console.error('Error fetching course:', error)
  }
}

interface CourseStudentWithUserInfo {
  id: string
  courseId: string
  userInfoId: string
  group: string
  userInfo: UserInfoSchema
  groupGrade?: string
  coGrade?: string
  finalGrade?: string
}

export async function getCourseStudents(course: any) {
  const supabase = createClient()
  try {
    let { data: students, error: studentsError } = await supabase
      .from('students')
      .select('*')
      .eq('courseId', course.id)
      .order('created_at', { ascending: false })
    if (studentsError) throw studentsError
    if (!students) return [] as CourseStudentWithUserInfo[]

    try {
      for (const student of students) {
        const { data: userInfo, error: userInfoError } = await supabase
          .from('userInfo')
          .select('*')
          .eq('id', student.userInfoId)
          .single()
        if (userInfoError) throw userInfoError
        if (!userInfo) continue
        student.userInfo = userInfo as UserInfoSchema
      }
      return students as CourseStudentWithUserInfo[]
    }
    catch (error) {
      console.error('Error fetching students userInfo:', error)
    }
  }
  catch (error) {
    console.error('Error fetching students:', error)
  }
}

interface WelcomeEmailData{
  email: string
  password: string
  sendingEmail?: string
}

async function sendWelcomeEmail({ email, password, sendingEmail } : WelcomeEmailData) {
  if (!sendingEmail) {
    sendingEmail = email
  }
  await sendEmail({
    from: 'onboarding@resend.dev',
    to: sendingEmail,
    subject: 'IDSApp | Bienvenid@ a IDSApp',
    html: /*html*/`
      <h1>Bienvenido a IDS App</h1>
      <p>Para continuar con el proceso de inscripción, por favor haz click en el siguiente enlace:</p>
      <p>Correo: ${email}</p>
      <strong>Contraseña: ${password}</strong>
      <br>
      <a href="https://idsapp.vercel.app/login">Continuar</a>
      <br>
      <a href="https://idsapp.vercel.app/cursos/SUS1000-1/2024-1/evaluaciones">Ir a Coevaluación Debate SUS1000-1</a>
    `
  })
}

export async function createCourseStudents(course: any, students: any, minGroup: number, maxGroup: number) {
  const supabase = createClient()
  let filteredStudents = students.filter((student: any) => student.group !== undefined)
  filteredStudents = filteredStudents.filter((student: any) => !isNaN(student.group))
  filteredStudents = filteredStudents.filter((student: any) => student.group >= minGroup && student.group <= maxGroup)
  const studentsData: any[] = []
  for (const student of filteredStudents) {
    const { ucUsername, firstName, lastName, group } = student
    const img = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`
    const password = crypto.getRandomValues(new Uint32Array(1))[0].toString(16)
    const origin = headers().get('origin')
    console.log({ ucUsername, firstName, lastName, group, password })
    
    for (const email of [`${ucUsername}@uc.cl`, `${ucUsername}@estudiante.uc.cl`]) {
      try {
        await sendWelcomeEmail({ email, password, sendingEmail: 'soporte.idsapp@gmail.com' })
        const { data: { user }, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${origin}/auth/callback`,
          }
        })
        if (signUpError) throw signUpError
        if (!user) throw new Error('No user')
        const { data: userInfo, error: userInfoError } = await supabase
          .from('userInfo')
          .insert({
            userId: user.id,
            email,
            firstName,
            lastName,
            img
          })
          .single()
        if (userInfoError) throw userInfoError
        if (!userInfo) throw new Error('No user info')
        studentsData.push({
          courseId: course.id,
          userInfoId: (userInfo as UserInfoSchema).id,
          group: group.name
        })
      }
      catch (error) {
        console.error('Error creating student:', error)
      }
    }
  }
  try {
    const { error } = await supabase
      .from('students')
      .insert(studentsData)
    if (error) throw error
  }
  catch (error) {
    console.error('Error inserting students:', error)
  }
}

interface PathParams {
  abbreviature: string
  semester: string
  id: string
}

export async function getEvaluationByParams(params: PathParams) {
  const supabase = createClient()
  try {
    const { data: evaluation, error } = await supabase
      .from('evaluations')
      .select('*')
      .eq('id', params.id)
      .single()
    if (error) throw error
    if (!evaluation) return redirect(evaluationPath(params))
    return evaluation as Evaluation
  }
  catch (error) {
    console.error('Error fetching evaluation:', error)
  }
}

export async function getGroupMates(params: PathParams, userInfoId: string, evaluation: Evaluation) {
  const REDIRECT_PATH = evaluationPath(params)
  const supabase = createClient()
  try {
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('*')
      .eq('courseId', evaluation.courseId)
      .eq('userInfoId', userInfoId)
      .single()
    if (studentError) throw studentError
    if (!student) return redirect(REDIRECT_PATH)

    const { data: groupStudents, error: groupStudentsError } = await supabase
      .from('students')
      .select('*')
      .eq('courseId', evaluation.courseId)
      .neq('userInfoId', userInfoId)
      .eq('group', student.group)
    if (groupStudentsError) throw groupStudentsError
    if (!groupStudents) return redirect(REDIRECT_PATH)

    return groupStudents
  }
  catch (error) {
    console.error('Error fetching group mates:', error)
  }
}

export async function getEvaluationWithSections(params: PathParams, user: User) {
  const supabase = createClient()
  const evaluation = await getEvaluationByParams(params)
  const userInfo = await getUserInfo(user.id)
  if (!evaluation) return redirect(evaluationPath(params))
  const groupStudents = await getGroupMates(params, userInfo?.id ?? '', evaluation)
  if (!groupStudents) return redirect(evaluationPath(params))

  const sections: Section[] = []
  for (const mate of groupStudents) {
    try {
      const { data: mateInfo, error } = await supabase
        .from('userInfo')
        .select('*')
        .eq('id', mate.userInfoId)
        .single()
      if (error) throw error
      sections.push({
        title: `Por favor, califica a ${mateInfo.firstName} ${mateInfo.lastName}`,
        mateId: mate.userInfoId,
      })
    }
    catch (error) {
      console.error('Error fetching group mate info:', error)
    }
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

export async function getUserInfo(userId: string, autoRedirect = true) {
  const supabase = createClient()
  try {
    const { data, error } = await supabase
      .from('userInfo')
      .select('*')
      .eq('userId', userId)
      .single()
    if (error) throw error
    if (!data && autoRedirect) return redirect('/perfil')
    return data as UserInfoSchema | undefined
  }
  catch (error) {
    console.error('Error fetching user info:', error)
    if (autoRedirect) return redirect('/perfil')
  }
}

export async function getIsCourseProfessor(course: Course, user: User) {
  const userInfo = await getUserInfo(user.id)
  return course.teacherInfoId === userInfo?.id
}

export async function getGrades(evaluation: Evaluation, userInfoId: string) {
  const supabase = createClient()
  try {
    const { data: grades, error } = await supabase
      .from('grades')
      .select('*')
      .eq('evaluationId', evaluation.id)
      .eq('userInfoId', userInfoId)
      .single()
    if (error) throw error
    return grades
  }
  catch (error) {
    console.error('Error fetching grades:', error)
  }
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
  try {
    const { data: course, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single()
    if (error) throw error
    return course as Course | null
  }
  catch (error) {
    console.error('Error fetching course:', error)
  }
}

export async function getUserInfoById(userInfoId: string) {
  const supabase = createClient()
  try {
    const { data, error } = await supabase
      .from('userInfo')
      .select('*')
      .eq('id', userInfoId)
      .single()
    if (error) throw error
    return data
  }
  catch (error) {
    console.error('Error fetching user info:', error)
  }
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
    if (!groupMates) continue

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
