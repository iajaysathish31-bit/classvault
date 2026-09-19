import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/AuthContext.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import Classes from './pages/Classes.jsx'
import Resources from './pages/Resources.jsx'
import Settings from './pages/Settings.jsx'
import Upload from './pages/Upload.jsx'
import ClassDetails from './pages/ClassDetails.jsx'
import TeacherDashboard from './pages/teacher/TeacherDashboard.jsx'
import TeacherClasses from './pages/teacher/TeacherClasses.jsx'
import TeacherGrading from './pages/teacher/TeacherGrading.jsx'

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classes/:code" element={<ClassDetails />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />

          {/* Teacher Module Dedicated Routes */}
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/classes" element={<TeacherClasses />} />
          <Route path="/teacher/grading" element={<TeacherGrading />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}
