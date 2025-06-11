"use client";
import Image from "next/image";
import { useState } from "react";

const faqItems = [
  {
    question: "QU'EST CE QUE LA TNT ?",
    answer: "La Télévision Numérique Terrestre (TNT) est cette évolution technologique en matière de télédiffusion terrestre qui permet d’optimiser l’usage de la ressource spectrale par un accroissement du nombre de chaines par fréquence, d’obtenir une meilleure qualité d’image et de réduire les coûts de transmission et de diffusion. Cette nouvelle technologie de diffusion d'images et de son de qualité numérique offre des avantages multiples tels que : la qualité d'image et de son, la diffusion de plusieurs programmes de chaînes de télévision sur une seule fréquence, l'accès à plus de chaînes et une multitude de programmes, la possibilité d'offrir des services innovants comme la vidéo à la demande (VOD), l'enregistrement des programmes (catch up TV), etc. AVEC LA TNT PAS DE COUPURE D’IMAGE NI DE SON DURANT L’ORAGE ! NB : La Côte d’Ivoire s’engage à migrer de la télévision analogique vers la télévision numérique conformément au traité international appelé « Accord GE06 » initié par l’Union Internationale des télécommunications (IUT ou ITU) en 2006 à Genève."
  },
  {
    question: "COMMENT BÉNÉFICIER DE LA TNT ?",
    answer: "La Télévision Numérique de Terre est cette évolution technologique qui permet d’optimiser grâce au codage numérique, l’usage des fréquences qui servent à la transmission des ondes par lesquelles l’on reçoit les images. Elle permet une meilleure qualité d’image en réduisant les couts de transmission et de diffusion. Elle permettra aux foyers équipés d’une simple antenne râteau de recevoir une offre de plus d’une trentaine de chaines publiques et privées nationales et locales en qualité numérique. La réception de la télévision numérique est possible avec : Un téléviseur analogique et un décodeur numérique, des téléviseurs conformes aux normes de compression MPEG 4 et de diffusion DVB-T2, un téléviseur numérique avec décodeur intégré, un ordinateur équipé d’une carte PC-TV tuner ou d’une clé USB TNT, des équipements intelligents (smart GSM) capables de réceptionner la vidéo TV mobile. La réception des programmes numériques est possible en mode : Fixe (avec une antenne extérieure fixe ou via un accès à un réseau spécifique), Portable (avec une antenne intérieure posée sur le téléviseur ou intégrée), Mobile (avec des équipements intelligents : smart devices, GSM, PDA, etc.)."
  },
  {
    question: "DÉPLOIEMENT DE LA TNT EN CÔTE D'IVOIRE",
    answer: "image"
  },
  {
    question: "CHOIX TECHNOLOGIQUE",
    answer: "Norme de diffusion : DVB-T2. Norme de compression : MPEG 4 AVC. Format de diffusion : HD. Ces Normes sont utilisées dans les espaces UEMOA et CEDEAO."
  }
];

export default function Faq() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleIndex = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx)
        ? prev.filter((i) => i !== idx)
        : [...prev, idx]
    );
  };

  return (
    <section id="faq" className="w-full flex justify-center items-center">
      <div className="w-full max-w-2xl px-4 md:px-8 py-14 flex flex-col items-center">
        <h3 className="text-center text-2xl font-bold text-orange-600 tracking-wide mb-8 uppercase">FAQ</h3>
        <div className="w-full flex flex-col gap-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndexes.includes(index);
            return (
              <div
                key={index}
                className={`rounded-xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 ${isOpen ? "ring-2 ring-orange-400" : ""}`}
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex justify-between items-center p-5 focus:outline-none text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-semibold text-gray-800 dark:text-white">
                    {item.question}
                  </span>
                  <svg className={`w-5 h-5 ml-4 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] opacity-100 py-4 px-5" : "max-h-0 opacity-0 py-0 px-5"}`}
                  style={{
                    borderTop: isOpen ? "1px solid #e5e7eb" : "none"
                  }}
                >
                  {item.answer === "image" ? (
                    <div className="flex items-center justify-center">
                      <Image
                        src="/Map.png"
                        alt="Map of Côte d'Ivoire"
                        width={620}
                        height={400}
                        className="rounded-lg shadow-lg"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                      {item.answer}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}