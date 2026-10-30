/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, ChevronDown, ChevronUp, Info, Shuffle, Star } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import type { CarPosition, JourneyPlan } from '../types/metro';
import { ExitCard } from './ExitCard';
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

  const {
    from,
    to,
    isSameStation,
    isDirect,
    legs,
    frontExits,
    middleExits,
    backExits,
  } = journeyPlan;

  const activeLeg = legs[legs.length - 1]; // destination leg
  const evaluatedExits = activeLeg ? activeLeg.evaluatedExits : [];

  const displayedExits = selectedCar
    ? evaluatedExits.filter((e) => e.carPosition === selectedCar)
    : evaluatedExits;

  // Same station case
  if (isSameStation) {
    return (
      <div className="bg-[#FFFFFF] border border-[#E7E2D9] rounded-2xl p-5 text-center shadow-2xs">
        <div className="w-10 h-10 rounded-full bg-[#EAF3F9] text-[#006298] mx-auto flex items-center justify-center mb-2.5">
          <Info className="w-5 h-5" />
        </div>
        <h3 className="text-base font-bold text-[#1F1D1A] mb-1">Samma station ({from.name})</h3>
        <p className="text-xs text-[#78736B] mb-4">Här är alla uppgångar på stationen:</p>

        <div className="grid grid-cols-1 gap-2 text-left">
          {from.exits.map((exit) => (
            <ExitCard
              key={exit.id}
              exit={exit}
              carPosition={
                exit.position === 'up' ? 'front' : exit.position === 'down' ? 'back' : 'middle'
              }
              carPositionLabel={
                exit.position === 'up'
                  ? 'Norra / västra änden'
                  : exit.position === 'down'
                    ? 'Södra / östra änden'
                    : 'Mitten'
              }
            />
          ))}
        </div>
      </div>
    );
  }

  // Find the primary car recommendation for the destination
  const _primaryExit = to.exits[0];
  let _primaryCarLabel = 'FRAM, I MITTEN ELLER BAK';
  if (frontExits.length > 0 && backExits.length === 0) {
    _primaryCarLabel = 'STÅ FRAM';
  } else if (backExits.length > 0 && frontExits.length === 0) {
    _primaryCarLabel = 'STÅ BAK';
  } else if (middleExits.length > 0 && frontExits.length === 0 && backExits.length === 0) {
    _primaryCarLabel = 'STÅ I MITTEN';
  } else {
    _primaryCarLabel = 'SE UPPGÅNG NEDAN';
  }

  return (
    <div className="space-y-4">
      {/* Route Header with Favorite Star */}
      <div className="bg-[#FFFFFF] border border-[#E7E2D9] rounded-2xl p-4 shadow-2xs">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="font-bold text-sm sm:text-base text-[#1F1D1A] truncate">
              {from.name}
            </span>
            <ArrowRight className="w-4 h-4 text-[#A8A399] shrink-0" />
            <span className="font-bold text-sm sm:text-base text-[#1F1D1A] truncate">
              {to.name}
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleFavoriteRoute}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border shrink-0 ${
              isFavoriteRoute
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'bg-[#FAF8F5] border-[#E7E2D9] text-[#6B665F] hover:border-[#1F1D1A]'
            }`}
            title={isFavoriteRoute ? 'Ta bort favoritsträcka' : 'Spara som favoritsträcka'}
          >
            <Star
              className={`w-3.5 h-3.5 ${
                isFavoriteRoute ? 'text-amber-500 fill-amber-500' : 'text-[#8E8980]'
              }`}
            />
            <span className="hidden xs:inline">
              {isFavoriteRoute ? 'Sparad sträcka' : 'Spara sträcka'}
            </span>
          </button>
        </div>
      </div>

      {/* Transfer Information (If multi-leg) */}
      {!isDirect && legs.length >= 2 && (
        <div className="bg-[#FFFFFF] border border-[#E7E2D9] rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D97706] uppercase tracking-wider">
            <Shuffle className="w-3.5 h-3.5" />
            <span>Byte vid {legs[0].toStation.name}</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E7E2D9]">
              <div className="font-semibold text-[#1F1D1A] mb-1">
                Delsträcka 1: {legs[0].fromStation.name} ➔ {legs[0].toStation.name} (
                {legs[0].line.name})
              </div>
              <div className="text-[#138A36] font-bold">
                Rekommendation för bytet: Stå{' '}
                {legs[0].recommendedCarForTransfer === 'front'
                  ? 'FRAM'
                  : legs[0].recommendedCarForTransfer === 'back'
                    ? 'BAK'
                    : 'I MITTEN'}{' '}
                av tåget!
              </div>
              {legs[0].transferNote && (
                <div className="text-[11px] text-[#78736B] mt-0.5">{legs[0].transferNote}</div>
              )}
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E7E2D9]">
              <div className="font-semibold text-[#1F1D1A]">
                Delsträcka 2: {legs[1].fromStation.name} ➔ {legs[1].toStation.name} (
                {legs[1].line.name})
              </div>
              <div className="text-[11px] text-[#78736B] mt-0.5">
                Färdriktning: {legs[1].directionTitle}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Train Visualizer */}
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

      {/* Exits list for Destination */}
      <div className="bg-[#FFFFFF] border border-[#E7E2D9] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#F0ECE1]">
          <div>
            <h3 className="text-sm font-bold text-[#1F1D1A]">Uppgångar vid {to.name}</h3>
            <p className="text-[11px] text-[#78736B]">
              Välj din önskade uppgång nedan för att se var du ska stå
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAllExits(!showAllExits)}
            className="p-1 rounded-lg text-[#78736B] hover:text-[#1F1D1A] hover:bg-[#FAF8F5]"
          >
            {showAllExits ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Filter Pills for Car Position */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            type="button"
            onClick={() => setSelectedCar(null)}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              selectedCar === null
                ? 'bg-[#1F1D1A] text-white'
                : 'bg-[#FAF8F5] text-[#6B665F] hover:bg-[#EAE5DC]'
            }`}
          >
            Alla ({evaluatedExits.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCar('front')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
              selectedCar === 'front'
                ? 'bg-[#138A36] text-white'
                : 'bg-[#FAF8F5] text-[#6B665F] hover:bg-[#EAF5EE]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#138A36]" />
            Fram ({frontExits.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCar('middle')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
              selectedCar === 'middle'
                ? 'bg-[#006298] text-white'
                : 'bg-[#FAF8F5] text-[#6B665F] hover:bg-[#EAF3F9]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#006298]" />
            Mitten ({middleExits.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCar('back')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
              selectedCar === 'back'
                ? 'bg-[#D32F2F] text-white'
                : 'bg-[#FAF8F5] text-[#6B665F] hover:bg-[#FDF0F0]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F]" />
            Bak ({backExits.length})
          </button>
        </div>

        {showAllExits && (
          <div className="space-y-2 pt-1">
            {displayedExits.length > 0 ? (
              displayedExits.map(({ exit, carPosition, carPositionLabel }) => (
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
              ))
            ) : (
              <div className="text-center py-4 text-xs text-[#8E8980]">
                Inga uppgångar finns i denna sektion av tåget.
                <button
                  type="button"
                  onClick={() => setSelectedCar(null)}
                  className="block mx-auto mt-1 text-[#006298] font-semibold hover:underline"
                >
                  Visa alla uppgångar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
