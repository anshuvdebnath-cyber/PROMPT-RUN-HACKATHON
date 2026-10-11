import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Images, X, ArrowLeft } from 'lucide-react'
import { useFinance } from '../context/useFinance'
import { Mascot } from './Mascot'
import { MASCOT_METADATA } from '../data/mascotData'
import { HealthScoreRing } from './HealthScoreRing'
import { MascotMood } from '../types/finance'

const ALL_MOODS: MascotMood[] = [
  'excited', 'joyful', 'grateful',
  'stressed', 'angry', 'hurt',
]

export const HeroVibeBanner: React.FC = () => {
  const { effectiveMetrics, simulation } = useFinance()
  const [showGallery, setShowGallery] = useState(false)
  const [previewMood, setPreviewMood] = useState<MascotMood | null>(null)

  const activeMood = previewMood ?? effectiveMetrics.mascotMood
  const meta = MASCOT_METADATA[activeMood] ?? MASCOT_METADATA.joyful

  // A gallery preview is a momentary peek — snap back to the live mood as
  // soon as real spending changes, so the mascot always tracks the ledger.
  const liveFingerprint = `${effectiveMetrics.currentBalance}:${effectiveMetrics.score}:${effectiveMetrics.riskLevel}`
  useEffect(() => {
    setPreviewMood(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveFingerprint])

  const riskStyle =
    effectiveMetrics.riskLevel === 'Safe'
      ? { bg: '#D9F5E5', fg: '#065F46' }
      : effectiveMetrics.riskLevel === 'Moderate'
        ? { bg: '#FFF3C4', fg: '#854D0E' }
        : { bg: '#FFE4E6', fg: '#9F1239' }

  return (
    <section aria-label="Financial vibe status">
      <motion.div
        layout
        className="relative overflow-hidden border"
        style={{ background: meta.bg, borderColor: 'var(--border-soft)', borderRadius: 28, boxShadow: 'var(--shadow-card)' }}
        animate={{ backgroundColor: meta.bg }}
        transition={{ duration: 0.5 }}
      >
        <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" />

        <div className="relative z-10 p-4 sm:p-6 flex flex-col gap-4 md:flex-row md:items-center">
          {/* Mascot blob */}
          <div className="flex md:flex-col items-center gap-3 shrink-0">
            <div className="relative w-[104px] h-[104px] sm:w-[124px] sm:h-[124px] rounded-[28px] bg-white/90 border border-black/5 flex items-center justify-center overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
              <div className="absolute inset-0 dot-grid opacity-60" />
              <Mascot mood={activeMood} size={92} className="relative cursor-pointer" onClick={() => setShowGallery(true)} />
            </div>
            <button
              onClick={() => setShowGallery(true)}
              className="pill cursor-pointer hover:scale-105 transition-transform !bg-white/90"
            >
              <Images size={12} /> 6 moods
            </button>
          </div>

          {/* Copy */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1.5 flex-wrap mb-2.5">
              <span className="pill !bg-white/90">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: meta.color }} />
                {meta.label}
              </span>
              <span className="pill !border-transparent" style={{ background: riskStyle.bg, color: riskStyle.fg }}>
                {effectiveMetrics.riskLevel} risk
              </span>
              {simulation.isActive && (
                <span className="pill animate-pulse !border-transparent" style={{ background: '#221C15', color: '#FDE68A' }}>
                  <Sparkles size={11} /> Sandbox on
                </span>
              )}
            </div>

            <motion.h2
              key={activeMood + 'vibe'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-bold text-balance leading-[1.08]"
              style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.2rem)' }}
            >
              {meta.vibe}
            </motion.h2>

            <div className="mt-2.5 inline-flex items-start gap-2 px-4 py-3 rounded-2xl bg-white/90 border border-black/5 text-left w-full md:max-w-[560px]" style={{ boxShadow: 'var(--shadow-card)' }}>
              <span className="shrink-0 text-base">💡</span>
              <p className="text-[13px] leading-relaxed min-w-0" style={{ color: 'var(--text-2)' }}>
                <strong style={{ color: 'var(--text-1)' }}>Vibe check — </strong>{effectiveMetrics.quip}
              </p>
            </div>

            {previewMood && (
              <button onClick={() => setPreviewMood(null)} className="mt-2 inline-flex items-center gap-1 text-xs font-bold underline cursor-pointer" style={{ color: 'var(--text-2)' }}>
                <ArrowLeft size={12} /> Back to live mood
              </button>
            )}
          </div>

          {/* Health ring */}
          <div className="shrink-0 flex justify-center md:justify-end">
            <HealthScoreRing metrics={effectiveMetrics} size={110} />
          </div>
        </div>
      </motion.div>

      {/* Gallery modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(34,28,21,0.45)', backdropFilter: 'blur(6px)' }}
            onClick={() => setShowGallery(false)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 14, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 14, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 360, damping: 30 }}
              className="bg-white rounded-[28px] w-full max-w-xl border overflow-hidden flex flex-col"
              style={{ borderColor: 'var(--border-soft)', boxShadow: 'var(--shadow-pop)', maxHeight: '86vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-black/5">
                <div>
                  <h3 className="font-display text-lg font-bold">Mood mascots</h3>
                  <p className="text-xs" style={{ color: 'var(--text-3)' }}>Tap one to preview it live</p>
                </div>
                <button onClick={() => setShowGallery(false)} className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors bg-black/5" aria-label="Close gallery">
                  <X size={16} />
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-4 overflow-y-auto">
                {ALL_MOODS.map((m) => {
                  const mMeta = MASCOT_METADATA[m]
                  const selected = activeMood === m
                  return (
                    <button
                      key={m}
                      onClick={() => { setPreviewMood(m); setShowGallery(false) }}
                      className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.04]"
                      style={{
                        background: selected ? mMeta?.bg : 'var(--canvas)',
                        borderColor: selected ? 'var(--ink)' : 'var(--border-soft)',
                      }}
                    >
                      <Mascot mood={m} size={56} />
                      <span className="text-[11px] font-bold capitalize">{m}</span>
                    </button>
                  )
                })}
              </div>
              <div className="px-4 py-3 border-t border-black/5 text-center">
                <button onClick={() => setShowGallery(false)} className="px-6 py-2.5 rounded-2xl font-bold text-sm text-white cursor-pointer" style={{ background: 'var(--ink)' }}>
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
