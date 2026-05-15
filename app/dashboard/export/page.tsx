'use client'

import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { useToast } from '@/components/toast-provider'

const exportFiles = [
  { emoji: '📄', name: 'Full Report PDF', description: 'Complete project documentation', size: '~8.4 MB' },
  { emoji: '🖼️', name: 'Render Package', description: 'All visualization exports at 4K resolution', size: '~124 MB' },
  { emoji: '📊', name: 'Presentation Boards', description: 'Print-ready A1 boards', size: '~45 MB' },
  { emoji: '📐', name: 'Program Spreadsheet', description: 'Detailed area schedule in Excel', size: '~0.8 MB' },
  { emoji: '🌿', name: 'Sustainability Report', description: 'Environmental performance analysis', size: '~3.2 MB' },
  { emoji: '💰', name: 'Cost Estimate', description: 'Itemized budget breakdown', size: '~1.1 MB' },
]

export default function ExportPage() {
  const { showToast } = useToast()

  const handleDownload = (fileName: string) => {
    showToast(`Downloading ${fileName}...`, 'info')
  }

  return (
    <div>
      <PageHeader 
        title="Export Files" 
        description="Download all project deliverables"
      />

      {/* Export Grid */}
      <div className="grid grid-cols-2 gap-4">
        {exportFiles.map((file, idx) => (
          <motion.div
            key={file.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: idx * 0.08 }}
            className="glass-card p-5"
          >
            <div className="flex items-start gap-4">
              {/* File Icon */}
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{
                  background: 'rgba(201,168,76,.08)',
                  border: '1px solid rgba(201,168,76,.15)',
                }}
              >
                {file.emoji}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[#f0ede8] mb-1">{file.name}</h3>
                <p className="text-xs text-[#55534f] mb-3">{file.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#55534f]">{file.size}</span>
                  <button
                    onClick={() => handleDownload(file.name)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                    style={{
                      background: 'rgba(201,168,76,.1)',
                      border: '1px solid rgba(201,168,76,.25)',
                      color: '#c9a84c',
                    }}
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
