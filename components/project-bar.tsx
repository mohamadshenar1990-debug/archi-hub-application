'use client'

import { Plus } from 'lucide-react'

const projects = [
  { id: '1', name: 'Al Nakheel Residence', active: true },
  { id: '2', name: 'Marina Tower', active: false },
  { id: '3', name: 'Desert Oasis Resort', active: false },
]

export function ProjectBar() {
  return (
    <div 
      className="h-11 flex items-center gap-2 px-5 shrink-0 overflow-x-auto"
      style={{
        background: 'rgba(8,8,14,.5)',
        borderBottom: '1px solid rgba(255,255,255,.04)',
      }}
    >
      {projects.map((project) => (
        <button
          key={project.id}
          className={`
            px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200
            ${project.active 
              ? 'text-[#c9a84c]' 
              : 'text-[#55534f] hover:text-[#a09d98] hover:bg-white/[.03]'
            }
          `}
          style={project.active ? {
            background: 'rgba(201,168,76,.12)',
            border: '1px solid rgba(201,168,76,.22)',
          } : {
            border: '1px solid transparent',
          }}
        >
          {project.name}
        </button>
      ))}

      {/* New Project Button */}
      <button
        className="px-3 py-1.5 rounded-full text-xs font-medium text-[#55534f] hover:text-[#a09d98] transition-colors flex items-center gap-1.5 whitespace-nowrap"
        style={{
          border: '1px dashed rgba(255,255,255,.12)',
        }}
      >
        <Plus className="w-3.5 h-3.5" />
        New Project
      </button>
    </div>
  )
}
