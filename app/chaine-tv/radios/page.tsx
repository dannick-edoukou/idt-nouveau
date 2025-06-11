export default function Radios() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nos Radios</h1>
      <div className="prose max-w-none">
        <div className="grid gap-8">
          {/* Section Liste des Radios */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Stations de Radio Disponibles</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Carte Radio */}
              <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  {/* Logo de la radio */}
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Logo Radio</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">Nom de la Radio</h3>
                  <p className="text-gray-600 mb-4">
                    Description courte de la radio...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Fréquence: XX.XX MHz</span>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm">
                      Écouter
                    </button>
                  </div>
                </div>
              </div>
              {/* Ajouter d'autres radios */}
            </div>
          </section>

          {/* Section Catégories */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Catégories</h2>
            <div className="grid gap-4 md:grid-cols-4">
              <button className="bg-gray-50 hover:bg-orange-50 text-gray-800 px-4 py-2 rounded-lg transition-colors">
                Toutes les radios
              </button>
              <button className="bg-gray-50 hover:bg-orange-50 text-gray-800 px-4 py-2 rounded-lg transition-colors">
                Musique
              </button>
              <button className="bg-gray-50 hover:bg-orange-50 text-gray-800 px-4 py-2 rounded-lg transition-colors">
                Information
              </button>
              <button className="bg-gray-50 hover:bg-orange-50 text-gray-800 px-4 py-2 rounded-lg transition-colors">
                Sport
              </button>
            </div>
          </section>

          {/* Section Écoute en Direct */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Écoute en Direct</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-medium">Radio en cours</h3>
                  <p className="text-gray-600">Titre de l'émission en cours</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="text-gray-600 hover:text-orange-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button className="text-gray-600 hover:text-orange-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 