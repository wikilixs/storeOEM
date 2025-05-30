import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { authService } from '../services/api'

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
        const { data, errors } = await authService.register({
          username,
          email,
          contraseña,
          confirmar_contraseña: contraseña,
          nombre,
          apellido
        });

        if (errors) {
          const errorMessage = Object.values(errors)[0];
          throw new Error(errorMessage);
        }

        if (data?.access) {
          localStorage.setItem('token', data.access);
          this.token = data.access;
          this.user = data.user;
          this.isAuthenticated = true;
        }
        
        return data;
      } catch (error) {
        this.error = error.message || 'Error al registrar el usuario';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async login(username, contraseña) {
      this.loading = true;
      this.error = null;

      try {
        const { data, error } = await authService.login(username, contraseña);
        
        if (error) {
          throw new Error(error);
        }

        if (data?.access) {
          localStorage.setItem('token', data.access);
          this.token = data.access;
          this.user = data.user;
          this.isAuthenticated = true;
        }

        return data;
      } catch (error) {
        this.error = error.message || 'Error al iniciar sesión';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      localStorage.removeItem('token');
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
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
