import { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar.jsx'
import {
  Plus,
  Search,
  Users,
  Clock,
  MapPin,
  FileText,
  Copy,
  Check,
  X,
  Megaphone,
  BookOpen,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'

const initialTaughtClasses = [
  {
    id: 1,
    code: 'PHYS 401',
    name: 'Advanced Thermodynamics',
    initial: 'A',
    schedule: 'Mon, Wed, Fri · 10:00 AM – 11:30 AM',
    location: 'Science Hall 302',
    studentsCount: 28,
    classCodeKey: 'PHYS401-FALL26',
    color: 'bg-vault-blue',
    roster: [
      { name: 'Liam Nakamura', email: 'liam.n@university.edu', id: 'S24-1029', submissions: 5 },
      { name: 'Elena Rostova', email: 'elena.r@university.edu', id: 'S24-1033', submissions: 4 },
      { name: 'Marcus Brody', email: 'marcus.b@university.edu', id: 'S24-1045', submissions: 4 },
      { name: 'Sofia Alvarez', email: 'sofia.a@university.edu', id: 'S24-1082', submissions: 5 },
      { name: 'Claire Dubois', email: 'claire.d@university.edu', id: 'S24-1104', submissions: 3 },
    ],
  },
  {
    id: 2,
    code: 'CS 302',
    name: 'Data Structures & Algorithms',
    initial: 'D',
    schedule: 'Tue, Thu · 2:00 PM – 3:45 PM',
    location: 'Alan Turing Building 104',
    studentsCount: 35,
    classCodeKey: 'CS302-FALL26',
    color: 'bg-indigo-500',
    roster: [
      { name: 'Elena Rostova', email: 'elena.r@university.edu', id: 'S24-1033', submissions: 4 },
      { name: 'Ananya Sharma', email: 'ananya.s@university.edu', id: 'S24-1150', submissions: 4 },
      { name: 'Lucas Scott', email: 'lucas.s@university.edu', id: 'S24-1188', submissions: 4 },
      { name: 'David Kim', email: 'david.k@university.edu', id: 'S24-1201', submissions: 4 },
    ],
  },
  {
    id: 3,
    code: 'MATH 201',
    name: 'Linear Algebra',
    initial: 'L',
    schedule: 'Mon, Wed · 11:30 AM – 1:00 PM',
    location: 'Euler Hall 204',
    studentsCount: 32,
    classCodeKey: 'MATH201-FALL26',
    color: 'bg-blue-600',
    roster: [
      { name: 'Devon Patel', email: 'devon.p@university.edu', id: 'S24-1310', submissions: 4 },
      { name: 'Sarah Lin', email: 'sarah.l@university.edu', id: 'S24-1322', submissions: 3 },
      { name: 'Michael Chang', email: 'michael.c@university.edu', id: 'S24-1355', submissions: 4 },
    ],
  },
]

export default function TeacherClasses() {
  const [classes, setClasses] = useState(initialTaughtClasses)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRosterClass, setSelectedRosterClass] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(null)
  const [announcementText, setAnnouncementText] = useState('')
  const [newCode, setNewCode] = useState('')
  const [newName, setNewName] = useState('')
  const [newSchedule, setNewSchedule] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  const showToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  const handleCopyCode = (codeKey) => {
    navigator.clipboard?.writeText(codeKey)
    showToast(`Class Code "${codeKey}" copied to clipboard!`)
  }

  const handleCreateSubmit = (e) => {
    e.preventDefault()
    if (!newName.trim()) return

    const newClass = {
      id: Date.now(),
      code: newCode.trim() || 'NEW 101',
      name: newName.trim(),
      initial: newName.trim().charAt(0).toUpperCase(),
      schedule: newSchedule.trim() || 'Mon, Wed · 10:00 AM',
      location: newLocation.trim() || 'Main Hall 101',
      studentsCount: 0,
      classCodeKey: `${newCode.trim().replace(/\s+/g, '')}-FALL26`,
      color: 'bg-vault-blue',
      roster: [],
    }

    setClasses([...classes, newClass])
    setNewCode('')
    setNewName('')
    setNewSchedule('')
    setNewLocation('')
    setShowCreateModal(false)
    showToast(`Class "${newClass.name}" created! Students can join using code: ${newClass.classCodeKey}`)
  }

  const handlePostAnnouncement = (e) => {
    e.preventDefault()
    showToast(`Announcement broadcasted to ${showAnnouncementModal.code} students!`)
    setShowAnnouncementModal(null)
    setAnnouncementText('')
  }

  const filtered = classes.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-vault-bg">
      <Sidebar />

      <main className="flex-1 px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-semibold text-vault-navy">Classes Taught</h1>
            <p className="text-sm text-gray-400">
              Manage your active teaching courses, syllabus materials, and enrolled student rosters
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-vault-blue text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-vault-blue-dark transition-colors shadow-sm"
          >
            <Plus size={16} /> Create New Class
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 max-w-lg">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your courses..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue shadow-sm"
          />
        </div>

        {/* Classes List */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((cls) => (
            <div
              key={cls.id}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl ${cls.color} text-white flex items-center justify-center font-bold text-lg shrink-0`}
                    >
                      {cls.initial}
                    </div>
                    <div>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-600">
                        {cls.code}
                      </span>
                      <h2 className="text-base font-semibold text-vault-navy mt-1">{cls.name}</h2>
                    </div>
                  </div>

                  {/* Student Code Badge */}
                  <button
                    onClick={() => handleCopyCode(cls.classCodeKey)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-600 hover:bg-vault-blue/10 hover:text-vault-blue hover:border-vault-blue/30 transition-colors"
                    title="Copy student join code"
                  >
                    <span>{cls.classCodeKey}</span>
                    <Copy size={12} />
                  </button>
                </div>

                <div className="space-y-2 text-xs text-gray-500 mb-6">
                  <p className="flex items-center gap-2">
                    <Clock size={14} className="text-vault-blue" />
                    <span>{cls.schedule}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={14} className="text-vault-blue" />
                    <span>{cls.location}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Users size={14} className="text-vault-blue" />
                    <span>{cls.studentsCount} Students Enrolled</span>
                  </p>
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2 flex-wrap text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedRosterClass(cls)}
                    className="px-3.5 py-1.5 rounded-xl bg-gray-100 text-vault-navy font-medium hover:bg-gray-200 transition-colors"
                  >
                    View Roster ({cls.roster.length})
                  </button>

                  <button
                    onClick={() => setShowAnnouncementModal(cls)}
                    className="px-3.5 py-1.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1"
                  >
                    <Megaphone size={12} /> Announcement
                  </button>
                </div>

                <Link
                  to={`/classes/${cls.code.replace(/\s+/g, '-')}`}
                  className="text-vault-blue font-semibold hover:underline flex items-center gap-1"
                >
                  Class Page <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Roster Drawer / Modal */}
        {selectedRosterClass && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] flex flex-col">
              <button
                onClick={() => setSelectedRosterClass(null)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={18} />
              </button>

              <div className="mb-4">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                  {selectedRosterClass.code}
                </span>
                <h2 className="text-lg font-semibold text-vault-navy mt-1">
                  Enrolled Class Roster
                </h2>
                <p className="text-xs text-gray-400">
                  {selectedRosterClass.name} · {selectedRosterClass.studentsCount} Active Students
                </p>
              </div>

              <div className="overflow-y-auto flex-1 divide-y divide-gray-100 pr-1">
                {selectedRosterClass.roster.length === 0 ? (
                  <p className="text-center text-sm text-gray-400 py-8">
                    No students currently enrolled. Share class code: <strong>{selectedRosterClass.classCodeKey}</strong>
                  </p>
                ) : (
                  selectedRosterClass.roster.map((st, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-vault-navy">{st.name}</p>
                        <p className="text-xs text-gray-400">{st.email} · ID: {st.id}</p>
                      </div>
                      <span className="text-xs bg-emerald-50 text-emerald-600 font-medium px-2.5 py-1 rounded-md">
                        {st.submissions} submissions
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                <span className="text-gray-400">Join code: {selectedRosterClass.classCodeKey}</span>
                <button
                  onClick={() => setSelectedRosterClass(null)}
                  className="px-4 py-2 bg-gray-100 text-vault-navy rounded-xl font-medium hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Post Announcement Modal */}
        {showAnnouncementModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => setShowAnnouncementModal(null)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={18} />
              </button>

              <h2 className="text-lg font-semibold text-vault-navy mb-1">
                Post Class Announcement
              </h2>
              <p className="text-xs text-gray-400 mb-4">
                Send a notification to all students enrolled in {showAnnouncementModal.code}.
              </p>

              <form onSubmit={handlePostAnnouncement} className="space-y-4">
                <textarea
                  rows={4}
                  required
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  placeholder="e.g. Please note: Tomorrow's lecture will begin 15 minutes later in Science Hall 302..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue resize-none"
                />

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAnnouncementModal(null)}
                    className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-vault-blue text-white rounded-xl text-sm font-medium hover:bg-vault-blue-dark transition-colors"
                  >
                    Broadcast to Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Create Class Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={18} />
              </button>

              <h2 className="text-lg font-semibold text-vault-navy mb-1">Create New Class</h2>
              <p className="text-xs text-gray-400 mb-4">
                Set course details and generate student enrollment codes.
              </p>

              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-vault-navy mb-1">
                    Course Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CS 405"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-vault-blue/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-vault-navy mb-1">
                    Course Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Artificial Intelligence & Heuristics"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-vault-blue/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-vault-navy mb-1">Schedule</label>
                    <input
                      type="text"
                      placeholder="e.g. Tue, Thu 2 PM"
                      value={newSchedule}
                      onChange={(e) => setNewSchedule(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-vault-blue/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-vault-navy mb-1">Room Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Turing Hall 201"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-vault-blue/30"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-vault-blue text-white rounded-xl text-sm font-medium hover:bg-vault-blue-dark transition-colors"
                  >
                    Create Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Toast */}
        {toastMsg && (
          <div className="fixed bottom-6 right-6 bg-vault-navy text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm z-50 animate-in slide-in-from-bottom duration-200">
            <Check size={16} className="text-emerald-400" />
            <span>{toastMsg}</span>
          </div>
        )}
      </main>
    </div>
  )
}
