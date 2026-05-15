import type { Metadata, Viewport } from 'next'
import { Syne, DM_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ToastProvider } from '@/components/toast-provider'
import './globals.css'

const syne = Syne({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
})

const dmMono = DM_Mono({ 
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
})

export const metadata: Metadata = {
  title: 'Archi Hub | AI-Powered Architectural Workflow',
  description: 'Premium AI-powered architectural workflow platform - your digital architecture office and AI operating system.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#08080c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable}`}>
      <body className="font-sans antialiased bg-[#08080c] text-[#f0ede8]">
        {/* Atmospheric Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Layer 1 - Radial gradient dome */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(75% 50% at 50% 0%, rgba(201,168,76,.09) 0%, rgba(140,90,20,.05) 40%, transparent 70%),
                radial-gradient(60% 40% at 8% 0%, rgba(201,168,76,.12) 0%, rgba(120,70,10,.06) 40%, transparent 65%),
                radial-gradient(55% 40% at 90% 10%, rgba(110,90,200,.10) 0%, rgba(40,25,80,.05) 45%, transparent 65%),
                radial-gradient(100% 60% at 50% 100%, rgba(201,168,76,.04) 0%, transparent 50%)
              `,
              backgroundColor: '#08080c',
            }}
          />
          
          {/* Layer 2 - Gold grid overlay */}
          <div 
            className="absolute inset-0 animate-shimmer"
            style={{
              backgroundImage: `
                repeating-linear-gradient(90deg, rgba(201,168,76,.055) 0 1px, transparent 1px 80px),
                repeating-linear-gradient(90deg, rgba(201,168,76,.025) 0 1px, transparent 1px 20px),
                repeating-linear-gradient(0deg, rgba(201,168,76,.04) 0 1px, transparent 1px 80px),
                repeating-linear-gradient(0deg, rgba(201,168,76,.018) 0 1px, transparent 1px 20px)
              `,
              mixBlendMode: 'screen',
            }}
          />
          
          {/* Layer 3 - Corner vignette */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(140% 120% at 50% 0%, transparent 50%, rgba(0,0,0,.8))',
            }}
          />
          
          {/* Layer 4 - Gold orb at top center */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] animate-subtlePulse"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,.07) 0%, transparent 68%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <ToastProvider>
            {children}
          </ToastProvider>
        </div>
        
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
