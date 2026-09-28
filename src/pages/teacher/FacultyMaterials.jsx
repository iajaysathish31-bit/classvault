import { useState, useRef } from 'react'
import TeacherLayout from '../../layouts/TeacherLayout.jsx'
import { useData } from '../../context/DataContext.jsx'
import { useUser } from '../../context/AuthContext.jsx'
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

  // File Explorer Upload State
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showManualUrl, setShowManualUrl] = useState(false)
  const fileInputRef = useRef(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  const handleDelete = (contentId, title) => {
    deleteContent(contentId)
    showToast(`Deleted content "${title}".`)
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

  const handleUpload = (e) => {
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
      description: newDescription,
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
    showToast(`Uploaded "${created.title}" successfully!`)
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
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-700 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-600 text-sm font-medium animate-bounce">
            <Check size={18} />
            {toastMessage}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl border border-emerald-100 shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                TEACHER UPLOADS CONTENT
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Teacher: {user?.teacher_id || 'TCH-101'}
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
              Course Content & Vault Publisher
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Publish learning resources, code suites, presentations, and problem sets to the student study vault.
            </p>
          </div>

          <button
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-200 transition-all self-start md:self-auto cursor-pointer"
          >
            <Plus size={16} /> + Upload Content
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 bg-white p-4 rounded-3xl border border-emerald-100 shadow-xs flex-wrap">
          <Filter size={14} className="text-slate-400 mr-1" />
          <span className="text-xs font-bold text-slate-500 mr-2">Filter By Type:</span>
          {types.map((tp) => (
            <button
              key={tp}
              onClick={() => setSelectedType(tp)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedType === tp
                  ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200/60'
              }`}
            >
              {tp}
            </button>
          ))}
        </div>

        {/* Materials Table */}
        <div className="bg-white rounded-3xl border border-emerald-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
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
                        <FileText size={15} className="text-emerald-700 shrink-0" />
                        {item.title}
                      </div>
                      <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 mt-0.5 inline-block">
                        {item.content_id}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">
                      {item.description}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                        {item.type}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 max-w-xs">
                      {item.file_url?.startsWith('data:') ? (
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

                    <td className="py-3.5 px-4 text-slate-500">{item.created_at}</td>

                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => handleDelete(item.content_id, item.title)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-emerald-100 p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                    <Upload size={20} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Upload Course Content</h2>
                    <p className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
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
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Resource Type (type)
                    </label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600"
                    >
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
                          {c.subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4. Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Description (description)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Brief summary of concepts or problem set covered..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-600 resize-none"
                  />
                </div>

                {/* 5. Optional Manual URL Toggle */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowManualUrl(!showManualUrl)}
                    className="text-[11px] text-emerald-800 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{showManualUrl ? '▲ Hide manual file path' : '▼ Or specify a manual URL / server path'}</span>
                  </button>

                  {showManualUrl && (
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="e.g. /materials/thermo_stat_mech.pdf"
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
