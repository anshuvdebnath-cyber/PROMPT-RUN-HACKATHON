import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FinanceProvider } from '../../context/FinanceContext'
import { CashflowChart } from '../CashflowChart'
import { CommitmentsManager } from '../CommitmentsManager'
import { ExpenseLedger } from '../ExpenseLedger'
import { SavingsTracker } from '../SavingsTracker'
import { SurpriseEvents } from '../SurpriseEvents'

describe('Core Financial Component Suite', () => {
  it('renders CashflowChart with 30-day runway curve and balance predictions', () => {
    render(
      <FinanceProvider>
        <CashflowChart />
      </FinanceProvider>
    )
    expect(screen.getByText(/30-Day Runway Forecast/i)).toBeInTheDocument()
    expect(screen.getByText(/Past burn vs. projected end-of-month runway/i)).toBeInTheDocument()
  })

  it('renders CommitmentsManager with obligations, rent, and active subscriptions', () => {
    render(
      <FinanceProvider>
        <CommitmentsManager />
      </FinanceProvider>
    )
    expect(screen.getByText(/Commitments & Subscriptions/i)).toBeInTheDocument()
    expect(screen.getByText(/Fixed Obligations/i)).toBeInTheDocument()
    expect(screen.getByText(/Spotify Premium Student/i)).toBeInTheDocument()
  })

  it('renders ExpenseLedger with chronological transaction history and logging', () => {
    render(
      <FinanceProvider>
        <ExpenseLedger />
      </FinanceProvider>
    )
    expect(screen.getByText(/Daily Expense Ledger & Log/i)).toBeInTheDocument()
    expect(screen.getByText(/Record day-to-day living expenses/i)).toBeInTheDocument()
  })

  it('renders SavingsTracker with emergency buffer and target progress', () => {
    render(
      <FinanceProvider>
        <SavingsTracker />
      </FinanceProvider>
    )
    expect(screen.getByText(/Savings Shield/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Buffer/i).length).toBeGreaterThan(0)
  })

  it('renders SurpriseEvents with realistic life shock curveballs', () => {
    render(
      <FinanceProvider>
        <SurpriseEvents />
      </FinanceProvider>
    )
    expect(screen.getByText(/Surprise Events/i)).toBeInTheDocument()
    expect(screen.getByText(/Random curveballs to test resilience/i)).toBeInTheDocument()
    expect(screen.getByText(/Scooter Puncture & Tube Fix/i)).toBeInTheDocument()
  })
})
