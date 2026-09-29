import { useState, useEffect, useRef } from 'react'
import {
  HERO_CHARACTERS,
  PENDING_ASSIGNMENTS,
  generateAIResponse,
  QUIZ_QUESTIONS,
} from '../utils/aiCharacterEngine.js'
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  Users,
  Copy,
  Check,
  ChevronDown,
  Clock,
  BookOpen,
  Award,
  Zap,
  HelpCircle,
  Flame,
  Volume2,
  VolumeX,
} from 'lucide-react'

// Bespoke Hero Vector Avatars
function CharacterAvatar({ characterId, size = 40, className = '' }) {
  if (characterId === 'spiderman') {
    return (
      <div
        className={`relative rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-indigo-800 flex items-center justify-center overflow-hidden shadow-md ${className}`}
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] drop-shadow">
          {/* Mask Shape */}
          <path
            d="M 50,8 C 22,8 14,35 14,60 C 14,82 32,96 50,96 C 68,96 86,82 86,60 C 86,35 78,8 50,8 Z"
            fill="#e11d48"
          />
          {/* Web Lines */}
          <path
            d="M 50,8 L 50,96 M 14,60 L 86,60 M 24,25 L 76,75 M 24,75 L 76,25"
            stroke="#9f1239"
            strokeWidth="2.5"
            opacity="0.45"
          />
          <ellipse cx="50" cy="55" rx="22" ry="20" fill="none" stroke="#9f1239" strokeWidth="2" opacity="0.45" />
          {/* Left Eye */}
          <path
            d="M 22,46 C 26,38 38,36 44,46 C 42,56 32,60 22,46 Z"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="4"
          />
          {/* Right Eye */}
          <path
            d="M 78,46 C 74,38 62,36 56,46 C 58,56 68,60 78,46 Z"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="4"
          />
        </svg>
      </div>
    )
  }

  if (characterId === 'ironman') {
    return (
      <div
        className={`relative rounded-2xl bg-gradient-to-br from-amber-500 via-red-600 to-slate-900 flex items-center justify-center overflow-hidden shadow-md ${className}`}
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] drop-shadow">
          {/* Helmet outline */}
          <path
            d="M 50,10 C 26,10 18,32 18,58 C 18,84 32,94 50,94 C 68,94 82,84 82,58 C 82,32 74,10 50,10 Z"
            fill="#b91c1c"
          />
          {/* Faceplate gold */}
          <path
            d="M 50,22 C 34,22 28,38 28,58 C 28,78 38,88 50,88 C 62,88 72,78 72,58 C 72,38 66,22 50,22 Z"
            fill="#f59e0b"
          />
          {/* Forehead notch */}
          <path d="M 40,22 L 50,34 L 60,22 Z" fill="#b91c1c" />
          {/* Eye Slits (Cyan Arc Glow) */}
          <rect x="32" y="52" width="12" height="4" rx="2" fill="#38bdf8" />
          <rect x="56" y="52" width="12" height="4" rx="2" fill="#38bdf8" />
          {/* Mouth line */}
          <line x1="42" y1="72" x2="58" y2="72" stroke="#b91c1c" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    )
  }

  if (characterId === 'batman') {
    return (
      <div
        className={`relative rounded-2xl bg-gradient-to-br from-slate-800 via-zinc-900 to-black flex items-center justify-center overflow-hidden shadow-md ${className}`}
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] drop-shadow">
          {/* Bat Cowl & Ears */}
          <path
            d="M 22,12 L 32,32 C 40,30 60,30 68,32 L 78,12 L 74,48 C 78,65 74,88 50,92 C 26,88 22,65 26,48 Z"
            fill="#0f172a"
          />
          {/* Chin opening */}
          <path d="M 40,70 Q 50,82 60,70 Q 50,66 40,70 Z" fill="#fcd34d" />
          {/* White Slit Eyes */}
          <polygon points="32,48 44,52 34,55" fill="#f8fafc" />
          <polygon points="68,48 56,52 66,55" fill="#f8fafc" />
        </svg>
      </div>
    )
  }

  if (characterId === 'hermione') {
    return (
      <div
        className={`relative rounded-2xl bg-gradient-to-br from-purple-800 via-rose-800 to-amber-600 flex items-center justify-center overflow-hidden shadow-md ${className}`}
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] drop-shadow">
          {/* Hair */}
          <path
            d="M 50,14 C 28,14 16,36 16,68 C 16,84 26,92 32,92 C 34,75 30,50 36,44 C 42,38 58,38 64,44 C 70,50 66,75 68,92 C 74,92 84,84 84,68 C 84,36 72,14 50,14 Z"
            fill="#78350f"
          />
          {/* Face */}
          <ellipse cx="50" cy="56" rx="20" ry="22" fill="#fed7aa" />
          {/* Round Glasses */}
          <circle cx="42" cy="54" r="7" fill="none" stroke="#b45309" strokeWidth="2.5" />
          <circle cx="58" cy="54" r="7" fill="none" stroke="#b45309" strokeWidth="2.5" />
          <line x1="49" y1="54" x2="51" y2="54" stroke="#b45309" strokeWidth="2.5" />
          {/* Smile */}
          <path d="M 45,66 Q 50,71 55,66" fill="none" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" />
          {/* Gryffindor Scarf */}
          <path d="M 32,82 L 68,82 L 64,95 L 36,95 Z" fill="#991b1b" />
          <line x1="45" y1="82" x2="45" y2="95" stroke="#f59e0b" strokeWidth="4" />
          <line x1="55" y1="82" x2="55" y2="95" stroke="#f59e0b" strokeWidth="4" />
        </svg>
      </div>
    )
  }

  // Einstein default
  return (
    <div
      className={`relative rounded-2xl bg-gradient-to-br from-cyan-700 via-blue-900 to-indigo-950 flex items-center justify-center overflow-hidden shadow-md ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] drop-shadow">
        {/* Wild Hair */}
        <circle cx="30" cy="35" r="14" fill="#e2e8f0" />
        <circle cx="70" cy="35" r="14" fill="#e2e8f0" />
        <circle cx="50" cy="22" r="15" fill="#e2e8f0" />
        <circle cx="22" cy="52" r="12" fill="#cbd5e1" />
        <circle cx="78" cy="52" r="12" fill="#cbd5e1" />
        {/* Face */}
        <ellipse cx="50" cy="56" rx="20" ry="22" fill="#fed7aa" />
        {/* Eyes */}
        <circle cx="43" cy="50" r="3" fill="#334155" />
        <circle cx="57" cy="50" r="3" fill="#334155" />
        {/* Mustache */}
        <path
          d="M 38,65 Q 45,60 50,65 Q 55,60 62,65 Q 50,73 38,65 Z"
          fill="#f1f5f9"
          stroke="#cbd5e1"
          strokeWidth="1.5"
        />
        {/* Smile */}
        <path d="M 46,71 Q 50,74 54,71" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

// Simple Markdown / Code Formatter for Chat Output
function MessageContent({ text }) {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState(null)

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code)
    setCopiedCodeIndex(index)
    setTimeout(() => setCopiedCodeIndex(null), 2000)
  }

  // Split by code blocks
  const parts = text.split(/(```[\s\S]*?```)/g)

  return (
    <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed">
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.slice(3, -3).trim().split('\n')
          const language = lines[0].match(/^[a-z]+/i) ? lines[0] : ''
          const code = language ? lines.slice(1).join('\n') : lines.join('\n')

          return (
            <div key={index} className="rounded-xl overflow-hidden bg-slate-900 text-slate-100 my-2 shadow-inner border border-slate-700/60 font-mono text-[11px] sm:text-xs">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800/80 border-b border-slate-700/60 text-slate-400">
                <span className="font-semibold uppercase tracking-wider text-[10px] text-slate-300">
                  {language || 'Code Snippet'}
                </span>
                <button
                  onClick={() => handleCopyCode(code, index)}
                  className="flex items-center gap-1 hover:text-white transition-colors py-0.5 px-1.5 rounded bg-slate-700/50"
                >
                  {copiedCodeIndex === index ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-[10px] text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span className="text-[10px]">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 overflow-x-auto font-mono leading-tight whitespace-pre">
                <code>{code}</code>
              </pre>
            </div>
          )
        }

        // Render normal text with markdown bullets and bold
        const lines = part.split('\n')
        return (
          <div key={index} className="space-y-1.5">
            {lines.map((line, lIdx) => {
              if (line.startsWith('### ')) {
                return (
                  <h4 key={lIdx} className="font-bold text-slate-900 text-sm sm:text-base mt-2 mb-1 flex items-center gap-1.5">
                    {line.replace('### ', '')}
                  </h4>
                )
              }
              if (line.startsWith('#### ')) {
                return (
                  <h5 key={lIdx} className="font-semibold text-slate-800 text-xs sm:text-sm mt-1.5 mb-1">
                    {line.replace('#### ', '')}
                  </h5>
                )
              }
              if (line.startsWith('- ') || line.startsWith('* ')) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-2">
                    <span className="text-indigo-500 font-bold mt-0.5">•</span>
                    <span>{renderInlineMarkdown(line.substring(2))}</span>
                  </div>
                )
              }
              if (/^\d+\.\s/.test(line)) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-2">
                    <span className="text-indigo-600 font-semibold mt-0.5">{line.match(/^\d+\./)[0]}</span>
                    <span>{renderInlineMarkdown(line.replace(/^\d+\.\s/, ''))}</span>
                  </div>
                )
              }
              if (!line.trim()) {
                return <div key={lIdx} className="h-1" />
              }
              return <p key={lIdx}>{renderInlineMarkdown(line)}</p>
            })}
          </div>
        )
      })}
    </div>
  )
}

// Inline Markdown (Bold, Code, Math highlights)
function renderInlineMarkdown(str) {
  // Replace `code`
  const codeParts = str.split(/(`[^`]+`)/g)
  return codeParts.map((sub, i) => {
    if (sub.startsWith('`') && sub.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/60 font-mono text-[11px] font-semibold">
          {sub.slice(1, -1)}
        </code>
      )
    }

    // Replace **bold**
    const boldParts = sub.split(/(\*\*[^*]+\*\*)/g)
    return boldParts.map((bSub, bI) => {
      if (bSub.startsWith('**') && bSub.endsWith('**')) {
        return (
          <strong key={bI} className="font-semibold text-slate-900">
            {bSub.slice(2, -2)}
          </strong>
        )
      }
      return bSub
    })
  })
}

export default function AICompanionWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [characterId, setCharacterId] = useState(() => {
    return localStorage.getItem('cv_ai_character') || 'spiderman'
  })
  const [showHeroModal, setShowHeroModal] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeQuizState, setActiveQuizState] = useState(null)
  const [hasNewAlert, setHasNewAlert] = useState(true)

  const activeChar = HERO_CHARACTERS[characterId] || HERO_CHARACTERS.spiderman

  // Chat message history stored in localStorage
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('cv_ai_chat_history')
      if (saved) {
        return JSON.parse(saved)
      }
    } catch {
      // fallback
    }
    return [
      {
        id: 'msg-init-1',
        sender: 'hero',
        characterId: 'spiderman',
        text: HERO_CHARACTERS.spiderman.greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]
  })

  const messagesEndRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('cv_ai_character', characterId)
  }, [characterId])

  useEffect(() => {
    localStorage.setItem('cv_ai_chat_history', JSON.stringify(messages))
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Global listener so other pages can trigger the AI Hero Companion
  useEffect(() => {
    const handleOpenEvent = (e) => {
      setIsOpen(true)
      if (e.detail?.query) {
        handleSendMessage(e.detail.query)
      }
    }
    window.addEventListener('open-ai-mentor', handleOpenEvent)
    return () => window.removeEventListener('open-ai-mentor', handleOpenEvent)
  }, [characterId])

  // Change character with a welcoming initial note
  const handleSelectCharacter = (newId) => {
    setCharacterId(newId)
    setShowHeroModal(false)
    const newChar = HERO_CHARACTERS[newId]

    const introMsg = {
      id: `msg-${Date.now()}`,
      sender: 'hero',
      characterId: newId,
      text: newChar.greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, introMsg])
  }

  // Handle student prompt sending
  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputMessage
    if (!query.trim()) return

    const studentMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, studentMsg])
    setInputMessage('')
    setIsTyping(true)
    setHasNewAlert(false)

    // Simulate intelligent thinking delay
    setTimeout(() => {
      const aiResult = generateAIResponse(query, characterId)

      const responseMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'hero',
        characterId,
        text: aiResult.message,
        type: aiResult.type || 'text',
        quiz: aiResult.quiz || null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }

      setMessages((prev) => [...prev, responseMsg])
      setIsTyping(false)

      if (aiResult.type === 'quiz') {
        setActiveQuizState({
          questionId: aiResult.quiz.id,
          selected: null,
          isCorrect: null,
        })
      }
    }, 700)
  }

  // Handle interactive quiz answer selection
  const handleQuizAnswer = (quiz, optionIndex) => {
    const isCorrect = optionIndex === quiz.correctAnswer
    setActiveQuizState({
      questionId: quiz.id,
      selected: optionIndex,
      isCorrect,
    })

    const feedbackText = isCorrect
      ? `🎉 **EXCELLENT WORK!** You nailed it!\n\n${quiz.explanation}`
      : `⚠️ **Not quite, True Believer!**\n\nThe correct answer is **Option ${String.fromCharCode(65 + quiz.correctAnswer)}**.\n\n${quiz.explanation}`

    setTimeout(() => {
      const feedbackMsg = {
        id: `msg-${Date.now()}`,
        sender: 'hero',
        characterId,
        text: feedbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, feedbackMsg])
    }, 400)
  }

  // Reset conversation to clear history
  const handleResetConversation = () => {
    const freshMessages = [
      {
        id: `msg-${Date.now()}`,
        sender: 'hero',
        characterId,
        text: activeChar.greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]
    setMessages(freshMessages)
    localStorage.setItem('cv_ai_chat_history', JSON.stringify(freshMessages))
    setActiveQuizState(null)
  }

  // Urgent deadlines count (< 48 hrs)
  const urgentCount = PENDING_ASSIGNMENTS.filter((a) => a.dueDays <= 2).length

  return (
    <>
      {/* 1. Floating Action Launcher Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3">
        {/* Pulsing Spider-Sense / Deadline Alert Tooltip */}
        {!isOpen && hasNewAlert && urgentCount > 0 && (
          <button
            onClick={() => {
              setIsOpen(true)
              handleSendMessage('What assignments are due soon and how do I solve them?')
            }}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-2xl bg-white border border-rose-200 shadow-xl shadow-rose-500/10 text-xs font-semibold text-rose-700 animate-bounce cursor-pointer hover:bg-rose-50 transition-all"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
            </span>
            <span>
              <strong>{activeChar.name}:</strong> {urgentCount} Assignments Due!
            </span>
          </button>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open AI Character Mentor"
          className={`relative group p-1.5 sm:p-2 rounded-3xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center ${
            isOpen
              ? 'bg-slate-900 text-white ring-4 ring-slate-900/20'
              : `bg-gradient-to-r ${activeChar.themeColor} text-white ring-4 ring-rose-500/30`
          }`}
        >
          {/* Animated Glow Halo */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-rose-500 to-indigo-600 opacity-40 blur-md group-hover:opacity-75 transition-opacity pointer-events-none" />

          {/* Character Avatar Icon */}
          <div className="relative z-10 flex items-center gap-2 px-2 py-1">
            <CharacterAvatar characterId={characterId} size={36} />
            <div className="hidden md:flex flex-col text-left pr-1.5">
              <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider leading-none">
                AI Mentor
              </span>
              <span className="text-xs font-bold text-white leading-tight">
                {activeChar.name}
              </span>
            </div>
          </div>

          {/* Urgent Notification Pill */}
          {urgentCount > 0 && !isOpen && (
            <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1 animate-pulse">
              <Zap size={10} />
              {urgentCount}
            </span>
          )}
        </button>
      </div>

      {/* 2. Main Responsive AI Chat Window */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-20 sm:right-6 sm:w-[450px] max-h-[92vh] sm:max-h-[660px] h-[85vh] sm:h-[620px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200/80 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* A. Header Bar with Dynamic Hero Gradient */}
          <div
            className={`p-3.5 sm:p-4 text-white ${activeChar.headerBg} flex items-center justify-between shadow-md relative shrink-0`}
          >
            <div className="flex items-center gap-3">
              <CharacterAvatar characterId={characterId} size={42} className="ring-2 ring-white/40" />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm sm:text-base leading-tight">
                    {activeChar.name}
                  </h3>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/20 text-white uppercase tracking-wider backdrop-blur-xs">
                    {activeChar.badge}
                  </span>
                </div>
                <p className="text-[11px] text-white/80 truncate max-w-[210px] sm:max-w-[240px]">
                  {activeChar.tagline}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Change Character Button */}
              <button
                onClick={() => setShowHeroModal(true)}
                title="Switch Superhero Mentor"
                className="p-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all text-xs font-semibold flex items-center gap-1 border border-white/20"
              >
                <Users size={14} />
                <span className="hidden sm:inline text-[11px]">Heroes</span>
              </button>

              {/* Reset History */}
              <button
                onClick={handleResetConversation}
                title="Clear Chat History"
                className="p-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all"
              >
                <RotateCcw size={14} />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* B. Impending Deadline Radar Alert Bar */}
          {urgentCount > 0 && (
            <div className="bg-gradient-to-r from-rose-50 to-amber-50 border-b border-rose-200/80 px-3.5 py-2 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                </span>
                <span className="text-[11px] font-bold text-rose-900 truncate">
                  {characterId === 'spiderman' ? '🕷️ Spider-Sense:' : '🚨 Deadline Radar:'}{' '}
                  {urgentCount} assignment(s) due within 48h!
                </span>
              </div>
              <button
                onClick={() =>
                  handleSendMessage('What assignments are due soon and how do I solve them?')
                }
                className="text-[11px] font-bold text-rose-700 hover:text-rose-900 bg-white/80 border border-rose-200 px-2 py-0.5 rounded-lg shadow-xs shrink-0 transition-colors"
              >
                Solve Now
              </button>
            </div>
          )}

          {/* C. Scrollable Conversation Thread */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-4 bg-slate-50/60">
            {messages.map((msg) => {
              const isHero = msg.sender === 'hero'
              const senderChar = HERO_CHARACTERS[msg.characterId || characterId] || activeChar

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isHero ? 'justify-start' : 'justify-end'}`}
                >
                  {isHero && (
                    <div className="shrink-0 mt-0.5">
                      <CharacterAvatar characterId={msg.characterId || characterId} size={32} />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[82%] rounded-2xl p-3 sm:p-3.5 text-xs sm:text-sm shadow-xs ${
                      isHero
                        ? 'bg-white border border-slate-200/80 text-slate-800 rounded-tl-sm'
                        : 'bg-indigo-600 text-white rounded-tr-sm shadow-indigo-100'
                    }`}
                  >
                    {isHero && (
                      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100 text-[10px] text-slate-400">
                        <span className="font-bold text-slate-700 flex items-center gap-1">
                          <span>{senderChar.avatarEmoji}</span>
                          {senderChar.name}
                        </span>
                        <span>{msg.timestamp}</span>
                      </div>
                    )}

                    {/* Render Content */}
                    <MessageContent text={msg.text} />

                    {/* If Message has an Interactive Quiz */}
                    {msg.quiz && (
                      <div className="mt-3 pt-3 border-t border-slate-200/60 space-y-2">
                        <p className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1">
                          <Award size={13} /> Select your answer:
                        </p>
                        <div className="space-y-1.5">
                          {msg.quiz.options.map((opt, optIdx) => {
                            const isSelected =
                              activeQuizState?.questionId === msg.quiz.id &&
                              activeQuizState?.selected === optIdx
                            const isCorrectOpt = optIdx === msg.quiz.correctAnswer
                            const hasAnswered =
                              activeQuizState?.questionId === msg.quiz.id &&
                              activeQuizState?.selected !== null

                            let btnStyle =
                              'bg-slate-50 hover:bg-indigo-50 border-slate-200 text-slate-800'
                            if (hasAnswered) {
                              if (isCorrectOpt) {
                                btnStyle =
                                  'bg-emerald-50 border-emerald-400 text-emerald-800 font-semibold ring-1 ring-emerald-400'
                              } else if (isSelected && !isCorrectOpt) {
                                btnStyle =
                                  'bg-rose-50 border-rose-400 text-rose-800 line-through'
                              } else {
                                btnStyle = 'opacity-60 bg-slate-50 border-slate-200 text-slate-600'
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={hasAnswered}
                                onClick={() => handleQuizAnswer(msg.quiz, optIdx)}
                                className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all ${btnStyle}`}
                              >
                                {opt}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {!isHero && (
                      <div className="text-right text-[9px] text-indigo-200 mt-1">
                        {msg.timestamp}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <CharacterAvatar characterId={characterId} size={32} />
                <div className="bg-white border border-slate-200/80 rounded-2xl rounded-tl-sm p-3 shadow-xs flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-bounce" />
                    <span
                      className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"
                      style={{ animationDelay: '0.15s' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"
                      style={{ animationDelay: '0.3s' }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 italic">
                    {characterId === 'spiderman'
                      ? 'Spider-Man is consulting his notes...'
                      : characterId === 'ironman'
                      ? 'J.A.R.V.I.S. is calculating solution...'
                      : characterId === 'batman'
                      ? 'Batman is analyzing target problem...'
                      : characterId === 'hermione'
                      ? 'Hermione is researching textbooks...'
                      : 'Einstein is contemplating thought experiment...'}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* D. Quick Action Topic Prompt Chips */}
          <div className="bg-white border-t border-slate-100 px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
            {activeChar.quickPrompts.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip.query)}
                className="whitespace-nowrap px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200/60 text-slate-700 text-[11px] font-medium transition-all shadow-2xs"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* E. Chat Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask ${activeChar.name} any question, code, or deadline...`}
              className="flex-1 bg-slate-100 border border-slate-200/80 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2 sm:p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white transition-all shadow-sm shadow-indigo-200 flex items-center justify-center shrink-0 cursor-pointer"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* 3. Hero Selector Modal */}
      {showHeroModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <Sparkles size={18} className="text-amber-500" />
                  Select Your AI Superhero Mentor
                </h3>
                <p className="text-xs text-slate-500">
                  Choose your favourite character to guide your studies & notify deadlines.
                </p>
              </div>
              <button
                onClick={() => setShowHeroModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {Object.values(HERO_CHARACTERS).map((hero) => {
                const isSelected = hero.id === characterId
                return (
                  <div
                    key={hero.id}
                    onClick={() => handleSelectCharacter(hero.id)}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3.5 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 shadow-md ring-1 ring-indigo-600'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CharacterAvatar characterId={hero.id} size={46} />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900">{hero.name}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-600">
                            {hero.realName}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{hero.title}</p>
                        <p className="text-[11px] text-indigo-700 italic mt-1 font-serif">
                          "{hero.tagline}"
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isSelected ? (
                        <span className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-xs flex items-center gap-1">
                          <Check size={14} /> Active
                        </span>
                      ) : (
                        <span className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors">
                          Switch
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
