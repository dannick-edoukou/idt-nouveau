// app/lib/data.ts

// 1. Définir le type pour un article d'actualité provenant de l'API
export interface ApiNewsItem {
  id: number;
  title: string;
  category: string;
  featured: number; // 0 ou 1
  description: string;
  image: string;
  created_at: string; // ex: "2025-06-28 18:49:11"
  enabled: number; // 0 ou 1
}

// 2. Définir le type pour la réponse complète de l'API
interface ApiResponse {
  success: number; // 0 ou 1
  data: ApiNewsItem[];
}

/**
 * Récupère un seul article d'actualité par son ID.
 * Cette fonction récupère la liste complète des actualités et la filtre ensuite par ID,
 * car l'API ne supporte pas le filtrage par ID directement.
 */
export async function fetchNewsById(id: number): Promise<ApiNewsItem | null> {
  const EXTERNAL_API_URL = 'http://testapp.dioulatche.io/routes/api.php?action=news';

  try {
    // Appel direct à l'API externe pour éviter le problème de fetch serveur-à-serveur
    const response = await fetch(EXTERNAL_API_URL, { cache: 'no-store' });

    if (!response.ok) {
      console.error(`[fetchNewsById] Échec de l'appel API direct:`, response.statusText);
      return null;
    }

    const result: ApiResponse = await response.json();

    if (result.success !== 1 || !result.data) {
      console.error('[fetchNewsById] L\'API externe a retourné une erreur.');
      return null;
    }

    const allNews = result.data;
    const newsItem = allNews.find(news => String(news.id) === String(id));

    if (!newsItem) {
      console.error(`[fetchNewsById] Article non trouvé pour l'ID : ${id}`);
      return null;
    }

    return newsItem;

  } catch (error) {
    console.error(`[fetchNewsById] Erreur inattendue pour l'ID ${id}:`, error);
    return null;
  }
}

/**
 * Construit l'URL de base de l'application, que ce soit en local ou en production.
 */
function getBaseUrl() {
  // Si le code s'exécute côté client, une URL relative est suffisante.
  if (typeof window !== 'undefined') {
    return '';
  }

  // Si le code s'exécute côté serveur (ex: déploiement Vercel).
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Fallback pour le développement local côté serveur.
  return `http://localhost:3002`;
};

/**
 * Récupère toutes les actualités en utilisant la route proxy interne /api/news.
 */
/**
 * Récupère la liste générale des actualités via le proxy /api/in-the-news.
 */
export async function fetchInTheNews(): Promise<ApiNewsItem[]> {
  const baseUrl = getBaseUrl();
  const fullUrl = `${baseUrl}/api/in-the-news`;
  try {
    const response = await fetch(fullUrl, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`[fetchInTheNews] Échec de l'appel API à ${fullUrl}:`, response.statusText);
      return [];
    }

    const result: ApiResponse = await response.json();

    if (result.success !== 1 || !result.data) {
      console.error('[fetchInTheNews] L\'API a retourné une erreur ou des données invalides:', result);
      return [];
    }

    return result.data;

  } catch (error) {
    console.error('Erreur lors de l\'appel à /api/in-the-news:', error);
    return [];
  }
}

export async function fetchAllNews(): Promise<ApiNewsItem[]> {
  try {
    const baseUrl = getBaseUrl();
    // On appelle notre propre route API qui agit comme un proxy avec une URL absolue
    const response = await fetch(`${baseUrl}/api/news`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(20000), // 20 secondes de timeout
    });

    if (!response.ok) {
      console.error('Échec de la récupération via le proxy /api/news:', response.statusText);
      return [];
    }

    const result: ApiResponse = await response.json();

    if (result.success !== 1 || !result.data) {
      console.error('La route proxy a retourné une erreur ou une structure de données invalide.');
      return [];
    }

    return result.data;

  } catch (error) {
    console.error('Une erreur est survenue lors de l\'appel à la route proxy /api/news:', error);
    return [];
  }
}


