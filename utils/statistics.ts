// Utilidades para estadísticas de secciones y grupos

export function getSection(group: any): string {
  if (!group || group === 'Sin grupo') return 'Sin sección'
  const groupStr = String(group)
  return groupStr.length > 1 ? groupStr.slice(0, -1) : groupStr
}

export function addSectionToStudents(students: any[]): any[] {
  return students.map(s => ({
    ...s,
    section: getSection(s.group)
  }))
}

export function getUniqueSections(students: any[]): string[] {
  return Array.from(new Set(students.map(s => s.section).filter(Boolean))) as string[]
} 