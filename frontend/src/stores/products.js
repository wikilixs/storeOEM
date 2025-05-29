import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Windows 11 Pro',
        description: 'Licencia original de Windows 11 Pro - Activación digital',
        price: 299,
        category: 'windows',
        featured: true,
        image: '/images/windows11.jpg'
      },
      {
        id: 2,
        name: 'Windows 10 Pro',
        description: 'Licencia original de Windows 10 Pro - Activación digital',
        price: 249,
        category: 'windows',
        featured: true,
        image: '/images/windows10.jpg'
      },
      {
        id: 3,
        name: 'Office 2021 Professional Plus',
        description: 'Suite completa de Microsoft Office 2021 - Licencia perpetua',
        price: 399,
        category: 'office',
        featured: true,
        image: '/images/office2021.jpg'
      },
      {
        id: 4,
        name: 'Office 2019 Home & Business',
        description: 'Microsoft Office 2019 para hogar y pequeñas empresas',
        price: 299,
        category: 'office',
        featured: false,
        image: '/images/office2019.jpg'
      },
      {
        id: 5,
        name: 'Tarjeta Steam $50',
        description: 'Tarjeta de regalo Steam de $50 USD',
        price: 399,
        category: 'tarjetas',
        featured: true,
        image: '/images/steam.jpg'
      },
      {
        id: 6,
        name: 'Tarjeta Netflix $30',
        description: 'Tarjeta de regalo Netflix de $30 USD',
        price: 249,
        category: 'tarjetas',
        featured: false,
        image: '/images/netflix.jpg'
      }
    ],
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
      return state.products.find(product => product.id === parseInt(id))
    }
  },

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      
      try {
        // Simulamos una llamada al backend
        await new Promise(resolve => setTimeout(resolve, 500))
        // Los productos ya están cargados en el state
        this.loading = false
      } catch (error) {
        this.error = 'Error al cargar los productos'
        this.loading = false
        console.error('Error fetching products:', error)
      }
    },

    async fetchProductsByCategory(category) {
      this.loading = true
      this.error = null
      
      try {
        // Simulamos una llamada al backend
        await new Promise(resolve => setTimeout(resolve, 500))
        // Los productos ya están filtrados por el getter
        this.loading = false
        return this.getProductsByCategory(category)
      } catch (error) {
        this.error = 'Error al cargar los productos de la categoría'
        this.loading = false
        console.error('Error fetching products by category:', error)
        return []
      }
    },

    async fetchProductById(id) {
      if (this.loading) return null
      
      this.loading = true
      this.error = null
      
      try {
        const product = this.products.find(p => p.id === parseInt(id))
        if (product) {
          this.loading = false
          return product
        } else {
          this.error = 'Producto no encontrado'
          this.loading = false
          return null
        }
      } catch (error) {
        console.error('Error al cargar producto por ID:', error)
        this.error = error.response?.data?.message || 'Error al cargar el producto'
        this.loading = false
        return null
      }
    },

    clearError() {
      this.error = null
    }
  }
})
