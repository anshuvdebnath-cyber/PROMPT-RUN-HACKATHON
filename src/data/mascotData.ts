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
  hurt: {
    label: 'Hurt',
    color: '#A7D7C5',
    bg: '#ECFDF5',
    vibe: 'Budget overdraft risk! Truly down catastrophic.',
  },
}
