export default function BouquetsTV() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nos Bouquets TV</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Cartes des bouquets à compléter */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Bouquet Standard</h2>
          <p className="text-gray-600 mb-4">
            Description du bouquet...
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Chaîne 1</li>
            <li>Chaîne 2</li>
            {/* Ajouter d'autres chaînes */}
          </ul>
        </div>
        {/* Ajouter d'autres bouquets */}
      </div>
    </main>
  )
} 