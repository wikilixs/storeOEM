<script setup>
const steps = [
  {
    title: 'Paso 1: Descarga la herramienta de instalación',
    description: 'Descarga la herramienta oficial de Microsoft Media Creation Tool desde el sitio web de Microsoft.',
    icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
  },
  {
    title: 'Paso 2: Crea el medio de instalación',
    description: 'Ejecuta la herramienta y selecciona "Crear medio de instalación" para crear un USB booteable.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  },
  {
    title: 'Paso 3: Instala Windows',
    description: 'Inicia tu PC desde el USB y sigue el asistente de instalación de Windows.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
  },
  {
    title: 'Paso 4: Ingresa tu clave de producto',
    description: 'Una vez instalado Windows, ingresa la clave de producto que recibiste en tu correo.',
    icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
  },
  {
    title: 'Paso 5: Activa Windows',
    description: 'Windows se activará automáticamente al conectarse a Internet.',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
  }
]
</script>

<template>
  <div class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Tutorial de Activación de Windows
        </h1>
        <p class="mt-4 text-xl text-gray-500">
          Sigue estos pasos para instalar y activar tu licencia de Windows
        </p>
      </div>

      <div class="mt-16">
        <div class="space-y-12">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="relative"
          >
            <!-- Línea conectora -->
            <div
              v-if="index < steps.length - 1"
              class="absolute top-4 left-4 -ml-px mt-4 h-full w-0.5 bg-gray-200"
              aria-hidden="true"
            ></div>

            <div class="relative flex items-start group">
              <div class="flex-shrink-0">
                <span
                  class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 group-hover:bg-purple-800 transition-colors"
                >
                  <svg
                    class="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      :d="step.icon"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                </span>
              </div>
              <div class="ml-4 min-w-0 flex-1">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">
                    {{ step.title }}
                  </h3>
                  <p class="mt-2 text-sm text-gray-500">
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <div class="rounded-md shadow inline-flex">
          <router-link
            to="/productos/windows"
            class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
          >
            Ver licencias de Windows
            <svg
              class="ml-2 -mr-1 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template> 