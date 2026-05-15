'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { GlassCard } from '@/components/glass-card'
import { StatCard } from '@/components/stat-card'

const workflowPhases = [
  { name: 'Site Selection', progress: 100 },
  { name: 'Site Analysis', progress: 100 },
  { name: 'Context Study', progress: 100 },
  { name: 'Client Brief', progress: 100 },
  { name: 'Personality Analysis', progress: 100 },
  { name: 'Inspiration Board', progress: 60 },
  { name: 'Program Generator', progress: 30 },
  { name: 'Concept Studio', progress: 0 },
  { name: 'Massing Generator', progress: 0 },
]

const projectInfo = [
  { label: 'Typology', value: 'Luxury Villa' },
  { label: 'Building Type', value: 'Residential' },
  { label: 'Location', value: 'Riyadh, KSA' },
  { label: 'Style', value: 'Contemporary Desert' },
  { label: 'Sustainability', value: 'LEED Gold Target' },
  { label: 'Timeline', value: '18 Months' },
]

export default function DashboardPage() {
  return (
    <div>
      <PageHeader 
        title="Project Overview" 
        description="Al Nakheel Residence — Luxury Villa, Riyadh"
      />

      {/* Next Action Banner */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="mb-6 p-5 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,.12) 0%, rgba(14,12,4,.8) 100%)',
          border: '1px solid rgba(201,168,76,.25)',
          boxShadow: '0 0 40px rgba(201,168,76,.08)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(201,168,76,.15)',
                border: '1px solid rgba(201,168,76,.3)',
              }}
            >
              <Sparkles className="w-6 h-6 text-[#c9a84c]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#f0ede8]">Continue to Inspiration Board</h3>
              <p className="text-sm text-[#a09d98]">Complete your mood board to unlock the Program Generator</p>
            </div>
          </div>
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 100%)',
              color: '#08080c',
            }}
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Completion" value="42" unit="%" gold delay={0.1} />
        <StatCard label="Plot Area" value="850" unit="m²" delay={0.15} />
        <StatCard label="Budget" value="$2.4" unit="M" delay={0.2} />
        <StatCard label="AI Outputs" value="34" delay={0.25} />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-4">
        {/* Workflow Progress */}
        <GlassCard className="p-5" delay={0.3}>
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">Workflow Progress</h3>
          <div className="space-y-3">
            {workflowPhases.map((phase, idx) => (
              <div key={phase.name} className="flex items-center gap-3">
                <span className="text-sm text-[#a09d98] w-36 truncate">{phase.name}</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/[.06] overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${phase.progress}%`,
                      background: phase.progress === 100 
                        ? 'linear-gradient(90deg, #c9a84c 0%, #e8c96a 100%)'
                        : phase.progress > 0 
                          ? 'rgba(201,168,76,.4)'
                          : 'rgba(255,255,255,.1)',
                      boxShadow: phase.progress === 100 ? '0 0 8px rgba(201,168,76,.5)' : 'none',
                    }}
                  />
                </div>
                <span className="text-xs font-mono text-[#55534f] w-10 text-right">{phase.progress}%</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Project Info */}
        <GlassCard className="p-5" delay={0.35}>
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">Project Information</h3>
          <div className="space-y-3">
            {projectInfo.map((info) => (
              <div key={info.label} className="flex items-center justify-between py-2 border-b border-white/[.04] last:border-0">
                <span className="text-sm text-[#55534f]">{info.label}</span>
                <span className="text-sm text-[#f0ede8] font-medium">{info.value}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
