/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Star, X } from 'lucide-react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { getColorClasses, METRO_LINES } from '../data/lines';
import type { Station } from '../types/metro';
import { searchStations } from '../utils/metroLogic';

interface StationAutocompleteProps {
  label: string;
  placeholder: string;
  selectedStation: Station | null;
  onSelectStation: (station: Station | null) => void;
  iconColor?: string;
  favoriteStationIds?: string[];
}

export const StationAutocomplete: React.FC<StationAutocompleteProps> = ({
  label,
  placeholder,
  selectedStation,
  onSelectStation,
  iconColor = 'text-[#78736B]',
  favoriteStationIds = [],
}) => {
  const [query, setQuery] = useState(selectedStation ? selectedStation.name : '');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Station[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedStation) {
      setQuery(selectedStation.name);
    } else {
      setQuery('');
    }
  }, [selectedStation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length > 0) {
      const results = searchStations(val, 8);
      setSuggestions(results);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
      onSelectStation(null);
    }
  };

  const handleSelect = (station: Station) => {
    setQuery(station.name);
    onSelectStation(station);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuery('');
    onSelectStation(null);
    setSuggestions([]);
    inputRef.current?.focus();
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="block text-[11px] font-semibold text-[#6B665F] uppercase tracking-wider mb-1 flex items-center justify-between">
        <span>{label}</span>
        {selectedStation && (
          <span className="text-[10px] font-normal text-[#8E8980] lowercase">
            {selectedStation.exits.length} uppgång{selectedStation.exits.length === 1 ? '' : 'ar'}
          </span>
        )}
      </label>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className={`w-4 h-4 ${iconColor}`} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (query.trim().length > 0) {
              setSuggestions(searchStations(query, 8));
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          className="w-full bg-[#FFFFFF] border border-[#D9D3C7] text-[#1F1D1A] rounded-xl pl-9 pr-9 py-2.5 text-sm font-medium placeholder-[#A8A399] focus:outline-hidden focus:border-[#006298] focus:ring-1 focus:ring-[#006298] transition-all"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#8E8980] hover:text-[#1F1D1A]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown Suggestions */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-[#FFFFFF] border border-[#D9D3C7] rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto divide-y divide-[#F0ECE1]">
          {suggestions.map((station) => {
            const isFav = favoriteStationIds.includes(station.id);
            return (
              <button
                key={station.id}
                type="button"
                onClick={() => handleSelect(station)}
                className="w-full text-left px-3.5 py-2 hover:bg-[#FAF8F5] transition-colors flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-1.5 truncate">
                  {isFav && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />}
                  <div className="truncate">
                    <span className="text-sm font-semibold text-[#1F1D1A]">{station.name}</span>
                    <span className="text-[11px] text-[#8E8980] ml-2 truncate hidden xs:inline">
                      {station.exits
                        .map((e) => e.name)
                        .slice(0, 2)
                        .join(' • ')}
                    </span>
                  </div>
                </div>

                {/* Line badges */}
                <div className="flex items-center gap-1 shrink-0">
                  {station.lines.map((lineId) => {
                    const line = METRO_LINES[lineId];
                    if (!line) return null;
                    const color = getColorClasses(line.color);
                    return (
                      <span
                        key={lineId}
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${color.bg} text-white`}
                      >
                        {lineId}
                      </span>
                    );
                  })}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
