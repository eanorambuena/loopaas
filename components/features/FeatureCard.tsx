import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export const FeatureCard = ({
  children,
  className,
  index = 0,
}: {
  children?: React.ReactNode
  className?: string
  index?: number
}) => {
  return (
    <motion.div 
      className={cn('p-4 sm:p-8 relative overflow-hidden', className)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.div>
  )
}
