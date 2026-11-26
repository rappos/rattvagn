/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import { getColorClasses, METRO_LINES } from '../data/lines';
import type { Station } from '../types/metro';
import { findNearestStation, searchStations } from '../utils/metroLogic';
import {
  MetroBookmarkIcon,
  MetroCloseIcon,
  MetroCrosshairIcon,
  MetroSpinnerIcon,
} from './MetroIcons';

interface StationAutocompleteProps {
  label: string;
  placeholder: string;
  selectedStation: Station | null;
  onSelectStation: (station: Station | null) => void;
  otherStation?: Station | null;
  markerColor?: string;
  favoriteStationIds?: string[];
}

export const StationAutocomplete: React.FC<StationAutocompleteProps> = ({
  label,
  placeholder,
  selectedStation,
  onSelectStation,
  otherStation = null,
  markerColor = 'bg-[#008DD0]',
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
        className="mb-1.5 flex items-center justify-between gap-2"
      >
        <span className="inline-flex items-center gap-2 signage-label text-[var(--ink-secondary)]">
          <span className={`w-2.5 h-2.5 shrink-0 ${markerColor}`} />
          <span>{label}</span>
        </span>

        {selectedStation && (
          <span className="font-mono-tabular text-[11px] font-semibold text-[var(--ink-secondary)]">
            {selectedStation.exits.length} {selectedStation.exits.length === 1 ? 'UPPGÅNG' : 'UPPGÅNGAR'}
          </span>
        )}
      </label>

      <div className="flex items-stretch">
        <div className="relative flex-1 min-w-0">
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
            className="w-full h-11 bg-[var(--bg-surface)] border border-[var(--grid-divider)] text-[var(--ink-primary)] pl-3 pr-10 text-sm font-semibold placeholder-[var(--ink-secondary)]/70 focus:outline-none focus:border-2 focus:border-[#008DD0]"
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Rensa station"
              className="metro-btn absolute inset-y-0 right-0 w-10 flex items-center justify-center text-[var(--ink-secondary)] hover:text-[#E53935]"
            >
              <MetroCloseIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Nearest Me Button — sharp edge-to-edge mechanical button */}
        <button
          type="button"
          onClick={handleFindNearest}
          disabled={isLocating}
          title="Välj närmaste station via GPS"
          aria-label="Välj närmaste tunnelbanestation"
          className="metro-btn h-11 px-3 border border-l-0 border-[var(--grid-divider)] bg-[var(--bg-canvas)] text-[var(--ink-primary)] hover:bg-[#008DD0] hover:text-[#FFFFFF] hover:border-[#008DD0] flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-60"
        >
          {isLocating ? (
            <MetroSpinnerIcon className="w-4 h-4" />
          ) : (
            <MetroCrosshairIcon className="w-4 h-4" />
          )}
          <span className="text-[11px] font-bold uppercase tracking-[0.06em] hidden xs:inline">
            Närmast
          </span>
        </button>
      </div>

      {/* Inline Location Feedback */}
      {locationFeedback && (
        <div
          className={`mt-1.5 px-2.5 py-1.5 text-[11px] font-bold border-l-[4px] ${
            locationFeedback.type === 'error'
              ? 'border-l-[#E53935] bg-[#E53935]/10 text-[#E53935]'
              : 'border-l-[#00A859] bg-[#00A859]/10 text-[#00A859]'
          }`}
        >
          {locationFeedback.message}
        </div>
      )}

      {/* Dropdown Suggestions */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-0.5 bg-[var(--bg-surface)] border-2 border-[#008DD0] z-50 max-h-64 overflow-y-auto divide-y divide-[var(--grid-divider)]">
          {suggestions.map((station) => {
            const isFav = favoriteStationIds.includes(station.id);
            return (
              <button
                key={station.id}
                type="button"
                onClick={() => handleSelect(station)}
                className="metro-btn w-full text-left px-3 py-2.5 hover:bg-[#008DD0] hover:text-[#FFFFFF] group flex items-center justify-between gap-2 min-h-[44px]"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {isFav && (
                    <MetroBookmarkIcon
                      filled
                      className="w-3.5 h-3.5 text-[#F26D21] group-hover:text-[#FFD400] shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-[var(--ink-primary)] group-hover:text-[#FFFFFF] truncate">
                      {station.name}
                    </div>
                    <div className="text-[11px] text-[var(--ink-secondary)] group-hover:text-[#FFFFFF]/80 truncate">
                      {station.exits
                        .map((e) => e.name)
                        .slice(0, 2)
                        .join(' · ')}
                    </div>
                  </div>
                </div>

                {/* Sharp Rectangular Metro Line Number Badges */}
                <div className="flex items-center gap-1 shrink-0">
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
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
