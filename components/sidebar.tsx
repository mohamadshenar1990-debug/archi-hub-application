'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  MapPin, 
  Scan, 
  Building2,
  FileText,
  Brain,
  Lightbulb,
  LayoutGrid,
  Grid3X3,
  Palette,
  Box,
  Home,
  Sofa,
  TreePine,
  Leaf,
  DollarSign,
  Video,
  Image,
  Presentation,
  Download,
} from 'lucide-react'

const navGroups = [
  {
    label: 'OVERVIEW',
    items: [
      { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
      { name: 'AI Team', href: '/dashboard/ai-team', icon: Users },
    ]
  },
  {
    label: 'DISCOVERY',
    items: [
      { name: 'Site Selection', href: '/dashboard/site-selection', icon: MapPin },
      { name: 'Site Analysis', href: '/dashboard/site-analysis', icon: Scan },
      { name: 'Context Study', href: '/dashboard/context-study', icon: Building2 },
    ]
  },
  {
    label: 'CLIENT',
    items: [
      { name: 'Client Brief', href: '/dashboard/client-brief', icon: FileText },
      { name: 'Personality Analysis', href: '/dashboard/personality', icon: Brain },
      { name: 'Inspiration Board', href: '/dashboard/inspiration', icon: Lightbulb },
    ]
  },
  {
    label: 'INTELLIGENCE',
    items: [
      { name: 'Program Generator', href: '/dashboard/program', icon: LayoutGrid },
      { name: 'Zoning & Planning', href: '/dashboard/zoning', icon: Grid3X3 },
    ]
  },
  {
    label: 'DESIGN',
    items: [
      { name: 'Concept Studio', href: '/dashboard/concept', icon: Palette },
      { name: 'Massing Generator', href: '/dashboard/massing', icon: Box },
      { name: 'Exterior Design', href: '/dashboard/exterior', icon: Home },
      { name: 'Interior Design', href: '/dashboard/interior', icon: Sofa },
      { name: 'Landscape Design', href: '/dashboard/landscape', icon: TreePine },
    ]
  },
  {
    label: 'EVALUATION',
    items: [
      { name: 'Sustainability', href: '/dashboard/sustainability', icon: Leaf },
      { name: 'Cost Estimate', href: '/dashboard/cost', icon: DollarSign },
    ]
  },
  {
    label: 'OUTPUT',
    items: [
      { name: 'Visualization Studio', href: '/dashboard/visualization', icon: Video },
      { name: 'Gallery', href: '/dashboard/gallery', icon: Image },
      { name: 'Final Presentation', href: '/dashboard/presentation', icon: Presentation },
      { name: 'Export Files', href: '/dashboard/export', icon: Download },
    ]
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside 
      className="w-[238px] h-screen flex flex-col shrink-0"
      style={{
        background: 'rgba(8,8,14,.82)',
        backdropFilter: 'blur(22px)',
        borderRight: '1px solid rgba(201,168,76,.09)',
      }}
    >
      {/* Logo */}
      <div className="p-5 pb-6">
        <div className="flex items-center gap-3">
          {/* Logo Icon */}
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,.2) 0%, rgba(201,168,76,.08) 100%)',
              boxShadow: '0 0 20px rgba(201,168,76,.15), inset 0 0 10px rgba(201,168,76,.05)',
              border: '1px solid rgba(201,168,76,.25)',
            }}
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#c9a84c" 
              strokeWidth="1.5"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              <span className="text-[#f0ede8]">Archi</span>
              <span className="text-[#c9a84c]">Hub</span>
            </h1>
            <p className="text-[10px] font-mono text-[#55534f] tracking-wider uppercase">
              AI Workflow Platform
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="px-3 mb-2 text-[10px] font-mono font-medium text-[#55534f] tracking-widest uppercase">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${isActive 
                        ? 'text-[#c9a84c]' 
                        : 'text-[#a09d98] hover:text-[#f0ede8] hover:bg-white/[.03]'
                      }
                    `}
                    style={isActive ? {
                      background: 'rgba(201,168,76,.11)',
                      border: '1px solid rgba(201,168,76,.22)',
                    } : {}}
                  >
                    {/* Active indicator bar */}
                    {isActive && (
                      <div 
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                        style={{
                          backgroundColor: '#c9a84c',
                          boxShadow: '0 0 8px #c9a84c, 0 0 12px rgba(201,168,76,.5)',
                        }}
                      />
                    )}
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}
