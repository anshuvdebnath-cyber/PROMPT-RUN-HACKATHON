import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, LayoutGrid, X } from 'lucide-react'
import { useFinance } from '../context/useFinance'
import { Mascot } from './Mascot'
import { MASCOT_METADATA } from '../data/mascotData'
import { HealthScoreRing } from './HealthScoreRing'
import { MascotMood } from '../types/finance'

const ALL_MOODS: MascotMood[] = [
  'excited', 'joyful', 'grateful', 'energized',
  'sensitive', 'confused', 'bored', 'stressed',
  'angry', 'insecure', 'hurt', 'guilty',
]

export const HeroVibeBanner: React.FC = () => {
  const { effectiveMetrics, simulation } = useFinance()
  const [showGallery, setShowGallery] = useState(false)
  const [previewMood, setPreviewMood] = useState<MascotMood | null>(null)

  const activeMood = previewMood ?? effectiveMetrics.mascotMood
  const meta       = MASCOT_METADATA[activeMood] ?? MASCOT_METADATA.joyful

  return (
    <section aria-label="Financial vibe status">
      {/* ── Hero card ───────────────────────────────────────────────────── */}
      <motion.div
        layout
        className="relative overflow-hidden rounded-[var(--r-2xl)] border"
        style={{
          background: meta.bg,
          borderColor: 'var(--border)',
          boxShadow: 'var(--shadow-md)',
          minHeight: 220,
        }}
        animate={{ backgroundColor: meta.bg }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        {/* Subtle texture */}
        <div className="hatched-pattern absolute inset-0 opacity-30 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-stretch gap-6 p-7 sm:p-10">

          {/* Left: Mascot */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="relative">
              {/* Ambient glow ring */}
              <div
                className="absolute inset-0 rounded-full scale-110 opacity-30 blur-2xl"
                style={{ background: meta.color }}
              />
              <Mascot
                mood={activeMood}
                size={140}
                className="relative cursor-pointer"
                onClick={() => setShowGallery(true)}
              />
            </div>
            <button
              onClick={() => setShowGallery(true)}
              className="pill cursor-pointer hover:scale-105 transition-transform"
              style={{ background: 'rgba(255,255,255,0.9)', borderColor: 'var(--border)' }}
            >
              <LayoutGrid size={11} />
              12 Moods
            </button>
          </div>

          {/* Center: Vibe info */}
          <div className="flex-1 flex flex-col justify-center text-center lg:text-left min-w-0">
            {/* Status pills */}
            <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap mb-4">
              <span
                className="pill"
                style={{ background: 'rgba(255,255,255,0.9)', borderColor: 'var(--border)' }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: meta.color }}
                />
                {meta.label}
              </span>

              <span
                className={`pill ${
                  effectiveMetrics.riskLevel === 'Safe'
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                    : effectiveMetrics.riskLevel === 'Moderate'
                    ? 'bg-amber-100 border-amber-300 text-amber-800'
                    : 'bg-rose-100 border-rose-300 text-rose-800'
                }`}
              >
                {effectiveMetrics.riskLevel} Risk
              </span>

              {simulation.isActive && (
                <span
                  className="pill animate-pulse"
                  style={{ background: '#FFF176', borderColor: '#F5C842', color: '#7A5E00' }}
                >
                  <Sparkles size={11} />
                  Simulation Active
                </span>
              )}
            </div>

            {/* Big vibe headline */}
            <motion.h2
              key={activeMood + 'vibe'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-display font-extrabold tracking-tight leading-tight mb-4"
              style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)',
                color: 'var(--text-1)',
              }}
            >
              {meta.vibe}
            </motion.h2>

            {/* Quip */}
            <motion.div
              key={activeMood + 'quip'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-start gap-2 px-5 py-3.5 rounded-2xl text-sm font-medium leading-snug"
              style={{
                background: 'rgba(255,255,255,0.88)',
                border: '1px solid var(--border)',
                color: 'var(--text-1)',
                maxWidth: 520,
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="shrink-0">💡</span>
              <span>
                <strong>Fin-Vibe Check:</strong> {effectiveMetrics.quip}
              </span>
            </motion.div>

            {previewMood && (
              <button
                onClick={() => setPreviewMood(null)}
                className="mt-3 text-xs font-bold underline cursor-pointer self-center lg:self-start"
                style={{ color: 'var(--text-2)' }}
              >
                ← Back to live mood
              </button>
            )}
          </div>

          {/* Right: Health Ring */}
          <div className="shrink-0 flex items-center justify-center">
            <HealthScoreRing metrics={effectiveMetrics} size={160} />
          </div>
        </div>
      </motion.div>

      {/* ── Mood Gallery Modal ──────────────────────────────────────────── */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}
            onClick={() => setShowGallery(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1,    opacity: 1, y: 0 }}
              exit={{ scale: 0.92,    opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="bg-white rounded-[var(--r-2xl)] w-full max-w-xl border overflow-hidden flex flex-col"
              style={{
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow-lg)',
                maxHeight: '88vh',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-7 py-5 border-b"
                style={{ borderColor: 'var(--border)' }}
              >
                <div>
                  <h3 className="font-display text-xl font-bold" style={{ color: 'var(--text-1)' }}>
                    The 12 Mood Mascots
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>
                    Click any mood to preview the squircle reaction live
                  </p>
                </div>
                <button
                  onClick={() => setShowGallery(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                  style={{ background: 'var(--canvas-inset)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
                  aria-label="Close gallery"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-4 gap-3 p-6 overflow-y-auto">
                {ALL_MOODS.map((m) => {
                  const mMeta = MASCOT_METADATA[m]
                  return (
                    <button
                      key={m}
                      onClick={() => {
                        setPreviewMood(m)
                        setShowGallery(false)
                      }}
                      className="flex flex-col items-center gap-2 p-3 rounded-2xl border cursor-pointer transition-all hover:scale-105 group"
                      style={{
                        background: activeMood === m ? mMeta?.bg ?? '#f5f5f5' : 'var(--canvas-inset)',
                        borderColor: activeMood === m ? 'var(--border-strong)' : 'var(--border)',
                        boxShadow: activeMood === m ? 'var(--shadow-sm)' : 'none',
                      }}
                    >
                      <Mascot mood={m} size={64} />
                      <span className="text-[11px] font-bold capitalize" style={{ color: 'var(--text-1)' }}>
                        {m}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t text-center" style={{ borderColor: 'var(--border)' }}>
                <button
                  onClick={() => setShowGallery(false)}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer hover:opacity-90 transition"
                  style={{ background: '#1A1A1A', color: '#fff' }}
                >
                  Close Gallery
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
