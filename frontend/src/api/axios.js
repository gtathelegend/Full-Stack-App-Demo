import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 15000, // Increased for MongoDB Atlas
})

// Request interceptor - add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handle 401 by clearing token and redirecting
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // Use replace instead of href to prevent back-button loop
      window.location.replace('/')
    }
    return Promise.reject(error)
  }
)

export default api
