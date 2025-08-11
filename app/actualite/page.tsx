'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag, ChevronRight, AlertCircle, Search } from 'lucide-react';
import { useNews, type NewsItem as HookNewsItem } from '../../hooks/useNews';
import DynamicHero from '../composants/DynamicHero';

// Types
type NewsItem = HookNewsItem;

// Skeleton Loader
const NewsSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden animate-pulse">
    <div className="h-48 bg-gradient-to-r from-orange-50 to-orange-100" />
    <div className="p-5 space-y-4">
      <div className="flex gap-3">
        <div className="h-4 bg-orange-100 rounded w-20" />
        <div className="h-4 bg-orange-100 rounded w-16" />
      </div>
      <div className="h-5 bg-orange-100 rounded w-full" />
      <div className="h-5 bg-orange-100 rounded w-3/4" />
      <div className="h-4 bg-orange-50 rounded w-full" />
      <div className="h-4 bg-orange-50 rounded w-2/3" />
    </div>
  </div>
);

// News Card
const NewsCard = React.memo(({ article }: { article: NewsItem }) => (
  <article className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
    <div className="relative h-48 overflow-hidden">
      <Image
        src={article.image || '/placeholder-news.jpg'}
        alt={article.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-md">
        <Tag size={12} />
        {article.category}
      </div>
      <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-2">
        <Calendar size={12} />
        {article.date}
      </div>
    </div>
    <div className="p-6">
      <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
        {article.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6">{article.description}</p>
      <div className="flex justify-between items-center border-t pt-4">
        <Link
          href={`/news/${article.id}`}
          className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center gap-2 transition-all duration-300 hover:gap-3"
        >
          Lire la suite
          <ChevronRight size={16} />
        </Link>
        {article.readTime && (
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock size={12} />
            {article.readTime}
          </div>
        )}
      </div>
    </div>
  </article>
));

NewsCard.displayName = 'NewsCard';

// Main Component
const NewsComponent: React.FC = () => {
  const { news, loading, error } = useNews();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(news.map(a => a.category)))],
    [news]
  );

  const filteredNews = useMemo(() => {
    let filtered = selectedCategory === 'all' ? news : news.filter(a => a.category === selectedCategory);
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(a => a.title.toLowerCase().includes(query) || a.description.toLowerCase().includes(query));
    }
    return filtered;
  }, [news, selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => <NewsSkeleton key={i} />)}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-white p-8 rounded-xl shadow-md border max-w-md mx-auto">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={40} />
          <h3 className="text-lg font-semibold text-red-600 mb-2">Erreur de chargement</h3>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <>  
    <DynamicHero />
    <section className="max-w-7xl mx-auto p-6">
      {/* Search */}
      <div className="relative max-w-xl mx-auto mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400" size={20} />
        <input
          type="search"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Rechercher une actualité..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-orange-100 focus:ring-2 focus:ring-orange-400 outline-none"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full font-medium transition-all ${
              selectedCategory === category
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-white border border-orange-100 hover:bg-orange-50'
            }`}
          >
            {category === 'all' ? 'Toutes' : category}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredNews.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map(article => <NewsCard key={article.id} article={article} />)}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-12">Aucun résultat trouvé</p>
      )}
    </section>
    </>
  );
};

export default NewsComponent;
