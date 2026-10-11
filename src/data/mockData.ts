import {
  Commitment,
  SavingsGoal,
  Subscription,
  Transaction,
  UnexpectedEvent,
} from '../types/finance'

export const DEFAULT_COMMITMENTS: Commitment[] = [
  {
    id: 'comm-1',
    title: 'Room / PG Rent Split',
    amount: 2600,
    dueDay: 5,
    category: 'rent',
    isPaid: false,
    description: 'Shared hostel/flat rent quota',
  },
  {
    id: 'comm-2',
    title: 'Broadband Wi-Fi Split',
    amount: 250,
    dueDay: 10,
    category: 'wifi',
    isPaid: false,
    description: 'Shared flat broadband connection',
  },
  {
    id: 'comm-3',
    title: 'Monthly Pantry Essentials',
    amount: 750,
    dueDay: 7,
    category: 'groceries',
    isPaid: false,
    description: 'Oats, milk, eggs, tea & staple supplies',
  },
]

export const DEFAULT_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'sub-1',
    name: 'Spotify Premium Student',
    amount: 59,
    renewalDay: 12,
    isActive: true,
    category: 'music',
  },
  {
    id: 'sub-2',
    name: 'Netflix Mobile Plan',
    amount: 149,
    renewalDay: 15,
    isActive: true,
    category: 'ott',
  },
  {
    id: 'sub-3',
    name: 'Cloud Storage & Drive Backup',
    amount: 130,
    renewalDay: 25,
    isActive: true,
    category: 'cloud',
  },
]

export const DEFAULT_SAVINGS_GOALS: SavingsGoal[] = [
  {
    id: 'sav-1',
    title: 'Emergency Rainy Day Cushion',
    targetAmount: 1500,
    currentAmount: 400,
    color: '#84CC16',
  },
  {
    id: 'sav-2',
    title: 'Weekend Goa Trip Stash',
    targetAmount: 2500,
    currentAmount: 250,
    color: '#EC4899',
  },
]

export const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    day: 1,
    title: 'Campus Canteen Lunch & Chai',
    amount: 140,
    category: 'Food & Dining',
    type: 'expense',
    timestamp: '2026-10-01T12:30:00.000Z',
  },
  {
    id: 'tx-2',
    day: 1,
    title: 'Metro Smart Card Auto-Topup',
    amount: 200,
    category: 'Transport & Commute',
    type: 'expense',
    timestamp: '2026-10-01T15:00:00.000Z',
  },
]

export const RANDOM_SURPRISE_EVENTS: UnexpectedEvent[] = [
  {
    id: 'event-1',
    title: 'Scooter Puncture & Tube Fix',
    description: 'Rear tyre gave up on the highway bridge. Mechanic charged for urgent vulcanization.',
    amount: -280,
    category: 'Unexpected & Emergency',
    severity: 'low',
    suggestedDay: 7,
    consequenceText: 'Deducts ₹280 directly from your liquid balance.',
  },
  {
    id: 'event-2',
    title: 'Unexpected Medical Prescriptions',
    description: 'Caught a severe seasonal flu. Doctor consultation fees and antibiotics bill.',
    amount: -750,
    category: 'Unexpected & Emergency',
    severity: 'medium',
    suggestedDay: 13,
    consequenceText: 'Squeezes ₹750 out of your mid-month living allowance.',
  },
  {
    id: 'event-3',
    title: 'Best Friend’s Birthday Group Dinner Split',
    description: 'Peer pressure went crazy. Everyone ordered sizzlers and split the bill equally.',
    amount: -620,
    category: 'Entertainment & Outings',
    severity: 'medium',
    suggestedDay: 17,
    consequenceText: 'Wipes out 3 days worth of discretionary daily allowance.',
  },
  {
    id: 'event-4',
    title: 'Freelance Design Contest Win',
    description: 'Your poster submission won 2nd place in the inter-college tech fest!',
    amount: 1400,
    category: 'Side Gig / Inflow',
    severity: 'bonus',
    suggestedDay: 20,
    consequenceText: 'Injects +₹1,400 fresh cash into your wallet!',
  },
  {
    id: 'event-5',
    title: 'Steam Midnight Flash Sale',
    description: 'That game on your wishlist just hit 80% off. Willpower critically tested.',
    amount: -990,
    category: 'Shopping & Essentials',
    severity: 'high',
    suggestedDay: 22,
    consequenceText: 'Heavy impulse hit: daily allowance drops sharply for remaining week.',
  },
  {
    id: 'event-6',
    title: 'Sold Unused College Textbooks',
    description: 'Juniors bought your semester 2 engineering textbooks on the campus group.',
    amount: 550,
    category: 'Side Gig / Inflow',
    severity: 'bonus',
    suggestedDay: 26,
    consequenceText: 'Adds a welcome +₹550 cushion right before month end.',
  },
]
