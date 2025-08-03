'use client';

import { usePathname } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';

import Image from 'next/image';
import { Sparkles } from 'lucide-react';

// Configuration des menus - adaptée de votre structure
const MENU_CONFIG = {
  'presentation': {
    title: 'IDT',
    description: 'Découvrez notre présentation institutionnelle'
  },
  'mot-du-dg': {
    title: 'IDT',
    description: 'Message du Directeur Général'
  },
  'nos-missions': {
    title: 'IDT',
    description: 'Nos missions et objectifs stratégiques'
  },
  'fonctionnement': {
    title: 'IDT',
    description: 'Comment nous fonctionnons'
  },
  'document-juridique': {
    title: 'IDT',
    description: 'Cadre juridique et réglementaire'
  },
  'services': {
    title: 'Nos Services',
    description: 'Des solutions adaptées à vos besoins'
  },
  'les-chaines': {
    title: 'Les Chaînes',
    description: 'Découvrez toutes les chaînes de la TNT'
  },
  'actualite': {
    title: 'Actualité',
    description: 'Restez informé de nos dernières nouvelles'
  },
  'mediatheque': {
    title: 'Médiathèque',
    description: 'Explorez notre collection de contenus'
  },
  'contacts': {
    title: 'Contact',
    description: 'Entrez en contact avec nos équipes'
  },
  'faq': {
    title: 'FAQ',
    description: 'Questions fréquentes sur la TNT et nos services'
  },
  'radio': {
    title: 'Radio',
    description: 'Découvrez notre radio'
  },
 
} as const;

// Types
interface BreadcrumbItem {
  label: string;
  href: string;
  isActive: boolean;
}

interface ParentMenuInfo {
  title: string;
  description?: string;
  currentPath: string;
  segments: string[];
  parentSegment: string;
}

// Particules prédéfinies pour éviter Math.random() côté serveur
const PREDEFINED_PARTICLES = [
  { left: 15, top: 25, delay: 0.5, duration: 2.5 },
  { left: 85, top: 40, delay: 1.2, duration: 3.0 },
  { left: 45, top: 70, delay: 0.8, duration: 2.8 },
  { left: 75, top: 15, delay: 2.0, duration: 3.2 },
  { left: 25, top: 85, delay: 1.5, duration: 2.2 },
  { left: 65, top: 55, delay: 0.3, duration: 2.9 },
  { left: 35, top: 30, delay: 1.8, duration: 3.5 },
  { left: 90, top: 80, delay: 0.9, duration: 2.6 }
];

// Composant Breadcrumb compact
const BreadcrumbNav = ({ items }: { items: BreadcrumbItem[] }) => {
  if (items.length === 0) return null;

  return (
    <nav className="mb-4 animate-fade-in-up" aria-label="Fil d'ariane">
     
    </nav>
  );
};

// Composant Background du Hero simplifié
const HeroBackground = ({ backgroundImage }: { backgroundImage?: string }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {/* Image de fond */}
      {backgroundImage && (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={backgroundImage}
            alt=""
            fill
            style={{ objectFit: 'cover' }}
            className="absolute inset-0 pointer-events-none select-none"
            priority
          />
        </div>
      )}
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-orange-900/80 z-10" />
      
      {/* Effets de lumière réduits */}
      <div className="absolute inset-0 z-20 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-full blur-2xl animate-float" />
        <div className="absolute top-1/4 -left-16 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-float-delayed" />
      </div>
      
      {/* Particules avec valeurs prédéfinies - seulement côté client */}
      {isClient && (
        <div className="absolute inset-0 z-20">
          {PREDEFINED_PARTICLES.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full animate-twinkle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Vague en bas simplifiée */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <svg 
          viewBox="0 0 1200 60" 
          className="w-full h-6 md:h-8"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,60 C300,20 600,40 900,30 C1050,25 1200,35 1200,60 Z" 
            fill="white"
            opacity="0.9"
          />
        </svg>
      </div>
    </>
  );
};

// Hook pour la navigation (inchangé)
const useMenuNavigation = () => {
  const pathname = usePathname();

  const parentMenu = useMemo((): ParentMenuInfo | null => {
    const pathSegments = pathname.split('/').filter(Boolean);
    
    if (pathSegments.length === 0) return null;
    
    const fullPath = pathSegments.join('/');
    if (MENU_CONFIG[fullPath as keyof typeof MENU_CONFIG]) {
      return {
        ...MENU_CONFIG[fullPath as keyof typeof MENU_CONFIG],
        currentPath: pathname,
        segments: pathSegments,
        parentSegment: pathSegments[0]
      };
    }
    
    const firstSegment = pathSegments[0];
    if (MENU_CONFIG[firstSegment as keyof typeof MENU_CONFIG]) {
      return {
        ...MENU_CONFIG[firstSegment as keyof typeof MENU_CONFIG],
        currentPath: pathname,
        segments: pathSegments,
        parentSegment: firstSegment
      };
    }
    
    return null;
  }, [pathname]);

  const breadcrumbItems = useMemo((): BreadcrumbItem[] => {
    if (!parentMenu) return [];
    
    const items: BreadcrumbItem[] = [];
    
    items.push({ 
      label: 'Accueil', 
      href: '/', 
      isActive: false 
    });
    
    let currentPath = '';
    parentMenu.segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === parentMenu.segments.length - 1;
      
      const formattedSegment = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      items.push({
        label: formattedSegment,
        href: currentPath,
        isActive: isLast
      });
    });
    
    return items;
  }, [parentMenu]);

  return {
    parentMenu,
    breadcrumbItems,
    isHomePage: pathname === '/'
  };
};

// Composant principal DynamicHero compact
interface DynamicHeroProps {
  customTitle?: string;
  customDescription?: string;
  className?: string;
  backgroundImage?: string;
}

export const DynamicHero = ({ 
  customTitle, 
  customDescription,
  className = "",
  backgroundImage
}: DynamicHeroProps) => {
  const { parentMenu, breadcrumbItems, isHomePage } = useMenuNavigation();

  if (isHomePage || !parentMenu) {
    return null;
  }

  const displayTitle = customTitle || parentMenu.title;
  const displayDescription = customDescription || parentMenu.description;

  return (
    <>
      {/* Styles CSS pour les animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite 1s;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
      
      <section className={`relative overflow-hidden text-white min-h-[15vh] flex items-center ${className}`}>
        <HeroBackground backgroundImage={backgroundImage} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-30 w-full">
          <div className="max-w-4xl mx-auto">
            <BreadcrumbNav items={breadcrumbItems} />

            {/* Contenu principal compact */}
            <div className="text-center space-y-4">
              {/* Icône décorative petite */}
              <div className="flex justify-center mb-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="p-2 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full border border-white/20 backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 text-orange-400" />
                </div>
              </div>

              {/* Titre principal compact */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight tracking-tight animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <span className="inline-block bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent">
                  {displayTitle}
                </span>
              </h1>
              
              {/* Description compacte */}
              {displayDescription && (
                <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <p className="text-base md:text-lg text-white/90 mb-4 max-w-2xl mx-auto leading-relaxed">
                    {displayDescription}
                  </p>
                </div>
              )}
              
              {/* Ligne décorative simple */}
              <div className="flex justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent to-orange-500" />
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <div className="w-16 h-px bg-gradient-to-r from-orange-500 to-red-500" />
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <div className="w-8 h-px bg-gradient-to-r from-red-500 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DynamicHero;