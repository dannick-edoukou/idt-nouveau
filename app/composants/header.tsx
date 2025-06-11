"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubSubmenuItem {
  title: string;
  href?: string;
}

interface SubmenuItem {
  title: string;
  href?: string;
  subItems?: SubSubmenuItem[];
}

interface MenuItem {
  id: string;
  title: string;
  href?: string;
  submenu: SubmenuItem[];
}

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const menuItems: MenuItem[] = [
    {
      id: "idt",
      title: "IDT",
      submenu: [
        { title: "Présentation", href: "/presentation" },
        { title: "Mot du DG", href: "/mot-du-dg" },
        { title: "Nos Missions", href: "/nos-missions" },
        { title: "Fonctionnement", href: "/fonctionnement" },
        { title: "Document juridique", href: "/document-juridique" },
      ],
    },
    {
      id: "services",
      title: "Nos Services",
      submenu: [
        {
          title: "Diffusion",
          subItems: [
            { title: "TNT", href: "/services/diffusion/tnt" },
            { title: "Radio", href: "/services/diffusion/radio" },
          ],
        },
        { title: "Location de pylone", href: "/services/location-pylone" },
        { title: "OTT", href: "/services/ott" },
      ],
    },
    {
      id: "tv",
      title: "Chaîne TV",
      submenu: [
        { title: "Bouquets TV", href: "/chaine-tv/bouquets" },
        { title: "Radios", href: "/chaine-tv/radios" },
      ],
    },
  ];

  const rightMenuItems: MenuItem[] = [
    {
      id: "actualite",
      title: "Actualité",
      href: "/actualite",
      submenu: [],
    },
    {
      id: "mediatheque",
      title: "Médiathèque",
      submenu: [
        { title: "Photothèque", href: "/mediatheque/phototheque" },
        { title: "Vidéothèque", href: "/mediatheque/videotheque" },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      href: "/contacts",
      submenu: [],
    },
  ];

  const handleMouseEnter = useCallback((menuId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(menuId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  }, []);

  // Nettoyer le timeout au démontage du composant
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const toggleMobileSubmenu = (itemId: string) => {
    if (expandedMobileItems.includes(itemId)) {
      setExpandedMobileItems(expandedMobileItems.filter((id) => id !== itemId));
    } else {
      setExpandedMobileItems([...expandedMobileItems, itemId]);
    }
  };

  return (
    <header className="bg-gray-50 sticky top-0 z-50">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 items-center justify-between w-full">
        {/* Left Navigation Items */}
        <div className="flex items-center space-x-4 ml-8">
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={cn(
                  "relative flex items-center space-x-1 px-3 py-2 text-base font-bold transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
                  activeMenu === item.id
                    ? "text-orange-600"
                    : "text-gray-700 hover:text-orange-600"
                )}
                aria-haspopup={item.submenu.length > 0 ? "true" : undefined}
                aria-expanded={activeMenu === item.id}
              >
                <span>{item.title}</span>
                {item.submenu.length > 0 && (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      activeMenu === item.id ? "rotate-180" : ""
                    )}
                  />
                )}
                {/* Barre orange animée */}
                <div
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-300 ease-out",
                    activeMenu === item.id
                      ? "w-full opacity-100"
                      : "w-0 opacity-0"
                  )}
                />
              </button>
              {/* Submenu (affiché seulement si actif) */}
              {item.submenu.length > 0 && activeMenu === item.id && (
                <div 
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.submenu.map((subItem) => (
                    <div key={subItem.title} className="relative group/sub">
                      {subItem.href ? (
                        <Link
                          href={subItem.href}
                          className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-150"
                        >
                          <span>{subItem.title}</span>
                          {subItem.subItems && <ChevronDown className="w-4 h-4 -rotate-90" />}
                        </Link>
                      ) : (
                        <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-orange-50 hover:text-orange-600 transition-colors duration-150">
                          <span>{subItem.title}</span>
                          {subItem.subItems && <ChevronDown className="w-4 h-4 -rotate-90" />}
                        </div>
                      )}
                      {/* Sub-submenu (affiché seulement si subItems) */}
                      {subItem.subItems && (
                        <div 
                          className="absolute left-full top-0 ml-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-50"
                          onMouseEnter={() => handleMouseEnter(item.id)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {subItem.subItems.map((subSubItem) => (
                            <Link
                              key={subSubItem.title}
                              href={subSubItem.href || "#"}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-150"
                            >
                              {subSubItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Logo centré */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.jpg"
              alt="IDT Logo"
              width={200}
              height={40}
              className="hover:opacity-80 transition-opacity duration-200"
              priority
            />
          </Link>
        </div>
        
        {/* Right Navigation Items */}
        <div className="flex items-center space-x-4 mr-8">
          {rightMenuItems.map((item) => (
            <div 
              key={item.id} 
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              {item.submenu.length > 0 ? (
                <button
                  className={cn(
                    "relative flex items-center space-x-1 px-3 py-2 text-base font-bold transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
                    activeMenu === item.id
                      ? "text-orange-600"
                      : "text-gray-700 hover:text-orange-600"
                  )}
                  aria-haspopup={item.submenu.length > 0 ? "true" : undefined}
                  aria-expanded={activeMenu === item.id}
                >
                  <span>{item.title}</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      activeMenu === item.id ? "rotate-180" : ""
                    )}
                  />
                  {/* Barre orange animée */}
                  <div
                    className={cn(
                      "absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-300 ease-out",
                      activeMenu === item.id
                        ? "w-full opacity-100"
                        : "w-0 opacity-0"
                    )}
                  />
                </button>
              ) : (
                <Link
                  href={item.href || "#"}
                  className={cn(
                    "relative block px-3 py-2 text-base font-bold transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
                    activeMenu === item.id
                      ? "text-orange-600"
                      : "text-gray-700 hover:text-orange-600"
                  )}
                >
                  <span>{item.title}</span>
                  {/* Barre orange animée */}
                  <div
                    className={cn(
                      "absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-300 ease-out",
                      activeMenu === item.id
                        ? "w-full opacity-100"
                        : "w-0 opacity-0"
                    )}
                  />
                </Link>
              )}
              {/* Submenu (affiché seulement si actif) */}
              {item.submenu.length > 0 && activeMenu === item.id && (
                <div 
                  className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 transition-all duration-200 transform z-50"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href || "#"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-150"
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="flex lg:hidden items-center justify-between px-4 py-3">
        {/* Logo mobile */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.jpg"
              alt="IDT Logo"
              width={120}
              height={40}
              className="hover:opacity-80 transition-opacity duration-200"
              priority
            />
          </Link>
        </div>
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-800 hover:text-orange-500 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md transition-colors duration-200"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden transition-all duration-300 ease-in-out overflow-hidden bg-gray-50",
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-2 space-y-1">
          {[...menuItems, ...rightMenuItems].map((item) => (
            <div key={item.id} className="space-y-1">
              {item.submenu.length > 0 ? (
                <>
                  <button
                    onClick={() => toggleMobileSubmenu(item.id)}
                    className="w-full flex items-center justify-between px-3 py-3 text-gray-800 hover:text-orange-500 hover:bg-white rounded-md transition-all duration-200 font-medium"
                    aria-expanded={expandedMobileItems.includes(item.id)}
                  >
                    <span>{item.title}</span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 transition-transform duration-200",
                        expandedMobileItems.includes(item.id) ? "rotate-180" : ""
                      )}
                    />
                  </button>
                  {/* Sous-menu mobile dépliable */}
                  {expandedMobileItems.includes(item.id) && (
                    <div className="ml-4 space-y-1">
                      {item.submenu.map((subItem) => (
                        <div key={subItem.title} className="space-y-1">
                          {subItem.subItems ? (
                            <>
                              <div className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md">
                                {subItem.title}
                              </div>
                              <div className="ml-4 space-y-1">
                                {subItem.subItems.map((subSubItem) => (
                                  <Link
                                    key={subSubItem.title}
                                    href={subSubItem.href || "#"}
                                    className="block px-3 py-2 text-sm text-gray-700 hover:text-orange-500 hover:bg-white rounded-md transition-colors duration-200"
                                  >
                                    {subSubItem.title}
                                  </Link>
                                ))}
                              </div>
                            </>
                          ) : (
                            <Link
                              href={subItem.href || "#"}
                              className="block px-3 py-2 text-sm text-gray-700 hover:text-orange-500 hover:bg-white rounded-md transition-colors duration-200"
                            >
                              {subItem.title}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href || "#"}
                  className="block px-3 py-3 text-gray-800 hover:text-orange-500 hover:bg-white rounded-md transition-all duration-200 font-medium"
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;