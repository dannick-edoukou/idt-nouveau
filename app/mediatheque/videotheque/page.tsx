"use client";

import DynamicHero from '@/app/composants/DynamicHero';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

// --- Interfaces (partagées entre les composants) ---
interface ApiVideo { id: number; title: string; category: string; type: string; description: string; links: string[]; views: number; enabled: number; created_at: string; }
interface ApiResponse { success: number; data: ApiVideo[]; error?: string; }
interface Video { id: number; youtubeId: string; title: string; description: string; date: string; category: string; views: number; enabled: boolean; duration: string; }

// --- Fonctions utilitaires (partagées) ---
const getYoutubeThumbnail = (youtubeId: string) => `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
const getCategoryColor = (category: string) => ({
  "Événements": "bg-red-500", "Interviews": "bg-blue-500", "Reportages": "bg-green-500",
  "Sport & Loisirs": "bg-purple-500", "Actualités": "bg-orange-500", "Patrimoine": "bg-indigo-500"
}[category] || "bg-gray-500");

// --- Composant VideoGrid (gère le chargement et l'affichage des vidéos) ---
function VideoGrid({ searchTerm, sortOrder, onVideoSelect, onVideoCountChange }: {
  searchTerm: string; sortOrder: string; onVideoSelect: (video: Video) => void; onVideoCountChange: (count: number) => void;
}) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);

  const extractYouTubeId = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : url;
  };

  const getSimulatedDuration = (youtubeId: string): string => {
    const durations = ["5:32", "12:45", "8:30", "15:20", "25:10", "18:45", "22:15", "14:30", "20:05", "28:40"];
    const index = parseInt(youtubeId.slice(-1), 16) % durations.length;
    return durations[index] || "N/A";
  };

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/videotheque');
      const apiResponse: ApiResponse = await response.json();
      if (!response.ok || apiResponse.success !== 1) throw new Error(apiResponse.error || 'Erreur API');
      if (!apiResponse.data) throw new Error('Format de réponse API inattendu');

      const formattedVideos = apiResponse.data
        .filter(v => v.enabled === 1 && v.type === 'video')
        .map(v => {
          const youtubeId = extractYouTubeId(v.links?.[0] || '');
          return {
            id: v.id, youtubeId: youtubeId, title: v.title,
            description: v.description, date: v.created_at.split(' ')[0], category: v.category,
            views: v.views, enabled: v.enabled === 1, duration: getSimulatedDuration(youtubeId),
          };
        });
      setVideos(formattedVideos);
      onVideoCountChange(formattedVideos.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [onVideoCountChange]);

  useEffect(() => { fetchVideos(); }, [fetchVideos]);

  useEffect(() => {
    const filtered = videos.filter(v => 
      v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "recent" ? dateB - dateA : dateA - dateB;
    });
    setFilteredVideos(filtered);
  }, [videos, searchTerm, sortOrder]);

  if (loading) return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
      <h2 className="text-xl font-semibold text-gray-700">Chargement des vidéos...</h2>
    </div>
  );

  if (error) return (
    <div className="text-center py-12">
      <h3 className="text-xl font-semibold text-red-600 mb-2">Erreur de chargement</h3>
      <p className="text-gray-500 mb-4">{error}</p>
      <button onClick={fetchVideos} className="bg-orange-500 text-white px-6 py-2 rounded-full">Réessayer</button>
    </div>
  );

  if (filteredVideos.length === 0) return (
    <div className="text-center py-12">
      <h3 className="text-xl font-semibold text-gray-600">Aucune vidéo trouvée</h3>
      <p className="text-gray-500">Essayez de modifier votre recherche.</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredVideos.map((video) => (
        <div key={video.id} onClick={() => onVideoSelect(video)} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer group">
          <div className="relative w-full h-48">
            <Image 
              src={getYoutubeThumbnail(video.youtubeId)} 
              alt={video.title} 
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500" 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`; }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <div className="bg-red-600 text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded-lg text-xs font-medium">{video.duration}</div>
            <div className={`absolute top-3 left-3 ${getCategoryColor(video.category)} text-white px-3 py-1 rounded-full text-xs font-medium`}>{video.category}</div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600">{video.title}</h3>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{formatDate(video.date)}</span>
              <span>{video.views} vues</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Composant Page (principal) ---
export default function VideothequePage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");
  const [videoCount, setVideoCount] = useState(0);

  const openVideoModal = (video: Video) => { setSelectedVideo(video); document.body.style.overflow = 'hidden'; };
  const closeVideoModal = () => { setSelectedVideo(null); document.body.style.overflow = 'unset'; };

  return (
    <div className="relative">
      <DynamicHero backgroundImage="/heroes.jpeg" />
      <div className={`bg-gradient-to-br from-orange-50 to-white transition-all duration-300 ${selectedVideo ? 'blur-sm brightness-75' : ''}`}>
        <div className="bg-white shadow-sm border-b border-orange-100">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-orange-600 mb-4">Notre Vidéothèque</h1>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-6">Découvrez {videoCount > 0 ? videoCount : ''} vidéos de votre communauté.</p>
              <div className="max-w-4xl mx-auto space-y-4">
                <input type="text" placeholder="Rechercher une vidéo..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-6 py-4 rounded-full border-2 border-orange-200" />
                <div className="flex justify-center space-x-4">
                  <button onClick={() => setSortOrder("recent")} className={`px-6 py-3 rounded-full font-medium ${sortOrder === "recent" ? "bg-orange-500 text-white" : "bg-white text-orange-500"}`}>Plus récent</button>
                  <button onClick={() => setSortOrder("oldest")} className={`px-6 py-3 rounded-full font-medium ${sortOrder === "oldest" ? "bg-orange-500 text-white" : "bg-white text-orange-500"}`}>Plus ancien</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <VideoGrid searchTerm={searchTerm} sortOrder={sortOrder} onVideoSelect={openVideoModal} onVideoCountChange={setVideoCount} />
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={closeVideoModal}>
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start p-6 border-b border-gray-200">
                <div className="flex-1 mr-4">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedVideo.title}</h3>
                  <p className="text-gray-600 mb-3">{selectedVideo.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{selectedVideo.duration}</span>
                    <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1h3z" /></svg>{formatDate(selectedVideo.date)}</span>
                    <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>{selectedVideo.views} vues</span>
                  </div>
                </div>
                <button onClick={closeVideoModal} className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="p-6">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`} title={selectedVideo.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}