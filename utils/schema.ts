export interface Section {
  title: string
  mateId: string
}

export interface Evaluation {
  id: string
  title: string
  courseId: string
  instructions: string
  deadLine: string
  sections: Array<Section>
  questions: Record<string, any>
}

export type Course = {
  id: string
  title: string
  abbreviature: string
  semester: string
  teacherInfoId: string
  img: string
}

export type QuestionCriterion = {
  label: string
  weight: number
}

export type LinearQuestion = {
  type: 'linear'
  required: boolean
  criteria: QuestionCriterion[]
}

export type QuestionType = 'text' | 'radio' | 'checkbox' | 'select' | 'file'

export type Question = LinearQuestion | {
  type: QuestionType
  required: boolean
}

export type Questions = Record<string, Question>

export interface Response {
  id: string
  evaluationId: string
  userInfoId: string
  data: string
  created_at: string
  group?: string
  userInfo?: UserInfoSchema | {
    firstName: string
    lastName: string
    email: string
  }
}

export interface Grade {
  userInfoId: string
  evaluationId: string
  groupGrade: string
  evaluationGrade: string
  finalGrade: string
}

export interface UserInfoSchema {
  id?: string
  userId: string
  firstName: string
  lastName: string
  email: string
  canvasToken?: string
}

export interface StudentWithGrades {
  id: string
  userInfo?: {
    firstName: string
    lastName: string
    email: string
  } | null
  userInfoId: string
  group?: string | null
  groupGrade?: string | number | null
  coGrade?: string | number | null
  finalGrade?: string | number | null
  peerEvaluationScore?: string | number | null
}
