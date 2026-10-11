import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, ArrowUpRight, ArrowDownRight, Filter, Sparkles } from 'lucide-react'
import { useFinance } from '../context/useFinance'
import { TransactionCategory } from '../types/finance'

export const ExpenseLedger: React.FC = () => {
  const { transactions, addTransaction, deleteTransaction, currentDay } = useFinance()

  const [isAdding, setIsAdding] = useState(false)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<TransactionCategory>('Food & Dining')
  const [type, setType] = useState<'expense' | 'income'>('expense')
  const [customDay, setCustomDay] = useState<number | null>(null)
  const transactionDay = customDay ?? currentDay
  const [selectedFilter, setSelectedFilter] = useState<string>('All')

  const categories: TransactionCategory[] = [
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

  const quickPresets = [
    { emoji: '☕', title: 'Chai & Snacks', amount: 45, category: 'Food & Dining' as TransactionCategory, type: 'expense' as const },
    { emoji: '🍱', title: 'Lunch Thali', amount: 120, category: 'Food & Dining' as TransactionCategory, type: 'expense' as const },
    { emoji: '🚇', title: 'Metro Fare', amount: 60, category: 'Transport & Commute' as TransactionCategory, type: 'expense' as const },
    { emoji: '🛒', title: 'Grocery Run', amount: 250, category: 'Shopping & Essentials' as TransactionCategory, type: 'expense' as const },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const num = Number(amount)
    if (!title.trim() || isNaN(num) || num <= 0) return

    addTransaction(title, num, category, type, transactionDay)
    setTitle('')
    setAmount('')
    setIsAdding(false)
  }

  const handleApplyPreset = (p: typeof quickPresets[0]) => {
    setTitle(p.title)
    setAmount(String(p.amount))
    setCategory(p.category)
    setType(p.type)
    setIsAdding(true)
  }

  // Calculate day-specific stats
  const todayTransactions = transactions.filter((tx) => tx.day === currentDay)
  const todaySpent = todayTransactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)
  const todayInflows = todayTransactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const filteredTransactions = transactions.filter((tx) => {
    if (selectedFilter === 'All') return true
    if (selectedFilter === 'Today') return tx.day === currentDay
    if (selectedFilter === 'Expenses') return tx.type === 'expense'
    if (selectedFilter === 'Inflows') return tx.type === 'income'
    return tx.category === selectedFilter
  })

  return (
    <div className="card p-4 sm:p-6 min-w-0" style={{ background: 'var(--canvas-card)' }}>
      {/* Header with Quick Stats */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-extrabold font-display text-zinc-900 leading-tight">
            Daily Expense Ledger & Log
          </h3>
          <p className="text-xs sm:text-[13px] text-zinc-500 font-medium">
            Record day-to-day living expenses and track past spends across 30 days.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 text-white font-extrabold text-xs hover:bg-zinc-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
        >
          <Plus size={14} className="text-amber-400" />
          <span>{isAdding ? 'Close Form' : `+ Log Day ${currentDay} Spend`}</span>
        </button>
      </div>

      {/* Today's Spend Summary Banner */}
      <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F2] border border-black/6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center text-sm font-extrabold">
            D{currentDay}
          </span>
          <div>
            <span className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-wider block">
              Day {currentDay} Spend Summary
            </span>
            <p className="text-sm font-extrabold text-zinc-900 mt-0.5">
              ₹{todaySpent.toLocaleString('en-IN')} spent today
              {todayInflows > 0 && <span className="text-emerald-700 font-bold ml-1.5">(+₹{todayInflows.toLocaleString('en-IN')} inflow)</span>}
            </p>
          </div>
        </div>

        {/* Quick tap presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-zinc-400 mr-1 hidden sm:inline">Tap preset:</span>
          {quickPresets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-zinc-100 text-[11px] font-bold text-zinc-700 border border-black/5 shadow-2xs transition-all cursor-pointer flex items-center gap-1"
            >
              <span>{p.emoji}</span>
              <span>{p.title.split(' ')[0]} (₹{p.amount})</span>
            </button>
          ))}
        </div>
      </div>

      {/* New Transaction Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="mt-4 p-4 sm:p-5 rounded-[24px] bg-[#FAF7F2] border-2 border-amber-300 shadow-sm flex flex-col gap-3.5 overflow-hidden"
          >
            <div className="flex items-center justify-between pb-2 border-b border-black/6">
              <span className="text-xs font-extrabold text-zinc-900 flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-500" />
                Record Spend / Inflow on Timeline
              </span>
              <span className="text-[11px] font-bold text-zinc-500">
                Affects liquid balance & daily cap
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-5">
                <label className="text-xs font-extrabold text-zinc-700 block mb-1">
                  Item Description
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Canteen lunch, Metro pass, Grocery"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-zinc-900 shadow-2xs"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-xs font-extrabold text-zinc-700 block mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  step={5}
                  placeholder="e.g. 120"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs font-extrabold bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-zinc-900 shadow-2xs"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="text-xs font-extrabold text-zinc-700 block mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TransactionCategory)}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-extrabold bg-white border border-black/10 focus:outline-none shadow-2xs cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-6">
                <label className="text-xs font-extrabold text-zinc-700 block mb-1">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as 'expense' | 'income')}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-extrabold bg-white border border-black/10 focus:outline-none shadow-2xs cursor-pointer"
                >
                  <option value="expense">Expense (- Cash Out)</option>
                  <option value="income">Inflow (+ Cash In)</option>
                </select>
              </div>

              <div className="sm:col-span-6">
                <label className="text-xs font-extrabold text-zinc-700 block mb-1">
                  Day of Month (1 - 30)
                </label>
                <select
                  value={transactionDay}
                  onChange={(e) => setCustomDay(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-extrabold bg-white border border-black/10 focus:outline-none shadow-2xs cursor-pointer"
                >
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      Day {d} {d === currentDay ? '(Today)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2 border-t border-black/6">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-extrabold bg-zinc-900 text-white rounded-xl shadow-2xs hover:bg-zinc-800 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Plus size={14} className="text-amber-400" />
                <span>Save to Ledger</span>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Filter Tabs */}
      <div className="no-scrollbar mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        <span className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-wider mr-1 flex items-center gap-1 shrink-0">
          <Filter size={11} /> Filter:
        </span>
        {['All', 'Today', 'Expenses', 'Inflows', 'Food & Dining', 'Bills & Utilities'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedFilter === cat
                ? 'bg-zinc-900 text-white shadow-2xs'
                : 'bg-[#FAF7F2] hover:bg-zinc-100 text-zinc-600 border border-black/5'
            }`}
          >
            {cat === 'Today' ? `Today (Day ${currentDay})` : cat}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="mt-4 divide-y divide-black/5">
        {filteredTransactions.length === 0 ? (
          <div className="py-12 text-center text-xs text-zinc-400 font-semibold">
            No transactions found for this filter.
          </div>
        ) : (
          filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="py-3.5 flex items-center justify-between gap-3 group hover:bg-[#FAF7F2]/50 px-2 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-2xs ${
                    tx.type === 'expense'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {tx.type === 'expense' ? (
                    <ArrowDownRight size={14} />
                  ) : (
                    <ArrowUpRight size={14} />
                  )}
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-extrabold text-zinc-900">
                    {tx.title}
                  </h5>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold text-zinc-400">
                      Day {tx.day} {tx.day === currentDay ? '· Today' : ''} · {tx.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <span
                  className={`text-[13px] sm:text-sm font-extrabold font-display whitespace-nowrap ${
                    tx.type === 'expense' ? 'text-zinc-900' : 'text-emerald-700'
                  }`}
                >
                  {tx.type === 'expense' ? '-' : '+'}₹{tx.amount.toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => deleteTransaction(tx.id)}
                  className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
                  title="Delete transaction"
                  aria-label={`Delete ${tx.title}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
