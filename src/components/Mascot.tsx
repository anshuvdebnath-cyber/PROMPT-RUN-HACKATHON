import React from 'react'
import { motion } from 'framer-motion'
import { MascotMood } from '../types/finance'
import { MASCOT_METADATA } from '../data/mascotData'

interface MascotProps {
  mood: MascotMood
  size?: number
  showLabel?: boolean
  className?: string
  onClick?: () => void
}

// Curated pastel squircle colors matching each mood from the reference sheet
const MOOD_COLORS: Record<MascotMood, string> = {
  excited: '#FDE047', // Bright electric canary yellow
  joyful: '#FFB5A7',  // Warm soft peach
  grateful: '#FCD34D',// Warm golden honey
  stressed: '#FECDD3',// Flushed blush pink
  angry: '#FB923C',   // Fiery warning coral
  hurt: '#A7D7C5',    // Sage mint (wallet in tears)
}

export const Mascot: React.FC<MascotProps> = ({
  mood,
  size = 110,
  showLabel = false,
  className = '',
  onClick,
}) => {
  const meta = MASCOT_METADATA[mood] || MASCOT_METADATA.joyful
  const bodyColor = MOOD_COLORS[mood] || MOOD_COLORS.joyful

  const isExcited = mood === 'excited'
  const isJoyful = mood === 'joyful'
  const isGrateful = mood === 'grateful'
  const isStressed = mood === 'stressed'
  const isAngry = mood === 'angry'
  const isHurt = mood === 'hurt'

  return (
    <div
      className={`inline-flex flex-col items-center justify-center select-none ${className}`}
      onClick={onClick}
    >
      <motion.div
        className="relative flex items-center justify-center filter drop-shadow-sm cursor-pointer"
        style={{ width: size, height: size }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        role="img"
        aria-label={`Financial mood mascot: ${meta.label} (${meta.vibe})`}
      >
        {/* Single persistent SVG: never unmounts, smoothly morphs colors and facial features in-place */}
        <svg
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          className="overflow-visible block"
          aria-hidden="true"
        >
          {/* Persistent Squircle Body: smoothly interpolates fill color */}
          <motion.rect
            x="5"
            y="5"
            width="90"
            height="90"
            rx="26"
            animate={{ fill: bodyColor }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* ── EYEBROWS ── */}
          {/* Angry Brows */}
          <motion.g
            animate={{
              opacity: isAngry ? 1 : 0,
              y: isAngry ? 0 : -4,
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <path d="M26 36 L42 43" stroke="#18181B" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M74 36 L58 43" stroke="#18181B" strokeWidth="4.5" strokeLinecap="round" />
          </motion.g>

          {/* Hurt Sad Drooping Brows */}
          <motion.g
            animate={{
              opacity: isHurt ? 1 : 0,
              y: isHurt ? 0 : -4,
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <path d="M26 38 Q34 32 42 38" fill="none" stroke="#18181B" strokeWidth="4" strokeLinecap="round" />
            <path d="M58 38 Q66 32 74 38" fill="none" stroke="#18181B" strokeWidth="4" strokeLinecap="round" />
          </motion.g>

          {/* ── EYES ── */}
          {/* 1. Round Dot Eyes (Default, Stressed, Angry, Hurt) */}
          <motion.g
            animate={{
              opacity: (isAngry || isStressed || isHurt) ? 1 : 0,
              scale: (isAngry || isStressed || isHurt) ? 1 : 0.6,
            }}
            style={{ transformOrigin: '50% 48%' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <circle cx="34" cy="48" r="4.5" fill="#18181B" />
            <circle cx="66" cy="48" r="4.5" fill="#18181B" />
          </motion.g>

          {/* 2. Excited >< Squinting Laughing Eyes */}
          <motion.g
            animate={{
              opacity: isExcited ? 1 : 0,
              scale: isExcited ? 1 : 0.6,
            }}
            style={{ transformOrigin: '50% 46%' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <path
              d="M28 40 L38 46 L28 52"
              fill="none"
              stroke="#18181B"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M72 40 L62 46 L72 52"
              fill="none"
              stroke="#18181B"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* 3. Joyful / Grateful Smiling Curved Eyes ^^ */}
          <motion.g
            animate={{
              opacity: (isJoyful || isGrateful) ? 1 : 0,
              scale: (isJoyful || isGrateful) ? 1 : 0.6,
            }}
            style={{ transformOrigin: '50% 45%' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <path
              d="M28 45 Q36 37 44 45"
              fill="none"
              stroke="#18181B"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M56 45 Q64 37 72 45"
              fill="none"
              stroke="#18181B"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          </motion.g>

          {/* ── ACCENTS & DETAILS ── */}
          {/* Pink Blush Dots (Joyful & Grateful) */}
          <motion.g
            animate={{
              opacity: (isJoyful || isGrateful) ? 0.7 : 0,
            }}
            transition={{ duration: 0.35 }}
          >
            <circle cx="23" cy="53" r="5" fill="#FB7185" />
            <circle cx="77" cy="53" r="5" fill="#FB7185" />
          </motion.g>

          {/* Stressed Sweating Beads & Flushed Marks */}
          <motion.g
            animate={{
              opacity: isStressed ? 1 : 0,
              y: isStressed ? [0, 2, 0] : -3,
            }}
            transition={{
              opacity: { duration: 0.35 },
              y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            {/* Forehead sweat drops */}
            <path d="M32 23 C30 27 30 30 32 32 C34 34 36 32 35 28 Z" fill="#FFFFFF" />
            <path d="M50 20 C48 24 48 27 50 29 C52 31 54 29 53 25 Z" fill="#FFFFFF" />
            <path d="M68 23 C66 27 66 30 68 32 C70 34 72 32 71 28 Z" fill="#FFFFFF" />
            {/* Cheek flush marks */}
            <path d="M22 56 L22 66 M26 56 L26 66 M30 56 L30 66" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M70 56 L70 66 M74 56 L74 66 M78 56 L78 66" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />
          </motion.g>

          {/* Hurt Streaming Blue Tears */}
          <motion.g
            animate={{
              opacity: isHurt ? 1 : 0,
              y: isHurt ? [0, 3, 0] : -3,
            }}
            transition={{
              opacity: { duration: 0.35 },
              y: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <path d="M34 54 C31 59 31 64 34 67 C37 70 41 67 39 60 Z" fill="#0284C7" />
            <path d="M66 54 C63 59 63 64 66 67 C69 70 73 67 71 60 Z" fill="#0284C7" />
          </motion.g>

          {/* ── MOUTH EXPRESSIONS ── */}
          {/* Excited Open Smile with Pink Tongue */}
          <motion.g
            animate={{
              opacity: isExcited ? 1 : 0,
              scale: isExcited ? 1 : 0.7,
            }}
            style={{ transformOrigin: '50% 65%' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <path d="M34 58 Q50 78 66 58 Z" fill="#18181B" />
            <path d="M42 67 Q50 63 58 67 Q50 78 42 67 Z" fill="#F472B6" />
          </motion.g>

          {/* Joyful Cheer Smile */}
          <motion.g
            animate={{
              opacity: isJoyful ? 1 : 0,
              scale: isJoyful ? 1 : 0.7,
            }}
            style={{ transformOrigin: '50% 65%' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <path d="M36 57 Q50 76 64 57 Z" fill="#18181B" />
            <path d="M43 66 Q50 62 57 66 Q50 76 43 66 Z" fill="#FB7185" />
          </motion.g>

          {/* Grateful Warm Arc Smile */}
          <motion.path
            d="M38 59 Q50 70 62 59"
            fill="none"
            stroke="#18181B"
            strokeWidth="4.5"
            strokeLinecap="round"
            animate={{
              opacity: isGrateful ? 1 : 0,
            }}
            transition={{ duration: 0.35 }}
          />

          {/* Stressed Tense Squiggly Mouth */}
          <motion.path
            d="M38 72 Q44 76 50 72 Q56 68 62 72"
            fill="none"
            stroke="#18181B"
            strokeWidth="4.5"
            strokeLinecap="round"
            animate={{
              opacity: isStressed ? 1 : 0,
            }}
            transition={{ duration: 0.35 }}
          />

          {/* Angry / Hurt Downturned Frown */}
          <motion.path
            d="M36 71 Q50 63 64 71"
            fill="none"
            stroke="#18181B"
            strokeWidth="5"
            strokeLinecap="round"
            animate={{
              opacity: (isAngry || isHurt) ? 1 : 0,
            }}
            transition={{ duration: 0.35 }}
          />
        </svg>
      </motion.div>

      {showLabel && (
        <span className="mt-2 text-xs font-bold text-zinc-800 tracking-wide capitalize">
          {meta.label}
        </span>
      )}
    </div>
  )
}
