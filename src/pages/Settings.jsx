import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import { useUser } from '../context/AuthContext.jsx'
import {
  User,
  Bell,
  Palette,
  Shield,
  Code,
  Check,
  ChevronDown,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react'

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? 'bg-vault-blue' : 'bg-gray-200'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        } mt-0.5`}
      />
    </button>
  )
}

export default function Settings() {
  const { user, updateUser } = useUser()
  const [activeTab, setActiveTab] = useState('account')

  // Personal Info Form State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    language: 'English (US)',
    timezone: 'UTC-5 Eastern Time',
  })
  const [toastMsg, setToastMsg] = useState('')

  // Password update toggle
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordFields, setPasswordFields] = useState({
    current: '',
    newPass: '',
    confirm: '',
  })

  // Connected accounts
  const [connectedGoogle, setConnectedGoogle] = useState(true)
  const [connectedMicrosoft, setConnectedMicrosoft] = useState(false)

  // Notification Toggles State
  const [notifications, setNotifications] = useState({
    upcomingDeadlines: true,
    newResource: true,
    classMessages: false,
    gradePosted: true,
    classAnnouncements: true,
    emailDigest: false,
    pushNotifications: true,
    smsAlerts: false,
  })

  // Appearance & Privacy State
  const [appearance, setAppearance] = useState({
    theme: 'light',
    compactMode: false,
  })
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showOnlineStatus: true,
  })

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
      }))
    }
  }, [user])

  const showSuccessToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  const handlePersonalSave = (e) => {
    e.preventDefault()
    updateUser({
      name: formData.name.trim() || 'Student',
      email: formData.email.trim() || 'student@university.edu',
    })
    showSuccessToast('Personal information updated successfully!')
  }

  const handlePasswordSave = (e) => {
    e.preventDefault()
    setPasswordFields({ current: '', newPass: '', confirm: '' })
    setShowPasswordForm(false)
    showSuccessToast('Password updated successfully!')
  }

  const navTabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Code },
  ]

  return (
    <div className="flex min-h-screen bg-vault-bg">
      <Sidebar />

      <main className="flex-1 px-8 py-6">
        <h1 className="text-xl font-semibold text-vault-navy mb-6">Settings</h1>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sub-navigation Menu */}
          <aside className="w-full lg:w-56 shrink-0">
            <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase px-3 mb-2">
              SETTINGS
            </p>
            <nav className="flex flex-col gap-1">
              {navTabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors w-full text-left ${
                      isActive
                        ? 'bg-vault-blue/10 text-vault-blue'
                        : 'text-gray-600 hover:bg-white hover:text-vault-navy'
                    }`}
                  >
                    <Icon size={17} />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Right Main Content Area */}
          <div className="flex-1 w-full space-y-6 max-w-3xl">
            {/* TAB 1: ACCOUNT */}
            {activeTab === 'account' && (
              <>
                {/* Personal Information */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h2 className="text-base font-semibold text-vault-navy">Personal Information</h2>
                  <p className="text-xs text-gray-400 mt-0.5 mb-6">Your name and contact details.</p>

                  <form onSubmit={handlePersonalSave} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-vault-navy mb-1.5">
                        Full name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-vault-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-vault-navy mb-1.5">
                        Email address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email id"
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-vault-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-vault-blue/30 focus:border-vault-blue"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-vault-navy mb-1.5">
                          Language
                        </label>
                        <div className="relative">
                          <select
                            value={formData.language}
                            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                            className="w-full appearance-none px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-vault-navy focus:outline-none focus:ring-2 focus:ring-vault-blue/30 cursor-pointer"
                          >
                            <option value="English (US)">English (US)</option>
                            <option value="English (UK)">English (UK)</option>
                            <option value="Español">Español</option>
                            <option value="Français">Français</option>
                          </select>
                          <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-vault-navy mb-1.5">
                          Timezone
                        </label>
                        <div className="relative">
                          <select
                            value={formData.timezone}
                            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                            className="w-full appearance-none px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-vault-navy focus:outline-none focus:ring-2 focus:ring-vault-blue/30 cursor-pointer"
                          >
                            <option value="UTC-5 Eastern Time">UTC-5 Eastern Time</option>
                            <option value="UTC-8 Pacific Time">UTC-8 Pacific Time</option>
                            <option value="UTC+0 UTC">UTC+0 UTC</option>
                            <option value="UTC+5:30 IST">UTC+5:30 Indian Standard Time</option>
                          </select>
                          <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="bg-vault-blue text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-vault-blue-dark transition-colors shadow-sm"
                      >
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>

                {/* Change Password */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-semibold text-vault-navy">Change Password</h2>
                      <p className="text-xs text-gray-400 mt-0.5">Last changed 3 months ago</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPasswordForm(!showPasswordForm)}
                      className="text-sm font-medium text-vault-blue hover:underline"
                    >
                      {showPasswordForm ? 'Cancel' : 'Update'}
                    </button>
                  </div>

                  {showPasswordForm && (
                    <form onSubmit={handlePasswordSave} className="space-y-4 mt-5 pt-4 border-t border-gray-100">
                      <div>
                        <label className="block text-xs font-medium text-vault-navy mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          required
                          value={passwordFields.current}
                          onChange={(e) => setPasswordFields({ ...passwordFields, current: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-vault-blue/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-vault-navy mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          required
                          minLength={8}
                          value={passwordFields.newPass}
                          onChange={(e) => setPasswordFields({ ...passwordFields, newPass: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-vault-blue/30"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-vault-blue text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-vault-blue-dark transition-colors"
                      >
                        Save password
                      </button>
                    </form>
                  )}
                </div>

                {/* Connected Accounts */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h2 className="text-base font-semibold text-vault-navy mb-4">Connected Accounts</h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700 text-sm">
                          G
                        </div>
                        <div>
                          <p className="text-sm font-medium text-vault-navy">Google</p>
                          <p className="text-xs text-gray-400">
                            {connectedGoogle ? (user?.email || 'user@gmail.com') : 'Not connected'}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setConnectedGoogle(!connectedGoogle)}
                        className={`text-sm font-medium px-4 py-1.5 rounded-xl border transition-colors ${
                          connectedGoogle
                            ? 'border-gray-200 text-gray-600 hover:bg-gray-50'
                            : 'border-vault-blue text-vault-blue hover:bg-vault-blue/10'
                        }`}
                      >
                        {connectedGoogle ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700 text-sm">
                          M
                        </div>
                        <div>
                          <p className="text-sm font-medium text-vault-navy">Microsoft</p>
                          <p className="text-xs text-gray-400">
                            {connectedMicrosoft ? 'Connected' : 'Not connected'}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setConnectedMicrosoft(!connectedMicrosoft)}
                        className={`text-sm font-medium px-4 py-1.5 rounded-xl border transition-colors ${
                          connectedMicrosoft
                            ? 'border-gray-200 text-gray-600 hover:bg-gray-50'
                            : 'border-vault-blue text-vault-blue hover:bg-vault-blue/10'
                        }`}
                      >
                        {connectedMicrosoft ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h2 className="text-base font-semibold text-vault-navy mb-4">Danger Zone</h2>

                  <div className="space-y-4 divide-y divide-gray-100">
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <p className="text-sm font-medium text-vault-navy">Export my data</p>
                        <p className="text-xs text-gray-400">
                          Download a ZIP of all your notes, uploads, and activity.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => showSuccessToast('Data archive initiated. Check your downloads shortly.')}
                        className="text-sm font-medium text-gray-600 border border-gray-200 rounded-xl px-4 py-1.5 hover:bg-gray-50 transition-colors"
                      >
                        Export
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <p className="text-sm font-medium text-red-600">Delete account</p>
                        <p className="text-xs text-gray-400">
                          Permanently removes your account. This cannot be undone.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert('Account deletion requires secondary confirmation.')}
                        className="text-sm font-medium text-red-600 border border-red-200 rounded-xl px-4 py-1.5 hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* TAB 2: NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <>
                {/* Activity Card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h2 className="text-base font-semibold text-vault-navy">Activity</h2>
                  <p className="text-xs text-gray-400 mt-0.5 mb-6">
                    What in-app events send you a notification.
                  </p>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-vault-navy">Upcoming deadlines</p>
                        <p className="text-xs text-gray-400">3-day reminder before any due date</p>
                      </div>
                      <ToggleSwitch
                        checked={notifications.upcomingDeadlines}
                        onChange={(val) =>
                          setNotifications({ ...notifications, upcomingDeadlines: val })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-vault-navy">New resource uploaded</p>
                        <p className="text-xs text-gray-400">Teacher uploads a file to your class</p>
                      </div>
                      <ToggleSwitch
                        checked={notifications.newResource}
                        onChange={(val) =>
                          setNotifications({ ...notifications, newResource: val })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-vault-navy">Class messages</p>
                        <p className="text-xs text-gray-400">New posts in your class discussion</p>
                      </div>
                      <ToggleSwitch
                        checked={notifications.classMessages}
                        onChange={(val) =>
                          setNotifications({ ...notifications, classMessages: val })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-vault-navy">Grade posted</p>
                        <p className="text-xs text-gray-400">
                          When feedback or a grade is added to your work
                        </p>
                      </div>
                      <ToggleSwitch
                        checked={notifications.gradePosted}
                        onChange={(val) =>
                          setNotifications({ ...notifications, gradePosted: val })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-vault-navy">Class announcements</p>
                        <p className="text-xs text-gray-400">
                          Important announcements from your teacher
                        </p>
                      </div>
                      <ToggleSwitch
                        checked={notifications.classAnnouncements}
                        onChange={(val) =>
                          setNotifications({ ...notifications, classAnnouncements: val })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h2 className="text-base font-semibold text-vault-navy">Delivery</h2>
                  <p className="text-xs text-gray-400 mt-0.5 mb-6">How notifications reach you.</p>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-vault-navy">Email digest</p>
                        <p className="text-xs text-gray-400">Summary email once per day</p>
                      </div>
                      <ToggleSwitch
                        checked={notifications.emailDigest}
                        onChange={(val) =>
                          setNotifications({ ...notifications, emailDigest: val })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-vault-navy">
                          Browser push notifications
                        </p>
                        <p className="text-xs text-gray-400">
                          Instant notifications on your desktop
                        </p>
                      </div>
                      <ToggleSwitch
                        checked={notifications.pushNotifications}
                        onChange={(val) =>
                          setNotifications({ ...notifications, pushNotifications: val })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-vault-navy">SMS alerts</p>
                        <p className="text-xs text-gray-400">
                          Urgent deadline reminders to your phone
                        </p>
                      </div>
                      <ToggleSwitch
                        checked={notifications.smsAlerts}
                        onChange={(val) => setNotifications({ ...notifications, smsAlerts: val })}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* TAB 3: APPEARANCE */}
            {activeTab === 'appearance' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-vault-navy">Appearance</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Customize your interface theme and density.</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-vault-navy mb-3">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['light', 'dark', 'system'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setAppearance({ ...appearance, theme: t })
                          showSuccessToast(`Theme set to ${t}`)
                        }}
                        className={`p-4 rounded-xl border text-center capitalize text-sm font-medium transition-colors ${
                          appearance.theme === t
                            ? 'border-vault-blue bg-vault-blue/5 text-vault-blue font-semibold'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-vault-navy">Compact mode</p>
                    <p className="text-xs text-gray-400">Reduce padding and font sizes across lists</p>
                  </div>
                  <ToggleSwitch
                    checked={appearance.compactMode}
                    onChange={(val) => setAppearance({ ...appearance, compactMode: val })}
                  />
                </div>
              </div>
            )}

            {/* TAB 4: PRIVACY */}
            {activeTab === 'privacy' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-vault-navy">Privacy & Security</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Control what other classmates can see.</p>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-vault-navy">Classmate profile visibility</p>
                      <p className="text-xs text-gray-400">Allow enrolled classmates to view your profile and enrolled courses</p>
                    </div>
                    <ToggleSwitch
                      checked={privacy.profileVisible}
                      onChange={(val) => setPrivacy({ ...privacy, profileVisible: val })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-vault-navy">Show online status</p>
                      <p className="text-xs text-gray-400">Display when you are actively studying or in class</p>
                    </div>
                    <ToggleSwitch
                      checked={privacy.showOnlineStatus}
                      onChange={(val) => setPrivacy({ ...privacy, showOnlineStatus: val })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: INTEGRATIONS */}
            {activeTab === 'integrations' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-vault-navy">Integrations</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Connect with your school's Learning Management Systems.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'Canvas LMS', desc: 'Sync assignments and grades directly', connected: true },
                    { name: 'Google Classroom', desc: 'Import class rosters and announcements', connected: false },
                    { name: 'Slack', desc: 'Receive real-time class notifications in channels', connected: false },
                  ].map((integ) => (
                    <div key={integ.name} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                      <div>
                        <p className="text-sm font-medium text-vault-navy">{integ.name}</p>
                        <p className="text-xs text-gray-400">{integ.desc}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => showSuccessToast(`${integ.name} status updated`)}
                        className={`text-xs font-medium px-3.5 py-1.5 rounded-xl border transition-colors ${
                          integ.connected
                            ? 'border-gray-200 text-gray-600 bg-white'
                            : 'border-vault-blue text-vault-blue bg-white hover:bg-vault-blue/10'
                        }`}
                      >
                        {integ.connected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Toast Notification */}
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
