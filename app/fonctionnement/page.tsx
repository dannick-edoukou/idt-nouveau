"use client";

import React from "react";
import DynamicHero from "../composants/DynamicHero";

export default function FonctionnementPage() {
  const src = "/documents/orgt.pdf";
  const title = "Organigramme";
  const height = 900;

  const onOpen = () => {
    window.open(src, "_blank", "noopener,noreferrer");
  };

  const onDownload = () => {
    const link = document.createElement("a");
    link.href = src;
    link.download = src.split("/").pop() || "document.pdf";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <>
    <DynamicHero />
    <section className="mx-auto max-w-6xl p-4">
      {/* En-tête */}
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
          <span className="inline-block bg-orange-100 text-orange-700 rounded-lg px-2 py-1 text-base font-medium">
            PDF
          </span>
       
        </h2>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button
            onClick={onOpen}
            className="inline-flex items-center rounded-2xl border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            aria-label="Ouvrir dans un nouvel onglet"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 mr-2">
              <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
              <path d="M5 5h6v2H7v10h10v-4h2v6H5V5z" />
            </svg>
            Ouvrir
          </button>
         
        </div>
      </div>

      {/* Carte */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden">
       

        {/* Zone d’affichage PDF */}
        <div className="relative w-full" style={{ height }}>
          <iframe
            title={title}
            src={src}
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>

      {/* Avertissement mobile */}
      <p className="mt-3 text-xs text-gray-500 sm:hidden text-center">
        📱 Sur mobile, l’ouverture dans un nouvel onglet offre souvent une meilleure expérience de lecture.
      </p>
    </section>
    </>
  );
}
