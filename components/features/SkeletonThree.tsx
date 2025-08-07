import React from 'react'
import { motion } from 'motion/react'

export const SkeletonThree = () => {
  return (
    <div className="relative flex gap-10 h-full group/image">
      <div className="w-full mx-auto bg-transparent dark:bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-4 relative p-4">
          {/* Peer Evaluation Interface */}
          <motion.div 
            className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              transition: { duration: 0.2 }
            }}
          >
            <motion.div 
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                }}
              >
                PE
              </motion.div>
              <div>
                <motion.div 
                  className="font-semibold text-gray-900 dark:text-white"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Evaluación Peer-to-Peer
                </motion.div>
                <motion.div 
                  className="text-sm text-gray-500 dark:text-gray-400"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Trabajo en Equipo - Proyecto Final
                </motion.div>
              </div>
            </motion.div>
            
            {/* Question */}
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ¿Qué tan bien colaboró tu compañero en el proyecto?
              </motion.div>
              
              {/* Enhanced Likert Scale */}
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <motion.div
                    key={num}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: num * 0.1 + 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.15,
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all
                      ${num === 4 
                        ? 'bg-emerald-500 border-emerald-500 text-white' 
                        : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-emerald-400'
                      }`}
                  >
                    <motion.span
                      animate={num === 4 ? { 
                        scale: [1, 1.2, 1],
                        fontWeight: [400, 700, 400]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {num}
                    </motion.span>
                    
                    {/* Selection indicator */}
                    {num === 4 && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-emerald-300"
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0, 0.6, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="flex justify-between text-xs text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                viewport={{ once: true }}
              >
                <span>Muy mal</span>
                <span>Excelente</span>
              </motion.div>
            </motion.div>
            
            {/* Enhanced Progress */}
            <motion.div 
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progreso</span>
                <motion.span 
                  className="text-emerald-600 dark:text-emerald-400 font-medium"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  3/5 completadas
                </motion.span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '60%' }}
                  transition={{ delay: 1.4, duration: 1, ease: 'easeOut' }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 2
                    }}
                  />
                </motion.div>
              </div>
              
              {/* Mini celebration effect */}
              <motion.div 
                className="flex justify-center mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ✨ ¡Evaluación casi completa!
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Floating feedback bubbles */}
          <motion.div
            className="absolute top-2 right-2 space-y-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 3 }}
            viewport={{ once: true }}
          >
            {['😊', '👍', '⭐'].map((emoji, idx) => (
              <motion.div
                key={idx}
                className="w-6 h-6 bg-white dark:bg-neutral-700 rounded-full flex items-center justify-center text-xs shadow-sm"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.5 + 3
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
