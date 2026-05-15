'use client'

import { ReactNode } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'
import { ProjectBar } from '@/components/project-bar'
import { usePathname } from 'next/navigation'

const pageNames: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/ai-team': 'AI Team',
  '/dashboard/site-selection': 'Site Selection',
  '/dashboard/site-analysis': 'Site Analysis',
  '/dashboard/context-study': 'Context Study',
  '/dashboard/client-brief': 'Client Brief',
  '/dashboard/personality': 'Personality Analysis',
  '/dashboard/inspiration': 'Inspiration Board',
  '/dashboard/program': 'Program Generator',
  '/dashboard/zoning': 'Zoning & Planning',
  '/dashboard/concept': 'Concept Studio',
  '/dashboard/massing': 'Massing Generator',
  '/dashboard/exterior': 'Exterior Design',
  '/dashboard/interior': 'Interior Design',
  '/dashboard/landscape': 'Landscape Design',
  '/dashboard/sustainability': 'Sustainability',
  '/dashboard/cost': 'Cost Estimate',
  '/dashboard/visualization': 'Visualization Studio',
  '/dashboard/gallery': 'Gallery',
  '/dashboard/presentation': 'Final Presentation',
  '/dashboard/export': 'Export Files',
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const pageName = pageNames[pathname] || 'Dashboard'

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Topbar pageName={pageName} />
        <ProjectBar />
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
