// components/Une.tsx - Version corrigée
"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from 'next/image';

import { Button } from "@/components/ui/button";
import { useNews } from '../../hooks/useNews';


// Props pour le composant Une
interface UneProps {
  title?: React.ReactNode;
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Vérifier si on est côté client avant d'accéder à window
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); 

  return windowSize;
}

// Composant de chargement
function LoadingSkeleton() {
  return (
    <div className="flex space-x-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex-shrink-0 w-full max-w-sm">
          <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}

// Composant d'erreur
function ErrorMessage({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Erreur de chargement
      </h3>
      <p className="text-gray-600 mb-4 text-center max-w-md">
        {error}
      </p>
      <Button 
        onClick={onRetry}
        variant="outline"
        className="text-orange-600 border-orange-600 hover:bg-orange-50"
      >
        Réessayer
      </Button>
    </div>
  );
}

export default function Une({ title }: UneProps) {
  // Récupération des données via le hook (flux "in-the-news")
  const { news, loading, error, refetch } = useNews('/api/news/in-the-news');
  
  // Hooks d'état pour la navigation
  const [newsStartIndex, setNewsStartIndex] = useState(0);
  const { width } = useWindowSize();
  const [isClient, setIsClient] = useState(false);
  const newsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filtrer uniquement les articles activés
  const newsItems = news
    .filter(item => item.enabled)
    .slice(0, 10);

  // Gérer l'état de chargement
  if (loading) {
    return (
      <section className="pt-16 lg:pt-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-9xl">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
            <span className="ml-2 text-lg text-gray-600">Chargement des actualités...</span>
          </div>
          <div className="mt-8">
            <LoadingSkeleton />
          </div>
        </div>
      </section>
    );
  }

  // Gérer l'état d'erreur
  if (error) {
    return (
      <section className="pt-16 lg:pt-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-9xl">
          <ErrorMessage error={error} onRetry={refetch} />
        </div>
      </section>
    );
  }

  // Ne pas afficher si pas d'articles
  if (newsItems.length === 0) {
    return (
      <section className="pt-16 lg:pt-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-9xl">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune actualité disponible
            </h3>
            <p className="text-gray-600">
              Revenez plus tard pour découvrir nos dernières actualités.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const getVisibleCards = () => {
    if (!isClient) return 1; // Changé de 5 à 1 pour éviter l'hydration mismatch
    if (width < 768) return 2;
    if (width < 1280) return 4;
    return Math.min(5, newsItems.length);
  };

  const visibleCards = getVisibleCards();
  const maxIndex = Math.max(0, newsItems.length - visibleCards);

  const slideNews = (direction: 'left' | 'right') => {
    if (direction === 'left' && newsStartIndex > 0) {
      setNewsStartIndex(prev => Math.max(0, prev - 1));
    } else if (direction === 'right' && newsStartIndex < maxIndex) {
      setNewsStartIndex(prev => Math.min(maxIndex, prev + 1));
    }
  };

  const getTranslatePercentage = () => {
    if (!isClient) return 0; // Éviter les calculs avant l'hydration
    const slidePercentage = 100 / visibleCards;
    return newsStartIndex * slidePercentage;
  };

  const defaultTitle = (
    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mt-6 leading-tight">
      A la <span className="text-orange-600">Une</span>
    </h2>
  );

  return (
  
    <section className="pt-16 lg:pt-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-100/20 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-100/20 to-transparent rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-9xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8 mb-12 lg:mb-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-orange-600 uppercase tracking-wider">
                En direct
              </span>
            </div>
            {title || defaultTitle}
            <div className="flex items-center gap-3">
              <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
              <div className="h-1 w-8 bg-orange-300 rounded-full" />
              <div className="h-1 w-4 bg-orange-200 rounded-full" />
            </div>
          </div>

          {isClient && newsItems.length > visibleCards && (
            <div className="flex items-center gap-3 lg:gap-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => slideNews('left')}
                className={`group relative p-3 lg:p-4 rounded-2xl transition-all duration-300 shadow-lg backdrop-blur-sm ${
                  newsStartIndex === 0 
                    ? 'bg-gray-100/80 text-gray-400 cursor-not-allowed shadow-sm' 
                    : 'bg-white/80 text-orange-600 hover:bg-orange-50 hover:shadow-xl hover:shadow-orange-500/20'
                }`}
                disabled={newsStartIndex === 0}
              >
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:-translate-x-0.5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => slideNews('right')}
                className={`group relative p-3 lg:p-4 rounded-2xl transition-all duration-300 shadow-lg backdrop-blur-sm ${
                  newsStartIndex >= maxIndex
                    ? 'bg-gray-100/80 text-gray-400 cursor-not-allowed shadow-sm'
                    : 'bg-white/80 text-orange-600 hover:bg-orange-50 hover:shadow-xl hover:shadow-orange-500/20'
                }`}
                disabled={newsStartIndex >= maxIndex}
              >
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:translate-x-0.5" />
              </motion.button>
            </div>
          )}
        </div>

        <div 
          ref={newsContainerRef}
          className="relative overflow-hidden rounded-xl md:rounded-2xl"
        >
          <motion.div
            className="flex"
            animate={{ 
              x: `-${getTranslatePercentage()}%`
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {newsItems.map((item) => (
              <div 
                key={item.id} 
                className="flex-shrink-0 px-2 md:px-3"
                style={{
                  width: `${100 / visibleCards}%`
                }}
              >
                <motion.div
                  className="bg-white rounded-lg md:rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative h-40 sm:h-44 md:h-48 lg:h-56">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      className="object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    <div className="absolute top-3 md:top-4 right-3 md:right-4">
                      <div className="px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-lg shadow-lg">
                        <p className="text-xs font-medium text-white tabular-nums">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-3 md:mb-4 line-clamp-2">
                      {item.title}
                    </h3>
                    <Link href={`/news/${item.id}`}>
                      <Button className="bg-orange-600 text-white hover:text-orange-800 hover:bg-white w-full">
                        <span className="group inline-flex items-center font-medium transition-colors duration-200 text-sm md:text-base">
                          Lire la suite
                          <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

  );
}