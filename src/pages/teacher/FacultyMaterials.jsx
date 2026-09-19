import { useState } from 'react'
import TeacherLayout from '../../layouts/TeacherLayout.jsx'
import { useData } from '../../context/DataContext.jsx'
import { useUser } from '../../context/AuthContext.jsx'
import {
  FolderTree,
  Upload,
  Plus,
  FileText,
  Trash2,
  Lock,
  Globe,
  Check,
  X,
  Clock,
  Filter,
  ExternalLink,
  Code,
  FileSpreadsheet,
  Presentation,
} from 'lucide-react'

export default function FacultyMaterials() {
  const { contents, uploadContent, deleteContent, classes } = useData()
  const { user } = useUser()

  const [selectedType, setSelectedType] = useState('ALL')
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // New Content Form Fields (matching ER Diagram CONTENT attributes)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newFileUrl, setNewFileUrl] = useState('')
  const [newType, setNewType] = useState('PDF')
  const [newClassId, setNewClassId] = useState(classes[0]?.class_id || 'CLS-401')

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  const handleDelete = (contentId, title) => {
    deleteContent(contentId)
    showToast(`Deleted content "${title}".`)
  }

  const handleUpload = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const created = uploadContent({
      title: newTitle,
      description: newDescription,
      file_url: newFileUrl || `/materials/${newTitle.toLowerCase().replace(/\s+/g, '_')}.${newType.toLowerCase()}`,
      type: newType,
      class_id: newClassId,
    })

    setUploadModalOpen(false)
    setNewTitle('')
    setNewDescription('')
    setNewFileUrl('')
    showToast(`Uploaded "${created.title}" (${created.content_id}) successfully!`)
  }

  const types = ['ALL', 'PDF', 'Code', 'Presentation', 'Notes']

  const filtered = contents.filter((c) => {
    return selectedType === 'ALL' || c.type.toLowerCase() === selectedType.toLowerCase()
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
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800/60">
                TEACHER UPLOADS CONTENT
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Teacher: {user?.teacher_id || 'TCH-101'}
              </span>
            </div>
            <h1 className="text-2xl font-black text-white mt-2 tracking-tight">
              Course Content & Vault Publisher
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Publish learning resources, code suites, presentations, and problem sets to the student study vault.
            </p>
          </div>

          <button
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950 transition-all self-start md:self-auto"
          >
            <Plus size={16} /> + Upload Content
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 bg-slate-950 p-4 rounded-3xl border border-slate-800">
          <Filter size={14} className="text-slate-400 mr-1" />
          <span className="text-xs font-bold text-slate-400 mr-2">Filter By Type:</span>
          {types.map((tp) => (
            <button
              key={tp}
              onClick={() => setSelectedType(tp)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedType === tp
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-850 border border-slate-800'
              }`}
            >
              {tp}
            </button>
          ))}
        </div>

        {/* Materials Table */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-bold">
                  <th className="py-3.5 px-5">Content ID & Title</th>
                  <th className="py-3.5 px-4">Description</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">File URL</th>
                  <th className="py-3.5 px-4">Created Date</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filtered.map((item) => (
                  <tr
                    key={item.content_id}
                    className="hover:bg-slate-900/40 transition-colors text-slate-200"
                  >
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-white flex items-center gap-2">
                        <FileText size={15} className="text-emerald-400 shrink-0" />
                        {item.title}
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 mt-0.5 inline-block">
                        {item.content_id}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate">
                      {item.description}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 text-[10px] font-bold">
                        {item.type}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px] truncate max-w-xs">
                      {item.file_url}
                    </td>

                    <td className="py-3.5 px-4 text-slate-400">{item.created_at}</td>

                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => handleDelete(item.content_id, item.title)}
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95 duration-200 text-slate-100">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center justify-center">
                    <Upload size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Upload Course Content</h3>
                    <p className="text-xs text-slate-400">ER Entity: CONTENT</p>
                  </div>
                </div>
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpload} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Title (title)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Statistical Mechanics Microstates Reference"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Resource Type (type)
                    </label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                    >
                      <option value="PDF">PDF Document</option>
                      <option value="Code">Code Repository</option>
                      <option value="Presentation">Presentation</option>
                      <option value="Notes">Notes / Cheatsheet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Target Class
                    </label>
                    <select
                      value={newClassId}
                      onChange={(e) => setNewClassId(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
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
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Description (description)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Brief summary of concepts or problem set covered..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full text-xs px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    File URL / Path (file_url)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. /materials/thermo_stat_mech.pdf"
                    value={newFileUrl}
                    onChange={(e) => setNewFileUrl(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none font-mono"
                  />
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
                    Publish to Vault
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
