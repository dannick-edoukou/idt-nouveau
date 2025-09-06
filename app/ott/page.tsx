'use client';

import { useCallback, useRef, useState } from 'react';
import { Tv, Smartphone, Globe, Clock } from 'lucide-react';
import DynamicHero from '../composants/DynamicHero';

const ottInfo = {
  logo: "/ott.jpg",
  description: "Notre service OTT vous permettra bientôt d'accéder à vos chaînes et contenus préférés partout et à tout moment.",
  youtubeVideoId: "w85bIc3JJkQ",
  features: [
    {
      icon: Tv,
      title: "Chaînes TV en direct",
      description: "Regardez vos chaînes préférées en streaming HD"
    },
    {
      icon: Smartphone,
      title: "Multi-appareils",
      description: "Compatible avec smartphones, tablettes et smart TV"
    },
    {
      icon: Globe,
      title: "Accès mondial",
      description: "Regardez vos contenus depuis n'importe où dans le monde"
    }
  ],
  benefits: [
    "Qualité HD et 4K",
    "Interface intuitive",
    
    "Téléchargement hors ligne",
    "Profils familiaux"
  ]
};

export default function Ott() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const handleUnmute = useCallback(() => {
    setIsMuted(false);
    const iframeWindow = iframeRef.current?.contentWindow;
    if (!iframeWindow) return;
    iframeWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
    iframeWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  }, []);

  return (
    <>
      <DynamicHero />
      
      {/* Section principale */}
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="container mx-auto px-4 py-16">
          {/* Bloc principal en 2 colonnes */}
          <div className="flex flex-col xl:flex-row gap-16 items-start mb-20">
            {/* Colonne gauche : contenu textuel */}
            <div className="flex-1 w-full xl:max-w-2xl">
              {/* En-tête avec badge "Bientôt disponible" */}
              <div className="mb-12">
                <div className="flex flex-col items-start mb-8">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 font-semibold px-4 py-2 rounded-full mb-6 border border-orange-200 shadow-sm">
                    <Clock className="w-4 h-4" />
                    <span>Bientôt disponible</span>
                  </div>
                
                </div>
                <p className="text-xl text-gray-700 max-w-2xl leading-relaxed font-medium">
                  {ottInfo.description}
                </p>
              </div>

              {/* Caractéristiques avec design amélioré */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-10 text-gray-800 relative">
                  Fonctionnalités à venir
                  <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                </h2>
                <div className="grid gap-6">
                  {ottInfo.features.map((feature, index) => (
                    <div
                      key={index}
                      className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-orange-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-gradient-to-br from-orange-500 to-red-500 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-orange-600 transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avantages avec design moderne */}
              <div>
                <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-xl p-8 md:p-10 border border-orange-100">
                  <h2 className="text-3xl font-bold mb-8 text-gray-800 relative">
                    Pourquoi choisir notre service ?
                    <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {ottInfo.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-4 group">
                        <div className="bg-gradient-to-br from-orange-500 to-red-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-200">
                          <span className="text-white text-sm font-bold">✓</span>
                        </div>
                        <span className="text-gray-700 font-semibold group-hover:text-gray-900 transition-colors">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne droite : vidéo agrandie */}
            <div className="flex-1 w-full xl:max-w-3xl">
              <div className="sticky top-8">
                <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center xl:text-left relative">
                  Découvrez OTT en avant-première
                  <div className="absolute -bottom-2 left-1/2 xl:left-0 transform -translate-x-1/2 xl:translate-x-0 w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                </h2>
                
                <div id="video" className="w-full mt-12">
                  <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-black aspect-video hover:shadow-3xl transition-shadow duration-300">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      ref={iframeRef}
                      src={`https://www.youtube.com/embed/${ottInfo.youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${ottInfo.youtubeVideoId}&controls=1&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`}
                      title="Présentation OTT Côte d'Ivoire"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                    {isMuted && (
                      <button
                        type="button"
                        onClick={handleUnmute}
                        className="absolute bottom-4 right-4 z-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold px-4 py-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border border-white/20"
                        aria-label="Activer le son"
                      >
                        🔊 Activer le son
                      </button>
                    )}
                    {/* Overlay décoratif */}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none"></div>
                  </div>
                  
                  {/* Description améliorée */}
                  <div className="mt-6 text-center xl:text-left">
                    <p className="text-sm text-gray-500 font-medium">
                      🎬 Vidéo de présentation en lecture automatique
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Cliquez sur le bouton plein écran pour une expérience immersive
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}