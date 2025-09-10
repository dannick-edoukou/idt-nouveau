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
    <span className="inline-block min-h-[2.2rem]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 font-extrabold text-lg xs:text-xl sm:text-2xl md:text-4xl block"
        >
          {heroKeywords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Utilitaire pour détecter la largeur d'écran (mobile, tablette, desktop)
function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setBreakpoint("mobile");
      } else if (window.innerWidth < 1024) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("desktop");
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
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

  // Responsive breakpoint
  const breakpoint = useBreakpoint();

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);

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

  // Hauteur dynamique selon le breakpoint
  const getHeroHeight = () => {
    switch (breakpoint) {
      case "mobile":
        return "h-[12rem] xs:h-[15rem]";
      case "tablet":
        return "h-[22rem] sm:h-[28rem] md:h-[32rem]";
      case "desktop":
      default:
        return "h-[32rem] lg:h-[40rem] xl:h-[48rem]";
    }
  };

  // Taille du background selon le breakpoint
  const getBackgroundSize = () => {
    switch (breakpoint) {
      case "mobile":
        return "cover";
      case "tablet":
        return "cover";
      case "desktop":
      default:
        return "cover";
    }
  };

  // Padding du contenu selon le breakpoint
  const getContentPadding = () => {
    switch (breakpoint) {
      case "mobile":
        return "px-2";
      case "tablet":
        return "px-6";
      case "desktop":
      default:
        return "px-12";
    }
  };

  if (!isLoaded) {
    return (
      <div className={`relative ${getHeroHeight()} bg-gradient-to-br from-neutral-900 to-slate-800 flex items-center justify-center`}>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-neutral-100 text-lg font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  // Determine if we are on banniere3
  const isBanniere3 = images[currentIndex] === "/banniere/banniere3.jpg";

  return (
    <div
      className={`relative w-full ${getHeroHeight()} overflow-hidden bg-gradient-to-br from-neutral-900 to-black bg-white`}
      style={{ minHeight: "10rem" }}
    >
      {/* Background Images with smooth transitions */}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: breakpoint === "mobile" ? 1 : 1.06 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            duration: 1.1,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-center bg-no-repeat bg-white"
            style={{
              backgroundImage: `url(${images[currentIndex]})`,
              backgroundSize: getBackgroundSize(),
              backgroundColor: "white",
              filter: isBanniere3
                ? "brightness(1) saturate(1)"
                : "brightness(0.82) saturate(1.05)",
            }}
          />
          {/* Overlay (on le supprime si c’est banniere3) */}
          {!isBanniere3 && (
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/20 via-black/10 to-orange-500/5 pointer-events-none" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      {!isBanniere3 && (
        <div className={`relative z-20 flex flex-col justify-center items-center h-full ${getContentPadding()}`}>
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="text-center w-full"
          >
            <motion.h1
              className="font-bold text-lg xs:text-xl sm:text-3xl md:text-5xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-orange-200 py-2 sm:py-3 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <AnimatedKeywords />
            </motion.h1>

            <motion.p
              className="text-xs xs:text-sm sm:text-base md:text-xl text-neutral-100/90 mt-1 max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl mx-auto font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Découvrez l'excellence de la télédiffusion portée par une équipe passionnée,{" "}
              <span className="text-orange-500 font-semibold">
                alliant innovation technologique, créativité visuelle et puissance de diffusion
              </span>{" "}
              pour connecter vos contenus à des millions de téléspectateurs.
            </motion.p>
          </motion.div>

          {/* Slide indicators */}
          <motion.div
            className="flex space-x-2 xs:space-x-3 mt-4 xs:mt-6 sm:mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {images.map((_: unknown, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1 w-4 xs:h-1.5 xs:w-6 rounded transition-all duration-300 border border-white/40 ${
                  index === currentIndex
                    ? 'bg-orange-500 scale-110 shadow-lg shadow-orange-500/20'
                    : 'bg-white/40 hover:bg-orange-200/80'
                }`}
                aria-label={`Aller à la diapositive ${index + 1}`}
                style={{
                  minWidth: '1rem',
                  maxWidth: '2.5rem',
                  height: '0.25rem',
                  borderRadius: '0.25rem',
                  padding: 0,
                }}
              />
            ))}
          </motion.div>
        </div>
      )}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-200 shadow"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          key={currentIndex}
        />
      </div>
    </div>
  );
}