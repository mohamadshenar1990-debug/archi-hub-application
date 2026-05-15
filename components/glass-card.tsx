'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GlassCardProps {
  children: ReactNode
  className?: string
  gold?: boolean
  delay?: number
}

export function GlassCard({ children, className = '', gold = false, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut', delay }}
      className={`${gold ? 'gold-card' : 'glass-card'} ${className}`}
    >
      {children}
    </motion.div>
  )
}
