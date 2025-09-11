"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useMemo } from "react";

// Animation utility for the "Expertise. Créativité. Impact." text
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
    <span className="inline-block min-h-[2.5rem]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -32 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 font-extrabold text-3xl md:text-5xl block drop-shadow-lg"
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
    "/banniere/banniere1.jpg",
    "/banniere/banniere2.jpg",
    "/banniere/banniere4.jpg",
    "/banniere/banniere5.jpg",
  ], []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Preload images to prevent white flashes
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map((src: string) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

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
      <div className="relative h-[24rem] sm:h-[30rem] md:h-[36rem] lg:h-[42rem] bg-gradient-to-br from-neutral-900 to-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-neutral-100 text-lg font-semibold tracking-wide">Chargement en cours...</p>
        </div>
      </div>
    );
  }

  // Check if the current image is "/banniere/banniere3.jpg"
  const isSpecialBanner = images[currentIndex] === "/banniere/banniere3.jpg";

  return (
    <div className="relative h-[24rem] sm:h-[30rem] md:h-[36rem] lg:h-[42rem] overflow-hidden bg-gradient-to-br from-neutral-900 to-black">
      {/* Background Images with smooth transitions */}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.07 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{
            duration: 1.1,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="absolute inset-0"
        >
       <div
            className="w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-700"
            style={{
              backgroundImage: `url(${images[currentIndex]})`,
              filter: "brightness(0.75) saturate(1.2)"
            }}
          />
          {/* Light overlay for text readability only */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center items-center h-full px-4">
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="text-center"
        >
          {isSpecialBanner ? (
            <>
              <motion.h1
                className="font-extrabold text-2xl sm:text-4xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-orange-200 py-4 leading-tight drop-shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Société Ivoirienne de TéléDiffusion
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-2xl text-neutral-100/90 mt-4 max-w-2xl mx-auto font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Votre partenaire de confiance pour une diffusion nationale moderne et performante.<br />
                <span className="text-orange-500 font-bold ">Appelez le <span className="bg-green-500 text-white p-1">1307</span></span> pour plus d'informations.
              </motion.p>
            </>
          ) : (
            <>
              <motion.h1
                className="font-extrabold text-3xl sm:text-5xl md:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-orange-200 py-4 leading-tight drop-shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                La nouvelle ère de la TéléDifusion <br />
                <AnimatedKeywords />
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg md:text-2xl text-neutral-100/90 mt-6 max-w-2xl mx-auto font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Profitez d'une expérience audiovisuelle inégalée grâce à une équipe passionnée, <span className="text-orange-500 font-bold">alliant technologies de pointe, créativité et puissance de diffusion</span> pour connecter vos contenus à toute la Côte d'Ivoire et au-delà.
              </motion.p>
            </>
          )}
        </motion.div>

        {/* Slide indicators */}
        <motion.div
          className="flex space-x-3 mt-8 sm:mt-10 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {images.map((_: unknown, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 w-8 rounded transition-all duration-300 border-none focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-orange-500 via-orange-400 to-orange-200 scale-110 shadow-lg shadow-orange-500/40 ring-2 ring-orange-400'
                  : 'bg-white/40 hover:bg-orange-200/80 opacity-60'
              }`}
              aria-label={`Aller à la diapositive ${index + 1}`}
              style={{
                minWidth: '2rem',
                marginLeft: index === 0 ? 0 : '0.5rem',
                marginRight: index === images.length - 1 ? 0 : '0.5rem',
                borderRadius: '0.375rem',
                border: 'none',
                height: '0.375rem',
                padding: 0,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-200 shadow-lg"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5.5, ease: "linear" }}
          key={currentIndex}
        />
      </div>
    </div>
  );
}