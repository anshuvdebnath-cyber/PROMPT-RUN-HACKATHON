import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Grid, X } from 'lucide-react'
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
  const activeMeta = MASCOT_METADATA[activeMood] || MASCOT_METADATA.joyful

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
    <section className="w-full" aria-label="Hero financial vibe status">
      <div
        className="relative overflow-hidden rounded-[36px] p-7 sm:p-9 border border-black/8 shadow-card transition-colors duration-500"
        style={{
          backgroundColor: activeMeta.bg,
        }}
      >
        {/* Subtle patterned background */}
        <div className="absolute inset-0 hatched-pattern opacity-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Column: Mascot & Dialogue */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 flex-1 min-w-0">
            <div className="relative shrink-0 group flex flex-col items-center">
              <Mascot
                mood={activeMood}
                size={120}
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setShowMascotGallery(true)}
              />
              <button
                onClick={() => setShowMascotGallery(true)}
                className="mt-2 px-3 py-1 rounded-full text-[11px] font-extrabold bg-white text-zinc-900 border border-black/10 shadow-2xs hover:bg-zinc-100 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                title="Preview all 12 mood expressions"
              >
                <Grid size={12} />
                <span>12 Moods</span>
              </button>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap mb-2.5">
                <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-white text-zinc-900 border border-black/8 shadow-2xs flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: activeMeta.color }}
                  />
                  Mood: {activeMeta.label}
                </span>

                <span
                  className={`px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border shadow-2xs ${
                    effectiveMetrics.riskLevel === 'Safe'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : effectiveMetrics.riskLevel === 'Moderate'
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-rose-100 text-rose-800 border-rose-300'
                  }`}
                >
                  {effectiveMetrics.riskLevel} Risk
                </span>

                {simulation.isActive && (
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-300 text-amber-950 border border-amber-400 flex items-center gap-1 shadow-2xs">
                    <Sparkles size={12} />
                    Simulation Active
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 font-display tracking-tight leading-tight">
                {activeMeta.vibe}
              </h2>

              <div className="mt-3.5">
                <p className="text-xs sm:text-sm text-zinc-800 font-medium leading-relaxed bg-white/95 backdrop-blur-xs px-5 py-3 rounded-2xl border border-black/8 inline-block shadow-2xs">
                  💡 <span className="font-extrabold text-zinc-900">Fin-Vibe Check:</span> {effectiveMetrics.quip}
                </p>
              </div>

              {previewMood && (
                <button
                  onClick={() => setPreviewMood(null)}
                  className="block mt-2.5 text-xs font-bold text-zinc-600 underline hover:text-zinc-900 cursor-pointer"
                >
                  ← Return to Live Reactive Mood
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Health Score Ring widget */}
          <div className="shrink-0 flex items-center justify-center">
            <HealthScoreRing metrics={effectiveMetrics} size={155} />
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
              className="bg-white rounded-[36px] p-7 max-w-2xl w-full border border-black/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <div>
                  <h3 className="text-2xl font-bold font-display text-zinc-900">
                    The 12 Mood Mascots
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    Click any character to preview how the squircle mascot and vibe react live!
                  </p>
                </div>
                <button
                  onClick={() => setShowMascotGallery(false)}
                  className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold flex items-center justify-center cursor-pointer"
                >
                  <X size={18} />
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
                    className={`flex flex-col items-center p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      activeMood === m
                        ? 'border-zinc-900 bg-zinc-100 shadow-sm'
                        : 'border-black/5 hover:border-black/20 bg-zinc-50/50 hover:bg-zinc-50'
                    }`}
                  >
                    <Mascot mood={m} size={75} />
                    <span className="text-xs font-extrabold text-zinc-800 mt-2 capitalize">
                      {m}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-black/10 text-center">
                <button
                  onClick={() => setShowMascotGallery(false)}
                  className="px-6 py-2.5 rounded-full bg-zinc-900 text-white text-xs font-extrabold cursor-pointer hover:bg-zinc-800"
                >
                  Close Gallery
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
