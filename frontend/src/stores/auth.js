import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: null
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })

        if (!response.ok) throw new Error('Login failed')

        const data = await response.json()
        this.token = data.token
        this.user = data.user
        this.isAuthenticated = true

        localStorage.setItem('token', data.token)
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },

    async logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    },

    async checkAuth() {
      const token = localStorage.getItem('token')
      if (!token) return

      try {
        const response = await fetch('/api/auth/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) throw new Error('Invalid token')

        const user = await response.json()
        this.user = user
        this.token = token
        this.isAuthenticated = true
      } catch (error) {
        this.logout()
      }
    }
  }
})
