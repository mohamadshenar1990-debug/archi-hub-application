'use client'

import { motion } from 'framer-motion'
import { Bookmark } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { GenerateBar } from '@/components/generate-bar'
import { useToast } from '@/components/toast-provider'

const vizCards = [
  { emoji: '🏠', title: 'Street View — Hero', description: 'Primary marketing render from main approach', featured: true },
  { emoji: '🦅', title: 'Aerial View', description: 'Bird\'s eye perspective showing roof design', featured: false },
  { emoji: '🌅', title: 'Courtyard', description: 'Central courtyard at golden hour', featured: false },
  { emoji: '🛋️', title: 'Majlis Interior', description: 'Traditional reception space', featured: false },
  { emoji: '🛏️', title: 'Master Bedroom', description: 'Serene sleeping quarters with garden views', featured: false },
  { emoji: '🌙', title: 'Garden Night', description: 'Landscape lighting and evening ambiance', featured: false },
]

export default function VisualizationPage() {
  const { showToast } = useToast()

  return (
    <div>
      <PageHeader 
        title="Visualization Studio" 
        description="AI-generated photorealistic renders"
      />

      <GenerateBar 
        placeholder="Describe the scene, lighting, mood, or camera angle..."
        buttonText="Generate Render"
      />

      {/* Visualization Grid - First item spans 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        {vizCards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: idx * 0.08 }}
            className={`glass-card overflow-hidden group ${card.featured ? 'col-span-2' : ''}`}
          >
            {/* Image Placeholder */}
            <div 
              className={`flex items-center justify-center relative ${card.featured ? 'aspect-[21/9]' : 'aspect-[16/10]'}`}
              style={{
                background: 'linear-gradient(135deg, rgba(12,12,18,.9) 0%, rgba(18,18,24,.9) 100%)',
              }}
            >
              <span className={card.featured ? 'text-8xl' : 'text-6xl'}>{card.emoji}</span>
              
              {/* AI Render Badge */}
              <span 
                className="absolute top-3 left-3 px-2 py-1 rounded text-[9px] font-mono font-medium"
                style={{
                  background: 'rgba(201,168,76,.2)',
                  border: '1px solid rgba(201,168,76,.3)',
                  color: '#c9a84c',
                }}
              >
                AI RENDER
              </span>

              {card.featured && (
                <span 
                  className="absolute top-3 left-24 px-2 py-1 rounded text-[9px] font-mono font-medium"
                  style={{
                    background: 'rgba(34,197,94,.2)',
                    border: '1px solid rgba(34,197,94,.3)',
                    color: '#22c55e',
                  }}
                >
                  HERO
                </span>
              )}

              {/* Save Button */}
              <button
                onClick={() => showToast('Saved to gallery ✓', 'success')}
                className="absolute top-3 right-3 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'rgba(8,8,14,.8)',
                  border: '1px solid rgba(255,255,255,.1)',
                }}
              >
                <Bookmark className="w-4 h-4 text-[#a09d98]" />
              </button>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-[#f0ede8] mb-1">{card.title}</h3>
              <p className="text-xs text-[#55534f]">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
