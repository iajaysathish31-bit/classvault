import { createContext, useContext, useState, useEffect } from 'react'

const DEFAULT_USER = {
  name: 'Maya Patel',
  email: 'maya.patel@university.edu',
  role: 'Student',
  bio: 'Third-year Physics and Computer Science double major. I love digging into thermodynamics and algorithm design. Always up for a good study session.',
  joinedDate: 'September 2024',
}

const AuthContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('classvault_user')
      return saved ? JSON.parse(saved) : DEFAULT_USER
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

  // Get first name for greetings (e.g. "Maya")
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

  const signup = ({ name, email, role, bio }) => {
    const newUser = {
      name: name?.trim() || 'Student User',
      email: email?.trim() || 'student@university.edu',
      role: role || 'Student',
      bio: bio || `Passionate ${role || 'Student'} exploring new subjects and sharing knowledge.`,
      joinedDate: 'September 2026',
    }
    setUser(newUser)
    try {
      localStorage.setItem('classvault_user', JSON.stringify(newUser))
    } catch (e) {
      console.error(e)
    }
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
