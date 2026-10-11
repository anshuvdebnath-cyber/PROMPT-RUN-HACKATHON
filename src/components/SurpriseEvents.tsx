import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Dice5, X } from 'lucide-react'
import { useFinance } from '../context/useFinance'
import { RANDOM_SURPRISE_EVENTS } from '../data/mockData'
import { UnexpectedEvent } from '../types/finance'

export const SurpriseEvents: React.FC = () => {
  const { triggerSurpriseEvent } = useFinance()
  const [activeEvent, setActiveEvent] = useState<UnexpectedEvent | null>(null)

  const handleRollDice = () => {
    const randomIndex = Math.floor(Math.random() * RANDOM_SURPRISE_EVENTS.length)
    const event = RANDOM_SURPRISE_EVENTS[randomIndex]
    setActiveEvent(event)
  }

  const handleApplyEvent = () => {
    if (!activeEvent) return
    triggerSurpriseEvent(activeEvent)
    setActiveEvent(null)
  }

  return (
    <div className="card p-4 sm:p-5 flex flex-col justify-between h-full min-w-0" style={{ background: 'var(--canvas-card)' }}>
      <div className="min-w-0">
        <div className="flex flex-col min-[480px]:flex-row min-[480px]:items-center gap-2.5 justify-between pb-3.5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
              <Zap size={18} />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-extrabold font-display text-zinc-900 leading-tight">
                Surprise Events
              </h3>
              <p className="text-[11px] sm:text-xs text-zinc-500 font-medium">
                Random curveballs to test resilience.
              </p>
            </div>
          </div>

          <button
            onClick={handleRollDice}
            className="w-full min-[480px]:w-auto px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
          >
            <Dice5 size={14} className="text-amber-400" />
            <span>Draw Event</span>
          </button>
        </div>

        {/* Preset Events Row */}
        <div className="mt-4 space-y-2.5">
          {RANDOM_SURPRISE_EVENTS.slice(0, 3).map((ev) => (
            <div
              key={ev.id}
              className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between ${
                ev.amount < 0
                  ? 'bg-rose-50/70 border-rose-200'
                  : 'bg-emerald-50/70 border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-zinc-900 truncate">
                  {ev.title}
                </span>
                <span
                  className={`text-xs font-extrabold font-display ${
                    ev.amount < 0 ? 'text-rose-700' : 'text-emerald-700'
                  }`}
                >
                  {ev.amount < 0 ? '-' : '+'}₹{Math.abs(ev.amount)}
                </span>
              </div>
              <p className="text-[11px] text-zinc-600 line-clamp-2 mt-1 font-medium">
                {ev.description}
              </p>

              <button
                onClick={() => triggerSurpriseEvent(ev)}
                className="mt-3 w-full py-1.5 text-[11px] font-extrabold rounded-xl bg-white hover:bg-zinc-50 text-zinc-800 border border-black/10 transition-all text-center cursor-pointer shadow-2xs"
              >
                Trigger This Event
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Rolled Event Modal / Overlay */}
      <AnimatePresence>
        {activeEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[32px] p-6 max-w-md w-full border border-black/10 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-black/8">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{activeEvent.amount < 0 ? '💥' : '🎉'}</span>
                  <h4 className="text-lg font-extrabold font-display text-zinc-900">
                    Curveball Drawn!
                  </h4>
                </div>
                <button
                  onClick={() => setActiveEvent(null)}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold flex items-center justify-center cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="my-5 p-4 rounded-2xl bg-[#FAF7F2] border border-black/6">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                  {activeEvent.category}
                </span>
                <h5 className="text-base font-extrabold text-zinc-900 mt-1">
                  {activeEvent.title}
                </h5>
                <p className="text-xs text-zinc-600 mt-1.5 font-medium leading-relaxed">
                  {activeEvent.description}
                </p>
                <div className="mt-3">
                  <span
                    className={`text-xl font-extrabold font-display ${
                      activeEvent.amount < 0 ? 'text-rose-600' : 'text-emerald-600'
                    }`}
                  >
                    {activeEvent.amount < 0 ? '-' : '+'}₹{Math.abs(activeEvent.amount)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  onClick={() => setActiveEvent(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-100 cursor-pointer"
                >
                  Skip
                </button>
                <button
                  onClick={handleApplyEvent}
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-extrabold shadow-sm cursor-pointer"
                >
                  Apply Impact to Budget
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
