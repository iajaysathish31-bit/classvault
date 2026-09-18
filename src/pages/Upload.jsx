import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import {
  Upload as UploadIcon,
  FileText,
  FileCode,
  Archive,
  ArrowLeft,
  X,
  CheckCircle,
  FileSpreadsheet,
} from 'lucide-react'

const courses = [
  { code: 'PHYS 401', name: 'Advanced Thermodynamics' },
  { code: 'CS 302', name: 'Data Structures & Algorithms' },
  { code: 'MATH 201', name: 'Linear Algebra' },
  { code: 'HIST 210', name: 'Modern World History' },
]

const categories = [
  'Lecture Notes',
  'Assignment',
  'Cheatsheet',
  'Study Guide',
  'Past Paper',
]

export default function Upload() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [title, setTitle] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('PHYS 401')
  const [selectedCategory, setSelectedCategory] = useState('Lecture Notes')
  const [description, setDescription] = useState('')
  const [shareWithClass, setShareWithClass] = useState(true)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        type: file.name.split('.').pop().toUpperCase(),
      })
      if (!title) {
        // Auto-fill title from filename without extension
        setTitle(file.name.replace(/\.[^/.]+$/, ''))
      }
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setSelectedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        type: file.name.split('.').pop().toUpperCase(),
      })
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ''))
      }
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setUploadSuccess(true)
      setTimeout(() => {
        navigate('/resources')
      }, 1500)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen bg-vault-bg">
      <Sidebar />

      <main className="flex-1 px-8 py-6">
        {/* Top Breadcrumb navigation */}
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-vault-navy transition-colors mb-3"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 className="text-xl font-semibold text-vault-navy">Upload Resource</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Share course materials, study summaries, or problem sets with your class.
          </p>
        </div>

        {uploadSuccess ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center max-w-2xl shadow-sm animate-in fade-in zoom-in-95">
            <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-vault-navy mb-2">Upload Complete!</h2>
            <p className="text-sm text-gray-500 mb-6">
              Your resource <strong>"{title}"</strong> has been added to {selectedCourse} and is now available to classmates.
            </p>
            <p className="text-xs text-gray-400">Redirecting to resources vault...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
            {/* File Dropzone */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <label className="block text-sm font-semibold text-vault-navy mb-3">
                File Attachment
              </label>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.txt,.epub"
              />

              {selectedFile ? (
                <div className="flex items-center justify-between p-4 rounded-xl border border-vault-blue/30 bg-vault-blue/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-vault-blue text-white flex items-center justify-center font-bold text-xs">
                      {selectedFile.type || 'FILE'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-vault-navy">{selectedFile.name}</p>
                      <p className="text-xs text-gray-400">{selectedFile.size}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="text-gray-400 hover:text-red-500 p-1.5 transition-colors"
                    title="Remove file"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
                    isDragging
                      ? 'border-vault-blue bg-vault-blue/5'
                      : 'border-gray-200 hover:border-vault-blue hover:bg-gray-50/70'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-vault-blue/10 text-vault-blue flex items-center justify-center mx-auto mb-3">
                    <UploadIcon size={24} />
                  </div>
                  <p className="text-sm font-medium text-vault-navy">
                    Click to upload <span className="font-normal text-gray-400">or drag and drop</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PDF, DOCX, PPTX, or ZIP files up to 50 MB
                  </p>
                </div>
              )}
            </div>

            {/* Document Details */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
              <h2 className="text-base font-semibold text-vault-navy">Document Details</h2>

              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-vault-navy mb-1.5">
                  Resource Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Lecture 8 — Laws of Thermodynamics"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-vault-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                />
              </div>

              {/* Course Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-vault-navy mb-1.5">
                    Select Course <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-vault-navy focus:outline-none focus:ring-2 focus:ring-vault-blue/30 cursor-pointer"
                  >
                    {courses.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} — {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-medium text-vault-navy mb-1.5">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-vault-navy focus:outline-none focus:ring-2 focus:ring-vault-blue/30 cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-vault-navy mb-1.5">
                  Description / Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide helpful context, topic overview, or page numbers..."
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-vault-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue resize-none"
                />
              </div>

              {/* Share checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer text-sm text-vault-navy">
                  <input
                    type="checkbox"
                    checked={shareWithClass}
                    onChange={(e) => setShareWithClass(e.target.checked)}
                    className="w-4 h-4 rounded text-vault-blue accent-vault-blue cursor-pointer"
                  />
                  <span>Make visible to all classmates enrolled in {selectedCourse}</span>
                </label>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Link
                to="/dashboard"
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-vault-blue text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-vault-blue-dark transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              >
                <UploadIcon size={16} />
                {isSubmitting ? 'Uploading...' : 'Publish to Vault'}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}
