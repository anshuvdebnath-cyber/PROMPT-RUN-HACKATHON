import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react'
import { useFinance } from '../context/useFinance'
import { TransactionCategory } from '../types/finance'

export const ExpenseLedger: React.FC = () => {
  const { transactions, addTransaction, deleteTransaction } = useFinance()

  const [isAdding, setIsAdding] = useState(false)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<TransactionCategory>('Food & Dining')
  const [type, setType] = useState<'expense' | 'income'>('expense')
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const num = Number(amount)
    if (!title.trim() || isNaN(num) || num <= 0) return

    addTransaction(title, num, category, type)
    setTitle('')
    setAmount('')
    setIsAdding(false)
  }

  const filteredTransactions = transactions.filter((tx) => {
    if (selectedFilter === 'All') return true
    if (selectedFilter === 'Expenses') return tx.type === 'expense'
    if (selectedFilter === 'Inflows') return tx.type === 'income'
    return tx.category === selectedFilter
  })

  return (
    <div className="card p-4 sm:p-6 min-w-0" style={{ background: 'var(--canvas-card)' }}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-extrabold font-display text-zinc-900 leading-tight">
            Transaction Ledger
          </h3>
          <p className="text-xs sm:text-[13px] text-zinc-500 font-medium">
            Real spend across your 30-day journey.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 text-white font-extrabold text-xs hover:bg-zinc-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <Plus size={14} className="text-amber-400" />
          <span>{isAdding ? 'Close Form' : 'Log Expense / Inflow'}</span>
        </button>
      </div>

      {/* New Transaction Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="mt-5 p-5 rounded-[24px] bg-[#FAF7F2] border border-black/6 flex flex-col gap-4 overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
              <div className="sm:col-span-4">
                <label className="text-xs font-extrabold text-zinc-700 block mb-1.5">
                  Item / Description
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chai, Metro Pass, Grocery"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-zinc-900 shadow-2xs"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-xs font-extrabold text-zinc-700 block mb-1.5">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  step={10}
                  placeholder="e.g. 150"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs font-extrabold bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-zinc-900 shadow-2xs"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-xs font-extrabold text-zinc-700 block mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TransactionCategory)}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-extrabold bg-white border border-black/10 focus:outline-none shadow-2xs cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-extrabold text-zinc-700 block mb-1.5">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as 'expense' | 'income')}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-extrabold bg-white border border-black/10 focus:outline-none shadow-2xs cursor-pointer"
                >
                  <option value="expense">Expense (-)</option>
                  <option value="income">Inflow (+)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-extrabold bg-zinc-900 text-white rounded-xl shadow-2xs cursor-pointer"
              >
                Add Entry
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Category Filter Pills */}
      <div className="no-scrollbar mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        <span className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-wider mr-1 flex items-center gap-1 shrink-0">
          <Filter size={11} /> Filter:
        </span>
        {['All', 'Expenses', 'Inflows', 'Food & Dining', 'Bills & Utilities'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedFilter === cat
                ? 'bg-zinc-900 text-white shadow-2xs'
                : 'bg-[#FAF7F2] hover:bg-zinc-100 text-zinc-600 border border-black/5'
            }`}
          >
            {cat}
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
                      Day {tx.day} · {tx.category}
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
