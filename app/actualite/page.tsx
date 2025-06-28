"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, Filter, Search } from 'lucide-react';
import DynamicHero from '../composants/DynamicHero';
import Image from 'next/image';
import Link from 'next/link';

import { mockNews, NewsItem } from '../data/news';
import { parseDate } from '../lib/utils';

// Composant pour une carte d'actualité, maintenant un lien
const NewsCard: React.FC<{ news: NewsItem }> = ({ news }) => {
  return (
    <Link href={`/actualite/${news.id}`} className="block">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-orange-100">
      <div className="relative">
        <Image 
          src={news.image} 
          alt={news.title}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {news.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <Calendar className="w-4 h-4" />
          <span>{news.date}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-orange-600 transition-colors">
          {news.title}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-3">
          {news.summary}
        </p>
      </div>
      </div>
    </Link>
  );
};

// Composant principal
const NewsList: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('recent');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // On appelle notre propre route API qui agit comme un proxy sécurisé
        const response = await fetch('/api/news');
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error('Failed to fetch news, serving mock data as fallback:', error);
        // En cas d'échec de notre API interne, on utilise les données de test
        setNewsData(mockNews);
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  // Filtrer et trier les actualités pour la liste principale
  const filteredAndSortedNews = newsData
    .filter(news => 
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return sortOrder === 'recent' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-orange-500">Chargement des actualités...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
       <DynamicHero backgroundImage="/heroes.jpeg"/>
     
      {/* Barre de recherche et filtres */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une actualité..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <Filter className="w-5 h-5" />
                <span>Trier par :</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortOrder('recent')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    sortOrder === 'recent'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                  }`}
                >
                  Plus récent
                </button>
                <button
                  onClick={() => setSortOrder('older')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    sortOrder === 'older'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                  }`}
                >
                  Plus ancien
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des actualités */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Toutes les actualités</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedNews.map((news) => (
            <NewsCard 
              key={news.id} 
              news={news} 
            />
          ))}
        </div>
        
        {filteredAndSortedNews.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucune actualité trouvée pour votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsList;