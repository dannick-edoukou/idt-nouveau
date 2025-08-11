// app/composants/article-detail.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Tag } from 'lucide-react';

// Define the shape of the article data
interface NewsItem {
  id: number;
  title: string;
  category: string;
  featured: boolean;
  description: string;
  image: string;
  date: string;
}

// The component to display a single article
export default function ArticleDetail({ article }: { article: NewsItem }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-64 md:h-96">
            <Image
              src={article.image}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Tag className="w-4 h-4 mr-1" />
              <span>{article.category}</span>
              <span className="mx-2">|</span>
              <Calendar className="w-4 h-4 mr-1" />
              <span>{article.date}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
            <p className="text-gray-700 leading-relaxed">{article.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
