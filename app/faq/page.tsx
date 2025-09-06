"use client";
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import DynamicHero from "@/app/composants/DynamicHero";
import { faqData } from "@/app/data/faqData";
import Image from 'next/image';

export default function FAQPage() {
  const searchParams = useSearchParams();
  const highlightedSlug = searchParams.get('highlight');
  const highlightedQuestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlightedSlug && highlightedQuestionRef.current) {
      setTimeout(() => {
        highlightedQuestionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 500); // Delay to ensure page is rendered
    }
  }, [highlightedSlug]);

  // Fonction pour formater le texte avec les sauts de ligne
  const formatAnswer = (text: string) => {
    return text.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('- ')) {
        return (
          <li key={index} className="ml-4 sm:ml-6 list-disc text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-base">
            {paragraph.substring(2)}
          </li>
        );
      }
      return <p key={index} className="mb-3 sm:mb-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">{paragraph}</p>;
    });
  };

  return (
    <>
      <div className="w-full m-0 p-0">
        <DynamicHero backgroundImage="/faq.jpeg" />
      </div>
      
      <section className="w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30 min-h-screen">
        {/* Décoration de fond - Responsive */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-bl from-orange-100/20 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-gradient-to-tr from-blue-100/20 to-transparent rounded-full blur-3xl -z-10" />
        
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 md:py-16 max-w-7xl">
         

          {/* Liste des questions */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {faqData.map((item, index) => {
              const isHighlighted = item.slug === highlightedSlug;
              return (
                <div
                  key={item.id}
                  id={item.slug}
                  ref={isHighlighted ? highlightedQuestionRef : null}
                  className={`scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-24 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg border transition-all duration-500 ${
                    isHighlighted 
                      ? 'ring-2 sm:ring-4 ring-orange-500/50 shadow-2xl scale-[1.01] sm:scale-[1.02] bg-gradient-to-r from-orange-50 to-white dark:from-orange-900/20 dark:to-gray-800' 
                      : 'hover:shadow-xl hover:scale-[1.005] sm:hover:scale-[1.01] border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="p-4 sm:p-6 md:p-8">
                    {/* En-tête de la question */}
                    <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                      <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base md:text-lg ${
                        isHighlighted ? 'bg-orange-500' : 'bg-gradient-to-r from-orange-500 to-orange-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 transition-colors duration-300 leading-tight ${
                          isHighlighted 
                            ? 'text-orange-600 dark:text-orange-400' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {item.question}
                        </h2>
                      </div>
                    </div>

                    {/* Contenu de la réponse */}
                    <div className="ml-0 sm:ml-8 md:ml-12 lg:ml-16">
                      {item.answer === "image" ? (
                        <div className="space-y-4 sm:space-y-6">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4">
                            Carte de couverture de la TNT en Côte d'Ivoire
                          </h3>
                          <div className="relative w-full max-w-[700px] mx-auto aspect-square rounded-lg sm:rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white">
                            <Image
                              src="/Map.jpg"
                              alt="Carte de couverture de la TNT en Côte d'Ivoire"
                              fill
                              className="object-contain"
                              priority={isHighlighted}
                              sizes="(max-width: 700px) 100vw, 700px"
                            />
                          </div>
                          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                            La carte ci-dessus montre la couverture actuelle de la TNT en Côte d'Ivoire. 
                            Les zones en couleur indiquent les régions déjà couvertes par le signal numérique.
                          </p>
                        </div>
                      ) : (
                        <div className="prose max-w-none dark:prose-invert prose-sm sm:prose-base">
                          <div className="text-gray-700 dark:text-gray-300 space-y-3 sm:space-y-4">
                            {formatAnswer(item.answer)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section d'aide supplémentaire */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Besoin d'aide supplémentaire ?</h3>
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 opacity-90 leading-relaxed">
                Si vous ne trouvez pas la réponse à votre question, n'hésitez pas à nous contacter.
              </p>
              <a 
                href="/contacts" 
                className="inline-block bg-white text-orange-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base"
              >
                Nous Contacter
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}