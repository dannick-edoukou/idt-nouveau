import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Added import

import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { NewsItem } from '@/types/news';
// Local fallback type for NewsItem based on usage in this file
type NewsItem = {
  id: string | number;
  image: string;
  title: string;
  date: string;
  author: string;
  readTime: number;
  summary: string;
  category: string;
};

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-orange/20">
      <div className="relative overflow-hidden">
        <Image 
          src={news.image} 
          alt={news.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary text-primary-foreground">
            {news.category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{news.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{news.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{news.readTime} min</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {news.title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {news.summary}
        </p>
        
        <Link 
          href={`/actualite/${news.id}`}
          className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all group"
        >
          Lire la suite
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
