import { defineStore } from 'pinia'
import { productService } from '@/services/api'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false,
    error: null,
    pagination: {
      count: 0,
      next: null,
      previous: null
    },
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
      return state.products.filter(product => product.tipo.toLowerCase().includes(category.toLowerCase()))
    },
    getFeaturedProducts: (state) => {
      // Por ahora mostraremos los primeros 6 productos como destacados
      return state.products.slice(0, 6)
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
        const { data, error } = await productService.getProducts()
        if (error) throw new Error(error)
        
        // Actualizar la información de paginación
        this.pagination = {
          count: data.count,
          next: data.next,
          previous: data.previous
        }
        
        // Mapear los productos
        this.products = data.results.map(product => ({
          ...product,
          id: product.id,
          name: product.nombre,
          price: product.precio,
          description: product.descripcion,
          category: product.tipo.toLowerCase(),
          image: `/images/${product.tipo.toLowerCase()}.jpg`
        }))
      } catch (error) {
        this.error = error.message || 'Error al cargar los productos'
        console.error('Error fetching products:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchProductsByCategory(category) {
      this.loading = true
      this.error = null
      
      try {
        const { data, error } = await productService.getProductsByCategory(category)
        if (error) throw new Error(error)
        
        const productsInCategory = data.results.map(product => ({
          ...product,
          id: product.id,
          name: product.nombre,
          price: product.precio,
          description: product.descripcion,
          category: product.tipo.toLowerCase(),
          image: `/images/${product.tipo.toLowerCase()}.jpg`
        }))
        
        // Actualizamos solo los productos de esta categoría
        this.products = [
          ...this.products.filter(p => !p.tipo.toLowerCase().includes(category.toLowerCase())),
          ...productsInCategory
        ]
      } catch (error) {
        this.error = error.message || 'Error al cargar los productos de la categoría'
        console.error('Error fetching products by category:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchProductById(id) {
      this.loading = true
      this.error = null
      
      try {
        const { data, error } = await productService.getProductById(id)
        if (error) throw new Error(error)
        
        const product = {
          ...data,
          id: data.id,
          name: data.nombre,
          price: data.precio,
          description: data.descripcion,
          category: data.tipo.toLowerCase(),
          image: `/images/${data.tipo.toLowerCase()}.jpg`
        }
        
        // Actualizamos o agregamos el producto al store
        const index = this.products.findIndex(p => p.id === product.id)
        if (index !== -1) {
          this.products[index] = product
        } else {
          this.products.push(product)
        }
        
        return product
      } catch (error) {
        this.error = error.message || 'Error al cargar el producto'
        console.error('Error fetching product by id:', error)
        return null
      } finally {
        this.loading = false
      }
    }
  }
})
