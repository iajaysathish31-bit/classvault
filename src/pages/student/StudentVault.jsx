import { useState, useRef } from 'react'
import StudentLayout from '../../layouts/StudentLayout.jsx'
import { useData } from '../../context/DataContext.jsx'
import { useUser } from '../../context/AuthContext.jsx'
import VideoPlayerModal from '../../components/VideoPlayerModal.jsx'
import {
  Bookmark,
  Upload,
  FolderTree,
  Search,
  Download,
  FileText,
  Filter,
  Plus,
  Star,
  ExternalLink,
  BookOpen,
  FolderDown,
  Check,
  X,
  Layers,
  Code,
  Presentation,
  CheckCircle2,
  Video,
  Play,
  Clock,
  Calendar,
  Sparkles,
} from 'lucide-react'

export default function StudentVault() {
  const { contents, uploadContent, classes } = useData()
  const { user } = useUser()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set(['CNT-501', 'CNT-502']))
  const [onlyBookmarked, setOnlyBookmarked] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [activeVideoModal, setActiveVideoModal] = useState(null)
  const [toastMessage, setToastMessage] = useState('')

  // Upload Modal State
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newType, setNewType] = useState('PDF')
  const [newFileUrl, setNewFileUrl] = useState('')
  const [newClassId, setNewClassId] = useState(classes[0]?.class_id || '24CSC2T351')

  // File Explorer Upload State
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showManualUrl, setShowManualUrl] = useState(false)
  const fileInputRef = useRef(null)

  const processFile = (file) => {
    setSelectedFile(file)
    if (!newTitle.trim()) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
      const capitalized = cleanName
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
      setNewTitle(capitalized)
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    if (['pdf'].includes(ext)) {
      setNewType('PDF')
    } else if (['ppt', 'pptx', 'key'].includes(ext)) {
      setNewType('Presentation')
    } else if (['zip', 'rar', 'tar', 'gz', 'py', 'js', 'jsx', 'ts', 'tsx', 'java', 'cpp', 'c', 'cs', 'html', 'css', 'json'].includes(ext)) {
      setNewType('Code')
    } else {
      setNewType('Notes')
    }

    const reader = new FileReader()
    reader.onload = () => {
      setNewFileUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        showToast('Removed from favorites.')
      } else {
        next.add(id)
        showToast('Saved to favorites!')
      }
      return next
    })
  }

  const handleDownload = (item) => {
    showToast(`Accessing file: "${item.title}" (${item.file_url})`)
  }

  const handleUploadPersonal = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const fileSizeFormatted = selectedFile
      ? selectedFile.size > 1024 * 1024
        ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(selectedFile.size / 1024)} KB`
      : '1.2 MB'

    const fileNameFormatted = selectedFile?.name || `${newTitle.toLowerCase().replace(/\s+/g, '_')}.${newType.toLowerCase()}`

    const created = uploadContent({
      title: newTitle,
      description: newDescription || 'Student study summary uploaded to personal vault.',
      file_url: newFileUrl || `/materials/${newTitle.toLowerCase().replace(/\s+/g, '_')}.${newType.toLowerCase()}`,
      file_name: fileNameFormatted,
      file_size: fileSizeFormatted,
      type: newType,
      class_id: newClassId,
    })

    setUploadModalOpen(false)
    setNewTitle('')
    setNewDescription('')
    setNewFileUrl('')
    setSelectedFile(null)
    setShowManualUrl(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
    showToast(`Saved "${created.title}" to vault!`)
  }

  const types = ['All', 'Video', 'PDF', 'Code', 'Presentation', 'Notes']

  const videoLectures = contents.filter((c) => c.type === 'Video')

  const filteredContents = contents.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content_id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchType = selectedType === 'All' || item.type.toLowerCase() === selectedType.toLowerCase()
    const matchBookmark = !onlyBookmarked || bookmarkedIds.has(item.content_id)
    return matchSearch && matchType && matchBookmark
  })

  return (
    <StudentLayout>
      <div className="px-4 sm:px-6 md:px-8 py-5 sm:py-8 max-w-7xl mx-auto space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-6 right-4 sm:right-6 z-50 flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-500 text-xs sm:text-sm font-medium animate-bounce max-w-[90vw]">
            <Check size={18} />
            {toastMessage}
          </div>
        )}

        {/* Top Header Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-indigo-100 shadow-sm">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] sm:text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2.5 sm:px-3 py-1 rounded-full border border-indigo-100">
                STUDENT ACCESSES CONTENT
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Student ID: {user?.student_id || 'STU-8821'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
              Study Vault & Learning Content
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Access course materials, formula cheat sheets, presentation slide decks, and code suites uploaded by professors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setOnlyBookmarked(!onlyBookmarked)}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs font-bold transition-all border ${
                onlyBookmarked
                  ? 'bg-amber-50 border-amber-200 text-amber-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200'
              }`}
            >
              <Star
                size={16}
                className={onlyBookmarked ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}
              />
              Starred ({bookmarkedIds.size})
            </button>

            <button
              onClick={() => setUploadModalOpen(true)}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-100 transition-all hover:scale-105 active:scale-95"
            >
              <Plus size={16} /> Save Notes
            </button>
          </div>
        </div>

        {/* Missed Class / Absentee Catch-Up Hub Banner */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-rose-950 p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-indigo-900/60 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <Sparkles size={14} className="text-amber-300" />
                <span>Missed Class? Absentee Catch-Up Hub</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                Catch Up On Recorded Lectures Anytime
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
                If you were absent or missed a session, your professors record each live classroom lecture.
                Watch board derivations, live code walkthroughs, and peer Q&A without missing semester credits.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedType('Video')}
                className="px-4 py-2.5 rounded-xl sm:rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-900/40 flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <Video size={16} /> Filter Video Recordings ({videoLectures.length})
              </button>
            </div>
          </div>

          {/* Quick Carousel of Latest Video Lectures */}
          {videoLectures.length > 0 && (
            <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {videoLectures.slice(0, 3).map((vid) => (
                <div
                  key={vid.content_id}
                  onClick={() => setActiveVideoModal(vid)}
                  className="bg-white/10 hover:bg-white/15 border border-white/15 p-3 rounded-2xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-rose-300 font-bold mb-1">
                      <span className="flex items-center gap-1 font-mono">
                        <Clock size={10} /> {vid.duration || 'Session'}
                      </span>
                      <span>{vid.class_id}</span>
                    </div>
                    <p className="text-xs font-bold text-white line-clamp-1 group-hover:text-rose-200 transition-colors">
                      {vid.title}
                    </p>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-300">
                    <span className="text-[10px] text-slate-400">{vid.lecture_date || vid.created_at}</span>
                    <span className="text-[11px] font-bold text-rose-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      <Play size={10} className="fill-rose-400" /> Watch
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-indigo-100 shadow-xs space-y-3">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by content title, description, or content ID (e.g. CNT-501)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-2xl bg-slate-50/70 border border-slate-200/80 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
              <Layers size={13} /> Resource Type:
            </span>
            {types.map((tp) => (
              <button
                key={tp}
                onClick={() => setSelectedType(tp)}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedType === tp
                    ? tp === 'Video'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {tp === 'Video' ? '🎥 Video Lectures' : tp}
              </button>
            ))}
          </div>
        </div>

        {/* Content Items Grid */}
        {filteredContents.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-indigo-100 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
              <Search size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No matching content records</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No learning content found matching your search. Try adjusting the type filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredContents.map((item) => {
              const isStarred = bookmarkedIds.has(item.content_id)
              const isVideo = item.type === 'Video'

              return (
                <div
                  key={item.content_id}
                  className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border transition-all hover:shadow-md flex flex-col justify-between ${
                    isVideo
                      ? 'border-rose-100 hover:border-rose-300 shadow-xs'
                      : 'border-slate-200/80 hover:border-indigo-200 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {item.content_id}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          isVideo
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {isVideo ? '🎥 Class Video Lecture' : item.type}
                        </span>
                        {isVideo && item.duration && (
                          <span className="text-[10px] font-bold text-rose-600 bg-rose-50/70 px-2 py-0.5 rounded border border-rose-100 flex items-center gap-1">
                            <Clock size={10} /> {item.duration}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => toggleBookmark(item.content_id)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-amber-500 transition-colors"
                        title={isStarred ? 'Remove Favorite' : 'Save to Favorites'}
                      >
                        <Star
                          size={18}
                          className={isStarred ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
                        />
                      </button>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-2.5 line-clamp-2 leading-snug flex items-center gap-2">
                      {isVideo && <Video size={16} className="text-rose-600 shrink-0" />}
                      <span>{item.title}</span>
                    </h3>

                    <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2 truncate max-w-full sm:max-w-[200px]">
                      <span>{item.lecture_date || item.created_at}</span>
                      <span>·</span>
                      <span className="truncate">{item.class_id}</span>
                    </div>

                    {isVideo ? (
                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => setActiveVideoModal(item)}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md shadow-rose-200 hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          <Play size={13} className="fill-white" />
                          Watch Recording
                        </button>
                        {item.file_url && (
                          <a
                            href={item.file_url}
                            download={item.file_name || `${item.title}.mp4`}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                            title="Download recording"
                          >
                            <Download size={14} />
                          </a>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDownload(item)}
                        className="self-end sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all border border-indigo-200"
                      >
                        <Download size={13} />
                        Access File
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Upload Personal Study Notes Modal */}
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-3 sm:p-4">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 max-w-md w-full shadow-2xl border border-indigo-100 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <FolderDown size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Save Study Resource</h3>
                    <p className="text-xs text-slate-500">ER Entity: CONTENT</p>
                  </div>
                </div>
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUploadPersonal} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Resource Title (title)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chapter 4 Entropy Notes Summary"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Type</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none"
                    >
                      <option value="PDF">PDF</option>
                      <option value="Notes">Notes</option>
                      <option value="Code">Code</option>
                      <option value="Presentation">Presentation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Class</label>
                    <select
                      value={newClassId}
                      onChange={(e) => setNewClassId(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none"
                    >
                      {classes.map((c) => (
                        <option key={c.class_id} value={c.class_id}>
                          {c.subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Description (description)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Notes summary or formulas included..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none resize-none"
                  />
                </div>

                {/* Native File Explorer Upload Zone */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Upload Document (File Explorer)
                    </label>
                    <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                      Browse Computer
                    </span>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.zip,.py,.java,.cpp,.c,.js,.html,.css"
                  />

                  {!selectedFile ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault()
                        setIsDragging(true)
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                        isDragging
                          ? 'border-indigo-500 bg-indigo-50/70'
                          : 'border-slate-200 hover:border-indigo-400 bg-slate-50/60 hover:bg-indigo-50/20'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-indigo-100/80 text-indigo-700 flex items-center justify-center shadow-xs">
                        <Upload size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          Click to browse from File Explorer
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Drag and drop or select PDF, PPT, Word, Code, or ZIP
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          fileInputRef.current?.click()
                        }}
                        className="mt-1 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition-all"
                      >
                        <FolderTree size={13} /> Open File Explorer
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 rounded-2xl bg-indigo-50/90 border border-indigo-200 flex items-center justify-between gap-3 shadow-xs">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <FileText size={20} />
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {selectedFile.name}
                          </p>
                          <p className="text-[11px] text-indigo-700 font-semibold mt-0.5 flex items-center gap-1.5">
                            <span>
                              {selectedFile.size > 1024 * 1024
                                ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
                                : `${Math.round(selectedFile.size / 1024)} KB`}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-emerald-700 font-bold">
                              <Check size={12} /> Ready to save
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-2 py-1 rounded-lg text-[11px] font-bold text-indigo-700 bg-white border border-indigo-200 hover:bg-indigo-50 transition-colors cursor-pointer"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFile(null)
                            setNewFileUrl('')
                            if (fileInputRef.current) fileInputRef.current.value = ''
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Remove file"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setShowManualUrl(!showManualUrl)}
                    className="text-[11px] text-indigo-700 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{showManualUrl ? '▲ Hide manual path' : '▼ Or enter manual file path'}</span>
                  </button>

                  {showManualUrl && (
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="e.g. /materials/entropy_summary.pdf"
                        value={newFileUrl}
                        onChange={(e) => setNewFileUrl(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none font-mono"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setUploadModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200"
                  >
                    Save to Vault
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Video Lecture Player Modal */}
        {activeVideoModal && (
          <VideoPlayerModal
            video={activeVideoModal}
            onClose={() => setActiveVideoModal(null)}
            classInfo={classes.find((c) => c.class_id === activeVideoModal?.class_id)}
          />
        )}
      </div>
    </StudentLayout>
  )
}
