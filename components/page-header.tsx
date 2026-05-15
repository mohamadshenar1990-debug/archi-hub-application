'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="flex items-start justify-between mb-6"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-[#f0ede8] tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-[#a09d98]">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </motion.div>
  )
}
