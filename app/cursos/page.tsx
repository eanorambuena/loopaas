import { createClient } from '@/utils/supabase/server'
import CourseCard from '@/components/CourseCard'
import { AddCard } from '@/components/AddCard'
import { getCurrentUser, getUserInfo } from '@/utils/queries'
import Fallback from '@/components/Fallback'
import { isProfessorServer } from '@/utils/isProfessorServer'

export default async function CursosPage() {
  const user = await getCurrentUser()
  const userInfo = await getUserInfo(user.id)

  const supabase = createClient()

  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false })

  const isProfessor = await isProfessorServer({
    userInfoId: userInfo?.id!
  })

  const coursesCount = courses?.length || 0
  const uniqueSemesters = courses ? new Set(courses.map(course => course.semester)).size : 0

  return (
    <div className="animate-in flex flex-col gap-6 py-8 px-4 opacity-0 w-full max-w-8xl mx-auto">
      <div className="text-center space-y-3">
        <h1 className='text-3xl font-bold tracking-tight'>Cursos</h1>
        <p className="text-muted-foreground">
          {coursesCount > 0 ? `${coursesCount} curso${coursesCount !== 1 ? 's' : ''} disponible${coursesCount !== 1 ? 's' : ''}` : 'Explora y accede a tus cursos'}
        </p>
      </div>
      
      <main className="w-full flex-1 mt-6">
        {coursesCount === 0 && !isProfessor ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="text-5xl opacity-20">📚</div>
            <Fallback>No se encontraron cursos</Fallback>
            <p className="text-sm text-muted-foreground max-w-md text-center">
              Parece que no hay cursos disponibles en este momento. Contacta a tu administrador para más información.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-6 auto-rows-max">
            {isProfessor && (
              <div className="group">
                <AddCard 
                  title="Nuevo Curso" 
                  path="/cursos/nuevo" 
                  className="text-center size-64 transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-dashed border-primary/30 hover:border-primary/60 bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20" 
                />
              </div>
            )}
            {courses?.map((course, index) => (
              <div 
                key={course.id} 
                className="group animate-in fade-in duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        )}
        
        {/* Estadísticas adicionales */}
        {coursesCount > 0 && (
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-xl font-bold text-primary">{coursesCount}</div>
                <div className="text-xs text-muted-foreground">Curso{coursesCount !== 1 ? 's' : ''}</div>
              </div>
              <div className="space-y-2">
                <div className="text-xl font-bold text-primary">
                  {uniqueSemesters}
                </div>
                <div className="text-xs text-muted-foreground">Semestre{uniqueSemesters !== 1 ? 's' : ''}</div>
              </div>
              <div className="space-y-2">
                <div className="text-xl font-bold text-primary">
                  {isProfessor ? 'Profesor' : 'Estudiante'}
                </div>
                <div className="text-xs text-muted-foreground">Tu Rol</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
