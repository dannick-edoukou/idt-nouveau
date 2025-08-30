'use client';



import DynamicHero from '../composants/DynamicHero';
import { useCallback, useRef, useState } from 'react';

export default function Pylone() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const handleUnmute = useCallback(() => {
    setIsMuted(false);
    const iframeWindow = iframeRef.current?.contentWindow;
    if (!iframeWindow) return;
    // YouTube Iframe Player API commands
    iframeWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
    iframeWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  }, []);
  return (
    <>
    <DynamicHero />
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-orange-500">
              Location de Pylônes
            </h1>
            <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
              <p>
                La société Ivoirienne de Télédiffusion dispose d'un réseau de pylônes stratégiquement déployés sur l'ensemble du territoire national, qu'elle propose en location aux opérateurs du secteur.
              </p>
              <p>
                Les infrastructures dont bénéficie IDT dans la bonne réalisation de sa mission s'adressent aux opérateurs évoluant dans quatre secteurs clés :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  La télévision (RTI 1, RTI 2, La 3, NCI, LIFE TV, 7INFO, A+ IVOIRE)
                </li>
                <li>
                  La téléphonie mobile (ORANGE, MOOV, MTN)
                </li>
                <li>
                  La radiodiffusion (Radios internationales : RFI et BBC ; Radios commerciales : NOSTALGIE, LIFE RADIO, TRACE FM ; Radios confessionnelles : AL BAYAN, RADIO AL HIKMAH, RADIO AL FOURQUANE ; Radios associatives : RADIO LA VOIX DE L’IFFOU, RADIO LA VOIX DE LA DIASPORA, RADIO GENERATION 100%, RADIO DE LA PAIX)
                </li>
                <li>
                  La radiocommunication (CIE)
                </li>
              </ul>
            </div>

          </div>

          <div id="video" className="w-full mt-12 ">
         
            <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-black aspect-video hover:shadow-3xl transition-shadow duration-300">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      ref={iframeRef}
                      src={`https://www.youtube.com/embed/GGUsJ1VGqMs?autoplay=1&mute=1&loop=1&playlist=GGUsJ1VGqMs&controls=1&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`}
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
            <p className="mt-3 text-sm text-gray-500">
              Vidéo en lecture silencieuse pour un rendu cinématique. Cliquez pour plein écran.
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
