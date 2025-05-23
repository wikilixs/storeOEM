<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const user = authStore.user
</script>

<template>
  <div class="w-full py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Perfil de Usuario
          </h3>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Email
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ user?.email }}
              </dd>
            </div>
            <!-- Add more user details here as needed -->
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
