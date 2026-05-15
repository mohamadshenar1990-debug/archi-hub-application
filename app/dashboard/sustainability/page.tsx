'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { StatCard } from '@/components/stat-card'

const sustainabilityCards = [
  { emoji: '☀️', title: 'Solar Ready', description: 'Roof optimized for 12kW solar array installation', progress: 100, color: '#22c55e' },
  { emoji: '🌡️', title: 'Thermal Mass', description: 'High mass construction for passive cooling', progress: 85, color: '#c9a84c' },
  { emoji: '💨', title: 'Natural Ventilation', description: 'Cross-ventilation through courtyard design', progress: 78, color: '#c9a84c' },
  { emoji: '💧', title: 'Water Recycling', description: 'Greywater treatment for landscape irrigation', progress: 65, color: '#c9a84c' },
  { emoji: '🪟', title: 'Glazing Performance', description: 'Triple-glazed, low-E glass throughout', progress: 90, color: '#22c55e' },
  { emoji: '🏠', title: 'Insulation', description: 'Above-code insulation with thermal bridging control', progress: 95, color: '#22c55e' },
]

export default function SustainabilityPage() {
  return (
    <div>
      <PageHeader 
        title="Sustainability" 
        description="Environmental performance analysis and recommendations"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Overall Score" value="74" unit="/100" gold delay={0} />
        <StatCard label="Daylight Factor" value="3.8" unit="%" delay={0.05} />
        <StatCard label="Energy Savings" value="38" unit="%" delay={0.1} />
        <StatCard label="Water Savings" value="52" unit="%" delay={0.15} />
      </div>

      {/* Sustainability Cards */}
      <div className="grid grid-cols-3 gap-4">
        {sustainabilityCards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: (idx + 4) * 0.05 }}
            className="glass-card p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: 'rgba(201,168,76,.08)',
                  border: '1px solid rgba(201,168,76,.15)',
                }}
              >
                {card.emoji}
              </div>
              <span 
                className="text-sm font-mono font-medium"
                style={{ color: card.color }}
              >
                {card.progress}%
              </span>
            </div>
            
            <h3 className="text-sm font-semibold text-[#f0ede8] mb-2">{card.title}</h3>
            <p className="text-xs text-[#a09d98] leading-relaxed mb-4">{card.description}</p>
            
            {/* Progress Bar */}
            <div className="h-1.5 rounded-full bg-white/[.06] overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${card.progress}%`,
                  background: card.color,
                  boxShadow: `0 0 8px ${card.color}50`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
