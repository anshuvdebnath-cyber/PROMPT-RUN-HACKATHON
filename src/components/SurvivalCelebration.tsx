import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Trophy, RotateCcw, AlertTriangle } from 'lucide-react'
import { useFinance } from '../context/useFinance'
import { Mascot } from './Mascot'

export const SurvivalCelebration: React.FC = () => {
  const { currentDay, effectiveMetrics, resetAll } = useFinance()

  const isMonthEnd = currentDay >= 30
  const isWinner = effectiveMetrics.currentBalance >= 0

  useEffect(() => {
    if (isMonthEnd && isWinner) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      })
    }
  }, [isMonthEnd, isWinner])

  if (!isMonthEnd) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          className="bg-white rounded-[36px] p-8 max-w-lg w-full border-2 border-black/10 shadow-2xl text-center relative overflow-hidden"
        >
          {isWinner ? (
            <div>
              <div className="flex justify-center mb-3">
                <Mascot mood="excited" size={120} />
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 uppercase tracking-wider inline-flex items-center gap-1.5 border border-emerald-300">
                <Trophy size={14} /> Mission Accomplished
              </span>

              <h3 className="text-3xl font-extrabold font-display text-zinc-900 mt-2">
                You Survived The Month!
              </h3>
              <p className="text-sm text-zinc-600 mt-1 max-w-sm mx-auto">
                Against all odds, random life shocks, and fixed bills, you crossed Day 30 with ₹{effectiveMetrics.currentBalance.toLocaleString('en-IN')} still in the bank!
              </p>

              <div className="grid grid-cols-3 gap-3 my-5 p-4 rounded-2xl bg-[#FAF7F2] border border-black/5">
                <div>
                  <span className="text-[11px] font-bold text-zinc-400 block uppercase">
                    Final Balance
                  </span>
                  <span className="text-lg font-extrabold text-emerald-700 font-display">
                    ₹{effectiveMetrics.currentBalance}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-zinc-400 block uppercase">
                    Health Score
                  </span>
                  <span className="text-lg font-extrabold text-zinc-900 font-display">
                    {effectiveMetrics.score}/100
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-zinc-400 block uppercase">
                    Grade
                  </span>
                  <span className="text-lg font-extrabold text-zinc-900 font-display">
                    {effectiveMetrics.grade}
                  </span>
                </div>
              </div>

              <button
                onClick={resetAll}
                className="w-full py-3 rounded-2xl bg-zinc-900 text-white font-bold text-sm hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <RotateCcw size={16} />
                <span>Play Again (Start Next Month)</span>
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-center mb-3">
                <Mascot mood="hurt" size={120} />
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-900 uppercase tracking-wider inline-flex items-center gap-1.5 border border-rose-300">
                <AlertTriangle size={14} /> Month Overdrafted
              </span>

              <h3 className="text-3xl font-extrabold font-display text-zinc-900 mt-2">
                Budget Ran Dry on Day {currentDay}
              </h3>
              <p className="text-sm text-zinc-600 mt-1 max-w-sm mx-auto">
                You hit a deficit of ₹{Math.abs(effectiveMetrics.currentBalance)}. Living on ₹10k is ruthless, but every failure is a lesson in cash flow.
              </p>

              <div className="my-5 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-left text-xs text-rose-900 space-y-1.5">
                <p className="font-bold">💡 Post-Mortem Tips for Next Time:</p>
                <p>• Lock your fixed rent share earlier before spending on food outings.</p>
                <p>• Use the What-If Simulator before committing to large weekend splashes.</p>
                <p>• Pause 1 or 2 subscriptions (gym or OTT) during tight weeks.</p>
              </div>

              <button
                onClick={resetAll}
                className="w-full py-3 rounded-2xl bg-zinc-900 text-white font-bold text-sm hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <RotateCcw size={16} />
                <span>Try Again from Day 1</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
