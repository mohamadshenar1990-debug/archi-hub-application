'use client'

import { motion } from 'framer-motion'
import { Save, Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { GlassCard } from '@/components/glass-card'
import { useToast } from '@/components/toast-provider'

export default function ClientBriefPage() {
  const { showToast } = useToast()

  return (
    <div>
      <PageHeader 
        title="Client Brief" 
        description="Capture and organize client requirements"
      />

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Space Requirements */}
        <GlassCard className="p-5">
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">Space Requirements</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Bedrooms</label>
              <select className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40">
                <option>5 Bedrooms</option>
                <option>4 Bedrooms</option>
                <option>6 Bedrooms</option>
                <option>7+ Bedrooms</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Living Areas</label>
              <select className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40">
                <option>3 Living Areas (Majlis, Family, Formal)</option>
                <option>2 Living Areas</option>
                <option>4+ Living Areas</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Home Office</label>
              <select className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40">
                <option>Yes — Dedicated Office</option>
                <option>No</option>
                <option>Dual-purpose space</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Garage</label>
              <select className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40">
                <option>4 Cars (Underground)</option>
                <option>2 Cars</option>
                <option>3 Cars</option>
                <option>6+ Cars</option>
              </select>
            </div>
          </div>
        </GlassCard>

        {/* Additional Spaces */}
        <GlassCard className="p-5" delay={0.1}>
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">Additional Spaces</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Entertainment</label>
              <select className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40">
                <option>Home Cinema + Game Room</option>
                <option>Home Cinema Only</option>
                <option>Game Room Only</option>
                <option>None</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Wellness</label>
              <select className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40">
                <option>Gym + Spa + Pool</option>
                <option>Gym + Pool</option>
                <option>Pool Only</option>
                <option>None</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Outdoor</label>
              <select className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40">
                <option>Garden + Courtyard + BBQ</option>
                <option>Garden Only</option>
                <option>Rooftop Terrace</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Staff Quarters</label>
              <select className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40">
                <option>2 Staff Rooms</option>
                <option>1 Staff Room</option>
                <option>3+ Staff Rooms</option>
                <option>None</option>
              </select>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Must-Have and Avoid Lists */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <GlassCard className="p-5" delay={0.15}>
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">Must-Have List</h3>
          <textarea
            className="w-full h-32 px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] placeholder:text-[#55534f] focus:outline-none focus:border-[#c9a84c]/40 resize-none"
            placeholder="List essential features and requirements..."
            defaultValue="• Private courtyard with water feature
• Separate guest entrance and majlis
• Master suite with private garden access
• Smart home automation throughout
• Natural materials: stone, wood, brass"
          />
        </GlassCard>

        <GlassCard className="p-5" delay={0.2}>
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">Avoid List</h3>
          <textarea
            className="w-full h-32 px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] placeholder:text-[#55534f] focus:outline-none focus:border-[#c9a84c]/40 resize-none"
            placeholder="List features or styles to avoid..."
            defaultValue="• Excessive glass on south facade
• Generic/suburban appearance
• Dark interiors
• High maintenance materials
• Visible service areas from entry"
          />
        </GlassCard>
      </div>

      {/* Privacy & Sustainability */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <GlassCard className="p-5" delay={0.25}>
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">Privacy Level</h3>
          <select className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40">
            <option>Maximum — Full screening from all sides</option>
            <option>High — Screened from street and neighbors</option>
            <option>Moderate — Street screening only</option>
            <option>Open — Minimal privacy requirements</option>
          </select>
        </GlassCard>

        <GlassCard className="p-5" delay={0.3}>
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">Sustainability Target</h3>
          <select className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40">
            <option>LEED Gold — High performance</option>
            <option>LEED Platinum — Maximum performance</option>
            <option>LEED Silver — Good performance</option>
            <option>No certification — Standard compliance</option>
          </select>
        </GlassCard>
      </div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut', delay: 0.35 }}
        className="flex justify-end gap-3"
      >
        <button
          onClick={() => showToast('Generating AI summary...', 'info')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium glass-card hover:bg-white/[.05] transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Generate AI Summary
        </button>
        <button
          onClick={() => showToast('Brief saved ✓', 'success')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 100%)',
            color: '#08080c',
          }}
        >
          <Save className="w-4 h-4" />
          Save Brief
        </button>
      </motion.div>
    </div>
  )
}
