import React from 'react'
import { motion } from 'motion/react'

export const SkeletonFour = () => {
  const courses = [
    { name: 'Matemáticas', students: 32, color: 'bg-blue-500', bgColor: '#3b82f6' },
    { name: 'Historia', students: 28, color: 'bg-green-500', bgColor: '#10b981' },
    { name: 'Ciencias', students: 35, color: 'bg-purple-500', bgColor: '#8b5cf6' },
    { name: 'Literatura', students: 24, color: 'bg-orange-500', bgColor: '#f97316' }
  ]

  return (
    <div className="h-60 md:h-60 flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10 p-4">
      <div className="w-full max-w-sm">
        <motion.div 
          className="bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 mb-4 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.01,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.2 }
          }}
        >
          {/* Subtle background gradient */}
          <motion.div
            className="absolute inset-0 opacity-3"
            style={{
              background: 'radial-gradient(circle at 50% 50%, #3b82f610 0%, transparent 70%)'
            }}
            animate={{
              background: [
                'radial-gradient(circle at 50% 50%, #3b82f610 0%, transparent 70%)',
                'radial-gradient(circle at 50% 50%, #10b98110 0%, transparent 70%)',
                'radial-gradient(circle at 50% 50%, #3b82f610 0%, transparent 70%)'
              ]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div 
            className="flex items-center gap-3 mb-4 relative z-10"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold shadow-sm"
              animate={{ 
                boxShadow: [
                  '0 4px 12px rgba(16, 185, 129, 0.2)',
                  '0 4px 12px rgba(59, 130, 246, 0.25)',
                  '0 4px 12px rgba(16, 185, 129, 0.2)'
                ]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              O
            </motion.div>
            <div>
              <motion.div 
                className="font-semibold text-gray-900 dark:text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Colegio San Martín
              </motion.div>
              <motion.div 
                className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-1.5 h-1.5 bg-green-500 rounded-full"
                  animate={{ 
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <span>4 cursos activos</span>
              </motion.div>
            </div>
          </motion.div>
          
          <div className="space-y-2.5 relative z-10">
            {courses.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 + 0.3, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ 
                  x: 6,
                  scale: 1.01,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-neutral-700/50 cursor-pointer transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
              >
                <motion.div 
                  className={`w-3 h-3 ${course.color} rounded-full`}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: idx * 0.5
                  }}
                  whileHover={{
                    scale: 1.3,
                    transition: { duration: 0.2 }
                  }}
                />
                <div className="flex-1">
                  <motion.div 
                    className="text-sm font-medium text-gray-900 dark:text-white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.08 }}
                    viewport={{ once: true }}
                  >
                    {course.name}
                  </motion.div>
                  <motion.div 
                    className="text-xs text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.45 + idx * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <motion.span
                      animate={{ 
                        color: ['#6b7280', course.bgColor, '#6b7280']
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        delay: idx * 0.8
                      }}
                    >
                      {course.students} estudiantes
                    </motion.span>
                  </motion.div>
                </div>
                <motion.div 
                  className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center cursor-pointer"
                  whileHover={{ 
                    scale: 1.15,
                    backgroundColor: course.bgColor,
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.svg
                    className="w-2.5 h-2.5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ 
                      color: '#ffffff',
                      transition: { duration: 0.2 }
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Subtle floating elements */}
          {[...Array(3)].map((_, idx) => (
            <motion.div
              key={idx}
              className="absolute w-0.5 h-0.5 bg-blue-400 rounded-full opacity-40"
              style={{
                left: `${30 + Math.random() * 40}%`,
                top: `${30 + Math.random() * 40}%`,
              }}
              animate={{
                y: [-5, 5, -5],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: idx * 1,
                ease: 'easeInOut'
              }}
            />
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.span
              animate={{ 
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              ✨
            </motion.span>
            <span>Gestión centralizada de tu organización educativa</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
