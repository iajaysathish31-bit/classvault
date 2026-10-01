import { useState, useRef, useEffect } from 'react'
import TeacherLayout from '../../layouts/TeacherLayout.jsx'
import { useData } from '../../context/DataContext.jsx'
import { useUser } from '../../context/AuthContext.jsx'
import VideoPlayerModal from '../../components/VideoPlayerModal.jsx'
import { getStorageEstimate, parseBackupFile } from '../../utils/vaultStorage.js'
import {
  FolderTree,
  Upload,
  Plus,
  FileText,
  Trash2,
  Check,
  X,
  Filter,
  Download,
  Paperclip,
  Video,
  Play,
  Database,
  HardDrive,
  RefreshCw,
  FileDown,
  FileUp,
  Calendar,
  Clock,
  Sparkles,
} from 'lucide-react'

export default function FacultyMaterials() {
  const { contents, uploadContent, deleteContent, classes, restoreBackup, exportCurrentBackup } = useData()
  const { user } = useUser()

  const [selectedType, setSelectedType] = useState('ALL')
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [activeVideoModal, setActiveVideoModal] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [storageInfo, setStorageInfo] = useState({ usageMB: '0.0', quotaMB: 'Unlimited', percent: 0 })

  // New Content Form Fields (matching ER Diagram CONTENT attributes)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newFileUrl, setNewFileUrl] = useState('')
  const [newType, setNewType] = useState('PDF')
  const [newClassId, setNewClassId] = useState(classes[0]?.class_id || '24CSC2T351')
  const [newDuration, setNewDuration] = useState('45 mins')
  const [newLectureDate, setNewLectureDate] = useState(new Date().toISOString().split('T')[0])

  // File Explorer Upload State
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showManualUrl, setShowManualUrl] = useState(false)
  const fileInputRef = useRef(null)
  const restoreInputRef = useRef(null)

  useEffect(() => {
    getStorageEstimate().then(setStorageInfo)
  }, [contents])

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  const handleDelete = (contentId, title) => {
    deleteContent(contentId)
    showToast(`Deleted content "${title}".`)
  }

  const handleExportBackup = () => {
    try {
      const filename = exportCurrentBackup()
      showToast(`Database backup exported successfully: ${filename}`)
    } catch {
      showToast('Error exporting database backup.')
    }
  }

  const handleRestoreBackup = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const data = await parseBackupFile(file)
      restoreBackup(data)
      showToast(`Restored database with ${data.contents?.length || 0} materials and ${data.classes?.length || 0} classes!`)
      if (restoreInputRef.current) restoreInputRef.current.value = ''
    } catch (err) {
      showToast(`Restore failed: ${err.message}`)
    }
  }

  const processFile = (file) => {
    setSelectedFile(file)

    // Auto-populate title if empty
    if (!newTitle.trim()) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
      // Capitalize words
      const capitalized = cleanName
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
      setNewTitle(capitalized)
    }

    // Auto-detect resource type from file extension
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    if (['mp4', 'webm', 'mov', 'mkv', 'avi'].includes(ext)) {
      setNewType('Video')
      // Create local object URL for preview without slow Base64 stringification
      setNewFileUrl(URL.createObjectURL(file))
      return
    }

    if (['pdf'].includes(ext)) {
      setNewType('PDF')
    } else if (['ppt', 'pptx', 'key'].includes(ext)) {
      setNewType('Presentation')
    } else if (['zip', 'rar', 'tar', 'gz', 'py', 'js', 'jsx', 'ts', 'tsx', 'java', 'cpp', 'c', 'cs', 'html', 'css', 'json'].includes(ext)) {
      setNewType('Code')
    } else {
      setNewType('Notes')
    }

    // Convert file to Base64 data URL for in-browser persistence and immediate access
    const reader = new FileReader()
    reader.onload = () => {
      setNewFileUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const isVideo = newType === 'Video'
    const fileSizeFormatted = selectedFile
      ? selectedFile.size > 1024 * 1024
        ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(selectedFile.size / 1024)} KB`
      : (isVideo ? '65.0 MB' : '1.2 MB')

    const fileNameFormatted = selectedFile?.name || `${newTitle.toLowerCase().replace(/\s+/g, '_')}.${isVideo ? 'mp4' : newType.toLowerCase()}`

    const created = await uploadContent({
      title: newTitle,
      description: newDescription,
      file_url: newFileUrl || (isVideo ? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' : `/materials/${newTitle.toLowerCase().replace(/\s+/g, '_')}.${newType.toLowerCase()}`),
      file_name: fileNameFormatted,
      file_size: fileSizeFormatted,
      type: newType,
      class_id: newClassId,
      duration: isVideo ? newDuration : null,
      lecture_date: isVideo ? newLectureDate : null,
      video_file: isVideo ? selectedFile : null,
    })

    setUploadModalOpen(false)
    setNewTitle('')
    setNewDescription('')
    setNewFileUrl('')
    setSelectedFile(null)
    setShowManualUrl(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
    showToast(`Uploaded "${created.title}" ${isVideo ? 'recording to Absentee Hub' : 'successfully'}!`)
  }

  const types = ['ALL', 'Video', 'PDF', 'Code', 'Presentation', 'Notes']

  const filtered = contents.filter((c) => {
    return selectedType === 'ALL' || c.type.toLowerCase() === selectedType.toLowerCase()
  })

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-700 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-600 text-sm font-medium animate-bounce">
            <Check size={18} />
            {toastMessage}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-emerald-100 shadow-xs">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                TEACHER UPLOADS CONTENT & RECORDINGS
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Teacher: {user?.teacher_id || 'TCH-101'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
              Course Content & Lecture Vault Publisher
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Record classroom lectures for absent students, publish study materials, code suites, and presentations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setNewType('Video')
                setUploadModalOpen(true)
              }}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-200 transition-all cursor-pointer"
            >
              <Video size={16} /> + Upload Lecture Video
            </button>
            <button
              onClick={() => setUploadModalOpen(true)}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-200 transition-all cursor-pointer"
            >
              <Plus size={16} /> + Upload Content
            </button>
          </div>
        </div>

        {/* Proper Backup Data Storage Console */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-700 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Database size={15} /> Proper Backup Data Storage & IndexedDB Media Vault
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Videos are preserved in local <strong>IndexedDB High-Capacity Storage</strong> without 5MB limits.
              Full database snapshots can be exported or restored anytime to prevent data loss.
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                <HardDrive size={12} /> {storageInfo.usageMB} MB Used in Vault
              </span>
              <span>•</span>
              <span className="text-slate-300">
                Quota: {storageInfo.quotaMB === 'Unlimited' ? 'High Browser Capacity' : `${storageInfo.quotaMB} MB Available`}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleExportBackup}
              title="Download full JSON database snapshot"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <FileDown size={15} className="text-emerald-400" /> Export Full Backup (.json)
            </button>

            <button
              type="button"
              onClick={() => restoreInputRef.current?.click()}
              title="Restore database from a previously exported backup file"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <FileUp size={15} /> Restore from Backup
            </button>
            <input
              type="file"
              ref={restoreInputRef}
              accept=".json"
              onChange={handleRestoreBackup}
              className="hidden"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 bg-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-emerald-100 shadow-xs flex-wrap">
          <Filter size={14} className="text-slate-400 mr-1" />
          <span className="text-xs font-bold text-slate-500 mr-2">Filter By Type:</span>
          {types.map((tp) => (
            <button
              key={tp}
              onClick={() => setSelectedType(tp)}
              className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedType === tp
                  ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200/60'
              }`}
            >
              {tp === 'Video' ? '🎥 Video Lectures' : tp}
            </button>
          ))}
        </div>

        {/* Materials Table */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-emerald-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs min-w-[650px]">
              <thead>
                <tr className="border-b border-emerald-100 bg-emerald-50/70 text-emerald-950 font-bold">
                  <th className="py-3.5 px-5">Content ID & Title</th>
                  <th className="py-3.5 px-4">Description</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Document / File</th>
                  <th className="py-3.5 px-4">Created Date</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr
                    key={item.content_id}
                    className="hover:bg-emerald-50/30 transition-colors text-slate-700"
                  >
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        {item.type === 'Video' ? (
                          <Video size={16} className="text-rose-600 shrink-0" />
                        ) : (
                          <FileText size={15} className="text-emerald-700 shrink-0" />
                        )}
                        <span>{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-block">
                          {item.content_id}
                        </span>
                        {item.type === 'Video' && item.duration && (
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 inline-flex items-center gap-1">
                            <Clock size={10} /> {item.duration}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">
                      {item.description}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.type === 'Video'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {item.type === 'Video' ? '🎥 Lecture Video' : item.type}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 max-w-xs">
                      {item.type === 'Video' ? (
                        <button
                          type="button"
                          onClick={() => setActiveVideoModal(item)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-bold hover:bg-rose-100 transition-colors text-[11px] cursor-pointer"
                        >
                          <Play size={12} className="fill-rose-600 text-rose-600" />
                          <span>Watch Lecture Stream</span>
                        </button>
                      ) : item.file_url?.startsWith('data:') ? (
                        <a
                          href={item.file_url}
                          download={item.file_name || `${item.title.toLowerCase().replace(/\s+/g, '_')}.${item.type.toLowerCase()}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold hover:bg-emerald-100 transition-colors text-[11px]"
                          title="Click to download file"
                        >
                          <Paperclip size={12} className="text-emerald-700" />
                          <span className="truncate max-w-[140px]">{item.file_name || 'Uploaded File'}</span>
                          <Download size={11} className="shrink-0 text-emerald-600" />
                        </a>
                      ) : (
                        <span className="font-mono text-[11px] text-slate-500 truncate block">
                          {item.file_name || item.file_url}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500">
                      {item.lecture_date || item.created_at}
                    </td>

                    <td className="py-3.5 px-5 text-right space-x-2">
                      {item.type === 'Video' && (
                        <button
                          onClick={() => setActiveVideoModal(item)}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Play size={11} /> Play
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(item.content_id, item.title)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer inline-block"
                        title="Delete Resource"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upload Modal with Native File Explorer Integration */}
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-emerald-100 p-4 sm:p-6 sm:p-7 max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 shrink-0">
                    <Upload size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900">Upload Course Content</h2>
                    <p className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
                      ER Entity: CONTENT
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setUploadModalOpen(false)
                    setSelectedFile(null)
                    setNewFileUrl('')
                    setShowManualUrl(false)
                  }}
                  className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpload} className="mt-5 space-y-4">
                {/* 1. Native File Explorer Upload Zone */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Document File (File Explorer)
                    </label>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      Browse Computer
                    </span>
                  </div>

                  {/* Hidden native input */}
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
                      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
                        isDragging
                          ? 'border-emerald-500 bg-emerald-50/70'
                          : 'border-slate-200 hover:border-emerald-400 bg-slate-50/60 hover:bg-emerald-50/20'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center shadow-xs">
                        <Upload size={22} />
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
                        className="mt-1 px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition-all"
                      >
                        <FolderTree size={14} /> Open File Explorer
                      </button>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-emerald-50/90 border border-emerald-200 flex items-center justify-between gap-3 shadow-xs">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-11 h-11 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <FileText size={22} />
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {selectedFile.name}
                          </p>
                          <p className="text-[11px] text-emerald-800 font-semibold mt-0.5 flex items-center gap-1.5">
                            <span>
                              {selectedFile.size > 1024 * 1024
                                ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
                                : `${Math.round(selectedFile.size / 1024)} KB`}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-emerald-700 font-bold">
                              <Check size={12} /> Ready to publish
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-emerald-800 bg-white border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
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
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Document Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Title (title)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Statistical Mechanics Microstates Reference"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600"
                    required
                  />
                </div>

                {/* 3. Resource Type and Class */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Resource Type (type)
                    </label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600 font-semibold"
                    >
                      <option value="Video">🎥 Class Lecture Recording (Absentee Hub)</option>
                      <option value="PDF">PDF Document</option>
                      <option value="Code">Code Repository</option>
                      <option value="Presentation">Presentation</option>
                      <option value="Notes">Notes / Cheatsheet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Class
                    </label>
                    <select
                      value={newClassId}
                      onChange={(e) => setNewClassId(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600"
                    >
                      {classes.map((c) => (
                        <option key={c.class_id} value={c.class_id}>
                          {c.subject} ({c.class_id})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Video-Specific Absentee Catch-Up Attributes */}
                {newType === 'Video' && (
                  <div className="p-3.5 bg-rose-50/70 rounded-2xl border border-rose-200 space-y-3">
                    <div className="flex items-center gap-2 text-rose-800 text-xs font-bold">
                      <Sparkles size={14} className="text-rose-600" />
                      <span>Absentee Catch-Up Hub Attributes</span>
                    </div>
                    <p className="text-[11px] text-rose-700 leading-relaxed">
                      Students who missed class can open this recording to catch up on today's discussions, equations, and code.
                    </p>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Class Lecture Date
                        </label>
                        <input
                          type="date"
                          value={newLectureDate}
                          onChange={(e) => setNewLectureDate(e.target.value)}
                          className="w-full text-xs px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-slate-800 focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Lecture Duration
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 45 mins"
                          value={newDuration}
                          onChange={(e) => setNewDuration(e.target.value)}
                          className="w-full text-xs px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-slate-800 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {newType === 'Video' ? 'Lecture Summary & Key Concepts Taught' : 'Description (description)'}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={newType === 'Video' ? 'Summary of what was taught on the board and answers given to students...' : 'Brief summary of concepts or problem set covered...'}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600 resize-none"
                  />
                </div>

                {/* 5. Optional Manual URL / Cloud Video Toggle */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowManualUrl(!showManualUrl)}
                    className="text-[11px] text-emerald-800 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{showManualUrl ? '▲ Hide cloud URL input' : '▼ Or paste YouTube / Google Drive / Zoom cloud link'}</span>
                  </button>

                  {showManualUrl && (
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="e.g. https://youtube.com/watch?v=... or https://drive.google.com/file/... or /materials/lecture.mp4"
                        value={newFileUrl}
                        onChange={(e) => setNewFileUrl(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600 font-mono"
                      />
                    </div>
                  )}
                </div>

                {/* Submit Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setUploadModalOpen(false)
                      setSelectedFile(null)
                      setNewFileUrl('')
                      setShowManualUrl(false)
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-200 cursor-pointer transition-all"
                  >
                    {newType === 'Video' ? 'Publish Lecture Video' : 'Publish to Vault'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Video Player Modal */}
        {activeVideoModal && (
          <VideoPlayerModal
            video={activeVideoModal}
            onClose={() => setActiveVideoModal(null)}
            classInfo={classes.find((c) => c.class_id === activeVideoModal?.class_id)}
          />
        )}
      </div>
    </TeacherLayout>
  )
}
