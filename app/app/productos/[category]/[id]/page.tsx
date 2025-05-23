import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ShoppingCart, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductPage({ params }: { params: { category: string; id: string } }) {
  // Validar categoría
  const validCategories = ["windows", "office", "tarjetas"]
  if (!validCategories.includes(params.category)) {
    notFound()
  }

  // Obtener producto por ID
  const product = getProductById(params.category, Number.parseInt(params.id))
  if (!product) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <Link
            href={`/productos/${params.category}`}
            className="inline-flex items-center text-sm font-medium text-purple-800 hover:text-purple-900 mb-6"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Volver a {getCategoryName(params.category)}
          </Link>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full rounded-lg object-cover"
                style={{ height: "400px" }}
              />
              {product.badge && <Badge className="absolute top-4 right-4 bg-blue-600">{product.badge}</Badge>}
            </div>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-purple-900">{product.name}</h1>
                <p className="mt-2 text-gray-500">{product.description}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-purple-900">{product.price} Bs.</div>
                {product.oldPrice && <div className="text-xl text-gray-500 line-through">{product.oldPrice} Bs.</div>}
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Características:</h3>
                <ul className="space-y-1">
                  {getProductFeatures(params.category).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <Button className="w-full bg-purple-800 hover:bg-purple-900 text-white">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Añadir al carrito
                </Button>
                <Button variant="outline" className="w-full border-purple-800 text-purple-800 hover:bg-purple-100">
                  Comprar ahora
                </Button>
              </div>

              <div className="rounded-lg bg-purple-50 p-4">
                <h3 className="font-medium text-purple-900">Información de entrega:</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Entrega inmediata por correo electrónico después de la confirmación del pago.
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="description" className="mt-12">
            <TabsList className="w-full border-b justify-start rounded-none bg-transparent h-auto p-0">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-800 data-[state=active]:bg-transparent text-gray-600 data-[state=active]:text-purple-900 px-4 py-2"
              >
                Descripción
              </TabsTrigger>
              <TabsTrigger
                value="requirements"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-800 data-[state=active]:bg-transparent text-gray-600 data-[state=active]:text-purple-900 px-4 py-2"
              >
                Requisitos
              </TabsTrigger>
              <TabsTrigger
                value="installation"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-800 data-[state=active]:bg-transparent text-gray-600 data-[state=active]:text-purple-900 px-4 py-2"
              >
                Instalación
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <div className="prose max-w-none">
                <p>{getProductDescription(params.category, product.name)}</p>
              </div>
            </TabsContent>
            <TabsContent value="requirements" className="pt-6">
              <div className="prose max-w-none">
                <h3>Requisitos del sistema</h3>
                <ul>
                  {getProductRequirements(params.category).map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="installation" className="pt-6">
              <div className="prose max-w-none">
                <h3>Guía de instalación</h3>
                <ol>
                  {getInstallationSteps(params.category).map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function getProductById(category: string, id: number) {
  // Datos de ejemplo para cada categoría
  const productsByCategory: Record<string, any[]> = {
    windows: [
      {
        id: 1,
        name: "Windows 11 Pro",
        price: 350,
        image: "/placeholder.svg?height=400&width=600",
        description: "Licencia digital - Entrega inmediata",
        badge: "Más vendido",
      },
      {
        id: 2,
        name: "Windows 10 Home",
        price: 280,
        image: "/placeholder.svg?height=400&width=600",
        description: "Licencia digital - Entrega inmediata",
      },
      {
        id: 3,
        name: "Windows 11 Home",
        price: 320,
        image: "/placeholder.svg?height=400&width=600",
        description: "Licencia digital - Entrega inmediata",
      },
      {
        id: 4,
        name: "Windows 10 Pro",
        price: 300,
        oldPrice: 350,
        image: "/placeholder.svg?height=400&width=600",
        description: "Licencia digital - Entrega inmediata",
        badge: "Oferta",
      },
    ],
    office: [
      {
        id: 1,
        name: "Office 2021 Professional Plus",
        price: 420,
        oldPrice: 480,
        image: "/placeholder.svg?height=400&width=600",
        description: "Licencia digital - Entrega inmediata",
        badge: "Oferta",
      },
      {
        id: 2,
        name: "Office 2019 Home & Business",
        price: 380,
        image: "/placeholder.svg?height=400&width=600",
        description: "Licencia digital - Entrega inmediata",
      },
    ],
    tarjetas: [
      {
        id: 1,
        name: "Tarjeta Steam 50 USD",
        price: 380,
        image: "/placeholder.svg?height=400&width=600",
        description: "Código digital - Entrega inmediata",
        badge: "Nuevo",
      },
      {
        id: 2,
        name: "Tarjeta Netflix 30 USD",
        price: 230,
        image: "/placeholder.svg?height=400&width=600",
        description: "Código digital - Entrega inmediata",
      },
    ],
  }

  const products = productsByCategory[category] || []
  return products.find((product) => product.id === id)
}

function getCategoryName(category: string) {
  const names: Record<string, string> = {
    windows: "Windows",
    office: "Office",
    tarjetas: "Tarjetas de Regalo",
  }
  return names[category] || category
}

function getProductFeatures(category: string) {
  const features: Record<string, string[]> = {
    windows: [
      "Licencia original de Microsoft",
      "Activación digital permanente",
      "Soporte técnico incluido",
      "Actualizaciones garantizadas",
      "Compatible con todas las aplicaciones de Windows",
      "Instalación en 1 PC",
    ],
    office: [
      "Licencia original de Microsoft",
      "Versión completa con todas las aplicaciones",
      "Instalación en 1 PC",
      "Licencia de por vida",
      "Soporte técnico incluido",
      "Sin suscripción mensual",
    ],
    tarjetas: [
      "Código digital original",
      "Entrega inmediata por correo electrónico",
      "Instrucciones de canje incluidas",
      "Validez internacional",
      "Soporte en caso de problemas de activación",
    ],
  }
  return features[category] || []
}

function getProductDescription(category: string, productName: string) {
  const descriptions: Record<string, Record<string, string>> = {
    windows: {
      "Windows 11 Pro":
        "Windows 11 Pro es la versión más avanzada del sistema operativo de Microsoft, diseñada para profesionales y empresas. Incluye todas las características de Windows 11 Home, más herramientas adicionales de seguridad, administración y productividad. Con Windows 11 Pro, obtienes BitLocker para cifrado de datos, Windows Information Protection, acceso remoto al escritorio, Hyper-V para virtualización, y mucho más. Esta licencia es digital, permanente y te permite instalar Windows 11 Pro en un solo equipo.",
      "Windows 10 Home":
        "Windows 10 Home es la versión estándar del sistema operativo de Microsoft, perfecta para uso personal y familiar. Incluye todas las características esenciales como el menú Inicio, Microsoft Edge, Cortana, y Windows Hello para inicio de sesión biométrico. Esta licencia es digital, permanente y te permite instalar Windows 10 Home en un solo equipo.",
    },
    office: {
      "Office 2021 Professional Plus":
        "Microsoft Office 2021 Professional Plus es la suite ofimática más completa de Microsoft, que incluye Word, Excel, PowerPoint, Outlook, Publisher, Access y OneNote. Esta versión ofrece todas las herramientas necesarias para la productividad profesional, con licencia permanente sin necesidad de suscripción mensual. Ideal para profesionales y empresas que necesitan el conjunto completo de aplicaciones de Office.",
      "Office 2019 Home & Business":
        "Microsoft Office 2019 Home & Business incluye las aplicaciones esenciales para la productividad: Word, Excel, PowerPoint, Outlook y OneNote. Esta versión está diseñada para pequeñas empresas y uso doméstico, con licencia permanente sin necesidad de suscripción mensual.",
    },
    tarjetas: {
      "Tarjeta Steam 50 USD":
        "La tarjeta de regalo Steam de 50 USD te permite añadir fondos a tu cuenta de Steam para comprar juegos, DLC, hardware, y más. Es la forma perfecta de regalar a los amantes de los videojuegos, permitiéndoles elegir exactamente lo que quieren de la extensa biblioteca de Steam.",
      "Tarjeta Netflix 30 USD":
        "La tarjeta de regalo Netflix de 30 USD te permite pagar por el servicio de streaming sin necesidad de una tarjeta de crédito. Puedes usarla para crear una nueva cuenta o añadir saldo a una cuenta existente, disfrutando de miles de películas y series en cualquier dispositivo compatible.",
    },
  }

  return descriptions[category]?.[productName] || "Descripción no disponible."
}

function getProductRequirements(category: string) {
  const requirements: Record<string, string[]> = {
    windows: [
      "Procesador: 1 GHz o más rápido con 2 o más núcleos",
      "RAM: 4 GB o más",
      "Almacenamiento: 64 GB o más",
      "Tarjeta gráfica: Compatible con DirectX 12 o posterior",
      'Pantalla: 9" o más grande, resolución HD (720p)',
      "Conexión a Internet para la configuración inicial",
    ],
    office: [
      "Sistema operativo: Windows 10 o posterior, o macOS",
      "Procesador: 1.6 GHz o más rápido, 2 núcleos",
      "RAM: 4 GB (64 bits)",
      "Almacenamiento: 4 GB de espacio disponible",
      "Resolución de pantalla: 1280 x 768",
    ],
    tarjetas: [
      "Cuenta activa en la plataforma correspondiente",
      "Conexión a Internet para canjear el código",
      "Para Steam: Cliente Steam instalado",
      "Para Netflix: Dispositivo compatible con Netflix",
      "Para Spotify: Cuenta de Spotify (gratuita o premium)",
    ],
  }
  return requirements[category] || []
}

function getInstallationSteps(category: string) {
  const steps: Record<string, string[]> = {
    windows: [
      "Descarga la herramienta de creación de medios de Windows desde el sitio web oficial de Microsoft",
      "Crea una unidad USB de instalación siguiendo las instrucciones",
      "Inicia tu PC desde la unidad USB",
      "Sigue el asistente de instalación de Windows",
      "Cuando se te solicite, ingresa la clave de producto que te enviamos",
      "Completa la configuración inicial de Windows",
      "Verifica la activación en Configuración > Sistema > Acerca de",
    ],
    office: [
      "Visita setup.office.com",
      "Inicia sesión con tu cuenta de Microsoft",
      "Ingresa la clave de producto que te enviamos",
      "Selecciona tu idioma y haz clic en 'Instalar'",
      "Sigue las instrucciones en pantalla para completar la instalación",
      "Abre cualquier aplicación de Office y activa el producto cuando se te solicite",
    ],
    tarjetas: [
      "Inicia sesión en tu cuenta de la plataforma correspondiente",
      "Busca la sección 'Canjear código' o 'Canjear tarjeta de regalo'",
      "Ingresa el código exactamente como aparece en el correo electrónico",
      "Confirma el canje",
      "Verifica que el saldo se haya añadido a tu cuenta",
    ],
  }
  return steps[category] || []
}
