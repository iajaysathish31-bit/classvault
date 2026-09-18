import { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import { Plus, Search, X, Check } from 'lucide-react'

const initialClasses = [
  {
    id: 1,
    initial: 'A',
    name: 'Advanced Thermodynamics',
    code: 'PHYS 401',
    prof: 'Chen Wei',
    due: '7d',
    urgent: true,
    done: 3,
    total: 5,
    color: 'bg-vault-blue',
  },
  {
    id: 2,
    initial: 'D',
    name: 'Data Structures & Algorithms',
    code: 'CS 302',
    prof: 'Sara Okafor',
    due: '11d',
    urgent: false,
    done: 4,
    total: 4,
    color: 'bg-vault-blue',
  },
  {
    id: 3,
    initial: 'L',
    name: 'Linear Algebra',
    code: 'MATH 201',
    prof: 'James Erikson',
    due: '14d',
    urgent: false,
    done: 4,
    total: 6,
    color: 'bg-vault-blue',
  },
  {
    id: 4,
    initial: 'M',
    name: 'Modern World History',
    code: 'HIST 210',
    prof: 'Anita Reyes',
    due: '26d',
    urgent: false,
    done: 2,
    total: 3,
    color: 'bg-vault-blue',
  },
]

export default function Classes() {
  const [classesList, setClassesList] = useState(initialClasses)
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [newCode, setNewCode] = useState('')
  const [newName, setNewName] = useState('')
  const [newProf, setNewProf] = useState('')
  const [joinedToast, setJoinedToast] = useState(false)

  const filteredClasses = classesList.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.prof.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleJoinClass = (e) => {
    e.preventDefault()
    if (!newName.trim()) return

    const newClassItem = {
      id: Date.now(),
      initial: newName.trim().charAt(0).toUpperCase(),
      name: newName.trim(),
      code: newCode.trim() || 'CLASS 101',
      prof: newProf.trim() || 'Instructor',
      due: '30d',
      urgent: false,
      done: 0,
      total: 4,
      color: 'bg-vault-blue',
    }

    setClassesList([newClassItem, ...classesList])
    setNewCode('')
    setNewName('')
    setNewProf('')
    setShowModal(false)
    setJoinedToast(true)
    setTimeout(() => setJoinedToast(false), 3000)
  }

  return (
    <div className="flex min-h-screen bg-vault-bg">
      <Sidebar />

      <main className="flex-1 px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-vault-navy">My Classes</h1>
            <p className="text-sm text-gray-400">{classesList.length} enrolled</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-vault-blue text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-vault-blue-dark transition-colors shadow-sm"
          >
            <Plus size={16} /> Join class
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search classes..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue shadow-sm"
          />
        </div>

        {/* Class Cards List */}
        <div className="space-y-4">
          {filteredClasses.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400">
              No classes found matching "{searchQuery}".
            </div>
          ) : (
            filteredClasses.map((c) => {
              const progressPct = Math.min(100, Math.round((c.done / c.total) * 100))
              return (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-gray-200 transition-colors shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-vault-blue text-white flex items-center justify-center font-semibold text-sm shrink-0">
                        {c.initial}
                      </div>
                      <div>
                        <h3 className="font-semibold text-vault-navy text-sm md:text-base leading-tight">
                          {c.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {c.code} · {c.prof}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                        c.urgent
                          ? 'bg-red-50 text-red-500'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {c.due}
                    </span>
                  </div>

                  {/* Progress bar and counter */}
                  <div className="flex items-center gap-4 pt-1">
                    <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-vault-blue h-full rounded-full transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap font-medium">
                      {c.done}/{c.total} done
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Join Class Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={18} />
              </button>

              <h2 className="text-lg font-semibold text-vault-navy mb-1">Join a Class</h2>
              <p className="text-xs text-gray-400 mb-5">
                Enter your course code and details provided by your instructor.
              </p>

              <form onSubmit={handleJoinClass} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-vault-navy mb-1">Course Code</label>
                  <input
                    type="text"
                    placeholder="e.g. CHEM 101"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-vault-navy mb-1">Course Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Organic Chemistry"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-vault-navy mb-1">Instructor</label>
                  <input
                    type="text"
                    placeholder="e.g. Prof. David Miller"
                    value={newProf}
                    onChange={(e) => setNewProf(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-vault-blue text-white rounded-xl text-sm font-medium hover:bg-vault-blue-dark transition-colors"
                  >
                    Enroll Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {joinedToast && (
          <div className="fixed bottom-6 right-6 bg-vault-navy text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm z-50 animate-in slide-in-from-bottom duration-200">
            <Check size={16} className="text-emerald-400" />
            <span>Class enrolled successfully!</span>
          </div>
        )}
      </main>
    </div>
  )
}
