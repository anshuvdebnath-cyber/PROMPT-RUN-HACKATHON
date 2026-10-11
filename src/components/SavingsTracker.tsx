import React from 'react'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { useFinance } from '../context/useFinance'

export const SavingsTracker: React.FC = () => {
  const { savingsGoals, depositToSavings, effectiveMetrics } = useFinance()

  return (
    <div className="card p-6 sm:p-7 flex flex-col justify-between h-full" style={{ background: 'var(--canvas-card)' }}>
      <div>
        <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-2xs">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="text-xl font-extrabold font-display text-zinc-900">
                Savings & Emergency Shield
              </h3>
              <p className="text-xs text-zinc-500 font-medium">
                Emergency buffer to absorb curveballs.
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-950 border border-emerald-200">
            Buffer Stash
          </span>
        </div>

        <div className="mt-5 space-y-4">
          {savingsGoals.map((goal) => {
            const progress = Math.min(
              100,
              Math.round((goal.currentAmount / goal.targetAmount) * 100)
            )

            return (
              <div
                key={goal.id}
                className="p-4 rounded-2xl bg-[#FAF7F2] border border-black/6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-extrabold text-zinc-900">{goal.title}</h4>
                    <span className="text-xs font-extrabold text-emerald-800">
                      {progress}%
                    </span>
                  </div>

                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-xl font-extrabold font-display text-zinc-900">
                      ₹{goal.currentAmount}
                    </span>
                    <span className="text-xs text-zinc-500 font-semibold">
                      / ₹{goal.targetAmount} target
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-zinc-200 h-2.5 rounded-full mt-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: goal.color }}
                    />
                  </div>
                </div>

                {/* Quick Deposit Buttons */}
                <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-zinc-500 font-semibold">
                    Stash from liquid:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => depositToSavings(goal.id, 100)}
                      disabled={effectiveMetrics.currentBalance < 100}
                      className="px-3 py-1.5 text-xs font-extrabold rounded-lg bg-white border border-black/10 hover:bg-zinc-100 disabled:opacity-50 text-zinc-800 shadow-2xs cursor-pointer"
                    >
                      +₹100
                    </button>
                    <button
                      onClick={() => depositToSavings(goal.id, 250)}
                      disabled={effectiveMetrics.currentBalance < 250}
                      className="px-3 py-1.5 text-xs font-extrabold rounded-lg bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-white shadow-2xs cursor-pointer"
                    >
                      +₹250
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
