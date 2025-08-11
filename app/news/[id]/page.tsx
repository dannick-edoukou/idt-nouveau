// app/news/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, Loader2, AlertCircle } from 'lucide-react';


import { Button } from '@/components/ui/button';
import { useNewsItem } from '../../../hooks/useNews';
import DynamicHero from '@/app/composants/DynamicHero';

// Composant de chargement
function LoadingArticle() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-16">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
          <span className="ml-2 text-lg text-gray-600">Chargement de l'article...</span>
        </div>
      </div>
    </div>
  );
}

// Composant d'erreur
function ErrorArticle({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-16">
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Article introuvable
          </h1>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            {error}
          </p>
          <div className="flex gap-4">
            <Button 
              onClick={onRetry}
              className="bg-orange-600 text-white hover:bg-orange-700"
            >
              Réessayer
            </Button>
            <Link href="/">
              <Button variant="outline">
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewsDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const { newsItem, loading, error, refetch } = useNewsItem(id);

  // Forcer un re-render quand l'ID change
  useEffect(() => {
    // Scroll vers le haut quand on change d'article
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // État de chargement
  if (loading) {
    return <LoadingArticle />;
  }

  // État d'erreur
  if (error || !newsItem) {
    return <ErrorArticle error={error || 'Article non trouvé'} onRetry={refetch} />;
  }

  return (
    <>
    <DynamicHero />
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Décoration de fond */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-100/20 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-100/20 to-transparent rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-16">
        {/* Bouton retour */}
        <Link href="/">
          <Button 
            variant="ghost" 
            className="mb-8 text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux actualités
          </Button>
        </Link>

        <article className="bg-white rounded-2xl overflow-hidden shadow-xl">
          {/* Image principale */}
          <div className="relative h-64 md:h-96 lg:h-[500px]">
            <Image
              src={newsItem.image}
              alt={newsItem.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Badge de catégorie */}
            <div className="absolute top-6 left-6">
              <div className="px-4 py-2 bg-orange-600/90 backdrop-blur-sm rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-white" />
                  <span className="text-sm font-semibold text-white uppercase tracking-wider">
                    {newsItem.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="absolute top-6 right-6">
              <div className="px-4 py-2 bg-black/60 backdrop-blur-sm rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white tabular-nums">
                    {newsItem.date}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-6 md:p-8 lg:p-12">
            <header className="mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {newsItem.title}
              </h1>
              
              {/* Indicateurs de l'article */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Publié le {newsItem.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span>{newsItem.category}</span>
                </div>
                {newsItem.featured && (
                  <div className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                    À la une
                  </div>
                )}
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              {/* Description/Contenu principal */}
              <div className="text-gray-700 leading-relaxed text-lg">
                {newsItem.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

        
          </div>
        </article>

      
      </div>
    </div>
    </>
  );
}