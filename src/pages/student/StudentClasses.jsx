import { useState } from 'react'
import StudentLayout from '../../layouts/StudentLayout.jsx'
import { useData } from '../../context/DataContext.jsx'
import { useUser } from '../../context/AuthContext.jsx'
import {
  Search,
  Plus,
  Clock,
  MapPin,
  ChevronRight,
  BookOpen,
  X,
  Check,
  CheckCircle2,
  Calendar,
  ListOrdered,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react'

export default function StudentClasses() {
  const { classes, topics, getTopicsForClass, getProgressForTopic, getClassProgress, updateTopicProgress, getTeacherForClass } = useData()
  const { user } = useUser()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClassForTopics, setSelectedClassForTopics] = useState(null)
  const [toastMessage, setToastMessage] = useState('')

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  const handleStatusChange = (topicId, topicName, currentStatus) => {
    const nextStatus = currentStatus === 'Reviewed' ? 'Pending' : 'Reviewed'
    updateTopicProgress({ topic_id: topicId, status: nextStatus })
    showToast(
      nextStatus === 'Reviewed'
        ? `Marked "${topicName}" as Reviewed!`
        : `Marked "${topicName}" as Pending.`
    )
  }

  const filteredClasses = classes.filter((cls) => {
    return (
      cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.class_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

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
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                CLASS & TOPIC PROGRESSION
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Student ID: {user?.student_id || 'STU-8821'}
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
              My Classes & Topic Reviews
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Review syllabus topics, record completion dates, and track your topic understanding per class.
            </p>
          </div>

          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search enrolled subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-700 bg-slate-50/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-64"
            />
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredClasses.map((cls) => {
            const classTopics = getTopicsForClass(cls.class_id)
            const progress = getClassProgress(cls.class_id, user?.student_id)
            const teacher = getTeacherForClass(cls.teacher_id)

            return (
              <div
                key={cls.class_id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {cls.class_id}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                      <Calendar size={13} className="text-indigo-400" /> {cls.class_date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {cls.subject}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    Instructor: <strong className="text-slate-700">{teacher.name}</strong>
                  </p>

                  <p className="text-xs text-slate-500 mt-3 line-clamp-3 leading-relaxed">
                    {cls.description}
                  </p>

                  {/* Topic Progress Bar */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-500 font-medium">Topics Reviewed</span>
                      <span className="text-indigo-600 font-bold">
                        {progress.reviewed} of {progress.total} ({progress.percent}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                        style={{ width: `${progress.percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {classTopics.length} Syllabus Topics
                  </span>

                  <button
                    onClick={() => setSelectedClassForTopics(cls)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 transition-all hover:scale-105 active:scale-95"
                  >
                    <ListOrdered size={14} /> Review Topics
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Topic Progression Drawer / Modal */}
        {selectedClassForTopics && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-indigo-100 animate-in fade-in zoom-in-95 duration-200 text-slate-900 max-h-[90vh] flex flex-col justify-between">
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <ListOrdered size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {selectedClassForTopics.subject}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      Class ID: {selectedClassForTopics.class_id} · Topic Reviews
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedClassForTopics(null)}
                  className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Topics List with TOPIC_PROGRESS Tracker */}
              <div className="my-5 overflow-y-auto max-h-96 space-y-3 pr-1">
                {getTopicsForClass(selectedClassForTopics.class_id).length === 0 ? (
                  <p className="text-center py-8 text-xs text-slate-400">
                    No topics have been uploaded by the instructor for this class yet.
                  </p>
                ) : (
                  getTopicsForClass(selectedClassForTopics.class_id).map((topic, idx) => {
                    const progress = getProgressForTopic(topic.topic_id, user?.student_id)
                    const isReviewed = progress?.status === 'Reviewed'

                    return (
                      <div
                        key={topic.topic_id}
                        className={`p-4 rounded-2xl border transition-all ${
                          isReviewed
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : 'bg-white border-slate-200 hover:border-indigo-200'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <span
                              className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                                isReviewed
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                              }`}
                            >
                              {idx + 1}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-slate-900">
                                  {topic.topic_name}
                                </h4>
                                <span className="text-[10px] font-mono text-slate-400">
                                  {topic.topic_id}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                {topic.content}
                              </p>
                              {isReviewed && progress?.reviewed_date && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold mt-1.5">
                                  <Check size={11} /> Reviewed on {progress.reviewed_date}
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              handleStatusChange(
                                topic.topic_id,
                                topic.topic_name,
                                progress?.status || 'Pending'
                              )
                            }
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 self-end sm:self-center ${
                              isReviewed
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200'
                            }`}
                          >
                            <CheckCircle2 size={13} />
                            {isReviewed ? 'Reviewed' : 'Mark as Reviewed'}
                          </button>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Topic review progress syncs automatically with faculty gradebook.
                </span>
                <button
                  onClick={() => setSelectedClassForTopics(null)}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  )
}
