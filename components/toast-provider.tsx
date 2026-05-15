'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

interface Toast {
  id: string
  message: string
  type?: 'success' | 'info' | 'warning'
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { id, message, type }])
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="glass-card px-4 py-3 flex items-center gap-3 min-w-[280px]"
              style={{
                border: '1px solid rgba(201,168,76,.22)',
                boxShadow: '0 4px 20px rgba(0,0,0,.4)',
              }}
            >
              <div 
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: toast.type === 'success' ? '#22c55e' : toast.type === 'warning' ? '#f59e0b' : '#c9a84c',
                  boxShadow: `0 0 8px ${toast.type === 'success' ? '#22c55e' : toast.type === 'warning' ? '#f59e0b' : '#c9a84c'}`,
                }}
              />
              <span className="text-sm text-[#f0ede8] flex-1">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-[#55534f] hover:text-[#a09d98] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
