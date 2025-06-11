import React from 'react';
import { Radio, Tv, Signal, Globe, Settings, Users } from 'lucide-react';

import DynamicHero from '../composants/DynamicHero';

export default function IDTPresentation() {
  return (
  
     <div>  <DynamicHero
        backgroundImage="/heroes.jpeg"/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-12 px-4"> 
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Section Image */}
            <div className="relative bg-gradient-to-br from-orange-500 to-green-600 p-8 flex items-center justify-center min-h-[500px]" style={{background: 'linear-gradient(135deg, #f97316 0%, #059669 100%)'}}>
              <div className="text-center text-white">
                <div className="mb-8">
                  <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6 shadow-lg" style={{backgroundColor: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(8px)'}}>
                    <Radio className="w-16 h-16 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold mb-2">IDT</h1>
                  <p className="text-xl opacity-90">Ivoirienne de Télédiffusion</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="rounded-lg p-4 shadow-md" style={{backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(4px)'}}>
                    <Tv className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Télévision</p>
                  </div>
                  <div className="rounded-lg p-4 shadow-md" style={{backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(4px)'}}>
                    <Signal className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Diffusion</p>
                  </div>
                  <div className="rounded-lg p-4 shadow-md" style={{backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(4px)'}}>
                    <Globe className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">National</p>
                  </div>
                  <div className="rounded-lg p-4 shadow-md" style={{backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(4px)'}}>
                    <Users className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Service Public</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Présentation */}
            <div className="p-8 lg:p-12">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-3 border-orange-500 pb-2">
                  Présentation
                </h2>
                
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    L&apos;Ivoirienne de Télédiffusion (d&apos;IDT) est une société d&apos;État, créée par adoption en Conseil des Ministres du 20 Décembre 2017, d&apos;un décret n°2017-844 portant création, organisation et fonctionnement de la société Ivoirienne de Télédiffusion dénommée Ivoirienne de Télédiffusion, en abrégé d&apos;IDT.
                  </p>
                  
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                    <h3 className="font-semibold text-orange-800 mb-2">Mission Principale</h3>
                    <p className="text-orange-700">
                      Assurer la diffusion des programmes radiophoniques et télévisuels sur le territoire national.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-orange-500" />
                      Prérogatives
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p>La gestion des centres émetteurs de radiodiffusion sonore et télévisuelle installés sur le territoire national.</p>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p>La création, l&apos;exploitation, l&apos;entretien et l&apos;extension des réseaux de diffusion de télévision numérique terrestre.</p>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p>La gestion et l&apos;entretien du réseau de diffusion de télévision analogique pendant la période de diffusion simultanée (Simulcast).</p>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p>La fourniture des services multiplexage, de transport et de diffusion des chaînes, bouquets TV, et radios publiques et privées.</p>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p>La promotion de la coopération avec les organismes techniques internationaux et ce en coordination avec les institutions concernées.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
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
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}