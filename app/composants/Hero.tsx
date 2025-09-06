"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";

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
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [mobileHeight, setMobileHeight] = useState<number | null>(null);

  const imgRef = useRef<HTMLImageElement>(null);

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-slide functionality (no pause)
  useEffect(() => {
    const interval = setInterval(goToNext, 7000);
    return () => clearInterval(interval);
  }, [goToNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

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

  // Adapter la hauteur sur mobile à l'image affichée
  useEffect(() => {
    function updateHeight() {
      if (typeof window === "undefined") return;
      if (window.innerWidth >= 640) {
        setMobileHeight(null);
        return;
      }
      const img = imgRef.current;
      if (img && img.naturalWidth && img.naturalHeight) {
        // On veut que l'image soit entièrement visible (contain)
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        let height = screenWidth / aspectRatio;
        // Ne pas dépasser la hauteur de l'écran
        if (height > screenHeight) height = screenHeight;
        setMobileHeight(height);
      }
    }

    // On attend que l'image soit chargée
    const img = imgRef.current;
    if (img && img.complete) {
      updateHeight();
    } else if (img) {
      img.onload = updateHeight;
    }

    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
      if (img) img.onload = null;
    };
  }, [currentIndex, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="relative h-[50vh] min-h-[20rem] max-h-[45rem] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] bg-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white/70 text-sm sm:text-base">Chargement...</p>
        </div>
      </div>
    );
  }

  // Détermine la hauteur du composant
  const containerStyle: React.CSSProperties = {};
  if (mobileHeight && typeof window !== "undefined" && window.innerWidth < 640) {
    containerStyle.height = `${mobileHeight}px`;
    containerStyle.minHeight = 0;
    containerStyle.maxHeight = "100vh";
  }

  return (
    <div 
      className="relative overflow-hidden bg-gradient-to-br from-neutral-900 to-black
        h-auto sm:h-[60vh] md:h-[70vh] lg:h-[80vh] min-h-0 sm:min-h-[20rem] sm:max-h-[45rem]"
      style={containerStyle}
      // Suppression des pauses : onMouseEnter/onMouseLeave supprimés
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Carrousel d'images"
    >
      {/* Background Images with smooth transitions */}
      <AnimatePresence>
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
          {/* 
            Sur grand écran (md+), l'image est en full (zoom, crop, cover).
            Sur petit écran, l'image est en taille normale (contain, pas de crop).
            On utilise des classes utilitaires responsive pour bg-cover/bg-contain.
            Sur mobile, on utilise une balise img pour adapter la hauteur.
          */}
          <div className="w-full h-full relative">
            {/* Mobile: img pour adapter la hauteur */}
            <img
              ref={imgRef}
              src={images[currentIndex]}
              alt=""
              className="block sm:hidden w-full h-auto max-h-screen object-contain transition-all duration-500"
              draggable={false}
              style={{ userSelect: "none", pointerEvents: "none" }}
            />
            {/* Desktop: background div */}
            <div
              className="hidden sm:block w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-500"
              style={{
                backgroundImage: `url(${images[currentIndex]})`,
                filter: "brightness(0.82) saturate(1.05)"
              }}
            />
          </div>
          {/* Overlay: seulement à partir de sm */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/70 via-black/50 to-orange-500/20 pointer-events-none hidden sm:block" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows - hidden on small screens, shown on hover */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 
                   hidden sm:flex items-center justify-center w-10 h-10 md:w-12 md:h-12 
                   bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-sm
                   text-white/80 hover:text-white transition-all duration-300
                   opacity-0 hover:opacity-100 group-hover:opacity-100
                   focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
        aria-label="Image précédente"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 
                   hidden sm:flex items-center justify-center w-10 h-10 md:w-12 md:h-12 
                   bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-sm
                   text-white/80 hover:text-white transition-all duration-300
                   opacity-0 hover:opacity-100 group-hover:opacity-100
                   focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
        aria-label="Image suivante"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Content area - responsive spacing */}
      <div className="relative z-20 flex flex-col justify-center items-center h-full px-4 sm:px-6 md:px-8">
        {/* Placeholder for future content */}
        <div className="text-center max-w-4xl">
          {/* Add your hero content here */}
        </div>
      </div>

      {/* Slide indicators - improved responsive design */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10
                   flex items-center justify-center space-x-2 sm:space-x-3 px-4 py-2 
                   bg-black/20 backdrop-blur-sm rounded-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 sm:h-2 transition-all duration-300 rounded-full
              ${index === currentIndex
                ? 'bg-orange-500 w-8 sm:w-12 md:w-16 shadow-lg shadow-orange-500/40'
                : 'bg-white/50 w-4 sm:w-6 md:w-8 hover:bg-orange-300/80'
              }`}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </motion.div>

      {/* Progress bar (no pause, always animates) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 shadow-sm opacity-100"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 7, 
            ease: "linear",
            repeat: Infinity
          }}
          key={currentIndex}
        />
      </div>

      {/* Swipe hint for mobile (appears briefly on first load) */}
      <motion.div
        className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-20
                   flex items-center space-x-2 text-white/70 text-xs sm:hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        <span>Glissez pour naviguer</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </motion.div>
    </div>
  );
}