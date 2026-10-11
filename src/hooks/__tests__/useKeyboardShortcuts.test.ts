import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useKeyboardShortcuts } from '../useKeyboardShortcuts'

describe('useKeyboardShortcuts suite', () => {
  it('triggers onOpenQuickExpense when pressing "e"', () => {
    const onOpen = vi.fn()
    renderHook(() => useKeyboardShortcuts({ onOpenQuickExpense: onOpen }))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'e' }))
    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('triggers onAdvanceDay when pressing "n"', () => {
    const onNext = vi.fn()
    renderHook(() => useKeyboardShortcuts({ onAdvanceDay: onNext }))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'n' }))
    expect(onNext).toHaveBeenCalledTimes(1)
  })

  it('triggers onEscape when pressing "Escape"', () => {
    const onEsc = vi.fn()
    renderHook(() => useKeyboardShortcuts({ onEscape: onEsc }))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(onEsc).toHaveBeenCalledTimes(1)
  })

  it('does not trigger hotkeys when active element is an input', () => {
    const onOpen = vi.fn()
    renderHook(() => useKeyboardShortcuts({ onOpenQuickExpense: onOpen }))

    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'e' }))
    expect(onOpen).not.toHaveBeenCalled()

    document.body.removeChild(input)
  })
})
