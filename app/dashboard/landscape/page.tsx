'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { GenerateBar } from '@/components/generate-bar'

const landscapeCards = [
  { emoji: '🌿', title: 'Planting', description: 'Native desert plants, date palms, and drought-tolerant species', progress: 85 },
  { emoji: '💧', title: 'Water Feature', description: 'Central courtyard reflecting pool with subtle fountain', progress: 70 },
  { emoji: '🛤️', title: 'Pathway', description: 'Natural stone pathways connecting outdoor zones', progress: 90 },
  { emoji: '🌴', title: 'Shade', description: 'Pergolas and mature trees for outdoor comfort', progress: 65 },
  { emoji: '🪑', title: 'Outdoor Seating', description: 'Majlis-style outdoor lounge and dining areas', progress: 75 },
  { emoji: '💡', title: 'Night Lighting', description: 'Subtle path lighting and accent illumination', progress: 60 },
]

export default function LandscapePage() {
  return (
    <div>
      <PageHeader 
        title="Landscape Design" 
        description="AI-generated landscape and outdoor design"
      />

      <GenerateBar 
        placeholder="Describe landscape style, features, or specific areas..."
        buttonText="Generate Landscape"
      />

      {/* Landscape Grid */}
      <div className="grid grid-cols-3 gap-4">
        {landscapeCards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: idx * 0.08 }}
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
              <span className="text-xs font-mono text-[#55534f]">{card.progress}%</span>
            </div>
            
            <h3 className="text-sm font-semibold text-[#f0ede8] mb-2">{card.title}</h3>
            <p className="text-xs text-[#a09d98] leading-relaxed mb-4">{card.description}</p>
            
            {/* Progress Bar */}
            <div className="h-1.5 rounded-full bg-white/[.06] overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${card.progress}%`,
                  background: 'linear-gradient(90deg, #c9a84c 0%, #e8c96a 100%)',
                  boxShadow: '0 0 8px rgba(201,168,76,.4)',
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
