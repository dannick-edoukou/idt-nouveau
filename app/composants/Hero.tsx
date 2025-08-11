"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useMemo } from "react";

// Animation utility for the "Expertise. Créativité. Impact." text
const heroKeywords = [
  "Expertise en télédiffusion.",
  "Créativité au service de l'image.",
  "Impact sur vos audiences."
];

function AnimatedKeywords() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % heroKeywords.length);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <span className="inline-block min-h-[2.5rem]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 font-extrabold text-3xl md:text-5xl block"
        >
          {heroKeywords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const images = useMemo(() => [
    "/banniere/banniere1.jpg",
    "/banniere/banniere2.jpg",
    "/banniere/banniere3.jpg",
    "/banniere/banniere4.jpg",
    "/banniere/banniere5.jpg",
  ], []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

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
          <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-neutral-100 text-lg font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[24rem] sm:h-[30rem] md:h-[36rem] lg:h-[42rem] overflow-hidden bg-gradient-to-br from-neutral-900 to-black">
      {/* Background Images with smooth transitions */}
      <AnimatePresence >
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{
            duration: 1.1,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${images[currentIndex]})`,
              filter: "brightness(0.82) saturate(1.05)"
            }}
          />
          {/* Subtle neutral overlay for pro look, with a touch of orange for brand */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/60 via-black/40 to-orange-500/10 pointer-events-none" />
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
          <motion.h1
            className="font-bold text-3xl sm:text-4xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-orange-200 py-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            La nouvelle ère de la télédiffusion <br />
            <AnimatedKeywords />
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-2xl text-neutral-100/90 mt-6 max-w-2xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Découvrez l'excellence de la télédiffusion portée par une équipe passionnée, <span className="text-orange-500 font-semibold">alliant innovation technologique, créativité visuelle et puissance de diffusion</span> pour connecter vos contenus à des millions de téléspectateurs.
          </motion.p>
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
              className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/40 ${
                index === currentIndex
                  ? 'bg-orange-500 scale-125 shadow-lg shadow-orange-500/30'
                  : 'bg-white/40 hover:bg-orange-200/80'
              }`}
              aria-label={`Aller à la diapositive ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-neutral-900 hover:bg-orange-500/70 hover:text-white hover:border-orange-400/60 transition-all duration-200 flex items-center justify-center group"
        aria-label="Image précédente"
      >
        <svg className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-neutral-900 hover:bg-orange-500/70 hover:text-white hover:border-orange-400/60 transition-all duration-200 flex items-center justify-center group"
        aria-label="Image suivante"
      >
        <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-200 shadow"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          key={currentIndex}
        />
      </div>
    </div>
  );
}