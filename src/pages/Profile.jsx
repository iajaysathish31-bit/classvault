import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import { useUser } from '../context/AuthContext.jsx'
import { Check } from 'lucide-react'

const joinedClasses = [
  { code: 'PHYS 401', name: 'Advanced Thermodynamics', initial: 'A', color: 'bg-vault-blue' },
  { code: 'CS 302', name: 'Data Structures & Algorithms', initial: 'D', color: 'bg-indigo-500' },
  { code: 'MATH 201', name: 'Linear Algebra', initial: 'L', color: 'bg-blue-600' },
  { code: 'HIST 210', name: 'Modern World History', initial: 'M', color: 'bg-purple-500' },
]

export default function Profile() {
  const [tab, setTab] = useState('overview')
  const { user, initials, updateUser } = useUser()
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
  })
  const [savedSuccess, setSavedSuccess] = useState(false)

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      bio: user.bio,
    })
  }, [user])

  const handleSave = (e) => {
    e.preventDefault()
    updateUser({
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
    })
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  return (
    <div className="flex min-h-screen bg-vault-bg">
      <Sidebar />

      <main className="flex-1 px-8 py-6">
        <h1 className="text-xl font-semibold text-vault-navy mb-6">Profile</h1>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
          <div className="h-28 bg-gradient-to-r from-vault-blue to-vault-blue-dark" />
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-8 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-vault-blue text-white flex items-center justify-center text-xl font-semibold border-4 border-white">
                {initials}
              </div>
              <button
                onClick={() => setTab('settings')}
                className="text-sm font-medium text-vault-navy border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50"
              >
                Edit profile
              </button>
            </div>

            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-lg font-serif font-semibold text-vault-navy">{user.name}</h2>
                <p className="text-sm text-gray-400">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-medium bg-vault-blue/10 text-vault-blue px-2.5 py-1 rounded-full capitalize">
                    🎓 {user.role}
                  </span>
                  <span className="text-xs text-gray-400">Joined {user.joinedDate || 'September 2024'}</span>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-xl font-semibold text-vault-navy">4</p>
                  <p className="text-xs text-gray-400">Classes</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold text-vault-navy">12</p>
                  <p className="text-xs text-gray-400">Uploads</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-6 border-t border-gray-100 pt-4">
              <button
                onClick={() => setTab('overview')}
                className={`text-sm font-medium pb-1 border-b-2 ${
                  tab === 'overview' ? 'text-vault-blue border-vault-blue' : 'text-gray-400 border-transparent'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setTab('settings')}
                className={`text-sm font-medium pb-1 border-b-2 ${
                  tab === 'settings' ? 'text-vault-blue border-vault-blue' : 'text-gray-400 border-transparent'
                }`}
              >
                Settings
              </button>
            </div>
          </div>
        </div>

        {tab === 'overview' ? (
          <>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-vault-navy">Bio</h3>
                <button
                  onClick={() => setTab('settings')}
                  className="text-sm text-vault-blue font-medium hover:underline"
                >
                  Edit
                </button>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                {user.bio}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-medium text-vault-navy mb-4">Joined Classes</h3>
              <div className="divide-y divide-gray-100">
                {joinedClasses.map((c) => (
                  <div key={c.code} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg ${c.color} text-white flex items-center justify-center text-sm font-semibold`}>
                        {c.initial}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-vault-navy">{c.name}</p>
                        <p className="text-xs text-gray-400">{c.code}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-vault-blue bg-vault-blue/10 px-2.5 py-1 rounded-full capitalize">
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-medium text-vault-navy mb-6">Account settings</h3>

            <form onSubmit={handleSave} className="space-y-5 max-w-lg">
              <div>
                <label className="block text-sm font-medium text-vault-navy mb-1.5">Full name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-vault-navy mb-1.5">Email address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email id"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-vault-navy mb-1.5">Bio</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-vault-navy mb-1.5">Change password</label>
                <input
                  type="password"
                  placeholder="New password"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-vault-navy mb-2">Notification preferences</p>
                <label className="flex items-center gap-2 text-sm text-gray-500 mb-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-vault-blue rounded" />
                  Email me about new assignments
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-vault-blue rounded" />
                  Remind me before deadlines
                </label>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-vault-blue text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-vault-blue-dark transition-colors"
                >
                  Save changes
                </button>
                {savedSuccess && (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
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
