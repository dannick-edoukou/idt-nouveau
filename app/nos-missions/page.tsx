export default function NosMissions() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nos Missions</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Cartes des missions à compléter */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Mission 1</h2>
          <p className="text-gray-600">
            Description de la mission...
          </p>
        </div>
        {/* Ajouter d'autres cartes de missions */}
      </div>
    </main>
  )
} 