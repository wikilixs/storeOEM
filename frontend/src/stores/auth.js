import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { authService } from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    // Actualizar para usar accessToken en lugar de token
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
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

        if (data?.access && data?.refresh) {
          localStorage.setItem('accessToken', data.access)
          localStorage.setItem('refreshToken', data.refresh)
          this.accessToken = data.access
          this.refreshToken = data.refresh
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

    async login(email, password) {
      this.loading = true
      this.error = null
      
      try {
        const { data, error } = await authService.login({
          email,
          password
        })
        
        if (error) {
          throw new Error(error)
        }

        if (data?.access && data?.refresh) {
          localStorage.setItem('accessToken', data.access)
          localStorage.setItem('refreshToken', data.refresh)
          this.accessToken = data.access
          this.refreshToken = data.refresh
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
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      this.accessToken = null
      this.refreshToken = null
      this.user = null
      this.isAuthenticated = false
    },

    async checkAuth() {
      if (!this.accessToken) {
        this.isAuthenticated = false
        return false
      }

      try {
        const response = await axiosInstance.get('/auth/user/')
        this.user = response.data
        this.isAuthenticated = true
        return true
      } catch (error) {
        console.error('Error en verificación de sesión:', error)
        this.user = null
        this.accessToken = null
        this.refreshToken = null
        this.isAuthenticated = false
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        return false
      }
    },

    cleanError() {
      this.error = null
    },  // <-- Eliminar esta coma

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
