"use client"

import { useState } from "react"
import Link from "next/link"
import { Trash2, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CardValidator } from "@/components/card-validator"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Windows 11 Pro",
      price: 350,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      id: 2,
      name: "Office 2021 Professional Plus",
      price: 420,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=120",
    },
  ])

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.13 // IVA en Bolivia (13%)
  const total = subtotal + tax

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <h1 className="text-3xl font-bold text-purple-900 mb-8">Carrito de Compras</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tu carrito está vacío</h2>
              <p className="text-gray-500 mb-8">Parece que aún no has añadido productos a tu carrito.</p>
              <Link href="/">
                <Button className="bg-purple-800 hover:bg-purple-900">Continuar comprando</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="rounded-lg border shadow-sm">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Productos</h2>
                    <div className="divide-y">
                      {cartItems.map((item) => (
                        <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="rounded-md w-20 h-20 object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">Licencia digital - Entrega inmediata</p>
                            <div className="mt-1 text-purple-900 font-semibold">{item.price} Bs.</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                              className="h-8 w-14 text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="rounded-lg border shadow-sm">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{subtotal.toFixed(2)} Bs.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">IVA (13%)</span>
                        <span>{tax.toFixed(2)} Bs.</span>
                      </div>
                      <div className="border-t pt-4 flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-purple-900">{total.toFixed(2)} Bs.</span>
                      </div>
                    </div>
                    <Button className="w-full mt-6 bg-purple-800 hover:bg-purple-900">
                      Proceder al pago
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-8 rounded-lg border shadow-sm">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Validar tarjeta</h2>
                    <p className="text-sm text-gray-500 mb-4">
                      Verifica si tu tarjeta es válida antes de proceder al pago.
                    </p>
                    <CardValidator />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
