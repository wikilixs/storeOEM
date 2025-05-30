import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  }),

  actions: {
    async register(username, email, contraseña, nombre, apellido) {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch('/api/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            email,
            contraseña,
            confirm_password: contraseña,
            nombre,
            apellido
          })
        })

        const data = await response.json()

        if (!response.ok) {
          let errorMessage = 'Error al registrar usuario'
          if (data) {
            // Si hay errores específicos del campo, mostrarlos
            if (typeof data === 'object') {
              const firstError = Object.entries(data)[0]
              if (firstError) {
                const [field, messages] = firstError
                errorMessage = Array.isArray(messages) ? messages[0] : messages
              }
            }
          }
          throw new Error(errorMessage)
        }

        this.user = data.user
        this.isAuthenticated = true
        
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async login(username, password) {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch('/api/token/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.detail || 'Credenciales inválidas')
        }

        const data = await response.json()
        this.token = data.access
        this.isAuthenticated = true
        localStorage.setItem('token', data.access)
        
        // Obtener información del usuario
        const userResponse = await fetch('/api/user/', {
          headers: {
            'Authorization': `Bearer ${data.access}`
          }
        })
        
        if (!userResponse.ok) throw new Error('Error al obtener información del usuario')
        
        const userData = await userResponse.json()
        this.user = userData
        
        const router = useRouter()
        router.push('/')
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        if (this.token) {
          await fetch('/api/auth/logout/', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${this.token}`
            }
          })
        }
      } catch (error) {
        console.error('Error during logout:', error)
      } finally {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
        
        const router = useRouter()
        router.push('/login')
      }
    },

    async checkAuth() {
      if (!this.token) {
        this.isAuthenticated = false
        return false
      }

      try {
        const response = await fetch('/api/auth/user/', {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })

        if (!response.ok) {
          throw new Error('Token inválido')
        }

        const user = await response.json()
        this.user = user
        this.isAuthenticated = true
        return true
      } catch (error) {
        console.error('Error en checkAuth:', error)
        this.user = null
        this.token = null
        this.isAuthenticated = false
        localStorage.removeItem('token')
        return false
      }
    },

    clearError() {
      this.error = null
    }
  },

  getters: {
    userFullName: (state) => {
      return state.user ? `${state.user.first_name} ${state.user.last_name}` : ''
    }
  }
})
