import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider } from './context/AuthContext.jsx'

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

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Entrance */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Student Dedicated Portal */}
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/classes" element={<StudentClasses />} />
          <Route path="/student/assignments" element={<StudentAssignments />} />
          <Route path="/student/vault" element={<StudentVault />} />

          {/* Student Aliases for backward compatibility */}
          <Route path="/classes" element={<StudentClasses />} />
          <Route path="/resources" element={<StudentVault />} />
          <Route path="/classes/:code" element={<ClassDetails />} />

          {/* Teacher / Faculty Dedicated Portal */}
          <Route path="/teacher" element={<Navigate to="/teacher/dashboard" replace />} />
          <Route path="/teacher/dashboard" element={<FacultyDashboard />} />
          <Route path="/teacher/classes" element={<FacultyClasses />} />
          <Route path="/teacher/gradebook" element={<FacultyGradebook />} />
          <Route path="/teacher/grading" element={<FacultyGradebook />} />
          <Route path="/teacher/materials" element={<FacultyMaterials />} />
          <Route path="/teacher/broadcast" element={<FacultyBroadcast />} />

          {/* Account Management */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}
