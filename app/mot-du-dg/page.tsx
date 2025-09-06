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
                className="relative flex items-center justify-center min-h-[350px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[600px] p-4 sm:p-8"
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

                  <div className="space-y-5 sm:space-y-6 text-gray-700 leading-relaxed">
                    <div className="border-l-4 border-orange-500 pl-4 sm:pl-6">
                      <p className="text-base sm:text-lg italic text-orange-700 mb-2 sm:mb-4">
                        "L'excellence dans la diffusion audiovisuelle au service de la nation ivoirienne"
                      </p>
                    </div>

                    <p className="text-base sm:text-lg">
                      L{' '}
                      <strong className="text-orange-600">
                        Ivoirienne De Télédiffusion (IDT)
                      </strong>{' '}
                      est une société d'État, créée par adoption en Conseil des Ministres du 20 Décembre 2017, d'un décret n°2017-844 portant création, organisation et fonctionnement de la société Ivoirienne De Télédiffusion dénommée Ivoirienne De Télédiffusion, en abrégé IDT.
                    </p>

                    <div className="bg-orange-50 border-l-4 border-orange-500 p-3 sm:p-4 rounded-r-lg">
                      <p className="text-orange-800 text-sm sm:text-base">
                        <strong>Cette structure a pour mission principale</strong> d'assurer la diffusion des programmes radiophoniques et télévisuels sur le territoire national.
                      </p>
                    </div>

                    <p className="text-base sm:text-lg">
                      Son rôle de diffuseur lui confère également les prérogatives suivantes :
                    </p>

                    <div className="space-y-3 sm:space-y-4 ml-2 sm:ml-4">
                      {[
                        "La gestion des centres émetteurs de radiodiffusion sonore et télévisuelle installés sur le territoire national.",
                        "La création, l'exploitation, l'entretien et l'extension des réseaux de diffusion de télévision numérique terrestre.",
                        "La gestion et l'entretien du réseau de diffusion de télévision analogique pendant la période de diffusion simultanée (Simulcast).",
                        "La fourniture des services multiplexage, de transport et de diffusion des chaînes, bouquets TV, et radios publiques et privées.",
                        "La promotion de la coopération avec les organismes techniques internationaux et ce en coordination avec les institutions concernées.",
                      ].map((item, idx) => (
                        <div className="flex items-start space-x-2 sm:space-x-3" key={idx}>
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm sm:text-base">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Signature */}
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                          Directeur Général
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-gray-800">
                          YEO Adama Benoit
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-orange-500 to-green-500 mb-1 sm:mb-2"></div>
                        <p className="text-xs sm:text-sm text-gray-500">IDT - 2017</p>
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