import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Grid, X } from 'lucide-react'
import { useFinance } from '../../context/useFinance'
import { Mascot } from '../Mascot'
import { MASCOT_METADATA } from '../../data/mascotData'
import { MascotMood } from '../../types/finance'

export const HeroVibeCard: React.FC = () => {
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
    <div
      className="relative overflow-hidden rounded-[32px] p-6 sm:p-7 border border-black/8 shadow-card transition-colors duration-500 my-4"
      style={{ backgroundColor: activeMeta.bg }}
    >
      <div className="absolute inset-0 hatched-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        {/* Mascot Column */}
        <div className="relative shrink-0 flex flex-col items-center">
          <Mascot
            mood={activeMood}
            size={95}
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setShowMascotGallery(true)}
          />
          <button
            onClick={() => setShowMascotGallery(true)}
            className="mt-1.5 px-3 py-0.5 rounded-full text-[10px] font-extrabold bg-white text-zinc-900 border border-black/10 shadow-2xs hover:bg-zinc-100 flex items-center gap-1 cursor-pointer"
          >
            <Grid size={11} />
            <span>12 Moods</span>
          </button>
        </div>

        {/* Content Column */}
        <div className="flex-1 min-w-0 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap mb-2">
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
              {effectiveMetrics.riskLevel}
            </span>

            {simulation.isActive && (
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-amber-300 text-amber-950 border border-amber-400 flex items-center gap-1">
                <Sparkles size={11} />
                Sandbox Active
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold font-display text-zinc-900 tracking-tight leading-snug">
            {activeMeta.vibe}
          </h3>

          <p className="text-xs sm:text-sm text-zinc-700 font-medium leading-relaxed bg-white/90 backdrop-blur-xs px-4 py-2 rounded-2xl border border-black/6 inline-block shadow-2xs mt-2.5">
            💡 <span className="font-extrabold text-zinc-900">Fin-Vibe Check:</span> {effectiveMetrics.quip}
          </p>

          {previewMood && (
            <button
              onClick={() => setPreviewMood(null)}
              className="block mt-2 text-xs font-bold text-zinc-600 underline hover:text-zinc-900 cursor-pointer"
            >
              ← Return to Reactive Mood
            </button>
          )}
        </div>
      </div>

      {/* Modal Gallery */}
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
                    Click any mood to preview how the squircle mascot and vibe react live!
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
    </div>
  )
}
