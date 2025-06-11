// import Image from "next/image";
import Link from "next/link";

export default function LocationPylone() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">L&apos;ocation de Pylône</h1>
      <div className="prose max-w-none">
        <div className="grid gap-8">
          {/* Section Présentation du Service */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Notre Service de L&apos;ocation</h2>
            <div className="space-y-4">
              <p className="text-lg">
                Description du service de l&apos;ocation de pylône...
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-xl font-medium mb-3">Avantages</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Avantage 1</li>
                    <li>Avantage 2</li>
                    {/* Ajouter d&apos;autres avantages */}
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-xl font-medium mb-3">Caractéristiques</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Caractéristique 1</li>
                    <li>Caractéristique 2</li>
                    {/* Ajouter d&apos;autres caractéristiques */}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section Tarifs et Conditions */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Tarifs et Conditions</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="border rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">Forfait Standard</h3>
                <p className="text-3xl font-bold text-orange-500 mb-4">Prix</p>
                <ul className="text-gray-600 space-y-2 mb-6">
                  <li>Caractéristique 1</li>
                  <li>Caractéristique 2</li>
                  {/* Ajouter d&apos;autres caractéristiques */}
                </ul>
                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                  Demander un devis
                </button>
              </div>
              {/* Ajouter d&apos;autres forfaits */}
            </div>
          </section>

          {/* Section Contact */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Contactez-nous</h2>
            <p className="text-gray-600 mb-4">
              Pour plus d&apos;informations sur nos services de l&apos;ocation de pylône...
            </p>
            <Link href="/contacts" className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Nous contacter
            </Link>
          </section>
        </div>
      </div>
    </main>
  )
}