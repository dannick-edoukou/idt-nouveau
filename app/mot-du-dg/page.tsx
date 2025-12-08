import React from 'react';
import { Quote } from 'lucide-react';
import DynamicHero from '../composants/DynamicHero';
import Image from 'next/image';

export default function MotDuDG() {
  return (
    <div>
      <DynamicHero backgroundImage="/heroes.jpeg" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-8 px-2 sm:py-12 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Section Image du DG */}
              <div
                className="relative flex  justify-center min-h-[350px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[600px] p-4 sm:p-8"
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #059669 100%)',
                }}
              >
                <div className="text-center text-white w-full">
                  {/* Photo placeholder du DG */}
                  <div
                    className="mx-auto rounded-sm flex items-center justify-center mb-6 sm:mb-8 border-4 shadow-2xl overflow-hidden"
                    style={{
                      width: 'min(90vw, 320px)',
                      height: 'min(90vw, 320px)',
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(8px)',
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    <div
                      className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-sm flex items-center justify-center overflow-hidden relative"
                      style={{
                        width: 'min(80vw, 288px)',
                        height: 'min(80vw, 288px)',
                      }}
                    >
                      <Image
                        src="/dg.png"
                        alt="YEO Adama Benoit - Directeur Général IDT"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 90vw, 320px"
                        priority
                      />
                    </div>
                  </div>

                  {/* Informations DG */}
                  <div
                    className="rounded-xl p-4 sm:p-6 border mx-auto"
                    style={{
                      maxWidth: 340,
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(8px)',
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">
                      Directeur Général
                    </h3>
                    <h2 className="text-lg sm:text-2xl font-bold text-white">
                      YEO Adama Benoit
                    </h2>
                  </div>
                </div>
              </div>

              {/* Section Mot du DG */}
              <div className="p-4 sm:p-8 lg:p-12 flex items-center">
                <div className="w-full max-w-2xl mx-auto">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
                    <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500 mr-0 sm:mr-3 mb-2 sm:mb-0" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 border-b-4 border-orange-500 pb-1 sm:pb-2">
                      Mot du Directeur Général
                    </h2>
                  </div>

                  <div className="space-y-4 sm:space-y-5 text-gray-700 leading-relaxed text-sm sm:text-base">
                    <p>
                      Avant tout propos, qu'il me soit permis d'exprimer mon infinie gratitude à <strong className="text-orange-600">S.E.M Alassane OUATTARA</strong>, Président de la République de Côte d'Ivoire qui a bien voulu me confier la lourde et exaltante charge de diriger la société Ivoirienne De Télédiffusion (IDT), créée principalement pour réaliser le déploiement de la Télévision Numérique Terrestre (TNT).
                    </p>

                    <p>
                      Faire de la couverture TNT une réalité, sur tout le territoire national, était un véritable défi pour moi en tant que premier Directeur Général de la société. Car il fallait à la fois construire de toute pièce une administration de cette entreprise, la faire fonctionner, et dans le même temps lancer les travaux de construction du réseau.
                    </p>

                    <div className="bg-orange-50 border-l-4 border-orange-500 p-3 sm:p-4 rounded-r-lg">
                      <p className="text-orange-800 font-semibold">
                        Deux ans, c'est le temps que le déploiement aura mis pour atteindre le niveau de couverture actuelle (96% du territoire national) et la qualité du réseau dont le pays peut se targuer.
                      </p>
                    </div>

                    <p>
                      Nous y sommes parvenus grâce aux soutiens du gouvernement, notamment des différents ministres de tutelle depuis la création de IDT.
                    </p>

                    <p>
                      Nous y sommes aussi parvenus grâce à l'ardeur avec laquelle le personnel de IDT a accepté de relever ce défi. Je n'oublie pas également le consortium <strong className="text-orange-600">AUCOM, GATESAIR et STA</strong>, Maitres d'œuvres du projet, et notre assistant technique <strong className="text-orange-600">TDF (Télédiffusion de France)</strong> qui ont joué leur partition pour la réalisation du projet.
                    </p>

                    <p>
                      Aujourd'hui c'est un réseau de qualité que nous mettons à la disposition des éditeurs de chaines et des opérateurs de bouquet. J'en suis d'autant plus fier en tant que Directeur Général que le déploiement de la TNT en Côte d'Ivoire est une des plus grandes réussites en la matière dans la sous-région Ouest-Africaine.
                    </p>

                    <p>
                      Dans la dynamique, je puis affirmer que les opérateurs de télécommunications sont aussi servis et même bien servis par la qualité de nos infrastructures pour le développement de leurs activités.
                    </p>

                    <p>
                      Je voudrais donc rassurer tous nos partenaires et potentiels partenaires commerciaux de IDT de notre disposition à les accompagner vers de nouveaux défis, et ce, dans un partenariat gagnant-gagnant.
                    </p>

                    <div className="border-l-4 border-green-600 pl-4 sm:pl-6 bg-green-50 p-3 sm:p-4 rounded-r-lg">
                      <p className="text-green-800">
                        Dans le prolongement de ces acquis et fidèle à sa mission de service public, IDT engage aujourd'hui une nouvelle phase de son développement avec la mise en place de sa plateforme OTT dénommée <strong>IDTplay</strong>. Cette initiative marque une étape importante dans la diversification de nos services et traduit la volonté de l'entreprise d'accompagner l'évolution des usages numériques en matière de consommation audiovisuelle.
                      </p>
                    </div>
                  </div>

                  {/* Signature */}
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                          Le Directeur Général
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-gray-800">
                          YEO Adama Benoit
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-orange-500 to-green-500 mb-1 sm:mb-2"></div>
                        <p className="text-xs sm:text-sm text-gray-500">IDT</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Section Mot du DG */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}