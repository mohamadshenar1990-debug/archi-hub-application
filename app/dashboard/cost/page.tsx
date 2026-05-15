'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { GlassCard } from '@/components/glass-card'

const costBreakdown = [
  { category: 'Structure', amount: '$420,000', percentage: 18 },
  { category: 'Facade', amount: '$380,000', percentage: 16 },
  { category: 'Interior Finishes', amount: '$550,000', percentage: 24 },
  { category: 'MEP Systems', amount: '$280,000', percentage: 12 },
  { category: 'Landscape', amount: '$200,000', percentage: 9 },
  { category: 'Smart Home', amount: '$150,000', percentage: 6 },
  { category: 'FF&E', amount: '$250,000', percentage: 11 },
  { category: 'Contingency (10%)', amount: '$213,000', percentage: 9 },
]

export default function CostPage() {
  return (
    <div>
      <PageHeader 
        title="Cost Estimate" 
        description="AI-generated project cost analysis"
      />

      {/* Large Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="gold-card p-6"
        >
          <p className="text-xs font-mono text-[#55534f] uppercase tracking-wider mb-2">Total Estimated Cost</p>
          <p className="text-4xl font-extrabold gold-gradient-text">$2.34M</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
          className="glass-card p-6"
        >
          <p className="text-xs font-mono text-[#55534f] uppercase tracking-wider mb-2">Cost per Square Meter</p>
          <p className="text-4xl font-extrabold text-[#f0ede8]">$2,750</p>
        </motion.div>
      </div>

      {/* Cost Breakdown */}
      <GlassCard className="p-6" delay={0.2}>
        <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">Cost Breakdown</h3>
        <div className="space-y-3">
          {costBreakdown.map((item, idx) => (
            <div 
              key={item.category} 
              className="flex items-center gap-4 py-3 border-b border-white/[.04] last:border-0"
            >
              <span className="text-sm text-[#a09d98] w-40">{item.category}</span>
              <div className="flex-1 h-2 rounded-full bg-white/[.06] overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 + idx * 0.05 }}
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, rgba(201,168,76,.6) 0%, rgba(201,168,76,.3) 100%)',
                  }}
                />
              </div>
              <span className="text-sm font-mono text-[#55534f] w-12 text-right">{item.percentage}%</span>
              <span className="text-sm font-semibold text-[#f0ede8] w-28 text-right">{item.amount}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
