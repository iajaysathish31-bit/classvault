import { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import {
  Upload,
  Search,
  ChevronDown,
  Folder,
  ArrowDown,
  ArrowUp,
  Star,
  FileText,
  FileSpreadsheet,
  FileCode,
  Archive,
  Download,
  X,
  Check,
} from 'lucide-react'

const initialFiles = [
  {
    id: 1,
    name: 'Assignment 3 — Sorting Algorithms.docx',
    classCode: 'CS 302',
    author: 'Sara Okafor',
    date: 'Oct 2',
    size: '188 KB',
    downloads: 35,
    type: 'DOC',
    pinned: true,
  },
  {
    id: 2,
    name: 'Lecture 8 — Laws of Thermodynamics.pdf',
    classCode: 'PHYS 401',
    author: 'Chen Wei',
    date: 'Oct 3',
    size: '2.4 MB',
    downloads: 24,
    type: 'PDF',
    pinned: true,
  },
  {
    id: 3,
    name: 'Graph Theory Cheat Sheet.pdf',
    classCode: 'CS 302',
    author: 'Liam Nakamura',
    date: 'Sep 27',
    size: '320 KB',
    downloads: 55,
    type: 'PDF',
    pinned: false,
  },
  {
    id: 4,
    name: 'Decolonization Lecture Deck.pptx',
    classCode: 'HIST 210',
    author: 'Anita Reyes',
    date: 'Sep 28',
    size: '6.3 MB',
    downloads: 22,
    type: 'PPT',
    pinned: false,
  },
  {
    id: 5,
    name: 'WWI Primary Sources Collection.zip',
    classCode: 'HIST 210',
    author: 'Anita Reyes',
    date: 'Sep 30',
    size: '8.1 MB',
    downloads: 27,
    type: 'ZIP',
    pinned: false,
  },
  {
    id: 6,
    name: 'Chapter 5 Summary Notes.pdf',
    classCode: 'MATH 201',
    author: 'James Erikson',
    date: 'Oct 4',
    size: '940 KB',
    downloads: 41,
    type: 'PDF',
    pinned: false,
  },
  {
    id: 7,
    name: 'Vector Spaces & Subspaces Worksheet.pdf',
    classCode: 'MATH 201',
    author: 'James Erikson',
    date: 'Oct 5',
    size: '512 KB',
    downloads: 19,
    type: 'PDF',
    pinned: false,
  },
  {
    id: 8,
    name: 'Thermodynamics Cycles Presentation.pptx',
    classCode: 'PHYS 401',
    author: 'Chen Wei',
    date: 'Oct 6',
    size: '4.8 MB',
    downloads: 32,
    type: 'PPT',
    pinned: false,
  },
]

const classFilters = ['All classes', 'PHYS 401', 'CS 302', 'MATH 201', 'HIST 210']
const typeFilters = ['ALL TYPES', 'PDF', 'DOC', 'PPT', 'ZIP']

export default function Resources() {
  const [files, setFiles] = useState(initialFiles)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClass, setSelectedClass] = useState('All classes')
  const [selectedType, setSelectedType] = useState('ALL TYPES')
  const [sortBy, setSortBy] = useState('newest')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Form state for new upload
  const [newTitle, setNewTitle] = useState('')
  const [newClass, setNewClass] = useState('CS 302')
  const [newFileType, setNewFileType] = useState('PDF')

  const togglePin = (id) => {
    setFiles(files.map((f) => (f.id === id ? { ...f, pinned: !f.pinned } : f)))
  }

  const handleDownload = (name) => {
    setToastMessage(`Downloading "${name}"...`)
    setTimeout(() => setToastMessage(''), 3000)
  }

  const handleUploadSubmit = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const newFile = {
      id: Date.now(),
      name: `${newTitle.trim()}.${newFileType.toLowerCase()}`,
      classCode: newClass,
      author: 'You',
      date: 'Just now',
      size: '1.2 MB',
      downloads: 0,
      type: newFileType,
      pinned: false,
    }

    setFiles([newFile, ...files])
    setNewTitle('')
    setShowUploadModal(false)
    setToastMessage('Resource uploaded successfully!')
    setTimeout(() => setToastMessage(''), 3000)
  }

  // Filter & Sort
  const filteredFiles = files.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.classCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClass = selectedClass === 'All classes' || f.classCode === selectedClass
    const matchesType = selectedType === 'ALL TYPES' || f.type === selectedType
    return matchesSearch && matchesClass && matchesType
  })

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (sortBy === 'downloads') return b.downloads - a.downloads
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return b.id - a.id // newest first
  })

  const pinnedFiles = files.filter((f) => f.pinned)
  const totalDownloads = files.reduce((acc, f) => acc + f.downloads, 0)
  const yourUploadsCount = files.filter((f) => f.author === 'You').length + 1

  const getFileIcon = (type) => {
    switch (type) {
      case 'PDF':
        return (
          <div className="w-9 h-9 rounded-xl bg-red-100 text-red-500 flex items-center justify-center font-bold text-xs shrink-0">
            PDF
          </div>
        )
      case 'DOC':
        return (
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-500 flex items-center justify-center font-bold text-xs shrink-0">
            DOC
          </div>
        )
      case 'PPT':
        return (
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0">
            PPT
          </div>
        )
      case 'ZIP':
        return (
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">
            ZIP
          </div>
        )
      default:
        return (
          <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-xs shrink-0">
            FILE
          </div>
        )
    }
  }

  return (
    <div className="flex min-h-screen bg-vault-bg">
      <Sidebar />

      <main className="flex-1 px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-vault-navy">Resources</h1>
            <p className="text-sm text-gray-400">{files.length} files across all classes</p>
          </div>
          <Link
            to="/upload"
            className="flex items-center gap-2 bg-vault-blue text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-vault-blue-dark transition-colors shadow-sm"
          >
            <Upload size={16} /> Upload
          </Link>
        </div>

        {/* Search & Sort Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files, classes, authors..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue shadow-sm"
            />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-2xl px-4 py-3 pr-9 text-sm text-vault-navy font-medium focus:outline-none focus:ring-2 focus:ring-vault-blue/30 cursor-pointer shadow-sm"
            >
              <option value="newest">Newest first</option>
              <option value="downloads">Most downloaded</option>
              <option value="name">Alphabetical</option>
            </select>
            <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Metric Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <Folder size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-vault-navy leading-none">{files.length}</p>
              <p className="text-xs text-gray-400 mt-1">Total files</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-vault-blue flex items-center justify-center shrink-0">
              <ArrowDown size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-vault-navy leading-none">{totalDownloads}</p>
              <p className="text-xs text-gray-400 mt-1">Downloads</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ArrowUp size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-vault-navy leading-none">{yourUploadsCount}</p>
              <p className="text-xs text-gray-400 mt-1">Your uploads</p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Class Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            {classFilters.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedClass(c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedClass === c
                    ? 'bg-vault-blue text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200/70'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Type Filters */}
          <div className="flex items-center p-1 bg-white border border-gray-200 rounded-full text-xs">
            {typeFilters.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1 rounded-full font-medium transition-colors ${
                  selectedType === t
                    ? 'bg-vault-blue/10 text-vault-blue font-semibold'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Pinned Section */}
        {pinnedFiles.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-3">PINNED</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {pinnedFiles.map((pf) => (
                <div
                  key={pf.id}
                  className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between gap-3 shadow-sm hover:border-gray-200 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {getFileIcon(pf.type)}
                    <div className="overflow-hidden">
                      <h3 className="text-sm font-medium text-vault-navy truncate">{pf.name}</h3>
                      <p className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                        <span>{pf.classCode}</span>
                        <span>·</span>
                        <span>{pf.size}</span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5">
                          <ArrowDown size={11} /> {pf.downloads}
                        </span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => togglePin(pf.id)}
                    className="text-amber-400 hover:text-amber-500 p-1 shrink-0"
                    title="Unpin resource"
                  >
                    <Star size={17} className="fill-amber-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Files Section */}
        <div>
          <h2 className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-3">
            ALL FILES · {sortedFiles.length}
          </h2>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm divide-y divide-gray-100">
            {sortedFiles.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">
                No files found matching your filters.
              </div>
            ) : (
              sortedFiles.map((file) => (
                <div
                  key={file.id}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {getFileIcon(file.type)}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-vault-navy truncate hover:text-vault-blue cursor-pointer">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-vault-blue/70 inline-block" />
                        <span>{file.classCode}</span>
                        <span>·</span>
                        <span>{file.author}</span>
                        <span>·</span>
                        <span>{file.date}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 shrink-0 text-xs text-gray-400">
                    <span>{file.size}</span>
                    <span className="flex items-center gap-1">
                      <ArrowDown size={13} /> {file.downloads}
                    </span>
                    <button
                      onClick={() => handleDownload(file.name)}
                      className="p-2 rounded-xl text-gray-400 hover:text-vault-blue hover:bg-vault-blue/10 transition-colors"
                      title="Download file"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={18} />
              </button>

              <h2 className="text-lg font-semibold text-vault-navy mb-1">Upload Resource</h2>
              <p className="text-xs text-gray-400 mb-5">
                Share a document, lecture slide, or primary source with your classmates.
              </p>

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-vault-navy mb-1">Document Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Midterm Study Notes"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-vault-navy mb-1">Course</label>
                    <select
                      value={newClass}
                      onChange={(e) => setNewClass(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-vault-navy focus:outline-none focus:ring-2 focus:ring-vault-blue/30"
                    >
                      <option value="PHYS 401">PHYS 401</option>
                      <option value="CS 302">CS 302</option>
                      <option value="MATH 201">MATH 201</option>
                      <option value="HIST 210">HIST 210</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-vault-navy mb-1">Format</label>
                    <select
                      value={newFileType}
                      onChange={(e) => setNewFileType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-vault-navy focus:outline-none focus:ring-2 focus:ring-vault-blue/30"
                    >
                      <option value="PDF">PDF</option>
                      <option value="DOC">DOC</option>
                      <option value="PPT">PPT</option>
                      <option value="ZIP">ZIP</option>
                    </select>
                  </div>
                </div>

                <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center bg-gray-50/50 hover:bg-gray-50 cursor-pointer transition-colors">
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-xs font-medium text-vault-navy">Click to browse or drop file here</p>
                  <p className="text-[11px] text-gray-400 mt-1">PDF, DOC, PPTX or ZIP up to 50MB</p>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-vault-blue text-white rounded-xl text-sm font-medium hover:bg-vault-blue-dark transition-colors"
                  >
                    Upload File
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 bg-vault-navy text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm z-50 animate-in slide-in-from-bottom duration-200">
            <Check size={16} className="text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}
      </main>
    </div>
  )
}
