import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false,
    error: null,
    categories: {
      windows: {
        name: 'Windows',
        description: 'Licencias originales de Windows 10 y 11'
      },
      office: {
        name: 'Microsoft Office',
        description: 'Suite completa de herramientas de productividad'
      },
      tarjetas: {
        name: 'Tarjetas de Regalo',
        description: 'Steam, Netflix, Spotify y más'
      }
    }
  }),

  getters: {
    getProductsByCategory: (state) => (category) => {
      return state.products.filter(product => product.category === category)
    },
    getFeaturedProducts: (state) => {
      return state.products.filter(product => product.featured)
    },
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id)
    }
  },

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('/api/products/')
        this.products = response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al cargar los productos'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchProductsByCategory(category) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`/api/products/category/${category}/`)
        this.products = response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al cargar los productos'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchProductById(id) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`/api/products/${id}/`)
        const product = response.data
        const existingIndex = this.products.findIndex(p => p.id === product.id)
        if (existingIndex !== -1) {
          this.products[existingIndex] = product
        } else {
          this.products.push(product)
        }
        return product
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al cargar el producto'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
