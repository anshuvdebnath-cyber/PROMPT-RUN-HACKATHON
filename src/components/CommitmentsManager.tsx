import React from 'react'
import { CheckCircle2, Pause, Play, Lock } from 'lucide-react'
import { useFinance } from '../context/useFinance'

export const CommitmentsManager: React.FC = () => {
  const {
    commitments,
    subscriptions,
    toggleCommitmentPaid,
    toggleCommitmentPaused,
    toggleSubscriptionActive,
    currentDay,
    effectiveMetrics,
  } = useFinance()

  return (
    <div className="card p-4 sm:p-6 min-w-0" style={{ background: 'var(--canvas-card)' }}>
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-extrabold font-display text-zinc-900 leading-tight">
            Commitments & Subscriptions
          </h3>
          <p className="text-xs sm:text-[13px] text-zinc-500 font-medium">
            Fixed bills. Pause or pay to see live impact.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-extrabold bg-purple-100 text-purple-900 border border-purple-200 flex items-center gap-1.5 whitespace-nowrap">
            <Lock size={12} />
            <span>₹{effectiveMetrics.unpaidCommitmentsTotal.toLocaleString('en-IN')} Reserved</span>
          </span>
        </div>
      </div>

      {/* Fixed Commitments List */}
      <div className="mt-4">
        <span className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-wider block mb-2.5">
          Fixed Obligations
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
          {commitments.map((c) => (
            <div
              key={c.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                c.isPaid
                  ? 'bg-zinc-50 border-black/5 opacity-70'
                  : c.isPaused
                  ? 'bg-amber-50/60 border-amber-200'
                  : 'bg-[#FAF7F2] border-black/6 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4
                    className={`text-sm font-extrabold text-zinc-900 ${
                      c.isPaid ? 'line-through text-zinc-400' : ''
                    }`}
                  >
                    {c.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5 font-medium">
                    {c.description}
                  </p>
                </div>
                <span className="text-sm font-extrabold font-display text-zinc-900 whitespace-nowrap">
                  ₹{c.amount}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-zinc-500">
                  Due Day {c.dueDay} {currentDay >= c.dueDay && !c.isPaid ? '⚠️ OVERDUE' : ''}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleCommitmentPaused(c.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
                      c.isPaused
                        ? 'bg-amber-200 text-amber-900 hover:bg-amber-300'
                        : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-black/10'
                    }`}
                    title={c.isPaused ? 'Resume commitment' : 'Postpone / Pause'}
                  >
                    {c.isPaused ? <Play size={10} /> : <Pause size={10} />}
                    <span>{c.isPaused ? 'Paused' : 'Pause'}</span>
                  </button>

                  <button
                    onClick={() => toggleCommitmentPaid(c.id)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                      c.isPaid
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-2xs'
                    }`}
                  >
                    <CheckCircle2 size={12} />
                    <span>{c.isPaid ? 'Paid' : 'Mark Paid'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscriptions Section */}
      <div className="mt-5 pt-5 border-t border-black/10">
        <span className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-wider block mb-2.5">
          Subscriptions
        </span>
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {subscriptions.map((s) => (
            <div
              key={s.id}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                s.isActive
                  ? 'bg-[#FAF7F2] border-black/6 shadow-2xs'
                  : 'bg-zinc-50 border-black/5 opacity-60'
              }`}
            >
              <div>
                <span className="text-xs font-extrabold text-zinc-900 block truncate">
                  {s.name}
                </span>
                <span className="text-xs font-extrabold font-display text-zinc-800 block mt-0.5">
                  ₹{s.amount}/mo
                </span>
                <span className="text-[10px] text-zinc-400 font-semibold mt-1 block">
                  Renews D{s.renewalDay}
                </span>
              </div>

              <button
                onClick={() => toggleSubscriptionActive(s.id)}
                className={`mt-3 py-1 px-2.5 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer w-full text-center ${
                  s.isActive
                    ? 'bg-emerald-100 text-emerald-900 hover:bg-rose-100 hover:text-rose-900'
                    : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300'
                }`}
              >
                {s.isActive ? 'Active' : 'Cancelled'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
