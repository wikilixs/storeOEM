import Link from "next/link"
import { Monitor, FileText, Gift } from "lucide-react"

export function ProductCategories() {
  const categories = [
    {
      name: "Windows",
      icon: <Monitor className="h-10 w-10 text-purple-800" />,
      description: "Licencias OEM para Windows 10 y 11",
      link: "/productos/windows",
    },
    {
      name: "Office",
      icon: <FileText className="h-10 w-10 text-purple-800" />,
      description: "Licencias para Microsoft Office",
      link: "/productos/office",
    },
    {
      name: "Tarjetas de Regalo",
      icon: <Gift className="h-10 w-10 text-purple-800" />,
      description: "Steam, Netflix, Spotify y más",
      link: "/productos/tarjetas",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {categories.map((category) => (
        <Link
          href={category.link}
          key={category.name}
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-gray-200 transition-all hover:shadow-lg hover:border-purple-300"
        >
          <div className="p-3 rounded-full bg-purple-100 mb-4">{category.icon}</div>
          <h3 className="text-xl font-bold text-purple-900 mb-2">{category.name}</h3>
          <p className="text-center text-gray-600">{category.description}</p>
        </Link>
      ))}
    </div>
  )
}
