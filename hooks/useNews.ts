// hooks/useNews.ts
import { useState, useEffect, useCallback } from 'react';

export interface NewsItem {
  id: number;
  title: string;
  category: string;
  featured: boolean;
  description: string;
  image: string;
  date: string; // Format affiché (ex: "30 juin 2025")
  created_at?: string; // Format ISO de l'API
  enabled: boolean;
}

export interface NewsApiResponse {
  success: number;
  data: NewsItem[];
  error?: string;
}

export function useNews(endpoint: string = '/api/news') {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Éviter le cache pour avoir des données fraîches
        cache: 'no-cache',
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
      }

      const data: NewsApiResponse = await response.json();

      if (data.success === 0) {
        throw new Error(data.error || 'Erreur inconnue de l\'API');
      }

      if (!data.data || !Array.isArray(data.data)) {
        throw new Error('Format de données invalide reçu de l\'API');
      }

      // Trier par date décroissante (les plus récents en premier)
      const sortedNews = data.data.sort((a, b) => {
        const dateA = new Date(a.created_at || a.date);
        const dateB = new Date(b.created_at || b.date);
        return dateB.getTime() - dateA.getTime();
      });

      setNews(sortedNews);
    } catch (err) {
      console.error('Erreur lors de la récupération des news:', err);
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Une erreur inattendue est survenue';
      setError(errorMessage);
      setNews([]); // S'assurer que news est vide en cas d'erreur
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  // Fonction pour refetch les données
  const refetch = useCallback(() => {
    fetchNews();
  }, [fetchNews]);

  // Charger les données au montage du composant
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    news,
    loading,
    error,
    refetch,
  };
}

// Hook pour récupérer un article spécifique
export function useNewsItem(id: string | number) {
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNewsItem = useCallback(async (articleId: string | number) => {
    if (!articleId) {
      setError('ID requis');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setNewsItem(null); // Réinitialiser l'article précédent

    try {
      // Log de l'URL appelée pour diagnostiquer les problèmes de détail
      console.log(`[useNewsItem] Fetching:`, `/api/news/${articleId}`);
      const response = await fetch(`/api/news/${articleId}?t=${Date.now()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Article non trouvé');
        }
        throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      // Logs détaillés de la réponse API
      console.log('[useNewsItem] Response raw:', data);
      console.log('[useNewsItem] Response data field:', data?.data);

      if (data.success === 0) {
        throw new Error(data.error || 'Article non trouvé');
      }

      if (!data.data) {
        throw new Error('Aucune donnée reçue');
      }

      setNewsItem(data.data);
    } catch (err) {
      console.error(`Erreur lors de la récupération de l'article ${articleId}:`, err);
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Une erreur inattendue est survenue';
      setError(errorMessage);
      setNewsItem(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fonction pour refetch les données
  const refetch = useCallback(() => {
    fetchNewsItem(id);
  }, [fetchNewsItem, id]);

  // Charger les données quand l'ID change
  useEffect(() => {
    if (id) {
      fetchNewsItem(id);
    }
  }, [id, fetchNewsItem]);

  return {
    newsItem,
    loading,
    error,
    refetch,
  };
}