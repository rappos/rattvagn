/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import type { CarPosition, StationExit } from '../types/metro';
import { MetroArrowUpRight, MetroElevatorIcon, MetroStairsIcon } from './MetroIcons';

interface ExitCardProps {
  exit: StationExit;
  carPosition: CarPosition;
  carPositionLabel: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const ExitCard: React.FC<ExitCardProps> = ({
  exit,
  carPosition,
  carPositionLabel,
  isSelected = false,
  onSelect,
}) => {
  const getPositionTokens = () => {
    switch (carPosition) {
      case 'front':
        return {
          stripe: 'border-l-[#00A859]',
          badgeBg: 'bg-[#00A859] text-[#FFFFFF]',
          label: 'STÅ FRAM',
        };
      case 'middle':
        return {
          stripe: 'border-l-[#008DD0]',
          badgeBg: 'bg-[#008DD0] text-[#FFFFFF]',
          label: 'STÅ I MITTEN',
        };
      case 'back':
        return {
          stripe: 'border-l-[#E53935]',
          badgeBg: 'bg-[#E53935] text-[#FFFFFF]',
          label: 'STÅ BAK',
        };
    }
  };

  const tokens = getPositionTokens();

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`metro-btn text-left w-full border border-[var(--grid-divider)] border-l-[5px] ${tokens.stripe} p-3.5 block transition-colors ${
        isSelected
          ? 'bg-[#008DD0]/10 dark:bg-[#008DD0]/20 border-y-[#008DD0] border-r-[#008DD0]'
          : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-canvas)]'
      }`}
    >
      {/* Top Metadata Strip: Position Block + Elevator/Stairs */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span
          className={`inline-flex items-center px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.08em] shrink-0 ${tokens.badgeBg}`}
        >
          {tokens.label}
        </span>

        {/* Accessibility Badge: Hötorget Turquoise (#00C2CB) with dark ink #16181D */}
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

      {/* Main Exit Name */}
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-display text-sm sm:text-base font-bold text-[var(--ink-primary)] leading-snug">
          {exit.name}
        </h4>
        <MetroArrowUpRight
          className={`w-4 h-4 shrink-0 mt-0.5 ${
            isSelected ? 'text-[#008DD0]' : 'text-[var(--ink-secondary)]'
          }`}
        />
      </div>

      {/* Platform End Location */}
      <div className="mt-1.5 flex items-center gap-2 text-[11px] font-medium text-[var(--ink-secondary)]">
        <span className="w-1.5 h-1.5 bg-[var(--ink-secondary)] shrink-0" />
        <span className="truncate">
          {exit.position === 'up'
            ? 'Norra / västra perrongänden'
            : exit.position === 'down'
              ? 'Södra / östra perrongänden'
              : 'Mitten av perrongen'}
        </span>
      </div>
    </button>
  );
};
