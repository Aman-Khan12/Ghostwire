'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AdminUser {
  id?: string
  email: string
  name?: string
  role?: string
}

interface AdminContextType {
  admin: AdminUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if admin is logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedAdmin = localStorage.getItem('admin')
      if (storedAdmin) {
        try {
          setAdmin(JSON.parse(storedAdmin))
        } catch (error) {
          console.error('Failed to parse stored admin:', error)
          localStorage.removeItem('admin')
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Call login API
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        setAdmin(data.admin)
        localStorage.setItem('admin', JSON.stringify(data.admin))
        return true
      }

      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setAdmin(null)
    localStorage.removeItem('admin')
  }

  return (
    <AdminContext.Provider
      value={{
        admin,
        isLoading,
        isAuthenticated: !!admin,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}
