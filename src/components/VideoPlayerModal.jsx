import { useState, useEffect, useRef } from 'react'
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Download,
  Calendar,
  Clock,
  BookOpen,
  User,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  FileText,
} from 'lucide-react'
import { getVideoUrlFromDB } from '../utils/vaultStorage.js'

// High-reliability sample video stream for instant demonstration
const FALLBACK_DEMO_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

export default function VideoPlayerModal({ video, onClose, classInfo, onMarkReviewed }) {
  const [activeUrl, setActiveUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [isMarkedCaughtUp, setIsMarkedCaughtUp] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    let objectUrl = null

    async function resolveVideoSource() {
      setIsLoading(true)
      setLoadError(false)

      if (!video) return

      // 1. Check if stored in browser IndexedDB
      if (video.file_url?.startsWith('indexeddb:') || video.content_id) {
        try {
          const dbUrl = await getVideoUrlFromDB(video.content_id)
          if (dbUrl) {
            objectUrl = dbUrl
            setActiveUrl(dbUrl)
            setIsLoading(false)
            return
          }
        } catch (e) {
          console.warn('Could not read from IndexedDB, falling back to url:', e)
        }
      }

      // 2. Direct web URL or cloud stream
      if (video.file_url && !video.file_url.startsWith('indexeddb:')) {
        setActiveUrl(video.file_url)
      } else {
        // Fallback demo video
        setActiveUrl(FALLBACK_DEMO_VIDEO)
      }
      setIsLoading(false)
    }

    resolveVideoSource()

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [video])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed)
    if (videoRef.current) {
      videoRef.current.playbackRate = speed
    }
  }

  const handleMarkCaughtUp = () => {
    setIsMarkedCaughtUp(true)
    if (onMarkReviewed) {
      onMarkReviewed(video)
    }
  }

  // Detect YouTube or cloud embed
  const isYouTube =
    activeUrl.includes('youtube.com') ||
    activeUrl.includes('youtu.be')
  
  const getYouTubeEmbedUrl = (url) => {
    let videoId = ''
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0]
    } else if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1].split('&')[0]
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`
  }

  const isGoogleDrive = activeUrl.includes('drive.google.com')
  const getGoogleDriveEmbedUrl = (url) => {
    return url.replace(/\/view(\?usp=.*)?$/, '/preview')
  }

  if (!video) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="p-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold text-xs flex items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              Class Lecture Recording
            </span>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-white truncate">
                {video.title}
              </h2>
              <p className="text-xs text-slate-400 truncate">
                {classInfo?.name || video.class_id} · Recorded by {classInfo?.prof || 'Faculty Instructor'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeUrl && !isYouTube && !isGoogleDrive && (
              <a
                href={activeUrl}
                download={video.file_name || `${video.title}.mp4`}
                title="Download recording for offline study"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors border border-slate-700 font-medium"
              >
                <Download size={14} /> Offline MP4
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Video Canvas Container */}
        <div className="relative bg-black flex items-center justify-center aspect-video w-full max-h-[55vh] overflow-hidden">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2 text-slate-400 text-xs">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <span>Streaming lecture recording from vault storage...</span>
            </div>
          ) : isYouTube ? (
            <iframe
              src={getYouTubeEmbedUrl(activeUrl)}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.title}
            />
          ) : isGoogleDrive ? (
            <iframe
              src={getGoogleDriveEmbedUrl(activeUrl)}
              className="w-full h-full border-0"
              allow="autoplay"
              title={video.title}
            />
          ) : (
            <video
              ref={videoRef}
              src={activeUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
              onError={() => {
                if (activeUrl !== FALLBACK_DEMO_VIDEO) {
                  setLoadError(true)
                  setActiveUrl(FALLBACK_DEMO_VIDEO)
                }
              }}
            >
              Your browser does not support the video tag.
            </video>
          )}

          {loadError && (
            <div className="absolute top-3 left-3 bg-amber-900/90 border border-amber-600/50 text-amber-200 text-[11px] px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-xs flex items-center gap-1.5">
              <span>Streaming demo lecture stream (local video file not accessible).</span>
            </div>
          )}
        </div>

        {/* Video Controls & Speed Bar */}
        {!isYouTube && !isGoogleDrive && (
          <div className="px-5 py-2.5 bg-slate-950 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300">Playback Speed:</span>
              {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => handleSpeedChange(spd)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                    playbackSpeed === spd
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-indigo-400" />
                {video.duration || 'Full Session'}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={12} className="text-emerald-400" />
                {video.created_at || 'Recent Lecture'}
              </span>
            </div>
          </div>
        )}

        {/* Lecture Notes & Absentee Catch-Up Brief */}
        <div className="p-5 overflow-y-auto bg-slate-900 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                <Sparkles size={14} /> Absentee Catch-Up Brief
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                Missed this class? Watch this recording to sync your notes with the live lecture.
                All discussions, board derivations, and questions asked by your classmates are preserved.
              </p>
            </div>

            <button
              type="button"
              onClick={handleMarkCaughtUp}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
                isMarkedCaughtUp
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-900/30'
              }`}
            >
              {isMarkedCaughtUp ? (
                <>
                  <CheckCircle2 size={15} /> Caught Up & Verified
                </>
              ) : (
                <>
                  <CheckCircle2 size={15} /> Mark Class Caught Up
                </>
              )}
            </button>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileText size={14} className="text-indigo-400" /> Syllabus Topic & Concepts Covered
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
              {video.description || 'Comprehensive lecture recording covering key curriculum topics and questions.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
