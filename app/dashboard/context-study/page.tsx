'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { GlassCard } from '@/components/glass-card'

const urbanAnalysis = [
  { label: 'Neighborhood Type', value: 'Low-Density Residential' },
  { label: 'Average Plot Size', value: '600-1000 m²' },
  { label: 'Building Heights', value: '2-3 Floors' },
  { label: 'Setback Pattern', value: 'Front 6m, Side 3m' },
  { label: 'Street Width', value: '20m Primary' },
  { label: 'Green Coverage', value: '35% Average' },
]

const swotData = {
  strengths: ['Prime location in Al Nakheel district', 'Corner plot with dual access', 'Proximity to parks and amenities', 'Established residential neighborhood'],
  weaknesses: ['Eastern neighbor proximity', 'Limited rear setback', 'Sandy soil requires foundation work'],
  opportunities: ['Premium views to western green belt', 'Natural ventilation from NW winds', 'Integration with community mosque axis'],
  threats: ['Future high-rise development to south', 'Traffic increase from new road', 'Water table considerations'],
}

const recommendations = [
  'Position main living spaces to capture western views and sunset orientation',
  'Create internal courtyard for privacy screening from eastern neighbor',
  'Utilize corner position for dual entry: formal guest and family entrances',
  'Design deep overhangs and mashrabiya screens for south facade protection',
  'Incorporate underground parking to maximize garden space at grade',
]

export default function ContextStudyPage() {
  return (
    <div>
      <PageHeader 
        title="Context Study" 
        description="Urban context analysis and site-specific recommendations"
      />

      {/* Two Column: Urban Analysis + SWOT */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <GlassCard className="p-5">
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">Urban Analysis</h3>
          <div className="space-y-3">
            {urbanAnalysis.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/[.04] last:border-0">
                <span className="text-sm text-[#55534f]">{item.label}</span>
                <span className="text-sm text-[#f0ede8] font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5" delay={0.1}>
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">SWOT Analysis</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[#22c55e]/[.08] border border-[#22c55e]/[.15]">
              <span className="text-[10px] font-mono font-medium text-[#22c55e] uppercase tracking-wider">Strengths</span>
              <ul className="mt-2 space-y-1">
                {swotData.strengths.map((item, idx) => (
                  <li key={idx} className="text-[11px] text-[#a09d98]">• {item}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-[#ef4444]/[.08] border border-[#ef4444]/[.15]">
              <span className="text-[10px] font-mono font-medium text-[#ef4444] uppercase tracking-wider">Weaknesses</span>
              <ul className="mt-2 space-y-1">
                {swotData.weaknesses.map((item, idx) => (
                  <li key={idx} className="text-[11px] text-[#a09d98]">• {item}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-[#c9a84c]/[.08] border border-[#c9a84c]/[.15]">
              <span className="text-[10px] font-mono font-medium text-[#c9a84c] uppercase tracking-wider">Opportunities</span>
              <ul className="mt-2 space-y-1">
                {swotData.opportunities.map((item, idx) => (
                  <li key={idx} className="text-[11px] text-[#a09d98]">• {item}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-[#a855f7]/[.08] border border-[#a855f7]/[.15]">
              <span className="text-[10px] font-mono font-medium text-[#a855f7] uppercase tracking-wider">Threats</span>
              <ul className="mt-2 space-y-1">
                {swotData.threats.map((item, idx) => (
                  <li key={idx} className="text-[11px] text-[#a09d98]">• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut', delay: 0.2 }}
        className="glass-card p-5"
      >
        <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">AI Recommendations</h3>
        <div className="space-y-2">
          {recommendations.map((rec, idx) => (
            <div 
              key={idx} 
              className="flex items-start gap-4 p-3 rounded-lg bg-white/[.02]"
            >
              <span 
                className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0"
                style={{
                  background: 'rgba(201,168,76,.15)',
                  color: '#c9a84c',
                }}
              >
                {idx + 1}
              </span>
              <p className="text-sm text-[#a09d98] leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
