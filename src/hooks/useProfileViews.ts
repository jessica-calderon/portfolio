import { useEffect, useState } from 'react';

const COUNTER_KEY = 'jessica-calderon-portfolio-profile-views';
const SESSION_FLAG = 'jc-portfolio-profile-view-counted';
const API_BASE = 'https://countapi.mileshilliard.com/api/v1';

/** Survives React StrictMode remounts within a single page load */
let sharedFetch: Promise<number | null> | null = null;

async function fetchSharedViewCount(): Promise<number | null> {
  if (sharedFetch) return sharedFetch;

  sharedFetch = (async () => {
    try {
      const alreadyCounted =
        typeof sessionStorage !== 'undefined' &&
        sessionStorage.getItem(SESSION_FLAG) === '1';

      // Mark before the network call so StrictMode remounts use get, not a second hit
      if (!alreadyCounted && typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(SESSION_FLAG, '1');
      }

      const endpoint = alreadyCounted
        ? `${API_BASE}/get/${COUNTER_KEY}`
        : `${API_BASE}/hit/${COUNTER_KEY}`;

      const response = await fetch(endpoint);
      if (!response.ok) {
        // Key may not exist yet on get; try a single hit as fallback for first-ever visitor races
        if (alreadyCounted && response.status === 404) {
          const hit = await fetch(`${API_BASE}/hit/${COUNTER_KEY}`);
          if (!hit.ok) return null;
          const hitData = await hit.json();
          const hitValue = Number(hitData?.value);
          return Number.isFinite(hitValue) ? hitValue : null;
        }
        return null;
      }

      const data = await response.json();
      const value = Number(data?.value);
      return Number.isFinite(value) ? value : null;
    } catch {
      return null;
    }
  })();

  return sharedFetch;
}

/**
 * Persistent shared MySpace-style profile view counter.
 * Increments once per browser session; never blocks rendering on failure.
 */
export function useProfileViews(): number | null {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchSharedViewCount().then((value) => {
      if (!cancelled) setViews(value);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return views;
}

export function formatProfileViews(count: number): string {
  return count.toLocaleString('en-US');
}
