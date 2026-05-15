'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'

const analysisCards = [
  { emoji: '🛣️', title: 'Road Access', description: 'Primary access from Al Nakheel Street, 20m wide. Secondary service road available.', score: 'Excellent' },
  { emoji: '🌅', title: 'Sun Path', description: 'East-west orientation optimal for shading strategies. South facade requires protection.', score: 'Favorable' },
  { emoji: '💨', title: 'Wind Direction', description: 'Prevailing NW winds in summer. Natural ventilation potential with courtyards.', score: 'Optimizable' },
  { emoji: '🏔️', title: 'Topography', description: 'Level terrain with minimal grading required. Natural drainage to northwest.', score: 'Flat · Easy' },
  { emoji: '👁️', title: 'Views', description: 'Premium views to west towards green belt. Privacy concerns from east neighbors.', score: 'West Priority' },
  { emoji: '🔊', title: 'Noise', description: 'Quiet residential area. Minor traffic noise from main street mitigable.', score: 'Low Impact' },
  { emoji: '🏛️', title: 'Landmarks', description: 'Proximity to Al Nakheel Park and community mosque creates strong context.', score: 'Strong Context' },
  { emoji: '🌡️', title: 'Climate', description: 'Hot arid climate, 45°C summer peaks. Passive cooling strategies essential.', score: 'Hot Arid' },
  { emoji: '🌿', title: 'Vegetation', description: 'Sandy soil suitable for date palms and native desert landscaping.', score: 'Plantable' },
]

export default function SiteAnalysisPage() {
  return (
    <div>
      <PageHeader 
        title="Site Analysis" 
        description="Comprehensive analysis of site conditions and constraints"
      />

      <div className="grid grid-cols-3 gap-4">
        {analysisCards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: idx * 0.05 }}
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
                className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium"
                style={{
                  background: 'rgba(201,168,76,.12)',
                  border: '1px solid rgba(201,168,76,.2)',
                  color: '#c9a84c',
                }}
              >
                {card.score}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-[#f0ede8] mb-2">{card.title}</h3>
            <p className="text-xs text-[#a09d98] leading-relaxed">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
