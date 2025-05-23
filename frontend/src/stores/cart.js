import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isOpen: false
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    
    totalAmount: (state) => state.items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    ),
    
    formattedTotal: (state) => {
      const total = state.items.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
      )
      return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
      }).format(total)
    }
  },

  actions: {
    addItem(product) {
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
    },

    removeItem(productId) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.saveCart()
      }
    },

    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        item.quantity = Math.max(1, quantity)
        this.saveCart()
      }
    },

    clearCart() {
      this.items = []
      this.saveCart()
    },

    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    },

    loadCart() {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        this.items = JSON.parse(savedCart)
      }
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    }
  }
})
