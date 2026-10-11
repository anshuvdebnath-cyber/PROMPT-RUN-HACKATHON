import '@testing-library/jest-dom/vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FinanceProvider } from '../FinanceContext'
import { useFinance } from '../useFinance'

function Probe() {
  const { currentDay, transactions, advanceDay, setDay } = useFinance()
  return (
    <div>
      <span data-testid="day">{currentDay}</span>
      <span data-testid="count">{transactions.length}</span>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
      <button onClick={advanceDay}>next-day</button>
      <button onClick={() => setDay(1)}>back-to-day-1</button>
    </div>
  )
}

const advanceTo = (n: number) => {
  for (let i = 0; i < n; i++) {
    fireEvent.click(screen.getByText('next-day'))
  }
}

describe('advanceDay money movement (problem statement: time must move money)', () => {
  it('auto-posts subscription renewals to the ledger exactly once', () => {
    render(
      <FinanceProvider>
        <Probe />
      </FinanceProvider>
    )

    expect(screen.getByTestId('day')).toHaveTextContent('1')
    expect(screen.getByTestId('count')).toHaveTextContent('2')

    // Spotify renews Day 12 → advancing 1→12 posts exactly one charge
    advanceTo(11)
    expect(screen.getByTestId('day')).toHaveTextContent('12')
    expect(screen.getByTestId('count')).toHaveTextContent('3')
    expect(screen.getByText('🔁 Spotify Premium Student Renewed')).toBeInTheDocument()

    // Netflix renews Day 15
    advanceTo(3)
    expect(screen.getByTestId('day')).toHaveTextContent('15')
    expect(screen.getByTestId('count')).toHaveTextContent('4')
    expect(screen.getByText('🔁 Netflix Mobile Plan Renewed')).toBeInTheDocument()

    // Scrubbing back and re-advancing must NOT double-charge
    fireEvent.click(screen.getByText('back-to-day-1'))
    expect(screen.getByTestId('day')).toHaveTextContent('1')
    advanceTo(11)
    expect(screen.getByTestId('day')).toHaveTextContent('12')
    expect(screen.getByTestId('count')).toHaveTextContent('4')
  })
})
