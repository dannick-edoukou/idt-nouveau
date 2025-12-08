import React from 'react';
import { Radio, Tv, Signal, Globe, Settings, Users, Calendar } from 'lucide-react';
import Image from 'next/image';
import DynamicHero from '../composants/DynamicHero';

export default function IDTPresentation() {
  return (
    <div>
      <DynamicHero backgroundImage="/heroes.jpeg" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-6 px-2 sm:py-10 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0">
              {/* Section Image */}
              <div
                className="relative bg-gradient-to-br from-orange-500 to-green-600 p-4 sm:p-8 flex items-center justify-center min-h-[320px] sm:min-h-[400px] md:min-h-[500px]"
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #059669 100%)',
                }}
              >
                {/* Badge "Créé en 2017" */}
                <div
                  className="absolute top-3 right-3 sm:top-6 sm:right-6 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div className="flex items-center space-x-2 text-orange-800">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs sm:text-sm font-semibold">Créée en 2017</span>
                  </div>
                </div>
                <div className="text-center text-white w-full">
                  <div className="mb-6 sm:mb-8">
                    <div
                      className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <Image
                        src="/antenne.png"
                        alt="Logo"
                        width={128}
                        height={128}
                        className="sm:w-[100px] sm:h-[100px] w-full h-full object-contain"
                        quality={100}
                        priority
                        sizes="(max-width: 640px) 96px, 128px"
                        unoptimized={false}
                      />
                    </div>
                    <div
                      className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-xl flex items-center justify-center mb-4 sm:mb-6"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <Image
                        src="/idt1.png"
                        alt="Logo"
                        width={160}
                        height={160}
                        className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-contain"
                        quality={100}
                        priority
                        sizes="(max-width: 640px) 100px, 120px"
                        unoptimized={false}
                      />
                    </div>
                    <p className="text-lg sm:text-xl opacity-90">Ivoirienne De Télédiffusion</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-6 sm:mt-8">
                    <div
                      className="rounded-lg p-2 sm:p-4 shadow-md"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      <Tv className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
                      <p className="text-xs sm:text-sm">Télévision</p>
                    </div>
                    <div
                      className="rounded-lg p-2 sm:p-4 shadow-md"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      <Signal className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
                      <p className="text-xs sm:text-sm">Diffusion</p>
                    </div>
                    <div
                      className="rounded-lg p-2 sm:p-4 shadow-md"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      <Globe className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
                      <p className="text-xs sm:text-sm">National</p>
                    </div>
                    <div
                      className="rounded-lg p-2 sm:p-4 shadow-md"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      <Users className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
                      <p className="text-xs sm:text-sm">Service Public</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Présentation */}
              <div className="p-4 sm:p-8 lg:p-12 flex items-center">
                <div className="max-w-2xl w-full mx-auto">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 border-b-2 border-orange-500 pb-1 sm:pb-2">
                    Présentation
                  </h2>

                  <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-base sm:text-lg">
                      L&apos;Ivoirienne De Télédiffusion (IDT) est une société d&apos;État, créée par adoption en Conseil des Ministres du 20 Décembre 2017, d&apos;un décret n°2017-844 portant création, organisation et fonctionnement de la société Ivoirienne De Télédiffusion dénommée Ivoirienne De Télédiffusion en abrégé IDT.
                    </p>

                    <div className="bg-orange-50 border-l-4 border-orange-500 p-3 sm:p-4 rounded-r-lg">
                      <h3 className="font-semibold text-orange-800 mb-1 sm:mb-2">Mission Principale</h3>
                      <p className="text-orange-700 text-sm sm:text-base">
                        Assurer la diffusion des programmes radiophoniques et télévisuels sur le territoire national.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4 flex items-center">
                        <Settings className="w-5 h-5 mr-2 text-orange-500" />
                        Prérogatives
                      </h3>

                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <p className="text-sm sm:text-base">La gestion des centres émetteurs de radiodiffusion sonore et télévisuelle installés sur le territoire national.</p>
                        </div>

                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <p className="text-sm sm:text-base">La création, l&apos;exploitation, l&apos;entretien et l&apos;extension des réseaux de diffusion de télévision numérique terrestre.</p>
                        </div>

                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <p className="text-sm sm:text-base">La gestion et l&apos;entretien du réseau de diffusion de télévision analogique pendant la période de diffusion simultanée (Simulcast).</p>
                        </div>

                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <p className="text-sm sm:text-base">La fourniture des services multiplexage, de transport et de diffusion des chaînes, bouquets TV, et radios publiques et privées.</p>
                        </div>

                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <p className="text-sm sm:text-base">La promotion de la coopération avec les organismes techniques internationaux et ce en coordination avec les institutions concernées.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-green-50 to-orange-50 rounded-xl border border-orange-200">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                        Créée en 2017
                      </span>
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        Société d&apos;État
                      </span>
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        Service National
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Section Présentation */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}