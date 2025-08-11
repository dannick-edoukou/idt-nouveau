// app/api/news/[id]/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Utiliser la même variable d'environnement que la liste
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

interface NewsItemFromApi {
  id: number;
  title: string;
  category: string;
  featured: number; // API uses 0 or 1 for boolean
  description: string;
  image: string;
  created_at: string; // API sends date as string
  enabled?: number; // Si disponible dans l'API
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Next.js (route handlers) peut fournir params comme Promise, il faut l'attendre
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { success: 0, error: 'ID is required' }, 
      { status: 400 }
    );
  }

  try {
    if (!process.env.API_BASE_URL) {
      console.warn("API_BASE_URL n'est pas définie dans les variables d'environnement");
    }
    // Ajouter un timestamp pour éviter le cache
    const timestamp = Date.now();
    const url = `${API_BASE_URL}?action=news`;
    
    console.log(`[API] Fetching article ${id} from:`, url);

    // Fonction de fetch avec timeout et retries pour plus de robustesse
    const fetchWithTimeout = async (input: string, init: RequestInit & { timeoutMs?: number } = {}, timeoutMs = 15000) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), init.timeoutMs ?? timeoutMs);
      try {
        return await fetch(input, { ...init, signal: controller.signal });
      } finally {
        clearTimeout(timeout);
      }
    };

    const tryFetch = async (retries = 2): Promise<Response> => {
      try {
        return await fetchWithTimeout(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          },
          cache: 'no-store',
          // @ts-ignore - allow custom
          timeoutMs: 15000,
        });
      } catch (err) {
        if (retries > 0) {
          const attempt = 3 - retries + 1;
          const backoff = attempt * 500; // backoff simple
          console.warn(`[API] Fetch attempt failed (remaining: ${retries}). Retrying in ${backoff}ms...`, err);
          await new Promise(r => setTimeout(r, backoff));
          return tryFetch(retries - 1);
        }
        throw err;
      }
    };

    const response = await tryFetch(2);

    if (!response.ok) {
      console.error(`[API] External API error: ${response.status} ${response.statusText}`);
      throw new Error(`External API responded with status ${response.status}`);
    }

    const data = await response.json();
    console.log(`[API] Response for article ${id}:`, data);

    if (data.success === 0 || !data.data) {
      console.log(`[API] Article ${id} not found or disabled`);
      return NextResponse.json(
        {
          success: 0,
          error: 'Article non trouvé',
          data: null
        },
        { 
          status: 404,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          }
        }
      );
    }
    
    // Si l'API renvoie un tableau, rechercher l'élément correspondant exactement à l'ID
    const idNum = Number(id);
    const item: NewsItemFromApi | undefined = Array.isArray(data.data)
      ? data.data.find((it: any) => Number(it.id) === idNum)
      : (data.data && Number((data.data as any).id) === idNum ? data.data : undefined);

    if (!item) {
      return NextResponse.json(
        {
          success: 0,
          error: 'Article non trouvé (item is null)',
          data: null
        },
        { 
          status: 404,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          }
        }
      );
    }

    // Vérifier si l'article est activé (si le champ existe)
    if (item.enabled !== undefined && !Boolean(item.enabled)) {
      return NextResponse.json(
        {
          success: 0,
          error: 'Article non disponible',
          data: null
        },
        { 
          status: 404,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          }
        }
      );
    }

    const transformedData = {
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
      enabled: Boolean(item.enabled ?? true), // Par défaut true si pas dans l'API
    };

    console.log(`[API] Transformed data for article ${id}:`, transformedData);

    return NextResponse.json(
      { success: 1, data: transformedData },
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );

  } catch (error: any) {
    console.error(`[API_ROUTE_ERROR] Fetching article ${id}:`, error);
    return NextResponse.json(
      {
        success: 0,
        error: 'Internal Server Error',
        details: error.message
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      }
    );
  }
}