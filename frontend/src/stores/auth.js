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
    async register(username, email, password, firstName, lastName) {
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
            password,
            confirm_password: password,
            first_name: firstName,
            last_name: lastName
          })
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.detail || 'Error al registrar usuario')
        }

        const data = await response.json()
        this.token = data.token
        this.user = data.user
        this.isAuthenticated = true
        localStorage.setItem('token', data.token)
        
        const router = useRouter()
        router.push('/')
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async login(email, password) {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch('/api/auth/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.detail || 'Error al iniciar sesión')
        }

        const data = await response.json()
        this.token = data.token
        this.user = data.user
        this.isAuthenticated = true
        localStorage.setItem('token', data.token)
        
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
      if (!this.token) return false

      try {
        const response = await fetch('/api/auth/user/', {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })

        if (!response.ok) throw new Error('Token inválido')

        const user = await response.json()
        this.user = user
        this.isAuthenticated = true
        return true
      } catch (error) {
        this.logout()
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
