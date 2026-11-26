/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import { useMemo, useState } from 'react';
import { getColorClasses, getStationPrimaryColor, METRO_LINES } from '../data/lines';
import { STATIONS } from '../data/stations';
import type { MetroColor, Station } from '../types/metro';
import {
  MetroBookmarkIcon,
  MetroChevronDown,
  MetroChevronUp,
  MetroCloseIcon,
  MetroElevatorIcon,
  MetroFilterIcon,
  MetroSearchIcon,
  MetroStairsIcon,
  MetroSwapIcon,
} from './MetroIcons';

interface StationBrowserProps {
  favoriteStationIds: string[];
  onToggleFavoriteStation: (stationId: string) => void;
  onSelectStationAsFrom: (station: Station) => void;
  onSelectStationAsTo: (station: Station) => void;
}

type ColorFilter = 'all' | 'fav' | MetroColor;
type SortOption = 'name-asc' | 'name-desc' | 'line-order' | 'most-exits' | 'favorites-first';

const COLOR_TO_LINES: Record<MetroColor, number[]> = {
  green: [17, 18, 19],
  red: [13, 14],
  blue: [10, 11],
  yellow: [25],
};

const ALL_ACTIVE_LINES = [10, 11, 13, 14, 17, 18, 19];

const EXIT_POS_ORDER: Record<'down' | 'middle' | 'up', number> = {
  down: 0,
  middle: 1,
  up: 2,
};

export const StationBrowser: React.FC<StationBrowserProps> = ({
  favoriteStationIds,
  onToggleFavoriteStation,
  onSelectStationAsFrom,
  onSelectStationAsTo,
}) => {
  const [colorFilter, setColorFilter] = useState<ColorFilter>('all');
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedStationId, setExpandedStationId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  const visibleLineNumbers = useMemo(() => {
    if (colorFilter === 'green' || colorFilter === 'red' || colorFilter === 'blue') {
      return COLOR_TO_LINES[colorFilter];
    }
    return ALL_ACTIVE_LINES;
  }, [colorFilter]);

  const handleSelectColor = (nextColor: ColorFilter) => {
    setColorFilter(nextColor);
    if (selectedLine !== null) {
      if (nextColor === 'green' || nextColor === 'red' || nextColor === 'blue') {
        if (!COLOR_TO_LINES[nextColor].includes(selectedLine)) {
          setSelectedLine(null);
        }
      } else if (nextColor === 'fav') {
        setSelectedLine(null);
      }
    }
  };

  const handleSelectLine = (lineId: number) => {
    if (selectedLine === lineId) {
      setSelectedLine(null);
    } else {
      setSelectedLine(lineId);
      const lineInfo = METRO_LINES[lineId];
      if (lineInfo && colorFilter !== 'fav' && colorFilter !== lineInfo.color) {
        setColorFilter(lineInfo.color);
      }
    }
  };

  const filteredAndSortedStations = useMemo(() => {
    const filtered = STATIONS.filter((station) => {
      if (colorFilter === 'fav') {
        if (!favoriteStationIds.includes(station.id)) return false;
      } else if (colorFilter !== 'all') {
        const linesForColor = COLOR_TO_LINES[colorFilter] || [];
        if (!station.lines.some((l) => linesForColor.includes(l))) return false;
      }

      if (selectedLine !== null) {
        if (!station.lines.includes(selectedLine)) return false;
      }

      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = station.name.toLowerCase().includes(q);
        const matchesExit = station.exits.some((e) => e.name.toLowerCase().includes(q));
        const matchesLine = station.lines.some((l) => String(l) === q);
        return matchesName || matchesExit || matchesLine;
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name, 'sv');
        case 'name-desc':
          return b.name.localeCompare(a.name, 'sv');
        case 'line-order':
          if (b.level !== a.level) return b.level - a.level;
          return a.name.localeCompare(b.name, 'sv');
        case 'most-exits':
          if (b.exits.length !== a.exits.length) return b.exits.length - a.exits.length;
          return a.name.localeCompare(b.name, 'sv');
        case 'favorites-first': {
          const aFav = favoriteStationIds.includes(a.id) ? 0 : 1;
          const bFav = favoriteStationIds.includes(b.id) ? 0 : 1;
          if (aFav !== bFav) return aFav - bFav;
          return a.name.localeCompare(b.name, 'sv');
        }
        default:
          return 0;
      }
    });
  }, [colorFilter, selectedLine, sortBy, searchQuery, favoriteStationIds]);

  const toggleExpand = (stationId: string) => {
    setExpandedStationId((prev) => (prev === stationId ? null : stationId));
  };

  return (
    <div className="space-y-3">
      {/* Station Directory Control Bar */}
      <div className="bg-[var(--bg-surface)] border border-[var(--grid-divider)] border-t-[5px] border-t-[#008DD0]">
        <div className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-2 border-b border-[var(--grid-divider)]">
          <div className="relative flex-1">
            <MetroSearchIcon className="w-4 h-4 text-[var(--ink-secondary)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Sök station, gata eller linjenummer..."
              className="w-full h-11 bg-[var(--bg-canvas)] border border-[var(--grid-divider)] text-[var(--ink-primary)] pl-9 pr-9 text-sm font-semibold placeholder-[var(--ink-secondary)]/70 focus:outline-none focus:border-2 focus:border-[#008DD0]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Rensa sökning"
                className="metro-btn absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center text-[var(--ink-secondary)] hover:text-[#E53935]"
              >
                <MetroCloseIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className={`metro-btn h-11 px-4 border text-xs font-bold uppercase tracking-[0.08em] flex items-center justify-center gap-2 shrink-0 ${
              showFilters
                ? 'bg-[#16181D] text-[#FFFFFF] border-[#16181D] dark:bg-[#FFD400] dark:text-[#16181D] dark:border-[#FFD400]'
                : 'bg-[var(--bg-canvas)] text-[var(--ink-primary)] border-[var(--grid-divider)] hover:bg-[#008DD0] hover:text-[#FFFFFF] hover:border-[#008DD0]'
            }`}
            title="Visa eller dölj filter och sortering"
          >
            <MetroFilterIcon className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
        </div>

        {showFilters && (
          <div className="divide-y divide-[var(--grid-divider)]">
            {/* Transit Line Color & Favorites Filter Strip */}
            <div className="p-3 sm:px-4 flex items-center gap-1.5 overflow-x-auto text-xs">
              <button
                type="button"
                onClick={() => {
                  handleSelectColor('all');
                  setSelectedLine(null);
                }}
                className={`metro-btn h-9 px-3 border font-bold uppercase tracking-[0.06em] shrink-0 ${
                  colorFilter === 'all' && selectedLine === null
                    ? 'bg-[#008DD0] text-[#FFFFFF] border-[#008DD0]'
                    : 'bg-[var(--bg-canvas)] text-[var(--ink-primary)] border-[var(--grid-divider)] hover:bg-[#16181D] hover:text-[#FFFFFF]'
                }`}
              >
                Alla <span className="font-mono-tabular">({STATIONS.length})</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectColor('fav')}
                className={`metro-btn h-9 px-3 border font-bold uppercase tracking-[0.06em] flex items-center gap-1.5 shrink-0 ${
                  colorFilter === 'fav'
                    ? 'bg-[#FFD400] text-[#16181D] border-[#FFD400]'
                    : 'bg-[var(--bg-canvas)] text-[var(--ink-primary)] border-[var(--grid-divider)] hover:bg-[#FFD400] hover:text-[#16181D] hover:border-[#FFD400]'
                }`}
              >
                <MetroBookmarkIcon filled={colorFilter === 'fav'} className="w-3.5 h-3.5" />
                <span>
                  Favoriter <span className="font-mono-tabular">({favoriteStationIds.length})</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectColor(colorFilter === 'green' ? 'all' : 'green')}
                className={`metro-btn h-9 px-3 border font-bold uppercase tracking-[0.06em] flex items-center gap-1.5 shrink-0 ${
                  colorFilter === 'green'
                    ? 'bg-[#00A859] text-[#FFFFFF] border-[#00A859]'
                    : 'bg-[var(--bg-canvas)] text-[var(--ink-primary)] border-[var(--grid-divider)] hover:bg-[#00A859] hover:text-[#FFFFFF] hover:border-[#00A859]'
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 shrink-0 ${
                    colorFilter === 'green' ? 'bg-[#FFFFFF]' : 'bg-[#00A859]'
                  }`}
                />
                <span>Grön</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectColor(colorFilter === 'red' ? 'all' : 'red')}
                className={`metro-btn h-9 px-3 border font-bold uppercase tracking-[0.06em] flex items-center gap-1.5 shrink-0 ${
                  colorFilter === 'red'
                    ? 'bg-[#E53935] text-[#FFFFFF] border-[#E53935]'
                    : 'bg-[var(--bg-canvas)] text-[var(--ink-primary)] border-[var(--grid-divider)] hover:bg-[#E53935] hover:text-[#FFFFFF] hover:border-[#E53935]'
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 shrink-0 ${
                    colorFilter === 'red' ? 'bg-[#FFFFFF]' : 'bg-[#E53935]'
                  }`}
                />
                <span>Röd</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectColor(colorFilter === 'blue' ? 'all' : 'blue')}
                className={`metro-btn h-9 px-3 border font-bold uppercase tracking-[0.06em] flex items-center gap-1.5 shrink-0 ${
                  colorFilter === 'blue'
                    ? 'bg-[#008DD0] text-[#FFFFFF] border-[#008DD0]'
                    : 'bg-[var(--bg-canvas)] text-[var(--ink-primary)] border-[var(--grid-divider)] hover:bg-[#008DD0] hover:text-[#FFFFFF] hover:border-[#008DD0]'
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 shrink-0 ${
                    colorFilter === 'blue' ? 'bg-[#FFFFFF]' : 'bg-[#008DD0]'
                  }`}
                />
                <span>Blå</span>
              </button>
            </div>

            {/* Specific Line Numbers + Sort Select */}
            <div className="p-3 sm:px-4 flex flex-wrap items-center justify-between gap-2.5 bg-[var(--bg-canvas)]">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <span className="signage-label text-[var(--ink-secondary)] mr-1 shrink-0">
                  Linje
                </span>
                {visibleLineNumbers.map((lineId) => {
                  const line = METRO_LINES[lineId];
                  if (!line) return null;
                  const c = getColorClasses(line.color);
                  const isActive = selectedLine === lineId;
                  return (
                    <button
                      key={lineId}
                      type="button"
                      onClick={() => handleSelectLine(lineId)}
                      title={line.description}
                      className={`metro-btn font-mono-tabular text-xs font-bold w-8 h-8 border flex items-center justify-center shrink-0 ${
                        isActive
                          ? `${c.bg} ${c.fgOnBg} ${c.border}`
                          : 'bg-[var(--bg-surface)] text-[var(--ink-primary)] border-[var(--grid-divider)] hover:border-[#008DD0]'
                      }`}
                    >
                      {lineId}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <MetroSwapIcon className="w-3.5 h-3.5 text-[var(--ink-secondary)] shrink-0" />
                <select
                  aria-label="Sortera stationer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="h-9 bg-[var(--bg-surface)] border border-[var(--grid-divider)] text-[var(--ink-primary)] text-xs font-bold px-2.5 focus:outline-none focus:border-2 focus:border-[#008DD0]"
                >
                  <option value="name-asc">Namn (A–Ö)</option>
                  <option value="name-desc">Namn (Ö–A)</option>
                  <option value="line-order">Norr → Söder</option>
                  <option value="most-exits">Flest uppgångar</option>
                  <option value="favorites-first">Favoriter först</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary Strip */}
      <div className="flex items-center justify-between px-1 py-1 text-xs">
        <span className="text-[var(--ink-secondary)] font-medium">
          Visar{' '}
          <strong className="font-mono-tabular text-[var(--ink-primary)]">
            {filteredAndSortedStations.length}
          </strong>{' '}
          {filteredAndSortedStations.length === 1 ? 'station' : 'stationer'}
          {selectedLine !== null ? (
            <>
              {' '}
              på <strong className="font-mono-tabular text-[var(--ink-primary)]">linje {selectedLine}</strong>
            </>
          ) : (
            ''
          )}
        </span>

        {(colorFilter !== 'all' || selectedLine !== null || searchQuery.trim().length > 0) && (
          <button
            type="button"
            onClick={() => {
              setColorFilter('all');
              setSelectedLine(null);
              setSearchQuery('');
            }}
            className="metro-btn px-2.5 py-1 bg-[#16181D] text-[#FFFFFF] hover:bg-[#FFD400] hover:text-[#16181D] text-[11px] font-bold uppercase tracking-[0.06em]"
          >
            Nollställ filter
          </button>
        )}
      </div>

      {/* Modular 2-Column Station Directory Grid */}
      {filteredAndSortedStations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start">
          {filteredAndSortedStations.map((station) => {
            const isExpanded = expandedStationId === station.id;
            const isFav = favoriteStationIds.includes(station.id);
            const primaryColor = getColorClasses(getStationPrimaryColor(station.lines));
            const orderedExits = [...station.exits].sort(
              (a, b) => EXIT_POS_ORDER[a.position] - EXIT_POS_ORDER[b.position],
            );

            return (
              <div
                key={station.id}
                className={`bg-[var(--bg-surface)] border border-[var(--grid-divider)] border-l-[5px] ${primaryColor.borderLeft}`}
              >
                {/* Station Header Row */}
                <div
                  onClick={() => toggleExpand(station.id)}
                  className="px-3 py-2.5 flex items-center justify-between gap-2 cursor-pointer select-none hover:bg-[var(--bg-canvas)] min-h-[56px]"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavoriteStation(station.id);
                      }}
                      className="metro-btn w-9 h-9 -ml-1 flex items-center justify-center text-[var(--ink-secondary)] hover:bg-[#FFD400] hover:text-[#16181D] shrink-0"
                      title={isFav ? 'Ta bort från favoriter' : 'Lägg till i favoriter'}
                      aria-label={isFav ? 'Ta bort favoritstation' : 'Spara favoritstation'}
                    >
                      <MetroBookmarkIcon
                        filled={isFav}
                        className={`w-4 h-4 ${isFav ? 'text-[#F26D21]' : ''}`}
                      />
                    </button>

                    <div className="min-w-0">
                      <div className="font-display text-sm font-bold text-[var(--ink-primary)] truncate">
                        {station.name}
                      </div>
                      <div className="font-mono-tabular text-[11px] font-medium text-[var(--ink-secondary)]">
                        {station.exits.length}{' '}
                        {station.exits.length === 1 ? 'uppgång' : 'uppgångar'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1">
                      {station.lines.map((lineId) => {
                        const line = METRO_LINES[lineId];
                        if (!line) return null;
                        const c = getColorClasses(line.color);
                        return (
                          <span
                            key={lineId}
                            className={`font-mono-tabular text-[11px] font-bold w-6 h-5 inline-flex items-center justify-center ${c.bg} ${c.fgOnBg}`}
                          >
                            {lineId}
                          </span>
                        );
                      })}
                    </div>
                    {isExpanded ? (
                      <MetroChevronUp className="w-4 h-4 text-[var(--ink-primary)]" />
                    ) : (
                      <MetroChevronDown className="w-4 h-4 text-[var(--ink-secondary)]" />
                    )}
                  </div>
                </div>

                {/* Expanded Station Exits & Quick Actions */}
                {isExpanded && (
                  <div className="border-t border-[var(--grid-divider)] bg-[var(--bg-canvas)] p-3 space-y-3">
                    <div className="space-y-1.5">
                      <div className="signage-label text-[var(--ink-secondary)]">
                        Perrongens uppgångar
                      </div>

                      <div className="divide-y divide-[var(--grid-divider)] border border-[var(--grid-divider)] bg-[var(--bg-surface)]">
                        {orderedExits.map((exit) => (
                          <div
                            key={exit.id}
                            className="p-2.5 flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-[var(--ink-primary)] truncate">
                                {exit.name}
                              </div>
                              <div className="text-[11px] text-[var(--ink-secondary)]">
                                {exit.position === 'up'
                                  ? 'Norra / västra perrongänden'
                                  : exit.position === 'down'
                                    ? 'Södra / östra perrongänden'
                                    : 'Mitten av perrongen'}
                              </div>
                            </div>

                            <div className="shrink-0">
                              {exit.hasElevator ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#00C2CB] text-[#16181D] text-[10px] font-bold uppercase tracking-[0.06em]">
                                  <MetroElevatorIcon className="w-3 h-3" />
                                  <span>Hiss</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--bg-canvas)] border border-[var(--grid-divider)] text-[var(--ink-secondary)] text-[10px] font-bold uppercase tracking-[0.06em]">
                                  <MetroStairsIcon className="w-3 h-3" />
                                  <span>Trappor</span>
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectStationAsFrom(station)}
                        className="metro-btn h-10 px-3 bg-[var(--bg-surface)] border border-[var(--grid-divider)] text-[var(--ink-primary)] hover:bg-[#00A859] hover:border-[#00A859] hover:text-[#FFFFFF] text-xs font-bold uppercase tracking-[0.06em]"
                      >
                        Res härifrån
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectStationAsTo(station)}
                        className="metro-btn h-10 px-3 bg-[#008DD0] text-[#FFFFFF] hover:bg-[#FFD400] hover:text-[#16181D] text-xs font-bold uppercase tracking-[0.06em]"
                      >
                        Res hit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[var(--bg-surface)] border border-[var(--grid-divider)] border-l-[5px] border-l-[#F26D21] p-8 text-center space-y-2">
          <div className="font-display text-sm font-bold text-[var(--ink-primary)]">
            Inga stationer matchade din sökning eller ditt filter.
          </div>
          {colorFilter === 'fav' && (
            <p className="text-xs text-[var(--ink-secondary)] max-w-md mx-auto">
              Du har inte lagt till några favoritstationer än. Tryck på bokmärket bredvid valfri
              station för att spara den.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
