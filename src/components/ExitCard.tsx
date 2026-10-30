/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUpRight, Footprints, MapPin } from 'lucide-react';
import type React from 'react';
import type { CarPosition, StationExit } from '../types/metro';

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
  const getBadgeStyle = () => {
    switch (carPosition) {
      case 'front':
        return {
          pill: 'bg-[#EAF5EE] text-[#138A36] border-[#C8E7D3]',
          dot: 'bg-[#138A36]',
          label: 'STÅ FRAM',
        };
      case 'middle':
        return {
          pill: 'bg-[#EAF3F9] text-[#006298] border-[#C4DFEE]',
          dot: 'bg-[#006298]',
          label: 'STÅ I MITTEN',
        };
      case 'back':
        return {
          pill: 'bg-[#FDF0F0] text-[#D32F2F] border-[#F8CCCC]',
          dot: 'bg-[#D32F2F]',
          label: 'STÅ BAK',
        };
    }
  };

  const badge = getBadgeStyle();

  return (
    <div
      onClick={onSelect}
      className={`text-left w-full rounded-xl border transition-all p-3.5 cursor-pointer relative bg-[#FFFFFF] ${
        isSelected
          ? 'border-[#006298] ring-1 ring-[#006298] shadow-xs'
          : 'border-[#E7E2D9] hover:border-[#B5AEA0]'
      }`}
    >
      {/* Top row: Recommendation badge & Elevator */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-bold border tracking-wide ${badge.pill}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
          <span>{badge.label}</span>
          <span className="font-normal opacity-85 text-[10px] hidden sm:inline">
            ({carPositionLabel.toLowerCase()})
          </span>
        </div>

        {/* Elevator info */}
        <div className="text-[11px] text-[#6B665F]">
          {exit.hasElevator ? (
            <span className="inline-flex items-center gap-1 text-[#2E7D32] bg-[#EAF5EE] px-2 py-0.5 rounded text-[10px] font-semibold border border-[#C8E7D3]">
              🛗 Hiss
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[#8E8980] bg-[#FAF8F5] px-1.5 py-0.5 rounded text-[10px] border border-[#E7E2D9]">
              <Footprints className="w-2.5 h-2.5" /> Trappor
            </span>
          )}
        </div>
      </div>

      {/* Main Exit Name */}
      <div className="mb-1.5">
        <h4 className="text-sm sm:text-base font-bold text-[#1F1D1A] flex items-center justify-between">
          <span>{exit.name}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#A8A399] shrink-0" />
        </h4>
      </div>

      {/* Subtitle / Platform position */}
      <div className="flex items-center gap-1 text-[11px] text-[#78736B]">
        <MapPin className="w-3 h-3 text-[#A8A399] shrink-0" />
        <span className="truncate">
          {exit.position === 'up'
            ? 'Norra / västra perrongänden'
            : exit.position === 'down'
              ? 'Södra / östra perrongänden'
              : 'Mitten av perrongen'}
        </span>
      </div>
    </div>
  );
};
