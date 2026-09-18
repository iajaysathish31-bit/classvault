import { Link } from 'react-router-dom'
import { Library, NotebookPen, Share2, Users, CalendarClock, Paperclip } from 'lucide-react'

const features = [
  {
    icon: NotebookPen,
    title: 'Organize notes',
    desc: 'Keep every lecture, summary, and worksheet in one clean, searchable space.',
  },
  {
    icon: Share2,
    title: 'Share resources',
    desc: 'Upload once and everyone in class gets it instantly, no more group-chat file hunts.',
  },
  {
    icon: Users,
    title: 'Class groups',
    desc: 'Organize by course so classmates can collaborate without the noise.',
  },
  {
    icon: CalendarClock,
    title: 'Track deadlines',
    desc: 'Never miss an assignment with a shared view of what is due and when.',
  },
]

const steps = [
  { title: 'Create your account', desc: 'Sign up as a student or teacher in less than a minute.' },
  { title: 'Join or create a class', desc: 'Find your class by code or set one up for your students.' },
  { title: 'Share and stay organized', desc: 'Upload notes and assignments, keep every class in sync.' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-vault-navy">
      {/* Nav */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-vault-blue flex items-center justify-center">
            <Library size={18} className="text-white" />
          </div>
          <span className="font-semibold text-lg">ClassVault</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
          <a href="#features" className="hover:text-vault-navy">Features</a>
          <a href="#how-it-works" className="hover:text-vault-navy">How it works</a>
        </nav>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/login" className="text-gray-600 hover:text-vault-navy">Log in</Link>
          <Link
            to="/signup"
            className="bg-vault-blue text-white px-4 py-2 rounded-full font-medium hover:bg-vault-blue-dark transition-colors"
          >
            Sign up free
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center px-6 pt-20 pb-16 bg-gradient-to-b from-vault-bg to-white">
        <span className="inline-block text-xs font-medium text-vault-blue bg-vault-blue/10 px-3 py-1 rounded-full mb-6">
          Now in open beta for classrooms everywhere
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-semibold leading-tight max-w-2xl mx-auto">
          Every class resource,<br />
          <span className="text-vault-blue">finally organized.</span>
        </h1>
        <p className="mt-5 text-gray-500 max-w-md mx-auto">
          ClassVault is the shared workspace for students and teachers — notes,
          assignments, deadlines, and discussion, all in one calm, focused place.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/signup"
            className="bg-vault-blue text-white px-6 py-3 rounded-full font-medium hover:bg-vault-blue-dark transition-colors"
          >
            Get started free
          </Link>
          <Link to="/login" className="text-vault-navy font-medium hover:text-vault-blue">
            Log in to your vault
          </Link>
        </div>

        {/* Dashboard preview mock */}
        <div className="mt-16 max-w-4xl mx-auto rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden text-left bg-white">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100 bg-gray-50">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          </div>
          <div className="flex">
            <div className="w-40 border-r border-gray-100 p-4 hidden sm:block">
              <div className="text-vault-blue bg-vault-blue/10 rounded-lg px-3 py-2 text-sm font-medium mb-2">
                Dashboard
              </div>
              <div className="text-gray-400 text-sm px-3 py-2">My Classes</div>
              <div className="text-gray-400 text-sm px-3 py-2">Resources</div>
              <div className="text-gray-400 text-sm px-3 py-2">Profile</div>
            </div>
            <div className="flex-1 p-6">
              <p className="text-xs font-medium text-gray-400 mb-3">OVERVIEW</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="border border-gray-100 rounded-xl p-4">
                  <p className="text-xl font-semibold">4</p>
                  <p className="text-xs text-gray-400">Classes</p>
                </div>
                <div className="border border-gray-100 rounded-xl p-4">
                  <p className="text-xl font-semibold">12</p>
                  <p className="text-xs text-gray-400">Uploads</p>
                </div>
                <div className="border border-gray-100 rounded-xl p-4">
                  <p className="text-xl font-semibold">3</p>
                  <p className="text-xs text-gray-400">Due Soon</p>
                </div>
              </div>
              <p className="text-xs font-medium text-gray-400 mb-3">RECENT UPLOADS</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 py-1.5">
                <Paperclip size={14} /> Lecture 8 — Thermodynamics Laws.pdf
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 py-1.5">
                <Paperclip size={14} /> Assignment 3 — Data Structures.docx
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-24 max-w-5xl mx-auto text-center">
        <p className="text-xs font-medium text-gray-400 mb-3">FEATURES</p>
        <h2 className="text-3xl font-serif font-semibold mb-14">
          Built for how students<br />actually learn
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 text-left">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="border border-gray-100 rounded-xl p-5 hover:border-vault-blue/30 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-vault-blue/10 text-vault-blue flex items-center justify-center mb-4">
                  <Icon size={18} />
                </div>
                <h3 className="font-medium mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="px-6 py-20 bg-vault-bg text-center">
        <p className="text-xs font-medium text-gray-400 mb-3">HOW IT WORKS</p>
        <h2 className="text-3xl font-serif font-semibold mb-14">Up and running in minutes</h2>
        <div className="grid sm:grid-cols-3 gap-10 max-w-4xl mx-auto text-left">
          {steps.map((s, i) => (
            <div key={s.title}>
              <p className="text-3xl font-serif text-gray-300 mb-3">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-medium mb-1.5">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-3xl font-serif font-semibold mb-4">Ready to get organized?</h2>
        <p className="text-gray-500 mb-8">Join thousands of students and teachers already using ClassVault.</p>
        <Link
          to="/signup"
          className="bg-vault-blue text-white px-6 py-3 rounded-full font-medium hover:bg-vault-blue-dark transition-colors inline-block"
        >
          Create your free account
        </Link>
      </section>

      <footer className="border-t border-gray-100 px-8 py-6 flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-vault-blue flex items-center justify-center">
            <Library size={13} className="text-white" />
          </div>
          ClassVault
        </div>
        <p>© 2026 ClassVault. All rights reserved.</p>
        <div className="hidden sm:flex gap-4">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
      </footer>
    </div>
  )
}
