import { notFound } from "next/navigation"
import Link from "next/link"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function CategoryPage({ params }: { params: { category: string } }) {
  // Validar categoría
  const validCategories = ["windows", "office", "tarjetas"]
  if (!validCategories.includes(params.category)) {
    notFound()
  }

  // Datos de ejemplo para cada categoría
  const categoryData: Record<string, { title: string; description: string }> = {
    windows: {
      title: "Licencias Windows OEM",
      description: "Licencias originales para Windows 10 y Windows 11 a los mejores precios en Bolivia",
    },
    office: {
      title: "Licencias Microsoft Office",
      description: "Licencias originales para Microsoft Office a los mejores precios en Bolivia",
    },
    tarjetas: {
      title: "Tarjetas de Regalo",
      description: "Tarjetas de regalo para tus plataformas favoritas: Steam, Netflix, Spotify y más",
    },
  }

  // Productos de ejemplo para cada categoría
  const products = getProductsByCategory(params.category)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-900 via-purple-800 to-blue-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  {categoryData[params.category].title}
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  {categoryData[params.category].description}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link href={`/productos/${params.category}/${product.id}`} key={product.id}>
                  <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      {product.badge && <Badge className="absolute top-2 right-2 bg-blue-600">{product.badge}</Badge>}
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg text-purple-900">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-gray-500">{product.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 flex justify-between items-center">
                      <p className="text-xl font-bold text-purple-900">{product.price} Bs.</p>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                        Ver detalles
                      </Badge>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function getProductsByCategory(category: string) {
  // Datos de ejemplo para cada categoría
  const productsByCategory: Record<string, any[]> = {
    windows: [
      {
        id: 1,
        name: "Windows 11 Pro",
        price: 350,
        image: "/placeholder.svg?height=200&width=300",
        description: "Licencia digital - Entrega inmediata",
        badge: "Más vendido",
      },
      {
        id: 2,
        name: "Windows 10 Home",
        price: 280,
        image: "/placeholder.svg?height=200&width=300",
        description: "Licencia digital - Entrega inmediata",
      },
      {
        id: 3,
        name: "Windows 11 Home",
        price: 320,
        image: "/placeholder.svg?height=200&width=300",
        description: "Licencia digital - Entrega inmediata",
      },
      {
        id: 4,
        name: "Windows 10 Pro",
        price: 300,
        image: "/placeholder.svg?height=200&width=300",
        description: "Licencia digital - Entrega inmediata",
        badge: "Oferta",
      },
      {
        id: 5,
        name: "Windows 11 Enterprise",
        price: 450,
        image: "/placeholder.svg?height=200&width=300",
        description: "Licencia digital - Entrega inmediata",
      },
      {
        id: 6,
        name: "Windows 10 Enterprise",
        price: 420,
        image: "/placeholder.svg?height=200&width=300",
        description: "Licencia digital - Entrega inmediata",
      },
    ],
    office: [
      {
        id: 1,
        name: "Office 2021 Professional Plus",
        price: 420,
        image: "/placeholder.svg?height=200&width=300",
        description: "Licencia digital - Entrega inmediata",
        badge: "Oferta",
      },
      {
        id: 2,
        name: "Office 2019 Home & Business",
        price: 380,
        image: "/placeholder.svg?height=200&width=300",
        description: "Licencia digital - Entrega inmediata",
      },
      {
        id: 3,
        name: "Office 2021 Home & Student",
        price: 350,
        image: "/placeholder.svg?height=200&width=300",
        description: "Licencia digital - Entrega inmediata",
      },
      {
        id: 4,
        name: "Microsoft 365 Personal (1 año)",
        price: 300,
        image: "/placeholder.svg?height=200&width=300",
        description: "Suscripción digital - Entrega inmediata",
        badge: "Más vendido",
      },
      {
        id: 5,
        name: "Microsoft 365 Familia (1 año)",
        price: 400,
        image: "/placeholder.svg?height=200&width=300",
        description: "Suscripción digital - Entrega inmediata",
      },
      {
        id: 6,
        name: "Office 2019 Professional Plus",
        price: 390,
        image: "/placeholder.svg?height=200&width=300",
        description: "Licencia digital - Entrega inmediata",
      },
    ],
    tarjetas: [
      {
        id: 1,
        name: "Tarjeta Steam 50 USD",
        price: 380,
        image: "/placeholder.svg?height=200&width=300",
        description: "Código digital - Entrega inmediata",
        badge: "Nuevo",
      },
      {
        id: 2,
        name: "Tarjeta Netflix 30 USD",
        price: 230,
        image: "/placeholder.svg?height=200&width=300",
        description: "Código digital - Entrega inmediata",
      },
      {
        id: 3,
        name: "Tarjeta Spotify Premium (3 meses)",
        price: 180,
        image: "/placeholder.svg?height=200&width=300",
        description: "Código digital - Entrega inmediata",
      },
      {
        id: 4,
        name: "Tarjeta PlayStation 25 USD",
        price: 190,
        image: "/placeholder.svg?height=200&width=300",
        description: "Código digital - Entrega inmediata",
        badge: "Más vendido",
      },
      {
        id: 5,
        name: "Tarjeta Xbox 50 USD",
        price: 380,
        image: "/placeholder.svg?height=200&width=300",
        description: "Código digital - Entrega inmediata",
      },
      {
        id: 6,
        name: "Tarjeta Google Play 20 USD",
        price: 150,
        image: "/placeholder.svg?height=200&width=300",
        description: "Código digital - Entrega inmediata",
      },
    ],
  }

  return productsByCategory[category] || []
}
