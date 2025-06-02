import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

export const axiosInstance = axios.create({
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
    // Siempre tomar el token más reciente del localStorage
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      // Elimina el header si no hay token
      delete config.headers.Authorization
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
      // Actualizar para manejar tanto refresh como access token
      if (response.data.refresh && response.data.access) {
        localStorage.setItem('refreshToken', response.data.refresh)
        localStorage.setItem('accessToken', response.data.access)
      }
      return { data: response.data }
    } catch (error) {
      console.error('Error en el registro:', error)
      return { error: error.response?.data?.error || 'Error al registrar el usuario' }
    }
  },

  async login(credentials) {
    try {
      const response = await axiosInstance.post('/auth/login/', {
        email: credentials.email, // Asegurarse de enviar el campo email
        password: credentials.password
      })

      // Store both refresh and access tokens
      if (response.data.refresh && response.data.access) {
        localStorage.setItem('refreshToken', response.data.refresh)
        localStorage.setItem('accessToken', response.data.access)
      }

      return { data: response.data }
    } catch (error) {
      console.error('Error en el login:', error)
      return { error: error.response?.data?.detail || 'Error al iniciar sesión' }
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