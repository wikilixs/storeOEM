<template>
  <header class="sticky top-0 z-50 w-full border-b bg-white">
    <div class="w-full flex h-16 items-center px-4 md:px-6">
      <router-link to="/" class="mr-6 flex items-center space-x-2">
        <span class="text-xl font-bold text-purple-800">TiendaOEM</span>
      </router-link>
      <div class="hidden md:flex md:flex-1">
        <nav class="flex items-center space-x-6 text-sm font-medium">
          <router-link to="/productos/windows" class="text-purple-900 hover:text-purple-700 transition-colors">
            Windows
          </router-link>
          <router-link to="/productos/office" class="text-purple-900 hover:text-purple-700 transition-colors">
            Office
          </router-link>
          <router-link to="/productos/tarjetas" class="text-purple-900 hover:text-purple-700 transition-colors">
            Tarjetas de Regalo
          </router-link>
          <router-link to="/soporte" class="text-purple-900 hover:text-purple-700 transition-colors">
            Soporte
          </router-link>
        </nav>
      </div>
      <div class="hidden md:flex md:items-center md:space-x-4 ml-auto">
        <div class="relative">
          <SearchIcon class="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="search"
            placeholder="Buscar productos..."
            class="w-64 pl-8 rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <router-link to="/carrito" class="relative group">
          <ShoppingCartIcon class="h-6 w-6 text-purple-900" />
          <span v-if="cartItemCount" class="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{{ cartItemCount }}</span>
        </router-link>
        <router-link v-if="!authStore.isAuthenticated" to="/login" class="ml-4">
          <UserIcon class="h-6 w-6 text-purple-900" />
        </router-link>
        <router-link v-else to="/perfil" class="ml-4">
          <UserIcon class="h-6 w-6 text-purple-900" />
        </router-link>
      </div>
      <!-- Mobile Menu -->
      <button 
        class="md:hidden ml-auto p-2 rounded-md border border-gray-300 hover:bg-gray-50"
        @click="isMenuOpen = true">
        <MenuIcon class="h-5 w-5" />
        <span class="sr-only">Abrir menú</span>
      </button>
      
      <!-- Mobile Menu Drawer -->
      <TransitionRoot as="template" :show="isMenuOpen">
        <Dialog as="div" class="relative z-50" @close="isMenuOpen = false">
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-hidden">
            <div class="absolute inset-0 overflow-hidden">
              <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild
                  as="template"
                  enter="transform transition ease-in-out duration-300"
                  enter-from="translate-x-full"
                  enter-to="translate-x-0"
                  leave="transform transition ease-in-out duration-300"
                  leave-from="translate-x-0"
                  leave-to="translate-x-full"
                >
                  <DialogPanel class="pointer-events-auto relative w-screen max-w-md">
                    <div class="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                      <div class="px-4 sm:px-6">
                        <div class="flex items-start justify-between">
                          <DialogTitle class="text-xl font-semibold text-purple-800">TiendaOEM</DialogTitle>
                          <button
                            type="button"
                            class="relative rounded-md text-gray-400 hover:text-gray-500"
                            @click="isMenuOpen = false"
                          >
                            <XIcon class="h-6 w-6" />
                          </button>
                        </div>
                      </div>
                      <div class="mt-6 flex-1 px-4 sm:px-6">
                        <nav class="grid gap-6 text-lg font-medium">
                          <router-link to="/" class="hover:text-purple-700" @click="isMenuOpen = false">
                            Inicio
                          </router-link>
                          <router-link to="/productos/windows" class="hover:text-purple-700" @click="isMenuOpen = false">
                            Windows
                          </router-link>
                          <router-link to="/productos/office" class="hover:text-purple-700" @click="isMenuOpen = false">
                            Office
                          </router-link>
                          <router-link to="/productos/tarjetas" class="hover:text-purple-700" @click="isMenuOpen = false">
                            Tarjetas de Regalo
                          </router-link>
                          <router-link to="/soporte" class="hover:text-purple-700" @click="isMenuOpen = false">
                            Soporte
                          </router-link>
                          <router-link to="/carrito" class="hover:text-purple-700" @click="isMenuOpen = false">
                            Carrito
                          </router-link>
                          <template v-if="!authStore.isAuthenticated">
                            <router-link to="/login" class="hover:text-purple-700" @click="isMenuOpen = false">
                              Iniciar Sesión
                            </router-link>
                          </template>
                          <template v-else>
                            <div class="space-y-4">
                              <router-link to="/perfil" class="hover:text-purple-700 block" @click="isMenuOpen = false">
                                Mi Perfil
                              </router-link>
                              <router-link to="/pedidos" class="hover:text-purple-700 block" @click="isMenuOpen = false">
                                Mis Pedidos
                              </router-link>
                              <button @click="handleLogout" class="hover:text-purple-700 block w-full text-left">
                                Cerrar Sesión
                              </button>
                            </div>
                          </template>
                        </nav>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { 
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  X as XIcon,
  User as UserIcon
} from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const isMenuOpen = ref(false)
const cartStore = useCartStore()
const authStore = useAuthStore()

const cartItemCount = computed(() => cartStore.itemCount)

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}
</script>
