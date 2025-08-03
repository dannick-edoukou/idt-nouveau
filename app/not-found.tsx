import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">Page non trouvée</h2>
      <p className="text-gray-500 mb-8">Désolé, nous n'avons pas pu trouver la page que vous recherchez.</p>
      <Link href="/" className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
        Retour à l'accueil
      </Link>
    </div>
  )
}
