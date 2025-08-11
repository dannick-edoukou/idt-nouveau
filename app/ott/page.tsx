'use client';

import DynamicHero from '../composants/DynamicHero';

export default function Ott() {
  return (
    <>
    <DynamicHero />
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-wide">
          Ce service sera bientôt disponible
        </h2>
        <p className="mt-4 max-w-md mx-auto">
          Nous travaillons dur pour vous offrir ce service le plus tôt possible.
        </p>
      </div>
    </div>
    </>
      );
}
