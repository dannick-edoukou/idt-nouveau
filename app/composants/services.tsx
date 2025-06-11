"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
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
  url: string
  category?: string
}

// Liste des activités avec des images différentes
const activities: Activity[] = [
  {
    id: "activity1",
    title: "Consultation Stratégique",
    description:
      "Nous vous aidons à définir votre stratégie d'entreprise avec une approche personnalisée. Notre équipe d'experts analyse votre marché et propose des solutions adaptées à vos besoins spécifiques pour maximiser votre croissance et votre rentabilité.",
    url: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Conseil",
  },
  {
    id: "activity2",
    title: "Développement Web",
    description:
      "Création de sites web modernes et responsives adaptés à tous les appareils. Nous utilisons les dernières technologies pour vous offrir des solutions performantes, sécurisées et optimisées pour les moteurs de recherche.",
    url: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Technique",
  },
  {
    id: "activity3",
    title: "Marketing Digital",
    description:
      "Stratégies de marketing digital sur mesure pour augmenter votre visibilité en ligne. Nous gérons vos campagnes publicitaires, votre présence sur les réseaux sociaux et optimisons votre contenu pour attirer plus de clients.",
    url: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Marketing",
  },
  {
    id: "activity4",
    title: "Formation Professionnelle",
    description:
      "Programmes de formation adaptés aux besoins de votre équipe. Nos formateurs expérimentés transmettent leurs connaissances et compétences pour permettre à vos collaborateurs de se développer et d'améliorer leurs performances.",
    url: "https://images.pexels.com/photos/3183155/pexels-photo-3183155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Formation",
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

  // Auto-focus sur le bouton sélectionné
  useEffect(() => {
    if (selectedButtonRef.current) {
      selectedButtonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }
  }, [selectedActivity.id])

  return (
    <section className="py-2 bg-gradient-to-br from-gray-50 to-white">
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
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      En savoir plus
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
<a href="/contacts">
                    <Button
                  
                      variant="outline"
                      size="lg"
                      className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300"
                    >
                     Nous contacter
                    </Button>
                    </a>
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
