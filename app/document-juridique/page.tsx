"use client";

import DynamicHero from "../composants/DynamicHero";

const documents = [
  {
    title: "Décret de Création du SIDT 2017-8441",
    description: "Décret portant création de la Société Ivoirienne de Diffusion Télévisuelle (SIDT).",
    url: "/documents/DECRET_CREATION_SIDT_2017-8441.pdf",
  },
  {
    title: "Décret N° 2020-643 - Renforcement Conditions d'Accès TNT",
    description: "Décret du 19 août 2020 relatif au renforcement des conditions d'accès à la Télévision Numérique Terrestre.",
    url: "/documents/DECRET N° 2020-643 DU 19 AOUT 2020 RENFORCEMENT CONDITIONS D'ACCES TNT.pdf",
  },
  {
    title: "Décret N° 2020-642 - Extinction Analogique TV",
    description: "Décret du 19 août 2020 relatif à l'extinction de la diffusion analogique de télévision.",
    url: "/documents/DECRET N° 2020-642 DU 19 AOUT 2020 RELATIF A L'EXTINCTION ANALOGIQUE Tv.pdf",
  },
  {
    title: "Ordonnance Exonération Équipements TNT",
    description: "Ordonnance portant exonération des équipements de réception TNT.",
    url: "/documents/Ordonnance Exonération équipements TNT.pdf",
  },
  {
    title: "Directive UEMOA TNT 2015",
    description: "Directive n°01/2015/CM/UEMOA relative à la Télévision Numérique Terrestre dans l'espace UEMOA.",
    url: "/documents/Directive n°01_2015_ UEMOA_CM_TNT (1).pdf",
  },
  {
    title: "Décret d'Interdiction Importation et Commercialisation",
    description: "Décret portant interdiction d'importation et de commercialisation d'équipements non conformes.",
    url: "/documents/Decret_d_interdiction d'importation et commercialisation.pdf",
  },
];

export default function DocumentJuridique() {
  return (
    <>
      <DynamicHero backgroundImage="/heroes.jpeg" />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-10 uppercase tracking-wide">
            Documents Juridiques
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {documents.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between"
              >
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {doc.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {doc.description}
                </p>
                <div className="flex gap-4">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
                  >
                    Télécharger
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
