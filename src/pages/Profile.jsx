import { useState, useEffect } from 'react'
import TeacherLayout from '../layouts/TeacherLayout.jsx'
import StudentLayout from '../layouts/StudentLayout.jsx'
import { useUser } from '../context/AuthContext.jsx'
import { useData } from '../context/DataContext.jsx'
import { Check, ShieldAlert, GraduationCap, Building2, Phone, Calendar, Hash } from 'lucide-react'

export default function Profile() {
  const [tab, setTab] = useState('overview')
  const { user, initials, updateUser } = useUser()
  const { classes } = useData()

  const isTeacher = user?.role === 'Teacher'
  const LayoutComponent = isTeacher ? TeacherLayout : StudentLayout

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
      year: user?.year || (isTeacher ? 'Faculty Member' : 'Year 1 (Freshman)'),
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
    <LayoutComponent>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                isTeacher ? 'text-emerald-800 bg-emerald-50 border-emerald-200' : 'text-indigo-700 bg-indigo-50 border-indigo-200'
              }`}>
                {isTeacher ? 'FACULTY PROFILE' : 'STUDENT PROFILE'}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {isTeacher ? user?.teacher_id || 'TCH-101' : user?.student_id || '24CPEB27'}
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              User Profile & Credentials
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isTeacher
                ? 'Manage your academic credentials, teaching affiliation, and contact details.'
                : 'Manage your student profile, academic affiliation, and contact details.'}
            </p>
          </div>
        </div>

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
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 flex items-center gap-1.5">
                    <Building2 size={13} className="text-slate-500" />
                    <span>{user?.department || 'University Academic Department'}</span>
                  </span>
                  {!isTeacher && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5">
                      <Calendar size={13} className="text-indigo-500" />
                      <span>{user?.year || 'Year 1 (Freshman)'}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Stats badges */}
              <div className="flex items-center gap-4">
                <div className="text-center px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-xl font-bold text-vault-navy">{classes.length}</p>
                  <p className="text-xs text-gray-400">{isTeacher ? 'Classes Taught' : 'Enrolled Classes'}</p>
                </div>
                {!isTeacher && (
                  <div className="text-center px-4 py-1.5 bg-indigo-50/80 rounded-xl border border-indigo-100">
                    <p className="text-base sm:text-lg font-black text-indigo-700">{user?.year || 'Year 1 (Freshman)'}</p>
                    <p className="text-[11px] font-semibold text-indigo-500">Academic Year</p>
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
                  <span className="font-bold text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-right">
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
                      <span className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                        {user?.year || 'Year 1 (Freshman)'}
                      </span>
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
                  list="profile-dept-suggestions"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="e.g. Computer Science & Engineering"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                  required
                />
                <datalist id="profile-dept-suggestions">
                  <option value="Computer Science & Engineering" />
                  <option value="Computer Applications (MCA/BCA)" />
                  <option value="Data Science & Artificial Intelligence" />
                  <option value="Physics & Applied Sciences" />
                  <option value="Electronics & Communication" />
                  <option value="Mechanical & Mechatronics Engineering" />
                  <option value="Mathematics & Statistics" />
                  <option value="Management Studies (MBA/BBA)" />
                  <option value="Commerce & Accounting" />
                  <option value="Psychology & Humanities" />
                  <option value="Biotechnology & Life Sciences" />
                  <option value="Media Studies & Journalism" />
                </datalist>
              </div>

              {!isTeacher && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Year of Study (year)</label>
                    <input
                      type="text"
                      list="profile-year-suggestions"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder="e.g. Year 1 (Freshman)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                    />
                    <datalist id="profile-year-suggestions">
                      <option value="Year 1 (Freshman)" />
                      <option value="Year 2 (Sophomore)" />
                      <option value="Year 3 (Junior)" />
                      <option value="Year 4 (Senior)" />
                      <option value="Postgraduate Year 1" />
                      <option value="Postgraduate Year 2" />
                    </datalist>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {['Year 1', 'Year 2', 'Year 3', 'Year 4'].map((yr) => {
                        const fullYr =
                          yr === 'Year 1'
                            ? 'Year 1 (Freshman)'
                            : yr === 'Year 2'
                            ? 'Year 2 (Sophomore)'
                            : yr === 'Year 3'
                            ? 'Year 3 (Junior)'
                            : 'Year 4 (Senior)'
                        return (
                          <button
                            key={yr}
                            type="button"
                            onClick={() => setFormData({ ...formData, year: fullYr })}
                            className={`text-[10px] px-2 py-0.5 rounded border font-medium ${
                              formData.year === fullYr
                                ? 'bg-indigo-600 border-indigo-600 text-white font-bold'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {yr}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (phone)</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +1 (555) 349-8821"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
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
      </div>
    </LayoutComponent>
  )
}
