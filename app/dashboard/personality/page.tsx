'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { GlassCard } from '@/components/glass-card'

const quizQuestions = [
  {
    question: 'Which space feels most like home to you?',
    options: [
      'A serene courtyard with water features',
      'A cozy library with warm lighting',
      'An open-plan living area with views',
      'A lush garden retreat',
    ],
  },
  {
    question: 'How do you prefer to entertain guests?',
    options: [
      'Intimate gatherings in private settings',
      'Grand formal receptions',
      'Casual outdoor celebrations',
      'Multi-zone experiences throughout the home',
    ],
  },
  {
    question: 'What material resonates with you most?',
    options: [
      'Natural stone and marble',
      'Warm wood and timber',
      'Modern glass and steel',
      'Traditional plaster and tile',
    ],
  },
]

const profileResult = {
  name: 'The Desert Minimalist',
  description: 'You value serenity, natural materials, and spaces that breathe. Your ideal home balances traditional Arabian hospitality with contemporary restraint. You prefer quality over quantity, and seek a sanctuary from the desert heat.',
  tags: ['Serene', 'Natural Materials', 'Courtyard-Centric', 'Warm Minimalism', 'Privacy-Focused'],
}

export default function PersonalityPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})

  const handleSelect = (questionIdx: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIdx]: optionIdx }))
  }

  return (
    <div>
      <PageHeader 
        title="Personality Analysis" 
        description="Discover your architectural personality profile"
      />

      {/* Quiz Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {quizQuestions.map((q, qIdx) => (
          <GlassCard key={qIdx} className="p-5" delay={qIdx * 0.1}>
            <h3 className="text-sm font-semibold text-[#f0ede8] mb-4">{q.question}</h3>
            <div className="space-y-2">
              {q.options.map((option, oIdx) => {
                const isSelected = selectedAnswers[qIdx] === oIdx
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(qIdx, oIdx)}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
                    style={{
                      background: isSelected ? 'rgba(201,168,76,.12)' : 'rgba(255,255,255,.03)',
                      border: `1px solid ${isSelected ? 'rgba(201,168,76,.3)' : 'rgba(255,255,255,.06)'}`,
                      color: isSelected ? '#c9a84c' : '#a09d98',
                    }}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Profile Result */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut', delay: 0.35 }}
        className="gold-card p-6"
      >
        <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-3">Your Profile</h3>
        <h2 className="text-2xl font-extrabold gold-gradient-text mb-3">{profileResult.name}</h2>
        <p className="text-sm text-[#a09d98] leading-relaxed mb-4">{profileResult.description}</p>
        <div className="flex flex-wrap gap-2">
          {profileResult.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(201,168,76,.1)',
                border: '1px solid rgba(201,168,76,.2)',
                color: '#c9a84c',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
