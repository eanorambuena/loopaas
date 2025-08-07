import React from 'react'
import { cn } from '@/lib/utils'
import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { 
  SkeletonOne, 
  SkeletonTwo, 
  SkeletonThree, 
  SkeletonFour, 
  FeatureCard, 
  FeatureTitle, 
  FeatureDescription 
} from './features'

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
      <motion.div 
        className="px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.h4 
          className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Haz que gestionar tu clase sea{' '}
          <motion.span
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            súper fácil
          </motion.span>
        </motion.h4>

        <motion.p 
          className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Toma asistencia con un escaneo, ve estadísticas al instante y organiza 
          todo tu curso desde un solo lugar. Simple, rápido y sin complicaciones.
        </motion.p>
      </motion.div>

      <div className="relative">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} className={feature.className} index={index}>
              <FeatureTitle index={index}>{feature.title}</FeatureTitle>
              <FeatureDescription index={index}>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
