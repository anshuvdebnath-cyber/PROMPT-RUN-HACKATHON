import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, AlertTriangle, Gift, Dice5, Check } from 'lucide-react'
import { useFinance } from '../context/useFinance'
import { RANDOM_SURPRISE_EVENTS } from '../data/mockData'
import { UnexpectedEvent } from '../types/finance'

export const SurpriseEvents: React.FC = () => {
  const { triggerSurpriseEvent } = useFinance()
  const [activeEvent, setActiveEvent] = useState<UnexpectedEvent | null>(null)

  const handleRollDice = () => {
    // Pick random event
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
    <div className="neo-card p-6 bg-white border border-black/10">
      <div className="flex items-center justify-between pb-3 border-b border-black/5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
            <Zap size={18} />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-zinc-900">
              Life Happens: Surprise Events
            </h3>
            <p className="text-xs text-zinc-500">
              Test your financial resilience against random real-world curveballs.
            </p>
          </div>
        </div>

        <button
          onClick={handleRollDice}
          className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Dice5 size={14} />
          <span>Draw Random Event</span>
        </button>
      </div>

      {/* Preset Events Row */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {RANDOM_SURPRISE_EVENTS.slice(0, 3).map((ev) => (
          <div
            key={ev.id}
            className={`p-3 rounded-2xl border text-left flex flex-col justify-between ${
              ev.amount < 0
                ? 'bg-rose-50/60 border-rose-200'
                : 'bg-emerald-50/60 border-emerald-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900 truncate">
                  {ev.title}
                </span>
                <span
                  className={`text-xs font-extrabold ${
                    ev.amount < 0 ? 'text-rose-700' : 'text-emerald-700'
                  }`}
                >
                  {ev.amount < 0 ? '-' : '+'}₹{Math.abs(ev.amount)}
                </span>
              </div>
              <p className="text-[11px] text-zinc-600 line-clamp-2 mt-1">
                {ev.description}
              </p>
            </div>

            <button
              onClick={() => triggerSurpriseEvent(ev)}
              className="mt-2.5 w-full py-1 text-[10px] font-bold rounded-lg bg-white/90 hover:bg-white text-zinc-800 border border-black/10 transition-all text-center"
            >
              Trigger This Event
            </button>
          </div>
        ))}
      </div>

      {/* Rolled Event Modal / Overlay */}
      <AnimatePresence>
        {activeEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[32px] p-6 max-w-md w-full border-2 border-black/10 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                {activeEvent.amount < 0 ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
                    <AlertTriangle size={11} /> Unexpected Expense Shock
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <Gift size={11} /> Sudden Cash Windfall
                  </span>
                )}
              </div>

              <h4 className="text-xl font-extrabold font-display text-zinc-900">
                {activeEvent.title}
              </h4>

              <div className="my-3 p-3 rounded-2xl bg-zinc-50 border border-black/5 text-sm text-zinc-700 font-medium">
                {activeEvent.description}
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-100/70">
                <span className="text-xs font-bold text-zinc-500">Financial Impact:</span>
                <span
                  className={`text-lg font-black font-display ${
                    activeEvent.amount < 0 ? 'text-rose-600' : 'text-emerald-600'
                  }`}
                >
                  {activeEvent.amount < 0 ? '-' : '+'}₹{Math.abs(activeEvent.amount)}
                </span>
              </div>

              <p className="mt-2 text-xs text-zinc-500 italic">
                {activeEvent.consequenceText}
              </p>

              <div className="flex items-center justify-end gap-2 mt-5">
                <button
                  onClick={() => setActiveEvent(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 bg-zinc-100 hover:bg-zinc-200"
                >
                  Skip
                </button>
                <button
                  onClick={handleApplyEvent}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 flex items-center gap-1"
                >
                  <Check size={14} />
                  <span>Apply to Wallet</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
