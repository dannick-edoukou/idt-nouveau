
"use client"
import React, { useState } from 'react';
import { Calendar, Filter, ArrowLeft, Search } from 'lucide-react';
import DynamicHero from '../composants/DynamicHero';

// Types
interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: number;
}

// Données d'exemple
const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "Nouvelle technologie révolutionnaire dans le secteur",
    summary: "Une innovation majeure qui va transformer notre approche du travail et améliorer l'efficacité de nos processus quotidiens.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
    date: "15 Juin 2025",
    author: "Marie Dubois",
    category: "Technologie",
    readTime: 5
  },
  {
    id: 2,
    title: "Lancement de notre nouveau service client",
    summary: "Découvrez notre nouvelle approche du service client avec des outils innovants et une équipe dédiée à votre satisfaction.",
    content: "Nous sommes fiers d'annoncer le lancement de notre nouveau service client, conçu pour offrir une expérience exceptionnelle à nos utilisateurs. Cette initiative s'inscrit dans notre démarche d'amélioration continue et notre engagement envers la satisfaction client. Notre équipe nouvellement formée utilise les dernières technologies pour vous accompagner de manière plus efficace et personnalisée.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
    date: "12 Juin 2025",
    author: "Pierre Martin",
    category: "Service",
    readTime: 3
  },
  {
    id: 3,
    title: "Partenariat stratégique avec des leaders du marché",
    summary: "Un nouveau partenariat qui va nous permettre d'étendre notre portée et d'offrir des services encore plus complets à nos clients.",
    content: "Ce partenariat stratégique marque une étape importante dans notre développement. En nous associant avec des leaders reconnus du marché, nous pouvons désormais proposer une gamme de services élargie et bénéficier d'une expertise complémentaire. Cette collaboration va nous permettre d'accélérer notre croissance et d'atteindre de nouveaux marchés.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
    date: "10 Juin 2025",
    author: "Sophie Leclerc",
    category: "Business",
    readTime: 4
  },
  {
    id: 4,
    title: "Initiative environnementale : notre engagement vert",
    summary: "Découvrez les actions concrètes que nous mettons en place pour réduire notre impact environnemental et contribuer à un avenir durable.",
    content: "L'environnement est au cœur de nos préoccupations. C'est pourquoi nous avons mis en place une série d'initiatives pour réduire notre empreinte carbone et promouvoir des pratiques durables. De la réduction de nos déchets à l'optimisation de notre consommation énergétique, chaque action compte pour construire un avenir plus respectueux de la planète.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
    date: "8 Juin 2025",
    author: "Thomas Rousseau",
    category: "Environnement",
    readTime: 6
  }
];

// Composant pour une carte d'actualité
const NewsCard: React.FC<{ news: NewsItem; onClick: () => void }> = ({ news, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-orange-100"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={news.image} 
          alt={news.title}
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
  );
};

// Composant pour afficher le détail d'une actualité
const NewsDetail: React.FC<{ news: NewsItem; onBack: () => void }> = ({ news, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50">
        <DynamicHero backgroundImage="/heroes.jpeg"/>
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour aux actualités
        </button>
        
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative">
            <img 
              src={news.image} 
              alt={news.title}
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
};

// Composant principal
const NewsList: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('recent');
  
  // Fonction pour convertir la date en format comparable
  const parseDate = (dateStr: string): Date => {
    const months = {
      'Janvier': 0, 'Février': 1, 'Mars': 2, 'Avril': 3, 'Mai': 4, 'Juin': 5,
      'Juillet': 6, 'Août': 7, 'Septembre': 8, 'Octobre': 9, 'Novembre': 10, 'Décembre': 11
    };
    const [day, monthName, year] = dateStr.split(' ');
    return new Date(parseInt(year), months[monthName as keyof typeof months], parseInt(day));
  };
  
  // Filtrer et trier les actualités
  const filteredAndSortedNews = mockNews
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

  if (selectedNews) {
    return <NewsDetail news={selectedNews} onBack={() => setSelectedNews(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
       <DynamicHero backgroundImage="/heroes.jpeg"/>

      {/* Barre de recherche et filtres */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-6 flex-wrap">
            {/* Barre de recherche */}
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
            
            {/* Filtre de tri */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedNews.map((news) => (
            <NewsCard 
              key={news.id} 
              news={news} 
              onClick={() => setSelectedNews(news)}
            />
          ))}
        </div>
        
        {filteredAndSortedNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucune actualité trouvée pour votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsList;