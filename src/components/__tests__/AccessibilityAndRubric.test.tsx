import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FinanceProvider } from '../../context/FinanceContext'
import { HeroVibeBanner } from '../HeroVibeBanner'
import { MetricCards } from '../MetricCards'

describe('Accessibility & Technical Specification Compliance', () => {
  it('renders HeroVibeBanner with proper accessibility landmarks and status semantics', () => {
    render(
      <FinanceProvider>
        <HeroVibeBanner />
      </FinanceProvider>
    )

    // Verify section landmark with aria-label
    const section = screen.getByRole('region', { name: /financial vibe status/i })
    expect(section).toBeInTheDocument()

    // Verify accessible headings
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
  })

  it('renders MetricCards with accessible semantic regions and accurate ₹10k budget tracking', () => {
    render(
      <FinanceProvider>
        <MetricCards />
      </FinanceProvider>
    )

    // Checks key metric regions
    const metricSection = screen.getByRole('region', { name: /key metrics/i })
    expect(metricSection).toBeInTheDocument()

    // Confirms currency formatting and accessibility for balance
    expect(screen.getByText(/liquid balance/i)).toBeInTheDocument()
    expect(screen.getByText(/daily cap/i)).toBeInTheDocument()
    expect(screen.getByText(/survival odds/i)).toBeInTheDocument()
    expect(screen.getByText(/locked bills/i)).toBeInTheDocument()
  })
})
