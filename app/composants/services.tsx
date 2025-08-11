"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronRight, ExternalLink, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Type pour nos activités
type Activity = {
  id: string
  title: string
  description: string
  url: string // image URL
  href: string // page cible pour en savoir plus
  category?: string
}

// Services réels de l'IDT (issus des pages et contenus du site)
const activities: Activity[] = [
  {
    id: "diffusion-radio",
    title: "Diffusion Radio / TNT",
    description:
      "Transport et diffusion des chaînes TV et radios publiques/privées via la TNT et l'infrastructure nationale.",
    url: "/banniere/banniere2.jpg",
    href: "/services/diffusion/radio",
    category: "Diffusion",
  },
  {
    id: "multiplexage",
    title: "Multiplexage TV",
    description:
      "Regroupement de plusieurs chaînes sur une même fréquence pour optimiser l'usage du spectre et la qualité.",
    url: "/banniere/banniere2.jpg",
    href: "/presentation",
    category: "Diffusion",
  },
  {
    id: "transport-signal",
    title: "Transport de Signal",
    description:
      "Acheminement sécurisé des flux audiovisuels entre éditeurs, têtes de réseaux et sites de diffusion.",
    url: "/banniere/banniere2.jpg",
    href: "/presentation",
    category: "Réseau",
  },
  {
    id: "collocation",
    title: "Collocation / Hébergement",
    description:
      "Hébergement d'équipements radio et télécom sur les sites IDT, avec énergie, sécurité et supervision.",
    url: "/banniere/banniere2.jpg",
    href: "/services/location-pylone",
    category: "Infrastructure",
  },
  {
    id: "location-pylone",
    title: "Location de Pylônes",
    description:
      "Mise à disposition de pylônes et toitures pour antennes et équipements, avec accompagnement technique.",
    url: "/banniere/banniere2.jpg",
    href: "/services/location-pylone",
    category: "Infrastructure",
  },
  {
    id: "ott",
    title: "Services OTT",
    description:
      "Solutions de streaming et de services numériques (OTT) pour la distribution de contenus sur internet.",
    url: "/banniere/banniere2.jpg",
    href: "/services/ott",
    category: "Numérique",
  },
  {
    id: "services-techniques",
    title: "Services Techniques",
    description:
      "Interventions techniques, maintenance et support sur les équipements et sites de diffusion.",
    url: "/banniere/banniere2.jpg",
    href: "/nos-missions",
    category: "Technique",
  },
]

export default function Services() {
  const [selectedActivity, setSelectedActivity] = useState<Activity>(activities[0])
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const selectedButtonRef = useRef<HTMLButtonElement>(null)

  const handleActivityChange = useCallback(
    async (activity: Activity) => {
      if (activity.id === selectedActivity.id) return

      setIsTransitioning(true)
      setImageLoading(true)
      setImageError(false)

      // Petite pause pour l'animation
      await new Promise((resolve) => setTimeout(resolve, 150))

      setSelectedActivity(activity)
      setIsTransitioning(false)
    },
    [selectedActivity.id],
  )

  const handleImageLoad = useCallback(() => {
    setImageLoading(false)
  }, [])

  const handleImageError = useCallback(() => {
    setImageError(true)
    setImageLoading(false)
  }, [])

  // Navigation au clavier
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, activity: Activity) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        handleActivityChange(activity)
      } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault()
        const currentIndex = activities.findIndex((a) => a.id === activity.id)
        const nextIndex =
          event.key === "ArrowDown"
            ? (currentIndex + 1) % activities.length
            : (currentIndex - 1 + activities.length) % activities.length

        const nextActivity = activities[nextIndex]
        handleActivityChange(nextActivity)

        // Focus sur le nouveau bouton
        setTimeout(() => {
          const buttons = listRef.current?.querySelectorAll("button")
          if (buttons && buttons[nextIndex]) {
            ;(buttons[nextIndex] as HTMLButtonElement).focus()
          }
        }, 100)
      }
    },
    [handleActivityChange],
  )

  const isInitialMount = useRef(true);

  // Auto-focus sur le bouton sélectionné, mais on évite le scroll au montage initial
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (selectedButtonRef.current) {
      selectedButtonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedActivity.id]);

  return (
        <section className="pb-2 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center lg:text-left mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Nos Services
          </h2>
          <div className="w-12 sm:w-16 lg:w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mx-auto lg:mx-0 transition-all duration-300"></div>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Nous vous proposons une gamme de services pour répondre à vos besoins et vous accompagner dans votre
            développement.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Liste des activités */}
          <div className="lg:w-1/3">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Nos services</h3>
                <ul ref={listRef} className="space-y-3" role="tablist" aria-label="Liste des services">
                  {activities.map((activity) => (
                    <li key={activity.id} role="none">
                      <button
                        ref={selectedActivity.id === activity.id ? selectedButtonRef : null}
                        onClick={() => handleActivityChange(activity)}
                        onKeyDown={(e) => handleKeyDown(e, activity)}
                        role="tab"
                        aria-selected={selectedActivity.id === activity.id}
                        aria-controls={`panel-${activity.id}`}
                        tabIndex={selectedActivity.id === activity.id ? 0 : -1}
                        className={cn(
                          "w-full text-left px-4 py-4 rounded-lg flex justify-between items-center transition-all duration-300 group",
                          "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
                          selectedActivity.id === activity.id
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-[1.02]"
                            : "hover:bg-gray-100 hover:shadow-md hover:transform hover:scale-[1.01]",
                        )}
                      >
                        <div className="flex flex-col">
                          <span
                            className={cn(
                              "font-medium transition-colors",
                              selectedActivity.id === activity.id ? "text-white" : "text-gray-900",
                            )}
                          >
                            {activity.title}
                          </span>
                          {activity.category && (
                            <span
                              className={cn(
                                "text-sm mt-1 transition-colors",
                                selectedActivity.id === activity.id ? "text-orange-100" : "text-gray-500",
                              )}
                            >
                              {activity.category}
                            </span>
                          )}
                        </div>
                        <ChevronRight
                          className={cn(
                            "h-5 w-5 transition-all duration-300",
                            selectedActivity.id === activity.id
                              ? "transform rotate-90 text-white"
                              : "text-gray-400 group-hover:text-gray-600 group-hover:transform group-hover:translate-x-1",
                          )}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Affichage de l'activité sélectionnée */}
          <div className="lg:w-2/3">
            <Card
              className={cn(
                "bg-white border-0 shadow-xl overflow-hidden transition-all duration-500",
                isTransitioning ? "opacity-90 transform scale-[0.98]" : "opacity-100 transform scale-100",
              )}
              role="tabpanel"
              id={`panel-${selectedActivity.id}`}
              aria-labelledby={`tab-${selectedActivity.id}`}
            >
              <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
                {/* Loading overlay */}
                {imageLoading && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                    <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                  </div>
                )}

                {!imageError ? (
                  <Image
                    src={selectedActivity.url || "/placeholder.svg"}
                    alt={`Image illustrant ${selectedActivity.title}`}
                    fill
                    className={cn(
                      "object-cover transition-all duration-700",
                      imageLoading ? "opacity-0 scale-110" : "opacity-100 scale-100",
                    )}
                    priority
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <ExternalLink className="h-8 w-8 text-gray-600" />
                      </div>
                      <p className="text-gray-600 font-medium">Image non disponible</p>
                    </div>
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <CardContent className="p-6 sm:p-8">
                <div
                  className={cn(
                    "transition-all duration-500",
                    isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0",
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                      {selectedActivity.title}
                    </h3>
                    {selectedActivity.category && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                        {selectedActivity.category}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-8">
                    {selectedActivity.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                  
                    <Link href="/contacts">
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300"
                      >
                        Nous contacter
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
