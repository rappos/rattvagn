/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChevronDown, ChevronUp, MapPin, Search, Star, X } from 'lucide-react';
import type React from 'react';
import { useMemo, useState } from 'react';
import { getColorClasses, METRO_LINES } from '../data/lines';
import { STATIONS } from '../data/stations';
import type { Station } from '../types/metro';

interface StationBrowserProps {
  favoriteStationIds: string[];
  onToggleFavoriteStation: (stationId: string) => void;
  onSelectStationAsFrom: (station: Station) => void;
  onSelectStationAsTo: (station: Station) => void;
}

export const StationBrowser: React.FC<StationBrowserProps> = ({
  favoriteStationIds,
  onToggleFavoriteStation,
  onSelectStationAsFrom,
  onSelectStationAsTo,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'fav' | '17' | '13' | '10'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedStationId, setExpandedStationId] = useState<string | null>(null);

  const filteredStations = useMemo(() => {
    return STATIONS.filter((station) => {
      // Favorites filter
      if (filterType === 'fav') {
        if (!favoriteStationIds.includes(station.id)) return false;
      } else if (filterType !== 'all') {
        const lineNum = Number.parseInt(filterType, 10);
        if (!station.lines.includes(lineNum)) return false;
      }

      // Search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = station.name.toLowerCase().includes(q);
        const matchesExit = station.exits.some((e) => e.name.toLowerCase().includes(q));
        return matchesName || matchesExit;
      }

      return true;
    });
  }, [filterType, searchQuery, favoriteStationIds]);

  const toggleExpand = (stationId: string) => {
    setExpandedStationId((prev) => (prev === stationId ? null : stationId));
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      {/* Search & Filter Card */}
      <div className="bg-[#FFFFFF] border border-[#E7E2D9] rounded-2xl p-4 space-y-3 shadow-2xs">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#8E8980] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Sök station eller gatuadress..."
            className="w-full bg-[#FAF8F5] border border-[#D9D3C7] text-[#1F1D1A] rounded-xl pl-9 pr-8 py-2 text-sm font-medium placeholder-[#A8A399] focus:outline-hidden focus:border-[#006298] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8E8980] hover:text-[#1F1D1A]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors shrink-0 ${
              filterType === 'all'
                ? 'bg-[#1F1D1A] text-white'
                : 'bg-[#FAF8F5] text-[#6B665F] hover:bg-[#EAE5DC]'
            }`}
          >
            Alla ({STATIONS.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterType('fav')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 shrink-0 ${
              filterType === 'fav'
                ? 'bg-amber-600 text-white'
                : 'bg-[#FAF8F5] text-[#6B665F] hover:bg-amber-50 hover:text-amber-700'
            }`}
          >
            <Star className="w-3 h-3 fill-current" />
            <span>Favoriter ({favoriteStationIds.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterType('17')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 shrink-0 ${
              filterType === '17'
                ? 'bg-[#138A36] text-white'
                : 'bg-[#FAF8F5] text-[#6B665F] hover:bg-[#EAF5EE] hover:text-[#138A36]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#138A36]" />
            Grön
          </button>

          <button
            type="button"
            onClick={() => setFilterType('13')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 shrink-0 ${
              filterType === '13'
                ? 'bg-[#D32F2F] text-white'
                : 'bg-[#FAF8F5] text-[#6B665F] hover:bg-[#FDF0F0] hover:text-[#D32F2F]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F]" />
            Röd
          </button>

          <button
            type="button"
            onClick={() => setFilterType('10')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 shrink-0 ${
              filterType === '10'
                ? 'bg-[#006298] text-white'
                : 'bg-[#FAF8F5] text-[#6B665F] hover:bg-[#EAF3F9] hover:text-[#006298]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#006298]" />
            Blå
          </button>
        </div>
      </div>

      {/* Station List */}
      <div className="space-y-2">
        {filteredStations.length > 0 ? (
          filteredStations.map((station) => {
            const isExpanded = expandedStationId === station.id;
            const isFav = favoriteStationIds.includes(station.id);

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
                        {station.exits.map((exit) => (
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
            <p>Inga stationer matchade din sökning.</p>
            {filterType === 'fav' && (
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
