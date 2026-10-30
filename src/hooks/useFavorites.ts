/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import {
  auth,
  db,
  doc,
  getDoc,
  handleFirestoreError,
  OperationType,
  onAuthStateChanged,
  setDoc,
  type User,
} from '../lib/firebase';

export interface FavoriteRoute {
  id: string; // e.g. "odenplan->t-centralen-gron-rod-linje"
  fromId: string;
  fromName: string;
  toId: string;
  toName: string;
  createdAt: number;
}

const LOCAL_STORAGE_KEY = 'rattvagn_favorites_v1';

export function useFavorites() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [stationIds, setStationIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed.stationIds) ? parsed.stationIds : [];
      }
    } catch {}
    return ['t-centralen-grön-röd-linje', 'odenplan', 'slussen'];
  });

  const [routes, setRoutes] = useState<FavoriteRoute[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed.routes) ? parsed.routes : [];
      }
    } catch {}
    return [];
  });

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);

      if (currentUser) {
        // Sync with Firestore
        const userDocRef = doc(db, 'users', currentUser.uid, 'favorites', 'data');
        try {
          const snapshot = await getDoc(userDocRef);
          if (snapshot.exists()) {
            const data = snapshot.data();
            const remoteStations = Array.isArray(data.stationIds) ? data.stationIds : [];
            const remoteRoutes = Array.isArray(data.routes) ? data.routes : [];

            // Merge local and remote
            setStationIds((prev) => {
              const combined = Array.from(new Set([...prev, ...remoteStations]));
              return combined;
            });
            setRoutes((prev) => {
              const map = new Map<string, FavoriteRoute>();
              for (const r of [...prev, ...remoteRoutes]) {
                if (r?.id) map.set(r.id, r);
              }
              return Array.from(map.values());
            });
          } else {
            // First time cloud sync: write current local favorites to Firestore
            await setDoc(userDocRef, {
              userId: currentUser.uid,
              stationIds,
              routes,
              updatedAt: new Date().toISOString(),
            });
          }
        } catch (err) {
          console.warn('Could not sync cloud favorites:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Save to local storage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ stationIds, routes }));
    } catch {}

    // If logged in, update Firestore asynchronously
    if (user) {
      const userDocRef = doc(db, 'users', user.uid, 'favorites', 'data');
      setDoc(userDocRef, {
        userId: user.uid,
        stationIds,
        routes,
        updatedAt: new Date().toISOString(),
      }).catch((err: unknown) => {
        handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}/favorites/data`);
      });
    }
  }, [stationIds, routes, user]);

  const toggleFavoriteStation = (stationId: string) => {
    setStationIds((prev) => {
      if (prev.includes(stationId)) {
        return prev.filter((id) => id !== stationId);
      }
      return [...prev, stationId];
    });
  };

  const isStationFavorite = (stationId: string) => stationIds.includes(stationId);

  const toggleFavoriteRoute = (fromId: string, fromName: string, toId: string, toName: string) => {
    const routeId = `${fromId}->${toId}`;
    setRoutes((prev) => {
      const exists = prev.some((r) => r.id === routeId);
      if (exists) {
        return prev.filter((r) => r.id !== routeId);
      }
      const newRoute: FavoriteRoute = {
        id: routeId,
        fromId,
        fromName,
        toId,
        toName,
        createdAt: Date.now(),
      };
      return [newRoute, ...prev];
    });
  };

  const isRouteFavorite = (fromId: string, toId: string) => {
    const routeId = `${fromId}->${toId}`;
    return routes.some((r) => r.id === routeId);
  };

  const removeFavoriteRoute = (routeId: string) => {
    setRoutes((prev) => prev.filter((r) => r.id !== routeId));
  };

  return {
    user,
    authLoading,
    favoriteStationIds: stationIds,
    favoriteRoutes: routes,
    toggleFavoriteStation,
    isStationFavorite,
    toggleFavoriteRoute,
    isRouteFavorite,
    removeFavoriteRoute,
  };
}
