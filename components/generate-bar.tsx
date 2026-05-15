'use client'

import { Sparkles } from 'lucide-react'
import { useToast } from '@/components/toast-provider'

interface GenerateBarProps {
  placeholder?: string
  buttonText?: string
  onGenerate?: (prompt: string) => void
}

export function GenerateBar({ 
  placeholder = "Describe your requirements...", 
  buttonText = "Generate",
  onGenerate
}: GenerateBarProps) {
  const { showToast } = useToast()

  const handleGenerate = () => {
    showToast('Generating...', 'info')
    onGenerate?.('')
  }

  return (
    <div 
      className="flex items-center gap-3 p-2 rounded-xl mb-6"
      style={{
        background: 'rgba(12,12,18,.78)',
        backdropFilter: 'blur(14px)',
        border: '1px solid rgba(201,168,76,.22)',
      }}
    >
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-[#f0ede8] placeholder:text-[#55534f] focus:outline-none"
      />
      <button
        onClick={handleGenerate}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,.2) 0%, rgba(201,168,76,.1) 100%)',
          border: '1px solid rgba(201,168,76,.3)',
          color: '#c9a84c',
        }}
      >
        <Sparkles className="w-4 h-4" />
        {buttonText}
      </button>
    </div>
  )
}
