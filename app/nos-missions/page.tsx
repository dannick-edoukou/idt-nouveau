import React from 'react';
import { Settings, Antenna, Server, Building2, Network } from 'lucide-react';
import Image from 'next/image';
import DynamicHero from '../composants/DynamicHero';

export default function NosMissions() {
  return (
    <div>
      <DynamicHero backgroundImage="/heroes.jpeg" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-8 px-2 sm:py-12 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0">
              {/* Section Image/Visuel */}
              <div
                className="relative bg-gradient-to-br from-orange-500 to-green-600 p-4 sm:p-8 flex items-center justify-center min-h-[320px] sm:min-h-[400px] md:min-h-[500px]"
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #059669 100%)',
                }}
              >
                <div className="text-center text-white w-full">
                  <div className="mb-6 sm:mb-8">
                    <div
                      className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <Image src="/reseau.png" alt="Logo" width={100} height={100} className="sm:w-[100px] sm:h-[100px]" />
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-bold mb-2">Nos Missions</h1>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-6 sm:mt-8">
                    <div
                      className="rounded-lg p-2 sm:p-4 shadow-md"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      <Antenna className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
                      <p className="text-xs sm:text-sm">Émetteurs</p>
                    </div>
                    <div
                      className="rounded-lg p-2 sm:p-4 shadow-md"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      <Network className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
                      <p className="text-xs sm:text-sm">Réseaux TNT</p>
                    </div>
                    <div
                      className="rounded-lg p-2 sm:p-4 shadow-md"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      <Server className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
                      <p className="text-xs sm:text-sm">Multiplexage</p>
                    </div>
                    <div
                      className="rounded-lg p-2 sm:p-4 shadow-md"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      <Building2 className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
                      <p className="text-xs sm:text-sm">Collocation</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Mission */}
              <div className="p-4 sm:p-8 lg:p-12 flex items-center">
                <div className="w-full max-w-2xl mx-auto">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 border-b-2 border-orange-500 pb-2">
                    Mission de IDT
                  </h2>

                  <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed">
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-3 sm:p-4 rounded-r-lg">
                      <h3 className="font-semibold text-orange-800 mb-1 sm:mb-2">Rôle de Diffuseur</h3>
                      <p className="text-orange-700 text-sm sm:text-base">
                        Le rôle de diffuseur qu'a la société ivoirienne De télédiffusion lui confère des prérogatives étendues dans la gestion et la diffusion des contenus audiovisuels.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4 flex items-center">
                        <Settings className="w-5 h-5 mr-2 text-orange-500" />
                        Prérogatives et Missions
                      </h3>

                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <p className="text-xs sm:text-base">La gestion des centres émetteurs de radiodiffusion sonore et télévisuelle installés sur le territoire national.</p>
                        </div>
                        <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <p className="text-xs sm:text-base">La création, l'exploitation, l'entretien et l'extension des réseaux de diffusion de télévision numérique terrestre.</p>
                        </div>
                        <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <p className="text-xs sm:text-base">La gestion et l'entretien du réseau de diffusion de télévision analogique pendant la période de diffusion simultanée (Simulcast).</p>
                        </div>
                        <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <p className="text-xs sm:text-base">La fourniture des services multiplexage, de transport et de diffusion des chaînes, bouquets TV, et radios publiques et privées.</p>
                        </div>
                        <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <p className="text-xs sm:text-base">La promotion de la coopération avec les organismes techniques internationaux et ce en coordination avec les institutions concernées.</p>
                        </div>
                        <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <p className="text-xs sm:text-base"><strong>Assurer la fourniture des services de collocation des équipements de radio et de télécommunication.</strong></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-green-50 to-orange-50 rounded-xl border border-orange-200">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                        Diffusion Nationale
                      </span>
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        TNT 
                      </span>
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        Services Techniques
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}