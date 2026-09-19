import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import {
  ArrowLeft,
  GraduationCap,
  Calendar,
  Clock,
  MapPin,
  Users,
  Upload,
  FileText,
  Download,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  MessageSquare,
  ChevronRight,
} from 'lucide-react'

// Course dataset
const coursesData = {
  'PHYS-401': {
    code: 'PHYS 401',
    name: 'Advanced Thermodynamics',
    initial: 'A',
    color: 'bg-vault-blue',
    prof: 'Prof. Chen Wei',
    email: 'chen.wei@university.edu',
    officeHours: 'Tue & Thu: 2:00 PM – 4:00 PM (Science Hall 310)',
    schedule: 'Mon, Wed, Fri · 10:00 AM – 11:30 AM',
    location: 'Science Hall 302',
    semester: 'Fall 2026',
    studentsCount: 28,
    done: 3,
    total: 5,
    description:
      'A rigorous exploration of classical and statistical thermodynamics, laws of thermodynamics, entropy, phase equilibria, and thermodynamic cycles with applications in modern engineering and quantum statistics.',
    syllabus: [
      { week: 'Weeks 1–3', title: 'First & Second Laws of Thermodynamics, Heat Engines' },
      { week: 'Weeks 4–6', title: 'Entropy, Thermodynamic Potentials, Maxwell Relations' },
      { week: 'Weeks 7–9', title: 'Phase Transitions, Chemical Equilibrium, Van der Waals gas' },
      { week: 'Weeks 10–13', title: 'Introduction to Statistical Mechanics & Microstates' },
      { week: 'Weeks 14–15', title: 'Final Project Presentations & Comprehensive Review' },
    ],
    resources: [
      {
        name: 'Lecture 8 — Thermodynamics Laws.pdf',
        size: '2.4 MB',
        date: 'Oct 3',
        type: 'PDF',
        downloads: 24,
      },
      {
        name: 'Thermodynamics Cycles Presentation.pptx',
        size: '4.8 MB',
        date: 'Oct 6',
        type: 'PPT',
        downloads: 32,
      },
      {
        name: 'Midterm 1 Formula Cheat Sheet.pdf',
        size: '512 KB',
        date: 'Sep 24',
        type: 'PDF',
        downloads: 65,
      },
    ],
    assignments: [
      {
        title: 'Problem Set 5: Carnot Engines & Entropy',
        due: 'Due Oct 14, 2026',
        status: 'In Progress',
        urgent: true,
      },
      {
        title: 'Problem Set 4: Maxwell Relations',
        due: 'Submitted Oct 2',
        status: 'Completed',
        urgent: false,
      },
      {
        title: 'Lab Report 2: Adiabatic Expansion',
        due: 'Submitted Sep 25',
        status: 'Completed',
        urgent: false,
      },
      {
        title: 'Problem Set 3: Heat Capacities',
        due: 'Submitted Sep 18',
        status: 'Completed',
        urgent: false,
      },
      {
        title: 'Term Paper: Quantum Statistical Ensembles',
        due: 'Due Nov 10, 2026',
        status: 'Upcoming',
        urgent: false,
      },
    ],
    classmates: [
      { name: 'Liam Nakamura', role: 'Student', initial: 'LN' },
      { name: 'Elena Rostova', role: 'Student', initial: 'ER' },
      { name: 'Marcus Brody', role: 'Student', initial: 'MB' },
      { name: 'Sofia Alvarez', role: 'Student', initial: 'SA' },
      { name: 'David Kim', role: 'Teaching Assistant', initial: 'DK' },
    ],
  },
  'CS-302': {
    code: 'CS 302',
    name: 'Data Structures & Algorithms',
    initial: 'D',
    color: 'bg-indigo-500',
    prof: 'Prof. Sara Okafor',
    email: 'sara.okafor@university.edu',
    officeHours: 'Wed: 1:00 PM – 3:00 PM (Turing Lab 104)',
    schedule: 'Tue, Thu · 2:00 PM – 3:45 PM',
    location: 'Alan Turing Building 104',
    semester: 'Fall 2026',
    studentsCount: 35,
    done: 4,
    total: 4,
    description:
      'Fundamental data structures including balanced trees, hash tables, heaps, graphs, algorithmic paradigms like dynamic programming, greedy algorithms, and asymptotic complexity analysis.',
    syllabus: [
      { week: 'Weeks 1–3', title: 'Asymptotic Analysis, Trees, AVL & Red-Black Trees' },
      { week: 'Weeks 4–6', title: 'Hashing, Priority Queues, Disjoint Set Union' },
      { week: 'Weeks 7–9', title: 'Graph Algorithms: BFS, DFS, Dijkstra, Bellman-Ford' },
      { week: 'Weeks 10–12', title: 'Dynamic Programming & Greedy Algorithms' },
      { week: 'Weeks 13–15', title: 'NP-Completeness & Final Project' },
    ],
    resources: [
      {
        name: 'Assignment 3 — Sorting Algorithms.docx',
        size: '188 KB',
        date: 'Oct 2',
        type: 'DOC',
        downloads: 35,
      },
      {
        name: 'Graph Theory Cheat Sheet.pdf',
        size: '320 KB',
        date: 'Sep 27',
        type: 'PDF',
        downloads: 55,
      },
      {
        name: 'DP Matrix Chain Multiplication Walkthrough.pdf',
        size: '890 KB',
        date: 'Sep 15',
        type: 'PDF',
        downloads: 48,
      },
    ],
    assignments: [
      {
        title: 'Final Project Proposal',
        due: 'Due Oct 18, 2026',
        status: 'Completed',
        urgent: false,
      },
      {
        title: 'Programming Assignment 3: Dijkstra & A*',
        due: 'Submitted Oct 1',
        status: 'Completed',
        urgent: false,
      },
      {
        title: 'Programming Assignment 2: Balanced Trees',
        due: 'Submitted Sep 20',
        status: 'Completed',
        urgent: false,
      },
      {
        title: 'Homework 1: Big-O Proofs',
        due: 'Submitted Sep 10',
        status: 'Completed',
        urgent: false,
      },
    ],
    classmates: [
      { name: 'Liam Nakamura', role: 'Student', initial: 'LN' },
      { name: 'Ananya Sharma', role: 'Student', initial: 'AS' },
      { name: 'Lucas Scott', role: 'Student', initial: 'LS' },
      { name: 'Jordan Hayes', role: 'Teaching Assistant', initial: 'JH' },
    ],
  },
  'MATH-201': {
    code: 'MATH 201',
    name: 'Linear Algebra',
    initial: 'L',
    color: 'bg-blue-600',
    prof: 'Prof. James Erikson',
    email: 'james.erikson@university.edu',
    officeHours: 'Mon: 3:00 PM – 5:00 PM (Euler Hall 204)',
    schedule: 'Mon, Wed · 11:30 AM – 1:00 PM',
    location: 'Euler Hall 204',
    semester: 'Fall 2026',
    studentsCount: 42,
    done: 4,
    total: 6,
    description:
      'Vector spaces, subspaces, linear transformations, matrices, determinants, eigenvalues, eigenvectors, orthogonality, inner product spaces, and singular value decomposition.',
    syllabus: [
      { week: 'Weeks 1–3', title: 'Systems of Linear Equations, Gaussian Elimination, Matrix Inverses' },
      { week: 'Weeks 4–6', title: 'Vector Spaces, Subspaces, Span, Basis, and Dimension' },
      { week: 'Weeks 7–9', title: 'Linear Transformations, Determinants, Eigenvalues & Eigenvectors' },
      { week: 'Weeks 10–12', title: 'Orthogonality, Gram-Schmidt, Least Squares' },
      { week: 'Weeks 13–15', title: 'Symmetric Matrices, SVD, Review' },
    ],
    resources: [
      {
        name: 'Chapter 5 Summary Notes.pdf',
        size: '940 KB',
        date: 'Oct 4',
        type: 'PDF',
        downloads: 41,
      },
      {
        name: 'Vector Spaces & Subspaces Worksheet.pdf',
        size: '512 KB',
        date: 'Oct 5',
        type: 'PDF',
        downloads: 19,
      },
    ],
    assignments: [
      {
        title: 'Midterm Exam Review Set',
        due: 'Due Oct 21, 2026',
        status: 'In Progress',
        urgent: false,
      },
      {
        title: 'Weekly Homework 5: Diagonalization',
        due: 'Due Oct 28, 2026',
        status: 'Upcoming',
        urgent: false,
      },
      {
        title: 'Weekly Homework 4: Basis & Dimension',
        due: 'Submitted Sep 29',
        status: 'Completed',
        urgent: false,
      },
    ],
    classmates: [
      { name: 'Devon Patel', role: 'Student', initial: 'DP' },
      { name: 'Sarah Lin', role: 'Student', initial: 'SL' },
      { name: 'Michael Chang', role: 'Student', initial: 'MC' },
    ],
  },
  'HIST-210': {
    code: 'HIST 210',
    name: 'Modern World History',
    initial: 'M',
    color: 'bg-purple-500',
    prof: 'Prof. Anita Reyes',
    email: 'anita.reyes@university.edu',
    officeHours: 'Fri: 10:00 AM – 12:00 PM (Humanities 112)',
    schedule: 'Tue, Thu · 9:30 AM – 11:00 AM',
    location: 'Humanities Hall 112',
    semester: 'Fall 2026',
    studentsCount: 31,
    done: 2,
    total: 3,
    description:
      'A global survey of historical transformations from the late 18th century to the present, focusing on revolution, industrialization, imperialism, nationalism, global conflicts, and decolonization.',
    syllabus: [
      { week: 'Weeks 1–3', title: 'The Age of Revolutions: Atlantic, French, and Haitian' },
      { week: 'Weeks 4–6', title: 'Industrial Capitalism and Global Imperialism' },
      { week: 'Weeks 7–9', title: 'The World Wars and Totalitarianism' },
      { week: 'Weeks 10–12', title: 'The Cold War and Global Decolonization' },
      { week: 'Weeks 13–15', title: 'Globalization, Human Rights, and Contemporary Issues' },
    ],
    resources: [
      {
        name: 'WWI Primary Sources Collection.zip',
        size: '8.1 MB',
        date: 'Sep 30',
        type: 'ZIP',
        downloads: 27,
      },
      {
        name: 'Decolonization Lecture Deck.pptx',
        size: '6.3 MB',
        date: 'Sep 28',
        type: 'PPT',
        downloads: 22,
      },
    ],
    assignments: [
      {
        title: 'Primary Source Analysis Essay',
        due: 'Due Oct 26, 2026',
        status: 'In Progress',
        urgent: false,
      },
      {
        title: 'Quiz 2: Industrial Revolution',
        due: 'Submitted Sep 22',
        status: 'Completed',
        urgent: false,
      },
      {
        title: 'Historical Research Paper',
        due: 'Due Nov 15, 2026',
        status: 'Upcoming',
        urgent: false,
      },
    ],
    classmates: [
      { name: 'Claire Dubois', role: 'Student', initial: 'CD' },
      { name: 'Mateo Gomez', role: 'Student', initial: 'MG' },
      { name: 'Grace O’Connor', role: 'Student', initial: 'GO' },
    ],
  },
}

export default function ClassDetails() {
  const { code } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('resources')

  // Normalize code key e.g. "PHYS-401" or "PHYS 401"
  const normalizedKey = (code || '').replace(/\s+/g, '-').toUpperCase()
  const fallbackCourse = {
    code: (code || 'COURSE 101').replace(/-/g, ' '),
    name: 'Class Details',
    initial: (code || 'C')[0].toUpperCase(),
    color: 'bg-vault-blue',
    prof: 'Course Instructor',
    email: 'instructor@university.edu',
    officeHours: 'Check with department',
    schedule: 'TBD',
    location: 'Campus Building',
    semester: 'Fall 2026',
    studentsCount: 25,
    done: 2,
    total: 4,
    description: 'Course details, resources, and syllabus for this enrolled class.',
    syllabus: [
      { week: 'Weeks 1–5', title: 'Foundational concepts and principles' },
      { week: 'Weeks 6–10', title: 'Intermediate applications and laboratory work' },
      { week: 'Weeks 11–15', title: 'Advanced topics and final assessment' },
    ],
    resources: [
      { name: 'Course Introduction & Syllabus.pdf', size: '1.1 MB', date: 'Sep 1', type: 'PDF', downloads: 15 },
    ],
    assignments: [
      { title: 'Midterm Assignment', due: 'Due soon', status: 'In Progress', urgent: false },
    ],
    classmates: [
      { name: 'Peer Student', role: 'Student', initial: 'PS' },
    ],
  }

  const course = coursesData[normalizedKey] || fallbackCourse
  const progressPct = Math.min(100, Math.round((course.done / course.total) * 100))

  return (
    <div className="flex min-h-screen bg-vault-bg">
      <Sidebar />

      <main className="flex-1 px-8 py-6">
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            to="/classes"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-vault-navy transition-colors mb-4"
          >
            <ArrowLeft size={16} /> Back to My Classes
          </Link>

          {/* Header Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl ${course.color || 'bg-vault-blue'} text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-sm`}
                >
                  {course.initial}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-600">
                      {course.code}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{course.semester}</span>
                  </div>
                  <h1 className="text-2xl font-serif font-semibold text-vault-navy mt-1">
                    {course.name}
                  </h1>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {course.prof} · <a href={`mailto:${course.email}`} className="text-vault-blue hover:underline">{course.email}</a>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  to="/upload"
                  className="flex items-center gap-2 bg-vault-blue text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-vault-blue-dark transition-colors shadow-sm"
                >
                  <Upload size={16} /> Upload resource
                </Link>
              </div>
            </div>

            {/* Quick Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-vault-blue shrink-0" />
                <div>
                  <p className="text-gray-400">Schedule</p>
                  <p className="font-medium text-vault-navy">{course.schedule}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-vault-blue shrink-0" />
                <div>
                  <p className="text-gray-400">Location</p>
                  <p className="font-medium text-vault-navy">{course.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users size={16} className="text-vault-blue shrink-0" />
                <div>
                  <p className="text-gray-400">Class Size</p>
                  <p className="font-medium text-vault-navy">{course.studentsCount} Classmates</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-vault-blue shrink-0" />
                <div>
                  <p className="text-gray-400">Course Progress</p>
                  <p className="font-medium text-vault-navy">
                    {course.done}/{course.total} ({progressPct}%)
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-3">
              <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-vault-blue h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {course.done} of {course.total} tasks completed
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 mb-6">
          {[
            { id: 'resources', label: `Resources (${course.resources.length})`, icon: FileText },
            { id: 'assignments', label: `Assignments (${course.assignments.length})`, icon: CheckCircle2 },
            { id: 'syllabus', label: 'Syllabus & Overview', icon: BookOpen },
            { id: 'classmates', label: `Classmates (${course.classmates.length})`, icon: Users },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'border-vault-blue text-vault-blue font-semibold'
                    : 'border-transparent text-gray-500 hover:text-vault-navy'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* TAB 1: RESOURCES */}
        {activeTab === 'resources' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-vault-navy">
                Course Materials & Shared Vault
              </h2>
              <Link
                to="/upload"
                className="text-xs font-medium text-vault-blue hover:underline flex items-center gap-1"
              >
                + Add material
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100 shadow-sm">
              {course.resources.map((res, idx) => (
                <div
                  key={idx}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-gray-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-vault-blue/10 text-vault-blue flex items-center justify-center font-bold text-xs shrink-0">
                      {res.type}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-vault-navy truncate">{res.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Uploaded {res.date} · {res.size} · {res.downloads} downloads
                      </p>
                    </div>
                  </div>

                  <a
                    href="#download"
                    onClick={(e) => {
                      e.preventDefault()
                      alert(`Downloading "${res.name}"`)
                    }}
                    className="p-2 rounded-xl text-gray-400 hover:text-vault-blue hover:bg-vault-blue/10 transition-colors shrink-0"
                    title="Download file"
                  >
                    <Download size={17} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ASSIGNMENTS */}
        {activeTab === 'assignments' && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-vault-navy">Tasks & Deadlines</h2>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100 shadow-sm">
              {course.assignments.map((asg, idx) => (
                <div
                  key={idx}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-gray-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        asg.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-600'
                          : asg.urgent
                          ? 'bg-red-100 text-red-500'
                          : 'bg-blue-100 text-vault-blue'
                      }`}
                    >
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-vault-navy">{asg.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{asg.due}</p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-md shrink-0 ${
                      asg.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-600'
                        : asg.urgent
                        ? 'bg-red-50 text-red-500'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {asg.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SYLLABUS & OVERVIEW */}
        {activeTab === 'syllabus' && (
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-base font-semibold text-vault-navy mb-2">Course Description</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{course.description}</p>

              <div className="mt-5 pt-4 border-t border-gray-100">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Instructor Office Hours
                </h3>
                <p className="text-sm font-medium text-vault-navy">{course.officeHours}</p>
              </div>
            </div>

            {/* Weekly Schedule */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-base font-semibold text-vault-navy mb-4">Syllabus Breakdown</h2>
              <div className="space-y-3">
                {course.syllabus.map((s, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <span className="text-xs font-bold text-vault-blue bg-white px-2.5 py-1 rounded-md border border-gray-200 shrink-0">
                      {s.week}
                    </span>
                    <p className="text-sm text-vault-navy font-medium pt-0.5">{s.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CLASSMATES */}
        {activeTab === 'classmates' && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-vault-navy">
              Enrolled Classmates ({course.classmates.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {course.classmates.map((cm, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between gap-3 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-vault-blue text-white flex items-center justify-center font-semibold text-sm shrink-0">
                      {cm.initial}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-vault-navy">{cm.name}</p>
                      <p className="text-xs text-gray-400">{cm.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Direct messaging with ${cm.name} will open.`)}
                    className="p-2 rounded-xl text-gray-400 hover:text-vault-blue hover:bg-vault-blue/10 transition-colors"
                    title="Send message"
                  >
                    <MessageSquare size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
