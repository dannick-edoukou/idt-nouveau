'use client'

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

// Chargement dynamique de la carte pour éviter les erreurs SSR
const CoverageMap = dynamic(() => import('./CoverageMap'), {
  ssr: false,
  loading: () => (
    <div className="h-96 lg:h-[500px] w-full rounded-lg bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500 mx-auto mb-2" />
        <p className="text-gray-600">Chargement de la carte...</p>
      </div>
    </div>
  )
})

const CoverageMapWrapper = () => {
  return <CoverageMap />
}

export default CoverageMapWrapper
