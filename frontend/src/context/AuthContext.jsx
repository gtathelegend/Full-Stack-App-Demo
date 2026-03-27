import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import api from '../api/axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      try {
        const decoded = jwtDecode(storedToken)
        const isExpired = decoded.exp * 1000 < Date.now()

        if (isExpired) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          setToken(null)
          setUser(null)
        } else {
          setToken(storedToken)
          setUser(JSON.parse(storedUser))
        }
      } catch (err) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
      }
    }

    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token: newToken, user: newUser } = response.data

      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(newUser))

      setToken(newToken)
      setUser(newUser)

      return { success: true }
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || 'Login failed',
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
