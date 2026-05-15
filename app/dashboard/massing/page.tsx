'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { GenerateBar } from '@/components/generate-bar'

const massingOptions = [
  {
    name: 'Courtyard Ring',
    description: 'Continuous volume wrapping a central open-to-sky courtyard',
  },
  {
    name: 'L-Shape Wrap',
    description: 'Two wings creating a protected outdoor space',
  },
  {
    name: 'Spine + Wings',
    description: 'Central corridor with perpendicular volumes',
  },
  {
    name: 'Stacked Terrace',
    description: 'Stepped volumes creating outdoor terraces at each level',
  },
  {
    name: 'U-Form',
    description: 'Three-sided embrace around a front garden',
  },
  {
    name: 'Monolith Carved',
    description: 'Solid mass with subtractive courtyards and voids',
  },
]

export default function MassingPage() {
  return (
    <div>
      <PageHeader 
        title="Massing Generator" 
        description="AI-generated 3D massing options"
      />

      <GenerateBar 
        placeholder="Describe massing preferences or constraints..."
        buttonText="Generate Massing"
      />

      {/* Massing Grid */}
      <div className="grid grid-cols-3 gap-4">
        {massingOptions.map((option, idx) => (
          <motion.div
            key={option.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: idx * 0.08 }}
            className="glass-card p-5 cursor-pointer hover:border-[rgba(201,168,76,.2)] transition-colors group"
          >
            {/* SVG Diagram */}
            <div 
              className="aspect-square rounded-xl mb-4 flex items-center justify-center"
              style={{
                background: 'rgba(8,8,14,.6)',
                border: '1px solid rgba(255,255,255,.06)',
              }}
            >
              <MassingSvg type={option.name} />
            </div>
            <h3 className="text-sm font-semibold text-[#f0ede8] mb-1 group-hover:text-[#c9a84c] transition-colors">
              {option.name}
            </h3>
            <p className="text-xs text-[#55534f]">{option.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function MassingSvg({ type }: { type: string }) {
  const baseStyle = { stroke: '#c9a84c', strokeWidth: 1.5, fill: 'rgba(201,168,76,.08)' }
  
  switch (type) {
    case 'Courtyard Ring':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <path d="M10 10 L70 10 L70 70 L10 70 Z" {...baseStyle} />
          <path d="M25 25 L55 25 L55 55 L25 55 Z" stroke="#c9a84c" strokeWidth="1" fill="none" strokeDasharray="3 2" />
        </svg>
      )
    case 'L-Shape Wrap':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <path d="M10 10 L40 10 L40 40 L70 40 L70 70 L10 70 Z" {...baseStyle} />
        </svg>
      )
    case 'Spine + Wings':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect x="35" y="10" width="10" height="60" {...baseStyle} />
          <rect x="10" y="25" width="25" height="20" {...baseStyle} />
          <rect x="45" y="35" width="25" height="20" {...baseStyle} />
        </svg>
      )
    case 'Stacked Terrace':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect x="10" y="50" width="60" height="20" {...baseStyle} />
          <rect x="15" y="32" width="50" height="18" {...baseStyle} />
          <rect x="20" y="14" width="40" height="18" {...baseStyle} />
        </svg>
      )
    case 'U-Form':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <path d="M10 10 L25 10 L25 55 L55 55 L55 10 L70 10 L70 70 L10 70 Z" {...baseStyle} />
        </svg>
      )
    case 'Monolith Carved':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect x="10" y="10" width="60" height="60" {...baseStyle} />
          <rect x="20" y="15" width="15" height="20" stroke="#c9a84c" strokeWidth="1" fill="rgba(8,8,14,.8)" />
          <rect x="45" y="45" width="20" height="15" stroke="#c9a84c" strokeWidth="1" fill="rgba(8,8,14,.8)" />
        </svg>
      )
    default:
      return null
  }
}
