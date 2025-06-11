export default function ServiceOTT() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Service OTT</h1>
      <div className="prose max-w-none">
        <div className="grid gap-8">
          {/* Section Présentation OTT */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Notre Service OTT</h2>
            <div className="space-y-6">
              <p className="text-lg">
                Description du service OTT (Over-The-Top)&#8230;
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-orange-500 mb-3">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Streaming HD</h3>
                  <p className="text-gray-600">
                    Description de la fonctionnalité&#8230;
                  </p>
                </div>
                {/* Ajouter d&apos;autres fonctionnalités */}
              </div>
            </div>
          </section>

          {/* Section Offres */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Nos Offres</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Offre Basique</h3>
                <p className="text-3xl font-bold text-orange-500 mb-4">Prix</p>
                <ul className="text-gray-600 space-y-2 mb-6">
                  <li>Fonctionnalité 1</li>
                  <li>Fonctionnalité 2</li>
                  {/* Ajouter d&apos;autres fonctionnalités */}
                </ul>
                <button className="w-full bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                  S&apos;abonner
                </button>
              </div>
              {/* Ajouter d&apos;autres offres */}
            </div>
          </section>

          {/* Section Compatibilité */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Compatibilité</h2>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center p-4">
                <div className="text-gray-400 mb-2">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm">Smartphones</p>
              </div>
              {/* Ajouter d&apos;autres appareils compatibles */}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 