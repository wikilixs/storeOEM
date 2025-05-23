<script setup>
const currentYear = new Date().getFullYear()

const paymentMethods = [
  {
    name: 'Tarjetas de crédito/débito',
    icon: 'M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm2 3h12v2H6V9zm0 4h4v2H6v-2z'
  },
  {
    name: 'Transferencia bancaria',
    icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 14h16v-3H4v3zm0-5h16v-2H4v2zm0-4h16V6H4v3z'
  },
  {
    name: 'PayPal',
    icon: 'M17.786 12.673c-.287 1.243-1.756 2.673-4.182 2.673h-.906a.75.75 0 00-.738.873l.394 2.441a.75.75 0 00.738.627h2.645a.75.75 0 01.737.873l-.143.627a.75.75 0 01-.738.627h-2.645a.75.75 0 01-.738-.627l-.394-2.441a.75.75 0 00-.738-.627h-2.645a.75.75 0 01-.738-.873l1.575-6.873a.75.75 0 01.738-.627h5.29c1.756 0 3.18.873 3.57 2.673z'
  }
]

const socialLinks = [
  {
    name: 'WhatsApp',
    url: 'https://wa.me/123456789',
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: 'M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-8 12a4 4 0 110-8 4 4 0 010 8zm8-10a1 1 0 110-2 1 1 0 010 2z'
  }
]
</script>

<template>
  <footer class="bg-white border-t mt-auto">
    <div class="w-full px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1">
          <h3 class="text-lg font-semibold text-purple-900 mb-4">OEM Store</h3>
          <p class="text-gray-600 mb-4">
            Tu tienda de confianza para licencias originales de software y tarjetas de regalo.
          </p>
          <div class="flex space-x-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url"
              :title="social.name"
              class="text-gray-400 hover:text-purple-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="social.icon" />
              </svg>
            </a>
          </div>
        </div>

        <div class="col-span-1">
          <h3 class="text-lg font-semibold text-purple-900 mb-4">Contacto</h3>
          <div class="space-y-3">
            <a href="mailto:soporte@oemstore.com" class="flex items-center text-gray-600 hover:text-purple-900 transition-colors">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              soporte@oemstore.com
            </a>
            <p class="flex items-center text-gray-600">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Lun-Vie: 9:00-18:00
            </p>
          </div>
        </div>

        <div class="col-span-1">
          <h3 class="text-lg font-semibold text-purple-900 mb-4">Enlaces</h3>
          <div class="space-y-2">
            <router-link 
              v-for="(link, index) in ['Tutorial de Activación', 'Términos y Condiciones', 'Política de Privacidad', 'Preguntas Frecuentes']"
              :key="index"
              :to="'/' + link.toLowerCase().replace(/ /g, '-')"
              class="block text-gray-600 hover:text-purple-900 transition-colors"
            >
              {{ link }}
            </router-link>
          </div>
        </div>

        <div class="col-span-1">
          <h3 class="text-lg font-semibold text-purple-900 mb-4">Métodos de Pago</h3>
          <div class="grid grid-cols-2 gap-4">
            <div 
              v-for="method in paymentMethods" 
              :key="method.name"
              class="flex flex-col items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <svg class="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="method.icon" />
              </svg>
              <span class="mt-2 text-sm text-gray-600 text-center">{{ method.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t">
        <div class="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
          <p>&copy; {{ currentYear }} OEM Store. Todos los derechos reservados.</p>
          <div class="mt-4 md:mt-0 flex items-center space-x-6">
            <div class="flex items-center text-gray-600">
              <svg class="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span class="text-sm">SSL Secure</span>
            </div>
            <div class="flex items-center text-gray-600">
              <svg class="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span class="text-sm">Verified Business</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
