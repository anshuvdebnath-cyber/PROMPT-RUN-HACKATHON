import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Smile } from 'lucide-react'
import { useFinance } from '../context/useFinance'
import { Mascot } from './Mascot'
import { MASCOT_METADATA } from '../data/mascotData'
import { HealthScoreRing } from './HealthScoreRing'
import { MascotMood } from '../types/finance'

export const HeroVibeBanner: React.FC = () => {
  const { effectiveMetrics, simulation } = useFinance()
  const [showMascotGallery, setShowMascotGallery] = useState(false)
  const [previewMood, setPreviewMood] = useState<MascotMood | null>(null)

  const activeMood = previewMood || effectiveMetrics.mascotMood
  const activeMeta = MASCOT_METADATA[activeMood]

  // All 12 moods for the interactive gallery
  const allMoods: MascotMood[] = [
    'excited',
    'joyful',
    'grateful',
    'energized',
    'sensitive',
    'confused',
    'bored',
    'stressed',
    'angry',
    'insecure',
    'hurt',
    'guilty',
  ]

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-4">
      <div
        className="relative overflow-hidden rounded-[36px] p-6 sm:p-8 border border-black/10 shadow-sm transition-all duration-300"
        style={{
          backgroundColor: activeMeta.bg,
        }}
      >
        {/* Subtle patterned accent background */}
        <div className="absolute inset-0 hatched-pattern opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left Column: Mascot & Emotional State */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 flex-1">
            <div className="relative group">
              <Mascot
                mood={activeMood}
                size={135}
                className="cursor-pointer drop-shadow-md"
                onClick={() => setShowMascotGallery(true)}
              />
              <button
                onClick={() => setShowMascotGallery(true)}
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white text-zinc-900 border border-black/10 shadow-sm opacity-90 hover:opacity-100 flex items-center gap-1 whitespace-nowrap"
                title="View all 12 mood mascots"
              >
                <Smile size={11} />
                <span>Gallery</span>
              </button>
            </div>

            <div className="max-w-xl">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap mb-1.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-zinc-900 border border-black/10 shadow-xs flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: activeMeta.color }}
                  />
                  Mood: {activeMeta.label}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-xs ${
                    effectiveMetrics.riskLevel === 'Safe'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : effectiveMetrics.riskLevel === 'Moderate'
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-rose-100 text-rose-800 border-rose-300'
                  }`}
                >
                  {effectiveMetrics.riskLevel}
                </span>

                {simulation.isActive && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-300 text-amber-950 border border-amber-400">
                    Previewing Simulation
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 font-display tracking-tight mt-1">
                {activeMeta.vibe}
              </h2>

              <p className="text-sm text-zinc-700 mt-2 font-medium leading-relaxed bg-white/60 backdrop-blur-xs p-3 rounded-2xl border border-black/5">
                💡 <span className="font-bold">Fin-Vibe Check:</span> {effectiveMetrics.quip}
              </p>

              {previewMood && (
                <button
                  onClick={() => setPreviewMood(null)}
                  className="mt-2 text-xs font-bold text-zinc-600 underline hover:text-zinc-900"
                >
                  ← Return to Live Reactive Mood
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Health Score Ring widget */}
          <div className="flex items-center justify-center">
            <HealthScoreRing metrics={effectiveMetrics} size={160} />
          </div>
        </div>
      </div>

      {/* Mascot Gallery Modal */}
      <AnimatePresence>
        {showMascotGallery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[32px] p-6 max-w-2xl w-full border border-black/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 border-b border-black/10">
                <div>
                  <h3 className="text-xl font-bold font-display text-zinc-900">
                    The 12 Mood Mascots
                  </h3>
                  <p className="text-xs text-zinc-500">
                    These animated characters react live to your balance, burn rate, and financial risks.
                  </p>
                </div>
                <button
                  onClick={() => setShowMascotGallery(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 p-4 overflow-y-auto">
                {allMoods.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setPreviewMood(m)
                      setShowMascotGallery(false)
                    }}
                    className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${
                      activeMood === m
                        ? 'border-zinc-900 bg-zinc-100 shadow-sm'
                        : 'border-black/5 hover:border-black/20 bg-zinc-50/50'
                    }`}
                  >
                    <Mascot mood={m} size={70} />
                    <span className="text-xs font-bold text-zinc-800 mt-2 capitalize">
                      {m}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-black/10 text-center">
                <button
                  onClick={() => setShowMascotGallery(false)}
                  className="px-5 py-2 rounded-full bg-zinc-900 text-white text-xs font-bold"
                >
                  Close Gallery
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
