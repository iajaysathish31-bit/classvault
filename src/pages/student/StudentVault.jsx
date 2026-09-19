import { useState } from 'react'
import StudentLayout from '../../layouts/StudentLayout.jsx'
import {
  Bookmark,
  Search,
  Download,
  FileText,
  Filter,
  Plus,
  Star,
  ExternalLink,
  BookOpen,
  Sparkles,
  FolderDown,
  Check,
  X,
  Clock,
  Layers,
} from 'lucide-react'

const initialVaultItems = [
  {
    id: 1,
    title: 'Carnot Cycle & Entropy Balance Formula Sheet',
    course: 'PHYS 401',
    category: 'Cheatsheets',
    uploadedBy: 'Prof. Chen Wei',
    fileType: 'PDF',
    fileSize: '1.4 MB',
    downloads: 142,
    date: 'Sep 12, 2026',
    bookmarked: true,
    summary: 'Comprehensive summary of heat engines, refrigerator COP equations, Clausius inequality proofs, and T-s diagrams.',
  },
  {
    id: 2,
    title: 'Red-Black Trees & AVL Balance Invariants Study Guide',
    course: 'CS 302',
    category: 'Lecture Notes',
    uploadedBy: 'Prof. Sara Okafor',
    fileType: 'PDF',
    fileSize: '3.8 MB',
    downloads: 210,
    date: 'Sep 15, 2026',
    bookmarked: true,
    summary: 'Step-by-step visual rotations, color flip rules, and pseudo-code implementations for balanced search trees.',
  },
  {
    id: 3,
    title: 'Midterm 1 Past Papers & Solutions Archive (2023-2025)',
    course: 'MATH 201',
    category: 'Exam Archives',
    uploadedBy: 'Math Department',
    fileType: 'ZIP',
    fileSize: '6.2 MB',
    downloads: 380,
    date: 'Sep 02, 2026',
    bookmarked: false,
    summary: 'Past 3 years of midterm examinations with fully worked step-by-step answer keys for row reductions and determinants.',
  },
  {
    id: 4,
    title: 'Post-Colonial African Borders & Partition Primary Sources',
    course: 'HIST 210',
    category: 'Lab Guides',
    uploadedBy: 'Prof. Anita Reyes',
    fileType: 'PDF',
    fileSize: '2.1 MB',
    downloads: 85,
    date: 'Sep 10, 2026',
    bookmarked: false,
    summary: 'Collection of 12 primary diplomatic documents from the 1963 Organization of African Unity Cairo Summit.',
  },
  {
    id: 5,
    title: 'Graph Traversal & BFS/DFS Complexity Quick Reference',
    course: 'CS 302',
    category: 'Cheatsheets',
    uploadedBy: 'TA Alex Vance',
    fileType: 'PDF',
    fileSize: '890 KB',
    downloads: 174,
    date: 'Sep 08, 2026',
    bookmarked: false,
    summary: 'Quick reference sheet showing adjacency matrix vs list performance, topological sorting, and cycle detection algorithms.',
  },
  {
    id: 6,
    title: 'Vector Spaces & Subspace Proof Checklists',
    course: 'MATH 201',
    category: 'Lecture Notes',
    uploadedBy: 'Prof. James Erikson',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    downloads: 120,
    date: 'Aug 29, 2026',
    bookmarked: false,
    summary: 'A 10-axiom verification checklist for vector spaces, span spanning sets, and linear independence proofs.',
  },
]

export default function StudentVault() {
  const [items, setItems] = useState(initialVaultItems)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCourse, setSelectedCourse] = useState('All')
  const [onlyBookmarked, setOnlyBookmarked] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Upload Form State
  const [newTitle, setNewTitle] = useState('')
  const [newCourse, setNewCourse] = useState('PHYS 401')
  const [newCategory, setNewCategory] = useState('Lecture Notes')
  const [newSummary, setNewSummary] = useState('')

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  const toggleBookmark = (id) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.bookmarked
          showToast(nextState ? `Saved "${item.title}" to favorites!` : `Removed from favorites.`)
          return { ...item, bookmarked: nextState }
        }
        return item
      })
    )
  }

  const handleDownload = (item) => {
    showToast(`Downloading "${item.title}" (${item.fileSize})...`)
    setItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, downloads: it.downloads + 1 } : it))
    )
  }

  const handleAddDocument = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const newItem = {
      id: Date.now(),
      title: newTitle,
      course: newCourse,
      category: newCategory,
      uploadedBy: 'You (Personal Vault)',
      fileType: 'PDF',
      fileSize: '1.8 MB',
      downloads: 1,
      date: 'Just now',
      bookmarked: true,
      summary: newSummary || 'Personal study material uploaded to your private vault.',
    }

    setItems([newItem, ...items])
    setUploadModalOpen(false)
    setNewTitle('')
    setNewSummary('')
    showToast(`Uploaded "${newItem.title}" to your Study Vault!`)
  }

  const categories = ['All', 'Cheatsheets', 'Lecture Notes', 'Lab Guides', 'Exam Archives']
  const courses = ['All', 'PHYS 401', 'CS 302', 'MATH 201', 'HIST 210']

  const filteredItems = items.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.course.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchCourse = selectedCourse === 'All' || item.course === selectedCourse
    const matchBookmark = !onlyBookmarked || item.bookmarked
    return matchSearch && matchCategory && matchCourse && matchBookmark
  })

  const totalBookmarks = items.filter((i) => i.bookmarked).length

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-500 text-sm font-medium animate-bounce">
            <Check size={18} />
            {toastMessage}
          </div>
        )}

        {/* Top Header Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-indigo-100 shadow-sm">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Curated Academic Repository
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
              Study Vault & Notes
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Search vetted course syllabi, instructor slides, formula sheets, and past exam sets.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOnlyBookmarked(!onlyBookmarked)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                onlyBookmarked
                  ? 'bg-amber-50 border-amber-200 text-amber-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200'
              }`}
            >
              <Star
                size={16}
                className={onlyBookmarked ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}
              />
              Starred ({totalBookmarks})
            </button>

            <button
              onClick={() => setUploadModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-100 transition-all hover:scale-105 active:scale-95"
            >
              <Plus size={16} /> Upload Notes
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-3xl border border-indigo-100 shadow-xs space-y-3">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search across topics, formulas, subjects, or professor notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50/70 border border-slate-200/80 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            {/* Category pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
                <Layers size={13} /> Type:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Course Filter */}
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-slate-400" />
              <span className="text-xs font-semibold text-slate-500">Course:</span>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="text-xs font-bold text-indigo-700 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200 focus:outline-none cursor-pointer"
              >
                {courses.map((crs) => (
                  <option key={crs} value={crs}>
                    {crs}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-indigo-100 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
              <Search size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No matching study materials</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find any resources matching your search. Try resetting filters or search query.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {item.course}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {item.category}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleBookmark(item.id)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-amber-500 transition-colors"
                      title={item.bookmarked ? 'Remove Star' : 'Star Document'}
                    >
                      <Star
                        size={18}
                        className={item.bookmarked ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
                      />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-2.5 line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span className="font-semibold text-slate-700">{item.fileType}</span>
                    <span>·</span>
                    <span>{item.fileSize}</span>
                    <span>·</span>
                    <span>{item.downloads} downloads</span>
                  </div>

                  <button
                    onClick={() => handleDownload(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all border border-indigo-200"
                  >
                    <Download size={13} />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Personal Document Modal */}
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-indigo-100 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <FolderDown size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Save Study Notes</h3>
                    <p className="text-xs text-slate-500">Add to your vault</p>
                  </div>
                </div>
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddDocument} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Document Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chapter 6 Thermodynamics Review Sheet"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Course</label>
                    <select
                      value={newCourse}
                      onChange={(e) => setNewCourse(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none"
                    >
                      <option value="PHYS 401">PHYS 401</option>
                      <option value="CS 302">CS 302</option>
                      <option value="MATH 201">MATH 201</option>
                      <option value="HIST 210">HIST 210</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none"
                    >
                      <option value="Lecture Notes">Lecture Notes</option>
                      <option value="Cheatsheets">Cheatsheets</option>
                      <option value="Lab Guides">Lab Guides</option>
                      <option value="Exam Archives">Exam Archives</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Brief Summary / Tags
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Key concepts covered in this summary..."
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none resize-none"
                  />
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
      </div>
    </StudentLayout>
  )
}
