export type Evaluation = {
  title: string
  instructions: string
  deadLine: string
  sections: Array<string>
  questions: Record<string, any>
}

export type Course = {
  name: string
  abbreviature: string
  semester: string
  teacherInfoId: string
}

type QuestionCriterion = {
  label: string
  weight: number
}

type QuestionCriteria = Array<QuestionCriterion>

type LinearQuestion = {
  type: 'linear'
  required: boolean
  criteria: QuestionCriteria
}

export type Question = LinearQuestion | {
  type: 'text' | 'radio' | 'checkbox' | 'select' | 'file'
  required: boolean
}
