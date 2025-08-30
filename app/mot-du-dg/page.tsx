import React from 'react';
import { Quote, Calendar } from 'lucide-react';
import DynamicHero from '../composants/DynamicHero';
import Image from 'next/image';

export default function MotDuDG() {
  return (
    <div>  
      <DynamicHero backgroundImage="/heroes.jpeg"/>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Section Image du DG */}
              <div className="relative p-8 flex items-center justify-center min-h-[600px]" style={{background: 'linear-gradient(135deg, #f97316 0%, #059669 100%)'}}>
                {/* Badge "Créé en 2017" */}
                <div className="absolute top-6 right-6 rounded-full px-4 py-2 shadow-lg" style={{backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)'}}>
                  <div className="flex items-center space-x-2 text-orange-800">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-semibold">Créé en 2017</span>
                  </div>
                </div>

                <div className="text-center text-white">
                  {/* Photo placeholder du DG */}
                  <div className="w-80 h-80 mx-auto rounded-sm flex items-center justify-center mb-8 border-4 shadow-2xl overflow-hidden" style={{backgroundColor: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(8px)', borderColor: 'rgba(255, 255, 255, 0.5)'}}>
                    <div className="w-72 h-72 bg-gradient-to-br from-gray-300 to-gray-400 rounded-sm flex items-center justify-center overflow-hidden relative">
                      <Image 
                        src="/dg.png" 
                        alt="YEO Adama Benoit - Directeur Général IDT" 
                        fill
                        className="object-cover"
                        sizes="1200px"
                      />
                    </div>
                  </div>
                  
                  {/* Informations DG */}
                  <div className="rounded-xl p-6 border" style={{backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(8px)', borderColor: 'rgba(255, 255, 255, 0.3)'}}>
                    <h3 className="text-lg font-semibold text-white mb-2">Directeur Général</h3>
                    <h2 className="text-2xl font-bold text-white">YEO Adama Benoit</h2>
                  </div>
                </div>
              </div>

              {/* Section Mot du DG */}
              <div className="p-8 lg:p-12">
                <div className="max-w-2xl">
                  <div className="flex items-center mb-6">
                    <Quote className="w-8 h-8 text-orange-500 mr-3" />
                    <h2 className="text-3xl font-bold text-gray-800 border-b-3 border-orange-500 pb-2">
                      Mot du Directeur Général
                    </h2>
                  </div>
                  
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <div className="border-l-4 border-orange-500 pl-6">
                      <p className="text-lg italic text-orange-700 mb-4">
                        "L'excellence dans la diffusion audiovisuelle au service de la nation ivoirienne"
                      </p>
                    </div>

                    <p className="text-lg">
                      L'<strong className="text-orange-600">Ivoirienne de Télédiffusion (IDT)</strong> est une société d'État, créée par adoption en Conseil des Ministres du 20 Décembre 2017, d'un décret n°2017-844 portant création, organisation et fonctionnement de la société Ivoirienne de Télédiffusion dénommée Ivoirienne de Télédiffusion, en abrégé IDT.
                    </p>
                    
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                      <p className="text-orange-800">
                        <strong>Cette structure a pour mission principale</strong> d'assurer la diffusion des programmes radiophoniques et télévisuels sur le territoire national.
                      </p>
                    </div>

                    <p>
                      Son rôle de diffuseur lui confère également les prérogatives suivantes :
                    </p>

                    <div className="space-y-4 ml-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p>La gestion des centres émetteurs de radiodiffusion sonore et télévisuelle installés sur le territoire national.</p>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p>La création, l'exploitation, l'entretien et l'extension des réseaux de diffusion de télévision numérique terrestre.</p>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p>La gestion et l'entretien du réseau de diffusion de télévision analogique pendant la période de diffusion simultanée (Simulcast).</p>
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

                  {/* Signature */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Directeur Général</p>
                        <p className="text-xl font-bold text-gray-800">YEO Adama Benoit</p>
                      </div>
                      <div className="text-right">
                        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-green-500 mb-2"></div>
                        <p className="text-sm text-gray-500">IDT - 2017</p>
                      </div>
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