import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { authService } from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    successMessage: null
  }),

  actions: {
    async register(username, email, password, nombre, apellido) {
      this.loading = true
      this.error = null
      this.successMessage = null
      
      try {
        const { data, error } = await authService.register({
          username,
          email,
          password,
          confirmar_password: password,
          nombre,
          apellido
        })

        if (error) {
          throw new Error(error)
        }

        if (data?.token) {
          localStorage.setItem('token', data.token)
          this.token = data.token
          this.user = data.user
          this.isAuthenticated = true
          this.successMessage = 'Registro exitoso'
        }
        
        return data
      } catch (error) {
        this.error = error.message || 'Error al registrar el usuario'
        console.error('Error de registro:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async login(username, password) {
      this.loading = true
      this.error = null
      
      try {
        const { data, error } = await authService.login({
          username,
          password
        })
        
        if (error) {
          throw new Error(error)
        }

        if (data?.token) {
          localStorage.setItem('token', data.token)
          this.token = data.token
          this.user = data.user
          this.isAuthenticated = true
        }
        
        return data
      } catch (error) {
        this.error = error.message || 'Error al iniciar sesión'
        console.error('Error de login:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    logout() {
      localStorage.removeItem('token')
      this.token = null
      this.user = null
      this.isAuthenticated = false
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
          throw new Error('Sesión inválida')
        }

        const user = await response.json()
        this.user = user
        this.isAuthenticated = true
        return true
      } catch (error) {
        console.error('Error en verificación de sesión:', error)
        this.user = null
        this.token = null
        this.isAuthenticated = false
        localStorage.removeItem('token')
        return false
      }
    },

    clearError() {
      this.error = null
    },

    clearSuccessMessage() {
      this.successMessage = null
    },

    async updateProfile({ nombre, contraseña }) {
      this.loading = true
      this.error = null

      try {
        const response = await fetch('/api/auth/profile/', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
          body: JSON.stringify({
            nombre,
            contraseña
          })
        })

        if (!response.ok) {
          throw new Error('Error al actualizar el perfil')
        }

        const data = await response.json()
        this.user = data
        return data
      } catch (error) {
        this.error = error.message || 'Error al actualizar el perfil'
        throw error
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    userFullName: (state) => {
      return state.user ? `${state.user.nombre} ${state.user.apellido}` : ''
    }
  }
})
