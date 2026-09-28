import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider, useUser } from './context/AuthContext.jsx'
import { DataProvider } from './context/DataContext.jsx'

// Shared Pages
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import ClassDetails from './pages/ClassDetails.jsx'

// Student Portal Pages
import StudentDashboard from './pages/student/StudentDashboard.jsx'
import StudentClasses from './pages/student/StudentClasses.jsx'
import StudentAssignments from './pages/student/StudentAssignments.jsx'
import StudentVault from './pages/student/StudentVault.jsx'

// Teacher / Faculty Portal Pages
import FacultyDashboard from './pages/teacher/FacultyDashboard.jsx'
import FacultyClasses from './pages/teacher/FacultyClasses.jsx'
import FacultyGradebook from './pages/teacher/FacultyGradebook.jsx'
import FacultyMaterials from './pages/teacher/FacultyMaterials.jsx'
import FacultyBroadcast from './pages/teacher/FacultyBroadcast.jsx'

function FacultyRoute({ children }) {
  const { user } = useUser()
  if (user?.role !== 'Teacher') {
    return <Navigate to="/student/dashboard" replace />
  }
  return children
}

function StudentRoute({ children }) {
  const { user } = useUser()
  if (user?.role === 'Teacher') {
    return <Navigate to="/teacher/dashboard" replace />
  }
  return children
}

export default function App() {
  return (
    <UserProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Entrance */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Student Dedicated Portal (Protected) */}
            <Route path="/dashboard" element={<StudentRoute><StudentDashboard /></StudentRoute>} />
            <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
            <Route path="/student/dashboard" element={<StudentRoute><StudentDashboard /></StudentRoute>} />
            <Route path="/student/classes" element={<StudentRoute><StudentClasses /></StudentRoute>} />
            <Route path="/student/assignments" element={<StudentRoute><StudentAssignments /></StudentRoute>} />
            <Route path="/student/vault" element={<StudentRoute><StudentVault /></StudentRoute>} />

            {/* Student Aliases */}
            <Route path="/classes" element={<StudentRoute><StudentClasses /></StudentRoute>} />
            <Route path="/resources" element={<StudentRoute><StudentVault /></StudentRoute>} />
            <Route path="/classes/:code" element={<StudentRoute><ClassDetails /></StudentRoute>} />

            {/* Teacher / Faculty Dedicated Portal (Protected from Students) */}
            <Route path="/teacher" element={<Navigate to="/teacher/dashboard" replace />} />
            <Route path="/teacher/dashboard" element={<FacultyRoute><FacultyDashboard /></FacultyRoute>} />
            <Route path="/teacher/classes" element={<FacultyRoute><FacultyClasses /></FacultyRoute>} />
            <Route path="/teacher/gradebook" element={<FacultyRoute><FacultyGradebook /></FacultyRoute>} />
            <Route path="/teacher/grading" element={<FacultyRoute><FacultyGradebook /></FacultyRoute>} />
            <Route path="/teacher/materials" element={<FacultyRoute><FacultyMaterials /></FacultyRoute>} />
            <Route path="/teacher/broadcast" element={<FacultyRoute><FacultyBroadcast /></FacultyRoute>} />

            {/* Account Management */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </UserProvider>
  )
}
