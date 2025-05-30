import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    loading: false,
    error: null
  }),

  getters: {
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    totalAmount: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  },

  actions: {
    loadCart() {
      try {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          this.items = JSON.parse(savedCart)
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
        this.error = 'Error al cargar el carrito'
      }
    },

    saveCart() {
      try {
        localStorage.setItem('cart', JSON.stringify(this.items))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
        this.error = 'Error al guardar el carrito'
      }
    },

    addToCart(product) {
      try {
        const existingItem = this.items.find(item => item.id === product.id)
        
      if (existingItem) {
        existingItem.quantity++
      } else {
          this.items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
          })
      }
        
        this.saveCart()
      } catch (error) {
        console.error('Error adding item to cart:', error)
        this.error = 'Error al añadir el producto al carrito'
      }
    },

    removeFromCart(productId) {
      try {
        const index = this.items.findIndex(item => item.id === productId)
        if (index !== -1) {
        this.items.splice(index, 1)
          this.saveCart()
        }
      } catch (error) {
        console.error('Error removing item from cart:', error)
        this.error = 'Error al eliminar el producto del carrito'
      }
    },

    updateQuantity(productId, quantity) {
      try {
        const item = this.items.find(item => item.id === productId)
      if (item) {
          if (quantity > 0) {
        item.quantity = quantity
          } else {
            this.removeFromCart(productId)
          }
          this.saveCart()
        }
      } catch (error) {
        console.error('Error updating cart quantity:', error)
        this.error = 'Error al actualizar la cantidad'
      }
    },

    clearCart() {
      try {
      this.items = []
        localStorage.removeItem('cart')
      } catch (error) {
        console.error('Error clearing cart:', error)
        this.error = 'Error al limpiar el carrito'
      }
    },

    async checkout() {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch('/api/ventas/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            detalles: this.items.map(item => ({
              producto_id: item.id
            }))
          })
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.detail || 'Error al procesar la compra')
        }

        const data = await response.json()
        this.clearCart()
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
