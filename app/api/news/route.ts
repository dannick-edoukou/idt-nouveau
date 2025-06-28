import { NextResponse } from 'next/server';
import { mockNews, NewsItem } from '@/app/data/news';

// Interface pour définir la structure des articles de l'API externe
interface ExternalApiArticle {
  title?: string;
  description?: string;
  content?: string;
  urlToImage?: string;
  publishedAt: string;
  author?: string;
  source: {
    name?: string;
  };
}

// Fonction pour adapter les données de l'API externe à notre format NewsItem
const adaptApiDataToNewsItem = (articles: ExternalApiArticle[]): NewsItem[] => {
  return articles.map((article, index) => ({
    id: index + 1, // L'API ne fournit pas d'ID stable, nous en générons un
    title: article.title || 'Titre non disponible',
    summary: article.description || '',
    content: article.content || article.description || '',
    image: article.urlToImage || '/default-image.jpg', // Prévoir une image par défaut
    date: new Date(article.publishedAt).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    author: article.author || article.source.name || 'Auteur inconnu',
    category: article.source.name || 'Général',
    readTime: Math.ceil((article.content || '').split(' ').length / 200) || 5, // Estimation du temps de lecture
  }));
};

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;
  const apiUrl = process.env.NEWS_API_URL;

  // Si la clé API ou l'URL n'est pas configurée, on renvoie les données de test
  if (!apiKey || !apiUrl) {
    console.log('API key or URL not found, serving mock data.');
    return NextResponse.json(mockNews);
  }

  try {
    // On ajoute la clé API dans les en-têtes pour l'authentification
    const response = await fetch(apiUrl, {
      headers: {
        'X-Api-Key': apiKey,
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch from external API, status:', response.status);
      // En cas d'échec de l'API externe, on renvoie les données de test
      return NextResponse.json(mockNews);
    }

    const data = await response.json();
    
    // On vérifie que la réponse contient bien des articles
    if (data.articles && data.articles.length > 0) {
        const adaptedData = adaptApiDataToNewsItem(data.articles);
        return NextResponse.json(adaptedData);
    } else {
        // Si l'API ne renvoie aucun article, on utilise les données de test
        console.log('No articles found from API, serving mock data.');
        return NextResponse.json(mockNews);
    }

  } catch (error) {
    console.error('Error fetching from external API:', error);
    // En cas d'erreur (ex: réseau), on renvoie les données de test
    return NextResponse.json(mockNews);
  }
}