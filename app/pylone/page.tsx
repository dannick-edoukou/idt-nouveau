'use client';


import Link from 'next/link';
import DynamicHero from '../composants/DynamicHero';
import { useCallback, useRef, useState } from 'react';
import {ArrowDownToLine} from 'lucide-react'
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

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/files/zones.xlsx"
                download
                className="inline-flex items-center justify-center rounded-md bg-orange-600 px-5 py-3 text-white font-medium shadow hover:bg-orange-700 transition-colors duration-200"
              >
                Télécharger la liste des sites (Excel) <ArrowDownToLine />
              </Link>
            
            </div>
          </div>

          <div id="video" className="w-full">
            <div className="relative w-full overflow-hidden rounded-xl shadow-xl bg-black pt-[42%]">
              <iframe
                className="absolute inset-0 h-full w-full"
                ref={iframeRef}
                src={`https://www.youtube.com/embed/cfGdr04qJ2w?autoplay=1&mute=1&loop=1&playlist=cfGdr04qJ2w&controls=1&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`}
                title="Présentation - Réseau de pylônes IDT"
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
    </section>
    </>
  );
}
