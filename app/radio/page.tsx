"use client";

import Image from "next/image";
import DynamicHero from "@/app/composants/DynamicHero";

// Liste des radios basée sur les fichiers disponibles dans public/radios
const radios = [
  {
    name: "La Voix de l'IFFOU",
    logo: "/radios/Logo radio la Voix de l'IFFOU.jpeg",
    description: "Radio régionale de l'IFFOU, voix des communautés locales.",
  
  },
  {
    name: "Génération 100%",
    logo: "/radios/Génération.jpg",
    description: "La radio jeune et dynamique, 100% énergie positive.",
  
  },
  {
    name: "Trace FM",
    logo: "/radios/trace.jpg",
    description: "Radio urbaine, musique et culture afro-urbaine.",
  
  },
  {
    name: "Life Radio",
    logo: "/radios/life radio.png",
    description: "Radio lifestyle, bien-être et développement personnel.",
  
  },
  {
    name: "Nostalgie",
    logo: "/radios/nostalgie.jpg",
    description: "Les plus belles chansons d'hier et d'aujourd'hui.",

  },
  {
    name: "RFI",
    logo: "/radios/RFI.png",
    description: "Radio France Internationale, actualités et culture.",

  },
  {
    name: "BBC Afrique",
    logo: "/radios/BBC.png",
    description: "BBC World Service en français pour l'Afrique.",
    
  },
  {
    name: "Al Fourquane",
    logo: "/radios/AL FOURQUANE.png",
    description: "Radio confessionnelle musulmane, spiritualité et culture.",
  
  },
  {
    name: "Al Hikmah",
    logo: "/radios/AL HIKMAH.jpg",
    description: "Radio islamique, sagesse et éducation religieuse.",
 
  },
  {
    name: "Al Bayane",
    logo: "/radios/AL BAYANE.jpg",
    description: "Radio confessionnelle musulmane, information et spiritualité.",
   
  },
  {
    name: "Radio La Paix",
    logo: "/radios/radio la paix.png",
    description: "Radio de paix et de réconciliation nationale.",
   
  },
  {
    name: "Diaspora",
    logo: "/radios/Diaspora.jpg",
    description: "Radio de la diaspora ivoirienne, lien avec la patrie.",
  
  },
];

export default function LesRadios() {
  return (
    <>
      <DynamicHero backgroundImage="/heroes.jpeg" />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-10 uppercase tracking-wide">
            Les Radios Nationales
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {radios.map((radio, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col items-center p-6 hover:shadow-2xl transition-shadow"
              >
                <div className="w-28 h-28 flex items-center justify-center mb-4">
                  <Image
                    src={radio.logo}
                    alt={radio.name}
                    width={112}
                    height={112}
                    className="object-contain rounded-lg"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 text-center">
                  {radio.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-4">
                  {radio.description}
                </p>
               
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
