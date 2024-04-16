export const evaluationPath = ({ abbreviature, semester, id } : {abbreviature: string, semester: string, id: string}) =>
    `/cursos/${abbreviature}/${semester}/evaluaciones/${id}`
