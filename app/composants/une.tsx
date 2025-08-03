"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import { NewsItem } from '../data/news';

// Props for the Une component
interface UneProps {
  news: NewsItem[];
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
    
    // Set size on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); 
  return windowSize;
}

export default function Une({ news = [], title }: UneProps) {
  // Move all hooks to the top, before any conditional logic
  const [newsStartIndex, setNewsStartIndex] = useState(0);
  const { width } = useWindowSize();
  const [isClient, setIsClient] = useState(false);
  const newsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Ensure we only show a maximum of 5 news items, as requested
  const newsItems = news.slice(0, 5);

  // Prevent rendering on the server or before hydration to avoid layout shift


  // Don't render the component if there are no news items to display
  if (newsItems.length === 0) {
    return null;
  }

  const getVisibleCards = () => {
    if (!isClient) return 5; // Default for SSR
    if (width < 768) return 2; // 2 cards on mobile
    if (width < 1280) return 4; // 4 on tablet/small desktop
    return Math.min(5, newsItems.length); // Up to 5 on large desktops
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

  // Calcul simple et efficace du décalage
  const getTranslatePercentage = () => {
    // Chaque slide déplace d'une largeur de carte
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

            {/* Afficher les boutons seulement s'il y a plus d'articles que visible */}
            {newsItems.length > visibleCards && (
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
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
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
                      <Link 
                        href={`/actualite/${item.id}`}
                        className="group inline-flex items-center text-orange-600 font-medium hover:text-orange-800 transition-colors duration-200 text-sm md:text-base"
                      >
                        Lire la suite 
                        <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
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