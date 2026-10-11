import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react'
import { useFinance } from '../context/useFinance'

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useFinance()

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      aria-live="polite"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-start gap-3 backdrop-blur-md ${
              toast.type === 'danger'
                ? 'bg-rose-50/95 border-rose-300 text-rose-950'
                : toast.type === 'success'
                ? 'bg-emerald-50/95 border-emerald-300 text-emerald-950'
                : toast.type === 'warning'
                ? 'bg-amber-50/95 border-amber-300 text-amber-950'
                : 'bg-white/95 border-black/10 text-zinc-900'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'danger' ? (
                <AlertCircle size={18} className="text-rose-600" />
              ) : toast.type === 'success' ? (
                <CheckCircle size={18} className="text-emerald-600" />
              ) : (
                <Info size={18} className="text-zinc-600" />
              )}
            </div>

            <div className="flex-1">
              <h5 className="text-xs font-bold leading-tight">{toast.title}</h5>
              {toast.description && (
                <p className="text-[11px] opacity-80 mt-0.5 leading-snug">
                  {toast.description}
                </p>
              )}
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="text-zinc-400 hover:text-zinc-700 shrink-0 p-1"
              aria-label="Dismiss toast"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
