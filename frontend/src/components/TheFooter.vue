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
  <footer class="bg-white border-t border-gray-200">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div>
          <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
            Productos
          </h3>
          <ul class="mt-4 space-y-4">
            <li>
              <router-link to="/productos/windows" class="text-base text-gray-500 hover:text-purple-600">
                Windows
              </router-link>
            </li>
            <li>
              <router-link to="/productos/office" class="text-base text-gray-500 hover:text-purple-600">
                Office
              </router-link>
            </li>
            <li>
              <router-link to="/productos/tarjetas" class="text-base text-gray-500 hover:text-purple-600">
                Tarjetas de Regalo
              </router-link>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
            Soporte
          </h3>
          <ul class="mt-4 space-y-4">
            <li>
              <router-link to="/soporte" class="text-base text-gray-500 hover:text-purple-600">
                Centro de Ayuda
              </router-link>
            </li>
            <li>
              <router-link to="/preguntas" class="text-base text-gray-500 hover:text-purple-600">
                Preguntas Frecuentes
              </router-link>
            </li>
            <li>
              <router-link to="/contacto" class="text-base text-gray-500 hover:text-purple-600">
                Contacto
              </router-link>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
            Legal
          </h3>
          <ul class="mt-4 space-y-4">
            <li>
              <router-link to="/terminos" class="text-base text-gray-500 hover:text-purple-600">
                Términos y Condiciones
              </router-link>
            </li>
            <li>
              <router-link to="/privacidad" class="text-base text-gray-500 hover:text-purple-600">
                Política de Privacidad
            </router-link>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
            Empresa
          </h3>
          <ul class="mt-4 space-y-4">
            <li>
              <router-link to="/nosotros" class="text-base text-gray-500 hover:text-purple-600">
                Sobre Nosotros
              </router-link>
            </li>
            <li>
              <a href="mailto:info@oemstore.com" class="text-base text-gray-500 hover:text-purple-600">
                info@oemstore.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-12 border-t border-gray-200 pt-8">
        <p class="text-base text-gray-400 text-center">
          &copy; {{ new Date().getFullYear() }} OEM Store. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>
