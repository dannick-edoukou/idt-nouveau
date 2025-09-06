"use client";

import React from "react";
import DynamicHero from "../composants/DynamicHero";
import { ExternalLinkIcon, DownloadIcon, FileTextIcon } from "lucide-react";

interface PDFViewerProps {
  src: string;
  title: string;
  description?: string;
  className?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ 
  src, 
  title, 
  description,
  className = "" 
}) => {
  const handleOpen = () => {
    window.open(src, "_blank", "noopener,noreferrer");
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      if (!response.ok) throw new Error('Erreur lors du téléchargement');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = src.split("/").pop() || `${title}.pdf`;
      link.rel = "noopener";
      
      document.body.appendChild(link);
      link.click();
      
      // Nettoyage
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      // Fallback vers l'ancienne méthode
      const link = document.createElement("a");
      link.href = src;
      link.download = src.split("/").pop() || `${title}.pdf`;
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section className={`mx-auto max-w-6xl p-4 ${className}`}>
      {/* En-tête avec titre et actions */}
      <header className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
        
            
          </div>
          
        </div>
      </header>

      {/* Carte principale */}
      <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <div className="flex flex-col items-center justify-center py-20 px-6">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <FileTextIcon size={32} className="text-orange-400" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
         Organigramme
          </h3>
          
          <p className="text-gray-600 text-center max-w-md leading-relaxed mb-6">
            Ce document PDF vous presente l'organigramme de la Société Ivoirienne De Télédiffusion (SIDT). 
            Utilisez les boutons ci-dessous pour l'ouvrir dans un nouvel onglet ou le télécharger.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
            <button
              onClick={handleOpen}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <ExternalLinkIcon size={14} />
              Ouvrir maintenant
            </button>
            
            <button
              onClick={handleDownload}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <DownloadIcon size={14} />
              Télécharger
            </button>
          </div>
        </div>
      </div>

   
    </section>
  );
};

export default function FonctionnementPage() {
  return (
    <>
      <DynamicHero />
      <PDFViewer
        src="/documents/orgt.pdf"
        title="Organigramme"
       
      />
    </>
  );
}