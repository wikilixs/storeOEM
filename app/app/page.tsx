import Link from "next/link"

import { Button } from "@/components/ui/button"
import { FeaturedProducts } from "@/components/featured-products"
import { ProductCategories } from "@/components/product-categories"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-900 via-purple-800 to-blue-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Claves OEM y Tarjetas de Regalo
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Licencias originales para Windows y Office a los mejores precios en Bolivia
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/productos/windows">
                  <Button className="bg-white text-purple-900 hover:bg-gray-100">Ver Windows</Button>
                </Link>
                <Link href="/productos/office">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">Ver Office</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-12 text-purple-900">
              Categorías de Productos
            </h2>
            <ProductCategories />
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-12 text-purple-900">
              Productos Destacados
            </h2>
            <FeaturedProducts />
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-purple-900">
                  ¿Por qué comprar con nosotros?
                </h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-purple-500" />
                    <span>Claves 100% originales y garantizadas</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-purple-500" />
                    <span>Entrega inmediata por correo electrónico</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-purple-500" />
                    <span>Soporte técnico incluido</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-purple-500" />
                    <span>Precios en bolivianos (BOB)</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-purple-500" />
                    <span>Pago seguro con tarjetas de débito y crédito</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <img
                  alt="Seguridad de compra"
                  className="rounded-lg object-cover"
                  height="400"
                  src="/placeholder.svg?height=400&width=400"
                  style={{
                    aspectRatio: "400/400",
                    objectFit: "cover",
                  }}
                  width="400"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
