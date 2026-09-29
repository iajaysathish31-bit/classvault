import { useState, useEffect, useRef } from 'react'
import {
  HERO_CHARACTERS,
  PENDING_ASSIGNMENTS,
  generateAIResponse,
  QUIZ_QUESTIONS,
  getOrCreateHeroCharacter,
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
  const isSpider = characterId.includes('spider') || characterId.includes('peter')
  const isIronMan = characterId.includes('iron') || characterId.includes('stark') || characterId.includes('tony')
  const isBatman = characterId.includes('bat') || characterId.includes('bruce') || characterId.includes('wayne')
  const isHermione = characterId.includes('hermione') || characterId.includes('granger')
  const isEinstein = characterId.includes('einstein') || characterId.includes('albert')

  if (isSpider) {
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

  if (isIronMan) {
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

  if (isBatman) {
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

  if (isHermione) {
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

  if (isEinstein) {
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

  // Dynamic Avatar for Any Custom Character Selected by the User!
  const charFirstLetter = (characterId || 'H').charAt(0).toUpperCase()
  return (
    <div
      className={`relative rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-sky-600 flex items-center justify-center overflow-hidden shadow-md text-white font-black ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 bg-white/10 rounded-full blur-xs" />
      <span className="relative z-10 text-base sm:text-lg tracking-wider drop-shadow">
        {charFirstLetter}
      </span>
      <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-amber-400 ring-1 ring-white" />
    </div>
  )
}

// Interactive Animated Hero Mascot playing live on the website!
function AnimatedHeroMascot({
  character,
  hasAlert,
  urgentCount,
  onOpenChat,
  isMinimized,
  setIsMinimized,
}) {
  const isSpider = character.id.includes('spider') || character.name.toLowerCase().includes('spider')
  const isIronMan = character.id.includes('iron') || character.name.toLowerCase().includes('iron')
  const isBatman = character.id.includes('bat') || character.name.toLowerCase().includes('bat')

  // Dynamic speech line
  const speechText = hasAlert
    ? isSpider
      ? `🕷️ Spider-Sense tingling! ${urgentCount} assignments due soon! Tap me to solve!`
      : `⚠️ Priority Alert! ${urgentCount} assignments due soon! Tap to view solutions.`
    : isSpider
    ? `Hey! Need a hand with your classes? Click me to start!`
    : isIronMan
    ? `Stark AI online. Ready to optimize your coursework.`
    : `Knowledge is power. Tap me anytime for study guidance.`

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-20 right-4 sm:right-6 z-40 bg-white/95 hover:bg-white border border-rose-200/80 px-2.5 py-1.5 rounded-2xl shadow-lg flex items-center gap-1.5 text-[11px] font-bold text-rose-700 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs"
        title="Show Animated Hero Mascot"
      >
        <span>{character.avatarEmoji || '🕷️'}</span>
        <span>Play Mascot</span>
      </button>
    )
  }

  return (
    <div className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-40 pointer-events-auto flex flex-col items-end select-none">
      {/* 1. Comic Speech Bubble */}
      <div className="animate-speech-float relative mb-1.5 max-w-[210px] sm:max-w-[240px] bg-white rounded-2xl p-2.5 shadow-xl border-2 border-slate-800 text-slate-800 text-[11px] font-bold leading-tight">
        {/* Minimize Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsMinimized(true)
          }}
          className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 border border-slate-300 flex items-center justify-center text-[10px] shadow-xs cursor-pointer"
          title="Minimize mascot animation"
        >
          ✕
        </button>

        <div
          onClick={onOpenChat}
          className="cursor-pointer hover:text-rose-600 transition-colors"
        >
          <p>{speechText}</p>
          <span className="text-[9px] text-indigo-600 font-semibold block mt-1">
            Tap to open {character.name} →
          </span>
        </div>

        {/* Speech Bubble Arrow Tail */}
        <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white border-b-2 border-r-2 border-slate-800 transform rotate-45" />
      </div>

      {/* 2. Character Sprite Stage */}
      <div
        onClick={onOpenChat}
        className="relative cursor-pointer group transition-transform hover:scale-105 active:scale-95"
        title={`Click to study with ${character.name}!`}
      >
        {/* Spider-Sense Electric Radiating Waves (When Alert Active) */}
        {hasAlert && isSpider && (
          <div className="absolute -top-6 -left-6 -right-6 -bottom-6 pointer-events-none flex items-center justify-center">
            <span className="animate-spider-sense absolute w-28 h-28 rounded-full border-2 border-amber-400 bg-amber-400/15" />
            <span
              className="animate-spider-sense absolute w-36 h-36 rounded-full border-2 border-rose-500 bg-rose-500/10"
              style={{ animationDelay: '0.4s' }}
            />
          </div>
        )}

        {/* SPIDER-MAN ANIMATED SPRITE (Flagship Hero) */}
        {isSpider && (
          <div className="animate-spider-swing w-28 h-36 sm:w-32 sm:h-40 relative flex items-center justify-center filter drop-shadow-xl">
            <svg viewBox="0 0 120 160" className="w-full h-full overflow-visible">
              {/* Web line descending from top */}
              <line
                x1="60"
                y1="-20"
                x2="60"
                y2="52"
                stroke="#e2e8f0"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                className="opacity-90"
              />
              <circle cx="60" cy="50" r="3" fill="#cbd5e1" />

              {/* Spider-Man Body (Dynamic Web-Hanging / Crouching Pose) */}
              <g transform="translate(10, 20)">
                {/* Left Arm reaching up holding web */}
                <path
                  d="M 50,32 Q 52,20 50,10"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="10" r="3.5" fill="#dc2626" />

                {/* Right Arm in web-shooter gesture */}
                <path
                  d="M 50,38 Q 68,44 76,32"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                {/* Hand firing web spark */}
                <circle cx="76" cy="32" r="3.5" fill="#dc2626" />
                <path d="M 76,32 L 88,26 M 76,32 L 89,34 M 76,32 L 85,40" stroke="#f8fafc" strokeWidth="1.5" />

                {/* Torso & Suit */}
                <path
                  d="M 38,32 C 36,48 40,62 50,68 C 60,62 64,48 62,32 Z"
                  fill="#e11d48"
                  stroke="#1e293b"
                  strokeWidth="2"
                />
                {/* Blue Torso Flanks */}
                <path d="M 38,36 C 36,46 39,56 44,62 L 40,46 Z" fill="#2563eb" />
                <path d="M 62,36 C 64,46 61,56 56,62 L 60,46 Z" fill="#2563eb" />

                {/* Spider Emblem on Chest */}
                <ellipse cx="50" cy="46" rx="3.5" ry="5.5" fill="#0f172a" />
                <path
                  d="M 50,44 L 42,38 M 50,44 L 58,38 M 50,48 L 41,54 M 50,48 L 59,54"
                  stroke="#0f172a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                {/* Legs in acrobatic crouch */}
                <path
                  d="M 44,65 Q 32,74 38,88 Q 44,88 46,78"
                  fill="#2563eb"
                  stroke="#1e293b"
                  strokeWidth="2"
                />
                {/* Red Boots */}
                <path d="M 36,84 Q 42,88 44,92 L 34,92 Z" fill="#e11d48" />

                <path
                  d="M 56,65 Q 68,74 62,88 Q 56,88 54,78"
                  fill="#2563eb"
                  stroke="#1e293b"
                  strokeWidth="2"
                />
                <path d="M 64,84 Q 58,88 56,92 L 66,92 Z" fill="#e11d48" />

                {/* Mask Head */}
                <g transform="translate(0, -6)">
                  <path
                    d="M 50,14 C 36,14 30,28 30,42 C 30,56 40,66 50,66 C 60,66 70,56 70,42 C 70,28 64,14 50,14 Z"
                    fill="#e11d48"
                    stroke="#0f172a"
                    strokeWidth="2.5"
                  />
                  {/* Subtle Webbing Lines */}
                  <line x1="50" y1="14" x2="50" y2="66" stroke="#9f1239" strokeWidth="1.2" opacity="0.6" />
                  <line x1="30" y1="42" x2="70" y2="42" stroke="#9f1239" strokeWidth="1.2" opacity="0.6" />
                  <ellipse cx="50" cy="40" rx="14" ry="12" fill="none" stroke="#9f1239" strokeWidth="1" opacity="0.5" />

                  {/* Iconic Big Expressive White Eyes */}
                  <path
                    d="M 36,36 C 38,30 46,28 48,37 C 47,45 42,48 36,36 Z"
                    fill="#ffffff"
                    stroke="#0f172a"
                    strokeWidth="3"
                  />
                  <path
                    d="M 64,36 C 62,30 54,28 52,37 C 53,45 58,48 64,36 Z"
                    fill="#ffffff"
                    stroke="#0f172a"
                    strokeWidth="3"
                  />
                </g>
              </g>
            </svg>
          </div>
        )}

        {/* IRON MAN ANIMATED SPRITE */}
        {!isSpider && isIronMan && (
          <div className="animate-spider-bob w-28 h-36 sm:w-32 sm:h-40 relative flex items-center justify-center filter drop-shadow-xl">
            <svg viewBox="0 0 120 160" className="w-full h-full overflow-visible">
              {/* Repulsor Boot Thrust Flames */}
              <g className="animate-repulsor-flame" transform="translate(0, 115)">
                <ellipse cx="45" cy="10" rx="6" ry="12" fill="#f59e0b" opacity="0.9" />
                <ellipse cx="45" cy="8" rx="3" ry="8" fill="#fef08a" />
                <ellipse cx="75" cy="10" rx="6" ry="12" fill="#f59e0b" opacity="0.9" />
                <ellipse cx="75" cy="8" rx="3" ry="8" fill="#fef08a" />
              </g>

              {/* Iron Man Armor Body */}
              <g transform="translate(10, 10)">
                <path
                  d="M 35,40 C 35,65 42,88 50,96 C 58,88 65,65 65,40 Z"
                  fill="#b91c1c"
                  stroke="#7f1d1d"
                  strokeWidth="2"
                />
                <path d="M 40,45 L 45,70 L 50,72 L 55,70 L 60,45 Z" fill="#f59e0b" />

                {/* Glowing Arc Reactor */}
                <circle cx="50" cy="56" r="8" fill="#38bdf8" className="animate-arc-reactor" />
                <circle cx="50" cy="56" r="4.5" fill="#f0f9ff" />

                <path d="M 35,42 Q 22,54 26,70" fill="none" stroke="#b91c1c" strokeWidth="8" strokeLinecap="round" />
                <path d="M 65,42 Q 78,54 74,70" fill="none" stroke="#b91c1c" strokeWidth="8" strokeLinecap="round" />

                {/* Helmet */}
                <g transform="translate(0, -6)">
                  <path
                    d="M 50,12 C 34,12 28,26 28,45 C 28,62 38,70 50,70 C 62,70 72,62 72,45 C 72,26 66,12 50,12 Z"
                    fill="#b91c1c"
                    stroke="#7f1d1d"
                    strokeWidth="2"
                  />
                  <path
                    d="M 50,20 C 38,20 34,32 34,48 C 34,62 42,66 50,66 C 58,66 66,62 66,48 C 66,32 62,20 50,20 Z"
                    fill="#f59e0b"
                  />
                  <rect x="38" y="44" width="8" height="3" rx="1.5" fill="#38bdf8" className="animate-pulse" />
                  <rect x="54" y="44" width="8" height="3" rx="1.5" fill="#38bdf8" className="animate-pulse" />
                </g>
              </g>
            </svg>
          </div>
        )}

        {/* BATMAN / OTHER / CUSTOM ANIMATED SPRITE */}
        {!isSpider && !isIronMan && (
          <div className="animate-spider-bob w-28 h-36 sm:w-32 sm:h-40 relative flex items-center justify-center filter drop-shadow-xl">
            <svg viewBox="0 0 120 160" className="w-full h-full overflow-visible">
              <path
                d="M 35,45 Q 15,90 20,130 Q 50,118 60,130 Q 70,118 100,130 Q 105,90 85,45 Z"
                fill="#0f172a"
                className="animate-cape-flutter"
              />

              <g transform="translate(10, 15)">
                <path
                  d="M 38,40 C 38,65 42,88 50,96 C 58,88 62,65 62,40 Z"
                  fill="#1e293b"
                  stroke="#0f172a"
                  strokeWidth="2"
                />
                <rect x="42" y="80" width="16" height="5" rx="2" fill="#eab308" />

                <path
                  d="M 34,14 L 40,30 C 44,28 56,28 60,30 L 66,14 L 64,42 C 66,54 62,64 50,66 C 38,64 34,54 36,42 Z"
                  fill="#0f172a"
                />
                <path d="M 44,52 Q 50,60 56,52 Z" fill="#fed7aa" />
                <polygon points="40,38 48,41 42,43" fill="#ffffff" />
                <polygon points="60,38 52,41 58,43" fill="#ffffff" />
              </g>
            </svg>
          </div>
        )}
      </div>
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
    return localStorage.getItem('cv_ai_favourite_character') || 'spiderman'
  })
  const [customHeroInput, setCustomHeroInput] = useState('')
  const [showHeroModal, setShowHeroModal] = useState(false)
  const [isMascotMinimized, setIsMascotMinimized] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeQuizState, setActiveQuizState] = useState(null)
  const [hasNewAlert, setHasNewAlert] = useState(true)

  const activeChar = getOrCreateHeroCharacter(characterId)

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
    const initialChar = getOrCreateHeroCharacter(characterId)
    return [
      {
        id: 'msg-init-1',
        sender: 'hero',
        characterId: initialChar.id,
        text: initialChar.greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]
  })

  const messagesEndRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('cv_ai_favourite_character', characterId)
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

  // Handle setting favourite character chosen by the user
  const handleSetCustomCharacter = (charName) => {
    if (!charName || !charName.trim()) return
    const resolvedChar = getOrCreateHeroCharacter(charName.trim())
    setCharacterId(resolvedChar.id)
    setShowHeroModal(false)
    setCustomHeroInput('')

    const introMsg = {
      id: `msg-${Date.now()}`,
      sender: 'hero',
      characterId: resolvedChar.id,
      text: resolvedChar.greeting,
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
      {/* 1. Interactive Animated Hero Mascot Playing on Screen */}
      {!isOpen && (
        <AnimatedHeroMascot
          character={activeChar}
          hasAlert={hasNewAlert && urgentCount > 0}
          urgentCount={urgentCount}
          onOpenChat={() => {
            setIsOpen(true)
            if (urgentCount > 0) {
              handleSendMessage('What assignments are due soon and how do I solve them?')
            }
          }}
          isMinimized={isMascotMinimized}
          setIsMinimized={setIsMascotMinimized}
        />
      )}

      {/* 2. Floating Action Launcher Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3">
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

      {/* 3. Main Responsive AI Chat Window */}
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
                onClick={() => {
                  setCustomHeroInput(activeChar.name)
                  setShowHeroModal(true)
                }}
                title="Choose Favourite Character"
                className="p-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all text-xs font-semibold flex items-center gap-1 border border-white/20 cursor-pointer"
              >
                <Sparkles size={14} className="text-amber-300" />
                <span className="hidden sm:inline text-[11px]">My Character</span>
              </button>

              {/* Reset History */}
              <button
                onClick={handleResetConversation}
                title="Clear Chat History"
                className="p-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer"
              >
                <RotateCcw size={14} />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer"
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
                  {characterId.includes('spider') ? '🕷️ Spider-Sense:' : '🚨 Deadline Radar:'}{' '}
                  {urgentCount} assignment(s) due within 48h!
                </span>
              </div>
              <button
                onClick={() =>
                  handleSendMessage('What assignments are due soon and how do I solve them?')
                }
                className="text-[11px] font-bold text-rose-700 hover:text-rose-900 bg-white/80 border border-rose-200 px-2 py-0.5 rounded-lg shadow-xs shrink-0 transition-colors cursor-pointer"
              >
                Solve Now
              </button>
            </div>
          )}

          {/* C. Scrollable Conversation Thread */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-4 bg-slate-50/60">
            {messages.map((msg) => {
              const isHero = msg.sender === 'hero'
              const senderChar = getOrCreateHeroCharacter(msg.characterId || characterId)

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
                          <span>{senderChar.avatarEmoji || '✨'}</span>
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
                    {activeChar.name} is calculating solution...
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
                className="whitespace-nowrap px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200/60 text-slate-700 text-[11px] font-medium transition-all shadow-2xs cursor-pointer"
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

      {/* 4. Favourite Character Customizer Modal (No Static List - Student Picks Any Favourite Character!) */}
      {showHeroModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <Sparkles size={18} className="text-amber-500" />
                  Choose Your Favourite Character
                </h3>
                <p className="text-xs text-slate-500">
                  Select or type any character you love to be your live animated companion.
                </p>
              </div>
              <button
                onClick={() => setShowHeroModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Current Active Character Preview */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-500/10 via-indigo-500/10 to-amber-500/10 border border-indigo-200/60 flex items-center gap-3.5 mb-4">
              <CharacterAvatar characterId={characterId} size={46} />
              <div className="overflow-hidden">
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">
                  Current Companion
                </span>
                <h4 className="font-bold text-slate-900 text-sm">{activeChar.name}</h4>
                <p className="text-xs text-slate-500 truncate">{activeChar.tagline}</p>
              </div>
            </div>

            {/* Interactive Character Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (customHeroInput.trim()) {
                  handleSetCustomCharacter(customHeroInput.trim())
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Enter Your Favourite Character Name:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={customHeroInput}
                    onChange={(e) => setCustomHeroInput(e.target.value)}
                    placeholder="e.g. Spider-Man, Iron Man, Batman, Naruto..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 font-medium placeholder:text-slate-400"
                    autoFocus
                  />
                </div>
              </div>

              {/* Quick Inspiration Pills */}
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                  Quick Suggestions (click to auto-fill):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Spider-Man 🕷️',
                    'Iron Man 🦾',
                    'Batman 🦇',
                    'Hermione Granger ⚡',
                    'Albert Einstein 🔬',
                    'Naruto Uzumaki 🍥',
                    'Goku ⚡',
                  ].map((name) => {
                    const cleanName = name.replace(/[^\w\s-]/g, '').trim()
                    return (
                      <button
                        type="button"
                        key={name}
                        onClick={() => setCustomHeroInput(cleanName)}
                        className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200/60 text-slate-700 text-xs font-medium transition-all cursor-pointer"
                      >
                        {name}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={!customHeroInput.trim()}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-indigo-600 to-indigo-700 hover:from-rose-700 hover:to-indigo-800 disabled:opacity-40 text-white font-bold text-sm shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles size={16} /> Bring Character to Life
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
