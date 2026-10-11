import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { WhatIfSimulator } from '../WhatIfSimulator'
import { FinanceProvider } from '../../context/FinanceContext'

describe('WhatIfSimulator Component', () => {
  it('renders simulator controls and preset buttons', () => {
    render(
      <FinanceProvider>
        <WhatIfSimulator />
      </FinanceProvider>
    )

    expect(screen.getByText('What-If Decision Simulator')).toBeInTheDocument()
    expect(screen.getByText('Midnight Zomato Treat')).toBeInTheDocument()
    expect(screen.getByText('Trendy Streetwear Drops')).toBeInTheDocument()
    expect(screen.getByText('Freelance UI Design Gig')).toBeInTheDocument()
  })

  it('triggers simulation preview when preset is selected', () => {
    render(
      <FinanceProvider>
        <WhatIfSimulator />
      </FinanceProvider>
    )

    const presetButton = screen.getByText('Midnight Zomato Treat')
    fireEvent.click(presetButton)

    // After clicking, live sandbox indicator should be active
    expect(screen.getByText(/Live Sandbox Active/i)).toBeInTheDocument()
    expect(screen.getByText(/Confirm & Commit to Ledger/i)).toBeInTheDocument()
    expect(screen.getByText(/Discard Simulation/i)).toBeInTheDocument()
  })
})
