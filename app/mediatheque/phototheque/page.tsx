'use client';

import { useState, useEffect, useMemo } from "react";
import Stack from "@/app/composants/stack";
import DynamicHero from "../../composants/DynamicHero";
import Image from "next/image";

// Interface pour typer les images (adaptée à votre API)
interface ImageItem {
  id: number;
  img: string;
  title: string;
  description: string;
}

// Interface pour typer les catégories (adaptée à votre API)
interface ImageCategory {
  id: number;
  title: string;
  description: string;
  category: string;
  images: ImageItem[];
  views: number;
  enabled: number;
  created_at: string;
}

// Interface pour la réponse API
interface ApiResponse {
  success: number;
  data: {
    id: number;
    title: string;
    category: string;
    type: string;
    description: string;
    links: string[];
    views: number;
    enabled: number;
    created_at: string;
  }[];
  error?: string;
}

export default function Phototheque() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<ImageCategory | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageCategories, setImageCategories] = useState<ImageCategory[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Barre de recherche et filtre
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>(''); // valeur vide = toutes

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

  // Fonction pour récupérer les données via le proxy API Next.js
  const fetchApiData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/mediatheque');
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const apiData: ApiResponse = await response.json();

      if (apiData.success !== 1 || !apiData.data) {
        throw new Error(apiData.error || "L'API a renvoyé une erreur ou des données invalides.");
      }

      const transformedData: ImageCategory[] = apiData.data
        .filter(item => item.type === 'image' && item.enabled === 1)
        .map(item => ({
          id: item.id,
          title: item.title,
          category: item.category,
          description: item.description,
          images: item.links.map((link, index) => ({
            id: item.id * 1000 + index, // Crée un ID unique pour chaque image
            img: link,
            title: `${item.title} - Image ${index + 1}`,
            description: item.description
          })),
          views: item.views,
          enabled: item.enabled,
          created_at: item.created_at
        }));

      setImageCategories(transformedData);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Une erreur inconnue est survenue.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

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

  // Récupérer toutes les catégories uniques pour le filtre
  const allCategories = useMemo(() => {
    const cats = Array.from(new Set(imageCategories.map(cat => cat.category).filter(Boolean)));
    return cats;
  }, [imageCategories]);

  // Filtrage par recherche et catégorie
  const filteredCategories = useMemo(() => {
    let filtered = imageCategories;
    if (filterCategory) {
      filtered = filtered.filter(cat => cat.category === filterCategory);
    }
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      filtered = filtered.filter(cat =>
        cat.title.toLowerCase().includes(s) ||
        cat.category.toLowerCase().includes(s) ||
        cat.description.toLowerCase().includes(s)
      );
    }
    return filtered;
  }, [imageCategories, search, filterCategory]);

  // Pagination sur les catégories filtrées
  const totalPages = Math.ceil(filteredCategories.length / stacksPerPage);
  const startIndex = (currentPage - 1) * stacksPerPage;
  const currentStacks = filteredCategories.slice(startIndex, startIndex + stacksPerPage);

  // Remettre la page à 1 si le filtre ou la recherche change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterCategory]);

  // Fonction typée pour créer le contenu des stacks
  const createStackContent = (item: ImageItem) => (
    <div className="relative w-full h-full">
      <Image 
        src={item.img} 
        alt={item.title}
        width={220}
        height={280}
        sizes="220px"
        className="w-full h-full object-cover rounded-lg"
        onError={(e) => {
          console.error('Erreur de chargement d\'image:', item.img);
          // Image de secours
          e.currentTarget.src = '/placeholder-image.jpg';
        }}
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
          <p className="text-gray-600 mb-2">{selectedCategory.category}</p>
          
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
            onError={(e) => {
              console.error('Erreur de chargement d\'image principale:', currentImg.img);
              e.currentTarget.src = '/placeholder-image.jpg';
            }}
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
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.jpg';
                  }}
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
          <div className="mt-4 text-sm text-gray-500">
            Publié le {new Date(selectedCategory.created_at).toLocaleDateString('fr-FR')}
          </div>
        </div>
      </div>
    );
  };

  // Composant de chargement
  const LoadingComponent = () => (
    <div className="flex flex-col items-center justify-center min-h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
      <p className="text-gray-600">Chargement de la photothèque...</p>
    </div>
  );

  // Composant d'erreur simplifié
  const ErrorComponent = () => (
    <div className="flex flex-col items-center justify-center min-h-64">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Erreur de chargement</h3>
      <p className="text-gray-600 mb-4 text-center max-w-md">{error}</p>
      <button
        onClick={fetchApiData}
        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
      >
        Réessayer
      </button>
    </div>
  );

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
            <div className="relative mb-8 lg:mb-12">
              <h1 className="text-3xl lg:text-4xl font-bold text-orange-600 mb-4 text-center">
                Notre Photothèque
              </h1>
            
              {/* Barre de recherche et filtre responsive */}
              <div
                className="
                  w-full
                  flex flex-col gap-2 items-stretch
                  sm:flex-row sm:gap-2 sm:items-center
                  sm:justify-center
                  mt-4
                  z-10
                "
              >
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Recherche..."
                  className="
                    w-full
                    sm:w-48
                    md:w-64
                    px-2 py-2 border border-orange-200 rounded-md text-sm
                    focus:outline-none focus:ring-2 focus:ring-orange-400 transition
                    min-w-0
                  "
                  aria-label="Recherche"
                  style={{ minWidth: 0 }}
                />
                <select
                  value={filterCategory}
                  onChange={e => setFilterCategory(e.target.value)}
                  className="
                    w-full
                    sm:w-44
                    px-2 py-2 border border-orange-200 rounded-md text-sm
                    focus:outline-none focus:ring-2 focus:ring-orange-400 transition
                    min-w-0
                  "
                  aria-label="Filtrer par catégorie"
                  style={{ minWidth: 0 }}
                >
                  <option value="">Toutes</option>
                  {allCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Gestion des états de chargement et d'erreur */}
            {loading ? (
              <LoadingComponent />
            ) : error ? (
              <ErrorComponent />
            ) : filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Aucune catégorie d'images ne correspond à votre recherche ou filtre.</p>
              </div>
            ) : (
              <>
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
                          {category.category}
                        </p>
                      
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
                      onClick={() => {
                        setCurrentPage(prev => {
                          const newPage = Math.max(prev - 1, 1);
                          return newPage;
                        });
                        // Remonter le visuel après le changement de page
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 0);
                      }}
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
                            onClick={() => {
                              if (currentPage !== pageNum) {
                                setCurrentPage(pageNum);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }
                            }}
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
                      onClick={() => {
                        setCurrentPage(prev => {
                          const newPage = Math.min(prev + 1, totalPages);
                          return newPage;
                        });
                        // Remonter le visuel après le changement de page
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 0);
                      }}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg bg-white border-2 border-orange-200 text-orange-600 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Suivant
                    </button>
                  </div>
                )}
                
              
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}