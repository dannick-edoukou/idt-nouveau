"use client";

import { useState, useEffect } from 'react';

// Données vidéos avec dates réelles
const allVideos = [
  { 
    id: 1, 
    youtubeId: "dQw4w9WgXcQ",
    title: "FC'estival d'IDTÉté 2024",
    description: "Ambiance fC'estive au cœur de la ville",
    date: "2024-07-15",
    category: "Événements"
  },
  { 
    id: 2, 
    youtubeId: "dQw4w9WgXcQ",
    title: "Inauguration Parc Central",
    description: "Nouveau poumon vert de la commune",
    date: "2024-09-20",
    category: "Événements"
  },
  { 
    id: 3, 
    youtubeId: "dQw4w9WgXcQ",
    title: "Marché de Noël",
    description: "Tradition et convivialité hivernale",
    date: "2024-12-10",
    category: "Événements"
  },
  { 
    id: 4, 
    youtubeId: "dQw4w9WgXcQ",
    title: "Entretien avec le Maire",
    description: "Vision et projets pour l'avenir",
    date: "2024-11-05",
    category: "Interviews"
  },
  { 
    id: 5, 
    youtubeId: "dQw4w9WgXcQ",
    title: "Entrepreneurs Locaux",
    description: "Innovation et développement économique",
    date: "2024-10-12",
    category: "Interviews"
  },
  { 
    id: 6, 
    youtubeId: "dQw4w9WgXcQ",
    title: "Citoyens Engagés",
    description: "Témoignages et initiatives citoyennes",
    date: "2024-08-30",
    category: "Interviews"
  },
  { 
    id: 7, 
    youtubeId: "dQw4w9WgXcQ",
    title: "Éducation Innovante",
    description: "Nouvelles méthodes pédagogiques",
    date: "2024-06-18",
    category: "Reportages"
  },
  { 
    id: 8, 
    youtubeId: "dQw4w9WgXcQ",
    title: "Environnement Local",
    description: "Actions pour la biodiversité",
    date: "2024-05-25",
    category: "Reportages"
  },
  { 
    id: 9, 
    youtubeId: "dQw4w9WgXcQ",
    title: "Culture et Patrimoine",
    description: "Richesses historiques de la région",
    date: "2024-04-14",
    category: "Reportages"
  },
  { 
    id: 10, 
    youtubeId: "dQw4w9WgXcQ",
    title: "Tournoi Football Amateur",
    description: "Passion sportive locale",
    date: "2024-03-22",
    category: "Sport & Loisirs"
  },
  { 
    id: 11, 
    youtubeId: "dQw4w9WgXcQ",
    title: "Randonnée Découverte",
    description: "Sentiers naturels à explorer",
    date: "2024-02-10",
    category: "Sport & Loisirs"
  },
  { 
    id: 12, 
    youtubeId: "dQw4w9WgXcQ",
    title: "Centre Aquatique",
    description: "Installations modernes pour tous",
    date: "2024-01-28",
    category: "Sport & Loisirs"
  }
];

export default function Videotheque() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("recent"); // "recent" ou "oldest"
  const [filteredVideos, setFilteredVideos] = useState(allVideos);
  const [videoData, setVideoData] = useState({});

  // Fonction pour obtenir les données d'une vidéo YouTube
  const fetchVideoData = async (youtubeId) => {
    try {
      // Simulation d'une API call - en réalité, vous utiliseriez l'API YouTube
      // Pour la démo, on simule des données
      const simulatedData = {
        title: getSimulatedTitle(youtubeId),
        duration: getSimulatedDuration(youtubeId),
        viewCount: Math.floor(Math.random() * 10000) + 1000,
        publishedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
      };
      
      setVideoData(prev => ({
        ...prev,
        [youtubeId]: simulatedData
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des données vidéo:', error);
    }
  };

  // Fonctions de simulation (à remplacer par de vraies données)
  const getSimulatedTitle = (youtubeId) => {
    const video = allVideos.find(v => v.youtubeId === youtubeId);
    return video ? video.title : "Titre non disponible";
  };

  const getSimulatedDuration = (youtubeId) => {
    const durations = ["5:32", "12:45", "8:30", "15:20", "25:10", "18:45", "22:15", "14:30", "20:05", "28:40"];
    const index = parseInt(youtubeId.slice(-1), 16) % durations.length;
    return durations[index];
  };

  // Effet pour charger les données des vidéos
  useEffect(() => {
    allVideos.forEach(video => {
      if (!videoData[video.youtubeId]) {
        fetchVideoData(video.youtubeId);
      }
    });
  }, []);

  // Filtrage et tri des vidéos
  useEffect(() => {
    let filtered = allVideos;

    // Filtrage par recherche
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tri par date
    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "recent" ? dateB - dateA : dateA - dateB;
    });

    setFilteredVideos(filtered);
  }, [searchTerm, sortOrder]);

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    document.body.style.overflow = 'hidden'; // Empêche le scroll
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'unset'; // Restaure le scroll
  };

  const getYoutubeThumbnail = (youtubeId) => {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Événements": "bg-red-500",
      "Interviews": "bg-blue-500",
      "Reportages": "bg-green-500",
      "Sport & Loisirs": "bg-purple-500",
      "Actualités": "bg-orange-500",
      "Patrimoine": "bg-indigo-500"
    };
    return colors[category] || "bg-gray-500";
  };

  return (
    <div className="relative">
      {/* Contenu principal de la page */}
      <div className={`min-h-screen bg-gradient-to-br from-orange-50 to-white transition-all duration-300 ${selectedVideo ? 'blur-sm brightness-75' : ''}`}>
        {/* En-tête avec recherche et filtres */}
        <div className="bg-white shadow-sm border-b border-orange-100">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-orange-600 mb-4">
                Notre Vidéothèque
              </h1>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-6">
                Découvrez {allVideos.length} vidéos de votre communauté. 
                Explorez nos contenus locaux et restez connecté avec l'actualité.
              </p>
              
              {/* Barre de recherche et filtres */}
              <div className="max-w-4xl mx-auto space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher une vidéo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 rounded-full border-2 border-orange-200 focus:border-orange-400 focus:outline-none text-gray-700 bg-orange-50/50"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                {/* Filtres de tri */}
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setSortOrder("recent")}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      sortOrder === "recent" 
                        ? "bg-orange-500 text-white shadow-lg" 
                        : "bg-white text-orange-500 border-2 border-orange-200 hover:border-orange-400"
                    }`}
                  >
                    Plus récent
                  </button>
                  <button
                    onClick={() => setSortOrder("oldest")}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      sortOrder === "oldest" 
                        ? "bg-orange-500 text-white shadow-lg" 
                        : "bg-white text-orange-500 border-2 border-orange-200 hover:border-orange-400"
                    }`}
                  >
                    Plus ancien
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Grille des vidéos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer group"
                onClick={() => openVideoModal(video)}
              >
                <div className="relative">
                  <img 
                    src={getYoutubeThumbnail(video.youtubeId)}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                    }}
                  />
                  
                  {/* Overlay avec bouton play */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-red-600 text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Badge durée */}
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded-lg text-xs font-medium">
                    {videoData[video.youtubeId]?.duration || "Loading..."}
                  </div>
                  
                  {/* Badge catégorie */}
                  <div className={`absolute top-3 left-3 ${getCategoryColor(video.category)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                    {video.category}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {videoData[video.youtubeId]?.title || video.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatDate(video.date)}</span>
                    <span className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {videoData[video.youtubeId]?.viewCount || "..."} vues
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message si aucun résultat */}
          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune vidéo trouvée</h3>
              <p className="text-gray-500">Essayez de modifier votre recherche ou changez l'ordre de tri.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de lecture vidéo - En dehors du conteneur flouté */}
      {selectedVideo && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
            {/* Header du modal */}
            <div className="flex justify-between items-start p-6 border-b border-gray-200">
              <div className="flex-1 mr-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {videoData[selectedVideo.youtubeId]?.title || selectedVideo.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {selectedVideo.description}
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {videoData[selectedVideo.youtubeId]?.duration || "Loading..."}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1h3z" />
                    </svg>
                    {formatDate(selectedVideo.date)}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {videoData[selectedVideo.youtubeId]?.viewCount || "..."} vues
                  </span>
                </div>
              </div>
              <button
                onClick={closeVideoModal}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Contenu vidéo */}
            <div className="p-6">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}