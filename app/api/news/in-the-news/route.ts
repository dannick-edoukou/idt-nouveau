// app/api/news/in-the-news/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Récupérer l'URL de l'API depuis les variables d'environnement
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

export async function GET(request: NextRequest) {
  try {
    if (!process.env.API_BASE_URL) {
      console.warn("API_BASE_URL n'est pas définie dans les variables d'environnement");
    }

    // Construire l'URL avec l'action dédiée
    const url = new URL(`${API_BASE_URL}?action=in-the-news`);

    // Requête vers l'API externe
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const transformedData = {
      ...data,
      data: data.data?.map((item: any) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        featured: Boolean(item.featured),
        description: item.description,
        image: item.image,
        date: new Date(item.created_at).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        created_at: item.created_at,
        enabled: Boolean(item.enabled ?? true),
      })),
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Erreur lors de la récupération des news (in-the-news):', error);
    return NextResponse.json(
      {
        success: 0,
        error: 'Erreur lors de la récupération des données (in-the-news)',
        data: [],
      },
      { status: 500 }
    );
  }
}
