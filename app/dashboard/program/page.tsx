'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { GenerateBar } from '@/components/generate-bar'

const zones = [
  {
    name: 'Public Zone',
    spaces: [
      { name: 'Majlis', area: '45 m²' },
      { name: 'Formal Living', area: '38 m²' },
      { name: 'Dining Room', area: '32 m²' },
      { name: 'Guest Powder Room', area: '6 m²' },
    ],
  },
  {
    name: 'Semi-Private Zone',
    spaces: [
      { name: 'Family Living', area: '55 m²' },
      { name: 'Kitchen', area: '28 m²' },
      { name: 'Breakfast Area', area: '18 m²' },
      { name: 'Home Office', area: '22 m²' },
    ],
  },
  {
    name: 'Private Zone',
    spaces: [
      { name: 'Master Suite', area: '65 m²' },
      { name: 'Bedroom 2', area: '28 m²' },
      { name: 'Bedroom 3', area: '28 m²' },
      { name: 'Bedroom 4', area: '24 m²' },
      { name: 'Bedroom 5', area: '24 m²' },
    ],
  },
  {
    name: 'Service Zone',
    spaces: [
      { name: 'Laundry', area: '12 m²' },
      { name: 'Storage', area: '18 m²' },
      { name: 'Staff Room 1', area: '16 m²' },
      { name: 'Staff Room 2', area: '16 m²' },
    ],
  },
  {
    name: 'Leisure Zone',
    spaces: [
      { name: 'Home Cinema', area: '35 m²' },
      { name: 'Gym', area: '28 m²' },
      { name: 'Spa/Sauna', area: '18 m²' },
      { name: 'Game Room', area: '25 m²' },
    ],
  },
  {
    name: 'Hidden Program',
    spaces: [
      { name: 'Underground Parking', area: '120 m²' },
      { name: 'Mechanical Room', area: '25 m²' },
      { name: 'Smart Home Hub', area: '8 m²' },
      { name: 'Safe Room', area: '12 m²' },
    ],
  },
]

export default function ProgramPage() {
  return (
    <div>
      <PageHeader 
        title="Program Generator" 
        description="AI-generated spatial program based on your requirements"
      />

      <GenerateBar 
        placeholder="Describe additional program requirements..."
        buttonText="Generate Program"
      />

      {/* Zone Grid */}
      <div className="grid grid-cols-2 gap-4">
        {zones.map((zone, idx) => (
          <motion.div
            key={zone.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: idx * 0.08 }}
            className="glass-card p-5"
          >
            <h3 
              className="text-sm font-semibold mb-4 pb-2"
              style={{
                color: '#c9a84c',
                borderBottom: '1px solid rgba(201,168,76,.2)',
              }}
            >
              {zone.name}
            </h3>
            <div className="space-y-2">
              {zone.spaces.map((space) => (
                <div 
                  key={space.name} 
                  className="flex items-center justify-between py-1.5"
                >
                  <span className="text-sm text-[#a09d98]">{space.name}</span>
                  <span className="text-sm font-mono text-[#55534f]">{space.area}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
