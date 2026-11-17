/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from 'lucide-react';
import type React from 'react';
import { useMemo, useState } from 'react';
import { getColorClasses, METRO_LINES } from '../data/lines';
import { STATIONS } from '../data/stations';
import type { MetroColor, Station } from '../types/metro';

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
    // Clear selected line if it doesn't belong to the newly chosen color
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
      // 1. Color / Favorites filter
      if (colorFilter === 'fav') {
        if (!favoriteStationIds.includes(station.id)) return false;
      } else if (colorFilter !== 'all') {
        const linesForColor = COLOR_TO_LINES[colorFilter] || [];
        if (!station.lines.some((l) => linesForColor.includes(l))) return false;
      }

      // 2. Specific line number filter
      if (selectedLine !== null) {
        if (!station.lines.includes(selectedLine)) return false;
      }

      // 3. Text search
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = station.name.toLowerCase().includes(q);
        const matchesExit = station.exits.some((e) => e.name.toLowerCase().includes(q));
        const matchesLine = station.lines.some((l) => String(l) === q);
        return matchesName || matchesExit || matchesLine;
      }

      return true;
    });

    // 4. Sorting
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name, 'sv');
        case 'name-desc':
          return b.name.localeCompare(a.name, 'sv');
        case 'line-order':
          // Higher level = further North/West
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
    <div className="space-y-4 max-w-xl mx-auto">
      {/* Search, Filter & Sort Card */}
      <div className="bg-[#FFFFFF] border border-[#E7E2D9] rounded-2xl p-4 space-y-3 shadow-2xs">
        {/* Search input + Filter toggle */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8E8980] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Sök station, gata eller linje..."
              className="w-full bg-[#FAF8F5] border border-[#D9D3C7] text-[#1F1D1A] rounded-xl pl-9 pr-8 py-2 text-sm font-medium placeholder-[#A8A399] focus:outline-hidden focus:border-[#006298] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Rensa sökning"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8E8980] hover:text-[#1F1D1A]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className={`h-[38px] px-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 ${
              showFilters
                ? 'bg-[#EAE5DC] border-[#D9D3C7] text-[#1F1D1A]'
                : 'bg-[#FAF8F5] border-[#E7E2D9] text-[#6B665F] hover:text-[#1F1D1A]'
            }`}
            title="Visa eller dölj filter och sortering"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Filter</span>
          </button>
        </div>

        {showFilters && (
          <div className="space-y-2.5 pt-1">
            {/* Color & Favorites Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs">
              <button
                type="button"
                onClick={() => {
                  handleSelectColor('all');
                  setSelectedLine(null);
                }}
                className={`px-3 py-1 rounded-lg font-medium transition-colors shrink-0 ${
                  colorFilter === 'all' && selectedLine === null
                    ? 'bg-[#1F1D1A] text-white'
                    : 'bg-[#FAF8F5] text-[#6B665F] hover:bg-[#EAE5DC]'
                }`}
              >
                Alla ({STATIONS.length})
              </button>

              <button
                type="button"
                onClick={() => handleSelectColor('fav')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 shrink-0 ${
                  colorFilter === 'fav'
                    ? 'bg-amber-600 text-white'
                    : 'bg-[#FAF8F5] text-[#6B665F] hover:bg-amber-50 hover:text-amber-700'
                }`}
              >
                <Star className="w-3 h-3 fill-current" />
                <span>Favoriter ({favoriteStationIds.length})</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectColor(colorFilter === 'green' ? 'all' : 'green')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 shrink-0 ${
                  colorFilter === 'green'
                    ? 'bg-[#138A36] text-white'
                    : 'bg-[#FAF8F5] text-[#6B665F] hover:bg-[#EAF5EE] hover:text-[#138A36]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#138A36]" />
                Grön
              </button>

              <button
                type="button"
                onClick={() => handleSelectColor(colorFilter === 'red' ? 'all' : 'red')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 shrink-0 ${
                  colorFilter === 'red'
                    ? 'bg-[#D32F2F] text-white'
                    : 'bg-[#FAF8F5] text-[#6B665F] hover:bg-[#FDF0F0] hover:text-[#D32F2F]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F]" />
                Röd
              </button>

              <button
                type="button"
                onClick={() => handleSelectColor(colorFilter === 'blue' ? 'all' : 'blue')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 shrink-0 ${
                  colorFilter === 'blue'
                    ? 'bg-[#006298] text-white'
                    : 'bg-[#FAF8F5] text-[#6B665F] hover:bg-[#EAF3F9] hover:text-[#006298]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#006298]" />
                Blå
              </button>
            </div>

            {/* Line Number Filter + Sort Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#F0ECE1]">
              {/* Specific Line Number Chips */}
              <div className="flex items-center gap-1 overflow-x-auto">
                <span className="text-[11px] font-semibold text-[#78736B] mr-0.5 shrink-0">
                  Linje:
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
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md border transition-all shrink-0 ${
                        isActive
                          ? `${c.bg} text-white border-transparent shadow-2xs`
                          : 'bg-[#FAF8F5] text-[#45423D] border-[#E7E2D9] hover:border-[#1F1D1A]'
                      }`}
                    >
                      {lineId}
                    </button>
                  );
                })}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 ml-auto">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#78736B] shrink-0" />
                <select
                  aria-label="Sortera stationer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-[#FAF8F5] border border-[#E7E2D9] text-[#1F1D1A] text-xs font-medium rounded-lg px-2 py-1 focus:outline-hidden focus:border-[#006298]"
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

      {/* Results Summary */}
      <div className="flex items-center justify-between px-1 text-[11px] text-[#78736B]">
        <span>
          Visar <strong className="text-[#1F1D1A]">{filteredAndSortedStations.length}</strong>{' '}
          {filteredAndSortedStations.length === 1 ? 'station' : 'stationer'}
          {selectedLine !== null ? ` på linje ${selectedLine}` : ''}
        </span>
        {(colorFilter !== 'all' || selectedLine !== null || searchQuery.trim().length > 0) && (
          <button
            type="button"
            onClick={() => {
              setColorFilter('all');
              setSelectedLine(null);
              setSearchQuery('');
            }}
            className="text-[#006298] font-semibold hover:underline"
          >
            Nollställ filter
          </button>
        )}
      </div>

      {/* Station List */}
      <div className="space-y-2">
        {filteredAndSortedStations.length > 0 ? (
          filteredAndSortedStations.map((station) => {
            const isExpanded = expandedStationId === station.id;
            const isFav = favoriteStationIds.includes(station.id);
            const orderedExits = [...station.exits].sort(
              (a, b) => EXIT_POS_ORDER[a.position] - EXIT_POS_ORDER[b.position],
            );

            return (
              <div
                key={station.id}
                className="bg-[#FFFFFF] border border-[#E7E2D9] rounded-2xl transition-all shadow-2xs overflow-hidden"
              >
                {/* Station Card Header */}
                <div
                  onClick={() => toggleExpand(station.id)}
                  className="p-3.5 flex items-center justify-between gap-3 cursor-pointer select-none hover:bg-[#FAF8F5] transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavoriteStation(station.id);
                      }}
                      className="p-1 -ml-1 text-[#A8A399] hover:text-amber-500 transition-colors"
                      title={isFav ? 'Ta bort från favoriter' : 'Lägg till i favoriter'}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          isFav ? 'text-amber-500 fill-amber-500' : 'text-[#B5AEA0]'
                        }`}
                      />
                    </button>

                    <div className="truncate">
                      <div className="text-sm font-bold text-[#1F1D1A] truncate">
                        {station.name}
                      </div>
                      <div className="text-[11px] text-[#78736B]">
                        {station.exits.length} uppgång{station.exits.length === 1 ? '' : 'ar'}
                      </div>
                    </div>
                  </div>

                  {/* Lines & Expand icon */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="flex items-center gap-1">
                      {station.lines.map((lineId) => {
                        const line = METRO_LINES[lineId];
                        if (!line) return null;
                        const c = getColorClasses(line.color);
                        return (
                          <span
                            key={lineId}
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${c.bg} text-white`}
                          >
                            {lineId}
                          </span>
                        );
                      })}
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#78736B]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#78736B]" />
                    )}
                  </div>
                </div>

                {/* Collapsible Exits & Actions */}
                {isExpanded && (
                  <div className="p-3.5 pt-0 border-t border-[#F0ECE1] bg-[#FAF8F5] space-y-3">
                    <div className="pt-2.5 space-y-2">
                      <div className="text-[11px] font-semibold text-[#6B665F] uppercase tracking-wider">
                        Perrongens uppgångar
                      </div>

                      <div className="space-y-1.5">
                        {orderedExits.map((exit) => (
                          <div
                            key={exit.id}
                            className="p-2.5 bg-[#FFFFFF] rounded-xl border border-[#E7E2D9] flex items-center justify-between gap-2"
                          >
                            <div className="truncate">
                              <div className="text-xs font-bold text-[#1F1D1A] truncate">
                                {exit.name}
                              </div>
                              <div className="text-[10px] text-[#78736B]">
                                Läge:{' '}
                                {exit.position === 'up'
                                  ? 'Norra / västra perrongänden'
                                  : exit.position === 'down'
                                    ? 'Södra / östra perrongänden'
                                    : 'Mitten av perrongen'}
                              </div>
                            </div>

                            <div className="shrink-0">
                              {exit.hasElevator ? (
                                <span className="inline-flex items-center gap-1 text-[#2E7D32] bg-[#EAF5EE] px-1.5 py-0.5 rounded text-[10px] font-medium border border-[#C8E7D3]">
                                  🛗 Hiss
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[#8E8980] bg-[#FAF8F5] px-1.5 py-0.5 rounded text-[10px] border border-[#E7E2D9]">
                                  Trappor
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick navigation buttons */}
                    <div className="pt-1 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectStationAsFrom(station)}
                        className="flex-1 py-1.5 px-3 bg-[#FFFFFF] border border-[#D9D3C7] hover:border-[#1F1D1A] text-[#1F1D1A] text-xs font-semibold rounded-xl transition-all"
                      >
                        Res härifrån
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectStationAsTo(station)}
                        className="flex-1 py-1.5 px-3 bg-[#006298] hover:bg-[#005180] text-white text-xs font-semibold rounded-xl transition-all"
                      >
                        Res hit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-[#FFFFFF] border border-[#E7E2D9] rounded-2xl p-8 text-center text-xs text-[#78736B] space-y-2">
            <MapPin className="w-6 h-6 text-[#A8A399] mx-auto" />
            <p>Inga stationer matchade din sökning eller ditt filter.</p>
            {colorFilter === 'fav' && (
              <p className="text-[11px] text-[#A8A399]">
                Du har inte lagt till några favoritstationer än. Tryck på stjärnan bredvid valfri
                station för att spara den!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
