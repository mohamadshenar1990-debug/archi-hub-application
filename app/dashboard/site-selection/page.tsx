'use client'

import { motion } from 'framer-motion'
import { Search, MapPin, Upload, Scan, Check } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { GlassCard } from '@/components/glass-card'
import { useToast } from '@/components/toast-provider'

const siteInfo = [
  { label: 'Country', value: 'Saudi Arabia' },
  { label: 'City', value: 'Riyadh' },
  { label: 'District', value: 'Al Nakheel' },
  { label: 'Plot Area', value: '850 m²' },
  { label: 'Zoning', value: 'Residential R2' },
  { label: 'Max Height', value: '12m (3 floors)' },
]

export default function SiteSelectionPage() {
  const { showToast } = useToast()

  return (
    <div>
      <PageHeader 
        title="Site Selection" 
        description="Define and confirm your project site location"
      />

      {/* Map Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="relative h-[320px] rounded-2xl mb-6 overflow-hidden"
        style={{
          background: 'rgba(12,12,18,.9)',
          border: '1px solid rgba(255,255,255,.06)',
        }}
      >
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(201,168,76,.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Center Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
            style={{
              background: 'rgba(201,168,76,.2)',
              border: '2px solid #c9a84c',
              boxShadow: '0 0 20px rgba(201,168,76,.4)',
            }}
          >
            <MapPin className="w-6 h-6 text-[#c9a84c]" />
          </div>
          <span className="text-xs font-mono text-[#c9a84c]">24.7136°N, 46.6753°E</span>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
        className="flex flex-wrap gap-3 mb-6"
      >
        <button
          onClick={() => showToast('Opening search...', 'info')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium glass-card hover:bg-white/[.05] transition-colors"
        >
          <Search className="w-4 h-4" />
          Search Location
        </button>
        <button
          onClick={() => showToast('Drop pin mode active', 'info')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium glass-card hover:bg-white/[.05] transition-colors"
        >
          <MapPin className="w-4 h-4" />
          Drop Pin
        </button>
        <button
          onClick={() => showToast('Upload coordinates...', 'info')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium glass-card hover:bg-white/[.05] transition-colors"
        >
          <Upload className="w-4 h-4" />
          Upload Coordinates
        </button>
        <button
          onClick={() => showToast('Detecting boundaries...', 'info')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium glass-card hover:bg-white/[.05] transition-colors"
        >
          <Scan className="w-4 h-4" />
          Detect Plot Boundary
        </button>
        <button
          onClick={() => showToast('Site confirmed ✓', 'success')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold ml-auto transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 100%)',
            color: '#08080c',
          }}
        >
          <Check className="w-4 h-4" />
          Confirm Site
        </button>
      </motion.div>

      {/* Two Column: Site Summary + Coordinates Input */}
      <div className="grid grid-cols-2 gap-4">
        <GlassCard className="p-5" delay={0.2}>
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">Site Summary</h3>
          <div className="space-y-3">
            {siteInfo.map((info) => (
              <div key={info.label} className="flex items-center justify-between py-2 border-b border-white/[.04] last:border-0">
                <span className="text-sm text-[#55534f]">{info.label}</span>
                <span className="text-sm text-[#f0ede8] font-medium">{info.value}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5" delay={0.25}>
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">Coordinates Input</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Latitude</label>
              <input
                type="text"
                defaultValue="24.7136"
                className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40"
              />
            </div>
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Longitude</label>
              <input
                type="text"
                defaultValue="46.6753"
                className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40"
              />
            </div>
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Plot Area (m²)</label>
              <input
                type="text"
                defaultValue="850"
                className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40"
              />
            </div>
            <button
              onClick={() => showToast('Coordinates saved ✓', 'success')}
              className="w-full py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: 'rgba(201,168,76,.15)',
                border: '1px solid rgba(201,168,76,.25)',
                color: '#c9a84c',
              }}
            >
              Save Coordinates
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
