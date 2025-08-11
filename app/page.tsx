"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Partners } from "./composants/partners";
import Services from "./composants/services";

import Faq from "./composants/faq";
import Une from "./composants/une";
import { Hero } from "./composants/Hero";
import { parseDate } from "./lib/utils";

// Ajout des données pour les statistiques
const statistics = [
 
  {
    value: "68%",
    label: "Foyers équipés TNT",
    description: "Part des foyers ivoiriens équipés pour recevoir la TNT en 2021",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    gradient: "from-green-600/90 to-green-400/80"
  },
  {
    value: "100%",
    label: "Capital public",
    description: "SIDT détenue à 100% par l’État ivoirien",
    image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    gradient: "from-orange-600/90 to-orange-400/80"
  },
 
  {
    value: "2017",
    label: "Année de création",
    description: "SIDT, société d’État créée en décembre 2017",
    image: "https://images.pexels.com/photos/267614/pexels-photo-267614.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    gradient: "from-red-600/90 to-red-400/80"
  },
  {
    value: "+10",
    label: "Technologies internationales",
    description: "Collaboration avec des partenaires technologiques mondiaux",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    gradient: "from-cyan-600/90 to-cyan-400/80"
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
  return (
    <div className="min-h-screen bg-white">
      {/* Hero section amélioré */}
      <Hero  />

      <Une />
     
      <Services />
      <div className="flex justify-center">
        <Link  className=" px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors" 
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-4 xl:gap-6">
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
      
   
      <Faq/> 
    </div>
  );
}