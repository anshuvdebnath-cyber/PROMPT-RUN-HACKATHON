import React from 'react'
import { useFinance } from '../context/useFinance'

// Legacy export kept for compatibility — the v2 sidebar layout lives in App.tsx.
// This renders a compact status line if ever mounted directly.
export const Navbar: React.FC = () => {
  const { currentDay } = useFinance()
  return (
    <div className="card px-4 py-3 text-[13px] font-bold lg:hidden" style={{ color: 'var(--text-2)' }}>
      Day {currentDay} of 30 — use the sidebar to navigate.
    </div>
  )
}
