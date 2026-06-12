'use server'
import { APP_BASE_URL, APP_NAME } from '@/lib/constants'
import { redirect } from 'next/navigation'
import { evaluationPath } from './paths'
import { Course, Evaluation, Grade, LinearQuestion, QuestionCriterion, Response, Section, UserInfoSchema } from './schema'
import { db } from '@/drizzle/db'
import * as schema from '@/drizzle/schema'
import { courses, userInfo, students, evaluations, grades, responses, professors, organizations } from '@/drizzle/schema'
import { eq, and, ne, inArray, asc, desc, sql } from 'drizzle-orm'
import { sendEmail } from './resend'
import { Console } from './console'
import bcrypt from 'bcryptjs'

export async function getCourse(abbreviature: string, semester: string) {
  try {
    const course = await db.query.courses.findFirst({
      where: and(eq(courses.abbreviature, abbreviature), eq(courses.semester, semester)),
    })
    return course as Course | undefined
  } catch (error) {
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

export async function getCourseStudents({ course, rangeMin = 0, rangeMax }: CourseStudentsParams) {
  try {
    const allStudents = await db.query.students.findMany({
      where: eq(students.courseId, course.id),
      orderBy: [asc(students.group)],
    })

    const filtered = rangeMax ? allStudents.slice(rangeMin, rangeMax + 1) : allStudents

    const studentsWithUserInfo = await Promise.all(
      filtered.map(async (student) => {
        const ui = await db.query.userInfo.findFirst({
          where: eq(userInfo.id, student.userInfoId),
        })
        if (!ui) return null
        return { ...student, userInfo: ui as UserInfoSchema }
      })
    )

    return studentsWithUserInfo.filter(Boolean) as CourseStudentWithUserInfo[]
  } catch (error) {
    console.error('Error fetching students:', error)
    return []
  }
}

interface WelcomeEmailData {
  email: string
  password: string
  sendingEmail?: string
}

async function sendWelcomeEmail({ email, password, sendingEmail }: WelcomeEmailData) {
  if (!sendingEmail) sendingEmail = email
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
      <a href="${APP_BASE_URL}/login">Continuar</a>
      <br>
      <a href="${APP_BASE_URL}/cursos/SUS1000-1/2024-1/evaluaciones">Ir a Coevaluación Debate SUS1000-1</a>
    `
  })
}

export async function createCourseStudents(course: any, studentsData: any[], minGroup: number, maxGroup: number) {
  let filteredStudents = studentsData.filter((student: any) => student.group !== undefined)
  filteredStudents = filteredStudents.filter((student: any) => !isNaN(student.group))
  filteredStudents = filteredStudents.filter((student: any) => student.group >= minGroup && student.group <= maxGroup)
  const insertData: any[] = []
  const credentials: Record<string, string> = {}

  for (const student of filteredStudents) {
    const { email, firstName, lastName, group } = student
    const password = '1234'
    credentials[email] = password

    try {
      const hashedPassword = await bcrypt.hash(password, 10)

      const [newUser] = await db.insert(schema.users).values({
        email: email.toLowerCase(),
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      }).returning()

      if (!newUser) throw new Error('No user')

      const [newUserInfo] = await db.insert(userInfo).values({
        userId: newUser.id,
        email,
        firstName,
        lastName,
      }).returning()

      if (!newUserInfo) throw new Error('No user info')

      insertData.push({
        courseId: course.id,
        userInfoId: newUserInfo.id,
        group,
      })
    } catch (error) {
      console.error('Error creating student:', error)
    }
  }

  try {
    if (insertData.length > 0) {
      await db.insert(students).values(insertData)
    }
  } catch (error) {
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
  try {
    const evaluation = await db.query.evaluations.findFirst({
      where: eq(evaluations.id, params.id),
    })
    if (!evaluation) return redirect(evaluationPath(params))
    return evaluation as Evaluation
  } catch (error) {
    console.error('Error fetching evaluation:', error)
  }
}

export async function getGroupMates(params: PathParams, userInfoId: string, evaluation: Evaluation) {
  const REDIRECT_PATH = evaluationPath({ abbreviature: params.abbreviature, semester: params.semester })

  try {
    const student = await db.query.students.findFirst({
      where: and(
        eq(students.courseId, evaluation.courseId),
        eq(students.userInfoId, userInfoId)
      ),
    })
    if (!student) return redirect(REDIRECT_PATH)
    if (student.group == null) {
      Console.Warn('No group')
      return redirect(REDIRECT_PATH)
    }

    const groupStudents = await db.query.students.findMany({
      where: and(
        eq(students.courseId, evaluation.courseId),
        ne(students.userInfoId, userInfoId),
        eq(students.group, student.group)
      ),
    })
    if (!groupStudents) return redirect(evaluationPath(params))

    return groupStudents
  } catch (error) {
    console.error('Error fetching group mates:', error)
  }
}

export async function getEvaluationWithSections(params: PathParams, userId: string) {
  const evaluation = await getEvaluationByParams(params)
  const ui = await getUserInfo(userId)
  if (!evaluation) return redirect(evaluationPath(params))
  const groupStudents = await getGroupMates(params, ui?.id ?? '', evaluation)
  if (!groupStudents) return redirect(evaluationPath(params))

  try {
    const sections: Section[] = []
    for (const mate of groupStudents) {
      const mateInfo = await db.query.userInfo.findFirst({
        where: eq(userInfo.id, mate.userInfoId),
      })
      if (mateInfo) {
        sections.push({
          title: `Por favor, califica a ${mateInfo.firstName} ${mateInfo.lastName}`,
          mateId: mate.userInfoId,
        })
      }
    }
    return { ...evaluation, sections } as Evaluation
  } catch (error) {
    console.warn('Error fetching group mate info:', error)
    return { ...evaluation, sections: [] } as Evaluation
  }
}

export async function getCurrentUser() {
  const { auth } = await import('@/lib/auth')
  const session = await auth()
  if (!session?.user) return redirect('/login')
  return session.user
}

export async function getAuthUser() {
  const { auth: getAuth } = await import('@/lib/auth')
  const session = await getAuth()
  return session?.user ?? null
}

export async function getUserInfo(userId: string, autoRedirect = true) {
  try {
    const data = await db.query.userInfo.findFirst({
      where: eq(userInfo.userId, userId),
    })
    if (!data && autoRedirect) return redirect('/perfil')
    return data as UserInfoSchema | undefined
  } catch (error) {
    console.error('Error fetching user info:', error)
    if (autoRedirect) return redirect('/perfil')
  }
}

export async function getIsCourseProfessor(course: Course, userId: string) {
  const ui = await getUserInfo(userId)
  return course.teacherInfoId === ui?.id
}

export async function getGrades(evaluation: Evaluation, userInfoId: string) {
  try {
    const grade = await db.query.grades.findFirst({
      where: and(
        eq(grades.evaluationId, evaluation.id),
        eq(grades.userInfoId, userInfoId)
      ),
    })
    return grade as Grade | undefined
  } catch (error) {
    console.error('Error fetching grades:', error)
    return undefined
  }
}

interface ResponsesByUserInfoId {
  [userInfoId: string]: Response[]
}

export async function getResponsesByUserInfoId(evaluation: Evaluation) {
  try {
    const allResponses = await db.query.responses.findMany({
      where: eq(responses.evaluationId, evaluation.id),
      orderBy: [desc(responses.created_at)],
    })
    if (!allResponses) return
    const grouped: ResponsesByUserInfoId = {}
    for (const response of allResponses) {
      if (!grouped[response.userInfoId]) grouped[response.userInfoId] = [response as unknown as Response]
      else grouped[response.userInfoId].push(response as unknown as Response)
    }
    return grouped
  } catch (error) {
    console.error('Error fetching responses:', error)
  }
}

export async function getCourseById(courseId: string) {
  try {
    const course = await db.query.courses.findFirst({
      where: eq(courses.id, courseId),
    })
    return course as Course | null
  } catch (error) {
    console.error('Error fetching course:', error)
  }
}

export async function getUserInfoById(userInfoId: string) {
  try {
    const data = await db.query.userInfo.findFirst({
      where: eq(userInfo.id, userInfoId),
    })
    return data
  } catch (error) {
    console.error('Error fetching user info:', error)
  }
}

export async function isStudentInCourse(courseId: string, userInfoId: string) {
  try {
    const data = await db.query.students.findFirst({
      where: and(eq(students.courseId, courseId), eq(students.userInfoId, userInfoId)),
    })
    return !!data
  } catch (error) {
    console.error('Error fetching student:', error)
  }
}

export async function createAutoConfirmUsers(csv: string, courseAbbreviation?: string, courseSemester?: string) {
  Console.Success('Creating auto confirm users...')
  const rows = csv.split('\n')
  if (rows.length === 0) throw new Error('No rows in csv')

  const studentList = rows.map((row) => {
    const [lastName, firstName, password, email, group] = row.split(';')
    return { lastName, firstName, password, email, group }
  })

  let course: Course | null = null
  if (courseAbbreviation && courseSemester) {
    const courseResult = await db.query.courses.findFirst({
      where: and(
        eq(courses.abbreviature, courseAbbreviation),
        eq(courses.semester, courseSemester)
      ),
    })
    if (!courseResult) throw new Error(`Course not found: ${courseAbbreviation} ${courseSemester}`)
    course = courseResult as Course
  } else {
    const courseResult = await db.query.courses.findFirst()
    if (!courseResult) throw new Error('No courses found')
    course = courseResult as Course
  }

  if (!course) throw new Error('No course available')

  for (const student of studentList) {
    const { email, password, group } = student
    if (!email || !password || !group) {
      Console.Warn(`Skipping student due to missing data: ${JSON.stringify(student)}`)
      continue
    }
    Console.Success(`Creating user: ${email} with group ${group}`)

    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const [newUser] = await db.insert(schema.users).values({
        email: email.toLowerCase(),
        password: hashedPassword,
        name: `${student.firstName} ${student.lastName}`,
      }).returning()

      if (!newUser) throw new Error('No user')

      const [newUserInfo] = await db.insert(userInfo).values({
        userId: newUser.id,
        email,
        firstName: student.firstName,
        lastName: student.lastName,
      }).returning()

      if (!newUserInfo) throw new Error('No user info')

      await db.insert(students).values({
        courseId: course.id,
        userInfoId: newUserInfo.id,
        group,
      })
    } catch (error: any) {
      if (error.message?.includes('unique') || error.message?.includes('duplicate')) {
        Console.Warn(`User ${email} already exists, skipping...`)
        continue
      }
      Console.Error(`Error creating student ${email}: ${error}`)
    }
  }

  Console.Success('Auto confirm users successfully created')
}

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
  try {
    const profs = await db.query.professors.findMany({
      where: eq(professors.courseId, courseId),
    })

    const result: ProfessorWithUserInfo[] = await Promise.all(
      profs.map(async (prof) => {
        const ui = await db.query.userInfo.findFirst({
          where: eq(userInfo.id, prof.teacherInfoId),
        })
        return {
          id: prof.id,
          userInfo: {
            id: ui?.id || '',
            firstName: ui?.firstName || '',
            lastName: ui?.lastName || '',
            email: ui?.email || '',
          },
        }
      })
    )

    return result
  } catch (error) {
    console.error('Error al obtener profesores:', error)
    return []
  }
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
  try {
    const conditions = [eq(responses.evaluationId, evaluationId)]
    if (userInfoId) {
      conditions.push(eq(responses.userInfoId, userInfoId))
    }

    const allResponses = await db.query.responses.findMany({
      where: and(...conditions),
      orderBy: [desc(responses.created_at)],
    })

    const responsesWithUserInfo = await Promise.all(
      allResponses.map(async (r) => {
        const ui = await db.query.userInfo.findFirst({
          where: eq(userInfo.id, r.userInfoId),
        })
        const studentInfo = await db.query.students.findFirst({
          where: eq(students.userInfoId, r.userInfoId),
        })
        return {
          id: r.id,
          evaluationId: evaluationId,
          userInfoId: r.userInfoId,
          submittedAt: r.created_at?.toString() || '',
          data: r.data || '',
          created_at: r.created_at?.toString() || '',
          userInfo: {
            id: ui?.id || '',
            firstName: ui?.firstName || '',
            lastName: ui?.lastName || '',
            email: ui?.email || '',
          },
          group: studentInfo?.group || 'N/A',
        } as Response
      })
    )

    return responsesWithUserInfo
  } catch (error) {
    Console.Error(`Error fetching evaluation responses: ${error}`)
    throw new Error(`Error fetching evaluation responses: ${error}`)
  }
}
