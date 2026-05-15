'use client'

import { motion } from 'framer-motion'
import { Layers, Eye } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { useToast } from '@/components/toast-provider'

const presentationBoards = [
  { id: '01', name: 'Cover Board', description: 'Project title, client, architect, date' },
  { id: '02', name: 'Site Context', description: 'Location, analysis, and opportunities' },
  { id: '03', name: 'Design Concept', description: 'Narrative, inspiration, and approach' },
  { id: '04', name: 'Floor Plans', description: 'All levels with furniture layout' },
  { id: '05', name: 'Sections & Elevations', description: 'Building cuts and facade drawings' },
  { id: '06', name: 'Exterior Renders', description: 'Key views and perspectives' },
  { id: '07', name: 'Interior Renders', description: 'Room visualizations' },
  { id: '08', name: 'Sustainability', description: 'Performance data and strategies' },
]

export default function PresentationPage() {
  const { showToast } = useToast()

  return (
    <div>
      <PageHeader 
        title="Final Presentation" 
        description="Assemble presentation boards and deck"
      />

      {/* Board Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {presentationBoards.map((board, idx) => (
          <motion.div
            key={board.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: idx * 0.05 }}
            className="glass-card p-5 cursor-pointer hover:border-[rgba(201,168,76,.2)] transition-colors group"
          >
            <div className="flex items-start gap-4">
              {/* Board Number */}
              <div 
                className="w-12 h-16 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: 'rgba(201,168,76,.08)',
                  border: '1px solid rgba(201,168,76,.15)',
                }}
              >
                <span className="text-lg font-mono font-bold text-[#c9a84c]">{board.id}</span>
              </div>
              
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-[#f0ede8] mb-1 group-hover:text-[#c9a84c] transition-colors">
                  {board.name}
                </h3>
                <p className="text-xs text-[#55534f]">{board.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut', delay: 0.45 }}
        className="flex justify-end gap-3"
      >
        <button
          onClick={() => showToast('Opening preview...', 'info')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium glass-card hover:bg-white/[.05] transition-colors"
        >
          <Eye className="w-4 h-4" />
          Preview Deck
        </button>
        <button
          onClick={() => showToast('Assembling all boards...', 'info')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 100%)',
            color: '#08080c',
          }}
        >
          <Layers className="w-4 h-4" />
          Assemble All Boards
        </button>
      </motion.div>
    </div>
  )
}
