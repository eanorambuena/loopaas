interface IsProffessorParams {
  userInfoId: string
  courseId: string
}

export async function isProfessor({ userInfoId, courseId }: IsProffessorParams): Promise<boolean> {
  try {
    const res = await fetch('/api/is-professor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInfoId, courseId })
    })

    if (!res.ok) {
      console.error('Error al verificar profesor:', await res.text())
      return false
    }

    const { isProfessor } = await res.json()
    return isProfessor
  } catch (err) {
    console.error('Error al llamar a isProfessor():', err)
    return false
  }
}
