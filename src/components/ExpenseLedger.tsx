import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react'
import { useFinance } from '../context/useFinance'
import { TransactionCategory } from '../types/finance'

export const ExpenseLedger: React.FC = () => {
  const { transactions, addTransaction, deleteTransaction, currentDay } = useFinance()

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
    <div className="neo-card p-6 bg-white border border-black/10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-black/5">
        <div>
          <h3 className="text-xl font-bold font-display text-zinc-900">
            Transaction Ledger & Log
          </h3>
          <p className="text-xs text-zinc-500">
            Real expenditures recorded throughout the 30-day journey.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 rounded-xl bg-zinc-900 text-white font-bold text-xs hover:bg-zinc-800 transition-all flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={14} />
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
            className="mt-4 p-4 rounded-2xl bg-zinc-50 border border-black/5 flex flex-col gap-3 overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4">
                <label className="text-xs font-bold text-zinc-600 block mb-1">
                  Item / Reason
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chai, Metro pass, Treat"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs font-medium bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-xs font-bold text-zinc-600 block mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  step={1}
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs font-bold bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-xs font-bold text-zinc-600 block mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TransactionCategory)}
                  className="w-full px-3 py-2 rounded-xl text-xs font-medium bg-white border border-black/10 focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-zinc-600 block mb-1">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as 'expense' | 'income')}
                  className="w-full px-3 py-2 rounded-xl text-xs font-bold bg-white border border-black/10 focus:outline-none"
                >
                  <option value="expense">Expense (-)</option>
                  <option value="income">Income (+)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-1.5 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 rounded-xl text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800"
              >
                Save on Day {currentDay}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 mt-4 overflow-x-auto pb-2">
        <Filter size={13} className="text-zinc-400 shrink-0 mr-1" />
        {['All', 'Expenses', 'Inflows', 'Food & Dining', 'Unexpected & Emergency'].map(
          (filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                selectedFilter === filter
                  ? 'bg-zinc-900 text-white'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'
              }`}
            >
              {filter}
            </button>
          )
        )}
      </div>

      {/* Transaction List */}
      <div className="mt-3 divide-y divide-black/5 max-h-80 overflow-y-auto pr-1">
        {filteredTransactions.length === 0 ? (
          <div className="py-8 text-center text-zinc-400 text-xs">
            No transactions found under this filter.
          </div>
        ) : (
          filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="py-3 flex items-center justify-between gap-3 group hover:bg-zinc-50/70 px-2 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    tx.type === 'income'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {tx.type === 'income' ? (
                    <ArrowDownRight size={16} />
                  ) : (
                    <ArrowUpRight size={16} />
                  )}
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
                    {tx.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-semibold text-zinc-400">
                      Day {tx.day}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                      {tx.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-sm sm:text-base font-extrabold font-display ${
                    tx.type === 'income' ? 'text-emerald-700' : 'text-zinc-900'
                  }`}
                >
                  {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                </span>

                <button
                  onClick={() => deleteTransaction(tx.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                  title="Delete transaction"
                  aria-label={`Delete ${tx.title}`}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
