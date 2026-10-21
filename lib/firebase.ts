/**
 * Firebase Firestore Configuration & High-Performance Edge/Client Caching Layer
 * Provides optimized, cached data access for UCP Bahawalpur Campus.
 * Configured with 1-hour revalidation (revalidate = 3600) to minimize network overhead.
 */

// Next.js standard caching directive for ISR (Incremental Static Regeneration)
export const revalidate = 3600;

export interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

export const firebaseConfig: FirebaseConfig = {
  apiKey: typeof process !== 'undefined' ? process.env.VITE_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY : '',
  authDomain: typeof process !== 'undefined' ? process.env.VITE_FIREBASE_AUTH_DOMAIN || 'ucp-bahawalpur.firebaseapp.com' : 'ucp-bahawalpur.firebaseapp.com',
  projectId: typeof process !== 'undefined' ? process.env.VITE_FIREBASE_PROJECT_ID || 'ucp-bahawalpur' : 'ucp-bahawalpur',
  storageBucket: typeof process !== 'undefined' ? process.env.VITE_FIREBASE_STORAGE_BUCKET || 'ucp-bahawalpur.appspot.com' : 'ucp-bahawalpur.appspot.com',
  messagingSenderId: typeof process !== 'undefined' ? process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '' : '',
  appId: typeof process !== 'undefined' ? process.env.VITE_FIREBASE_APP_ID || '' : '',
};

// In-Memory and Local Storage Cache Map with TTL
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttlMs: number;
}

const memoryCache = new Map<string, CacheEntry<any>>();

/**
 * Get cached Firestore data by key.
 * If cached and within TTL (default 3600s = 1 hour), returns cached data immediately without network hit.
 */
export async function getCachedFirestoreData<T>(
  cacheKey: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = revalidate
): Promise<T> {
  const now = Date.now();
  const ttlMs = ttlSeconds * 1000;

  // 1. Check in-memory cache first (instant)
  const inMemory = memoryCache.get(cacheKey);
  if (inMemory && now - inMemory.timestamp < inMemory.ttlMs) {
    return inMemory.data as T;
  }

  // 2. Check localStorage on client if available
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const stored = window.localStorage.getItem(`ucp_fs_${cacheKey}`);
      if (stored) {
        const parsed: CacheEntry<T> = JSON.parse(stored);
        if (now - parsed.timestamp < parsed.ttlMs) {
          memoryCache.set(cacheKey, parsed);
          return parsed.data;
        }
      }
    } catch {
      // LocalStorage unavailable or quota exceeded; proceed with fetch
    }
  }

  // 3. Perform network fetch
  try {
    const freshData = await fetcher();
    const entry: CacheEntry<T> = {
      data: freshData,
      timestamp: now,
      ttlMs,
    };

    memoryCache.set(cacheKey, entry);

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(`ucp_fs_${cacheKey}`, JSON.stringify(entry));
      } catch {
        // Ignore storage write errors
      }
    }

    return freshData;
  } catch (err) {
    // If fetch fails and stale cache exists, serve stale rather than throwing
    if (inMemory) {
      console.warn(`[Firebase] Network fetch failed for ${cacheKey}; serving stale cache.`);
      return inMemory.data as T;
    }
    throw err;
  }
}

/**
 * Invalidate cache entry manually when an admin updates content
 */
export function invalidateFirestoreCache(cacheKey?: string) {
  if (cacheKey) {
    memoryCache.delete(cacheKey);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(`ucp_fs_${cacheKey}`);
    }
  } else {
    memoryCache.clear();
    if (typeof window !== 'undefined' && window.localStorage) {
      const keys = Object.keys(window.localStorage).filter(k => k.startsWith('ucp_fs_'));
      keys.forEach(k => window.localStorage.removeItem(k));
    }
  }
}

export default {
  revalidate,
  firebaseConfig,
  getCachedFirestoreData,
  invalidateFirestoreCache,
};
