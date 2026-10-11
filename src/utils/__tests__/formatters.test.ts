import { describe, it, expect } from 'vitest'
import { formatINR, formatPercent, formatSignedDelta } from '../formatters'

describe('formatters utility suite', () => {
  it('formats Indian Rupee amounts correctly', () => {
    expect(formatINR(10000)).toBe('₹10,000')
    expect(formatINR(1250.5)).toBe('₹1,251')
    expect(formatINR(500, false)).toBe('500')
    expect(formatINR(0)).toBe('₹0')
  })

  it('formats percentages accurately', () => {
    expect(formatPercent(85)).toBe('85%')
    expect(formatPercent(45.678, 1)).toBe('45.7%')
  })

  it('formats signed deltas with appropriate symbol', () => {
    expect(formatSignedDelta(250)).toBe('+₹250')
    expect(formatSignedDelta(-500)).toBe('-₹500')
    expect(formatSignedDelta(0)).toBe('₹0')
  })
})
