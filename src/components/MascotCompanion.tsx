import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Flame, Laugh, HelpCircle, Utensils, RefreshCw } from 'lucide-react'
import { useFinance } from '../context/useFinance'
import { Mascot } from './Mascot'
import { MascotMood } from '../types/finance'

interface SpeechItem {
  text: string
  mood: MascotMood
  tag: string
}

const HINGLISH_JOKES: SpeechItem[] = [
  {
    text: 'Mera bank account aur mera gym: dono me mahino se koi gains nahi dikh rahe! 😭',
    mood: 'hurt',
    tag: 'Paisa Joke',
  },
  {
    text: 'Paisa haath ka mail hota hai... isliye mere haath hamesha sanitized rehte hain! 🧼',
    mood: 'joyful',
    tag: 'Clean Wallet',
  },
  {
    text: "Dost ne bola 'Bro treat de'... Maine bola 'Bhai filter ka paani piyega ya direct tap water?' 🚰",
    mood: 'stressed',
    tag: 'Treat Trauma',
  },
  {
    text: 'Card swipe karne se pehle jo OTP aata hai, wahi ek message hai jo dil cheer deta hai! 💔',
    mood: 'hurt',
    tag: 'OTP Trauma',
  },
  {
    text: "Bhagwan ne sab kuch diya... bas 'Insufficient Balance' wala popup hatana bhool gaya! 📱",
    mood: 'angry',
    tag: 'Bank Reality',
  },
  {
    text: 'Salary credit hoti hai 1 second me, aur gayab hoti hai 0.5 second me... Bro speed dekh rahe ho? 🚀',
    mood: 'stressed',
    tag: 'Salary Speed',
  },
  {
    text: "Main: 'Aaj se paise bachaunga'. Zomato 50% Off notification: 'Are you sure about that bro?' 🍕",
    mood: 'angry',
    tag: 'Zomato Trap',
  },
  {
    text: 'Wallet kholte hi lagta hai CBI ka raid pad chuka hai... poora khali boss! 📉',
    mood: 'hurt',
    tag: 'Empty Vault',
  },
]

const HINGLISH_ROASTS: SpeechItem[] = [
  {
    text: 'Bhai aukaat se bahar jaake iced coffee peene se ameer nahi banoge, bas gareeb lagoge! ☕',
    mood: 'angry',
    tag: 'Reality Check',
  },
  {
    text: 'Wallet me chillar nahi bacha aur sapne Ambani wale! Thoda grounded ho ja mere bhai! 🤡',
    mood: 'hurt',
    tag: 'Brutal Roast',
  },
  {
    text: "₹200 ke momos kha ke bolte ho 'Desh ki economy kharab chal rahi hai'... Bhai tu kharab kar raha hai! 🥟",
    mood: 'angry',
    tag: 'Momos Roast',
  },
  {
    text: 'Bhai month ke pehle hafte me King Kohli, aur aakhri hafte me Maggi pe zinda! Kab sudhrega tu? 🍜',
    mood: 'stressed',
    tag: 'Month-End Truth',
  },
  {
    text: "Delulu pro max: 'Agli salary se pakka 50% save karunga'. Bhai tu khud se jhoot bolna band kar! 🤥",
    mood: 'stressed',
    tag: 'Delulu Check',
  },
  {
    text: 'Bhai pocket me ₹150 bache hain aur Swiggy cart me ₹650 ki Biryani add kar ke baitha hai! BFFR! 🍗',
    mood: 'angry',
    tag: 'Swiggy Side-Eye',
  },
]

const HINGLISH_GYAN: SpeechItem[] = [
  {
    text: 'Very demure, very mindful... Auto wale se ₹20 bargain karke bacha liye! Peak financial rizz! 🛺',
    mood: 'grateful',
    tag: 'Mindful Gyan',
  },
  {
    text: 'Ameer banne chale the, ₹10 ki cutting chai pe discuss kar rahe hain Elon Musk ka stock! ☕',
    mood: 'joyful',
    tag: 'Chai Wisdom',
  },
  {
    text: 'No cap bhai, agar aaj fokat ka kharcha control kar liya toh weekend pe guilt-free chill maaroge! ✨',
    mood: 'excited',
    tag: 'No Cap Advice',
  },
  {
    text: 'Golden Rule: Jab tak card decline na ho, tab tak delulu ameer hain hum! Par please card bachao! 💳',
    mood: 'grateful',
    tag: 'Life Hack',
  },
  {
    text: 'Bhai balance baar baar check mat kar, dard hota hai. Bas screen lock kar aur deep breath le! 🧘',
    mood: 'joyful',
    tag: 'Peace Mindset',
  },
  {
    text: 'Riyal talk: Agar discount mil raha hai par zaroorat nahi hai, toh 100% loss hai boss! 🛑',
    mood: 'stressed',
    tag: 'Riyal Math',
  },
]

export const MascotCompanion: React.FC = () => {
  const { effectiveMetrics, transactions, currentDay, simulation } = useFinance()
  const [isOpen, setIsOpen] = useState(true)
  const [currentSpeech, setCurrentSpeech] = useState<SpeechItem>({
    text: 'Bhai balance baar baar check mat kar, dard hota hai. Bas screen lock kar aur deep breath le! 🧘',
    mood: effectiveMetrics.mascotMood,
    tag: 'Peace Mindset',
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
        const reactions: SpeechItem[] = [
          {
            text: `Arrey bhai! Naya kharcha '₹${latest.amount.toLocaleString('en-IN')} on ${latest.title}'? Pocket bol rahi hai 'Reham kar de bhai!' 💸`,
            mood: 'hurt',
            tag: 'Kharcha Alert!',
          },
          {
            text: `Bhai ₹${latest.amount.toLocaleString('en-IN')} gayab! Swiggy tha ya shopping? Thoda demure ban na seekho! 😭`,
            mood: 'stressed',
            tag: '4K Me Pakda Gaya',
          },
          {
            text: `Kharcha noted boss! Par wallet ki halat dekh ke lag raha hai Maggi emergency aane wali hai! 🍜`,
            mood: 'angry',
            tag: 'Budget Shock',
          },
        ]
        const pick = reactions[Math.floor(Math.random() * reactions.length)]
        const timer = setTimeout(() => {
          setCurrentSpeech(pick)
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
      const dayReactions: SpeechItem[] = [
        {
          text: `Day ${currentDay} chalu! Naya din, nayi kangaali! Aaj ka daily limit dekh ke hi haath kholna boss! ☀️`,
          mood: 'grateful',
          tag: 'Naya Din',
        },
        {
          text: `Day ${currentDay} survived! Ek aur din bach gaye bina loan liye, no cap bhai! 🥳`,
          mood: 'excited',
          tag: 'Level Up',
        },
      ]
      const pick = dayReactions[Math.floor(Math.random() * dayReactions.length)]
      const timer = setTimeout(() => {
        setCurrentSpeech(pick)
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
        setCurrentSpeech({
          text: `Oho! What-If simulation test kar rahe ho? Dekh lo ₹${simulation.proposedAmount} kharch karne se kitna dard hoga! 🧐`,
          mood: 'stressed',
          tag: 'What-If Vibe',
        })
        setIsOpen(true)
      }, 10)
      return () => clearTimeout(timer)
    }
    prevSimActive.current = simulation.isActive
  }, [simulation.isActive, simulation.proposedAmount])

  // Random automatic popup / thought cloud rotation every 14-18 seconds
  useEffect(() => {
    const allThoughts = [...HINGLISH_JOKES, ...HINGLISH_ROASTS, ...HINGLISH_GYAN]
    const interval = setInterval(() => {
      // Pick a random thought and pop the cloud out
      const randomPick = allThoughts[Math.floor(Math.random() * allThoughts.length)]
      setCurrentSpeech(randomPick)
      setIsOpen(true)
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  // Quick category triggers
  const triggerJoke = () => {
    const joke = HINGLISH_JOKES[Math.floor(Math.random() * HINGLISH_JOKES.length)]
    setCurrentSpeech(joke)
    setIsOpen(true)
  }

  const triggerRoast = () => {
    const roast = HINGLISH_ROASTS[Math.floor(Math.random() * HINGLISH_ROASTS.length)]
    setCurrentSpeech(roast)
    setIsOpen(true)
  }

  const triggerGyan = () => {
    const gyan = HINGLISH_GYAN[Math.floor(Math.random() * HINGLISH_GYAN.length)]
    setCurrentSpeech(gyan)
    setIsOpen(true)
  }

  const triggerSwiggyCheck = () => {
    const allowance = effectiveMetrics.dynamicDailyAllowance
    if (allowance >= 200) {
      setCurrentSpeech({
        text: `Bhai green signal hai! Aaj ₹${allowance}/day ka limit hai. Ek shawarma ya roll kha sakte ho, par gourmet truffle mat order karna! 🌯`,
        mood: 'joyful',
        tag: 'Swiggy Permitted',
      })
    } else if (allowance >= 90) {
      setCurrentSpeech({
        text: `Bhai borderline scene hai! ₹${allowance}/day bacha hai. Zomato cart band kar aur ghar ka toast khao chup-chaap! ⚠️`,
        mood: 'stressed',
        tag: 'Swiggy Danger',
      })
    } else {
      setCurrentSpeech({
        text: `BFFR (Be for real)! Allowance ₹${allowance}/day hai aur Zomato khol rahe ho? Total kangaali vibes! Paani pi ke so jao! 🚫`,
        mood: 'angry',
        tag: 'Swiggy Denied',
      })
    }
    setIsOpen(true)
  }

  const triggerVibeCheck = () => {
    const balance = effectiveMetrics.currentBalance
    if (balance > 6000) {
      setCurrentSpeech({
        text: `Full ameer vibes boss! ₹${balance.toLocaleString('en-IN')} bache hain, wallet ekdum solid hai no cap! 💎`,
        mood: 'excited',
        tag: 'Vibe Check',
      })
    } else if (balance > 2500) {
      setCurrentSpeech({
        text: `Safe chal rahe ho. ₹${balance.toLocaleString('en-IN')} balance hai. Zyada hawa me mat udna, month-end aane wala hai! 🛡️`,
        mood: 'grateful',
        tag: 'Vibe Check',
      })
    } else if (balance > 500) {
      setCurrentSpeech({
        text: `Tight scene hai bhai! Sirf ₹${balance.toLocaleString('en-IN')} bacha hai. Pocket bol rahi hai 'Reham kar de!' 🚨`,
        mood: 'stressed',
        tag: 'Vibe Check',
      })
    } else {
      setCurrentSpeech({
        text: `Total kangaali alert! Balance ₹${balance.toLocaleString('en-IN')}. Down catastrophic! Emergency saving mode mandatory! 😭`,
        mood: 'hurt',
        tag: 'Vibe Check',
      })
    }
    setIsOpen(true)
  }

  // Clicking the floating mascot directly pops a new random thought in the cloud
  const handleMascotClick = () => {
    const pool = [...HINGLISH_JOKES, ...HINGLISH_ROASTS, ...HINGLISH_GYAN]
    const randomPick = pool[Math.floor(Math.random() * pool.length)]
    setCurrentSpeech(randomPick)
    setIsOpen(true)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto select-none">
      {/* Thought Cloud Pop-up */}
      <AnimatePresence>
        {isOpen && (
          <div className="relative mb-2 flex flex-col items-end">
            {/* Main Cloud Body */}
            <motion.div
              initial={{ scale: 0.15, opacity: 0, y: 25, transformOrigin: 'bottom right' }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.2, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 18, stiffness: 280, mass: 0.7 }}
              className="w-[285px] sm:w-[325px] rounded-[34px] bg-white/95 backdrop-blur-xl border-2 border-black/8 shadow-[0_18px_45px_-10px_rgba(0,0,0,0.18)] p-4 relative"
            >
              {/* Cloud Header / Tag bar */}
              <div className="flex items-center justify-between pb-1.5 border-b border-black/6">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-500 text-xs">💭</span>
                  <span className="text-[11px] font-black uppercase tracking-wider text-zinc-700">
                    {currentSpeech.tag}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleMascotClick}
                    className="w-6 h-6 rounded-full bg-black/4 hover:bg-black/8 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                    title="Next Thought"
                    aria-label="Next Thought"
                  >
                    <RefreshCw size={11} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-6 h-6 rounded-full bg-black/4 hover:bg-black/8 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                    title="Dismiss Cloud"
                    aria-label="Close Thought Cloud"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>

              {/* Cloud Thought Message */}
              <div className="py-2.5">
                <p className="text-[13px] font-bold text-zinc-900 leading-relaxed tracking-tight">
                  "{currentSpeech.text}"
                </p>
              </div>

              {/* Thought prompt buttons */}
              <div className="pt-2 border-t border-black/6 flex flex-wrap gap-1.5">
                <button
                  onClick={triggerJoke}
                  className="px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-[10px] font-black border border-amber-200/80 cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center gap-1"
                >
                  <Laugh size={11} /> Joke
                </button>
                <button
                  onClick={triggerRoast}
                  className="px-2.5 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 text-[10px] font-black border border-rose-200/80 cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center gap-1"
                >
                  <Flame size={11} /> Roast
                </button>
                <button
                  onClick={triggerSwiggyCheck}
                  className="px-2.5 py-1 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-900 text-[10px] font-black border border-orange-200/80 cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center gap-1"
                >
                  <Utensils size={11} /> Swiggy?
                </button>
                <button
                  onClick={triggerGyan}
                  className="px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-[10px] font-black border border-emerald-200/80 cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center gap-1"
                >
                  <Sparkles size={11} /> Gyan
                </button>
                <button
                  onClick={triggerVibeCheck}
                  className="px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-[10px] font-black border border-purple-200/80 cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center gap-1"
                >
                  <HelpCircle size={11} /> Vibe
                </button>
              </div>
            </motion.div>

            {/* Thought Cloud Connecting Bubbles */}
            <div className="flex flex-col items-end pr-10 -space-y-0.5">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.05 }}
                className="w-4 h-4 rounded-full bg-white/95 border-2 border-black/8 shadow-xs"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="w-2.5 h-2.5 rounded-full bg-white/95 border-2 border-black/8 shadow-2xs mr-2"
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Mascot without any "Tap me" tag */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleMascotClick}
        className="relative cursor-pointer group"
        title="BrokeBot Thought Cloud"
      >
        {/* Ambient glow shadow */}
        <div className="absolute inset-0 rounded-[30px] bg-amber-400/20 blur-xl -z-10 group-hover:bg-amber-400/35 transition-all duration-300" />

        {/* Mascot Squircle Container (Enlarged and completely clean, no badge) */}
        <div className="w-[96px] h-[96px] sm:w-[104px] sm:h-[104px] rounded-[30px] bg-white/95 backdrop-blur-md border-2 border-black/10 shadow-[0_14px_34px_-6px_rgba(0,0,0,0.16)] flex items-center justify-center p-1.5 transition-all group-hover:shadow-[0_18px_38px_-4px_rgba(0,0,0,0.22)]">
          <Mascot mood={currentSpeech.mood} size={88} />
        </div>
      </motion.div>
    </div>
  )
}
