import '@testing-library/jest-dom/vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { QuickExpenseModal } from '../QuickExpenseModal'
import { FinanceProvider } from '../../context/FinanceContext'

describe('QuickExpenseModal Component', () => {
  it('does not render when isOpen is false', () => {
    const handleClose = vi.fn()
    render(
      <FinanceProvider>
        <QuickExpenseModal isOpen={false} onClose={handleClose} />
      </FinanceProvider>
    )

    expect(screen.queryByText(/Log Daily Expense/i)).not.toBeInTheDocument()
  })

  it('renders modal with presets and form when isOpen is true', () => {
    const handleClose = vi.fn()
    render(
      <FinanceProvider>
        <QuickExpenseModal isOpen={true} onClose={handleClose} />
      </FinanceProvider>
    )

    expect(screen.getByText(/Log Daily Expense/i)).toBeInTheDocument()
    expect(screen.getByText(/Chai & Samosa/i)).toBeInTheDocument()
    expect(screen.getByText(/College \/ Office Lunch/i)).toBeInTheDocument()
    expect(screen.getByText(/Record to Wallet/i)).toBeInTheDocument()
  })

  it('populates fields when a preset chip is tapped and records transaction', () => {
    const handleClose = vi.fn()
    render(
      <FinanceProvider>
        <QuickExpenseModal isOpen={true} onClose={handleClose} />
      </FinanceProvider>
    )

    const chaiPreset = screen.getByText(/Chai & Samosa/i)
    fireEvent.click(chaiPreset)

    const form = screen.getByRole('dialog').querySelector('form')
    expect(form).toBeInTheDocument()
    fireEvent.submit(form!)

    expect(handleClose).toHaveBeenCalled()
  })
})
