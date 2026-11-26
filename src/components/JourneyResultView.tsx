/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import { useState } from 'react';
import { getColorClasses } from '../data/lines';
import type { CarPosition, JourneyPlan } from '../types/metro';
import { ExitCard } from './ExitCard';
import {
  MetroArrowRight,
  MetroBookmarkIcon,
  MetroChevronDown,
  MetroChevronUp,
  MetroInfoIcon,
  MetroTransferIcon,
} from './MetroIcons';
import { TrainVisualizer } from './TrainVisualizer';

interface JourneyResultViewProps {
  journeyPlan: JourneyPlan;
  isFavoriteRoute: boolean;
  onToggleFavoriteRoute: () => void;
}

export const JourneyResultView: React.FC<JourneyResultViewProps> = ({
  journeyPlan,
  isFavoriteRoute,
  onToggleFavoriteRoute,
}) => {
  const [selectedCar, setSelectedCar] = useState<CarPosition | null>(null);
  const [selectedExitId, setSelectedExitId] = useState<string | null>(null);
  const [showAllExits, setShowAllExits] = useState(true);

  const { from, to, isSameStation, isDirect, legs, frontExits, middleExits, backExits } =
    journeyPlan;

  const activeLeg = legs[legs.length - 1];
  const evaluatedExits = activeLeg ? activeLeg.evaluatedExits : [];
  const activeLineColors = activeLeg ? getColorClasses(activeLeg.line.color) : getColorClasses('blue');

  const displayedExits = selectedCar
    ? evaluatedExits.filter((e) => e.carPosition === selectedCar)
    : evaluatedExits;

  // Same station case
  if (isSameStation) {
    return (
      <div className="bg-[var(--bg-surface)] border border-[var(--grid-divider)] border-t-[5px] border-t-[#008DD0]">
        <div className="p-4 border-b border-[var(--grid-divider)] flex items-center gap-3">
          <div className="w-9 h-9 bg-[#008DD0] text-[#FFFFFF] flex items-center justify-center shrink-0">
            <MetroInfoIcon className="w-4 h-4" />
          </div>
          <h2 className="font-display text-base sm:text-lg font-bold text-[var(--ink-primary)]">
            {from.name} — alla uppgångar
          </h2>
        </div>

        <div className="p-3 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
          {evaluatedExits.map(({ exit, carPosition, carPositionLabel }) => (
            <ExitCard
              key={exit.id}
              exit={exit}
              carPosition={carPosition}
              carPositionLabel={carPositionLabel}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Overhead Route Departure Signboard */}
      <div
        className={`bg-[var(--bg-surface)] border border-[var(--grid-divider)] border-l-[5px] ${activeLineColors.borderLeft}`}
      >
        <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              {activeLeg && (
                <span
                  className={`font-mono-tabular text-[11px] font-bold px-2 py-0.5 ${activeLineColors.bg} ${activeLineColors.fgOnBg}`}
                >
                  LINJE {activeLeg.line.id}
                </span>
              )}
              <span className="signage-label text-[var(--ink-secondary)]">
                {isDirect ? 'Direktresa' : 'Resa med 1 byte'}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-display text-base sm:text-lg font-bold text-[var(--ink-primary)] leading-tight">
                {from.name}
              </h2>
              <MetroArrowRight className="w-4 h-4 text-[#008DD0] shrink-0" />
              <h2 className="font-display text-base sm:text-lg font-bold text-[var(--ink-primary)] leading-tight">
                {to.name}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleFavoriteRoute}
            className={`metro-btn inline-flex items-center justify-center gap-2 h-10 px-3.5 text-xs font-bold uppercase tracking-[0.06em] border shrink-0 ${
              isFavoriteRoute
                ? 'bg-[#FFD400] border-[#FFD400] text-[#16181D] hover:bg-[#16181D] hover:border-[#16181D] hover:text-[#FFFFFF]'
                : 'bg-[var(--bg-canvas)] border-[var(--grid-divider)] text-[var(--ink-primary)] hover:bg-[#008DD0] hover:border-[#008DD0] hover:text-[#FFFFFF]'
            }`}
            title={isFavoriteRoute ? 'Ta bort favoritsträcka' : 'Spara som favoritsträcka'}
          >
            <MetroBookmarkIcon filled={isFavoriteRoute} className="w-3.5 h-3.5" />
            <span>{isFavoriteRoute ? 'Sparad' : 'Spara sträcka'}</span>
          </button>
        </div>
      </div>

      {/* Transfer Information (Multi-Leg) */}
      {!isDirect && legs.length >= 2 && (
        <div className="bg-[var(--bg-surface)] border border-[var(--grid-divider)] border-l-[5px] border-l-[#F26D21]">
          <div className="px-4 py-2.5 bg-[#F26D21] text-[#16181D] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em]">
              <MetroTransferIcon className="w-4 h-4" />
              <span>Byte vid {legs[0].toStation.name}</span>
            </div>
            <span className="font-mono-tabular text-[11px] font-bold bg-[#16181D] text-[#FFFFFF] px-2 py-0.5">
              2 DELSTRÄCKOR
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--grid-divider)] text-xs">
            {/* Leg 1 */}
            <div className="p-3.5 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="signage-label text-[var(--ink-secondary)]">Delsträcka 1</span>
                <span
                  className={`font-mono-tabular text-[11px] font-bold px-1.5 py-0.5 ${
                    getColorClasses(legs[0].line.color).bg
                  } ${getColorClasses(legs[0].line.color).fgOnBg}`}
                >
                  {legs[0].line.id}
                </span>
              </div>

              <div className="font-bold text-[var(--ink-primary)]">
                {legs[0].fromStation.name} → {legs[0].toStation.name}
              </div>

              <div className="inline-block bg-[#FFD400] text-[#16181D] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em]">
                Byte: Stå{' '}
                {legs[0].recommendedCarForTransfer === 'front'
                  ? 'FRAM'
                  : legs[0].recommendedCarForTransfer === 'back'
                    ? 'BAK'
                    : 'I MITTEN'}{' '}
                i tåget
              </div>

              {legs[0].transferNote && (
                <p className="text-[11px] text-[var(--ink-secondary)] leading-relaxed">
                  {legs[0].transferNote}
                </p>
              )}
            </div>

            {/* Leg 2 */}
            <div className="p-3.5 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="signage-label text-[var(--ink-secondary)]">Delsträcka 2</span>
                <span
                  className={`font-mono-tabular text-[11px] font-bold px-1.5 py-0.5 ${
                    getColorClasses(legs[1].line.color).bg
                  } ${getColorClasses(legs[1].line.color).fgOnBg}`}
                >
                  {legs[1].line.id}
                </span>
              </div>

              <div className="font-bold text-[var(--ink-primary)]">
                {legs[1].fromStation.name} → {legs[1].toStation.name}
              </div>

              <div className="text-[11px] font-semibold text-[var(--ink-secondary)]">
                Färdriktning: <strong className="text-[var(--ink-primary)]">{legs[1].directionTitle}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Architectural Train Visualizer */}
      {activeLeg && (
        <TrainVisualizer
          directionTitle={activeLeg.directionTitle}
          color={activeLeg.line.color}
          activeCar={selectedCar}
          onSelectCar={(car) => setSelectedCar(selectedCar === car ? null : car)}
          frontExitsCount={frontExits.length}
          middleExitsCount={middleExits.length}
          backExitsCount={backExits.length}
        />
      )}

      {/* Destination Exits Board */}
      <section className="bg-[var(--bg-surface)] border border-[var(--grid-divider)]">
        <div className="px-4 py-3 border-b border-[var(--grid-divider)] flex items-center justify-between gap-2">
          <h3 className="font-display text-sm sm:text-base font-bold text-[var(--ink-primary)]">
            Uppgångar vid {to.name}
          </h3>

          <button
            type="button"
            onClick={() => setShowAllExits(!showAllExits)}
            aria-label={showAllExits ? 'Dölj uppgångar' : 'Visa uppgångar'}
            className="metro-btn w-9 h-9 flex items-center justify-center border border-[var(--grid-divider)] bg-[var(--bg-canvas)] text-[var(--ink-primary)] hover:bg-[#008DD0] hover:text-[#FFFFFF] hover:border-[#008DD0]"
          >
            {showAllExits ? (
              <MetroChevronUp className="w-4 h-4" />
            ) : (
              <MetroChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Sharp Rectangular Filter Controls */}
        <div className="grid grid-cols-4 border-b border-[var(--grid-divider)] bg-[var(--bg-canvas)] text-[11px] font-bold uppercase tracking-[0.06em]">
          <button
            type="button"
            onClick={() => setSelectedCar(null)}
            className={`metro-btn py-2.5 px-2 border-r border-[var(--grid-divider)] flex items-center justify-center gap-1.5 ${
              selectedCar === null
                ? 'bg-[#16181D] text-[#FFFFFF] dark:bg-[#FFD400] dark:text-[#16181D]'
                : 'text-[var(--ink-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--ink-primary)]'
            }`}
          >
            <span>Alla</span>
            <span className="font-mono-tabular">({evaluatedExits.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCar('back')}
            className={`metro-btn py-2.5 px-2 border-r border-[var(--grid-divider)] flex items-center justify-center gap-1.5 ${
              selectedCar === 'back'
                ? 'bg-[#E53935] text-[#FFFFFF]'
                : 'text-[var(--ink-secondary)] hover:bg-[#E53935] hover:text-[#FFFFFF]'
            }`}
          >
            <span
              className={`w-2 h-2 shrink-0 ${selectedCar === 'back' ? 'bg-[#FFFFFF]' : 'bg-[#E53935]'}`}
            />
            <span>Bak</span>
            <span className="font-mono-tabular hidden xs:inline">({backExits.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCar('middle')}
            className={`metro-btn py-2.5 px-2 border-r border-[var(--grid-divider)] flex items-center justify-center gap-1.5 ${
              selectedCar === 'middle'
                ? 'bg-[#008DD0] text-[#FFFFFF]'
                : 'text-[var(--ink-secondary)] hover:bg-[#008DD0] hover:text-[#FFFFFF]'
            }`}
          >
            <span
              className={`w-2 h-2 shrink-0 ${selectedCar === 'middle' ? 'bg-[#FFFFFF]' : 'bg-[#008DD0]'}`}
            />
            <span>Mitt</span>
            <span className="font-mono-tabular hidden xs:inline">({middleExits.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCar('front')}
            className={`metro-btn py-2.5 px-2 flex items-center justify-center gap-1.5 ${
              selectedCar === 'front'
                ? 'bg-[#00A859] text-[#FFFFFF]'
                : 'text-[var(--ink-secondary)] hover:bg-[#00A859] hover:text-[#FFFFFF]'
            }`}
          >
            <span
              className={`w-2 h-2 shrink-0 ${selectedCar === 'front' ? 'bg-[#FFFFFF]' : 'bg-[#00A859]'}`}
            />
            <span>Fram</span>
            <span className="font-mono-tabular hidden xs:inline">({frontExits.length})</span>
          </button>
        </div>

        {showAllExits && (
          <div className="p-3 sm:p-4">
            {displayedExits.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {displayedExits.map(({ exit, carPosition, carPositionLabel }) => (
                  <ExitCard
                    key={exit.id}
                    exit={exit}
                    carPosition={carPosition}
                    carPositionLabel={carPositionLabel}
                    isSelected={selectedExitId === exit.id}
                    onSelect={() => {
                      setSelectedExitId(exit.id);
                      setSelectedCar(carPosition);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="py-6 px-4 text-center border border-[var(--grid-divider)] bg-[var(--bg-canvas)] space-y-2.5">
                <p className="text-xs font-medium text-[var(--ink-secondary)]">
                  Inga uppgångar finns i denna sektion av tåget.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedCar(null)}
                  className="metro-btn inline-flex items-center justify-center px-3.5 py-2 bg-[#008DD0] text-[#FFFFFF] hover:bg-[#FFD400] hover:text-[#16181D] text-xs font-bold uppercase tracking-[0.06em]"
                >
                  Visa alla uppgångar
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
