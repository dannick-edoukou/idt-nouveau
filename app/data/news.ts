// data/news.ts - Mise à jour de votre interface
export interface NewsItem {
  id: number;
  title: string;
  category: string;
  featured: boolean;
  description: string;
  image: string;
  date: string; // Format affiché (ex: "30 juin 2025")
  created_at: string; // Format ISO de l'API
  enabled: boolean;
}

export interface NewsApiResponse {
  success: number;
  data: NewsItem[];
  error?: string;
}