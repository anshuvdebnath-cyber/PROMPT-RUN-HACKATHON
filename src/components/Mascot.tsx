import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MascotMood } from '../types/finance'
import { MASCOT_METADATA } from '../data/mascotData'

interface MascotProps {
  mood: MascotMood
  size?: number
  showLabel?: boolean
  className?: string
  onClick?: () => void
}

export const Mascot: React.FC<MascotProps> = ({
  mood,
  size = 110,
  showLabel = false,
  className = '',
  onClick,
}) => {
  const meta = MASCOT_METADATA[mood] || MASCOT_METADATA.joyful

  // Render SVG Squircle Character based on the user's visual reference sheet
  const renderMascotGraphic = () => {
    switch (mood) {
      case 'angry':
        // Coral squircle with angled angry brows, dot eyes, downturned frown
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            <rect x="5" y="5" width="90" height="90" rx="26" fill="#FB923C" />
            {/* Angry Brows */}
            <path d="M26 36 L42 43" stroke="#18181B" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M74 36 L58 43" stroke="#18181B" strokeWidth="4.5" strokeLinecap="round" />
            {/* Dot Eyes */}
            <circle cx="34" cy="49" r="4.5" fill="#18181B" />
            <circle cx="66" cy="49" r="4.5" fill="#18181B" />
            {/* Stern Frown */}
            <path
              d="M36 71 Q50 63 64 71"
              fill="none"
              stroke="#18181B"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        )

      case 'excited':
        // Bright Yellow squircle with >< squinting laughing eyes and big open grin
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            <rect x="5" y="5" width="90" height="90" rx="26" fill="#FDE047" />
            {/* Left >< squint eye */}
            <path
              d="M28 40 L38 46 L28 52"
              fill="none"
              stroke="#18181B"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right >< squint eye */}
            <path
              d="M72 40 L62 46 L72 52"
              fill="none"
              stroke="#18181B"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Big Open Happy Smile with Tongue */}
            <path d="M34 58 Q50 78 66 58 Z" fill="#18181B" />
            <path d="M42 67 Q50 63 58 67 Q50 78 42 67 Z" fill="#F472B6" />
          </svg>
        )

      case 'joyful':
        // Soft Peach squircle with smiling closed eyes, pink blush, open smile
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            <rect x="5" y="5" width="90" height="90" rx="26" fill="#FFB5A7" />
            {/* Curved smiling eye arcs */}
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
            {/* Pink Blush Dots */}
            <circle cx="23" cy="53" r="5" fill="#FB7185" opacity="0.65" />
            <circle cx="77" cy="53" r="5" fill="#FB7185" opacity="0.65" />
            {/* Open Cheer Smile */}
            <path d="M36 57 Q50 76 64 57 Z" fill="#18181B" />
            <path d="M43 66 Q50 62 57 66 Q50 76 43 66 Z" fill="#FB7185" />
          </svg>
        )

      case 'grateful':
        // Golden Warm Yellow squircle with gentle smiling eyes and warm peaceful grin
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            <rect x="5" y="5" width="90" height="90" rx="26" fill="#FCD34D" />
            {/* Peaceful closed eyes */}
            <path
              d="M28 46 Q36 40 44 46"
              fill="none"
              stroke="#18181B"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M56 46 Q64 40 72 46"
              fill="none"
              stroke="#18181B"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Soft Blush */}
            <circle cx="23" cy="53" r="4.5" fill="#F97316" opacity="0.4" />
            <circle cx="77" cy="53" r="4.5" fill="#F97316" opacity="0.4" />
            {/* Gentle Warm Smile */}
            <path
              d="M38 59 Q50 70 62 59"
              fill="none"
              stroke="#18181B"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          </svg>
        )

      case 'stressed':
        // Blush pink squircle with sweat drops, flushed cheeks, tense wavy mouth
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            <rect x="5" y="5" width="90" height="90" rx="26" fill="#FECDD3" />
            {/* Dripping sweat beads on forehead */}
            <path d="M32 23 C30 27 30 30 32 32 C34 34 36 32 35 28 Z" fill="#FFFFFF" />
            <path d="M50 20 C48 24 48 27 50 29 C52 31 54 29 53 25 Z" fill="#FFFFFF" />
            <path d="M68 23 C66 27 66 30 68 32 C70 34 72 32 71 28 Z" fill="#FFFFFF" />
            {/* Tense squinting eyes */}
            <circle cx="34" cy="48" r="4" fill="#18181B" />
            <circle cx="66" cy="48" r="4" fill="#18181B" />
            {/* Flushed vertical cheek blush marks */}
            <path d="M22 56 L22 66 M26 56 L26 66 M30 56 L30 66" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M70 56 L70 66 M74 56 L74 66 M78 56 L78 66" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />
            {/* Tense squiggly mouth */}
            <path
              d="M38 72 Q44 76 50 72 Q56 68 62 72"
              fill="none"
              stroke="#18181B"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          </svg>
        )

      case 'hurt':
        // Sage mint squircle with sad downward brows and streaming blue tears
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            <rect x="5" y="5" width="90" height="90" rx="26" fill="#A7D7C5" />
            {/* Sad downward curved brows */}
            <path d="M26 38 Q34 32 42 38" fill="none" stroke="#18181B" strokeWidth="4" strokeLinecap="round" />
            <path d="M58 38 Q66 32 74 38" fill="none" stroke="#18181B" strokeWidth="4" strokeLinecap="round" />
            {/* Sad eyes */}
            <circle cx="34" cy="48" r="4.5" fill="#18181B" />
            <circle cx="66" cy="48" r="4.5" fill="#18181B" />
            {/* Streaming teardrops */}
            <path d="M34 54 C31 59 31 64 34 67 C37 70 41 67 39 60 Z" fill="#0284C7" />
            <path d="M66 54 C63 59 63 64 66 67 C69 70 73 67 71 60 Z" fill="#0284C7" />
            {/* Quivering sad mouth */}
            <path
              d="M36 71 Q50 63 64 71"
              fill="none"
              stroke="#18181B"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        )

      default:
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            <rect x="5" y="5" width="90" height="90" rx="26" fill="#FDE047" />
            <circle cx="34" cy="46" r="5" fill="#18181B" />
            <circle cx="66" cy="46" r="5" fill="#18181B" />
            <path d="M38 60 Q50 72 62 60" fill="none" stroke="#18181B" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        )
    }
  }

  return (
    <div
      className={`inline-flex flex-col items-center justify-center select-none ${className}`}
      onClick={onClick}
    >
      <motion.div
        className="relative flex items-center justify-center filter drop-shadow-sm transition-transform duration-300"
        style={{ width: size, height: size }}
        whileHover={{ scale: 1.05, rotate: [-1, 1, 0] }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        role="img"
        aria-label={`Financial mood mascot: ${meta.label} (${meta.vibe})`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={mood}
            initial={{ scale: 0.8, opacity: 0, rotate: -4 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotate: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="w-full h-full flex items-center justify-center"
          >
            {renderMascotGraphic()}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {showLabel && (
        <span className="mt-2 text-xs font-bold text-zinc-800 tracking-wide capitalize">
          {meta.label}
        </span>
      )}
    </div>
  )
}
