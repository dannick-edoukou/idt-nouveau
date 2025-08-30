import { notFound } from 'next/navigation';
import Image from 'next/image';

import { faqData } from '../../data/faqData';
import DynamicHero from '../../composants/DynamicHero';

export default function FAQDetailPage({ params }: { params: { id: string } }) {
  const question = faqData.find(item => item.id === params.id);

  if (!question) {
    notFound();
  }

  // Fonction pour formater le texte avec les sauts de ligne
  const formatAnswer = (text: string) => {
    return text.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('- ')) {
        return (
          <li key={index} className="ml-6 list-disc">
            {paragraph.substring(2)}
          </li>
        );
      }
      return <p key={index} className="mb-4">{paragraph}</p>;
    });
  };

  return (
    <>
    <DynamicHero backgroundImage="/faq.jpeg" />
    <div className=" bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
       
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-500 mb-6 first-letter:uppercase">
            {question.question.toLowerCase()}
          </h1>
          
          <div className="prose max-w-none dark:prose-invert">
            {question.answer === "image" ? (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Carte de couverture de la TNT en Côte d'Ivoire
                </h2>
                <div className="relative w-full h-screen  rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/Map.png"
                    alt="Carte de couverture de la TNT en Côte d'Ivoire"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  La carte ci-dessus montre la couverture actuelle de la TNT en Côte d'Ivoire. 
                  Les zones en couleur indiquent les régions déjà couvertes par le signal numérique.
                </p>
              </div>
            ) : (
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                {formatAnswer(question.answer)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export function generateStaticParams() {
  return faqData.map((item) => ({
    id: item.id,
  }));
}
