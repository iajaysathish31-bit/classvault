import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import { useUser } from '../context/AuthContext.jsx'
import { useData } from '../context/DataContext.jsx'
import { Check, ShieldAlert, GraduationCap, Building2, Phone, Calendar, Hash } from 'lucide-react'

export default function Profile() {
  const [tab, setTab] = useState('overview')
  const { user, initials, updateUser } = useUser()
  const { classes } = useData()

  const isTeacher = user?.role === 'Teacher'

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    department: user?.department || '',
    year: user?.year || '',
    phone: user?.phone || '',
  })
  const [savedSuccess, setSavedSuccess] = useState(false)

  useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      department: user?.department || (isTeacher ? 'Physics & Applied Sciences' : 'Computer Science & Engineering'),
      year: user?.year || 'Year 3 (Junior)',
      phone: user?.phone || '+1 (555) 349-8821',
    })
  }, [user, isTeacher])

  const handleSave = (e) => {
    e.preventDefault()
    updateUser({
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
      department: formData.department,
      year: formData.year,
      phone: formData.phone,
    })
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  return (
    <div className="flex min-h-screen bg-vault-bg">
      <Sidebar />

      <main className="flex-1 px-8 py-6">
        <h1 className="text-xl font-semibold text-vault-navy mb-6">User Profile & Credentials</h1>

        {/* Profile Card Header */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6 shadow-sm">
          <div className={`h-28 bg-gradient-to-r ${isTeacher ? 'from-slate-900 via-slate-800 to-emerald-900' : 'from-indigo-600 to-violet-700'}`} />
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-8 mb-4">
              <div className={`w-16 h-16 rounded-2xl ${isTeacher ? 'bg-emerald-600' : 'bg-indigo-600'} text-white flex items-center justify-center text-xl font-semibold border-4 border-white shadow-md`}>
                {initials}
              </div>
              <button
                onClick={() => setTab(tab === 'settings' ? 'overview' : 'settings')}
                className="text-sm font-medium text-vault-navy border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                {tab === 'settings' ? 'View Overview' : 'Edit profile'}
              </button>
            </div>

            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-serif font-semibold text-vault-navy">{user.name}</h2>
                  <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {isTeacher ? user?.teacher_id || 'TCH-101' : user?.student_id || 'STU-8821'}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{user.email}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isTeacher ? 'bg-emerald-50 text-emerald-700' : 'bg-indigo-50 text-indigo-700'}`}>
                    {isTeacher ? '🏛️ Faculty / Teacher' : '🎓 Enrolled Student'}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {user?.department || 'University Academic Department'}
                  </span>
                </div>
              </div>

              {/* Stats badges */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-xl font-bold text-vault-navy">{classes.length}</p>
                  <p className="text-xs text-gray-400">{isTeacher ? 'Classes Taught' : 'Enrolled Classes'}</p>
                </div>
                {!isTeacher && (
                  <div className="text-center">
                    <p className="text-xl font-bold text-vault-navy">{user?.year || 'Year 3'}</p>
                    <p className="text-xs text-gray-400">Academic Year</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {tab === 'overview' ? (
          <div className="space-y-6">
            {/* Entity Attributes Grid */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs">
              <h3 className="font-semibold text-vault-navy text-sm mb-4">
                {isTeacher ? 'Faculty Academic Attributes (TEACHER Entity)' : 'Student Record Attributes (STUDENT Entity)'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                  <span className="text-gray-500 font-medium flex items-center gap-1.5">
                    <Hash size={14} className="text-gray-400" />
                    {isTeacher ? 'teacher_id (Primary Key)' : 'student_id (Primary Key)'}:
                  </span>
                  <span className="font-mono font-bold text-slate-800">
                    {isTeacher ? user?.teacher_id || 'TCH-101' : user?.student_id || 'STU-8821'}
                  </span>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                  <span className="text-gray-500 font-medium flex items-center gap-1.5">
                    <Building2 size={14} className="text-gray-400" />
                    department:
                  </span>
                  <span className="font-semibold text-slate-800">
                    {user?.department || (isTeacher ? 'Physics & Applied Sciences' : 'Computer Science & Engineering')}
                  </span>
                </div>

                {!isTeacher && (
                  <>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                      <span className="text-gray-500 font-medium flex items-center gap-1.5">
                        <Calendar size={14} className="text-gray-400" />
                        year:
                      </span>
                      <span className="font-semibold text-slate-800">{user?.year || 'Year 3 (Junior)'}</span>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                      <span className="text-gray-500 font-medium flex items-center gap-1.5">
                        <Phone size={14} className="text-gray-400" />
                        phone:
                      </span>
                      <span className="font-mono font-semibold text-slate-800">{user?.phone || '+1 (555) 349-8821'}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Bio Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs">
              <h3 className="font-semibold text-vault-navy text-sm mb-2">About & Academic Bio</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {user?.bio || 'Academic participant on ClassVault platform.'}
              </p>
            </div>
          </div>
        ) : (
          /* Edit Form */
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-semibold text-vault-navy mb-6">Update Profile Attributes</h3>

            <form onSubmit={handleSave} className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name (name)</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (email)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email id"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Academic Department (department)</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="e.g. Computer Science & Engineering"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                  required
                />
              </div>

              {!isTeacher && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Year of Study (year)</label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder="e.g. Year 3 (Junior)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (phone)</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +1 (555) 349-8821"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bio / Notes</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Academic interests and research focus..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="submit"
                  className="bg-vault-blue hover:bg-vault-blue-dark text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  Save Changes
                </button>
                {savedSuccess && (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                    <Check size={14} /> Profile updated successfully!
                  </span>
                )}
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
