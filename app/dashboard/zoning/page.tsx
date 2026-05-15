'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { GlassCard } from '@/components/glass-card'

const analysisCards = [
  { title: 'Circulation', description: 'Primary spine connects all zones. Secondary loop through courtyard provides informal flow.', icon: '↔️' },
  { title: 'Privacy Gradient', description: 'Public to private transition from entry through courtyard to bedrooms.', icon: '🔒' },
  { title: 'Adjacency Priority', description: 'Kitchen-dining-family cluster. Master suite isolated with garden access.', icon: '🔗' },
]

export default function ZoningPage() {
  return (
    <div>
      <PageHeader 
        title="Zoning & Planning" 
        description="Spatial organization and adjacency relationships"
      />

      {/* Bubble Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="glass-card p-8 mb-6"
      >
        <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-6">Bubble Diagram</h3>
        <svg 
          viewBox="0 0 600 350" 
          className="w-full h-auto"
          style={{ maxHeight: '350px' }}
        >
          {/* Connection Lines */}
          <line x1="300" y1="120" x2="180" y2="200" stroke="rgba(201,168,76,.3)" strokeWidth="2" />
          <line x1="300" y1="120" x2="420" y2="200" stroke="rgba(201,168,76,.3)" strokeWidth="2" />
          <line x1="300" y1="120" x2="300" y2="280" stroke="rgba(201,168,76,.3)" strokeWidth="2" />
          <line x1="180" y1="200" x2="120" y2="280" stroke="rgba(255,255,255,.15)" strokeWidth="1" />
          <line x1="180" y1="200" x2="300" y2="280" stroke="rgba(255,255,255,.15)" strokeWidth="1" />
          <line x1="420" y1="200" x2="480" y2="280" stroke="rgba(255,255,255,.15)" strokeWidth="1" />
          <line x1="420" y1="200" x2="300" y2="280" stroke="rgba(255,255,255,.15)" strokeWidth="1" />

          {/* PUBLIC - Center Top (Gold) */}
          <circle cx="300" cy="90" r="55" fill="rgba(201,168,76,.15)" stroke="#c9a84c" strokeWidth="2" />
          <text x="300" y="85" textAnchor="middle" fill="#c9a84c" fontSize="10" fontWeight="600" fontFamily="monospace">PUBLIC</text>
          <text x="300" y="100" textAnchor="middle" fill="#f0ede8" fontSize="12">Majlis</text>

          {/* SEMI-PVT - Left */}
          <circle cx="150" cy="200" r="45" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.2)" strokeWidth="1.5" />
          <text x="150" y="195" textAnchor="middle" fill="#a09d98" fontSize="9" fontWeight="600" fontFamily="monospace">SEMI-PVT</text>
          <text x="150" y="210" textAnchor="middle" fill="#f0ede8" fontSize="11">Family</text>

          {/* SERVICE - Bottom Left */}
          <circle cx="100" cy="300" r="38" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.12)" strokeWidth="1" />
          <text x="100" y="295" textAnchor="middle" fill="#55534f" fontSize="9" fontWeight="600" fontFamily="monospace">SERVICE</text>
          <text x="100" y="310" textAnchor="middle" fill="#a09d98" fontSize="10">Staff</text>

          {/* PRIVATE - Right */}
          <circle cx="450" cy="200" r="50" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.2)" strokeWidth="1.5" />
          <text x="450" y="195" textAnchor="middle" fill="#a09d98" fontSize="9" fontWeight="600" fontFamily="monospace">PRIVATE</text>
          <text x="450" y="210" textAnchor="middle" fill="#f0ede8" fontSize="11">Bedrooms</text>

          {/* LEISURE - Bottom Right */}
          <circle cx="500" cy="300" r="38" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.12)" strokeWidth="1" />
          <text x="500" y="295" textAnchor="middle" fill="#55534f" fontSize="9" fontWeight="600" fontFamily="monospace">LEISURE</text>
          <text x="500" y="310" textAnchor="middle" fill="#a09d98" fontSize="10">Cinema</text>

          {/* COURTYARD - Center (Dashed Gold) */}
          <circle cx="300" cy="220" r="48" fill="rgba(201,168,76,.05)" stroke="#c9a84c" strokeWidth="1.5" strokeDasharray="6 4" />
          <text x="300" y="215" textAnchor="middle" fill="#c9a84c" fontSize="9" fontWeight="600" fontFamily="monospace">COURTYARD</text>
          <text x="300" y="230" textAnchor="middle" fill="#f0ede8" fontSize="11">Central</text>
        </svg>
      </motion.div>

      {/* Analysis Cards */}
      <div className="grid grid-cols-3 gap-4">
        {analysisCards.map((card, idx) => (
          <GlassCard key={card.title} className="p-5" delay={(idx + 1) * 0.1}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{card.icon}</span>
              <div>
                <h3 className="text-sm font-semibold text-[#f0ede8] mb-2">{card.title}</h3>
                <p className="text-xs text-[#a09d98] leading-relaxed">{card.description}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
