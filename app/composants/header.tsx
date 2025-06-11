"use client"
import Image from 'next/image'
import { useState, useRef, useEffect } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SubSubmenuItem {
  title: string
  href?: string
}

interface SubmenuItem {
  title: string
  href?: string
  subItems?: SubSubmenuItem[]
}

interface MenuItem {
  id: string
  title: string
  href?: string
  submenu: SubmenuItem[]
}

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedMobileItems, setExpandedMobileItems] = useState([])
  const headerRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close menu when pressing escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null)
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => document.removeEventListener("keydown", handleEscKey)
  }, [])

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
  ]

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
  ]

  const handleMouseEnter = (menuId: string) => {
    setActiveMenu(menuId)
  }

  const handleMouseLeave = () => {
    setActiveMenu(null)
  }

  const handleFocus = (menuId: string) => {
    setActiveMenu(menuId)
  }

  const toggleMobileSubmenu = (menuId: string) => {
    setExpandedMobileItems((prev) => (prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]))
  }

  const isSubmenuExpanded = (menuId: string) => {
    return expandedMobileItems.includes(menuId)
  }

  return (
    <header ref={headerRef} className="bg-gray-50  sticky top-0 z-50">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Left Navigation Items */}
            <div className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <div 
                  key={item.id}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={cn(
                      "relative flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
                      activeMenu === item.id 
                        ? "text-orange-600" 
                        : "text-gray-700 hover:text-orange-600"
                    )}
                    onFocus={() => handleFocus(item.id)}
                    aria-expanded={item.submenu.length > 0 ? "true" : "false"}
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

                  {/* Submenu */}
                  {item.submenu.length > 0 && (
                    <div 
                      className={cn(
                        "absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 transition-all duration-200 transform",
                        activeMenu === item.id 
                          ? "opacity-100 visible translate-y-0" 
                          : "opacity-0 invisible -translate-y-2"
                      )}
                    >
                      {item.submenu.map((subItem) => (
                        <div key={subItem.title} className="relative group/sub">
                          <a
                            href={subItem.href}
                            className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-150"
                          >
                            <span>{subItem.title}</span>
                            {subItem.subItems && <ChevronDown className="w-4 h-4 -rotate-90" />}
                          </a>

                          {/* Sub-submenu */}
                          {subItem.subItems && (
                            <div className="absolute left-full top-0 ml-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200">
                              {subItem.subItems.map((subSubItem) => (
                                <a
                                  key={subSubItem.title}
                                  href={subSubItem.href}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-150"
                                >
                                  {subSubItem.title}
                                </a>
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
  <a href="/" className="flex items-center">
    <Image
      src="/logo.jpg"
      alt="IDT Logo"
      width={200}
      height={40}
      className="hover:opacity-80 transition-opacity duration-200"
      priority // Optionnel : pour charger l'image en priorité
    />
  </a>
</div>

            {/* Right Navigation Items */}
            <div className="flex items-center space-x-8">
              {rightMenuItems.map((item) => (
                <div 
                  key={item.id}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.submenu.length > 0 ? (
                    <button
                      className={cn(
                        "relative flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
                        activeMenu === item.id 
                          ? "text-orange-600" 
                          : "text-gray-700 hover:text-orange-600"
                      )}
                      onFocus={() => handleFocus(item.id)}
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
                    <a
                      href={item.href}
                      className={cn(
                        "relative block px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
                        "text-gray-700 hover:text-orange-600"
                      )}
                      onFocus={() => handleFocus(item.id)}
                      onMouseEnter={() => handleMouseEnter(item.id)}
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
                    </a>
                  )}

                  {/* Submenu */}
                  {item.submenu.length > 0 && (
                    <div 
                      className={cn(
                        "absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 transition-all duration-200 transform",
                        activeMenu === item.id 
                          ? "opacity-100 visible translate-y-0" 
                          : "opacity-0 invisible -translate-y-2"
                      )}
                    >
                      {item.submenu.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-150"
                        >
                          {subItem.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo mobile */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
            <Image
      src="/logo.jpg"
      alt="IDT Logo"
      width={120}
      height={40}
      className="hover:opacity-80 transition-opacity duration-200"
      />
            </a>
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
            "transition-all duration-300 ease-in-out overflow-hidden",
            mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-4 py-2 space-y-1 bg-gray-50">
            {[...menuItems, ...rightMenuItems].map((item) => (
              <div key={item.id} className="space-y-1">
                {item.submenu.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleMobileSubmenu(item.id)}
                      className="w-full flex items-center justify-between px-3 py-3 text-gray-800 hover:text-orange-500 hover:bg-white rounded-md transition-all duration-200 font-medium"
                      aria-expanded={isSubmenuExpanded(item.id)}
                    >
                      <span>{item.title}</span>
                      <ChevronDown 
                        className={cn(
                          "w-5 h-5 transition-transform duration-200",
                          isSubmenuExpanded(item.id) ? "rotate-180" : ""
                        )} 
                      />
                    </button>

                    <div 
                      className={cn(
                        "ml-4 space-y-1 transition-all duration-200 overflow-hidden",
                        isSubmenuExpanded(item.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      {item.submenu.map((subItem) => (
                        <div key={subItem.title} className="space-y-1">
                          {subItem.subItems ? (
                            <>
                              <div className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md">
                                {subItem.title}
                              </div>
                              <div className="ml-4 space-y-1">
                                {subItem.subItems.map((subSubItem) => (
                                  <a
                                    key={subSubItem.title}
                                    href={subSubItem.href}
                                    className="block px-3 py-2 text-sm text-gray-700 hover:text-orange-500 hover:bg-white rounded-md transition-colors duration-200"
                                  >
                                    {subSubItem.title}
                                  </a>
                                ))}
                              </div>
                            </>
                          ) : (
                            <a
                              href={subItem.href}
                              className="block px-3 py-2 text-sm text-gray-700 hover:text-orange-500 hover:bg-white rounded-md transition-colors duration-200"
                            >
                              {subItem.title}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="block px-3 py-3 text-gray-800 hover:text-orange-500 hover:bg-white rounded-md transition-all duration-200 font-medium"
                  >
                    {item.title}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header