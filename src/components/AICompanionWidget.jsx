import { useState, useEffect, useRef } from 'react'
import {
  HOMIE_PROFILE,
  PENDING_ASSIGNMENTS,
  generateHomieResponse,
  QUIZ_QUESTIONS,
} from '../utils/homieAIEngine.js'
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Paperclip,
  Camera,
  Mic,
  MicOff,
  Image as ImageIcon,
  RotateCcw,
  Copy,
  Check,
  Zap,
  Clock,
  Award,
  ChevronDown,
  Maximize2,
  Minimize2,
  RefreshCw,
} from 'lucide-react'

// Simple Markdown / Code Formatter for Chat Output
function MessageContent({ text }) {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState(null)

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code)
    setCopiedCodeIndex(index)
    setTimeout(() => setCopiedCodeIndex(null), 2000)
  }

  const parts = text.split(/(```[\s\S]*?```)/g)

  return (
    <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-slate-800">
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.slice(3, -3).trim().split('\n')
          const language = lines[0].match(/^[a-z]+/i) ? lines[0] : ''
          const code = language ? lines.slice(1).join('\n') : lines.join('\n')

          return (
            <div
              key={index}
              className="rounded-xl overflow-hidden bg-slate-900 text-slate-100 my-2 shadow-inner border border-slate-700/60 font-mono text-[11px] sm:text-xs"
            >
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800/80 border-b border-slate-700/60 text-slate-400">
                <span className="font-semibold uppercase tracking-wider text-[10px] text-emerald-400">
                  {language || 'Code'}
                </span>
                <button
                  onClick={() => handleCopyCode(code, index)}
                  className="flex items-center gap-1 hover:text-white transition-colors py-0.5 px-1.5 rounded bg-slate-700/50 cursor-pointer"
                >
                  {copiedCodeIndex === index ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-[10px] text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span className="text-[10px]">Copy code</span>
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

        const lines = part.split('\n')
        return (
          <div key={index} className="space-y-1.5">
            {lines.map((line, lIdx) => {
              if (line.startsWith('### ')) {
                return (
                  <h4 key={lIdx} className="font-bold text-slate-900 text-sm sm:text-base mt-2 mb-1">
                    {line.replace('### ', '')}
                  </h4>
                )
              }
              if (line.startsWith('#### ')) {
                return (
                  <h5 key={lIdx} className="font-semibold text-slate-900 text-xs sm:text-sm mt-1.5 mb-1">
                    {line.replace('#### ', '')}
                  </h5>
                )
              }
              if (line.startsWith('- ') || line.startsWith('* ')) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-2">
                    <span className="text-emerald-500 font-bold mt-0.5">•</span>
                    <span>{renderInlineMarkdown(line.substring(2))}</span>
                  </div>
                )
              }
              if (/^\d+\.\s/.test(line)) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-2">
                    <span className="text-emerald-600 font-semibold mt-0.5">{line.match(/^\d+\./)[0]}</span>
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

function renderInlineMarkdown(str) {
  const codeParts = str.split(/(`[^`]+`)/g)
  return codeParts.map((sub, i) => {
    if (sub.startsWith('`') && sub.endsWith('`')) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300/60 font-mono text-[11px] font-semibold"
        >
          {sub.slice(1, -1)}
        </code>
      )
    }

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
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeQuizState, setActiveQuizState] = useState(null)
  const [hasNewAlert, setHasNewAlert] = useState(true)

  // Image Upload & Camera states
  const [attachedImage, setAttachedImage] = useState(null) // { name, url, dataUrl }
  const [cameraActive, setCameraActive] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null) // native mobile camera capture
  const videoRef = useRef(null) // web camera stream
  const mediaStreamRef = useRef(null)

  // Chat message history stored in localStorage
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('cv_homie_chat_history')
      if (saved) {
        return JSON.parse(saved)
      }
    } catch {
      // fallback
    }
    return [
      {
        id: 'msg-init-1',
        sender: 'assistant',
        text: HOMIE_PROFILE.greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]
  })

  const messagesEndRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('cv_homie_chat_history', JSON.stringify(messages))
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Global trigger listener for 'open-ai-mentor'
  useEffect(() => {
    const handleOpenEvent = (e) => {
      setIsOpen(true)
      if (e.detail?.query) {
        handleSendMessage(e.detail.query)
      }
    }
    window.addEventListener('open-ai-mentor', handleOpenEvent)
    return () => window.removeEventListener('open-ai-mentor', handleOpenEvent)
  }, [])

  // Handle Image File Selection (from disk or photo gallery)
  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setAttachedImage({
        name: file.name,
        type: file.type,
        dataUrl: event.target.result,
      })
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  // Handle Live Webcam stream capture (for desktop/web)
  const startWebCamera = async () => {
    try {
      setCameraActive(true)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      })
      mediaStreamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.warn('Webcam stream not accessible, opening mobile photo picker:', err)
      setCameraActive(false)
      // Fallback: trigger native device camera input
      cameraInputRef.current?.click()
    }
  }

  const stopWebCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop())
      mediaStreamRef.current = null
    }
    setCameraActive(false)
  }

  const capturePhoto = () => {
    if (!videoRef.current) return
    const video = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85)

    setAttachedImage({
      name: `Snapshot_${new Date().toISOString().slice(11, 19).replace(/:/g, '-')}.jpg`,
      type: 'image/jpeg',
      dataUrl,
    })
    stopWebCamera()
  }

  // Handle Speech Recognition (Microphone Speech-to-Text)
  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser. Please type your message.')
      return
    }

    if (isListening) {
      setIsListening(false)
      return
    }

    try {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)
      recognition.onerror = () => setIsListening(false)

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInputMessage((prev) => (prev ? `${prev} ${transcript}` : transcript))
        setIsListening(false)
      }

      recognition.start()
    } catch (err) {
      console.error('Speech recognition error:', err)
      setIsListening(false)
    }
  }

  // Handle Sending Message (with optional attached image)
  const handleSendMessage = (textToSend) => {
    const query = textToSend !== undefined ? textToSend : inputMessage
    const currentAttachment = attachedImage

    if (!query.trim() && !currentAttachment) return

    const studentMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query.trim() || (currentAttachment ? '📸 Uploaded assignment image for analysis' : ''),
      image: currentAttachment ? currentAttachment.dataUrl : null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, studentMsg])
    setInputMessage('')
    setAttachedImage(null)
    setIsTyping(true)
    setHasNewAlert(false)

    // Simulate ChatGPT intelligent streaming response delay
    setTimeout(() => {
      const aiResult = generateHomieResponse(query, currentAttachment)

      const responseMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
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

  // Handle quiz selection
  const handleQuizAnswer = (quiz, optionIndex) => {
    const isCorrect = optionIndex === quiz.correctAnswer
    setActiveQuizState({
      questionId: quiz.id,
      selected: optionIndex,
      isCorrect,
    })

    const feedbackText = isCorrect
      ? `🎉 **Spot on!** That's 100% correct!\n\n${quiz.explanation}`
      : `⚠️ **Not quite!**\n\nThe correct answer is **Option ${String.fromCharCode(65 + quiz.correctAnswer)}**.\n\n${quiz.explanation}`

    setTimeout(() => {
      const feedbackMsg = {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: feedbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, feedbackMsg])
    }, 400)
  }

  // Reset chat
  const handleResetConversation = () => {
    const freshMessages = [
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: HOMIE_PROFILE.greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]
    setMessages(freshMessages)
    localStorage.setItem('cv_homie_chat_history', JSON.stringify(freshMessages))
    setActiveQuizState(null)
    setAttachedImage(null)
  }

  const urgentCount = PENDING_ASSIGNMENTS.filter((a) => a.dueDays <= 2).length

  return (
    <>
      {/* Hidden file inputs for attachment & mobile camera */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 1. Executive Professional Floating Action Button: "Talk to ur Homie" */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Talk to ur Homie"
          className="flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 hover:from-slate-800 hover:to-indigo-900 text-white border border-indigo-400/25 shadow-xl shadow-indigo-950/20 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
        >
          {/* Calm online indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400"></span>
          </span>

          <Sparkles size={16} className="text-indigo-300 group-hover:rotate-12 transition-transform" />

          <div className="flex flex-col text-left">
            <span className="text-xs sm:text-sm font-bold tracking-tight leading-none text-white">
              Talk to ur Homie
            </span>
            <span className="text-[10px] text-indigo-200/70 font-medium leading-tight mt-0.5">
              Academic Vision AI
            </span>
          </div>

          {urgentCount > 0 && !isOpen && (
            <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full ml-0.5 shadow-xs">
              {urgentCount}
            </span>
          )}
        </button>
      </div>

      {/* 2. Main Responsive Professional Chat Window */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-20 sm:right-6 sm:w-[460px] max-h-[94vh] sm:max-h-[680px] h-[88vh] sm:h-[640px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200/90 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Executive Header Bar */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-indigo-900/40 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-400/30 flex items-center justify-center shadow-xs">
                <Sparkles size={17} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base leading-tight text-white">
                    Talk to ur Homie
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
                    GPT-4o Vision
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">
                  Multimodal Problem Solver & Deadline Radar
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetConversation}
                title="Clear Conversation"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Professional Academic Deadline Notification Strip */}
          {urgentCount > 0 && (
            <div className="bg-amber-50/90 border-b border-amber-200/80 px-3.5 py-2 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
                </span>
                <span className="text-[11px] font-semibold text-amber-900 truncate">
                  Homie Radar: {urgentCount} assignment(s) due within 48 hours!
                </span>
              </div>
              <button
                onClick={() =>
                  handleSendMessage('Yo Homie! What assignments are due soon and how do I solve them?')
                }
                className="text-[11px] font-bold text-amber-900 bg-white hover:bg-amber-100/80 border border-amber-300/80 px-2.5 py-0.5 rounded-lg shadow-2xs shrink-0 cursor-pointer transition-colors"
              >
                Solve Now
              </button>
            </div>
          )}

          {/* Chat Message Scroll Area */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-4 bg-slate-50/70">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant'

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Sparkles size={14} />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[82%] rounded-2xl p-3 sm:p-3.5 text-xs sm:text-sm shadow-xs ${
                      isAssistant
                        ? 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-sm'
                        : 'bg-indigo-600 text-white rounded-tr-sm shadow-indigo-100'
                    }`}
                  >
                    {/* Render Image Thumbnail if attached in user message */}
                    {msg.image && (
                      <div className="mb-2 rounded-xl overflow-hidden border border-indigo-400/40 max-w-xs">
                        <img
                          src={msg.image}
                          alt="Uploaded query snapshot"
                          className="w-full max-h-48 object-cover cursor-pointer hover:opacity-95"
                          onClick={() => window.open(msg.image, '_blank')}
                        />
                      </div>
                    )}

                    <MessageContent text={msg.text} />

                    {/* Interactive Quiz Renderer */}
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

                            let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                            if (hasAnswered) {
                              if (isCorrectOpt) {
                                btnStyle =
                                  'bg-emerald-50 border-emerald-400 text-emerald-800 font-semibold ring-1 ring-emerald-400'
                              } else if (isSelected && !isCorrectOpt) {
                                btnStyle = 'bg-rose-50 border-rose-400 text-rose-800 line-through'
                              } else {
                                btnStyle = 'opacity-60 bg-slate-50 border-slate-200 text-slate-600'
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={hasAnswered}
                                onClick={() => handleQuizAnswer(msg.quiz, optIdx)}
                                className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${btnStyle}`}
                              >
                                {opt}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    <div
                      className={`text-[9px] mt-1 text-right ${
                        isAssistant ? 'text-slate-400' : 'text-indigo-200'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles size={14} />
                </div>
                <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-sm p-3 shadow-xs flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                    <span
                      className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                      style={{ animationDelay: '0.15s' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-indigo-300 animate-bounce"
                      style={{ animationDelay: '0.3s' }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 italic">Homie AI is analyzing solution...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips Carousel (ChatGPT Style) */}
          <div className="bg-slate-50/80 border-t border-slate-200/60 px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
            {HOMIE_PROFILE.quickPrompts.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip.query)}
                className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200/90 text-slate-700 text-[11px] font-medium transition-all shadow-2xs cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Attached Image Preview Bar (before sending) */}
          {attachedImage && (
            <div className="px-3 pt-2.5 pb-1 bg-white border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <img
                  src={attachedImage.dataUrl}
                  alt="Attachment preview"
                  className="w-9 h-9 rounded-lg object-cover border border-slate-300 shrink-0"
                />
                <div className="overflow-hidden">
                  <span className="text-xs font-bold text-slate-800 truncate block">
                    {attachedImage.name}
                  </span>
                  <span className="text-[10px] text-indigo-600 font-semibold block">
                    Ready for Vision Analysis
                  </span>
                </div>
              </div>
              <button
                onClick={() => setAttachedImage(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Remove image"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* ChatGPT-Style Modern Multimodal Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="p-3 bg-white border-t border-slate-200/90 flex items-center gap-1.5 sm:gap-2 shrink-0"
          >
            {/* 1. Attachment / Upload Image Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Attach photo/image from device"
              className="p-2 sm:p-2.5 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer shrink-0"
            >
              <Paperclip size={18} />
            </button>

            {/* 2. Live Camera Button */}
            <button
              type="button"
              onClick={startWebCamera}
              title="Take photo with camera"
              className="p-2 sm:p-2.5 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer shrink-0"
            >
              <Camera size={18} />
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                attachedImage
                  ? 'Ask anything about this image...'
                  : 'Message Homie or attach an assignment photo...'
              }
              className="flex-1 bg-slate-50 border border-slate-200/90 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all placeholder:text-slate-400"
            />

            {/* 3. Microphone Voice Button */}
            <button
              type="button"
              onClick={toggleListening}
              title="Talk to Homie (Voice input)"
              className={`p-2 sm:p-2.5 rounded-xl transition-colors cursor-pointer shrink-0 ${
                isListening
                  ? 'bg-rose-100 text-rose-600 animate-pulse'
                  : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputMessage.trim() && !attachedImage}
              className="p-2 sm:p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 text-white transition-all shadow-sm shadow-indigo-200/50 flex items-center justify-center shrink-0 cursor-pointer"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* 3. Live Webcam Snapshot Viewfinder Modal */}
      {cameraActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-4 sm:p-5 shadow-2xl border border-slate-800 text-white flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <Camera size={18} className="text-indigo-400" />
                <h4 className="font-bold text-sm">Snap Assignment Photo</h4>
              </div>
              <button
                onClick={stopWebCamera}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Live Camera Viewfinder */}
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-slate-700/80 flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-4 border-2 border-white/30 rounded-xl pointer-events-none" />
            </div>

            <p className="text-xs text-slate-400 mt-3 text-center">
              Align your textbook page, problem sheet, or circuit in the frame.
            </p>

            {/* Shutter Button */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={capturePhoto}
                className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-950/40 flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
              >
                <Camera size={16} />
                <span>Capture Snapshot</span>
              </button>
              <button
                onClick={stopWebCamera}
                className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
