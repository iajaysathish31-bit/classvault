import { useState } from 'react'
import TeacherLayout from '../../layouts/TeacherLayout.jsx'
import {
  FolderTree,
  Upload,
  Plus,
  FileText,
  Eye,
  Trash2,
  Lock,
  Globe,
  Check,
  X,
  Clock,
  Filter,
  Download,
} from 'lucide-react'

const initialMaterials = [
  {
    id: 1,
    title: 'PHYS 401 - Fall 2026 Comprehensive Syllabus & Grading Policy',
    course: 'PHYS 401',
    category: 'Syllabus',
    fileType: 'PDF',
    size: '1.2 MB',
    uploadedOn: 'Aug 28, 2026',
    status: 'Published',
    downloads: 142,
  },
  {
    id: 2,
    title: 'Carnot Cycle & Thermodynamics Slide Deck (Lectures 10-14)',
    course: 'PHYS 401',
    category: 'Lecture Slides',
    fileType: 'PDF',
    size: '5.8 MB',
    uploadedOn: 'Sep 12, 2026',
    status: 'Published',
    downloads: 110,
  },
  {
    id: 3,
    title: 'Red-Black Tree Balance Invariants & Pseudo-Code Specification',
    course: 'CS 302',
    category: 'Lab Manual',
    fileType: 'PDF',
    size: '2.4 MB',
    uploadedOn: 'Sep 14, 2026',
    status: 'Published',
    downloads: 88,
  },
  {
    id: 4,
    title: 'Midterm Exam Solution Key & Common Derivation Fallacies',
    course: 'PHYS 401',
    category: 'Exam Key',
    fileType: 'PDF',
    size: '1.9 MB',
    uploadedOn: 'Scheduled',
    status: 'Draft (Locked)',
    downloads: 0,
  },
  {
    id: 5,
    title: 'Linear Algebra Axler Chapter 4 Supplementary Notes',
    course: 'MATH 201',
    category: 'Lecture Slides',
    fileType: 'PDF',
    size: '3.1 MB',
    uploadedOn: 'Sep 02, 2026',
    status: 'Published',
    downloads: 95,
  },
]

export default function FacultyMaterials() {
  const [materials, setMaterials] = useState(initialMaterials)
  const [selectedCourse, setSelectedCourse] = useState('ALL')
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // New Material Form
  const [newTitle, setNewTitle] = useState('')
  const [newCourse, setNewCourse] = useState('PHYS 401')
  const [newCategory, setNewCategory] = useState('Lecture Slides')
  const [newStatus, setNewStatus] = useState('Published')

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  const handleDelete = (id) => {
    const item = materials.find((m) => m.id === id)
    setMaterials((prev) => prev.filter((m) => m.id !== id))
    showToast(`Removed "${item.title}" from course materials.`)
  }

  const handleCreateMaterial = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const newDoc = {
      id: Date.now(),
      title: newTitle,
      course: newCourse,
      category: newCategory,
      fileType: 'PDF',
      size: '2.5 MB',
      uploadedOn: 'Just now',
      status: newStatus,
      downloads: 0,
    }

    setMaterials([newDoc, ...materials])
    setUploadModalOpen(false)
    setNewTitle('')
    showToast(`Published "${newDoc.title}" to ${newDoc.course}!`)
  }

  const courses = ['ALL', 'PHYS 401', 'CS 302', 'MATH 201']

  const filtered = materials.filter((m) => {
    return selectedCourse === 'ALL' || m.course === selectedCourse
  })

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-500 text-sm font-medium animate-bounce">
            <Check size={18} />
            {toastMessage}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-md">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800/60">
              Curriculum Distribution
            </span>
            <h1 className="text-2xl font-black text-white mt-2 tracking-tight">
              Curriculum Vault & Course Materials
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Upload course syllabi, lecture presentations, problem sets, and post-exam solution keys.
            </p>
          </div>

          <button
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950 transition-all self-start md:self-auto"
          >
            <Plus size={16} /> Publish Resource
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 bg-slate-950 p-4 rounded-3xl border border-slate-800">
          <Filter size={14} className="text-slate-400 mr-1" />
          <span className="text-xs font-bold text-slate-400 mr-2">Filter By Course:</span>
          {courses.map((crs) => (
            <button
              key={crs}
              onClick={() => setSelectedCourse(crs)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCourse === crs
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-850 border border-slate-800'
              }`}
            >
              {crs}
            </button>
          ))}
        </div>

        {/* Materials Table / List */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-bold">
                  <th className="py-3.5 px-5">Material Title & Subject</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Type / Size</th>
                  <th className="py-3.5 px-4">Release Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Downloads</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-900/40 transition-colors text-slate-200"
                  >
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-white flex items-center gap-2">
                        <FileText size={15} className="text-emerald-400 shrink-0" />
                        {item.title}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 mt-0.5 inline-block">
                        {item.course}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">{item.category}</td>

                    <td className="py-3.5 px-4 text-slate-400 font-mono">
                      {item.fileType} · {item.size}
                    </td>

                    <td className="py-3.5 px-4 text-slate-400">{item.uploadedOn}</td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.status.includes('Published')
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                            : 'bg-amber-950 text-amber-400 border border-amber-800/60'
                        }`}
                      >
                        {item.status.includes('Published') ? (
                          <Globe size={10} />
                        ) : (
                          <Lock size={10} />
                        )}
                        {item.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center text-slate-400 font-mono">
                      {item.downloads}
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
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

        {/* Upload Modal */}
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95 duration-200 text-slate-100">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center justify-center">
                    <Upload size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Publish Material</h3>
                    <p className="text-xs text-slate-400">Add to student portal library</p>
                  </div>
                </div>
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateMaterial} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Resource Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chapter 7 Carnot Heat Engine Slides"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Cohort</label>
                    <select
                      value={newCourse}
                      onChange={(e) => setNewCourse(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                    >
                      <option value="PHYS 401">PHYS 401</option>
                      <option value="CS 302">CS 302</option>
                      <option value="MATH 201">MATH 201</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                    >
                      <option value="Lecture Slides">Lecture Slides</option>
                      <option value="Syllabus">Syllabus</option>
                      <option value="Lab Manual">Lab Manual</option>
                      <option value="Exam Key">Exam Key</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Access Level</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  >
                    <option value="Published">Immediate Access (Published)</option>
                    <option value="Draft (Locked)">Locked until Exam (Draft)</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setUploadModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950"
                  >
                    Publish to Students
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  )
}
