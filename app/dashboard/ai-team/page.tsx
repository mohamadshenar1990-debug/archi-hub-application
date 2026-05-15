'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { useToast } from '@/components/toast-provider'

const agents = [
  { emoji: '🗺️', name: 'Site Agent', description: 'Analyzes site conditions and constraints', status: 'ready' },
  { emoji: '🌆', name: 'Context Agent', description: 'Studies urban context and surroundings', status: 'ready' },
  { emoji: '👤', name: 'Client Brief Agent', description: 'Processes client requirements', status: 'ready' },
  { emoji: '🧠', name: 'Personality Agent', description: 'Analyzes design personality preferences', status: 'ready' },
  { emoji: '📐', name: 'Program Agent', description: 'Generates spatial programming', status: 'waiting' },
  { emoji: '🔲', name: 'Planning Agent', description: 'Creates zoning and planning diagrams', status: 'idle' },
  { emoji: '💡', name: 'Concept Agent', description: 'Develops design concepts', status: 'idle' },
  { emoji: '🏗️', name: 'Massing Agent', description: 'Generates 3D massing options', status: 'idle' },
  { emoji: '🏛️', name: 'Exterior Agent', description: 'Designs facade and exterior elements', status: 'idle' },
  { emoji: '🛋️', name: 'Interior Agent', description: 'Creates interior design proposals', status: 'idle' },
  { emoji: '🌿', name: 'Landscape Agent', description: 'Designs landscape and outdoor spaces', status: 'idle' },
  { emoji: '🎬', name: 'Visualization Agent', description: 'Generates photorealistic renders', status: 'idle' },
  { emoji: '♻️', name: 'Sustainability Agent', description: 'Analyzes environmental performance', status: 'idle' },
  { emoji: '💰', name: 'Cost Agent', description: 'Estimates project costs', status: 'idle' },
]

export default function AITeamPage() {
  const { showToast } = useToast()

  const handleActivate = (agentName: string) => {
    showToast(`Activating ${agentName}...`, 'info')
  }

  return (
    <div>
      <PageHeader 
        title="AI Team" 
        description="Your intelligent design partners — 14 specialized AI agents"
      />

      <div className="grid grid-cols-3 gap-4">
        {agents.map((agent, idx) => (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: idx * 0.05 }}
            className="glass-card p-5"
          >
            <div className="flex items-start gap-4">
              {/* Emoji Icon */}
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{
                  background: 'rgba(201,168,76,.08)',
                  border: '1px solid rgba(201,168,76,.15)',
                }}
              >
                {agent.emoji}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-[#f0ede8] truncate">{agent.name}</h3>
                  {/* Status Dot */}
                  <div 
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      backgroundColor: agent.status === 'ready' ? '#22c55e' : agent.status === 'waiting' ? '#c9a84c' : '#55534f',
                      boxShadow: agent.status === 'ready' ? '0 0 6px #22c55e' : agent.status === 'waiting' ? '0 0 6px #c9a84c' : 'none',
                    }}
                  />
                </div>
                <p className="text-xs text-[#a09d98] mb-3 line-clamp-2">{agent.description}</p>
                
                <button
                  onClick={() => handleActivate(agent.name)}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
                  style={{
                    background: agent.status === 'ready' ? 'rgba(201,168,76,.15)' : 'rgba(255,255,255,.05)',
                    border: `1px solid ${agent.status === 'ready' ? 'rgba(201,168,76,.25)' : 'rgba(255,255,255,.08)'}`,
                    color: agent.status === 'ready' ? '#c9a84c' : '#55534f',
                  }}
                >
                  Activate Agent
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
