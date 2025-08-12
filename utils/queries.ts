import { APP_NAME } from '@/lib/constants'
'use server'

import { User } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { evaluationPath } from './paths'
import { Course, Evaluation, Grade, LinearQuestion, QuestionCriterion, Response, Section, UserInfoSchema } from './schema'
import { createClient } from './supabase/server'
import { sendEmail } from './resend'
import { Console } from './console'

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
    return course as Course
  }
  catch (error) {
    console.error('Error fetching course:', error)
  }
}

export interface CourseStudentWithUserInfo {
  id: string
  courseId: string
  userInfoId: string
  group: string
  userInfo: UserInfoSchema
  groupGrade?: string
  coGrade?: string
  finalGrade?: string
}

interface CourseStudentsParams {
  course: any
  rangeMin?: number
  rangeMax?: number
}

export async function getCourseStudents({course, rangeMin = 0, rangeMax} : CourseStudentsParams) {
  const supabase = createClient()
  try {
    let students, studentsError
    if (!rangeMax) {
      let { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('courseId', course.id)
        .order('group', { ascending: true })
      students = data
      studentsError = error
    }
    else {
      let { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('courseId', course.id)
        .order('group', { ascending: true })
        .range(rangeMin, rangeMax)
      students = data
      studentsError = error
    }
    
    if (studentsError) throw studentsError
    if (!students) return [] as CourseStudentWithUserInfo[]

    try {
      const studentsWithUserInfo = await Promise.all(
        students.map(async (student) => {
          const { data: userInfo, error: userInfoError } = await supabase
            .from('userInfo')
            .select('*')
            .eq('id', student.userInfoId)
            .single()
          if (userInfoError) throw userInfoError
          if (!userInfo) return null
          return {
            ...student,
            userInfo: userInfo as UserInfoSchema
          }
        })
      )
      
      return studentsWithUserInfo.filter(Boolean) as CourseStudentWithUserInfo[]
    }
    catch (error) {
      console.error('Error fetching students userInfo:', error)
      return []
    }
  }
  catch (error) {
    console.error('Error fetching students:', error)
    return []
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
  subject: `${APP_NAME} | Bienvenid@ a ${APP_NAME}`,
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
  const credentials: Record<string, string> = {}

  for (const student of filteredStudents) {
    const { email, firstName, lastName, group } = student

    const password = '1234'
    credentials[email] = password

    try {
      const { data: { user }, error: signUpError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      })
      if (signUpError) throw signUpError
      if (!user) throw new Error('No user')

      const { error: userInfoError } = await supabase
        .from('userInfo')
        .insert({
          userId: user.id,
          email,
          firstName,
          lastName
        })
        .single()
      if (userInfoError) throw userInfoError

      const userInfo = await getUserInfo(user.id, false)
      if (!userInfo) throw new Error('No user info')

      studentsData.push({
        courseId: course.id,
        userInfoId: (userInfo as UserInfoSchema).id,
        group
      })
    }
    catch (error) {
      console.error('Error creating student:', error)
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

  Console.Success({ credentials })
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
  const REDIRECT_PATH = evaluationPath({ abbreviature: params.abbreviature, semester: params.semester })
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
    if (student.group == null) { // !student.group does not work when group is 0
      Console.Warn('No group')
      return redirect(REDIRECT_PATH)
    }

    const { data: groupStudents, error: groupStudentsError } = await supabase
      .from('students')
      .select('*')
      .eq('courseId', evaluation.courseId)
      .neq('userInfoId', userInfoId)
      .eq('group', student.group)
    if (groupStudentsError) throw groupStudentsError
    if (!groupStudents) return redirect(evaluationPath(params))

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

  try {
    const sections: Section[] = []
    for (const mate of groupStudents) {
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
    return {
      ...evaluation,
      sections,
    } as Evaluation
  }
  catch (error) {
    console.warn('Error fetching group mate info:', error)
    return {
      ...evaluation,
      sections: [],
    } as Evaluation
  }
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
    console.log(`Fetching grades for evaluation ${evaluation.id} and user ${userInfoId}`)
    
    // First, let's check if there are any grades at all for this evaluation
    const { data: allGrades, error: allGradesError } = await supabase
      .from('grades')
      .select('*')
      .eq('evaluationId', evaluation.id)
    
    if (allGradesError) {
      console.error('Error fetching all grades:', allGradesError)
      throw allGradesError
    }
    
    console.log(`Total grades for evaluation ${evaluation.id}:`, allGrades?.length || 0)
    
    // Now get the specific grade for this user
    const { data: grades, error } = await supabase
      .from('grades')
      .select('*')
      .eq('evaluationId', evaluation.id)
      .eq('userInfoId', userInfoId)
    
    if (error) {
      console.error('Error fetching specific grade:', error)
      throw error
    }
    
    console.log(`Found grades for user ${userInfoId}:`, grades)
    return grades?.[0] as Grade | undefined
  }
  catch (error) {
    console.error('Error fetching grades:', error)
    return undefined
  }
}

interface ResponsesByUserInfoId {
  [userInfoId: string]: Response[]
}

export async function getResponsesByUserInfoId(evaluation: Evaluation) {
  const supabase = createClient()
  try {
    const { data: responses, error } = await supabase
      .from('responses')
      .select('*')
      .eq('evaluationId', evaluation.id)
      .order('created_at', { ascending: false })
    if (error) throw error
    if (!responses) return
    const grouped: ResponsesByUserInfoId = {}
    for (const response of responses) {
      if (!grouped[response.userInfoId]) grouped[response.userInfoId] = [response]
      else grouped[response.userInfoId].push(response)
    }
    return grouped
  }
  catch (error) {
    console.error('Error fetching responses:', error)
  }
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

export async function isStudentInCourse(courseId: string, userInfoId: string) {
  const supabase = createClient()
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('courseId', courseId)
      .eq('userInfoId', userInfoId)
      .single()
    if (error) throw error
    return !!data
  }
  catch (error) {
    console.error('Error fetching student:', error)
  }
}

export async function createAutoConfirmUsers(csv: string, courseAbbreviation?: string, courseSemester?: string) {
  Console.Success('Creating auto confirm users...')

  // asign each user to course with students table
  // create userInfo for each user
  // read a csv with the following columns: APELLIDOS;NOMBRES;PASSWORD;CORREO;GRUPO

  const supabase = createClient()

  const rows = csv.split('\n')
  if (rows.length === 0) throw new Error('No rows in csv')

  const students = rows.map((row) => {
    const [lastName, firstName, password, email, group] = row.split(';')
    return { lastName, firstName, password, email, group }
  })

  let course: Course | null = null
  if (courseAbbreviation && courseSemester) {
    // Buscar el curso específico
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('*')
      .eq('abbreviature', courseAbbreviation)
      .eq('semester', courseSemester)
    if (coursesError) throw coursesError
    if (!courses || courses.length === 0) throw new Error(`Course not found: ${courseAbbreviation} ${courseSemester}`)
    course = courses[0]
  } else {
    // Comportamiento original - usar el primer curso
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('*')
    if (coursesError) throw coursesError
    if (!courses || courses.length === 0) throw new Error('No courses found')
    course = courses[0]
  }

  if (!course) throw new Error('No course available')

  const promises = students.map(async (student) => {
    const { email, password, group } = student
    if (!email || !password || !group) {
      Console.Warn(`Skipping student due to missing data: ${JSON.stringify(student)}`)
      return
    }
    if (!course) {
      Console.Error('No course available for student creation')
      return
    }
    Console.Success(`Creating user: ${email} with group ${group}`)
    try {
      const { data: { user }, error: signUpError } = await supabase.auth.admin.createUser({
        email: email.toLowerCase(),
        password,
        email_confirm: true
      })
      if (signUpError) throw signUpError
      if (!user) throw new Error('No user')

      const { error: userInfoError } = await supabase
        .from('userInfo')
        .insert({
          userId: user.id,
          email,
          firstName: student.firstName,
          lastName: student.lastName
        })
        .single()
      if (userInfoError) throw userInfoError

      const userInfo = await getUserInfo(user.id, false)
      if (!userInfo) throw new Error('No user info')

      const { error: studentError } = await supabase
        .from('students')
        .insert({
          courseId: course.id,
          userInfoId: userInfo.id,
          group
        })
      if (studentError) throw studentError
    }
    catch (error: any) {
      if (error?.code == 'email_exists') {
        Console.Warn(`User ${email} already exists, skipping...`)
        return
      }
      Console.Error(`Error creating student ${email}: ${error}`)
    }
  })
  await Promise.all(promises)

  Console.Success('Auto confirm users successfully created')
}

/*
const usersToBeCreated = process.env.NEXT_USERS_TO_BE_CREATED
if (usersToBeCreated) {
  Console.Success('Creating auto confirm users from environment variable...')
  createAutoConfirmUsers(usersToBeCreated)
}
*/

/* Example of csv to create auto confirm users, if you want to test it, uncomment the following line.
 * It will be runned when an user access to the page in the browser.

createAutoConfirmUsers(`ApellidoA;NombreA;12345678;correoA@uc.cl;2
ApellidoB;NombreB;01234567;correoB@estudiante.uc.cl;2`)

*/

interface ProfessorWithUserInfo {
  id: string
  userInfo: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
}

export async function getProfessorsForCourse(courseId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('professors')
    .select('id, userInfo:teacherInfoId ( id, firstName, lastName, email )')
    .eq('courseId', courseId)

  if (error) {
    console.error('Error al obtener profesores:', error)
    return []
  }

  return data as unknown as ProfessorWithUserInfo[]
}

interface EvaluationResponseWithUserInfo {
  id: string
  submittedAt: string
  data: string
  created_at: string
  userInfo: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
}

interface GetEvaluationResponsesParams {
  evaluationId: string
  userInfoId?: string
}

export async function getEvaluationResponses({ evaluationId, userInfoId }: GetEvaluationResponsesParams): Promise<Response[]> {
  const supabase = createClient()
  const query = supabase
    .from('responses')
    .select(`
      id,
      data,
      created_at,
      userInfo:userInfoId (
        id,
        firstName,
        lastName,
        email
      )
    `)
    .eq('evaluationId', evaluationId)
    .order('created_at', { ascending: false })

  if (userInfoId) {
    query.eq('userInfoId', userInfoId)
  }

  const { data, error } = await query

  if (error) {
    Console.Error(`Error fetching evaluation responses: ${error.message}`)
    throw new Error(`Error fetching evaluation responses: ${error.message}`)
  }

  const evaluationResponseWithUserInfo = data as unknown as EvaluationResponseWithUserInfo[]
  
  // Obtener información de grupos para todos los userInfoIds
  const userInfoIds = evaluationResponseWithUserInfo.map(response => response.userInfo.id)
  const { data: studentsData, error: studentsError } = await supabase
    .from('students')
    .select('userInfoId, group')
    .in('userInfoId', userInfoIds)

  if (studentsError) {
    Console.Error(`Error fetching students data: ${studentsError.message}`)
  }

  // Crear un mapa de userInfoId a group
  const groupMap = new Map<string, string>()
  studentsData?.forEach(student => {
    groupMap.set(student.userInfoId, student.group)
  })

  const responses = [...evaluationResponseWithUserInfo.map(response => ({
    id: response.id,
    evaluationId: evaluationId,
    userInfoId: response.userInfo.id,
    submittedAt: response.submittedAt,
    userInfo: {
      firstName: response.userInfo.firstName,
      lastName: response.userInfo.lastName,
      email: response.userInfo.email
    },
    group: groupMap.get(response.userInfo.id) || 'N/A',
    data: response.data,
    created_at: response.created_at
  } as Response))]
  return responses as Response[]
}
