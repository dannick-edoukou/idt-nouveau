"use client";

import Image from "next/image";
// Correction de l'import du composant DynamicHero
import DynamicHero from "@/app/composants/DynamicHero";

const chaines = [
  {
    name: "RTI 1",
    logo: "/chaines/rti.png",
    description: "Chaîne généraliste nationale, actualités, divertissement, culture.",
    site: "https://www.rti.ci/rti1"
  },
  {
    name: "RTI 2",
    logo: "/chaines/rti2.png",
    description: "Jeunesse, musique, séries, divertissement.",
    site: "https://www.rti.ci/rti2"
  },
  {
    name: "NCI",
    logo: "/chaines/nci.png",
    description: "Nouvelles, talk-shows, magazines, programmes variés.",
    site: "https://www.nci.ci/"
  },
  {
    name: "La 3",
    logo: "/chaines/la3.png",
    description: "Sport, jeunesse, culture urbaine.",
    site: "https://www.rti.ci/la3"
  },
  {
    name: "Life TV",
    logo: "/chaines/lifetv.png",
    description: "Divertissement, talk-shows, séries africaines.",
    site: "https://www.lifetv.ci/home"
  },
  {
    name: "A+ Ivoire",
    logo: "/chaines/aivoire.jpg",
    description: "Séries, cinéma, divertissement africain.",
    site: "https://www.aplusivoire.ci"
  },
  {
    name: "7 Info",
    logo: "/chaines/7info.jpg",
    description: "Chaîne d'information continue.",
    site: "https://www.7info.ci"
  },
  {
    name: "Easy TV",
    logo: "/chaines/easy.jpg",
    description: "Culture, société, programmes éducatifs.",
    site: "https://www.easy.tv/ab"
  },

  // Ajoutez d'autres chaînes si besoin
];

export default function LesChaines() {
  return (
    <>
      <DynamicHero backgroundImage="/heroes.jpeg"/>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-10 uppercase tracking-wide">
            Les Chaînes de la TNT
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {chaines.map((chaine, idx) => (
              <a
                key={idx}
                href={chaine.site}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col items-center p-6 hover:shadow-2xl transition-shadow hover:ring-2 hover:ring-orange-400 focus:ring-2 focus:ring-orange-400 outline-none cursor-pointer group"
                tabIndex={0}
                aria-label={`Visiter le site de ${chaine.name}`}
              >
                <div className="w-28 h-28 flex items-center justify-center mb-4">
                  <Image
                    src={chaine.logo}
                    alt={chaine.name}
                    width={112}
                    height={112}
                    className="object-contain rounded-lg group-hover:scale-105 transition-transform"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 text-center group-hover:text-orange-600 transition-colors">
                  {chaine.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                  {chaine.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
