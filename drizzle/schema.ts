import { pgTable, text, timestamp, uuid, jsonb, doublePrecision, integer, primaryKey, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Auth tables for NextAuth adapter
export const users = pgTable('user', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  password: text('password'),
})

export const accounts = pgTable('account', {
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
}, (account) => ({
  compositePk: primaryKey({ columns: [account.provider, account.providerAccountId] }),
}))

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgTable('verificationToken', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
}, (verificationToken) => ({
  compositePk: primaryKey({ columns: [verificationToken.identifier, verificationToken.token] }),
}))

export const authenticators = pgTable('authenticator', {
  credentialID: text('credentialID').notNull().unique(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  providerAccountId: text('providerAccountId').notNull(),
  credentialPublicKey: text('credentialPublicKey').notNull(),
  counter: integer('counter').notNull(),
  credentialDeviceType: text('credentialDeviceType').notNull(),
  credentialBackedUp: boolean('credentialBackedUp').notNull(),
  transports: text('transports'),
}, (authenticator) => ({
  compositePK: primaryKey({ columns: [authenticator.userId, authenticator.credentialID] }),
}))

// App tables
export const userInfo = pgTable('userInfo', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('userId').notNull().unique().references(() => users.id),
  email: text('email').notNull(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  canvasToken: text('canvasToken'),
})

export const courses = pgTable('courses', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  abbreviature: text('abbreviature').notNull(),
  semester: text('semester').notNull(),
  teacherInfoId: text('teacherInfoId').notNull().references(() => userInfo.id),
  img: text('img'),
})

export const students = pgTable('students', {
  id: uuid('id').defaultRandom().primaryKey(),
  courseId: text('courseId').notNull().references(() => courses.id),
  userInfoId: text('userInfoId').notNull().references(() => userInfo.id),
  group: text('group'),
})

export const evaluations = pgTable('evaluations', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  courseId: text('courseId').notNull().references(() => courses.id),
  instructions: text('instructions'),
  deadLine: text('deadLine'),
  sections: jsonb('sections'),
  questions: jsonb('questions'),
})

export const responses = pgTable('responses', {
  id: uuid('id').defaultRandom().primaryKey(),
  evaluationId: text('evaluationId').notNull().references(() => evaluations.id),
  userInfoId: text('userInfoId').notNull().references(() => userInfo.id),
  data: text('data'),
  created_at: timestamp('created_at').defaultNow(),
  group: text('group'),
})

export const grades = pgTable('grades', {
  id: uuid('id').defaultRandom().primaryKey(),
  created_at: timestamp('created_at').defaultNow(),
  userInfoId: text('userInfoId').notNull().references(() => userInfo.id),
  evaluationId: text('evaluationId').notNull().references(() => evaluations.id),
  score: doublePrecision('score'),
})

export const professors = pgTable('professors', {
  id: uuid('id').defaultRandom().primaryKey(),
  courseId: text('courseId').notNull().references(() => courses.id),
  teacherInfoId: text('teacherInfoId').notNull().references(() => userInfo.id),
})

export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
})

export const attendance = pgTable('attendance', {
  id: uuid('id').defaultRandom().primaryKey(),
  courseId: text('courseId').notNull().references(() => courses.id),
  studentId: text('studentId').notNull().references(() => students.id),
  date: timestamp('date').defaultNow(),
  status: text('status'),
})

// Relations
export const userInfoRelations = relations(userInfo, ({ many }) => ({
  courses: many(courses),
  students: many(students),
  responses: many(responses),
  grades: many(grades),
  professors: many(professors),
}))

export const coursesRelations = relations(courses, ({ one, many }) => ({
  teacher: one(userInfo, { fields: [courses.teacherInfoId], references: [userInfo.id] }),
  students: many(students),
  evaluations: many(evaluations),
  professors: many(professors),
}))

export const studentsRelations = relations(students, ({ one, many }) => ({
  course: one(courses, { fields: [students.courseId], references: [courses.id] }),
  userInfo: one(userInfo, { fields: [students.userInfoId], references: [userInfo.id] }),
  attendance: many(attendance),
}))

export const evaluationsRelations = relations(evaluations, ({ one, many }) => ({
  course: one(courses, { fields: [evaluations.courseId], references: [courses.id] }),
  responses: many(responses),
  grades: many(grades),
}))

export const responsesRelations = relations(responses, ({ one }) => ({
  evaluation: one(evaluations, { fields: [responses.evaluationId], references: [evaluations.id] }),
  userInfo: one(userInfo, { fields: [responses.userInfoId], references: [userInfo.id] }),
}))

export const gradesRelations = relations(grades, ({ one }) => ({
  evaluation: one(evaluations, { fields: [grades.evaluationId], references: [evaluations.id] }),
  userInfo: one(userInfo, { fields: [grades.userInfoId], references: [userInfo.id] }),
}))

export const professorsRelations = relations(professors, ({ one }) => ({
  course: one(courses, { fields: [professors.courseId], references: [courses.id] }),
  userInfo: one(userInfo, { fields: [professors.teacherInfoId], references: [userInfo.id] }),
}))
