import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const externalApiUrl = `http://api.mysidt.com/routes/api.php?action=mediatheque&type=video`;

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

    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();

      if (!response.ok) {
        return NextResponse.json(
          { error: data.error || `Erreur de l'API externe: ${response.statusText}` },
          { status: response.status }
        );
      }
      
      return NextResponse.json(data);

    } else {
      const textData = await response.text();
      console.error("L'API externe (video) n'a pas renvoyé de JSON. Contenu reçu :", textData.substring(0, 500)); 
      
      return NextResponse.json(
        { error: "L'API externe (video) n'a pas répondu avec du JSON.", details: "La réponse était de type " + (contentType || 'inconnu') },
        { status: 502 }
      );
    }

  } catch (error) {
    console.error('Erreur dans le proxy API (video):', error);
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
