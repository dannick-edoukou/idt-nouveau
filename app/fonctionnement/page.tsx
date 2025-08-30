import DynamicHero from "../composants/DynamicHero"

export default function Fonctionnement() {
  return (
    <div>
    <DynamicHero backgroundImage="/heroes.jpeg"/>
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Fonctionnement de l&apos;IDT</h1>
      <div className="prose max-w-none">
        <div className="grid gap-8">
          {/* Section Organisation */}
          <BientotDisponible />
        </div>
      </div>
    </main>
    </div>
  )
} 

function BientotDisponible() {
  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Bientot  disponible</h2>
      <div className="space-y-4">
        <p className="text-lg">
          Ces informations seront bientôt disponibles. Veuillez nous contacter pour obtenir plus d&apos;informations.
        </p>
      </div>
    </section>
  )
}