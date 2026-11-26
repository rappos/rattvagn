/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import { getColorClasses } from '../data/lines';
import type { CarPosition, MetroColor } from '../types/metro';
import { MetroArrowRight, MetroCheckIcon } from './MetroIcons';

interface TrainVisualizerProps {
  directionTitle: string;
  color: MetroColor;
  activeCar?: CarPosition | null;
  onSelectCar?: (car: CarPosition) => void;
  frontExitsCount: number;
  middleExitsCount: number;
  backExitsCount: number;
}

export const TrainVisualizer: React.FC<TrainVisualizerProps> = ({
  directionTitle,
  color,
  activeCar,
  onSelectCar,
  frontExitsCount,
  middleExitsCount,
  backExitsCount,
}) => {
  const colorStyles = getColorClasses(color);

  return (
    <section
      aria-label="Tågdiagram och färdriktning"
      className={`w-full bg-[var(--bg-surface)] border border-[var(--grid-divider)] border-t-[5px] ${colorStyles.border}`}
    >
      {/* Platform Direction Header Board */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-[var(--grid-divider)] bg-[var(--bg-canvas)]">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 shrink-0 ${colorStyles.bg}`} />
          <span className="signage-label text-[var(--ink-secondary)]">Färdriktning</span>
        </div>

        <div className="inline-flex items-center gap-2 font-display text-sm sm:text-base font-bold text-[var(--ink-primary)]">
          <span>{directionTitle}</span>
          <span
            className={`inline-flex items-center justify-center w-6 h-6 ${colorStyles.bg} ${colorStyles.fgOnBg}`}
          >
            <MetroArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Simplified 3-Car Block Diagram */}
      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-3 gap-1.5">
          <CarButton
            label="Längst bak"
            exitsCount={backExitsCount}
            isSelected={activeCar === 'back'}
            onClick={() => onSelectCar?.('back')}
            lineBg={colorStyles.bg}
          />

          <CarButton
            label="I mitten"
            exitsCount={middleExitsCount}
            isSelected={activeCar === 'middle'}
            onClick={() => onSelectCar?.('middle')}
            lineBg={colorStyles.bg}
          />

          <CarButton
            label="Längst fram"
            exitsCount={frontExitsCount}
            isSelected={activeCar === 'front'}
            onClick={() => onSelectCar?.('front')}
            lineBg={colorStyles.bg}
          />
        </div>
      </div>
    </section>
  );
};

interface CarButtonProps {
  label: string;
  exitsCount: number;
  isSelected: boolean;
  onClick: () => void;
  lineBg: string;
}

const CarButton: React.FC<CarButtonProps> = ({
  label,
  exitsCount,
  isSelected,
  onClick,
  lineBg,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={`metro-btn relative text-left p-2.5 sm:p-3.5 border transition-colors min-h-[96px] flex flex-col justify-between ${
        isSelected
          ? 'bg-[#16181D] text-[#FFFFFF] border-[#16181D] dark:bg-[#F7F8FA] dark:text-[#16181D] dark:border-[#F7F8FA]'
          : 'bg-[var(--bg-canvas)] text-[var(--ink-primary)] border-[var(--grid-divider)] hover:border-[#008DD0] hover:bg-[var(--bg-surface)]'
      }`}
    >
      <div>
        {/* Single clean line-color bar */}
        <div className={`h-1.5 w-full mb-3 ${lineBg}`} />

        <div className="flex items-center justify-between gap-1">
          <span className="font-display text-xs sm:text-sm font-bold leading-tight">{label}</span>
          {isSelected && (
            <span className="w-4 h-4 bg-[#00A859] text-[#FFFFFF] inline-flex items-center justify-center shrink-0">
              <MetroCheckIcon className="w-3 h-3" />
            </span>
          )}
        </div>
      </div>

      {/* Exit Count */}
      <div className="mt-3 pt-2 border-t border-current/15">
        <span
          className={`inline-block font-mono-tabular text-[11px] font-bold px-1.5 py-0.5 ${
            isSelected
              ? 'bg-[#008DD0] text-[#FFFFFF]'
              : exitsCount > 0
                ? 'bg-[#16181D] text-[#FFFFFF] dark:bg-[#F7F8FA] dark:text-[#16181D]'
                : 'text-[var(--ink-secondary)]'
          }`}
        >
          {exitsCount} {exitsCount === 1 ? 'uppgång' : 'uppgångar'}
        </span>
      </div>
    </button>
  );
};
