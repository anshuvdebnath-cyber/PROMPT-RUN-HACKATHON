import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Mascot } from '../Mascot'
import { MascotMood } from '../../types/finance'

describe('Mascot Component Suite', () => {
  const allMoods: MascotMood[] = [
    'excited',
    'joyful',
    'grateful',
    'energized',
    'sensitive',
    'confused',
    'bored',
    'stressed',
    'angry',
    'insecure',
    'hurt',
    'guilty',
  ]

  it.each(allMoods)('renders mascot correctly for mood: %s', (mood) => {
    const { container } = render(<Mascot mood={mood} size={100} showLabel />)
    const element = screen.getByRole('img', {
      name: new RegExp(`Financial mood mascot:`, 'i'),
    })
    expect(element).toBeInTheDocument()
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
