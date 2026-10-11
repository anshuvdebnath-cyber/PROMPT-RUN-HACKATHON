import { CheckCircle2 } from 'lucide-react'
import { useFinance } from '../context/useFinance'

export const CommitmentsManager: React.FC = () => {
  const {
    commitments,
    subscriptions,
    toggleCommitmentPaid,
    toggleCommitmentPaused,
    toggleSubscriptionActive,
    currentDay,
  } = useFinance()

  return (
    <div className="neo-card p-6 bg-white border border-black/10">
      <div className="flex items-center justify-between pb-4 border-b border-black/5">
        <div>
          <h3 className="text-xl font-bold font-display text-zinc-900">
            Commitments & Subscriptions
          </h3>
          <p className="text-xs text-zinc-500">
            Fixed non-negotiables & recurring bills. Pause or pay them to see live impact.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-200">
          Protected Pool
        </span>
      </div>

      {/* Fixed Commitments List */}
      <div className="mt-4">
        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2.5">
          Fixed Obligations (Non-negotiables):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {commitments.map((c) => (
            <div
              key={c.id}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                c.isPaid
                  ? 'bg-zinc-50 border-black/5 opacity-70'
                  : c.isPaused
                  ? 'bg-amber-50/60 border-amber-200'
                  : 'bg-[#FAF7F2] border-black/10 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4
                    className={`text-sm font-bold text-zinc-900 ${
                      c.isPaid ? 'line-through text-zinc-400' : ''
                    }`}
                  >
                    {c.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                    {c.description}
                  </p>
                </div>
                <span className="text-sm font-extrabold font-display text-zinc-900 whitespace-nowrap">
                  ₹{c.amount}
                </span>
              </div>

              <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-500">
                  Due Day {c.dueDay} {currentDay >= c.dueDay && !c.isPaid ? '(OVERDUE)' : ''}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleCommitmentPaused(c.id)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      c.isPaused
                        ? 'bg-amber-200 text-amber-900 hover:bg-amber-300'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                    title={c.isPaused ? 'Resume commitment' : 'Postpone / Pause'}
                  >
                    {c.isPaused ? 'Paused' : 'Pause'}
                  </button>

                  <button
                    onClick={() => toggleCommitmentPaid(c.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
                      c.isPaid
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-zinc-900 text-white hover:bg-zinc-800'
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

      {/* Subscriptions Pills Grid */}
      <div className="mt-6">
        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2.5">
          Active Monthly Subscriptions:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {subscriptions.map((s) => (
            <div
              key={s.id}
              className={`p-3 rounded-2xl border transition-all flex flex-col justify-between ${
                s.isActive
                  ? 'bg-purple-50/70 border-purple-200'
                  : 'bg-zinc-100 border-black/5 opacity-60'
              }`}
            >
              <div>
                <span className="text-xs font-bold text-zinc-900 block truncate">
                  {s.name}
                </span>
                <span className="text-sm font-extrabold font-display text-zinc-800 block mt-0.5">
                  ₹{s.amount}/mo
                </span>
              </div>

              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-zinc-500">
                  Renews D{s.renewalDay}
                </span>
                <button
                  onClick={() => toggleSubscriptionActive(s.id)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                    s.isActive
                      ? 'bg-purple-200 text-purple-900 hover:bg-purple-300'
                      : 'bg-zinc-200 text-zinc-700'
                  }`}
                >
                  {s.isActive ? 'Active' : 'Paused'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
