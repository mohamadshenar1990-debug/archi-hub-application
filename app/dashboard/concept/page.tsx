'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { GenerateBar } from '@/components/generate-bar'
import { useToast } from '@/components/toast-provider'

const concepts = [
  {
    id: '01',
    name: 'The Desert Lantern',
    description: 'A glowing central courtyard acts as the heart of the home, with perforated screens casting intricate shadow patterns throughout the day. The architecture embraces both protection from the harsh sun and a celebration of light.',
    featured: true,
    tags: ['Primary Direction'],
  },
  {
    id: '02',
    name: 'Stratified Horizons',
    description: 'Horizontal planes of varying opacity stack to create sheltered outdoor rooms. The design emphasizes the relationship between earth and sky, with extended roof planes providing deep shade.',
    featured: false,
    tags: ['Alternative Direction'],
  },
  {
    id: '03',
    name: 'The Carved Monolith',
    description: 'A solid mass subtracted to create voids for light, air, and views. The heavy exterior contrasts with light-filled interior courtyards, offering privacy while maintaining connection to nature.',
    featured: false,
    tags: ['Experimental'],
  },
]

export default function ConceptPage() {
  const { showToast } = useToast()

  return (
    <div>
      <PageHeader 
        title="Concept Studio" 
        description="AI-generated design concepts and narratives"
      />

      <GenerateBar 
        placeholder="Describe your concept direction or constraints..."
        buttonText="Generate Concept"
      />

      {/* Concept Grid */}
      <div className="grid grid-cols-2 gap-4">
        {concepts.map((concept, idx) => (
          <motion.div
            key={concept.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: idx * 0.1 }}
            className={concept.featured ? 'gold-card p-6' : 'glass-card p-6'}
            style={concept.featured ? {
              border: '1px solid rgba(201,168,76,.35)',
              boxShadow: '0 0 30px rgba(201,168,76,.08)',
            } : {}}
          >
            <div className="flex items-start justify-between mb-3">
              <span 
                className="text-xs font-mono"
                style={{ color: concept.featured ? '#c9a84c' : '#55534f' }}
              >
                CARD {concept.id}
              </span>
              <div className="flex gap-2">
                {concept.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium"
                    style={{
                      background: concept.featured ? 'rgba(201,168,76,.2)' : 'rgba(255,255,255,.05)',
                      border: `1px solid ${concept.featured ? 'rgba(201,168,76,.3)' : 'rgba(255,255,255,.1)'}`,
                      color: concept.featured ? '#c9a84c' : '#a09d98',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h3 className={`text-xl font-bold mb-3 ${concept.featured ? 'gold-gradient-text' : 'text-[#f0ede8]'}`}>
              {concept.name}
            </h3>
            <p className="text-sm text-[#a09d98] leading-relaxed">{concept.description}</p>
          </motion.div>
        ))}

        {/* Generate New Direction Card */}
        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.35 }}
          onClick={() => showToast('Generating new direction...', 'info')}
          className="p-6 rounded-2xl flex flex-col items-center justify-center min-h-[200px] transition-colors hover:bg-white/[.02]"
          style={{
            border: '2px dashed rgba(255,255,255,.1)',
          }}
        >
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
            style={{
              background: 'rgba(255,255,255,.05)',
              border: '1px solid rgba(255,255,255,.1)',
            }}
          >
            <Plus className="w-6 h-6 text-[#55534f]" />
          </div>
          <span className="text-sm font-medium text-[#55534f]">Generate New Direction</span>
        </motion.button>
      </div>
    </div>
  )
}
