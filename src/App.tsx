/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { AboutView } from './components/AboutView';
import { Header, type TabType } from './components/Header';
import { JourneyResultView } from './components/JourneyResultView';
import { MetroBookmarkIcon, MetroCloseIcon, MetroSwapIcon } from './components/MetroIcons';
import { StationAutocomplete } from './components/StationAutocomplete';
import { StationBrowser } from './components/StationBrowser';
import { getStation, STATIONS } from './data/stations';
import { useFavorites } from './hooks/useFavorites';
import { useTheme } from './hooks/useTheme';
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
  const { theme, toggleTheme } = useTheme();

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
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--ink-primary)] flex flex-col">
      {/* Stockholm Metro Platform Signboard Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        authLoading={authLoading}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Compact Architectural Main Grid */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-3 sm:py-5">
        {/* TAB 1: RESOR — 2-Column Transit Control & Departure Board on Desktop */}
        {activeTab === 'resor' && (
          <div className="grid grid-cols-1 lg:grid-cols-[370px_1fr] gap-3 lg:gap-4 items-start">
            {/* Left Rail: Route Search + Quick Hubs + Saved Routes */}
            <aside className="space-y-3 lg:sticky lg:top-[76px]">
              {/* Search Box Panel */}
              <section className="bg-[var(--bg-surface)] border border-[var(--grid-divider)] border-t-[5px] border-t-[#008DD0]">
                <div className="px-3.5 py-2.5 border-b border-[var(--grid-divider)] bg-[var(--bg-canvas)] flex items-center justify-between gap-2">
                  <span className="signage-label text-[var(--ink-primary)]">Sök sträcka</span>

                  <button
                    type="button"
                    onClick={handleSwapStations}
                    className="metro-btn inline-flex items-center gap-1.5 h-8 px-2.5 bg-[var(--bg-surface)] border border-[var(--grid-divider)] text-[var(--ink-primary)] hover:bg-[#008DD0] hover:border-[#008DD0] hover:text-[#FFFFFF] text-[11px] font-bold uppercase tracking-[0.06em]"
                    title="Växla start- och slutstation"
                  >
                    <MetroSwapIcon className="w-3.5 h-3.5" />
                    <span>Byt håll</span>
                  </button>
                </div>

                {/* Station Inputs */}
                <div className="p-3.5 space-y-3">
                  <StationAutocomplete
                    label="1. Kliv på"
                    placeholder="Avgångsstation (t.ex. Odenplan)..."
                    selectedStation={fromStation}
                    onSelectStation={setFromStation}
                    otherStation={toStation}
                    markerColor="bg-[#00A859]"
                    favoriteStationIds={favoriteStationIds}
                  />

                  <StationAutocomplete
                    label="2. Kliv av"
                    placeholder="Destination (t.ex. T-Centralen)..."
                    selectedStation={toStation}
                    onSelectStation={setToStation}
                    otherStation={fromStation}
                    markerColor="bg-[#E53935]"
                    favoriteStationIds={favoriteStationIds}
                  />
                </div>

                {/* Quick Hub Station Grid */}
                <div className="px-3.5 py-3 border-t border-[var(--grid-divider)] bg-[var(--bg-canvas)] space-y-2">
                  <div className="signage-label text-[var(--ink-secondary)]">Knutpunkter</div>
                  <div className="flex flex-wrap gap-1">
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
                          className={`metro-btn px-2.5 py-1.5 text-[11px] font-bold border transition-colors ${
                            isDest
                              ? 'bg-[#008DD0] border-[#008DD0] text-[#FFFFFF]'
                              : isOrig
                                ? 'bg-[#00A859] border-[#00A859] text-[#FFFFFF]'
                                : 'bg-[var(--bg-surface)] border-[var(--grid-divider)] text-[var(--ink-primary)] hover:bg-[#FFD400] hover:border-[#FFD400] hover:text-[#16181D]'
                          }`}
                        >
                          {st.name.replace(/\s*\([^)]*\)/g, '')}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Saved Routes Panel */}
              {favoriteRoutes.length > 0 && (
                <section className="bg-[var(--bg-surface)] border border-[var(--grid-divider)] border-l-[5px] border-l-[#FFD400]">
                  <div className="px-3.5 py-2.5 border-b border-[var(--grid-divider)] bg-[var(--bg-canvas)] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 signage-label text-[var(--ink-primary)]">
                      <MetroBookmarkIcon filled className="w-3.5 h-3.5 text-[#F26D21]" />
                      <span>Sparade sträckor</span>
                    </div>
                    <span className="font-mono-tabular text-[11px] font-bold bg-[#FFD400] text-[#16181D] px-1.5 py-0.5">
                      {favoriteRoutes.length}
                    </span>
                  </div>

                  <div className="divide-y divide-[var(--grid-divider)]">
                    {favoriteRoutes.map((route) => {
                      const isSelected =
                        fromStation?.id === route.fromId && toStation?.id === route.toId;
                      return (
                        <div
                          key={route.id}
                          className={`flex items-stretch ${
                            isSelected
                              ? 'bg-[#008DD0] text-[#FFFFFF]'
                              : 'bg-[var(--bg-surface)] text-[var(--ink-primary)]'
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
                            className={`metro-btn flex-1 px-3 py-2.5 text-left text-xs font-bold truncate ${
                              isSelected
                                ? 'text-[#FFFFFF]'
                                : 'hover:bg-[var(--bg-canvas)] text-[var(--ink-primary)]'
                            }`}
                          >
                            {route.fromName.replace(/\s*\([^)]*\)/g, '')} →{' '}
                            {route.toName.replace(/\s*\([^)]*\)/g, '')}
                          </button>

                          <button
                            type="button"
                            onClick={() => removeFavoriteRoute(route.id)}
                            aria-label="Ta bort sparad sträcka"
                            title="Ta bort sparad sträcka"
                            className={`metro-btn w-10 flex items-center justify-center border-l shrink-0 ${
                              isSelected
                                ? 'border-[#FFFFFF]/25 text-[#FFFFFF] hover:bg-[#E53935]'
                                : 'border-[var(--grid-divider)] text-[var(--ink-secondary)] hover:bg-[#E53935] hover:text-[#FFFFFF]'
                            }`}
                          >
                            <MetroCloseIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </aside>

            {/* Right Main Panel: Live Journey Result & Train Diagram */}
            <div className="min-w-0">
              {journeyPlan ? (
                <JourneyResultView
                  journeyPlan={journeyPlan}
                  isFavoriteRoute={isCurrentRouteFavorite}
                  onToggleFavoriteRoute={handleToggleCurrentRouteFavorite}
                />
              ) : (
                <div className="bg-[var(--bg-surface)] border border-[var(--grid-divider)] border-l-[5px] border-l-[#008DD0] p-6">
                  <p className="font-display text-base font-bold text-[var(--ink-primary)]">
                    Välj avgångsstation och destination för att se rätt vagn och uppgång.
                  </p>
                </div>
              )}
            </div>
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
    </div>
  );
}
