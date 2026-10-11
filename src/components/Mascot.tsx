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
  size = 120,
  showLabel = false,
  className = '',
  onClick,
}) => {
  const meta = MASCOT_METADATA[mood] || MASCOT_METADATA.joyful

  // Render SVG Shape and Eyes/Face for the respective Mood
  const renderMascotGraphic = () => {
    switch (mood) {
      case 'excited':
        // Pink circle with smiling closed eyes and happy smile
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            <circle cx="50" cy="50" r="46" fill="#F472B6" />
            {/* Left closed eye */}
            <path
              d="M32 46 Q38 38 44 46"
              fill="none"
              stroke="#18181B"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Right closed eye */}
            <path
              d="M56 46 Q62 38 68 46"
              fill="none"
              stroke="#18181B"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Smile */}
            <path
              d="M40 56 Q50 67 60 56"
              fill="none"
              stroke="#18181B"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          </svg>
        )

      case 'joyful':
        // Pink 4-petal flower/clover
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            <g fill="#F472B6">
              <circle cx="34" cy="34" r="24" />
              <circle cx="66" cy="34" r="24" />
              <circle cx="34" cy="66" r="24" />
              <circle cx="66" cy="66" r="24" />
              <rect x="22" y="22" width="56" height="56" rx="14" />
            </g>
            {/* Eyes */}
            <path
              d="M36 48 Q41 40 46 48"
              fill="none"
              stroke="#18181B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M54 48 Q59 40 64 48"
              fill="none"
              stroke="#18181B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Smile */}
            <path
              d="M42 56 Q50 66 58 56"
              fill="none"
              stroke="#18181B"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        )

      case 'grateful':
        // Purple pill / rounded rectangle with wavy top
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            <rect x="14" y="16" width="72" height="68" rx="28" fill="#9333EA" />
            <path
              d="M34 46 Q40 39 46 46"
              fill="none"
              stroke="#18181B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M54 46 Q60 39 66 46"
              fill="none"
              stroke="#18181B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M42 57 Q50 66 58 57"
              fill="none"
              stroke="#18181B"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        )

      case 'energized':
        // Purple tulip / 3-bump flower
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            <path
              d="M16 36 Q16 20 30 20 Q40 20 44 32 Q50 20 56 32 Q60 20 70 20 Q84 20 84 36 C84 68 76 84 50 84 C24 84 16 68 16 36 Z"
              fill="#9333EA"
            />
            <path
              d="M34 48 Q40 41 46 48"
              fill="none"
              stroke="#18181B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M54 48 Q60 41 66 48"
              fill="none"
              stroke="#18181B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M42 58 Q50 67 58 58"
              fill="none"
              stroke="#18181B"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        )

      case 'sensitive':
        // Cyan/blue arch with tear drop
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            <path
              d="M16 84 L16 46 C16 22 84 22 84 46 L84 84 C84 88 80 88 76 88 L24 88 C20 88 16 88 16 84 Z"
              fill="#0284C7"
            />
            {/* Drooping sad eyes */}
            <path
              d="M32 50 Q38 56 44 50"
              fill="none"
              stroke="#18181B"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M56 50 Q62 56 68 50"
              fill="none"
              stroke="#18181B"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* White teardrop under left eye */}
            <path
              d="M37 60 C34 64 34 68 37 71 C40 74 44 71 42 66 Z"
              fill="#FFFFFF"
            />
          </svg>
        )

      case 'confused':
        // Royal blue hexagon with swirling eyes
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            <polygon
              points="50,12 85,28 85,72 50,88 15,72 15,28"
              fill="#2563EB"
              stroke="#2563EB"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            {/* Left eye: white with black pupil */}
            <circle cx="36" cy="50" r="11" fill="#FFFFFF" />
            <circle cx="38" cy="50" r="5" fill="#18181B" />
            {/* Right eye: white with orange spiral */}
            <circle cx="64" cy="50" r="13" fill="#FFFFFF" />
            <path
              d="M64 50 m -7,0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0 m 3,0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0"
              fill="none"
              stroke="#EA580C"
              strokeWidth="2.5"
            />
          </svg>
        )

      case 'bored':
        // Green circle with unamused eyes
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            <circle cx="50" cy="50" r="46" fill="#15803D" />
            {/* Big white eyes side by side */}
            <circle cx="41" cy="50" r="11" fill="#FFFFFF" />
            <circle cx="42" cy="50" r="4.5" fill="#18181B" />
            <circle cx="59" cy="50" r="11" fill="#FFFFFF" />
            <circle cx="58" cy="50" r="4.5" fill="#18181B" />
          </svg>
        )

      case 'stressed':
        // Emerald triangle with > < squint eyes
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            <polygon
              points="50,14 88,82 12,82"
              fill="#059669"
              stroke="#059669"
              strokeWidth="10"
              strokeLinejoin="round"
            />
            {/* Left squint eye > */}
            <path
              d="M36 52 L44 57 L36 62"
              fill="none"
              stroke="#18181B"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right squint eye < */}
            <path
              d="M64 52 L56 57 L64 62"
              fill="none"
              stroke="#18181B"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Flat mouth */}
            <line
              x1="44"
              y1="69"
              x2="56"
              y2="69"
              stroke="#18181B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        )

      case 'angry':
        // Orange square with flat stern unamused brow
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            <rect x="14" y="14" width="72" height="72" rx="20" fill="#EA580C" />
            {/* Stern flat brow eyes */}
            <circle cx="38" cy="50" r="5.5" fill="#FFFFFF" />
            <circle cx="39" cy="50" r="3" fill="#18181B" />
            <circle cx="62" cy="50" r="5.5" fill="#FFFFFF" />
            <circle cx="61" cy="50" r="3" fill="#18181B" />
            <line
              x1="32"
              y1="43"
              x2="45"
              y2="44"
              stroke="#18181B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <line
              x1="55"
              y1="44"
              x2="68"
              y2="43"
              stroke="#18181B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Flat line mouth */}
            <line
              x1="40"
              y1="64"
              x2="60"
              y2="64"
              stroke="#18181B"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        )

      case 'insecure':
        // Orange circle with peering telescope
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            <circle cx="50" cy="50" r="46" fill="#EA580C" />
            {/* Peeking telescope eye cylinder */}
            <rect x="42" y="47" width="28" height="12" rx="4" fill="#FFFFFF" />
            <circle cx="42" cy="53" r="10" fill="#FFFFFF" />
            <circle cx="40" cy="53" r="5" fill="#18181B" />
            <circle cx="68" cy="53" r="3" fill="#EA580C" />
          </svg>
        )

      case 'hurt':
        // Orange 3-layer rippled squircle
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            <g fill="#D97706">
              <rect x="16" y="16" width="68" height="22" rx="11" />
              <rect x="14" y="38" width="72" height="24" rx="12" />
              <rect x="16" y="62" width="68" height="22" rx="11" />
            </g>
            {/* Flat sleepy eyes */}
            <line
              x1="34"
              y1="48"
              x2="46"
              y2="48"
              stroke="#18181B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <line
              x1="54"
              y1="48"
              x2="66"
              y2="48"
              stroke="#18181B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Flat mouth */}
            <line
              x1="44"
              y1="60"
              x2="56"
              y2="60"
              stroke="#18181B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        )

      case 'guilty':
        // Golden-yellow quarter circle / wedge
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
            {/* Quarter circle wedge */}
            <path
              d="M14 84 L86 84 C86 46 86 16 86 16 C46 16 14 48 14 84 Z"
              fill="#EAB308"
            />
            {/* Guilty eyes looking up and to the right */}
            <circle cx="48" cy="62" r="9" fill="#FFFFFF" />
            <circle cx="51" cy="59" r="4" fill="#18181B" />
            <circle cx="68" cy="64" r="9" fill="#FFFFFF" />
            <circle cx="71" cy="61" r="4" fill="#18181B" />
          </svg>
        )

      default:
        return null
    }
  }

  return (
    <div
      className={`inline-flex flex-col items-center select-none ${className}`}
      onClick={onClick}
      role="img"
      aria-label={`Financial mood mascot: ${meta.label}`}
    >
      <motion.div
        animate={{
          y: [0, -6, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.2,
          ease: 'easeInOut',
        }}
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={mood}
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
            transition={{ type: 'spring', damping: 16, stiffness: 220 }}
            className="w-full h-full drop-shadow-sm flex items-center justify-center"
          >
            {renderMascotGraphic()}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {showLabel && (
        <motion.div
          key={`label-${mood}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-center"
        >
          <span
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full border border-black/10 shadow-sm"
            style={{ backgroundColor: meta.bg, color: '#18181B' }}
          >
            {meta.label}
          </span>
        </motion.div>
      )}
    </div>
  )
}
