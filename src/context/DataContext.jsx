import { createContext, useContext, useState, useEffect } from 'react'
import { useUser } from './AuthContext.jsx'

// Initial relational dataset matching the ClassVault ER Diagram
const INITIAL_TEACHERS = [
  {
    teacher_id: 'TCH-101',
    name: 'Prof. Chen Wei',
    email: 'chen.wei@kristujayanti.com',
    password: '••••••••',
    department: 'Physics & Applied Sciences',
  },
  {
    teacher_id: 'TCH-102',
    name: 'Prof. Sara Okafor',
    email: 'sara.okafor@kristujayanti.com',
    password: '••••••••',
    department: 'Computer Science & Engineering',
  },
  {
    teacher_id: 'TCH-103',
    name: 'Prof. James Erikson',
    email: 'james.erikson@kristujayanti.com',
    password: '••••••••',
    department: 'Electronics & Computer Systems',
  },
  {
    teacher_id: 'TCH-104',
    name: 'Dr. Priya Nair',
    email: 'priya.nair@kristujayanti.com',
    password: '••••••••',
    department: 'Interdisciplinary Research',
  },
]

const INITIAL_STUDENTS = [
  {
    student_id: '24CPEB27',
    name: 'Student User',
    email: '24cpeb27@kristujayanti.com',
    password: '••••••••',
    department: 'Computer Science & Engineering',
    year: 'Year 1 (Freshman)',
    phone: '+91 98765 43210',
  },
  {
    student_id: '24CPEB28',
    name: 'Liam Nakamura',
    email: '24cpeb28@kristujayanti.com',
    password: '••••••••',
    department: 'Physics & Applied Sciences',
    year: 'Year 1 (Freshman)',
    phone: '+91 98765 43211',
  },
  {
    student_id: '23CS0115',
    name: 'Elena Rostov',
    email: '23cs0115@kristujayanti.com',
    password: '••••••••',
    department: 'Computer Science & Engineering',
    year: 'Year 2 (Sophomore)',
    phone: '+91 98765 43212',
  },
]

const INITIAL_CLASSES = [
  {
    class_id: '24CSC2T351',
    subject: 'Software Engineering',
    class_date: 'Mon, Wed, Fri · 09:30 AM – 10:30 AM',
    description: 'Software development lifecycles, Agile & Scrum frameworks, requirement engineering, architectural design patterns, testing suites, and CI/CD pipelines.',
    teacher_id: 'TCH-102',
  },
  {
    class_id: '24PHY2T351',
    subject: 'Atomic, Molecular and Nuclear Physics',
    class_date: 'Tue, Thu · 10:30 AM – 12:00 PM',
    description: 'Vector atom model, Zeeman and Stark effects, molecular rotational and vibrational spectra, nuclear liquid-drop model, shell structure, and radioactive decay laws.',
    teacher_id: 'TCH-101',
  },
  {
    class_id: '24CPL2T451',
    subject: 'Research Methodology',
    class_date: 'Wed, Fri · 01:30 PM – 03:00 PM',
    description: 'Formulation of research problems, hypothesis testing, literature review synthesis, statistical data analysis, research ethics, and academic publication standards.',
    teacher_id: 'TCH-104',
  },
  {
    class_id: '24ELE2T351',
    subject: 'Microcontroller and IoT',
    class_date: 'Mon, Thu · 02:00 PM – 03:30 PM',
    description: 'Microcontroller architecture (ARM Cortex, ESP32, 8051), peripheral interfacing (GPIO, ADC, I2C, SPI), sensor integration, MQTT networking, and IoT cloud platforms.',
    teacher_id: 'TCH-103',
  },
]

const INITIAL_TOPICS = [
  // Topics for 24CSC2T351 (Software Engineering)
  {
    topic_id: 'TOP-SE01',
    topic_name: 'Software Development Life Cycle & Agile Frameworks',
    content: 'Waterfall vs Agile Scrum, sprint planning, user stories estimation, product backlogs, and Kanban workflow management.',
    class_id: '24CSC2T351',
  },
  {
    topic_id: 'TOP-SE02',
    topic_name: 'Requirement Engineering & Architectural Patterns',
    content: 'Functional and non-functional requirements, SRS specification, MVC, microservices, and layered architecture design.',
    class_id: '24CSC2T351',
  },
  {
    topic_id: 'TOP-SE03',
    topic_name: 'Software Testing, Quality Assurance & CI/CD',
    content: 'Unit testing with Jest/JUnit, integration testing, test-driven development (TDD), automated deployment pipelines with GitHub Actions.',
    class_id: '24CSC2T351',
  },
  {
    topic_id: 'TOP-SE04',
    topic_name: 'Design Patterns & Clean Architecture',
    content: 'Creational, Structural, and Behavioral patterns: Factory, Singleton, Observer, Strategy, and SOLID design principles.',
    class_id: '24CSC2T351',
  },

  // Topics for 24PHY2T351 (Atomic, Molecular and Nuclear Physics)
  {
    topic_id: 'TOP-PHY01',
    topic_name: 'Vector Atom Model, LS & JJ Coupling',
    content: 'Stern-Gerlach experiment, orbital and spin angular momentum coupling, Pauli exclusion principle, and spectroscopic term notations.',
    class_id: '24PHY2T351',
  },
  {
    topic_id: 'TOP-PHY02',
    topic_name: 'Zeeman Effect & Atomic Transitions',
    content: 'Normal and anomalous Zeeman effect, Lande g-factor calculation, Stark effect, selection rules for electric dipole transitions.',
    class_id: '24PHY2T351',
  },
  {
    topic_id: 'TOP-PHY03',
    topic_name: 'Molecular Spectroscopy & Raman Scattering',
    content: 'Diatomic molecules, rigid rotator, harmonic oscillator models, vibration-rotation spectra, Frank-Condon principle, and Raman effect.',
    class_id: '24PHY2T351',
  },
  {
    topic_id: 'TOP-PHY04',
    topic_name: 'Nuclear Models & Radioactive Decay Kinematics',
    content: 'Liquid drop model, Weizsacker semi-empirical mass formula, nuclear shell model magic numbers, alpha/beta decay kinematics, and nuclear fission.',
    class_id: '24PHY2T351',
  },

  // Topics for 24CPL2T451 (Research Methodology)
  {
    topic_id: 'TOP-RM01',
    topic_name: 'Research Problem Identification & Literature Review',
    content: 'Defining research gap, systematic literature search, bibliographic citation managers, indexing databases (Scopus, Web of Science).',
    class_id: '24CPL2T451',
  },
  {
    topic_id: 'TOP-RM02',
    topic_name: 'Hypothesis Formulation & Experimental Design',
    content: 'Null and alternate hypotheses, Type I and Type II errors, independent and dependent variables, control groups, and randomized designs.',
    class_id: '24CPL2T451',
  },
  {
    topic_id: 'TOP-RM03',
    topic_name: 'Quantitative & Qualitative Data Analysis',
    content: 'Descriptive and inferential statistics, ANOVA, t-tests, regression models, SPSS/R tools, and thematic content analysis.',
    class_id: '24CPL2T451',
  },
  {
    topic_id: 'TOP-RM04',
    topic_name: 'Research Ethics, Plagiarism & Thesis Drafting',
    content: 'Committee approvals (IRB), publication ethics (COPE), similarity checking with Turnitin, structuring chapters, and defense prep.',
    class_id: '24CPL2T451',
  },

  // Topics for 24ELE2T351 (Microcontroller and IoT)
  {
    topic_id: 'TOP-IOT01',
    topic_name: 'Microcontroller Architecture & Memory Mapping',
    content: 'Harvard vs Von Neumann, ARM Cortex-M / ESP32 core architecture, register sets, timer/counters, and interrupt service routines.',
    class_id: '24ELE2T351',
  },
  {
    topic_id: 'TOP-IOT02',
    topic_name: 'Peripheral Interfacing: GPIO, ADC & Serial Protocols',
    content: 'GPIO configuration, ADC sampling, UART, SPI, and I2C serial communications with digital sensor modules.',
    class_id: '24ELE2T351',
  },
  {
    topic_id: 'TOP-IOT03',
    topic_name: 'Wireless Connectivity & IoT Protocols (MQTT/CoAP)',
    content: 'Wi-Fi/Bluetooth LE stacks, lightweight publish-subscribe messaging with MQTT broker, CoAP for constrained devices, and HTTP REST APIs.',
    class_id: '24ELE2T351',
  },
  {
    topic_id: 'TOP-IOT04',
    topic_name: 'Cloud IoT Platforms & Edge Sensor Dashboarding',
    content: 'Connecting ESP32 nodes to AWS IoT Core / Adafruit IO / ThingsBoard, real-time telemetry streaming, and edge anomaly alerts.',
    class_id: '24ELE2T351',
  },
]

const INITIAL_TOPIC_PROGRESS = [
  { progress_id: 'PRG-001', student_id: '24CPEB27', topic_id: 'TOP-SE01', status: 'Reviewed', reviewed_date: '2026-09-12' },
  { progress_id: 'PRG-002', student_id: '24CPEB27', topic_id: 'TOP-SE02', status: 'Reviewed', reviewed_date: '2026-09-15' },
  { progress_id: 'PRG-003', student_id: '24CPEB27', topic_id: 'TOP-SE03', status: 'In Progress', reviewed_date: '2026-09-20' },
  { progress_id: 'PRG-004', student_id: '24CPEB27', topic_id: 'TOP-PHY01', status: 'Reviewed', reviewed_date: '2026-09-14' },
  { progress_id: 'PRG-005', student_id: '24CPEB27', topic_id: 'TOP-PHY02', status: 'Reviewed', reviewed_date: '2026-09-18' },
  { progress_id: 'PRG-006', student_id: '24CPEB27', topic_id: 'TOP-RM01', status: 'Reviewed', reviewed_date: '2026-09-10' },
  { progress_id: 'PRG-007', student_id: '24CPEB27', topic_id: 'TOP-RM02', status: 'In Progress', reviewed_date: '2026-09-22' },
  { progress_id: 'PRG-008', student_id: '24CPEB27', topic_id: 'TOP-IOT01', status: 'Reviewed', reviewed_date: '2026-09-16' },
  { progress_id: 'PRG-009', student_id: '24CPEB27', topic_id: 'TOP-IOT02', status: 'Reviewed', reviewed_date: '2026-09-21' },
]

const INITIAL_CONTENT = [
  {
    content_id: 'CNT-501',
    title: 'Software Engineering Architecture & Design Patterns Manual',
    description: 'Comprehensive guide to MVC, Microservices, SOLID design principles, and UML class diagrams for semester project submission.',
    file_url: '/materials/software_engineering_architecture_manual.pdf',
    file_name: 'Software_Engineering_Architecture_Manual.pdf',
    file_size: '3.4 MB',
    type: 'PDF',
    created_at: '2026-09-12',
    teacher_id: 'TCH-102',
    class_id: '24CSC2T351',
  },
  {
    content_id: 'CNT-502',
    title: 'Atomic & Nuclear Physics Spectroscopic Formula Handbook',
    description: 'Complete formulas for Zeeman splitting, Lande g-factor, semi-empirical mass formula, and radioactive decay chains.',
    file_url: '/materials/atomic_nuclear_physics_handbook.pdf',
    file_name: 'Atomic_Nuclear_Physics_Handbook.pdf',
    file_size: '2.8 MB',
    type: 'PDF',
    created_at: '2026-09-15',
    teacher_id: 'TCH-101',
    class_id: '24PHY2T351',
  },
  {
    content_id: 'CNT-503',
    title: 'Research Methodology Thesis Writing & SPSS Analysis Template',
    description: 'Standard academic research format, statistical hypothesis testing methods, APA 7th edition referencing, and literature review matrix.',
    file_url: '/materials/research_methodology_thesis_template.docx',
    file_name: 'Research_Methodology_Thesis_Template.docx',
    file_size: '1.9 MB',
    type: 'Notes',
    created_at: '2026-09-18',
    teacher_id: 'TCH-104',
    class_id: '24CPL2T451',
  },
  {
    content_id: 'CNT-504',
    title: 'ESP32 & ARM Microcontroller Sensor Interfacing Firmware Suite',
    description: 'Tested C/C++ firmware scripts for GPIO, I2C temperature sensors, MQTT telemetry publishing, and cloud dashboard connection.',
    file_url: '/materials/microcontroller_iot_firmware_suite.zip',
    file_name: 'Microcontroller_IoT_Firmware_Suite.zip',
    file_size: '4.2 MB',
    type: 'Code',
    created_at: '2026-09-20',
    teacher_id: 'TCH-103',
    class_id: '24ELE2T351',
  },
]

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const { user } = useUser()

  // Teachers Entity
  const [teachers, setTeachers] = useState(() => {
    try {
      const saved = localStorage.getItem('cv_teachers')
      if (saved) {
        const parsed = JSON.parse(saved)
        return parsed.map((t) => ({
          ...t,
          email: t.email ? t.email.replace('@university.edu', '@kristujayanti.com') : 'faculty@kristujayanti.com',
        }))
      }
      return INITIAL_TEACHERS
    } catch {
      return INITIAL_TEACHERS
    }
  })

  // Students Entity
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem('cv_students')
      if (saved) {
        const parsed = JSON.parse(saved)
        return parsed.map((s) => ({
          ...s,
          email: s.email ? s.email.replace('@university.edu', '@kristujayanti.com') : 'student@kristujayanti.com',
        }))
      }
      return INITIAL_STUDENTS
    } catch {
      return INITIAL_STUDENTS
    }
  })

  // Class Entity
  const [classes, setClasses] = useState(() => {
    try {
      const saved = localStorage.getItem('cv_classes')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.some((c) => c.class_id === '24CSC2T351')) {
          return parsed
        }
      }
      return INITIAL_CLASSES
    } catch {
      return INITIAL_CLASSES
    }
  })

  // Topic Entity
  const [topics, setTopics] = useState(() => {
    try {
      const saved = localStorage.getItem('cv_topics')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.some((t) => t.class_id === '24CSC2T351')) {
          return parsed
        }
      }
      return INITIAL_TOPICS
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
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.some((c) => c.class_id === '24CSC2T351')) {
          return parsed
        }
      }
      return INITIAL_CONTENT
    } catch {
      return INITIAL_CONTENT
    }
  })

  // Persistence side effects
  useEffect(() => {
    localStorage.setItem('cv_teachers', JSON.stringify(teachers))
  }, [teachers])

  useEffect(() => {
    localStorage.setItem('cv_students', JSON.stringify(students))
  }, [students])

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

  // Register a new student or faculty member into the university dataset
  const registerMember = ({ name, email, role, department, year, student_id, teacher_id }) => {
    const isTeacher = role === 'Teacher'
    if (isTeacher) {
      const newTeacher = {
        teacher_id: teacher_id || `TCH-${Math.floor(100 + Math.random() * 900)}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: '••••••••',
        department: department?.trim() || 'Physics & Applied Sciences',
      }
      setTeachers((prev) => [...prev.filter((t) => t.email !== newTeacher.email), newTeacher])
      return newTeacher
    } else {
      const newStudent = {
        student_id: student_id || `STU-${Math.floor(1000 + Math.random() * 9000)}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: '••••••••',
        department: department?.trim() || 'Computer Science & Engineering',
        year: year?.trim() || 'Year 1 (Freshman)',
        phone: '+91 98765 43210',
      }
      setStudents((prev) => [...prev.filter((s) => s.email !== newStudent.email), newStudent])
      return newStudent
    }
  }

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
  const uploadContent = ({ title, description, file_url, type, class_id, file_name, file_size }) => {
    const teacherId = user?.teacher_id || 'TCH-101'
    const today = new Date().toISOString().split('T')[0]

    const newContent = {
      content_id: `CNT-${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim(),
      description: description?.trim() || '',
      file_url: file_url?.trim() || `/materials/${title.toLowerCase().replace(/\s+/g, '_')}.pdf`,
      file_name: file_name || null,
      file_size: file_size || null,
      type: type || 'PDF',
      created_at: today,
      teacher_id: teacherId,
      class_id: class_id || '24CSC2T351',
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
        registerMember,
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
