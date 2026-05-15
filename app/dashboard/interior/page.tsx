'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bookmark } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { GenerateBar } from '@/components/generate-bar'
import { useToast } from '@/components/toast-provider'

const rooms = ['Majlis', 'Master Suite', 'Family Living', 'Kitchen', 'Home Cinema', 'Gym']

const vizCards = [
  { emoji: '🛋️', title: 'Majlis — Day View', description: 'Traditional seating with contemporary details' },
  { emoji: '🌅', title: 'Majlis — Golden Hour', description: 'Afternoon light through mashrabiya screens' },
  { emoji: '🛏️', title: 'Master Bedroom', description: 'Minimal luxury with garden views' },
  { emoji: '🛁', title: 'Master Bathroom', description: 'Spa-like retreat with natural stone' },
]

export default function InteriorPage() {
  const [activeRoom, setActiveRoom] = useState('Majlis')
  const { showToast } = useToast()

  return (
    <div>
      <PageHeader 
        title="Interior Design" 
        description="AI-generated interior visualizations"
      />

      {/* Room Filter */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="flex gap-2 mb-4"
      >
        {rooms.map((room) => (
          <button
            key={room}
            onClick={() => setActiveRoom(room)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              background: activeRoom === room ? 'rgba(201,168,76,.15)' : 'rgba(255,255,255,.03)',
              border: `1px solid ${activeRoom === room ? 'rgba(201,168,76,.3)' : 'rgba(255,255,255,.06)'}`,
              color: activeRoom === room ? '#c9a84c' : '#a09d98',
            }}
          >
            {room}
          </button>
        ))}
      </motion.div>

      <GenerateBar 
        placeholder="Describe interior style, mood, or specific details..."
        buttonText="Generate Interior"
      />

      {/* Visualization Grid */}
      <div className="grid grid-cols-2 gap-4">
        {vizCards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: idx * 0.1 }}
            className="glass-card overflow-hidden group"
          >
            {/* Image Placeholder */}
            <div 
              className="aspect-[16/10] flex items-center justify-center relative"
              style={{
                background: 'linear-gradient(135deg, rgba(12,12,18,.9) 0%, rgba(18,18,24,.9) 100%)',
              }}
            >
              <span className="text-6xl">{card.emoji}</span>
              
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
