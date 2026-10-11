import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, TrendingDown, TrendingUp, Calendar, Tag, ArrowRight } from 'lucide-react'
import { useFinance } from '../context/useFinance'
import { TransactionCategory } from '../types/finance'
import { Mascot } from './Mascot'
import { getMoodForExpenseAmount } from '../engine/financeEngine'

interface QuickExpenseModalProps {
  isOpen: boolean
  onClose: () => void
}

const CATEGORIES: TransactionCategory[] = [
  'Food & Dining',
  'Transport & Commute',
  'Entertainment & Outings',
  'Bills & Utilities',
  'Shopping & Essentials',
  'Unexpected & Emergency',
  'Subscriptions',
  'Savings & Investments',
  'Side Gig / Inflow',
]

const QUICK_PRESETS = [
  { emoji: '☕', title: 'Chai & Samosa', amount: 45, category: 'Food & Dining' as TransactionCategory, type: 'expense' as const },
  { emoji: '🍱', title: 'College / Office Lunch', amount: 120, category: 'Food & Dining' as TransactionCategory, type: 'expense' as const },
  { emoji: '🚇', title: 'Metro / Auto Fare', amount: 60, category: 'Transport & Commute' as TransactionCategory, type: 'expense' as const },
  { emoji: '🛒', title: 'Quick Groceries & Snacks', amount: 240, category: 'Shopping & Essentials' as TransactionCategory, type: 'expense' as const },
  { emoji: '🍕', title: 'Evening Swiggy Order', amount: 280, category: 'Food & Dining' as TransactionCategory, type: 'expense' as const },
  { emoji: '💻', title: 'Freelance Design Gig', amount: 1500, category: 'Side Gig / Inflow' as TransactionCategory, type: 'income' as const },
]

export const QuickExpenseModal: React.FC<QuickExpenseModalProps> = ({ isOpen, onClose }) => {
  const { currentDay, effectiveMetrics, addTransaction } = useFinance()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState<number | ''>(120)
  const [category, setCategory] = useState<TransactionCategory>('Food & Dining')
  const [type, setType] = useState<'expense' | 'income'>('expense')
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const day = selectedDay ?? currentDay

  if (!isOpen) return null

  const numAmount = typeof amount === 'number' ? amount : 0
  const daysLeft = Math.max(1, 30 - day + 1)
  const projectedDailyShift = type === 'expense'
    ? Math.round(numAmount / daysLeft)
    : Math.round(numAmount / daysLeft)

  // Dynamic live mood reactive to the expense amount
  const reactiveMood = type === 'expense'
    ? getMoodForExpenseAmount(numAmount)
    : 'excited'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || numAmount <= 0) return

    addTransaction(title, numAmount, category, type, day)
    setTitle('')
    setAmount(120)
    onClose()
  }

  const handleApplyPreset = (p: typeof QUICK_PRESETS[0]) => {
    setTitle(p.title)
    setAmount(p.amount)
    setCategory(p.category)
    setType(p.type)
  }

  const handleQuickAdd = (delta: number) => {
    setAmount((prev) => Math.max(10, (typeof prev === 'number' ? prev : 0) + delta))
  }

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-xs overflow-y-auto"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-expense-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-7 max-w-lg w-full border border-black/10 shadow-2xl relative my-auto min-w-0"
          style={{ background: 'var(--canvas-card)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Persistent Morphing Mascot */}
          <div className="flex items-center justify-between pb-4 border-b border-black/8">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="shrink-0">
                <Mascot mood={reactiveMood} size={54} />
              </div>
              <div className="min-w-0">
                <h3 id="quick-expense-title" className="text-lg sm:text-xl font-extrabold font-display text-zinc-900 leading-tight truncate">
                  {type === 'expense' ? 'Log Daily Expense' : 'Log Cash Inflow'}
                </h3>
                <p className="text-xs font-semibold text-zinc-500 mt-0.5">
                  Day {day} of 30 · Daily Cap: ₹{effectiveMetrics.dynamicDailyAllowance}/day
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X size={17} />
            </button>
          </div>

          {/* Quick Presets Chips */}
          <div className="mt-4">
            <span className="text-[11px] font-extrabold uppercase tracking-wider block mb-2 text-zinc-400">
              ⚡ Quick Gen Z Presets
            </span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {QUICK_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="px-3 py-1.5 rounded-xl border text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all hover:scale-[1.03] cursor-pointer bg-white border-black/8 text-zinc-800 shadow-2xs"
                >
                  <span>{p.emoji}</span>
                  <span>{p.title}</span>
                  <span className={`font-extrabold ${p.type === 'income' ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {p.type === 'income' ? '+' : '-'}₹{p.amount}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            {/* Type selector toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-black/5">
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  type === 'expense'
                    ? 'bg-white text-rose-900 shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <TrendingDown size={14} className={type === 'expense' ? 'text-rose-600' : ''} />
                <span>Expense (-)</span>
              </button>
              <button
                type="button"
                onClick={() => setType('income')}
                className={`py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  type === 'income'
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <TrendingUp size={14} className={type === 'income' ? 'text-emerald-600' : ''} />
                <span>Side Gig / Inflow (+)</span>
              </button>
            </div>

            {/* Description & Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-7">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 block mb-1">
                  What did you spend on?
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chai, Auto ride, Dinner, Stationery"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-zinc-900 shadow-2xs"
                />
              </div>

              <div className="sm:col-span-5">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 block mb-1">
                  Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-extrabold text-xs text-zinc-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    required
                    min={1}
                    max={10000}
                    step={5}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2.5 rounded-xl text-xs font-extrabold bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-zinc-900 shadow-2xs"
                  />
                </div>
              </div>
            </div>

            {/* Quick amount adder buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-zinc-400 mr-1">Quick add:</span>
              {[20, 50, 100, 200, 500].map((delta) => (
                <button
                  key={delta}
                  type="button"
                  onClick={() => handleQuickAdd(delta)}
                  className="px-2.5 py-1 rounded-lg bg-black/5 hover:bg-black/10 text-[11px] font-extrabold text-zinc-700 transition-colors cursor-pointer"
                >
                  +₹{delta}
                </button>
              ))}
            </div>

            {/* Category & Day Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-7">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 block mb-1 flex items-center gap-1">
                  <Tag size={12} /> Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TransactionCategory)}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-bold bg-white border border-black/10 focus:outline-none shadow-2xs cursor-pointer"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-5">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 block mb-1 flex items-center gap-1">
                  <Calendar size={12} /> Timeline Day
                </label>
                <select
                  value={day}
                  onChange={(e) => setSelectedDay(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-bold bg-white border border-black/10 focus:outline-none shadow-2xs cursor-pointer"
                >
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      Day {d} {d === currentDay ? '(Today)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Live Consequence Card with In-Place Reactive Mascot */}
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center gap-3.5">
              <div className="shrink-0">
                <Mascot mood={reactiveMood} size={44} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 block">
                  Live Consequence & Vibe
                </span>
                <p className="text-xs font-bold text-zinc-800 leading-snug">
                  {type === 'expense' ? (
                    <>
                      Deducts <span className="text-rose-700 font-extrabold">₹{numAmount}</span>. Daily cap shifts by <span className="font-extrabold text-rose-700">−₹{projectedDailyShift}/day</span> over {daysLeft} remaining days.
                    </>
                  ) : (
                    <>
                      Adds <span className="text-emerald-700 font-extrabold">+₹{numAmount}</span> to liquid cash. Increases daily cap by <span className="font-extrabold text-emerald-700">+₹{projectedDailyShift}/day</span>!
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-black/8">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-extrabold text-xs text-white bg-zinc-900 hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Plus size={14} className="text-amber-400" />
                <span>Record to Wallet</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
