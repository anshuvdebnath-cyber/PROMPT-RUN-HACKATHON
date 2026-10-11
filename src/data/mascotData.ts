import { MascotMood } from '../types/finance'

export const MASCOT_METADATA: Record<
  MascotMood,
  { label: string; color: string; bg: string; vibe: string }
> = {
  excited: {
    label: 'Excited',
    color: '#FDE047',
    bg: '#FEFCE8',
    vibe: 'Peak adrenaline! Budget locked & runway looking pristine!',
  },
  joyful: {
    label: 'Joyful',
    color: '#FFB5A7',
    bg: '#FFF1F2',
    vibe: 'Budget balance locked in. Living stress-free.',
  },
  grateful: {
    label: 'Grateful',
    color: '#FCD34D',
    bg: '#FFFBEB',
    vibe: 'Fixed bills covered. Appreciating the bag.',
  },
  energized: {
    label: 'Energized',
    color: '#86EFAC',
    bg: '#F0FDF4',
    vibe: 'Locked into the hustle, daily cap holding strong!',
  },
  sensitive: {
    label: 'Sensitive',
    color: '#A7D7C5',
    bg: '#ECFDF5',
    vibe: 'Wallet crying in the club. Treat with care.',
  },
  confused: {
    label: 'Confused',
    color: '#FDE047',
    bg: '#FEFCE8',
    vibe: 'Where did the ₹10k go? Math is not mathing.',
  },
  bored: {
    label: 'Bored',
    color: '#A7D7C5',
    bg: '#F0FDF4',
    vibe: 'Smooth cruise. Standard burn rate, no chaotic spikes.',
  },
  stressed: {
    label: 'Stressed',
    color: '#FDA4AF',
    bg: '#FFF1F2',
    vibe: 'Daily allowance squeezed. Breathing into a paper bag.',
  },
  angry: {
    label: 'Angry',
    color: '#FB923C',
    bg: '#FFF7ED',
    vibe: 'Surprise expense shock! Who authorized this?!',
  },
  insecure: {
    label: 'Insecure',
    color: '#FB923C',
    bg: '#FFF7ED',
    vibe: 'Side-eyeing our savings account. It look empty fr.',
  },
  hurt: {
    label: 'Hurt',
    color: '#A7D7C5',
    bg: '#ECFDF5',
    vibe: 'Budget overdraft risk! Truly down catastrophic.',
  },
  guilty: {
    label: 'Guilty',
    color: '#FDE047',
    bg: '#FEFCE8',
    vibe: 'Simulated a huge purchase and immediately regretted it.',
  },
}
