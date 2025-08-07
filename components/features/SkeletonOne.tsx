import React from 'react'
import { motion } from 'motion/react'

export const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full p-5 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-4">
          {/* QR Scanner Interface */}
          <motion.div 
            className="bg-emerald-50 dark:bg-emerald-950 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              transition: { duration: 0.2 }
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <motion.div 
                className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                📱
              </motion.div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Escaner QR Activo</div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400">Matemáticas - Sección A</div>
              </div>
              <motion.div 
                className="w-3 h-3 bg-emerald-500 rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </div>
            
            {/* QR Code Visual with enhanced animation */}
            <motion.div 
              className="bg-white dark:bg-gray-800 p-3 rounded-lg mb-3 flex justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-8 gap-1 w-16 h-16">
                {Array.from({ length: 64 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: Math.random() > 0.5 ? 1 : 0.3,
                      scale: 1
                    }}
                    transition={{ 
                      delay: i * 0.02, 
                      duration: 0.3,
                      repeat: Infinity,
                      repeatDelay: 3,
                      repeatType: 'reverse'
                    }}
                    className="bg-gray-900 dark:bg-white rounded-sm"
                    style={{ 
                      opacity: [0, 7, 14, 21, 28, 35, 42, 49, 56, 63].includes(i) ? 1 : Math.random() > 0.3 ? 1 : 0.3 
                    }}
                  />
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="text-center text-xs text-emerald-600 dark:text-emerald-400"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✓ Apunta la cámara al código QR del estudiante
            </motion.div>
          </motion.div>
          
          {/* Attendance List with staggered animations */}
          <motion.div 
            className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <motion.div 
                className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                📋
              </motion.div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">Lista de Asistencia</div>
                <motion.div 
                  className="text-xs text-blue-600 dark:text-blue-400"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  18/25 presentes
                </motion.div>
              </div>
              <motion.div 
                className="text-xs px-2 py-1 bg-blue-500 text-white rounded text-center cursor-pointer"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: '#3b82f6'
                }}
                whileTap={{ scale: 0.95 }}
              >
                📊 Excel
              </motion.div>
            </div>
            
            {/* Student List with enhanced animations */}
            <div className="space-y-2">
              {[
                { name: 'Ana García', status: 'present', time: '08:45' },
                { name: 'Carlos López', status: 'present', time: '08:47' },
                { name: 'María Silva', status: 'late', time: '09:05' },
                { name: 'Pedro Torres', status: 'absent', time: '' }
              ].map((student, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: idx * 0.1 + 0.5, duration: 0.4 }}
                  whileHover={{ 
                    x: 5,
                    backgroundColor: student.status === 'present' ? 'rgba(34, 197, 94, 0.1)' :
                                   student.status === 'late' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    borderRadius: '6px',
                    transition: { duration: 0.2 }
                  }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 text-xs p-1 -m-1 rounded"
                >
                  <motion.div 
                    className={`w-2 h-2 rounded-full ${
                      student.status === 'present' ? 'bg-green-500' :
                      student.status === 'late' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.3
                    }}
                  />
                  <span className="flex-1 text-gray-700 dark:text-gray-300">{student.name}</span>
                  <motion.span 
                    className="text-gray-500 text-xs"
                    animate={student.time ? { opacity: [0.7, 1, 0.7] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {student.time}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  )
}
