// app/api/in-the-news/route.ts
import { NextResponse } from 'next/server';

const API_URL = 'http://testapp.dioulatche.io/routes/api.php?action=news';

/**
 * Route API qui agit comme un proxy sécurisé pour la liste générale des actualités.
 * Elle appelle l'API PHP externe côté serveur pour éviter les problèmes de CORS côté client.
 */
export async function GET() {
  try {
    const response = await fetch(API_URL, {
      cache: 'no-store', // On s'assure d'avoir les données fraîches
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: `Erreur de l'API externe: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Erreur dans la route proxy /api/in-the-news:', error);
    return NextResponse.json(
      { message: 'Erreur interne du serveur lors du proxying des actualités.' },
      { status: 500 }
    );
  }
}
