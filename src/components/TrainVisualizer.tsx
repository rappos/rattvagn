/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Check } from 'lucide-react';
import type React from 'react';
import { getColorClasses } from '../data/lines';
import type { CarPosition, MetroColor } from '../types/metro';

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
    <div className="w-full bg-[#FFFFFF] border border-[#E7E2D9] rounded-2xl p-4 shadow-2xs">
      {/* Direction Header */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[#F0ECE1]">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${colorStyles.bg}`} />
          <span className="text-[11px] font-bold text-[#6B665F] uppercase tracking-wider">
            Färdriktning
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1F1D1A]">
          <span>{directionTitle}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#006298]" />
        </div>
      </div>

      {/* 3 Flat Minimalist Train Cars */}
      <div className="grid grid-cols-3 gap-2">
        {/* CAR 1: BAK */}
        <CarButton
          label="Längst bak"
          subLabel="Bakre änden"
          exitsCount={backExitsCount}
          isSelected={activeCar === 'back'}
          onClick={() => onSelectCar?.('back')}
          lineBg={colorStyles.bg}
          isNose={false}
        />

        {/* CAR 2: MITTEN */}
        <CarButton
          label="I mitten"
          subLabel="Mittenvagn"
          exitsCount={middleExitsCount}
          isSelected={activeCar === 'middle'}
          onClick={() => onSelectCar?.('middle')}
          lineBg={colorStyles.bg}
          isNose={false}
        />

        {/* CAR 3: FRAM */}
        <CarButton
          label="Längst fram"
          subLabel="Första vagnen"
          exitsCount={frontExitsCount}
          isSelected={activeCar === 'front'}
          onClick={() => onSelectCar?.('front')}
          lineBg={colorStyles.bg}
          isNose={true}
        />
      </div>

      {/* Direction Indicator */}
      <div className="mt-3 pt-2.5 border-t border-[#F0ECE1] flex items-center justify-between text-[11px] text-[#78736B]">
        <span>Bakänden av tåget</span>
        <div className="flex items-center gap-1 font-semibold text-[#1F1D1A]">
          <span>FÄRDRIKTNING</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#006298]" />
        </div>
        <span>Förarhytt (Fram)</span>
      </div>
    </div>
  );
};

interface CarButtonProps {
  label: string;
  subLabel: string;
  exitsCount: number;
  isSelected: boolean;
  onClick: () => void;
  lineBg: string;
  isNose: boolean;
}

const CarButton: React.FC<CarButtonProps> = ({
  label,
  subLabel,
  exitsCount,
  isSelected,
  onClick,
  lineBg,
  isNose,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-xl border text-left p-2.5 sm:p-3 transition-all ${
        isSelected
          ? 'bg-[#F2F7FA] border-[#006298] ring-1 ring-[#006298]'
          : 'bg-[#FAF8F5] border-[#E7E2D9] hover:bg-white hover:border-[#B5AEA0]'
      } ${isNose ? 'rounded-r-2xl' : ''}`}
    >
      {/* Top line-color stripe */}
      <div className={`h-1 w-full rounded-full mb-2 ${lineBg}`} />

      <div className="flex items-center justify-between gap-1">
        <span className="text-xs sm:text-sm font-bold text-[#1F1D1A]">{label}</span>
        {isSelected && <Check className="w-3.5 h-3.5 text-[#006298]" />}
      </div>

      <div className="text-[10px] text-[#78736B] mt-0.5">{subLabel}</div>

      <div className="mt-2">
        <span
          className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded ${
            exitsCount > 0
              ? isSelected
                ? 'bg-[#006298] text-white'
                : 'bg-[#EAE5DC] text-[#3D3A35]'
              : 'text-[#A8A399]'
          }`}
        >
          {exitsCount} {exitsCount === 1 ? 'uppgång' : 'uppgångar'}
        </span>
      </div>
    </button>
  );
};
