import Card from '@/components/Card'
import Fallback from '@/components/Fallback'
import EvaluationIcon from '@/components/icons/EvaluationIcon'
import UsersIcon from '@/components/icons/UsersIcon'
import AcademicIcon from '@/components/icons/AcademicIcon'
import SettingsIcon from '@/components/icons/SettingsIcon'
import { isProfessorServer } from '@/utils/isProfessorServer'
import { evaluationPath, studentsPath } from '@/utils/paths'
import { getCourse, getCurrentUser, getUserInfo } from '@/utils/queries'

export default async function Page({ params }: { params: { abbreviature: string, semester: string } }) {
  const user = await getCurrentUser()
  const userInfo = await getUserInfo(user.id)

  const course = await getCourse(params.abbreviature, params.semester)

  if (!course) return <Fallback>No se encontró el curso</Fallback>

  if (!userInfo || !userInfo.id) return <Fallback>Error al cargar la información del usuario</Fallback>

  const isCourseProfessor = await isProfessorServer({
    userInfoId: userInfo.id!,
    courseId: course.id
  })

  const professorCards = [
    { icon: UsersIcon, title: 'Estudiantes', path: studentsPath(params), description: 'Gestiona estudiantes del curso' },
    { icon: AcademicIcon, title: 'Profesores', path: `/cursos/${params.abbreviature}/${params.semester}/profesores`, description: 'Administra profesores del curso' },
    { icon: SettingsIcon, title: 'Configuración', path: `/cursos/${params.abbreviature}/${params.semester}/configuracion`, description: 'Configuración del curso' }
  ]

  const allCards = [
    { icon: EvaluationIcon, title: 'Evaluaciones', path: evaluationPath(params), description: 'Accede a las evaluaciones del curso' },
    ...(isCourseProfessor ? professorCards : [])
  ]

  return (
    <div className='animate-in flex flex-col gap-8 py-8 px-6 opacity-0 w-full max-w-8xl mx-auto'>
      <div className="text-center space-y-4">
        <div className="space-y-3">
          <h1 className='text-4xl font-bold tracking-tight'>{course.title ?? params.abbreviature}</h1>
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {params.semester}
            </span>
            <span className="px-3 py-1 bg-secondary/50 rounded-full text-sm">
              {params.abbreviature}
            </span>
          </div>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {isCourseProfessor ? 
            `Panel de administración del curso. Tienes ${allCards.length} herramientas disponibles.` : 
            'Accede a los recursos y evaluaciones de tu curso.'
          }
        </p>
      </div>
      
      <main className='w-full mt-4'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-max">
          {allCards.map((card, index) => (
            <div 
              key={card.title}
              className="group animate-in fade-in duration-500 w-full"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Card 
                icon={card.icon} 
                title={card.title} 
                path={card.path}
                className="h-48 w-full transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-br from-card to-card/50 hover:from-primary/5 hover:to-primary/10 border hover:border-primary/30"
              >
                <p className="text-sm text-muted-foreground text-center mt-2">
                  {card.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
        
        {/* Información adicional del curso */}
        <div className="mt-10 pt-8 border-t border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="text-2xl font-bold text-primary">{allCards.length}</div>
              <div className="text-sm text-muted-foreground">Herramienta{allCards.length !== 1 ? 's' : ''} Disponible{allCards.length !== 1 ? 's' : ''}</div>
            </div>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-primary">
                {isCourseProfessor ? 'Profesor' : 'Estudiante'}
              </div>
              <div className="text-sm text-muted-foreground">Tu Rol en el Curso</div>
            </div>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-primary">
                {params.semester.split('-')[0]}
              </div>
              <div className="text-sm text-muted-foreground">Año Académico</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
