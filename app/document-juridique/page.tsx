export default function DocumentJuridique() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Documents Juridiques</h1>
      <div className="prose max-w-none">
        <div className="grid gap-6">
          {/* Section Statuts */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Statuts et Réglementation</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-medium mb-2">Statuts de l&apos;IDT</h3>
                <p className="text-gray-600 mb-3">
                  Description du document...
                </p>
                <a href="#" className="text-orange-500 hover:text-orange-600 inline-flex items-center">
                  Télécharger le document
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
              {/* Ajouter d&apos;autres documents */}
            </div>
          </section>

          {/* Section Textes Réglementaires */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Textes Réglementaires</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold mb-2">Document 1</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Description du texte réglementaire...
                </p>
                <a href="#" className="text-orange-500 hover:text-orange-600 text-sm inline-flex items-center">
                  Consulter le document
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
              </div>
              {/* Ajouter d&apos;autres textes réglementaires */}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 