'use client'

import { InjusticeCase } from '@/components/statistics/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, TrendingDown, Users, AlertCircle } from 'lucide-react'

interface InjusticeDetectionProps {
  injusticeCases: InjusticeCase[]
  loading?: boolean
  error?: string | null
}

export default function InjusticeDetection({ injusticeCases, loading = false, error = null }: InjusticeDetectionProps) {
  if (loading) {
    return (
      <Card className="border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Users className="h-5 w-5" />
            <span className="text-lg font-semibold">Detección de Injusticias</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 dark:border-gray-400"></div>
            <span>Analizando coevaluaciones...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
            <AlertCircle className="h-5 w-5" />
            <span className="text-lg font-semibold">Detección de Injusticias</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-orange-600 dark:text-orange-400">
            ⚠️ No se pudieron cargar los casos de injusticia: {error}
          </p>
          <p className="text-orange-500 dark:text-orange-400 text-sm mt-2">
            Las demás estadísticas están disponibles normalmente.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (injusticeCases.length === 0) {
    return (
      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <Users className="h-5 w-5" />
            <span className="text-lg font-semibold">Detección de Injusticias</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-600 dark:text-green-400">
            ✅ No se detectaron casos de posible injusticia en la coevaluación.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
          <AlertTriangle className="h-5 w-5" />
          <span className="text-lg font-semibold">Posibles Casos de Injusticia</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-red-600 dark:text-red-400 text-sm">
          Se detectaron {injusticeCases.length} grupo{injusticeCases.length !== 1 ? 's' : ''} con promedio de coevaluación negativo, 
          lo que puede indicar posibles injusticias:
        </p>
        
        <div className="space-y-3">
          {injusticeCases.map((injusticeCase) => (
            <div
              key={injusticeCase.group}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-red-200 dark:border-red-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  Grupo {injusticeCase.group}
                </h4>
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">
                    Promedio: {injusticeCase.averageScore.toFixed(3)}
                  </span>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {injusticeCase.studentCount} estudiante{injusticeCase.studentCount !== 1 ? 's' : ''}
              </div>
              
              <div className="space-y-1">
                {injusticeCase.students.map((student) => (
                  <div
                    key={student.userInfoId}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-sm"
                  >
                    <span className="text-gray-700 dark:text-gray-300 truncate">
                      {student.name}
                    </span>
                    <span className={`font-medium ${
                      student.score < 0 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {student.score.toFixed(3)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
          <p className="text-yellow-700 dark:text-yellow-300 text-sm">
            <strong>Recomendación:</strong> Revisar estos grupos para identificar posibles conflictos, 
            sesgos o problemas de comunicación que puedan estar afectando la coevaluación.
          </p>
          <p className="text-yellow-600 dark:text-yellow-400 text-xs mt-2">
            <strong>Nota:</strong> Los puntajes van de -1 (muy negativo) a +1 (muy positivo). 
            Un promedio negativo indica que el grupo en general recibió evaluaciones desfavorables.
            Esto podría indicar que hay un problema de comunicación o incluso <em>free-riding</em>.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
