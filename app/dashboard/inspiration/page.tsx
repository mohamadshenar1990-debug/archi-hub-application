'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { useToast } from '@/components/toast-provider'

const filters = ['All', 'Architecture', 'Interior', 'Landscape', 'Materials', 'Mood']

const inspirationItems = [
  { emoji: '🏛️', label: 'Desert Modernism', category: 'Architecture' },
  { emoji: '🪴', label: 'Courtyard Garden', category: 'Landscape' },
  { emoji: '🛋️', label: 'Warm Minimalism', category: 'Interior' },
  { emoji: '🪨', label: 'Natural Stone', category: 'Materials' },
  { emoji: '🌅', label: 'Golden Hour', category: 'Mood' },
  { emoji: '🏠', label: 'Mashrabiya Screens', category: 'Architecture' },
  { emoji: '💧', label: 'Water Features', category: 'Landscape' },
  { emoji: '🪵', label: 'Timber Ceilings', category: 'Interior' },
  { emoji: '✨', label: 'Brass Accents', category: 'Materials' },
]

export default function InspirationPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const { showToast } = useToast()

  const filteredItems = activeFilter === 'All' 
    ? inspirationItems 
    : inspirationItems.filter(item => item.category === activeFilter)

  return (
    <div>
      <PageHeader 
        title="Inspiration Board" 
        description="Collect and organize design references"
        actions={
          <button
            onClick={() => showToast('Upload dialog opened', 'info')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium glass-card hover:bg-white/[.05] transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload
          </button>
        }
      />

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="flex gap-2 mb-6"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              background: activeFilter === filter ? 'rgba(201,168,76,.15)' : 'rgba(255,255,255,.03)',
              border: `1px solid ${activeFilter === filter ? 'rgba(201,168,76,.3)' : 'rgba(255,255,255,.06)'}`,
              color: activeFilter === filter ? '#c9a84c' : '#a09d98',
            }}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      {/* Inspiration Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: idx * 0.05 }}
            className="glass-card aspect-[4/3] flex flex-col items-center justify-center cursor-pointer hover:border-[rgba(201,168,76,.2)] transition-colors group"
          >
            <span className="text-5xl mb-3 group-hover:scale-110 transition-transform">{item.emoji}</span>
            <span className="text-sm font-medium text-[#f0ede8]">{item.label}</span>
            <span className="text-[10px] font-mono text-[#55534f] mt-1">{item.category}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
