import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export const FeatureDescription = ({ 
  children, 
  index = 0 
}: { 
  children?: React.ReactNode
  index?: number 
}) => {
  return (
    <motion.p
      className={cn(
        'text-sm md:text-base max-w-4xl text-left mx-auto',
        'text-neutral-500 text-center font-normal dark:text-neutral-300',
        'text-left max-w-sm mx-0 md:text-sm my-2'
      )}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.p>
  )
}
