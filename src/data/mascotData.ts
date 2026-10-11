import { MascotMood } from '../types/finance'

export const MASCOT_METADATA: Record<
  MascotMood,
  { label: string; color: string; bg: string; vibe: string }
> = {
  excited: {
    label: 'Excited',
    color: '#F472B6',
    bg: '#FDF2F8',
    vibe: 'Peak adrenaline, runway looking pristine!',
  },
  joyful: {
    label: 'Joyful',
    color: '#EC4899',
    bg: '#FCE7F3',
    vibe: 'Budget balance locked in. Living stress-free.',
  },
  grateful: {
    label: 'Grateful',
    color: '#9333EA',
    bg: '#F3E8FF',
    vibe: 'Fixed bills covered. Appreciating the bag.',
  },
  energized: {
    label: 'Energized',
    color: '#7E22CE',
    bg: '#EDE9FE',
    vibe: 'Locked into the hustle, daily cap holding strong!',
  },
  sensitive: {
    label: 'Sensitive',
    color: '#0284C7',
    bg: '#E0F2FE',
    vibe: 'Wallet crying in the club. Treat with care.',
  },
  confused: {
    label: 'Confused',
    color: '#2563EB',
    bg: '#DBEAFE',
    vibe: 'Where did the ₹10k go? Math is not mathing.',
  },
  bored: {
    label: 'Bored',
    color: '#15803D',
    bg: '#DCFCE7',
    vibe: 'Nothing crazy happening. Average Tuesday burn rate.',
  },
  stressed: {
    label: 'Stressed',
    color: '#059669',
    bg: '#D1FAE5',
    vibe: 'Daily allowance squeezed. Breathing into a paper bag.',
  },
  angry: {
    label: 'Angry',
    color: '#EA580C',
    bg: '#FFEDD5',
    vibe: 'Surprise expense shock! Who authorized this?!',
  },
  insecure: {
    label: 'Insecure',
    color: '#C2410C',
    bg: '#FEE2E2',
    vibe: 'Side-eyeing our savings account. It look empty fr.',
  },
  hurt: {
    label: 'Hurt',
    color: '#D97706',
    bg: '#FEF3C7',
    vibe: 'Budget overdraft. Truly down catastrophic.',
  },
  guilty: {
    label: 'Guilty',
    color: '#EAB308',
    bg: '#FEF9C3',
    vibe: 'Simulated a huge purchase and immediately regretted it.',
  },
}
