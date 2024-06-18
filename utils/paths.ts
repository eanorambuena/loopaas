export function evaluationPath({ abbreviature, semester, id } : {abbreviature: string, semester: string, id?: string}) {
    if (!id) return `/cursos/${abbreviature}/${semester}/evaluaciones`
    return `/cursos/${abbreviature}/${semester}/evaluaciones/${id}`
}

export function studentsPath({ abbreviature, semester } : {abbreviature: string, semester: string}) {
    return `/cursos/${abbreviature}/${semester}/estudiantes`
}
