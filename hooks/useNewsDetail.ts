// hooks/useNewsDetail.ts
import { useState, useEffect, useCallback } from 'react';
import { NewsItem } from '../app/data/news'; // Importer depuis la source de vérité

export function useNewsDetail(id: string | null) {
  const [newsDetail, setNewsDetail] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNewsDetail = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/news/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erreur ${response.status}`);
      }
      const data = await response.json();
      if (data.success === 1 && data.data) {
        setNewsDetail(data.data);
      } else {
        throw new Error(data.error || 'Article non trouvé');
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la récupération des détails de l\'actualité.');
      setNewsDetail(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchNewsDetail();
  }, [fetchNewsDetail]);

  return { newsDetail, loading, error, refetch: fetchNewsDetail };
}
