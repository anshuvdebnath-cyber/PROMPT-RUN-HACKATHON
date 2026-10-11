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
    <section className="w-full my-5" aria-label="Hero financial vibe status">
      <div
        className="relative overflow-hidden rounded-[32px] p-6 sm:p-8 border border-black/8 shadow-card transition-colors duration-500"
        style={{
          backgroundColor: activeMeta.bg,
        }}
      >
        {/* Subtle patterned accent background */}
        <div className="absolute inset-0 hatched-pattern opacity-25 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Left Column: Mascot & Emotional State */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 flex-1 min-w-0">
            <div className="relative shrink-0 group">
              <Mascot
                mood={activeMood}
                size={105}
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setShowMascotGallery(true)}
              />
              <button
                onClick={() => setShowMascotGallery(true)}
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-white text-zinc-900 border border-black/10 shadow-xs hover:bg-zinc-100 flex items-center gap-1 whitespace-nowrap cursor-pointer"
                title="Explore all 12 mood expressions"
              >
                <Grid size={11} />
                <span>12 Moods</span>
              </button>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap mb-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white text-zinc-900 border border-black/8 shadow-2xs flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: activeMeta.color }}
                  />
                  Mood: {activeMeta.label}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider border shadow-2xs ${
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
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-amber-300 text-amber-950 border border-amber-400 flex items-center gap-1">
                    <Sparkles size={11} />
                    Simulation Active
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-zinc-900 font-display tracking-tight leading-snug">
                {activeMeta.vibe}
              </h2>

              <div className="mt-2.5">
                <p className="text-xs sm:text-sm text-zinc-700 font-medium leading-relaxed bg-white/90 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-black/6 inline-block shadow-2xs">
                  💡 <span className="font-extrabold text-zinc-900">Fin-Vibe Check:</span> {effectiveMetrics.quip}
                </p>
              </div>

              {previewMood && (
                <button
                  onClick={() => setPreviewMood(null)}
                  className="block mt-2 text-xs font-bold text-zinc-600 underline hover:text-zinc-900 cursor-pointer"
                >
                  ← Return to Live Reactive Mood
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Health Score Ring widget */}
          <div className="shrink-0 flex items-center justify-center">
            <HealthScoreRing metrics={effectiveMetrics} size={145} />
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
                    The 12 Reactive Mood Mascots
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Click any mood to test how the squircle mascot and vibe react live!
                  </p>
                </div>
                <button
                  onClick={() => setShowMascotGallery(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold flex items-center justify-center cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3.5 p-4 overflow-y-auto">
                {allMoods.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setPreviewMood(m)
                      setShowMascotGallery(false)
                    }}
                    className={`flex flex-col items-center p-3 rounded-2xl border transition-all cursor-pointer ${
                      activeMood === m
                        ? 'border-zinc-900 bg-zinc-100 shadow-sm'
                        : 'border-black/5 hover:border-black/20 bg-zinc-50/50 hover:bg-zinc-50'
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
                  className="px-6 py-2 rounded-full bg-zinc-900 text-white text-xs font-bold cursor-pointer hover:bg-zinc-800"
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
