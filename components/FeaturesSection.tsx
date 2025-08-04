import React from 'react'
import { cn } from '@/lib/utils'
import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { IconBrandYoutubeFilled } from '@tabler/icons-react'

export function FeaturesSection() {
  const features = [
    {
      title: 'Control de Asistencia Inteligente',
      description:
        'Toma asistencia en segundos escaneando códigos QR. Los estudiantes solo muestran su código y quedan registrados automáticamente. Descarga reportes en Excel con un clic.',
      skeleton: <SkeletonOne />,
      className:
        'col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800',
    },
    {
      title: 'Estadísticas en Tiempo Real',
      description:
        'Ve al instante quién está presente, ausente o llegó tarde. Gráficos sencillos que muestran patrones de asistencia y rendimiento de tus estudiantes.',
      skeleton: <SkeletonTwo />,
      className: 'border-b col-span-1 lg:col-span-2 dark:border-neutral-800',
    },
    {
      title: 'Evaluaciones Entre Compañeros',
      description:
        'Los estudiantes se evalúan entre sí de forma anónima. Descubre cómo trabajan en equipo y obtén una visión completa del desempeño grupal.',
      skeleton: <SkeletonThree />,
      className:
        'col-span-1 lg:col-span-3 lg:border-r  dark:border-neutral-800',
    },
    {
      title: 'Todo Organizado en un Lugar',
      description:
        'Gestiona múltiples cursos, estudiantes y profesores desde una sola plataforma. Interfaz simple que cualquiera puede usar sin complicaciones.',
      skeleton: <SkeletonFour />,
      className: 'col-span-1 lg:col-span-3 border-b lg:border-none',
    },
  ]
  return (
    <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Haz que gestionar tu clase sea súper fácil
        </h4>

        <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          Toma asistencia con un escaneo, ve estadísticas al instante y organiza 
          todo tu curso desde un solo lugar. Simple, rápido y sin complicaciones.
        </p>
      </div>

      <div className="relative ">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  )
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('p-4 sm:p-8 relative overflow-hidden', className)}>
      {children}
    </div>
  )
}

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className=" max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  )
}

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        'text-sm md:text-base  max-w-4xl text-left mx-auto',
        'text-neutral-500 text-center font-normal dark:text-neutral-300',
        'text-left max-w-sm mx-0 md:text-sm my-2'
      )}
    >
      {children}
    </p>
  )
}

export const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full p-5 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-4">
          {/* Plugin System Visual */}
          <div className="bg-emerald-50 dark:bg-emerald-950 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                P
              </div>
              <div className="flex-1">
                <div className="h-3 bg-emerald-200 dark:bg-emerald-700 rounded w-3/4"></div>
                <div className="h-2 bg-emerald-100 dark:bg-emerald-800 rounded w-1/2 mt-1"></div>
              </div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-12 bg-emerald-100 dark:bg-emerald-800 rounded"></div>
              <div className="h-12 bg-emerald-100 dark:bg-emerald-800 rounded"></div>
              <div className="h-12 bg-emerald-100 dark:bg-emerald-800 rounded"></div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <div className="flex-1">
                <div className="h-3 bg-blue-200 dark:bg-blue-700 rounded w-2/3"></div>
                <div className="h-2 bg-blue-100 dark:bg-blue-800 rounded w-1/3 mt-1"></div>
              </div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-blue-100 dark:bg-blue-800 rounded w-full"></div>
              <div className="h-3 bg-blue-100 dark:bg-blue-800 rounded w-4/5"></div>
              <div className="h-3 bg-blue-100 dark:bg-blue-800 rounded w-3/5"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  )
}

export const SkeletonThree = () => {
  return (
    <div className="relative flex gap-10 h-full group/image">
      <div className="w-full mx-auto bg-transparent dark:bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-4 relative p-4">
          {/* Peer Evaluation Interface */}
          <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                PE
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Evaluación Peer-to-Peer</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Trabajo en Equipo - Proyecto Final</div>
              </div>
            </div>
            
            {/* Likert Scale */}
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                ¿Qué tan bien colaboró tu compañero en el proyecto?
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <motion.div
                    key={num}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: num * 0.1 }}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all
                      ${num === 4 
                        ? 'bg-emerald-500 border-emerald-500 text-white' 
                        : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-emerald-400'
                      }`}
                  >
                    {num}
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Muy mal</span>
                <span>Excelente</span>
              </div>
            </div>
            
            {/* Progress */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progreso</span>
                <span className="text-emerald-600 dark:text-emerald-400">3/5 completadas</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div className="bg-emerald-500 h-2 rounded-full w-3/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const SkeletonTwo = () => {
  const stats = [
    { label: 'Estudiantes', value: '247', color: 'bg-blue-500' },
    { label: 'Promedio', value: '8.7', color: 'bg-green-500' },
    { label: 'Evaluaciones', value: '24', color: 'bg-purple-500' },
    { label: 'Cursos', value: '12', color: 'bg-orange-500' },
    { label: 'Activos', value: '89%', color: 'bg-emerald-500' }
  ]

  return (
    <div className="relative flex flex-col items-start p-8 gap-6 h-full overflow-hidden">
      {/* Stats Dashboard Visual */}
      <div className="w-full">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.slice(0, 4).map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 ${stat.color} rounded-full`}></div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Chart representation */}
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-end gap-2 h-20">
            {[65, 45, 80, 60, 75, 90, 55].map((height, idx) => (
              <motion.div
                key={idx}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t w-6"
              />
            ))}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Rendimiento semanal
          </div>
        </div>
      </div>

      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent h-full pointer-events-none" />
    </div>
  )
}

export const SkeletonFour = () => {
  const courses = [
    { name: 'Matemáticas', students: 32, color: 'bg-blue-500' },
    { name: 'Historia', students: 28, color: 'bg-green-500' },
    { name: 'Ciencias', students: 35, color: 'bg-purple-500' },
    { name: 'Literatura', students: 24, color: 'bg-orange-500' }
  ]

  return (
    <div className="h-60 md:h-60 flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10 p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
              O
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Colegio San Martín</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">4 cursos activos</div>
            </div>
          </div>
          
          <div className="space-y-2">
            {courses.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-neutral-700"
              >
                <div className={`w-3 h-3 ${course.color} rounded-full`}></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {course.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {course.students} estudiantes
                  </div>
                </div>
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            ✨ Gestión centralizada de tu organización educativa
          </div>
        </div>
      </div>
    </div>
  )
}

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let phi = 0

    if (!canvasRef.current) return

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi
        phi += 0.01
      },
    })

    return () => {
      globe.destroy()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: '100%', aspectRatio: 1 }}
      className={className}
    />
  )
}
