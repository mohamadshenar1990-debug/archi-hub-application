'use client'

import { motion } from 'framer-motion'

interface StatCardProps {
  label: string
  value: string
  unit?: string
  gold?: boolean
  delay?: number
}

export function StatCard({ label, value, unit, gold = false, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut', delay }}
      className={`p-4 rounded-2xl ${gold ? 'gold-card' : 'glass-card'}`}
    >
      <p className="text-xs font-mono text-[#55534f] uppercase tracking-wider mb-2">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-extrabold ${gold ? 'gold-gradient-text' : 'text-[#f0ede8]'}`}>
          {value}
        </span>
        {unit && <span className="text-sm font-mono text-[#a09d98]">{unit}</span>}
      </div>
    </motion.div>
  )
}
