"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Partners } from "./composants/partners";
import Services from "./composants/services";
import CoverageMapWrapper from "./composants/CoverageMapWrapper";
import Faq from "./composants/faq";
import Une from "./composants/une";
import { mockNews } from "./data/news";
import { parseDate } from "./lib/utils";

const heroImages = [
  {
    url: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Premier groupe média francophone",
    description: "Acteur majeur de la production, de l'édition et de la distribution de contenus",
    gradient: "from-orange-600/90 to-orange-500/80"
  },
  {
    url: "https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Innovation et créativité",
    description: "À la pointe de la technologie et de la création de contenus",
    gradient: "from-blue-600/90 to-blue-500/80"
  },
  {
    url: "https://images.pexels.com/photos/3944425/pexels-photo-3944425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Engagement responsable",
    description: "Un groupe engagé pour un avenir durable et inclusif",
    gradient: "from-green-600/90 to-green-500/80"
  }
];

// Ajout des données pour les statistiques
const statistics = [
  {
    value: "15M+",
    label: "Spectateurs quotidiens",
    description: "Audience cumulée sur nos chaînes",
    image: "https://images.pexels.com/photos/3760259/pexels-photo-3760259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    gradient: "from-blue-600/90 to-blue-500/80"
  },
  {
    value: "200+",
    label: "Émissions produites",
    description: "Contenus originaux créés chaque année",
    image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    gradient: "from-purple-600/90 to-purple-500/80"
  },
  {
    value: "50+",
    label: "Pays couverts",
    description: "Distribution internationale de nos contenus",
    image: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    gradient: "from-green-600/90 to-green-500/80"
  },
  {
    value: "1000+",
    label: "Employés",
    description: "Experts passionnés par la création de contenus",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    gradient: "from-orange-600/90 to-orange-500/80"
  },
  {
    value: "25+",
    label: "Années d'expertise",
    description: "Leader du secteur audiovisuel",
    image: "https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    gradient: "from-red-600/90 to-red-500/80"
  }
];

// Fonction utilitaire pour l'animation des nombres
function useCountAnimation(targetValue: string, duration: number = 2) {
  const [displayValue, setDisplayValue] = useState("0");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const numericValue = parseInt(targetValue.replace(/[^0-9]/g, ''));
    const suffix = targetValue.replace(/[0-9]/g, '');
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * numericValue);
      
      setDisplayValue(currentValue.toString() + suffix);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, targetValue, duration]);

  return { displayValue, ref };
}

// Composant séparé pour chaque carte statistique
function StatisticCard({ stat, index }: { stat: typeof statistics[0], index: number }) {
  const { displayValue, ref } = useCountAnimation(stat.value, 2.5);
  
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <div className="relative overflow-hidden rounded-2xl h-48 sm:h-52 md:h-56 lg:h-60 xl:h-56 shadow-lg group-hover:shadow-2xl transition-all duration-300">
        {/* Image de fond avec effet parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
          style={{ backgroundImage: `url('${stat.image}')` }}
        />
        
        {/* Overlay gradient amélioré */}
        <div className="absolute inset-0 bg-black opacity-85 group-hover:opacity-90 transition-opacity duration-300" />
        {/* Effet de lumière sur hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Contenu de la carte */}
        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-center items-center text-center text-white">
          {/* Nombre animé */}
          <motion.div
            ref={ref}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-4xl font-bold mb-2 sm:mb-3 font-mono tracking-tight drop-shadow-lg"
            initial={{ scale: 0.5 }}
            whileInView={{ scale: 1 }}
            transition={{ 
              delay: 0.3 + index * 0.1,
              type: "spring",
              stiffness: 200
            }}
          >
            {displayValue}
          </motion.div>
          
          {/* Titre */}
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="text-lg sm:text-xl font-semibold mb-2 leading-tight"
          >
            {stat.label}
          </motion.h3>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="text-sm sm:text-base text-white/90 leading-relaxed px-2"
          >
            {stat.description}
          </motion.p>
        </div>
        
        {/* Bordure décorative */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-300" />
      </div>
    </motion.div>
  );
}

export default function Home() {
  const recentNews = [...mockNews]
    .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
    .slice(0, 5);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <section className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div 
              className={`absolute inset-0 bg-gradient-to-r ${heroImages[currentImageIndex].gradient} mix-blend-multiply backdrop-blur-sm`}
            />
            <div 
              className="absolute inset-0 bg-cover bg-center transform-gpu"
              style={{ 
                backgroundImage: `url('${heroImages[currentImageIndex].url}')`,
                transition: 'transform 12s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'scale(1.1)'
              }}
            />
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4 md:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="max-w-3xl"
                >
                  <motion.h1 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {heroImages[currentImageIndex].title}
                  </motion.h1>
                  <motion.p 
                    className="text-lg sm:text-xl md:text-2xl text-white/95 mb-6 md:mb-8 font-light leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    {heroImages[currentImageIndex].description}
                  </motion.p>
                  <motion.div 
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Link 
                      href="/le-groupe" 
                      className="group px-6 md:px-8 py-3 md:py-4 bg-white text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      <span className="flex items-center">
                        Découvrir le groupe
                        <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                    <Link 
                      href="/activites" 
                      className="group px-6 md:px-8 py-3 md:py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                    >
                      Nos activités
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider indicators */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3">
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-500 ${
                index === currentImageIndex 
                  ? 'bg-white w-6 md:w-10 shadow-lg shadow-white/30' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </section>

      <Une news={recentNews} />
     
      <Services />
      <div className="flex justify-center">
      
                     
        <Link  className="mt-6 px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors" 
         href="/actualite" >Voir nos actualités</Link>

      </div>
      <Partners />

      {/* section chiffres clés */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* En-tête optimisé */}
          <div className="text-center lg:text-left mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Nos Chiffres Clés
            </h2>
            <div className="w-12 sm:w-16 lg:w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mx-auto lg:mx-0"></div>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Des chiffres qui témoignent de notre leadership dans le secteur audiovisuel
            </p>
          </div>

          {/* Grille responsive pour les cartes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-4 xl:gap-6">
            {statistics.map((stat, index) => (
              <StatisticCard key={index} stat={stat} index={index} />
            ))}
          </div>

          {/* Animation de fond décorative */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      </section>
      
      <CoverageMapWrapper/>
      <Faq/> 
    </div>
  );
}