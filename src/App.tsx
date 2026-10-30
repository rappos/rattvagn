/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUpDown, Star, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { AboutView } from './components/AboutView';
import { Header, type TabType } from './components/Header';
import { JourneyResultView } from './components/JourneyResultView';
import { StationAutocomplete } from './components/StationAutocomplete';
import { StationBrowser } from './components/StationBrowser';
import { getStation, STATIONS } from './data/stations';
import { useFavorites } from './hooks/useFavorites';
import type { Station } from './types/metro';
import { calculateJourney } from './utils/metroLogic';

const POPULAR_STATIONS = [
  'T-Centralen (Grön & Röd linje)',
  'Odenplan',
  'Slussen',
  'Fridhemsplan (Grön linje)',
  'Gullmarsplan',
  'Liljeholmen',
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('resor');

  // Favorites state
  const {
    user,
    authLoading,
    favoriteStationIds,
    favoriteRoutes,
    toggleFavoriteStation,
    toggleFavoriteRoute,
    isRouteFavorite,
    removeFavoriteRoute,
  } = useFavorites();

  // Selected stations state
  const [fromStation, setFromStation] = useState<Station | null>(() => {
    return getStation('odenplan') || STATIONS[0] || null;
  });

  const [toStation, setToStation] = useState<Station | null>(() => {
    return getStation('t-centralen-grön-röd-linje') || STATIONS[1] || null;
  });

  // Load last searched route from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rattvagn_last_route');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.fromId) {
          const sFrom = getStation(parsed.fromId);
          if (sFrom) setFromStation(sFrom);
        }
        if (parsed.toId) {
          const sTo = getStation(parsed.toId);
          if (sTo) setToStation(sTo);
        }
      }
    } catch {}
  }, []);

  // Save last searched route
  useEffect(() => {
    if (fromStation && toStation) {
      try {
        localStorage.setItem(
          'rattvagn_last_route',
          JSON.stringify({ fromId: fromStation.id, toId: toStation.id }),
        );
      } catch {}
    }
  }, [fromStation, toStation]);

  // Swap From and To stations
  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  // Calculate Journey
  const journeyPlan = useMemo(() => {
    if (!fromStation || !toStation) return null;
    return calculateJourney(fromStation, toStation);
  }, [fromStation, toStation]);

  const isCurrentRouteFavorite = Boolean(
    fromStation && toStation && isRouteFavorite(fromStation.id, toStation.id),
  );

  const handleToggleCurrentRouteFavorite = () => {
    if (!fromStation || !toStation) return;
    toggleFavoriteRoute(fromStation.id, fromStation.name, toStation.id, toStation.name);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1D1A] flex flex-col font-sans selection:bg-[#006298] selection:text-white">
      {/* Header with authentic SL branding, tabs, auth, and PWA prompt */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        authLoading={authLoading}
      />

      {/* Main Content Area: Mobile First */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-4 sm:py-6">
        {/* TAB 1: RESOR */}
        {activeTab === 'resor' && (
          <div className="space-y-4">
            {/* Search Box Card */}
            <div className="bg-[#FFFFFF] border border-[#E7E2D9] rounded-2xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B665F]">
                  Sök sträcka
                </span>

                <button
                  type="button"
                  onClick={handleSwapStations}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF8F5] hover:bg-[#EAE5DC] text-[#45423D] text-[11px] font-semibold transition-colors border border-[#E7E2D9]"
                  title="Växla start- och slutstation"
                >
                  <ArrowUpDown className="w-3 h-3 text-[#006298]" />
                  <span>Byt håll</span>
                </button>
              </div>

              {/* Station inputs */}
              <div className="space-y-2.5">
                <StationAutocomplete
                  label="1. Kliv på"
                  placeholder="Avgångsstation (t.ex. Odenplan)..."
                  selectedStation={fromStation}
                  onSelectStation={setFromStation}
                  iconColor="text-[#138A36]"
                  favoriteStationIds={favoriteStationIds}
                />

                <StationAutocomplete
                  label="2. Kliv av"
                  placeholder="Destination (t.ex. T-Centralen)..."
                  selectedStation={toStation}
                  onSelectStation={setToStation}
                  iconColor="text-[#D32F2F]"
                  favoriteStationIds={favoriteStationIds}
                />
              </div>

              {/* Quick Hub Station Chips */}
              <div className="pt-2 border-t border-[#F0ECE1] flex items-center gap-1.5 overflow-x-auto text-[11px] pb-0.5">
                <span className="text-[#8E8980] shrink-0">Vanliga:</span>
                {POPULAR_STATIONS.map((name) => {
                  const st = getStation(name);
                  if (!st) return null;
                  const isDest = toStation?.id === st.id;
                  const isOrig = fromStation?.id === st.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => {
                        if (!fromStation || (fromStation && toStation)) {
                          setToStation(st);
                        } else {
                          setToStation(st);
                        }
                      }}
                      className={`px-2 py-0.5 rounded-md font-medium shrink-0 transition-colors ${
                        isDest
                          ? 'bg-[#006298] text-white'
                          : isOrig
                            ? 'bg-[#EAF5EE] text-[#138A36] border border-[#C8E7D3]'
                            : 'bg-[#FAF8F5] text-[#524E48] hover:bg-[#EAE5DC]'
                      }`}
                    >
                      {st.name.replace(/\s*\([^)]*\)/g, '')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Favorite Routes Carousel / Chips (If saved) */}
            {favoriteRoutes.length > 0 && (
              <div className="bg-[#FFFFFF] border border-[#E7E2D9] rounded-2xl p-3.5 shadow-2xs space-y-2">
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#6B665F] uppercase tracking-wider">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>Mina sparade sträckor ({favoriteRoutes.length})</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {favoriteRoutes.map((route) => {
                    const isSelected =
                      fromStation?.id === route.fromId && toStation?.id === route.toId;
                    return (
                      <div
                        key={route.id}
                        className={`inline-flex items-center gap-1.5 pl-2.5 pr-1 py-1 rounded-xl text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-[#EAF3F9] border-[#006298] text-[#006298]'
                            : 'bg-[#FAF8F5] border-[#E7E2D9] text-[#1F1D1A] hover:border-[#1F1D1A]'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            const sFrom = getStation(route.fromId);
                            const sTo = getStation(route.toId);
                            if (sFrom) setFromStation(sFrom);
                            if (sTo) setToStation(sTo);
                          }}
                          className="hover:underline text-left truncate max-w-[170px]"
                        >
                          {route.fromName.replace(/\s*\([^)]*\)/g, '')} ➔{' '}
                          {route.toName.replace(/\s*\([^)]*\)/g, '')}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFavoriteRoute(route.id)}
                          className="p-1 text-[#8E8980] hover:text-[#D32F2F] rounded-full hover:bg-white"
                          title="Ta bort sparad sträcka"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Results Presentation */}
            {journeyPlan && (
              <JourneyResultView
                journeyPlan={journeyPlan}
                isFavoriteRoute={isCurrentRouteFavorite}
                onToggleFavoriteRoute={handleToggleCurrentRouteFavorite}
              />
            )}
          </div>
        )}

        {/* TAB 2: STATIONER */}
        {activeTab === 'stationer' && (
          <StationBrowser
            favoriteStationIds={favoriteStationIds}
            onToggleFavoriteStation={toggleFavoriteStation}
            onSelectStationAsFrom={(st) => {
              setFromStation(st);
              setActiveTab('resor');
            }}
            onSelectStationAsTo={(st) => {
              setToStation(st);
              setActiveTab('resor');
            }}
          />
        )}

        {/* TAB 3: OM */}
        {activeTab === 'om' && <AboutView />}
      </main>

      {/* Simplified, Minimal Footer */}
      <footer className="py-4 text-center text-[11px] text-[#8E8980] border-t border-[#E7E2D9] bg-[#FAF8F5]">
        <div className="max-w-xl mx-auto px-4">
          Rätt Vagn • Oberoende hjälpreda för Stockholms tunnelbana
        </div>
      </footer>
    </div>
  );
}
