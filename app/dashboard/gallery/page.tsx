'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'

const filters = ['All', 'Renders', 'Concepts', 'Diagrams', 'Reports']

const galleryItems = [
  { emoji: '🏠', label: 'Hero Render — Street', category: 'Renders', featured: true },
  { emoji: '🌅', label: 'Courtyard Golden Hour', category: 'Renders', featured: false },
  { emoji: '🛋️', label: 'Majlis Interior', category: 'Renders', featured: false },
  { emoji: '💡', label: 'Desert Lantern Concept', category: 'Concepts', featured: false },
  { emoji: '🔲', label: 'Bubble Diagram', category: 'Diagrams', featured: false },
  { emoji: '📐', label: 'Massing Study', category: 'Concepts', featured: false },
  { emoji: '🌙', label: 'Night Illumination', category: 'Renders', featured: false },
  { emoji: '♻️', label: 'Sustainability Analysis', category: 'Reports', featured: false },
  { emoji: '💰', label: 'Cost Breakdown', category: 'Reports', featured: false },
]

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter)

  return (
    <div>
      <PageHeader 
        title="Gallery" 
        description="All generated assets and outputs"
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

      {/* Masonry-style Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: idx * 0.05 }}
            className={`glass-card overflow-hidden cursor-pointer hover:border-[rgba(201,168,76,.2)] transition-colors group ${item.featured ? 'col-span-2 row-span-2' : ''}`}
          >
            <div 
              className={`flex items-center justify-center relative ${item.featured ? 'aspect-[16/12]' : 'aspect-[4/3]'}`}
              style={{
                background: 'linear-gradient(135deg, rgba(12,12,18,.9) 0%, rgba(18,18,24,.9) 100%)',
              }}
            >
              <span className={item.featured ? 'text-8xl' : 'text-5xl'}>{item.emoji}</span>
              
              {/* Overlay on hover */}
              <div 
                className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'linear-gradient(to top, rgba(8,8,14,.9) 0%, transparent 60%)',
                }}
              >
                <div>
                  <h3 className="text-sm font-semibold text-[#f0ede8]">{item.label}</h3>
                  <p className="text-xs text-[#55534f]">{item.category}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
