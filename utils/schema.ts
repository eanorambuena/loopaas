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
