"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useMemo } from "react";

// Animation utility for the rotating text
const heroKeywords = [
  "Innovation audiovisuelle.",
  "Créativité qui inspire.",
  "Impact à grande échelle.",
  "Diffusion sans frontières.",
  "Expérience immersive."
];

function AnimatedKeywords() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % heroKeywords.length);
    }, 3500);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <span className="inline-block min-h-[1.5rem] sm:min-h-[2rem]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 font-extrabold text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl block drop-shadow-lg"
        >
          {heroKeywords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const images = useMemo(() => [
   
    "/banniere/banniere3.jpg",
     "/banniere/banniere61.jpg",
    "/banniere/banniere1.jpg",
    "/banniere/banniere2.jpg",
    "/banniere/banniere4.jpg",
    "/banniere/banniere5.jpg",
  ], []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide avec gestion de la pause
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map(
        (src) =>
          new Promise((resolve, reject) => {
            const img = new window.Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
          })
      );
      try {
        await Promise.all(imagePromises);
        setIsLoaded(true);
      } catch {
        setIsLoaded(true);
      }
    };
    preloadImages();
  }, [images]);

  if (!isLoaded) {
    return (
      <div className="relative aspect-[16/9] w-full sm:h-[65vh] md:h-[70vh] lg:h-[75vh] xl:h-[80vh] bg-gradient-to-br from-neutral-900 to-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 border-3 sm:border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-3 sm:mb-4"></div>
          <p className="text-neutral-100 text-base sm:text-lg font-semibold tracking-wide">Chargement en cours...</p>
        </div>
      </div>
    );
  }

  const isSpecialBanner = images[currentIndex] === "/banniere/banniere3.jpg";
  const isImageOnlyBanner = images[currentIndex] === "/banniere/banniere61.jpg";

  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2 aspect-[16/9] w-full sm:h-[65vh] md:h-[70vh] lg:h-[75vh] xl:h-[80vh] overflow-hidden bg-black">

      {/* Image de fond avec lien sur banniere61.jpg */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        {isImageOnlyBanner ? (
          <a href="https://www.fat.sn" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.3 }}
              alt="Hero SIDT"
              className="absolute inset-0 w-full h-full object-cover object-top cursor-pointer hover:scale-105 transition-transform duration-500"
              style={{ filter: "brightness(0.85) saturate(1.15)" }}
            />
          </a>
        ) : (
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.3 }}
            alt="Hero SIDT"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.85) saturate(1.15)" }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Bouton pause/lecture */}
      <motion.button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-30 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white p-2 sm:p-2.5 md:p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {isPaused ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        )}
      </motion.button>

      {/* Bouton en bas à droite sur banniere61.jpg */}
      {isImageOnlyBanner && (
        <motion.div
          className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-10 md:right-10 lg:bottom-12 lg:right-12 z-20"
          initial={{ opacity: 0, x: 20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          <a
            href="https://www.fat.sn"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="
                bg-gradient-to-r from-orange-500 to-orange-600 
                text-white font-bold 
                text-xs sm:text-sm md:text-base lg:text-lg
                px-4 sm:px-5 md:px-7 lg:px-9
                py-2 sm:py-2.5 md:py-3 lg:py-3.5
                rounded-lg sm:rounded-xl
                shadow-xl 
                border-2 border-orange-400 
                transition-all duration-300 
                hover:from-orange-600 hover:to-orange-700 
                hover:shadow-orange-500/60 
                focus:outline-none focus:ring-4 focus:ring-orange-400/50
                flex items-center gap-1.5 sm:gap-2
              "
            >
              <span>CONSULTER</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>
          </a>
        </motion.div>
      )}

      {/* Contenu texte (sauf sur banniere61) */}
      {!isImageOnlyBanner && (
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-10 sm:pb-0">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="text-center max-w-7xl w-full"
          >
            {isSpecialBanner ? (
              <>
                <motion.h1
                  className="font-extrabold text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-orange-200 py-2 sm:py-3 leading-tight drop-shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Société Ivoirienne de TéléDiffusion
                </motion.h1>
                <motion.p
                  className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-neutral-100/95 max-w-4xl mx-auto font-medium mt-3 sm:mt-4 md:mt-5 lg:mt-6 leading-relaxed px-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Votre partenaire de confiance pour une diffusion nationale moderne et performante.
                  <span className="block mt-2 sm:mt-3 md:mt-4">
                    <span className="text-orange-400 font-bold">Appelez le </span>
                    <span className="bg-green-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-sm sm:text-base md:text-lg lg:text-xl font-bold inline-block">1307</span>
                    <span className="text-orange-400 font-bold"> pour plus d'informations</span>
                  </span>
                </motion.p>
              </>
            ) : (
              <>
                <motion.h1
                  className="font-extrabold text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-orange-200 py-2 sm:py-3 leading-tight drop-shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  La nouvelle ère de la TéléDiffusion
                  <span className="block mt-2 sm:mt-3 md:mt-4">
                    <AnimatedKeywords />
                  </span>
                </motion.h1>
                <motion.p
                  className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-neutral-100/95 max-w-5xl mx-auto font-medium mt-3 sm:mt-4 md:mt-5 lg:mt-6 px-3 sm:px-2 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Profitez d'une expérience audiovisuelle inégalée grâce à une équipe passionnée, <span className="text-orange-400 font-bold">alliant technologies de pointe, créativité et puissance de diffusion</span> pour connecter vos contenus à toute la Côte d'Ivoire et au-delà.
                </motion.p>
              </>
            )}
          </motion.div>
        </div>
      )}

      {/* Indicateurs de slide : visibles sur tous les écrans */}
      <motion.div
        className="absolute bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-1.5 sm:space-x-2 md:space-x-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 sm:h-1.5 w-4 sm:w-6 md:w-8 rounded transition-all duration-300 focus:outline-none ${
              index === currentIndex
                ? "bg-gradient-to-r from-orange-500 via-orange-400 to-orange-200 scale-110 shadow-lg shadow-orange-500/50 ring-1 sm:ring-2 ring-orange-400"
                : "bg-white/40 hover:bg-orange-200/80 opacity-60"
            }`}
            aria-label={`Aller à la bannière ${index + 1}`}
          />
        ))}
      </motion.div>

      {/* Barre de progression (pause quand isPaused) */}
      {!isPaused && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-white/10 z-10">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-200 shadow-lg"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5.5, ease: "linear" }}
            key={currentIndex}
          />
        </div>
      )}
    </div>
  );
}