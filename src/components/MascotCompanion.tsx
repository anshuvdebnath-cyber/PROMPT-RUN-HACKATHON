import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFinance } from '../context/useFinance'
import { Mascot } from './Mascot'
import { MascotMood } from '../types/finance'

interface ThoughtItem {
  text: string
  mood: MascotMood
}

const HINGLISH_THOUGHTS: ThoughtItem[] = [
  // Witty & humorous thoughts
  { text: 'Mera bank account aur mera gym: dono me mahino se koi gains nahi dikh rahe! 😭', mood: 'hurt' },
  { text: 'Paisa haath ka mail hota hai... isliye mere haath hamesha sanitized rehte hain! 🧼', mood: 'joyful' },
  { text: "Dost ne bola 'Bro treat de'... Maine bola 'Bhai filter ka paani piyega ya direct tap water?' 🚰", mood: 'stressed' },
  { text: 'Card swipe karne se pehle jo OTP aata hai, wahi ek message hai jo dil cheer deta hai! 💔', mood: 'hurt' },
  { text: "Bhagwan ne sab kuch diya... bas 'Insufficient Balance' wala popup hatana bhool gaya! 📱", mood: 'angry' },
  { text: 'Salary credit hoti hai 1 second me, aur gayab hoti hai 0.5 second me... Speed dekh rahe ho? 🚀', mood: 'stressed' },
  { text: "Main: 'Aaj se paise bachaunga'. Zomato 50% Off: 'Are you sure about that bro?' 🍕", mood: 'angry' },
  { text: 'Wallet kholte hi lagta hai CBI ka raid pad chuka hai... poora khali boss! 📉', mood: 'hurt' },
  // Roasts & reality checks
  { text: 'Bhai aukaat se bahar jaake iced coffee peene se ameer nahi banoge, bas gareeb lagoge! ☕', mood: 'angry' },
  { text: 'Wallet me chillar nahi bacha aur sapne Ambani wale! Thoda grounded ho ja mere bhai! 🤡', mood: 'hurt' },
  { text: "₹200 ke momos kha ke bolte ho 'Economy bohot kharab hai'... Bhai tu kharab kar raha hai! 🥟", mood: 'angry' },
  { text: 'Bhai month ke start me King Kohli, aur aakhri hafte me Maggi pe zinda! Kab sudhrega tu? 🍜', mood: 'stressed' },
  { text: "Delulu pro max: 'Agli salary se pakka 50% save karunga'. Khud se jhoot bolna band kar! 🤥", mood: 'stressed' },
  { text: 'Bhai pocket me ₹150 bache hain aur Swiggy cart me ₹650 ki Biryani add karke baitha hai! BFFR! 🍗', mood: 'angry' },
  // Mindful & Gen Z gyan
  { text: 'Very demure, very mindful... Auto wale se ₹20 bargain karke bacha liye! Peak rizz! 🛺', mood: 'grateful' },
  { text: 'Ameer banne chale the, ₹10 ki cutting chai pe discuss kar rahe hain Elon Musk ka stock! ☕', mood: 'joyful' },
  { text: 'No cap bhai, agar aaj fokat ka kharcha control kar liya toh weekend pe guilt-free chill maaroge! ✨', mood: 'excited' },
  { text: 'Golden Rule: Jab tak card decline na ho, tab tak delulu ameer hain hum! Par card bachao! 💳', mood: 'grateful' },
  { text: 'Bhai balance baar baar check mat kar, dard hota hai. Bas screen lock kar aur deep breath le! 🧘', mood: 'joyful' },
  { text: 'Riyal talk: Agar discount mil raha hai par zaroorat nahi hai, toh 100% loss hai boss! 🛑', mood: 'stressed' },
]

export const MascotCompanion: React.FC = () => {
  const { effectiveMetrics, transactions, currentDay, simulation } = useFinance()
  const [isOpen, setIsOpen] = useState(true)
  const thoughtIndexRef = useRef(0)
  const [currentThought, setCurrentThought] = useState<ThoughtItem>({
    text: 'Bhai balance baar baar check mat kar, dard hota hai. Bas screen lock kar aur deep breath le! 🧘',
    mood: effectiveMetrics.mascotMood,
  })

  // Track state changes to trigger automatic reactive popups
  const prevTxCount = useRef(transactions.length)
  const prevDay = useRef(currentDay)
  const prevSimActive = useRef(simulation.isActive)

  // Auto react when an expense is added
  useEffect(() => {
    if (transactions.length > prevTxCount.current) {
      const latest = transactions[transactions.length - 1]
      if (latest) {
        const reactions: ThoughtItem[] = [
          {
            text: `Arrey bhai! Naya kharcha '₹${latest.amount.toLocaleString('en-IN')} on ${latest.title}'? Pocket bol rahi hai 'Reham kar de bhai!' 💸`,
            mood: 'hurt',
          },
          {
            text: `Bhai ₹${latest.amount.toLocaleString('en-IN')} gayab! Swiggy tha ya shopping? Thoda demure ban na seekho! 😭`,
            mood: 'stressed',
          },
          {
            text: `Kharcha noted boss! Par wallet dekh ke lag raha hai Maggi emergency aane wali hai! 🍜`,
            mood: 'angry',
          },
        ]
        const pick = reactions[Math.floor(Math.random() * reactions.length)]
        const timer = setTimeout(() => {
          setCurrentThought(pick)
          setIsOpen(true)
        }, 10)
        return () => clearTimeout(timer)
      }
    }
    prevTxCount.current = transactions.length
  }, [transactions])

  // Auto react when Day advances
  useEffect(() => {
    if (currentDay > prevDay.current) {
      const dayReactions: ThoughtItem[] = [
        {
          text: `Day ${currentDay} chalu! Naya din, nayi kangaali! Aaj ka daily limit dekh ke hi haath kholna boss! ☀️`,
          mood: 'grateful',
        },
        {
          text: `Day ${currentDay} survived! Ek aur din bach gaye bina loan liye, no cap bhai! 🥳`,
          mood: 'excited',
        },
      ]
      const pick = dayReactions[Math.floor(Math.random() * dayReactions.length)]
      const timer = setTimeout(() => {
        setCurrentThought(pick)
        setIsOpen(true)
      }, 10)
      return () => clearTimeout(timer)
    }
    prevDay.current = currentDay
  }, [currentDay])

  // Auto react when What-If simulation turns on
  useEffect(() => {
    if (simulation.isActive && !prevSimActive.current) {
      const timer = setTimeout(() => {
        setCurrentThought({
          text: `Oho! What-If test kar rahe ho? Dekh lo ₹${simulation.proposedAmount} kharch karne se kitna dard hoga! 🧐`,
          mood: 'stressed',
        })
        setIsOpen(true)
      }, 10)
      return () => clearTimeout(timer)
    }
    prevSimActive.current = simulation.isActive
  }, [simulation.isActive, simulation.proposedAmount])

  // Random automatic thought cloud pop-up every 16 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      thoughtIndexRef.current = (thoughtIndexRef.current + 1) % HINGLISH_THOUGHTS.length
      setCurrentThought(HINGLISH_THOUGHTS[thoughtIndexRef.current])
      setIsOpen(true)
    }, 16000)

    return () => clearInterval(interval)
  }, [])

  // Tapping the mascot cycles to the next thought and pops the cloud
  const handleMascotTap = () => {
    thoughtIndexRef.current = (thoughtIndexRef.current + 1) % HINGLISH_THOUGHTS.length
    setCurrentThought(HINGLISH_THOUGHTS[thoughtIndexRef.current])
    setIsOpen(true)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto select-none">
      {/* Movie-style Thinking Cloud Pop-up */}
      <AnimatePresence>
        {isOpen && (
          <div className="relative mb-2 flex flex-col items-end cursor-pointer" onClick={handleMascotTap} title="Tap mascot or cloud for next thought">
            {/* The Main Puffy Thought Cloud with iconic comic lobes */}
            <motion.div
              key={currentThought.text}
              initial={{ scale: 0, opacity: 0, y: 35, transformOrigin: 'bottom right' }}
              animate={{
                scale: [0, 1.14, 0.96, 1],
                opacity: 1,
                y: 0,
              }}
              exit={{ scale: 0, opacity: 0, y: 20, transition: { duration: 0.25 } }}
              transition={{
                duration: 0.45,
                delay: 0.28,
                times: [0, 0.6, 0.85, 1],
                ease: 'easeOut',
              }}
              className="relative max-w-[280px] sm:max-w-[320px] px-6 py-5 rounded-[40px] bg-white/98 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.20)] border-2 border-black/8"
            >
              {/* Outer decorative cloud puffs/lobes for iconic movie cloud shape */}
              <div className="absolute -top-3 left-10 w-12 h-7 bg-white/98 rounded-full border-t-2 border-black/8 pointer-events-none" />
              <div className="absolute -top-4.5 left-24 w-16 h-10 bg-white/98 rounded-full border-t-2 border-black/8 pointer-events-none" />
              <div className="absolute -top-3 right-12 w-12 h-7 bg-white/98 rounded-full border-t-2 border-black/8 pointer-events-none" />
              <div className="absolute -bottom-3 left-14 w-14 h-8 bg-white/98 rounded-full border-b-2 border-black/8 pointer-events-none" />
              <div className="absolute -left-3 top-5 w-8 h-12 bg-white/98 rounded-full border-l-2 border-black/8 pointer-events-none" />
              <div className="absolute -right-3 top-5 w-8 h-12 bg-white/98 rounded-full border-r-2 border-black/8 pointer-events-none" />

              {/* Only the Thought inside the cloud */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="relative z-10 text-[13.5px] font-extrabold text-zinc-900 leading-relaxed text-center tracking-tight"
              >
                "{currentThought.text}"
              </motion.p>
            </motion.div>

            {/* 3 Ascending Thought Bubbles trailing down to the mascot */}
            <div className="flex flex-col items-end pr-10 mt-1 -space-y-0.5">
              {/* Top largest bubble */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                className="w-5 h-5 rounded-full bg-white/98 border-2 border-black/8 shadow-xs"
              />
              {/* Middle bubble */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="w-3.5 h-3.5 rounded-full bg-white/98 border-2 border-black/8 shadow-2xs mr-2"
              />
              {/* Bottom smallest bubble closest to mascot head */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0 }}
                className="w-2.5 h-2.5 rounded-full bg-white/98 border-2 border-black/8 shadow-2xs mr-4"
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Mascot (Tapping changes the thought cloud) */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleMascotTap}
        className="relative cursor-pointer group"
        title="Tap to change BrokeBot's thought!"
      >
        {/* Soft ambient glow */}
        <div className="absolute inset-0 rounded-[30px] bg-amber-400/20 blur-xl -z-10 group-hover:bg-amber-400/35 transition-all duration-300" />

        {/* Clean squircle mascot container */}
        <div className="w-[96px] h-[96px] sm:w-[104px] sm:h-[104px] rounded-[30px] bg-white/95 backdrop-blur-md border-2 border-black/10 shadow-[0_14px_34px_-6px_rgba(0,0,0,0.16)] flex items-center justify-center p-1.5 transition-all group-hover:shadow-[0_18px_38px_-4px_rgba(0,0,0,0.22)]">
          <Mascot mood={currentThought.mood} size={88} />
        </div>
      </motion.div>
    </div>
  )
}
