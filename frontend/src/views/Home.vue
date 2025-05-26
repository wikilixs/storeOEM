<script setup>
import ProductCategories from '@/components/ProductCategories.vue'
import FeaturedProducts from '@/components/FeaturedProducts.vue'
import { ref } from 'vue'

const steps = [
  {
    title: '¿Qué son las claves OEM?',
    description: 'Las licencias OEM son claves originales que vienen con equipos nuevos. Son permanentes y completamente legales.',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
  },
  {
    title: 'Activación Garantizada',
    description: 'Proceso sencillo de activación con soporte técnico incluido.',
    icon: 'M5 13l4 4L19 7'
  },
  {
    title: 'Tutorial de Activación',
    description: 'Aprende a activar tu licencia paso a paso.',
    icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'
  }
]

const featuresList = [
  'Licencias 100% originales y permanentes',
  'Activación instantánea garantizada',
  'Soporte técnico personalizado',
  'Actualizaciones incluidas de por vida',
  'Garantía de funcionamiento o devolución',
  'Métodos de pago seguros'
]

const tutorials = [
  {
    title: 'Guía de Windows',
    description: 'Aprende a activar tu licencia de Windows paso a paso',
    icon: 'M9 5l7 7-7 7'
  },
  {
    title: 'Guía de Office',
    description: 'Instala y activa tu suite de Office en minutos',
    icon: 'M19 14l-7 7m0 0l-7-7m7 7V3'
  }
]

const featuredProducts = ref([
  {
    id: 1,
    name: 'Windows 11 Pro',
    description: 'La última versión del sistema operativo de Microsoft',
    price: 299,
    link: '/productos/windows',
    icon: 'WindowIcon'
  },
  {
    id: 2,
    name: 'Office 365',
    description: 'Suite completa de productividad',
    price: 149,
    link: '/productos/office',
    icon: 'DocumentIcon'
  },
  {
    id: 3,
    name: 'Steam Gift Card',
    description: 'Para tus juegos favoritos',
    price: 150,
    link: '/productos/tarjetas',
    icon: 'GiftIcon'
  }
])

const features = ref([
  {
    name: 'Entrega inmediata',
    description: 'Recibe tus claves de activación al instante después de la compra.',
    icon: 'LightningBoltIcon'
  },
  {
    name: 'Soporte 24/7',
    description: 'Nuestro equipo está disponible para ayudarte en cualquier momento.',
    icon: 'SupportIcon'
  },
  {
    name: 'Garantía de por vida',
    description: 'Todas nuestras licencias tienen garantía de funcionamiento.',
    icon: 'ShieldCheckIcon'
  }
])
</script>

<template>
  <main>
    <!-- Hero Section -->
    <div class="relative bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block">Software Original</span>
                <span class="block text-purple-600">Precios Increíbles</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Las mejores licencias de Windows, Office y tarjetas de regalo para tus necesidades digitales.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <router-link
                    to="/productos"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
                  >
                    Ver productos
                  </router-link>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <router-link
                    to="/soporte"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 md:py-4 md:text-lg md:px-10"
                  >
                    Soporte técnico
                  </router-link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div class="h-56 w-full bg-gradient-to-r from-purple-500 to-purple-700 sm:h-72 md:h-96 lg:w-full lg:h-full"></div>
      </div>
    </div>

    <!-- Categories Section -->
    <section class="py-16">
      <div class="w-full px-4 md:px-6">
        <h2 class="text-3xl font-bold text-center mb-8">Nuestros Productos</h2>
        <ProductCategories />
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-16 bg-gray-50">
      <div class="w-full px-4 md:px-6">
        <h2 class="text-3xl font-bold text-purple-900 text-center mb-8">Productos Destacados</h2>
        <FeaturedProducts />
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gradient-to-br from-purple-50 to-white">
      <div class="w-full px-4">
        <div class="w-full">
          <h2 class="text-3xl font-bold text-purple-900 text-center mb-12">
            ¿Por qué elegirnos?
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="(feature, index) in featuresList"
              :key="index"
              class="flex items-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-50 rounded-lg mr-3">
                <svg class="w-2 h-2 text-purple-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                </svg>
              </div>
              <span class="text-sm text-gray-700 line-clamp-2">{{ feature }}</span>
              </div>
            </div>
        </div>
      </div>
    </section>

    <!-- Tutorial Section -->
    <section id="tutorial" class="py-12">
      <div class="w-full px-4">
        <h2 class="text-2xl font-bold text-purple-900 text-center mb-8">
          Tutoriales de Activación
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div
            v-for="(tutorial, index) in tutorials"
            :key="index"
            class="group flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-purple-50 rounded-lg mr-4">
              <svg class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tutorial.icon"/>
              </svg>
            </div>
            <div class="flex-grow min-w-0">
              <h3 class="text-base font-semibold text-purple-900 mb-1">{{ tutorial.title }}</h3>
              <p class="text-sm text-gray-600 mb-2 line-clamp-2">{{ tutorial.description }}</p>
              <div class="flex items-center text-purple-600 group-hover:text-purple-700">
                <span class="text-sm font-medium">Ver tutorial</span>
                <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// Iconos heroicons
const WindowIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  `
}

const DocumentIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  `
}

const GiftIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  `
}

const LightningBoltIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  `
}

const SupportIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  `
}

const ShieldCheckIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  `
}

export default {
  components: {
    WindowIcon,
    DocumentIcon,
    GiftIcon,
    LightningBoltIcon,
    SupportIcon,
    ShieldCheckIcon
  }
}
</script>
