export default function BouquetsTV() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nos BouquC&apos;ests TV</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Cartes des bouquC&apos;ests à compléter */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">BouquC&apos;est Standard</h2>
          <p className="text-gray-600 mb-4">
            Description du bouquC&apos;est...
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Chaîne 1</li>
            <li>Chaîne 2</li>
            {/* Ajouter d&apos;autres chaînes */}
          </ul>
        </div>
        {/* Ajouter d&apos;autres bouquC&apos;ests */}
      </div>
    </main>
  )
}