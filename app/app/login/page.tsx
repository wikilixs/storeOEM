import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-900">Bienvenido a TiendaOEM</h1>
            <p className="text-gray-500 mt-2">Inicia sesión o crea una cuenta para continuar</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" placeholder="tu@email.com" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link href="/recuperar-contrasena" className="text-sm text-purple-800 hover:text-purple-900">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input id="password" type="password" />
              </div>
              <Button className="w-full bg-purple-800 hover:bg-purple-900">Iniciar Sesión</Button>
            </TabsContent>
            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Nombre completo</Label>
                <Input id="register-name" placeholder="Juan Pérez" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Correo electrónico</Label>
                <Input id="register-email" type="email" placeholder="tu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Contraseña</Label>
                <Input id="register-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Confirmar contraseña</Label>
                <Input id="register-confirm-password" type="password" />
              </div>
              <Button className="w-full bg-purple-800 hover:bg-purple-900">Crear Cuenta</Button>
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Al iniciar sesión o registrarte, aceptas nuestros{" "}
              <Link href="/terminos" className="text-purple-800 hover:text-purple-900 underline">
                Términos y Condiciones
              </Link>{" "}
              y{" "}
              <Link href="/privacidad" className="text-purple-800 hover:text-purple-900 underline">
                Política de Privacidad
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
