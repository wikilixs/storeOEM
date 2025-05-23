import Link from "next/link"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function FeaturedProducts() {
  const featuredProducts = [
    {
      id: 1,
      name: "Windows 11 Pro",
      price: 350,
      image: "/placeholder.svg?height=200&width=300",
      category: "windows",
      badge: "Más vendido",
    },
    {
      id: 2,
      name: "Office 2021 Professional Plus",
      price: 420,
      image: "/placeholder.svg?height=200&width=300",
      category: "office",
      badge: "Oferta",
    },
    {
      id: 3,
      name: "Windows 10 Home",
      price: 280,
      image: "/placeholder.svg?height=200&width=300",
      category: "windows",
    },
    {
      id: 4,
      name: "Tarjeta Steam 50 USD",
      price: 380,
      image: "/placeholder.svg?height=200&width=300",
      category: "tarjetas",
      badge: "Nuevo",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <Link href={`/productos/${product.category}/${product.id}`} key={product.id}>
          <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
            <div className="relative">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
              {product.badge && <Badge className="absolute top-2 right-2 bg-blue-600">{product.badge}</Badge>}
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg text-purple-900">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-gray-500">Licencia digital - Entrega inmediata</p>
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
  )
}
