import { MascotMood } from '../types/finance'

export const MASCOT_METADATA: Record<
  MascotMood,
  { label: string; color: string; bg: string; vibe: string; genZQuip: string }
> = {
  excited: {
    label: 'Excited',
    color: '#FDE047',
    bg: '#FEFCE8',
    vibe: 'No cap, finances are bussin! Main character energy unlocked.',
    genZQuip: 'Bag secured, zero Ls taken. Peak financial rizz right now!',
  },
  joyful: {
    label: 'Joyful',
    color: '#FFB5A7',
    bg: '#FFF1F2',
    vibe: 'Budget ate and left no crumbs. Living rent-free in pure peace.',
    genZQuip: 'Vibes immaculate. Commitments locked down and daily allowance is steady.',
  },
  grateful: {
    label: 'Grateful',
    color: '#FCD34D',
    bg: '#FFFBEB',
    vibe: 'Mindful & demure era. Bills prepped, staying low-key.',
    genZQuip: 'Not broke, but definitely not flexing. Respecting the hustle and staying grounded.',
  },
  stressed: {
    label: 'Stressed',
    color: '#FDA4AF',
    bg: '#FFF1F2',
    vibe: 'Sweating bullets! One iced latte away from being cooked.',
    genZQuip: 'Caught in 4K burning cash. Cap is in the trenches—instant ramen diet initiated!',
  },
  angry: {
    label: 'Angry',
    color: '#FB923C',
    bg: '#FFF7ED',
    vibe: 'Major side-eye! Who let you cook with this spending spree?!',
    genZQuip: 'Delulu spending caught up! Massive L on the budget. Emergency spending freeze now!',
  },
  hurt: {
    label: 'Hurt',
    color: '#A7D7C5',
    bg: '#ECFDF5',
    vibe: 'Down bad & down catastrophic. Wallet is in actual tears.',
    genZQuip: 'Ghosted by your own bank account. In the deficit trenches, send help immediately!',
  },
}
