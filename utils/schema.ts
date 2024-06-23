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

type QuestionCriterion = {
  label: string
  weight: number
}

type QuestionCriteria = Array<QuestionCriterion>

export type LinearQuestion = {
  type: 'linear'
  required: boolean
  criteria: QuestionCriteria
}

export type QuestionType = 'text' | 'radio' | 'checkbox' | 'select' | 'file'

export type Question = LinearQuestion | {
  type: QuestionType
  required: boolean
}

export type Questions = Record<string, Question>
