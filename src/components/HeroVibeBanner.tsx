import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useFinance } from '../context/useFinance'
import { Mascot } from './Mascot'
import { MASCOT_METADATA } from '../data/mascotData'
import { HealthScoreRing } from './HealthScoreRing'
import { MascotMood } from '../types/finance'

const MOODS_SEQUENCE: MascotMood[] = [
  'excited',
  'joyful',
  'grateful',
  'stressed',
  'angry',
  'hurt',
]

export const HeroVibeBanner: React.FC = () => {
  const { effectiveMetrics, simulation } = useFinance()
  const liveMood = effectiveMetrics.mascotMood

  // Start at user's current live mood
  const initialIndex = Math.max(0, MOODS_SEQUENCE.indexOf(liveMood))
  const [moodIndex, setMoodIndex] = useState(initialIndex)

  // Smooth automatic mood morphing (transitions naturally on its own every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setMoodIndex((prev) => (prev + 1) % MOODS_SEQUENCE.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  // Sync to live mood if live mood undergoes a major shift
  useEffect(() => {
    const idx = MOODS_SEQUENCE.indexOf(liveMood)
    if (idx !== -1) {
      const timer = setTimeout(() => {
        setMoodIndex(idx)
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [liveMood])

  const activeMood = MOODS_SEQUENCE[moodIndex] ?? 'joyful'
  const isCurrentLive = activeMood === liveMood
  const meta = MASCOT_METADATA[activeMood] ?? MASCOT_METADATA.joyful

  const handleMascotTap = () => {
    setMoodIndex((prev) => (prev + 1) % MOODS_SEQUENCE.length)
  }

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
        className="relative overflow-hidden border transition-colors duration-700"
        style={{
          background: meta.bg,
          borderColor: 'var(--border-soft)',
          borderRadius: 28,
          boxShadow: 'var(--shadow-card)',
        }}
        animate={{ backgroundColor: meta.bg }}
        transition={{ duration: 0.7 }}
      >
        <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" />

        <div className="relative z-10 p-4 sm:p-6 flex flex-col gap-4 md:flex-row md:items-center">
          {/* Living mascot area - completely organic with zero carousel clutter */}
          <div className="flex md:flex-col items-center gap-2.5 shrink-0">
            {/* Squircle Mascot container */}
            <div
              className="relative w-[104px] h-[104px] sm:w-[124px] sm:h-[124px] rounded-[28px] bg-white/95 border border-black/5 flex items-center justify-center overflow-hidden cursor-pointer group shadow-xs"
              onClick={handleMascotTap}
              title="Living mascot — tap to cycle expression"
            >
              <div className="absolute inset-0 dot-grid opacity-60" />
              <Mascot mood={activeMood} size={92} className="relative group-hover:scale-105 transition-transform" />
            </div>

            {/* Seamless current mood indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-black/8 shadow-2xs text-[11.5px] font-black text-zinc-800">
              <span className="w-2 h-2 rounded-full shrink-0 animate-pulse" style={{ background: meta.color }} />
              <span className="capitalize">{meta.label}</span>
              {isCurrentLive && (
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-extrabold uppercase tracking-wide">
                  Live
                </span>
              )}
            </div>
          </div>

          {/* Copy & Vibe Statements */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1.5 flex-wrap mb-2.5">
              <span className="pill !bg-white/90">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: meta.color }} />
                {meta.label} {isCurrentLive ? '(Current)' : '(Preview)'}
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

            <AnimatePresence mode="wait">
              <motion.h2
                key={activeMood + 'vibe'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="font-display font-black text-balance leading-[1.08] text-zinc-900"
                style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.2rem)' }}
              >
                {meta.vibe}
              </motion.h2>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeMood + 'quip'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="mt-2.5 inline-flex items-start gap-2.5 px-4 py-3 rounded-2xl bg-white/95 border border-black/5 text-left w-full md:max-w-[560px] shadow-xs"
              >
                <span className="shrink-0 text-base">💡</span>
                <p className="text-[13px] leading-relaxed min-w-0" style={{ color: 'var(--text-2)' }}>
                  <strong style={{ color: 'var(--text-1)' }}>Vibe check — </strong>
                  {isCurrentLive ? effectiveMetrics.quip : meta.genZQuip}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Health ring */}
          <div className="shrink-0 flex justify-center md:justify-end">
            <HealthScoreRing metrics={effectiveMetrics} size={110} />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
