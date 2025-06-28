import { NextResponse } from 'next/server';


export const dynamic = 'force-dynamic';

export async function GET() {
  const externalApiUrl = `http://testapp.dioulatche.io/routes/api.php?action=mediatheque&type=image`;

  try {
    const response = await fetch(externalApiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    });

    const contentType = response.headers.get('content-type');

    // Vérifier si la réponse est bien du JSON
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();

      // Si l'API externe renvoie une erreur (tout en étant du JSON), on la transmet
      if (!response.ok) {
        return NextResponse.json(
          { error: data.error || `Erreur de l'API externe: ${response.statusText}` },
          { status: response.status }
        );
      }
      
      // Tout est bon, on renvoie les données
      return NextResponse.json(data);

    } else {
      // La réponse n'est pas du JSON, c'est probablement une page d'erreur HTML
      const textData = await response.text();
      // Ceci affichera le début de la page d'erreur dans votre console serveur (terminal)
      console.error("L'API externe n'a pas renvoyé de JSON. Contenu reçu :", textData.substring(0, 500)); 
      
      return NextResponse.json(
        { error: "L'API externe n'a pas répondu avec du JSON.", details: "La réponse était de type " + (contentType || 'inconnu') },
        { status: 502 } // 502 Bad Gateway est un code d'erreur approprié ici
      );
    }

  } catch (error) {
    console.error('Erreur dans le proxy API:', error);
    let errorMessage = 'Erreur inconnue du serveur proxy.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json(
      { error: 'Erreur interne du serveur lors de la communication avec l\'API externe.', details: errorMessage },
      { status: 500 }
    );
  }
}