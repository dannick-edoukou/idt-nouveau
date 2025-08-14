'use client';

import { useCallback, useRef, useState } from 'react';
import Image from "next/image";
import { Tv, Smartphone, Globe, Clock } from 'lucide-react';
import DynamicHero from '../composants/DynamicHero';

const ottInfo = {
  logo: "/ott.jpg",
 
  description: "Notre service OTT  vous permettra bientôt d'accéder à vos chaînes et contenus préférés partout et à tout moment.",
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
    "Pas de publicité",
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 py-16">
          {/* Bloc principal en 2 colonnes */}
          <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">
            {/* Colonne gauche : tout sauf la vidéo */}
            <div className="flex-1 w-full">
              {/* En-tête */}
              <div className="mb-12">
                <div className="flex flex-col items-start mb-8">
                  <div className="relative group self-start">
                    <div className="absolute -inset-4 shadow-2xl rounded-8 blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                    <Image
                      src={ottInfo.logo}
                      alt='Ott Logo'
                      width={140}
                      height={140}
                      className="relative rounded-2xl shadow-2xl mb-6 transform group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4"></h1>
                  <div className="flex items-center gap-2 text-orange-600 font-medium">
                    <Clock className="w-5 h-5" />
                    <span>Bientôt disponible </span>
                  </div>
                </div>
                <p className="text-xl text-gray-700 max-w-3xl leading-relaxed">
                  {ottInfo.description}
                </p>
              </div>

              {/* Caractéristiques */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">
                  Fonctionnalités à venir
                </h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
                  {ottInfo.features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-orange-100"
                    >
                      <div className="bg-gradient-to-br from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-center leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avantages */}
              <div>
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl border border-orange-100">
                  <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center md:text-left">
                    Pourquoi choisir OTT Côte d'Ivoire ?
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {ottInfo.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-orange-500 to-red-500 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span className="text-gray-700 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Colonne droite : vidéo */}
            <div className="flex-1 w-full flex flex-col items-center">
              <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center lg:text-left">
                Découvrez OTT en avant-première
              </h2>
              <div id="video" className="w-full max-w-xl">
                <div className="relative w-full overflow-hidden rounded-xl shadow-xl bg-black pt-[42%]">
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
                      className="absolute bottom-3 right-3 z-10 rounded-full bg-white/90 text-gray-900 text-sm font-medium px-3 py-1.5 shadow hover:bg-white transition-colors"
                      aria-label="Activer le son"
                    >
                      Activer le son
                    </button>
                  )}
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  Vidéo en lecture silencieuse pour un rendu cinématique. Cliquez pour plein écran.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}