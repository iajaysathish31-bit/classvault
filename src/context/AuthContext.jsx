import { createContext, useContext, useState, useEffect } from 'react'

const DEFAULT_USER = {
  name: 'Student User',
  email: '24cpeb27@kristujayanti.com',
  role: 'Student',
  student_id: '24CPEB27',
  teacher_id: 'TCH-101',
  department: 'Computer Science & Engineering',
  year: 'Year 1 (Freshman)',
  phone: '+91 98765 43210',
  bio: 'Welcome to ClassVault! Your academic records are synced with Kristu Jayanti cohorts.',
  joinedDate: 'September 2026',
}

const AuthContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('classvault_user')
      if (saved) {
        const parsed = JSON.parse(saved)
        let cleanEmail = parsed.email || DEFAULT_USER.email
        if (!cleanEmail.toLowerCase().endsWith('@kristujayanti.com')) {
          cleanEmail = '24cpeb27@kristujayanti.com'
        }
        return {
          ...DEFAULT_USER,
          ...parsed,
          email: cleanEmail,
        }
      }
      return DEFAULT_USER
    } catch {
      return DEFAULT_USER
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('classvault_user', JSON.stringify(user))
    } catch (e) {
      console.error('Failed to persist user to localStorage', e)
    }
  }, [user])

  // Get first name for greetings (e.g. "Alex")
  const firstName = user?.name ? user.name.trim().split(/\s+/)[0] : 'Student'

  // Get up to 2 uppercase initials for avatar badge (e.g. "MP")
  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U'

  const updateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }))
  }

  const signup = ({ name, email, role, department, year, phone, bio }) => {
    const formattedRole = role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Student'
    const cleanEmail = email?.trim() || `${formattedRole.toLowerCase()}@kristujayanti.com`

    const newUser = {
      ...DEFAULT_USER,
      name: name?.trim() || (formattedRole === 'Teacher' ? 'Faculty Member' : 'Student User'),
      email: cleanEmail,
      role: formattedRole,
      department: department || (formattedRole === 'Teacher' ? 'Physics & Applied Sciences' : 'Computer Science & Engineering'),
      year: year || 'Year 3 (Junior)',
      phone: phone || '+1 (555) 349-8821',
      student_id: formattedRole === 'Student' ? `STU-${Math.floor(1000 + Math.random() * 9000)}` : '',
      teacher_id: formattedRole === 'Teacher' ? `TCH-${Math.floor(100 + Math.random() * 900)}` : '',
      bio: bio || `Academic account on ClassVault.`,
      joinedDate: 'September 2026',
    }
    setUser(newUser)
    try {
      localStorage.setItem('classvault_user', JSON.stringify(newUser))
    } catch (e) {
      console.error(e)
    }
    return newUser
  }

  const login = ({ email, name }) => {
    setUser((prev) => {
      const updatedName = name?.trim() || (prev?.email === email ? prev.name : email.split('@')[0])
      const updated = {
        ...prev,
        email: email || prev.email,
        name: updatedName,
      }
      try {
        localStorage.setItem('classvault_user', JSON.stringify(updated))
      } catch (e) {
        console.error(e)
      }
      return updated
    })
  }

  const logout = () => {
    setUser(DEFAULT_USER)
    try {
      localStorage.removeItem('classvault_user')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        firstName,
        initials,
        updateUser,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useUser() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
