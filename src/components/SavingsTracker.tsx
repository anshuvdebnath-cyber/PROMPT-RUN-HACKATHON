import React from 'react'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { useFinance } from '../context/useFinance'

export const SavingsTracker: React.FC = () => {
  const { savingsGoals, depositToSavings, effectiveMetrics } = useFinance()

  return (
    <div className="neo-card p-6 bg-white border border-black/10">
      <div className="flex items-center justify-between pb-3 border-b border-black/5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Shield size={18} />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-zinc-900">
              Savings & Emergency Shield
            </h3>
            <p className="text-xs text-zinc-500">
              Lock funds into an emergency buffer to shield against unexpected shocks.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
          Buffer Stash
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {savingsGoals.map((goal) => {
          const progress = Math.min(
            100,
            Math.round((goal.currentAmount / goal.targetAmount) * 100)
          )

          return (
            <div
              key={goal.id}
              className="p-4 rounded-2xl bg-[#FAF7F2] border border-black/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-zinc-900">{goal.title}</h4>
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

              {/* Quick Deposit Button */}
              <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between gap-2">
                <span className="text-[11px] text-zinc-500 font-medium">
                  Stash from balance:
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => depositToSavings(goal.id, 100)}
                    disabled={effectiveMetrics.currentBalance < 100}
                    className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-black/10 hover:bg-zinc-100 disabled:opacity-50 text-zinc-800"
                  >
                    +₹100
                  </button>
                  <button
                    onClick={() => depositToSavings(goal.id, 250)}
                    disabled={effectiveMetrics.currentBalance < 250}
                    className="px-2.5 py-1 text-xs font-bold rounded-lg bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-white shadow-xs"
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
  )
}
