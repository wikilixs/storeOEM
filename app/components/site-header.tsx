"use client"

import Link from "next/link"
import { ShoppingCart, Menu, Search } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold text-purple-800">TiendaOEM</span>
        </Link>
        <div className="hidden md:flex md:flex-1">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/productos/windows" className="text-purple-900 hover:text-purple-700 transition-colors">
              Windows
            </Link>
            <Link href="/productos/office" className="text-purple-900 hover:text-purple-700 transition-colors">
              Office
            </Link>
            <Link href="/productos/tarjetas" className="text-purple-900 hover:text-purple-700 transition-colors">
              Tarjetas de Regalo
            </Link>
            <Link href="/soporte" className="text-purple-900 hover:text-purple-700 transition-colors">
              Soporte
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-4 ml-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="w-64 pl-8 rounded-md border border-gray-300"
            />
          </div>
          <Link href="/carrito">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5 text-purple-900" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-xs text-white flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
          <Link href="/login">
            <Button className="bg-purple-800 text-white hover:bg-purple-900">Iniciar Sesión</Button>
          </Link>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden ml-auto">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <span className="text-purple-800">TiendaOEM</span>
              </Link>
              <Link href="/productos/windows" className="hover:text-purple-700">
                Windows
              </Link>
              <Link href="/productos/office" className="hover:text-purple-700">
                Office
              </Link>
              <Link href="/productos/tarjetas" className="hover:text-purple-700">
                Tarjetas de Regalo
              </Link>
              <Link href="/soporte" className="hover:text-purple-700">
                Soporte
              </Link>
              <Link href="/carrito" className="hover:text-purple-700">
                Carrito
              </Link>
              <Link href="/login" className="hover:text-purple-700">
                Iniciar Sesión
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
