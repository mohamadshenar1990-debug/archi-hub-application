'use client'

import { Search, Bell, Settings, ChevronRight } from 'lucide-react'

interface TopbarProps {
  pageName: string
}

export function Topbar({ pageName }: TopbarProps) {
  return (
    <header 
      className="h-[54px] flex items-center justify-between px-5 shrink-0"
      style={{
        background: 'rgba(6,6,10,.75)',
        backdropFilter: 'blur(22px)',
        borderBottom: '1px solid rgba(255,255,255,.06)',
      }}
    >
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-[#55534f]">Projects</span>
        <ChevronRight className="w-3.5 h-3.5 text-[#55534f]" />
        <span className="text-[#f0ede8] font-medium">Al Nakheel Residence</span>
        <span 
          className="ml-2 px-2 py-0.5 text-[10px] font-mono font-medium rounded-full"
          style={{
            background: 'rgba(201,168,76,.15)',
            color: '#c9a84c',
            border: '1px solid rgba(201,168,76,.25)',
          }}
        >
          IN PROGRESS
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg text-[#a09d98] hover:text-[#f0ede8] hover:bg-white/[.04] transition-colors">
          <Search className="w-4.5 h-4.5" />
        </button>
        
        <button className="p-2 rounded-lg text-[#a09d98] hover:text-[#f0ede8] hover:bg-white/[.04] transition-colors relative">
          <Bell className="w-4.5 h-4.5" />
          {/* Notification dot */}
          <div 
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{
              backgroundColor: '#c9a84c',
              boxShadow: '0 0 6px #c9a84c',
            }}
          />
        </button>
        
        <button className="p-2 rounded-lg text-[#a09d98] hover:text-[#f0ede8] hover:bg-white/[.04] transition-colors">
          <Settings className="w-4.5 h-4.5" />
        </button>

        {/* Avatar */}
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            background: 'linear-gradient(135deg, rgba(201,168,76,.25) 0%, rgba(201,168,76,.1) 100%)',
            border: '1px solid rgba(201,168,76,.3)',
            color: '#c9a84c',
          }}
        >
          AH
        </div>
      </div>
    </header>
  )
}
