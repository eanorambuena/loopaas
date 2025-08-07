import React from 'react'
import { motion } from 'motion/react'

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
        <motion.div 
          className="grid grid-cols-2 gap-4 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {stats.slice(0, 4).map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                transition: { duration: 0.2 }
              }}
              className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className={`w-3 h-3 ${stat.color} rounded-full`}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.2
                  }}
                />
                <div className="flex-1">
                  <motion.div 
                    className="text-2xl font-bold text-gray-900 dark:text-white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ 
                        delay: 0.5 + idx * 0.1,
                        type: 'spring',
                        stiffness: 200,
                        damping: 10
                      }}
                      viewport={{ once: true }}
                    >
                      {stat.value}
                    </motion.span>
                  </motion.div>
                  <motion.div 
                    className="text-sm text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {stat.label}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enhanced Chart representation */}
        <motion.div 
          className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <motion.div 
            className="flex justify-between items-center mb-3"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Rendimiento Semanal</span>
            <motion.div 
              className="flex gap-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
            >
              {[1, 2, 3].map((dot, idx) => (
                <motion.div
                  key={idx}
                  className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    delay: idx * 0.2
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
          
          <div className="flex items-end gap-2 h-20">
            {[65, 45, 80, 60, 75, 90, 55].map((height, idx) => (
              <motion.div
                key={idx}
                initial={{ height: 0, opacity: 0 }}
                whileInView={{ height: `${height}%`, opacity: 1 }}
                transition={{ 
                  delay: idx * 0.15 + 0.7, 
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1,
                  filter: 'brightness(1.2)',
                  transition: { duration: 0.2 }
                }}
                className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t w-6 cursor-pointer relative group"
              >
                <motion.div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                >
                  {height}%
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="flex justify-between text-xs text-gray-400 mt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            viewport={{ once: true }}
          >
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + idx * 0.05 }}
                viewport={{ once: true }}
              >
                {day}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating metrics */}
        <motion.div
          className="mt-4 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium"
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(16, 185, 129, 0.3)',
                '0 0 30px rgba(59, 130, 246, 0.4)',
                '0 0 20px rgba(16, 185, 129, 0.3)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ⚡ Datos en tiempo real
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent h-full pointer-events-none" />
    </div>
  )
}
