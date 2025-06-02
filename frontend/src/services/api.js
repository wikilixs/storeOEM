import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  // Agregamos configuración adicional para manejar CORS
  withCredentials: true
})

// Interceptor para agregar el token a las peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const authService = {
  async register(userData) {
    try {
      const response = await axiosInstance.post('/auth/registro/', userData)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }
      return { data: response.data }
    } catch (error) {
      console.error('Error en el registro:', error)
      return { error: error.response?.data?.error || 'Error al registrar el usuario' }
    }
  },

  async login(credentials) {
    try {
      const response = await axiosInstance.post('/auth/login/', credentials)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }
      return { data: response.data }
    } catch (error) {
      console.error('Error en el login:', error)
      return { error: error.response?.data?.error || 'Error al iniciar sesión' }
    }
  }
}

export const productService = {
  async getProducts() {
    try {
      const response = await axiosInstance.get('/productos/')
      return { data: response.data }
    } catch (error) {
      console.error('Error al obtener productos:', error)
      return { error: error.response?.data?.error || 'Error al obtener los productos' }
    }
  },

  async getProductsByCategory(category) {
    try {
      const response = await axiosInstance.get(`/productos/categoria/${category}/`)
      return { data: response.data }
    } catch (error) {
      console.error('Error al obtener productos por categoría:', error)
      return { error: error.response?.data?.error || 'Error al obtener los productos de la categoría' }
    }
  },

  async getProductById(id) {
    try {
      const response = await axiosInstance.get(`/productos/${id}/`)
      return { data: response.data }
    } catch (error) {
      console.error('Error al obtener producto:', error)
      return { error: error.response?.data?.error || 'Error al obtener el producto' }
    }
  }
} 