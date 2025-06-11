export default function Fonctionnement() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Fonctionnement de l'IDT</h1>
      <div className="prose max-w-none">
        <div className="grid gap-8">
          {/* Section Organisation */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Organisation</h2>
            <div className="space-y-4">
              <p className="text-lg">
                Description de l'organisation interne de l'IDT...
              </p>
              {/* Structure organisationnelle à compléter */}
            </div>
          </section>

          {/* Section Processus */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Processus de Travail</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-xl font-medium mb-2">Processus 1</h3>
                <p className="text-gray-600">
                  Description du processus...
                </p>
              </div>
              {/* Ajouter d'autres processus */}
            </div>
          </section>

          {/* Section Services */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Services et Procédures</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Service 1</h3>
                <p className="text-gray-600">
                  Description du service et de ses procédures...
                </p>
              </div>
              {/* Ajouter d'autres services */}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 