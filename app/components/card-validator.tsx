"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function CardValidator() {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean
    message: string
  } | null>(null)

  // Función para validar el número de tarjeta usando el algoritmo de Luhn
  const validateCardNumber = (number: string) => {
    const digits = number.replace(/\D/g, "")
    if (digits.length < 13 || digits.length > 19) return false

    let sum = 0
    let double = false

    // Algoritmo de Luhn
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = Number.parseInt(digits.charAt(i))

      if (double) {
        digit *= 2
        if (digit > 9) digit -= 9
      }

      sum += digit
      double = !double
    }

    return sum % 10 === 0
  }

  // Función para validar la fecha de expiración
  const validateExpiryDate = (date: string) => {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
    if (!regex.test(date)) return false

    const [month, year] = date.split("/")
    const expiryDate = new Date(2000 + Number.parseInt(year), Number.parseInt(month) - 1, 1)
    const today = new Date()

    return expiryDate > today
  }

  // Función para validar el CVV
  const validateCvv = (cvv: string) => {
    const digits = cvv.replace(/\D/g, "")
    return digits.length >= 3 && digits.length <= 4
  }

  // Función para formatear el número de tarjeta mientras se escribe
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "")
    const groups = []

    for (let i = 0; i < digits.length; i += 4) {
      groups.push(digits.slice(i, i + 4))
    }

    return groups.join(" ").trim()
  }

  // Función para formatear la fecha de expiración mientras se escribe
  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, "")

    if (digits.length <= 2) {
      return digits
    }

    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value)
    setCardNumber(formattedValue)
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value)
    setExpiryDate(formattedValue)
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "")
    setCvv(digits.slice(0, 4))
  }

  const validateCard = () => {
    const isCardNumberValid = validateCardNumber(cardNumber)
    const isExpiryDateValid = validateExpiryDate(expiryDate)
    const isCvvValid = validateCvv(cvv)

    if (!isCardNumberValid) {
      setValidationResult({
        isValid: false,
        message: "El número de tarjeta no es válido.",
      })
    } else if (!isExpiryDateValid) {
      setValidationResult({
        isValid: false,
        message: "La fecha de expiración no es válida o está vencida.",
      })
    } else if (!isCvvValid) {
      setValidationResult({
        isValid: false,
        message: "El código CVV no es válido.",
      })
    } else {
      setValidationResult({
        isValid: true,
        message: "La tarjeta es válida y puede ser utilizada para el pago.",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="card-number">Número de tarjeta</Label>
        <Input
          id="card-number"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={handleCardNumberChange}
          maxLength={19}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry-date">Fecha de expiración (MM/AA)</Label>
          <Input
            id="expiry-date"
            placeholder="MM/AA"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            maxLength={5}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input id="cvv" placeholder="123" value={cvv} onChange={handleCvvChange} maxLength={4} />
        </div>
      </div>
      <Button
        onClick={validateCard}
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={!cardNumber || !expiryDate || !cvv}
      >
        <CreditCard className="mr-2 h-4 w-4" />
        Validar tarjeta
      </Button>

      {validationResult && (
        <Alert variant={validationResult.isValid ? "default" : "destructive"}>
          <AlertTitle>{validationResult.isValid ? "Tarjeta válida" : "Error de validación"}</AlertTitle>
          <AlertDescription>{validationResult.message}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
