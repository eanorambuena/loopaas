import React from 'react'
import { motion } from 'motion/react'

export const FeatureTitle = ({ 
  children, 
  index = 0 
}: { 
  children?: React.ReactNode
  index?: number 
}) => {
  return (
    <motion.p 
      className="max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.p>
  )
}
