import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Flame, Laugh, HelpCircle, Utensils, MessageCircle } from 'lucide-react'
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
    tag: '🤡 Paisa Joke',
  },
  {
    text: 'Paisa haath ka mail hota hai... isliye mere haath hamesha sanitized rehte hain! 🧼',
    mood: 'joyful',
    tag: '🤡 Clean Wallet',
  },
  {
    text: "Dost ne bola 'Bro treat de'... Maine bola 'Bhai filter ka paani piyega ya direct tap water?' 🚰",
    mood: 'stressed',
    tag: '🤡 Treat Trauma',
  },
  {
    text: 'Card swipe karne se pehle jo OTP aata hai, wahi ek message hai jo dil cheer deta hai! 💔',
    mood: 'hurt',
    tag: '🤡 OTP Trauma',
  },
  {
    text: "Bhagwan ne sab kuch diya... bas 'Insufficient Balance' wala popup hatana bhool gaya! 📱",
    mood: 'angry',
    tag: '🤡 Bank Reality',
  },
  {
    text: 'Salary credit hoti hai 1 second me, aur gayab hoti hai 0.5 second me... Bro speed dekh rahe ho? 🚀',
    mood: 'stressed',
    tag: '🤡 Salary Speed',
  },
  {
    text: "Main: 'Aaj se paise bachaunga'. Zomato 50% Off notification: 'Are you sure about that bro?' 🍕",
    mood: 'angry',
    tag: '🤡 Zomato Trap',
  },
  {
    text: 'Wallet kholte hi lagta hai CBI ka raid pad chuka hai... poora khali boss! 📉',
    mood: 'hurt',
    tag: '🤡 Empty Vault',
  },
]

const HINGLISH_ROASTS: SpeechItem[] = [
  {
    text: 'Bhai aukaat se bahar jaake iced coffee peene se ameer nahi banoge, bas gareeb lagoge! ☕',
    mood: 'angry',
    tag: '🔥 Reality Check',
  },
  {
    text: 'Wallet me chillar nahi bacha aur sapne Ambani wale! Thoda grounded ho ja mere bhai! 🤡',
    mood: 'hurt',
    tag: '🔥 Brutal Roast',
  },
  {
    text: "₹200 ke momos kha ke bolte ho 'Desh ki economy kharab chal rahi hai'... Bhai tu kharab kar raha hai! 🥟",
    mood: 'angry',
    tag: '🔥 Momos Roast',
  },
  {
    text: 'Bhai month ke pehle hafte me King Kohli, aur aakhri hafte me Maggi pe zinda! Kab sudhrega tu? 🍜',
    mood: 'stressed',
    tag: '🔥 Month-End Truth',
  },
  {
    text: "Delulu pro max: 'Agli salary se pakka 50% save karunga'. Bhai tu khud se jhoot bolna band kar! 🤥",
    mood: 'stressed',
    tag: '🔥 Delulu Check',
  },
  {
    text: 'Bhai pocket me ₹150 bache hain aur Swiggy cart me ₹650 ki Biryani add kar ke baitha hai! BFFR! 🍗',
    mood: 'angry',
    tag: '🔥 Swiggy Side-Eye',
  },
]

const HINGLISH_GYAN: SpeechItem[] = [
  {
    text: 'Very demure, very mindful... Auto wale se ₹20 bargain karke bacha liye! Peak financial rizz! 🛺',
    mood: 'grateful',
    tag: '✨ Mindful Gyan',
  },
  {
    text: 'Ameer banne chale the, ₹10 ki cutting chai pe discuss kar rahe hain Elon Musk ka stock! ☕',
    mood: 'joyful',
    tag: '✨ Chai Wisdom',
  },
  {
    text: 'No cap bhai, agar aaj fokat ka kharcha control kar liya toh weekend pe guilt-free chill maaroge! ✨',
    mood: 'excited',
    tag: '✨ No Cap Advice',
  },
  {
    text: 'Golden Rule: Jab tak card decline na ho, tab tak delulu ameer hain hum! Par please card bachao! 💳',
    mood: 'grateful',
    tag: '✨ Life Hack',
  },
  {
    text: 'Bhai balance baar baar check mat kar, dard hota hai. Bas screen lock kar aur deep breath le! 🧘',
    mood: 'joyful',
    tag: '✨ Peace Mindset',
  },
  {
    text: 'Riyal talk: Agar discount mil raha hai par zaroorat nahi hai, toh 100% loss hai boss! 🛑',
    mood: 'stressed',
    tag: '✨ Riyal Math',
  },
]

export const MascotCompanion: React.FC = () => {
  const { effectiveMetrics, transactions, currentDay, simulation } = useFinance()
  const [isOpen, setIsOpen] = useState(true)
  const [currentSpeech, setCurrentSpeech] = useState<SpeechItem>({
    text: 'Yo bhai! BrokeBot here. Live tracking chalu hai. Koi bhi kharcha karo ya tap karo, main reality check dunga! 😎',
    mood: effectiveMetrics.mascotMood,
    tag: '🤖 Pocket Saathi',
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
            tag: '🚨 Kharcha Alert!',
          },
          {
            text: `Bhai ₹${latest.amount.toLocaleString('en-IN')} gayab! Swiggy tha ya shopping? Thoda demure ban na seekho! 😭`,
            mood: 'stressed',
            tag: '🚨 4K Me Pakda Gaya',
          },
          {
            text: `Kharcha noted boss! Par wallet ki halat dekh ke lag raha hai Maggi emergency aane wali hai! 🍜`,
            mood: 'angry',
            tag: '🚨 Budget Shock',
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
          tag: '📅 Naya Din',
        },
        {
          text: `Day ${currentDay} survived! Ek aur din bach gaye bina loan liye, no cap bhai! 🥳`,
          mood: 'excited',
          tag: '📅 Level Up',
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
          tag: '🧪 What-If Vibe',
        })
        setIsOpen(true)
      }, 10)
      return () => clearTimeout(timer)
    }
    prevSimActive.current = simulation.isActive
  }, [simulation.isActive, simulation.proposedAmount])

  // Handle manual interaction buttons
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
        tag: '🍕 Swiggy Permitted',
      })
    } else if (allowance >= 90) {
      setCurrentSpeech({
        text: `Bhai borderline scene hai! ₹${allowance}/day bacha hai. Zomato cart band kar aur ghar ka toast khao chup-chaap! ⚠️`,
        mood: 'stressed',
        tag: '⚠️ Swiggy Danger',
      })
    } else {
      setCurrentSpeech({
        text: `BFFR (Be for real)! Allowance ₹${allowance}/day hai aur Zomato khol rahe ho? Total kangaali vibes! Paani pi ke so jao! 🚫`,
        mood: 'angry',
        tag: '🛑 Swiggy Denied',
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
        tag: '✨ Vibe Check',
      })
    } else if (balance > 2500) {
      setCurrentSpeech({
        text: `Safe chal rahe ho. ₹${balance.toLocaleString('en-IN')} balance hai. Zyada hawa me mat udna, month-end aane wala hai! 🛡️`,
        mood: 'grateful',
        tag: '✨ Vibe Check',
      })
    } else if (balance > 500) {
      setCurrentSpeech({
        text: `Tight scene hai bhai! Sirf ₹${balance.toLocaleString('en-IN')} bacha hai. Pocket bol rahi hai 'Reham kar de!' 🚨`,
        mood: 'stressed',
        tag: '✨ Vibe Check',
      })
    } else {
      setCurrentSpeech({
        text: `Total kangaali alert! Balance ₹${balance.toLocaleString('en-IN')}. Down catastrophic! Emergency saving mode mandatory! 😭`,
        mood: 'hurt',
        tag: '💀 Vibe Check',
      })
    }
    setIsOpen(true)
  }

  // Clicking the floating mascot directly cycles a fresh funny quip
  const handleMascotClick = () => {
    const pool = [...HINGLISH_JOKES, ...HINGLISH_ROASTS, ...HINGLISH_GYAN]
    const randomPick = pool[Math.floor(Math.random() * pool.length)]
    setCurrentSpeech(randomPick)
    setIsOpen(true)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto select-none">
      {/* Speech Bubble / Callout Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.92 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="mb-3 w-[290px] sm:w-[330px] rounded-3xl bg-white/95 backdrop-blur-xl border border-black/10 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.18)] p-4 relative"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between pb-2 border-b border-black/6">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-wider text-zinc-700">
                  {currentSpeech.tag}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
                title="Minimize speech bubble"
                aria-label="Close speech bubble"
              >
                <X size={13} />
              </button>
            </div>

            {/* Speech message body */}
            <div className="py-2.5">
              <p className="text-[13px] font-bold text-zinc-900 leading-relaxed">
                "{currentSpeech.text}"
              </p>
            </div>

            {/* Interactive reaction quick-pills */}
            <div className="pt-2 border-t border-black/6 flex flex-wrap gap-1.5">
              <button
                onClick={triggerJoke}
                className="px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-[10.5px] font-extrabold border border-amber-200/80 cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center gap-1"
              >
                <Laugh size={12} /> Joke
              </button>
              <button
                onClick={triggerRoast}
                className="px-2.5 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 text-[10.5px] font-extrabold border border-rose-200/80 cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center gap-1"
              >
                <Flame size={12} /> Roast
              </button>
              <button
                onClick={triggerSwiggyCheck}
                className="px-2.5 py-1 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-900 text-[10.5px] font-extrabold border border-orange-200/80 cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center gap-1"
              >
                <Utensils size={12} /> Swiggy?
              </button>
              <button
                onClick={triggerGyan}
                className="px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-[10.5px] font-extrabold border border-emerald-200/80 cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center gap-1"
              >
                <Sparkles size={12} /> Gyan
              </button>
              <button
                onClick={triggerVibeCheck}
                className="px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-[10.5px] font-extrabold border border-purple-200/80 cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center gap-1"
              >
                <HelpCircle size={12} /> Vibe
              </button>
            </div>

            {/* Speech bubble pointer arrow */}
            <div className="absolute -bottom-2 right-10 w-4 h-4 bg-white rotate-45 border-r border-b border-black/10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized thought bubble pill when closed */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="mb-2.5 px-3 py-1.5 rounded-2xl bg-zinc-900 text-white text-[11px] font-black shadow-lg border border-white/20 flex items-center gap-1.5 cursor-pointer hover:bg-zinc-800 transition-transform hover:scale-105 active:scale-95"
        >
          <MessageCircle size={13} className="text-amber-400" />
          <span>Tap for Gyan & Jokes! 💬</span>
        </motion.button>
      )}

      {/* Floating BIGGER Mascot */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleMascotClick}
        className="relative cursor-pointer group"
        title="Tap BrokeBot for jokes, slangs & roasts!"
      >
        {/* Ambient glow shadow */}
        <div className="absolute inset-0 rounded-[28px] bg-amber-400/25 blur-xl -z-10 group-hover:bg-amber-400/40 transition-all duration-300" />

        {/* Mascot Squircle Container (Enlarged to 98px-104px) */}
        <div className="w-[96px] h-[96px] sm:w-[104px] sm:h-[104px] rounded-[28px] bg-white/90 backdrop-blur-md border-2 border-black/10 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.18)] flex items-center justify-center p-1.5 transition-shadow group-hover:shadow-[0_16px_36px_-4px_rgba(0,0,0,0.24)]">
          <Mascot mood={currentSpeech.mood} size={88} />
        </div>

        {/* Floating status tag */}
        <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-zinc-900 text-amber-400 text-[9px] font-black uppercase tracking-wider border border-white/30 shadow-xs flex items-center gap-1">
          <span>Tap me 👆</span>
        </div>
      </motion.div>
    </div>
  )
}
