import { useState } from 'react'
import TeacherLayout from '../../layouts/TeacherLayout.jsx'
import { useData } from '../../context/DataContext.jsx'
import { useUser } from '../../context/AuthContext.jsx'
import {
  Users,
  Plus,
  Check,
  Calendar,
  X,
  Trash2,
  ListOrdered,
  CheckCircle2,
} from 'lucide-react'

export default function FacultyClasses() {
  const { classes, createClass, topics, addTopic, deleteTopic, topicProgress } = useData()
  const { user } = useUser()

  const [selectedClassForTopics, setSelectedClassForTopics] = useState(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Create Class Form
  const [newSubject, setNewSubject] = useState('')
  const [newClassDate, setNewClassDate] = useState('')
  const [newDescription, setNewDescription] = useState('')

  // Add Topic Form
  const [newTopicName, setNewTopicName] = useState('')
  const [newTopicContent, setNewTopicContent] = useState('')

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  const handleCreateClass = (e) => {
    e.preventDefault()
    if (!newSubject.trim()) return

    const created = createClass({
      subject: newSubject,
      class_date: newClassDate || 'Mon, Wed · 10:00 AM – 11:30 AM',
      description: newDescription || 'Standard academic curriculum and coursework.',
    })

    setCreateModalOpen(false)
    setNewSubject('')
    setNewClassDate('')
    setNewDescription('')
    showToast(`Created class "${created.subject}" (${created.class_id})!`)
  }

  const handleAddTopic = (e) => {
    e.preventDefault()
    if (!newTopicName.trim() || !selectedClassForTopics) return

    const created = addTopic({
      topic_name: newTopicName,
      content: newTopicContent,
      class_id: selectedClassForTopics.class_id,
    })

    setNewTopicName('')
    setNewTopicContent('')
    showToast(`Added topic "${created.topic_name}" to ${selectedClassForTopics.subject}!`)
  }

  const handleDeleteTopic = (topicId, topicName) => {
    deleteTopic(topicId)
    showToast(`Removed topic "${topicName}".`)
  }

  // Helper to count student reviews for a topic
  const getTopicReviewCount = (topicId) => {
    return topicProgress.filter((p) => p.topic_id === topicId && p.status === 'Reviewed').length
  }

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-rose-600 text-white px-4 py-3 rounded-2xl shadow-xl border border-rose-500 text-sm font-medium animate-bounce">
            <Check size={18} />
            {toastMessage}
          </div>
        )}

        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950 p-6 md:p-8 rounded-3xl border border-rose-950/60 shadow-md">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-950 px-2.5 py-1 rounded-md border border-rose-800/60">
                CLASS & TOPIC ARCHITECTURE
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Teacher: {user?.teacher_id || 'TCH-101'}
              </span>
            </div>
            <h1 className="text-2xl font-black text-white mt-2 tracking-tight">
              Class & Topic Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Create university classes and author sequential syllabus topics that students review and track.
            </p>
          </div>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold shadow-lg shadow-rose-950 transition-all self-start md:self-auto"
          >
            <Plus size={16} /> + Create New Class
          </button>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {classes.map((cls) => {
            const classTopics = topics.filter((t) => t.class_id === cls.class_id)
            const totalReviews = classTopics.reduce(
              (acc, t) => acc + getTopicReviewCount(t.topic_id),
              0
            )

            return (
              <div
                key={cls.class_id}
                className="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-md hover:border-rose-800/60 transition-all flex flex-col justify-between border-t-4 border-t-rose-600"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/50">
                      {cls.class_id}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar size={13} className="text-slate-500" /> {cls.class_date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">
                    {cls.subject}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {cls.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-900 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-850">
                      <span className="text-[10px] text-slate-500 block font-bold uppercase">
                        Topics Defined
                      </span>
                      <span className="text-base font-black text-white">
                        {classTopics.length}
                      </span>
                    </div>
                    <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-850">
                      <span className="text-[10px] text-slate-500 block font-bold uppercase">
                        Student Reviews
                      </span>
                      <span className="text-base font-black text-rose-400">
                        {totalReviews}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-850 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Instructor: {cls.teacher_id}
                  </span>
                  <button
                    onClick={() => setSelectedClassForTopics(cls)}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-400 text-xs font-bold border border-slate-750 transition-all flex items-center gap-1.5"
                  >
                    <ListOrdered size={14} />
                    Manage Topics ({classTopics.length})
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Manage Topics Modal */}
        {selectedClassForTopics && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-rose-950/80 animate-in fade-in zoom-in-95 duration-200 text-slate-100 max-h-[90vh] flex flex-col justify-between">
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-950 text-rose-400 border border-rose-800/60 flex items-center justify-center">
                    <ListOrdered size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {selectedClassForTopics.subject} — Syllabus Topics
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Class ID: {selectedClassForTopics.class_id}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedClassForTopics(null)}
                  className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Topics List */}
              <div className="my-5 overflow-y-auto max-h-72 space-y-3 pr-1">
                {topics.filter((t) => t.class_id === selectedClassForTopics.class_id).length === 0 ? (
                  <div className="text-center py-8 text-slate-500 text-xs">
                    No topics added to this class yet. Use the form below to author the first topic.
                  </div>
                ) : (
                  topics
                    .filter((t) => t.class_id === selectedClassForTopics.class_id)
                    .map((t, idx) => {
                      const reviewCount = getTopicReviewCount(t.topic_id)
                      return (
                        <div
                          key={t.topic_id}
                          className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-start justify-between gap-3"
                        >
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 text-rose-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-white">{t.topic_name}</h4>
                                <span className="text-[10px] font-mono text-slate-500">
                                  {t.topic_id}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                {t.content}
                              </p>
                              <span className="inline-flex items-center gap-1 text-[11px] text-rose-400 font-medium mt-2">
                                <CheckCircle2 size={12} /> {reviewCount} student review{reviewCount !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteTopic(t.topic_id, t.topic_name)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                            title="Delete topic"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )
                    })
                )}
              </div>

              {/* Author New Topic Sub-Form */}
              <form
                onSubmit={handleAddTopic}
                className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3"
              >
                <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block">
                  + Add Next Syllabus Topic
                </span>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Topic Name (e.g. Isentropic Flow in Nozzles)"
                    value={newTopicName}
                    onChange={(e) => setNewTopicName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-750 text-white focus:outline-none focus:border-rose-500"
                    required
                  />
                  <textarea
                    rows={2}
                    placeholder="Topic Learning Content / Notes / Equations..."
                    value={newTopicContent}
                    onChange={(e) => setNewTopicContent(e.target.value)}
                    className="w-full text-xs px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-750 text-slate-200 focus:outline-none focus:border-rose-500 resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setSelectedClassForTopics(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800"
                  >
                    Done
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-700 hover:bg-rose-600 text-white shadow-md shadow-rose-950 flex items-center gap-1"
                  >
                    <Plus size={14} /> Save Topic
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Create Class Modal */}
        {createModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-rose-950/80 animate-in fade-in zoom-in-95 duration-200 text-slate-100">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-950 text-rose-400 border border-rose-800/60 flex items-center justify-center">
                    <Plus size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Create University Class</h3>
                    <p className="text-xs text-slate-400">ER Entity: CLASS</p>
                  </div>
                </div>
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateClass} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Subject Name (subject)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Quantum Computing & Quantum Information"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-rose-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Meeting Schedule / Date (class_date)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tue, Thu · 10:00 AM – 11:30 AM"
                    value={newClassDate}
                    onChange={(e) => setNewClassDate(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-rose-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Class Description (description)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Overview of syllabus, prerequisites, and learning outcomes..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-rose-500 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-700 hover:bg-rose-600 text-white shadow-lg shadow-rose-950"
                  >
                    Create Class
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
