'use client';

import { useState, useEffect } from "react";
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
    try {
      setLoading(true);
      setError(null);
      
      console.log('Appel de la route proxy API...');
      
      // On appelle notre propre route API qui va se charger de contacter l'API externe
      const response = await fetch('/api/mediatheque');
      
      console.log('Réponse reçue du proxy:', response.status, response.statusText);
      
      const apiData: ApiResponse = await response.json();

      if (!response.ok) {
        // Si le proxy a renvoyé une erreur (ex: 500), on l'affiche
        throw new Error(apiData.error || `Erreur HTTP: ${response.status}`);
      }
      
      console.log('Données reçues du proxy:', apiData);
      
      if (apiData.success !== 1) {
        throw new Error(apiData.error || 'Erreur dans la réponse de l\'API');
      }
      
      // La transformation des données reste la même
      const transformedCategories: ImageCategory[] = apiData.data
        .filter(item => item.enabled === 1)
        .map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          category: item.category,
          views: item.views,
          enabled: item.enabled,
          created_at: item.created_at,
          images: item.links.map((link, index) => {
            try {
              // L'API renvoie une URL complète, on en extrait le nom de l'image.
              const url = new URL(link);
              const imageName = url.searchParams.get('type'); // Extrait '2.webp' de '...&type=2.webp'
              if (!imageName) {
                console.error("Impossible d'extraire le nom de l'image du lien:", link);
                return null;
              }
              const imageUrl = `http://testapp.dioulatche.io/routes/api.php?action=image&name=${imageName}`;
              
              return {
                id: item.id * 1000 + index,
                img: imageUrl,
                title: `${item.title} ${index + 1}`,
                description: `Image ${index + 1} - ${item.category}`
              };
            } catch (e) {
              console.error("Lien d'image invalide, impossible de construire l'URL:", link, e);
              return null;
            }
          }).filter(Boolean) as { id: number; img: string; title: string; description: string; }[]
        }));
      
      console.log('Catégories transformées:', transformedCategories);
      setImageCategories(transformedCategories);
      
    } catch (err) {
      console.error('Erreur lors du chargement des données:', err);
      
      let errorMessage = 'Erreur lors du chargement des données';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };



  // Chargement initial des données
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

  const totalPages = Math.ceil(imageCategories.length / stacksPerPage);
  const startIndex = (currentPage - 1) * stacksPerPage;
  const currentStacks = imageCategories.slice(startIndex, startIndex + stacksPerPage);

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
          <div className="text-orange-400 text-xs mb-4">
            {images.length} propriétés • {selectedCategory.views} vues
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
            Créé le {new Date(selectedCategory.created_at).toLocaleDateString('fr-FR')}
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
            <div className="text-center mb-8 lg:mb-12">
              <h1 className="text-3xl lg:text-4xl font-bold text-orange-600 mb-4">
                Notre Photothèque
              </h1>
              <p className="text-gray-600 text-base lg:text-lg max-w-2xl mx-auto">
                Explorez nos collections organisées par catégories. Chaque dossier contient plusieurs propriétés à découvrir.
              </p>
              {/* Indicateur de débogage */}
              <div className="mt-4 text-sm text-gray-500">
                {imageCategories.length} catégories chargées
              </div>
            </div>
            
            {/* Gestion des états de chargement et d'erreur */}
            {loading ? (
              <LoadingComponent />
            ) : error ? (
              <ErrorComponent />
            ) : imageCategories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Aucune catégorie d'images disponible pour le moment.</p>
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
                        <div className="text-orange-400 text-xs mt-1">
                          {category.images.length} propriétés • {category.views} vues
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
          </>
        )}
      </div>
    </div>
  );
}