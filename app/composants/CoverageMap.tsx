"use client"

import React, { useState } from "react"
import { MapContainer, TileLayer, Polygon, Marker, Popup } from "react-leaflet"
import { type LatLngExpression, Icon } from "leaflet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import "leaflet/dist/leaflet.css"

// Configuration des types de services
const SERVICE_TYPES = {
  TNT: { color: "#ef4444", label: "TNT", description: "Télévision Numérique Terrestre" },
  Radio: { color: "#22c55e", label: "Radio", description: "FM et DAB+" },
  OTT: { color: "#3b82f6", label: "OTT", description: "Services de streaming" },
} as const

type ServiceType = keyof typeof SERVICE_TYPES

// Icône personnalisée optimisée
const createIcon = (color: string) =>
  new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" fill="${color}" stroke="#fff" strokeWidth="2"/>
        <circle cx="12" cy="12" r="3" fill="#fff"/>
      </svg>
    `)}`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  })

// Données simplifiées
const coverageData = [
  {
    id: "abidjan",
    name: "Abidjan",
    type: "TNT" as ServiceType,
    coordinates: [
      [5.24, -4.16],
      [5.44, -4.16],
      [5.44, -3.86],
      [5.24, -3.86],
      [5.24, -4.16],
    ],
    population: 5000000,
    site: { position: [5.32, -4.03] as LatLngExpression, power: "100 kW", coverage: "50 km" },
  },
  {
    id: "yamoussoukro",
    name: "Yamoussoukro",
    type: "Radio" as ServiceType,
    coordinates: [
      [6.7, -5.4],
      [6.9, -5.4],
      [6.9, -5.1],
      [6.7, -5.1],
      [6.7, -5.4],
    ],
    population: 300000,
    site: { position: [6.82, -5.29] as LatLngExpression, power: "20 kW", coverage: "60 km" },
  },
  {
    id: "bouake",
    name: "Bouaké",
    type: "OTT" as ServiceType,
    coordinates: [
      [7.6, -5.1],
      [7.8, -5.1],
      [7.8, -4.9],
      [7.6, -4.9],
      [7.6, -5.1],
    ],
    population: 800000,
    site: { position: [7.69, -5.03] as LatLngExpression, power: "Fibre", coverage: "Centre-Nord" },
  },
]

export default function CoverageMap() {
  const [activeFilters, setActiveFilters] = useState<ServiceType[]>(["TNT", "Radio", "OTT"])

  const toggleFilter = (type: ServiceType) => {
    setActiveFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const filteredData = coverageData.filter((item) => activeFilters.includes(item.type))

  return (
    <div className="w-full px-4 md:px-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Colonne de gauche: Filtres et Légende */}
        <div className="space-y-4">
          {/* Contrôles */}
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-base">Filtres de couverture</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col space-y-2">
                {(Object.keys(SERVICE_TYPES) as ServiceType[]).map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={activeFilters.includes(type)}
                      onCheckedChange={() => toggleFilter(type)}
                    />
                    <label htmlFor={type} className="flex items-center gap-2 cursor-pointer">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: SERVICE_TYPES[type].color }} />
                      <span className="text-sm font-medium">{SERVICE_TYPES[type].label}</span>
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Légende */}
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-base">Légende</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col space-y-1">
                {(Object.entries(SERVICE_TYPES) as [ServiceType, (typeof SERVICE_TYPES)[ServiceType]][]).map(
                  ([type, config]) => (
                    <div key={type} className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div
                          className="w-3 h-3 rounded border opacity-30"
                          style={{ backgroundColor: config.color, borderColor: config.color }}
                        />
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{config.label}</p>
                        <p className="text-xs text-muted-foreground">{config.description}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne de droite: Carte */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-0">
              <div className="h-[280px] sm:h-[320px] md:h-[350px] w-full rounded-lg overflow-hidden">
                <MapContainer
                  center={[7.54, -5.55]}
                  zoom={7}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {filteredData.map((item) => {
                    const config = SERVICE_TYPES[item.type]
                    return (
                      <React.Fragment key={item.id}>
                        <Polygon
                          positions={item.coordinates as LatLngExpression[]}
                          pathOptions={{
                            fillColor: config.color,
                            fillOpacity: 0.2,
                            color: config.color,
                            weight: 2,
                            opacity: 0.8,
                          }}
                        >
                          <Popup>
                            <div className="p-2 min-w-[200px]">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold">{item.name}</h4>
                                <Badge variant="secondary">{item.type}</Badge>
                              </div>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <p>Population: {item.population.toLocaleString()}</p>
                                <p>Couverture {config.description}</p>
                              </div>
                            </div>
                          </Popup>
                        </Polygon>

                        <Marker position={item.site.position} icon={createIcon(config.color)}>
                          <Popup>
                            <div className="p-2 min-w-[180px]">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold">Site {item.name}</h4>
                                <Badge variant="outline">{item.type}</Badge>
                              </div>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <p>Puissance: {item.site.power}</p>
                                <p>Portée: {item.site.coverage}</p>
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                      </React.Fragment>
                    )
                  })}
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}