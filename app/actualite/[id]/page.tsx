"use client";

import { ArrowLeft, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DynamicHero from '../../composants/DynamicHero';
import { mockNews, NewsItem } from '../../data/news';



// This function finds the news item by its ID
const getNewsById = (id: number): NewsItem | undefined => {
  return mockNews.find(news => news.id === id);
};

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const newsId = parseInt(params.id, 10);
  const news = getNewsById(newsId);

  // If no news item is found for the given ID, show a 404 page
  if (!news) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DynamicHero backgroundImage="/heroes.jpeg" />
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/actualite"
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour aux actualités
        </Link>
        
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative">
            <Image 
              src={news.image} 
              alt={news.title}
              width={1200}
              height={600}
              className="w-full h-80 object-cover"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                {news.category}
              </span>
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
              <Calendar className="w-5 h-5" />
              <span>{news.date}</span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
              {news.title}
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-6 font-medium leading-relaxed">
                {news.summary}
              </p>
              
              <div className="text-gray-700 leading-relaxed space-y-4">
                {news.content.split('. ').map((sentence, index) => (
                  <p key={index} className="mb-4">
                    {sentence.trim() + (index < news.content.split('. ').length - 1 ? '.' : '')}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
