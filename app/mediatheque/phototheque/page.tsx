'use client';

import { useState, useEffect } from "react";
import Stack from "@/app/composants/stack";
import DynamicHero from "../../composants/DynamicHero";
import Image from "next/image";

// Interface pour typer les images
interface ImageItem {
  id: number;
  img: string;
  title: string;
  description: string;
}

// Interface pour typer les catégories
interface ImageCategory {
  id: number;
  title: string;
  description: string;
  images: ImageItem[];
}

// Images organisées par catégories/dossiers
const imageCategories: ImageCategory[] = [
  {
    id: 1,
    title: "Maisons Modernes",
    description: "Architecture contemporaine",
    images: [
      { 
        id: 1, 
        img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
        title: "Architecture Moderne",
        description: "Bâtiment contemporain aux lignes épurées"
      },
      { 
        id: 2, 
        img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=500&auto=format",
        title: "Maison Familiale",
        description: "Parfaite pour une famille nombreuse"
      },
      { 
        id: 3, 
        img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=500&auto=format",
        title: "Villa avec Piscine",
        description: "Détente et confort absolu"
      }
    ]
  },
  {
    id: 2,
    title: "Appartements",
    description: "Vie urbaine élégante",
    images: [
      { 
        id: 4, 
        img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=500&auto=format",
        title: "Appartement Luxe",
        description: "Standing haut de gamme en centre-ville"
      },
      { 
        id: 5, 
        img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=500&auto=format",
        title: "Studio Design",
        description: "Optimisation d'espace parfaite"
      },
      { 
        id: 6, 
        img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=500&auto=format",
        title: "Penthouse",
        description: "Vue imprenable sur la ville"
      }
    ]
  },
  {
    id: 3,
    title: "Styles Unique",
    description: "Architectures distinctives",
    images: [
      { 
        id: 7, 
        img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=500&auto=format",
        title: "Loft Industriel",
        description: "Style unique et moderne"
      },
      { 
        id: 8, 
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=500&auto=format",
        title: "Duplex Moderne",
        description: "Volumes généreux et luminosité"
      },
      { 
        id: 9, 
        img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
        title: "Résidence Urbaine",
        description: "Élégance en plein cœur de la ville"
      }
    ]
  },
  {
    id: 4,
    title: "Traditionnelles",
    description: "Charme authentique",
    images: [
      { 
        id: 10, 
        img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
        title: "Maison Traditionnelle",
        description: "Charme authentique et architecture classique"
      },
      { 
        id: 11, 
        img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=500&auto=format",
        title: "Maison de Campagne",
        description: "Tranquillité et nature environnante"
      },
      { 
        id: 12, 
        img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
        title: "Villa Contemporaine",
        description: "Design moderne avec vue panoramique"
      }
    ]
  },
  {
    id: 5,
    title: "Prestige",
    description: "Propriétés d'exception",
    images: [
      { 
        id: 13, 
        img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=500&auto=format",
        title: "Château Moderne",
        description: "Luxe et grandeur exceptionnelle"
      },
      { 
        id: 14, 
        img: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?q=80&w=500&auto=format",
        title: "Villa de Prestige",
        description: "Architecture de rêve avec jardins"
      },
      { 
        id: 15, 
        img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=500&auto=format",
        title: "Résidence de Luxe",
        description: "Standing exceptionnel et services"
      }
    ]
  },
  {
    id: 6,
    title: "Éco-responsables",
    description: "Construction durable",
    images: [
      { 
        id: 16, 
        img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=500&auto=format",
        title: "Maison Écologique",
        description: "Construction respectueuse de l'environnement"
      },
      { 
        id: 17, 
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=500&auto=format",
        title: "Villa Solaire",
        description: "Énergie renouvelable intégrée"
      },
      { 
        id: 18, 
        img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=500&auto=format",
        title: "Habitat Durable",
        description: "Innovation et écologie"
      }
    ]
  }
];

export default function Phototheque() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<ImageCategory | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Configuration responsive des stacks par page
  const getStacksPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 10; // xl: 5x2 = 10 stacks
      if (window.innerWidth >= 1024) return 8;  // lg: 4x2 = 8 stacks
      return 3; // sm: 1x3 = 3 stacks
    }
    return 10; // défaut serveur
  };

  const [stacksPerPage, setStacksPerPage] = useState(getStacksPerPage());

  // Mise à jour lors du redimensionnement
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setStacksPerPage(getStacksPerPage());
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Reset de l'index d'image quand on change de catégorie
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedCategory]);

  const totalPages = Math.ceil(imageCategories.length / stacksPerPage);
  const startIndex = (currentPage - 1) * stacksPerPage;
  const currentStacks = imageCategories.slice(startIndex, startIndex + stacksPerPage);

  // Fonction typée pour créer le contenu des stacks - CORRIGÉE
  const createStackContent = (item: ImageItem) => (
    <div className="relative w-full h-full">
      <Image 
        src={item.img} 
        alt={item.title}
        width={220}
        height={280}
        sizes="220px"
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
        <h3 className="text-white font-semibold text-lg mb-1">
          {item.title}
        </h3>
        <p className="text-white/90 text-sm">
          {item.description}
        </p>
      </div>
      <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
        #{item.id}
      </div>
    </div>
  );

  // Composant pour la vue détail de catégorie
  const CategoryDetailView = () => {
    if (!selectedCategory) return null;
    
    const images = selectedCategory.images;
    const currentImg = images[currentImageIndex];
    const canGoPrev = currentImageIndex > 0;
    const canGoNext = currentImageIndex < images.length - 1;

    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedCategory(null)}
          className="mb-8 px-6 py-3 rounded-full bg-orange-100 text-orange-600 font-semibold hover:bg-orange-200 transition-colors"
        >
          ← Retour à la liste
        </button>
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-orange-600 mb-2">
            {selectedCategory.title}
          </h2>
          <div className="text-orange-400 text-xs mb-4">
            {images.length} propriétés
          </div>
        </div>
        
        {/* SLIDER PRINCIPAL */}
        <div className="relative flex items-center justify-center mb-4">
          <button
            onClick={() => canGoPrev && setCurrentImageIndex(i => i - 1)}
            disabled={!canGoPrev}
            className="absolute left-0 z-10 p-2 bg-white/80 rounded-full shadow hover:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Image précédente"
          >
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <Image
            className="h-auto max-h-[420px] max-w-full rounded-lg mx-auto shadow-lg"
            src={currentImg.img}
            alt={currentImg.title || ''}
            width={800}
            height={420}
          />
          <button
            onClick={() => canGoNext && setCurrentImageIndex(i => i + 1)}
            disabled={!canGoNext}
            className="absolute right-0 z-10 p-2 bg-white/80 rounded-full shadow hover:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Image suivante"
          >
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Miniatures */}
        {images.length > 1 && (
          <div className="flex gap-2 justify-center mb-4">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setCurrentImageIndex(idx)}
                className={`border-2 rounded-lg overflow-hidden focus:outline-none transition-all ${
                  idx === currentImageIndex 
                    ? 'border-orange-500 shadow-lg' 
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
                style={{ width: 64, height: 48 }}
                aria-label={`Voir l'image ${img.title || img.id}`}
              >
                <Image
                  src={img.img}
                  alt={img.title || ''}
                  width={64}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        )}
        
        {/* Description en bas */}
        <div className="mt-8 text-center">
          <p className="text-gray-700 text-base lg:text-lg font-medium max-w-2xl mx-auto">
            {selectedCategory.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <DynamicHero backgroundImage="/heroes.jpeg"/>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4 lg:p-8">
        {/* Si une catégorie est sélectionnée, afficher la vue détail */}
        {selectedCategory ? (
          <CategoryDetailView />
        ) : (
          <>
            {/* En-tête de la section */}
            <div className="text-center mb-8 lg:mb-12">
              <h1 className="text-3xl lg:text-4xl font-bold text-orange-600 mb-4">
                Notre Photothèque
              </h1>
              <p className="text-gray-600 text-base lg:text-lg max-w-2xl mx-auto">
                Explorez nos collections organisées par catégories. Chaque dossier contient plusieurs propriétés à découvrir.
              </p>
            </div>
            
            {/* Grille de Stack Components (Dossiers) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8 mb-8">
              {currentStacks.map((category) => (
                <div 
                  key={category.id} 
                  className="flex flex-col items-center cursor-pointer group" 
                  onClick={() => setSelectedCategory(category)}
                >
                  {/* Titre de la catégorie */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-orange-600 mb-1 group-hover:underline">
                      {category.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {category.description}
                    </p>
                    <div className="text-orange-400 text-xs mt-1">
                      {category.images.length} propriétés
                    </div>
                  </div>
                  
                  {/* Stack avec toutes les images de la catégorie */}
                  <Stack
                    randomRotation={true}
                    sensitivity={180}
                    sendToBackOnClick={false}
                    cardDimensions={{ 
                      width: 220, 
                      height: 280 
                    }}
                    cardsData={category.images.map(item => ({
                      ...item,
                      content: createStackContent(item)
                    }))}
                  />
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mb-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white border-2 border-orange-200 text-orange-600 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Précédent
                </button>
                <div className="flex space-x-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-orange-500 text-white'
                            : 'bg-white border border-orange-200 text-orange-600 hover:bg-orange-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-white border-2 border-orange-200 text-orange-600 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Suivant
                </button>
              </div>
            )}
            
            {/* Indicateur de page */}
            <div className="text-center mb-8">
              <p className="text-gray-600 text-sm">
                Page {currentPage} sur {totalPages} - {imageCategories.length} dossiers au total
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}