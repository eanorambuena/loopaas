'use server'

import { Console } from '@/utils/console'
import { getSupabaseServerClient as createClient } from '@/utils/supabase/strictServerClient'

export async function saveStudents(formData: FormData) {
  const csv = formData.get('csv') as string
  if (!csv) throw new Error('CSV no proporcionado')

  const supabase = createClient()

  const rows = csv.split('\n').filter(Boolean)
  if (rows.length === 0) throw new Error('No hay filas en el CSV')

  const students = rows.map((row) => {
    const [lastName, firstName, password, email, group] = row.split(';')
    return { lastName, firstName, password, email, group }
  })

  const { data: courses, error: coursesError } = await supabase.from('courses').select('*')
  if (coursesError) throw coursesError
  const course = courses?.[0]
  if (!course) throw new Error('No se encontró ningún curso')

  const promises = students.map(async (student) => {
    const { email, password, group, firstName, lastName } = student
    if (!email || !password || !group) {
      Console.Warn(`Skipping student due to missing data: ${JSON.stringify(student)}`)
      return
    }

    try {
      Console.Success(`Creating user: ${email} with group ${group}`)

      const { data: { user }, error: signUpError } = await supabase.auth.admin.createUser({
        email: email.toLowerCase(),
        password,
        email_confirm: true
      })
      if (signUpError?.code === 'email_exists') {
        Console.Warn(`User ${email} already exists, skipping...`)
        return
      }
      if (signUpError) throw signUpError
      if (!user) throw new Error('No user returned by Supabase')

      const { data: userInfo, error: userInfoError } = await supabase
        .from('userInfo')
        .insert({
          userId: user.id,
          email,
          firstName,
          lastName
        })
        .select()
        .single()
      if (userInfoError) throw userInfoError

      const { error: studentError } = await supabase
        .from('students')
        .insert({
          courseId: course.id,
          userInfoId: userInfo.id,
          group
        })
      if (studentError) throw studentError
    } catch (error: any) {
      Console.Error(`Error creating student ${email}: ${error?.message || error}`)
    }
  })

  await Promise.all(promises)
  Console.Success('Auto confirm users successfully created')
}
