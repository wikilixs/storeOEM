<template>
  <div class="w-full px-4 py-8">
    <h1 class="text-2xl font-bold mb-8">Mi Perfil</h1>
    
    <div class="w-full bg-white rounded-lg shadow-md p-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            disabled
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50"
          />
        </div>

        <div>
          <label for="newPassword" class="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
          <input
            id="newPassword"
            v-model="form.newPassword"
            type="password"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          <p class="mt-1 text-sm text-gray-500">Dejar en blanco para mantener la contraseña actual</p>
        </div>

        <div v-if="error" class="text-red-600 text-sm">
          {{ error }}
        </div>

        <div v-if="successMessage" class="text-green-600 text-sm">
          {{ successMessage }}
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            :disabled="loading"
            class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const loading = ref(false)
const error = ref(null)
const successMessage = ref(null)

const form = reactive({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  newPassword: ''
})

const handleSubmit = async () => {
  loading.value = true
  error.value = null
  successMessage.value = null

  try {
    await authStore.updateProfile({
      name: form.name,
      password: form.newPassword || undefined
    })
    successMessage.value = 'Perfil actualizado correctamente'
    form.newPassword = ''
  } catch (e) {
    error.value = e.response?.data?.message || 'Error al actualizar el perfil'
  } finally {
    loading.value = false
  }
}
</script>
