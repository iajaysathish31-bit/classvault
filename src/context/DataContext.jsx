import { createContext, useContext, useState, useEffect } from 'react'
import { useUser } from './AuthContext.jsx'

// Initial relational dataset matching the ClassVault ER Diagram
const INITIAL_TEACHERS = [
  {
    teacher_id: 'TCH-101',
    name: 'Prof. Chen Wei',
    email: 'chen.wei@university.edu',
    password: '••••••••',
    department: 'Physics & Applied Sciences',
  },
  {
    teacher_id: 'TCH-102',
    name: 'Prof. Sara Okafor',
    email: 'sara.okafor@university.edu',
    password: '••••••••',
    department: 'Computer Science & Engineering',
  },
  {
    teacher_id: 'TCH-103',
    name: 'Prof. James Erikson',
    email: 'james.erikson@university.edu',
    password: '••••••••',
    department: 'Mathematics',
  },
]

const INITIAL_STUDENTS = [
  {
    student_id: 'STU-8821',
    name: 'Student User',
    email: 'student@university.edu',
    password: '••••••••',
    department: 'Computer Science & Engineering',
    year: 'Year 3 (Junior)',
    phone: '+1 (555) 349-8821',
  },
  {
    student_id: 'STU-8822',
    name: 'Liam Nakamura',
    email: 'liam.n@university.edu',
    password: '••••••••',
    department: 'Physics & Applied Sciences',
    year: 'Year 3 (Junior)',
    phone: '+1 (555) 912-4412',
  },
  {
    student_id: 'STU-8823',
    name: 'Elena Rostov',
    email: 'elena.r@university.edu',
    password: '••••••••',
    department: 'Computer Science & Engineering',
    year: 'Year 4 (Senior)',
    phone: '+1 (555) 723-9090',
  },
]

const INITIAL_CLASSES = [
  {
    class_id: 'CLS-401',
    subject: 'Advanced Thermodynamics',
    class_date: 'Mon, Wed, Fri · 10:00 AM – 11:30 AM',
    description: 'Classical and statistical thermodynamics, Carnot engines, entropy dissipation, and Maxwell relations.',
    teacher_id: 'TCH-101',
  },
  {
    class_id: 'CLS-302',
    subject: 'Data Structures & Algorithms',
    class_date: 'Tue, Thu · 2:00 PM – 3:45 PM',
    description: 'Advanced balanced search trees, asymptotic complexity, graph traversal, and shortest path algorithms.',
    teacher_id: 'TCH-102',
  },
  {
    class_id: 'CLS-201',
    subject: 'Linear Algebra & Matrix Theory',
    class_date: 'Mon, Wed · 11:30 AM – 1:00 PM',
    description: 'Vector spaces, linear transformations, eigenvalues, eigenvectors, and spectral decomposition.',
    teacher_id: 'TCH-103',
  },
]

const INITIAL_TOPICS = [
  // Topics for CLS-401 (Advanced Thermodynamics)
  {
    topic_id: 'TOP-101',
    topic_name: 'First Law & Closed System Energy Balances',
    content: 'Internal energy, heat transfer, boundary work, and conservation of energy in piston-cylinder assemblies.',
    class_id: 'CLS-401',
  },
  {
    topic_id: 'TOP-102',
    topic_name: 'Carnot Heat Engines & Thermodynamic Temperature',
    content: 'Reversible cycles, Carnot efficiency principles, Clausius inequality, and absolute thermodynamic temperature scale.',
    class_id: 'CLS-401',
  },
  {
    topic_id: 'TOP-103',
    topic_name: 'Entropy & Second Law Formulations',
    content: 'Entropy generation, T-ds equations, isentropic efficiencies, and availability balance in open systems.',
    class_id: 'CLS-401',
  },
  {
    topic_id: 'TOP-104',
    topic_name: 'Maxwell Relations & Phase Transitions',
    content: 'Helmholtz and Gibbs free energy, mathematical Legendre transforms, and Clausius-Clapeyron equation.',
    class_id: 'CLS-401',
  },

  // Topics for CLS-302 (Data Structures)
  {
    topic_id: 'TOP-201',
    topic_name: 'Asymptotic Notation & Amortized Analysis',
    content: 'Big-O, Omega, and Theta bounds; aggregate method and potential function analysis.',
    class_id: 'CLS-302',
  },
  {
    topic_id: 'TOP-202',
    topic_name: 'Self-Balancing Red-Black Trees',
    content: 'Binary search tree properties, color invariants, left and right rotations, and rebalancing upon insertion.',
    class_id: 'CLS-302',
  },
  {
    topic_id: 'TOP-203',
    topic_name: 'Graph Traversal & Topological Sort',
    content: 'Breadth-first search, depth-first search, edge classifications, and Kahn algorithm for DAG ordering.',
    class_id: 'CLS-302',
  },
  {
    topic_id: 'TOP-204',
    topic_name: 'Dijkstra & Minimum Spanning Trees',
    content: 'Greedy algorithms, priority queue implementations with Fibonacci heaps, and Prim/Kruskal algorithms.',
    class_id: 'CLS-302',
  },

  // Topics for CLS-201 (Linear Algebra)
  {
    topic_id: 'TOP-301',
    topic_name: 'Vector Spaces & Subspace Verification',
    content: 'Vector space axioms, linear independence, basis, dimension, and row/column spaces.',
    class_id: 'CLS-201',
  },
  {
    topic_id: 'TOP-302',
    topic_name: 'Eigenvalues & Diagonalization',
    content: 'Characteristic polynomial, geometric vs algebraic multiplicity, and matrix diagonalization criteria.',
    class_id: 'CLS-201',
  },
]

const INITIAL_TOPIC_PROGRESS = [
  {
    progress_id: 'PRG-001',
    student_id: 'STU-8821',
    topic_id: 'TOP-101',
    status: 'Reviewed',
    reviewed_date: '2026-09-10',
  },
  {
    progress_id: 'PRG-002',
    student_id: 'STU-8821',
    topic_id: 'TOP-102',
    status: 'Reviewed',
    reviewed_date: '2026-09-14',
  },
  {
    progress_id: 'PRG-003',
    student_id: 'STU-8821',
    topic_id: 'TOP-103',
    status: 'In Progress',
    reviewed_date: '2026-09-18',
  },
  {
    progress_id: 'PRG-004',
    student_id: 'STU-8821',
    topic_id: 'TOP-201',
    status: 'Reviewed',
    reviewed_date: '2026-09-08',
  },
  {
    progress_id: 'PRG-005',
    student_id: 'STU-8821',
    topic_id: 'TOP-202',
    status: 'Reviewed',
    reviewed_date: '2026-09-15',
  },
  {
    progress_id: 'PRG-006',
    student_id: 'STU-8821',
    topic_id: 'TOP-203',
    status: 'Reviewed',
    reviewed_date: '2026-09-17',
  },
]

const INITIAL_CONTENT = [
  {
    content_id: 'CNT-501',
    title: 'Carnot Cycle & Entropy Balance Formula Sheet',
    description: 'Comprehensive mathematical equations for Carnot and Rankine heat engines, COP formulas, and T-s cycle plots.',
    file_url: '/materials/carnot_cycle_entropy_cheatsheet.pdf',
    type: 'PDF',
    created_at: '2026-09-12',
    teacher_id: 'TCH-101',
    class_id: 'CLS-401',
  },
  {
    content_id: 'CNT-502',
    title: 'Red-Black Tree Balance Invariants & Pseudo-Code Specification',
    description: 'Complete rotation rules, color flipping conditions, and Java/C++ insertion algorithms.',
    file_url: '/materials/red_black_tree_spec.pdf',
    type: 'PDF',
    created_at: '2026-09-15',
    teacher_id: 'TCH-102',
    class_id: 'CLS-302',
  },
  {
    content_id: 'CNT-503',
    title: 'Graph Algorithms Benchmark & Visualizer Code Suite',
    description: 'Interactive Dijkstra and A* pathfinding benchmarking scripts in Python with sample edge graphs.',
    file_url: '/materials/graph_benchmark_suite.zip',
    type: 'Code',
    created_at: '2026-09-16',
    teacher_id: 'TCH-102',
    class_id: 'CLS-302',
  },
  {
    content_id: 'CNT-504',
    title: 'Eigenvalues & Spectral Theorem Lecture Slides Deck',
    description: 'High-resolution presentation slides with geometric interpretations of shears, rotations, and eigenspaces.',
    file_url: '/materials/eigenvalues_spectral_slides.pptx',
    type: 'Presentation',
    created_at: '2026-09-05',
    teacher_id: 'TCH-103',
    class_id: 'CLS-201',
  },
]

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const { user } = useUser()

  // Teachers Entity
  const [teachers, setTeachers] = useState(() => {
    try {
      const saved = localStorage.getItem('cv_teachers')
      return saved ? JSON.parse(saved) : INITIAL_TEACHERS
    } catch {
      return INITIAL_TEACHERS
    }
  })

  // Students Entity
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem('cv_students')
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS
    } catch {
      return INITIAL_STUDENTS
    }
  })

  // Class Entity
  const [classes, setClasses] = useState(() => {
    try {
      const saved = localStorage.getItem('cv_classes')
      return saved ? JSON.parse(saved) : INITIAL_CLASSES
    } catch {
      return INITIAL_CLASSES
    }
  })

  // Topic Entity
  const [topics, setTopics] = useState(() => {
    try {
      const saved = localStorage.getItem('cv_topics')
      return saved ? JSON.parse(saved) : INITIAL_TOPICS
    } catch {
      return INITIAL_TOPICS
    }
  })

  // Topic Progress Entity
  const [topicProgress, setTopicProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('cv_topic_progress')
      return saved ? JSON.parse(saved) : INITIAL_TOPIC_PROGRESS
    } catch {
      return INITIAL_TOPIC_PROGRESS
    }
  })

  // Content Entity
  const [contents, setContents] = useState(() => {
    try {
      const saved = localStorage.getItem('cv_contents')
      return saved ? JSON.parse(saved) : INITIAL_CONTENT
    } catch {
      return INITIAL_CONTENT
    }
  })

  // Persistence side effects
  useEffect(() => {
    localStorage.setItem('cv_classes', JSON.stringify(classes))
  }, [classes])

  useEffect(() => {
    localStorage.setItem('cv_topics', JSON.stringify(topics))
  }, [topics])

  useEffect(() => {
    localStorage.setItem('cv_topic_progress', JSON.stringify(topicProgress))
  }, [topicProgress])

  useEffect(() => {
    localStorage.setItem('cv_contents', JSON.stringify(contents))
  }, [contents])

  // --- ACTIONS ---

  // 1. TEACHER Creates CLASS
  const createClass = ({ subject, class_date, description }) => {
    const teacherId = user?.teacher_id || 'TCH-101'
    const newClass = {
      class_id: `CLS-${Math.floor(100 + Math.random() * 900)}`,
      subject: subject.trim(),
      class_date: class_date?.trim() || 'Mon, Wed · 10:00 AM – 11:30 AM',
      description: description?.trim() || 'Comprehensive course syllabus and topics.',
      teacher_id: teacherId,
    }
    setClasses((prev) => [newClass, ...prev])
    return newClass
  }

  // 2. CLASS Contains TOPIC
  const addTopic = ({ topic_name, content, class_id }) => {
    const newTopic = {
      topic_id: `TOP-${Math.floor(100 + Math.random() * 900)}`,
      topic_name: topic_name.trim(),
      content: content.trim(),
      class_id,
    }
    setTopics((prev) => [...prev, newTopic])
    return newTopic
  }

  const deleteTopic = (topic_id) => {
    setTopics((prev) => prev.filter((t) => t.topic_id !== topic_id))
    setTopicProgress((prev) => prev.filter((p) => p.topic_id !== topic_id))
  }

  // 3. STUDENT Has TOPIC_PROGRESS
  const updateTopicProgress = ({ topic_id, status }) => {
    const studentId = user?.student_id || 'STU-8821'
    const today = new Date().toISOString().split('T')[0]

    setTopicProgress((prev) => {
      const existing = prev.find((p) => p.student_id === studentId && p.topic_id === topic_id)
      if (existing) {
        return prev.map((p) =>
          p.progress_id === existing.progress_id
            ? {
                ...p,
                status,
                reviewed_date: status === 'Reviewed' ? today : p.reviewed_date,
              }
            : p
        )
      } else {
        const newProgress = {
          progress_id: `PRG-${Math.floor(1000 + Math.random() * 9000)}`,
          student_id: studentId,
          topic_id,
          status,
          reviewed_date: status === 'Reviewed' ? today : null,
        }
        return [...prev, newProgress]
      }
    })
  }

  // 4. TEACHER Uploads CONTENT
  const uploadContent = ({ title, description, file_url, type, class_id }) => {
    const teacherId = user?.teacher_id || 'TCH-101'
    const today = new Date().toISOString().split('T')[0]

    const newContent = {
      content_id: `CNT-${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim(),
      description: description?.trim() || '',
      file_url: file_url?.trim() || `/materials/${title.toLowerCase().replace(/\s+/g, '_')}.pdf`,
      type: type || 'PDF',
      created_at: today,
      teacher_id: teacherId,
      class_id: class_id || 'CLS-401',
    }
    setContents((prev) => [newContent, ...prev])
    return newContent
  }

  const deleteContent = (content_id) => {
    setContents((prev) => prev.filter((c) => c.content_id !== content_id))
  }

  // --- QUERY HELPERS ---

  // Get topics for a specific class
  const getTopicsForClass = (class_id) => {
    return topics.filter((t) => t.class_id === class_id)
  }

  // Get progress of a specific student for a topic
  const getProgressForTopic = (topic_id, student_id = user?.student_id || 'STU-8821') => {
    return topicProgress.find((p) => p.topic_id === topic_id && p.student_id === student_id)
  }

  // Get overall class progress percentage for a student
  const getClassProgress = (class_id, student_id = user?.student_id || 'STU-8821') => {
    const classTopics = getTopicsForClass(class_id)
    if (classTopics.length === 0) return { percent: 0, reviewed: 0, total: 0 }

    const reviewedCount = classTopics.filter((t) => {
      const prog = getProgressForTopic(t.topic_id, student_id)
      return prog && prog.status === 'Reviewed'
    }).length

    const percent = Math.round((reviewedCount / classTopics.length) * 100)
    return { percent, reviewed: reviewedCount, total: classTopics.length }
  }

  // Get teacher details for a class
  const getTeacherForClass = (teacher_id) => {
    return teachers.find((t) => t.teacher_id === teacher_id) || teachers[0]
  }

  return (
    <DataContext.Provider
      value={{
        teachers,
        students,
        classes,
        topics,
        topicProgress,
        contents,
        createClass,
        addTopic,
        deleteTopic,
        updateTopicProgress,
        uploadContent,
        deleteContent,
        getTopicsForClass,
        getProgressForTopic,
        getClassProgress,
        getTeacherForClass,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
