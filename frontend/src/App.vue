<template>
  <router-view></router-view>
</template> 

<script setup>
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script> 