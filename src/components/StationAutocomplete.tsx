/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Loader2, LocateFixed, MapPin, Star, X } from 'lucide-react';
import type React from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import { getColorClasses, METRO_LINES } from '../data/lines';
import type { Station } from '../types/metro';
import { findNearestStation, searchStations } from '../utils/metroLogic';

interface StationAutocompleteProps {
  label: string;
  placeholder: string;
  selectedStation: Station | null;
  onSelectStation: (station: Station | null) => void;
  otherStation?: Station | null;
  iconColor?: string;
  favoriteStationIds?: string[];
}

export const StationAutocomplete: React.FC<StationAutocompleteProps> = ({
  label,
  placeholder,
  selectedStation,
  onSelectStation,
  otherStation = null,
  iconColor = 'text-[#78736B]',
  favoriteStationIds = [],
}) => {
  const inputId = useId();
  const [query, setQuery] = useState(selectedStation ? selectedStation.name : '');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Station[]>([]);
  const [isLocating, setIsLocating] = useState(false);
  const [locationFeedback, setLocationFeedback] = useState<{
    type: 'info' | 'error';
    message: string;
  } | null>(null);
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
    setLocationFeedback(null);
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
    setLocationFeedback(null);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuery('');
    onSelectStation(null);
    setSuggestions([]);
    setLocationFeedback(null);
    inputRef.current?.focus();
  };

  const handleFindNearest = () => {
    if (isLocating) return;
    setLocationFeedback(null);

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setLocationFeedback({
        type: 'error',
        message: 'Platstjänster stöds inte i din webbläsare.',
      });
      return;
    }

    setIsLocating(true);
    setIsOpen(false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const result = findNearestStation(
          position.coords.latitude,
          position.coords.longitude,
          otherStation?.lines,
        );
        if (result) {
          setQuery(result.station.name);
          onSelectStation(result.station);
          const distText =
            result.distanceMeters < 1000
              ? `${Math.round(result.distanceMeters)} m`
              : `${(result.distanceMeters / 1000).toFixed(1)} km`;
          setLocationFeedback({
            type: 'info',
            message: `Närmaste station: ${result.station.name} (${distText})`,
          });
        } else {
          setLocationFeedback({
            type: 'error',
            message: 'Kunde inte hitta någon station i närheten.',
          });
        }
      },
      (err) => {
        setIsLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setLocationFeedback({
            type: 'error',
            message: 'Åtkomst till plats nekades. Tillåt plats i webbläsaren.',
          });
        } else {
          setLocationFeedback({
            type: 'error',
            message: 'Kunde inte hämta din position just nu.',
          });
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      },
    );
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
      <label
        htmlFor={inputId}
        className="text-[11px] font-semibold text-[#6B665F] uppercase tracking-wider mb-1 flex items-center justify-between"
      >
        <span>{label}</span>
        {selectedStation && (
          <span className="text-[10px] font-normal text-[#8E8980] lowercase">
            {selectedStation.exits.length} uppgång{selectedStation.exits.length === 1 ? '' : 'ar'}
          </span>
        )}
      </label>

      <div className="flex items-center gap-1.5">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className={`w-4 h-4 ${iconColor}`} />
          </div>

          <input
            id={inputId}
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
              aria-label="Rensa station"
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#8E8980] hover:text-[#1F1D1A]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Nearest Me Button */}
        <button
          type="button"
          onClick={handleFindNearest}
          disabled={isLocating}
          title="Närmast mig"
          aria-label="Välj närmaste tunnelbanestation"
          className="h-[42px] px-2.5 sm:px-3 rounded-xl border border-[#D9D3C7] bg-[#FAF8F5] hover:bg-[#EAE5DC] hover:border-[#1F1D1A] text-[#3D3A35] active:scale-95 transition-all flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-60"
        >
          {isLocating ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#006298]" />
          ) : (
            <LocateFixed className="w-4 h-4 text-[#006298]" />
          )}
          <span className="text-[11px] font-semibold hidden xs:inline">Närmast</span>
        </button>
      </div>

      {/* Inline Location Feedback */}
      {locationFeedback && (
        <p
          className={`mt-1 text-[11px] font-medium ${
            locationFeedback.type === 'error' ? 'text-[#D32F2F]' : 'text-[#138A36]'
          }`}
        >
          {locationFeedback.message}
        </p>
      )}

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
