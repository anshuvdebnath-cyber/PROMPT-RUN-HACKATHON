import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles } from 'lucide-react'
import { useFinance } from '../context/useFinance'
import { Mascot } from './Mascot'
import { MascotMood } from '../types/finance'

interface Message {
  sender: 'bot' | 'user'
  text: string
  mood?: MascotMood
}

const MONEY_JOKES = [
  'My bank account is like a gym membership: I keep paying for it, but I never see any gains. 😭',
  'I told my wallet we are going on a diet. It took it literally and is now starving! 💀',
  "My toxic trait is whispering 'it's only ₹150' fifty times a day until my card declines. 💳",
  "Checking my bank balance before checking out like: 'I pretend I do not see it.' 🙈",
  "Money doesn't buy happiness, but it buys iced coffee which is basically the same thing. ☕",
]

export const MascotCompanion: React.FC = () => {
  const { effectiveMetrics } = useFinance()
  const [isOpen, setIsOpen] = useState(false)
  const [customInput, setCustomInput] = useState('')
  const [botMood, setBotMood] = useState<MascotMood>(effectiveMetrics.mascotMood)

  const [conversation, setConversation] = useState<Message[]>([
    {
      sender: 'bot',
      text: `Yo! I'm BrokeBot, your Gen Z finance wingman. You've got ₹${effectiveMetrics.currentBalance.toLocaleString('en-IN')} in the bank. Need a vibe check or want to roast your spending?`,
      mood: effectiveMetrics.mascotMood,
    },
  ])

  const balance = effectiveMetrics.currentBalance
  const allowance = effectiveMetrics.dynamicDailyAllowance
  const spent = effectiveMetrics.spentSoFar
  const risk = effectiveMetrics.riskLevel

  const handleAskPrompt = (type: 'roast' | 'zomato' | 'cooked' | 'joke' | 'hypeman') => {
    let userText = ''
    let botReply = ''
    let nextMood: MascotMood = 'joyful'

    if (type === 'roast') {
      userText = 'Roast my budget 🔥'
      if (balance <= 0) {
        nextMood = 'hurt'
        botReply = `Down catastrophic! Broke boi balance is ₹0. You couldn't even afford 1-ply tissue right now. Instant ramen emergency! 😭`
      } else if (risk === 'Critical Doom' || spent > 7000) {
        nextMood = 'angry'
        botReply = `Major side-eye! You torched ₹${spent.toLocaleString('en-IN')} already. Your wallet is screaming in the trenches, bestie. Put the card away! 🚨`
      } else if (allowance < 140) {
        nextMood = 'stressed'
        botReply = `You're sweating bullets with a ₹${allowance}/day cap! One rogue bubble tea and your whole monthly budget folds like a cheap lawn chair. 🧋`
      } else {
        nextMood = 'grateful'
        botReply = `Honestly? Not terrible! ₹${balance.toLocaleString('en-IN')} still alive. But don't get delulu thinking you're Elon Musk. Stay humble! 💅`
      }
    } else if (type === 'zomato') {
      userText = 'Can I order food tonight? 🍕'
      if (allowance >= 200) {
        nextMood = 'joyful'
        botReply = `Green light bestie! Your ₹${allowance}/day cap can handle a ₹160 shawarma or roll. Just don't add ₹300 gourmet truffle fries! 🌯`
      } else if (allowance >= 100) {
        nextMood = 'stressed'
        botReply = `Cutting it super close! ₹${allowance}/day means you can grab a quick roll, but zero dessert. Don't blow tomorrow's allowance! ⚠️`
      } else {
        nextMood = 'angry'
        botReply = `BFFR (Be for real)! Your cap is literally ₹${allowance}/day. You are having tap water and pantry biscuits tonight, no cap! 🚫`
      }
    } else if (type === 'cooked') {
      userText = 'How cooked am I? 💀'
      if (risk === 'Safe') {
        nextMood = 'excited'
        botReply = `Zero percent cooked! Chef level financial rizz. ₹${balance.toLocaleString('en-IN')} in the bag and runway is pristine, no cap! 🌟`
      } else if (risk === 'Moderate') {
        nextMood = 'grateful'
        botReply = `Medium rare. You're surviving the month, but don't go flexing on Instagram. Respect the hustle! 🍳`
      } else {
        nextMood = 'hurt'
        botReply = `Charcoal burnt! You are in the deficit trenches. Survival odds at ${effectiveMetrics.survivalProbability}%. Emergency spending freeze immediately! 🆘`
      }
    } else if (type === 'joke') {
      userText = 'Tell me a money joke 🤡'
      nextMood = 'excited'
      const randomJoke = MONEY_JOKES[Math.floor(Math.random() * MONEY_JOKES.length)]
      botReply = `${randomJoke}`
    } else {
      userText = 'Hypeman mode! ✨'
      nextMood = 'excited'
      botReply = `You're doing amazing sweetie! Surviving on a ₹10k budget is peak character development. Day 30 survival is guaranteed if we stay locked in! 🚀`
    }

    setBotMood(nextMood)
    setConversation((prev) => [
      ...prev,
      { sender: 'user', text: userText },
      { sender: 'bot', text: botReply, mood: nextMood },
    ])
  }

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customInput.trim()) return

    const q = customInput.toLowerCase()
    let reply = ''
    let nextMood: MascotMood = 'joyful'

    if (q.includes('coffee') || q.includes('starbucks')) {
      nextMood = 'angry'
      reply = `A ₹350 iced macchiato when your daily cap is ₹${allowance}/day?! That is pure financial delinquency! Make instant coffee at home! ☕`
    } else if (q.includes('save') || q.includes('invest') || q.includes('cushion')) {
      nextMood = 'excited'
      reply = `Now that's a high-IQ move! Stashing cash in the emergency cushion earns big health score points. Mindful era activated! 🛡️`
    } else if (q.includes('party') || q.includes('club') || q.includes('weekend')) {
      nextMood = allowance > 250 ? 'joyful' : 'stressed'
      reply = allowance > 250
        ? `You've got some breathing room (₹${allowance}/d), but don't buy the whole squad drinks unless you want to enter your broke era!`
        : `Stay home and watch reels! Your cap is ₹${allowance}/day. A club outing will send you straight to Critical Doom! 🚨`
    } else if (q.includes('salary') || q.includes('income') || q.includes('gig')) {
      nextMood = 'excited'
      reply = `Inflows are bussin! Log any freelance bag in the Daily Spends section to immediately expand your daily runway! 💻`
    } else {
      nextMood = 'grateful'
      reply = `No cap, balance is ₹${balance.toLocaleString('en-IN')} with ₹${allowance}/day safe cap. Stick to the daily allowance and we survive all 30 days! ✨`
    }

    setBotMood(nextMood)
    setConversation((prev) => [
      ...prev,
      { sender: 'user', text: customInput },
      { sender: 'bot', text: reply, mood: nextMood },
    ])
    setCustomInput('')
  }

  return (
    <div className="fixed bottom-20 right-3.5 sm:bottom-6 sm:right-6 z-40 select-none">
      {/* Floating Trigger Pill when closed */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 p-2 pr-4 rounded-full bg-white border-2 border-zinc-900 shadow-xl cursor-pointer group"
          style={{ background: 'var(--canvas-card)' }}
          aria-label="Open BrokeBot Gen Z Companion"
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
            <Mascot mood={botMood} size={38} />
          </div>
          <div className="text-left">
            <span className="text-[11px] font-extrabold text-zinc-900 block leading-tight flex items-center gap-1">
              BrokeBot <Sparkles size={11} className="text-amber-500 animate-spin" />
            </span>
            <span className="text-[10px] font-bold text-zinc-500 block leading-none">
              Vibe check?
            </span>
          </div>
        </motion.button>
      )}

      {/* Expanded Interactive Mascot Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="w-[310px] sm:w-[350px] rounded-[28px] bg-white border-2 border-black/10 shadow-2xl flex flex-col overflow-hidden"
            style={{ background: 'var(--canvas-card)', maxHeight: '520px' }}
          >
            {/* Header with Live Persistent Morphing Mascot */}
            <div className="p-3.5 px-4 bg-zinc-900 text-white flex items-center justify-between border-b border-black/10">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="shrink-0">
                  <Mascot mood={botMood} size={36} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-extrabold font-display leading-tight flex items-center gap-1.5 truncate">
                    BrokeBot Wingman
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-bold capitalize">
                      {botMood}
                    </span>
                  </h4>
                  <p className="text-[10px] text-zinc-300 font-medium truncate">
                    Cap: ₹{allowance}/d · ₹{balance} left
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close BrokeBot"
              >
                <X size={15} />
              </button>
            </div>

            {/* Conversation Area */}
            <div className="p-3.5 space-y-2.5 overflow-y-auto no-scrollbar flex-1 max-h-[260px] bg-[#FAF7F2]/60">
              {conversation.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs font-semibold leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-zinc-900 text-white rounded-br-xs'
                        : 'bg-white border border-black/8 text-zinc-800 rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Interactive Prompt Buttons */}
            <div className="p-2.5 bg-white border-t border-black/6">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block mb-1.5 px-1">
                Quick Prompts:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                <button
                  onClick={() => handleAskPrompt('roast')}
                  className="px-2.5 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 text-[10.5px] font-extrabold border border-rose-200 shrink-0 cursor-pointer transition-transform hover:scale-105"
                >
                  🔥 Roast budget
                </button>
                <button
                  onClick={() => handleAskPrompt('zomato')}
                  className="px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-[10.5px] font-extrabold border border-amber-200 shrink-0 cursor-pointer transition-transform hover:scale-105"
                >
                  🍕 Order Swiggy?
                </button>
                <button
                  onClick={() => handleAskPrompt('cooked')}
                  className="px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-[10.5px] font-extrabold border border-purple-200 shrink-0 cursor-pointer transition-transform hover:scale-105"
                >
                  💀 How cooked?
                </button>
                <button
                  onClick={() => handleAskPrompt('joke')}
                  className="px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-[10.5px] font-extrabold border border-emerald-200 shrink-0 cursor-pointer transition-transform hover:scale-105"
                >
                  🤡 Money joke
                </button>
                <button
                  onClick={() => handleAskPrompt('hypeman')}
                  className="px-2.5 py-1 rounded-xl bg-yellow-50 hover:bg-yellow-100 text-yellow-900 text-[10.5px] font-extrabold border border-yellow-200 shrink-0 cursor-pointer transition-transform hover:scale-105"
                >
                  ✨ Hypeman
                </button>
              </div>
            </div>

            {/* Custom Question Input */}
            <form
              onSubmit={handleCustomSubmit}
              className="p-2.5 bg-white border-t border-black/8 flex items-center gap-1.5"
            >
              <input
                type="text"
                placeholder="Ask BrokeBot anything..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl text-xs font-semibold bg-[#FAF7F2] border border-black/10 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center cursor-pointer hover:bg-zinc-800 transition-colors shrink-0"
                aria-label="Send message"
              >
                <Send size={13} className="text-amber-400" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
