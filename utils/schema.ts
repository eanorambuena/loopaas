export type Evaluation = {
  id: string
  title: string
  instructions: string
  deadLine: string
  sections: Array<string>
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
}
