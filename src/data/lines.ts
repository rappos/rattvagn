/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Linjedefinitioner för Stockholms tunnelbana.
 * Färger följer exakt Tunnelbanans designsystem.
 */

import type { MetroColor, MetroLineInfo } from '../types/metro';

export const METRO_LINES: Record<number, MetroLineInfo> = {
  // Gröna linjen (Hässelby Emerald #00A859)
  17: {
    id: 17,
    name: 'Grön linje 17',
    color: 'green',
    colorHex: '#00A859',
    bgClass: 'bg-[#00A859]',
    textClass: 'text-[#00A859]',
    badgeBg: 'bg-[#00A859] text-[#FFFFFF] border-[#00A859]',
    terminals: {
      northWest: 'Åkeshov / Hässelby strand',
      southEast: 'Skarpnäck',
    },
    description: 'Åkeshov/Hässelby strand – T-Centralen – Skarpnäck',
  },
  18: {
    id: 18,
    name: 'Grön linje 18',
    color: 'green',
    colorHex: '#00A859',
    bgClass: 'bg-[#00A859]',
    textClass: 'text-[#00A859]',
    badgeBg: 'bg-[#00A859] text-[#FFFFFF] border-[#00A859]',
    terminals: {
      northWest: 'Hässelby strand',
      southEast: 'Farsta strand',
    },
    description: 'Hässelby strand – T-Centralen – Farsta strand',
  },
  19: {
    id: 19,
    name: 'Grön linje 19',
    color: 'green',
    colorHex: '#00A859',
    bgClass: 'bg-[#00A859]',
    textClass: 'text-[#00A859]',
    badgeBg: 'bg-[#00A859] text-[#FFFFFF] border-[#00A859]',
    terminals: {
      northWest: 'Hässelby strand',
      southEast: 'Hagsätra',
    },
    description: 'Hässelby strand – T-Centralen – Hagsätra',
  },

  // Röda linjen (Solna Crimson #E53935)
  13: {
    id: 13,
    name: 'Röd linje 13',
    color: 'red',
    colorHex: '#E53935',
    bgClass: 'bg-[#E53935]',
    textClass: 'text-[#E53935]',
    badgeBg: 'bg-[#E53935] text-[#FFFFFF] border-[#E53935]',
    terminals: {
      northWest: 'Ropsten',
      southEast: 'Norsborg',
    },
    description: 'Ropsten – T-Centralen – Norsborg',
  },
  14: {
    id: 14,
    name: 'Röd linje 14',
    color: 'red',
    colorHex: '#E53935',
    bgClass: 'bg-[#E53935]',
    textClass: 'text-[#E53935]',
    badgeBg: 'bg-[#E53935] text-[#FFFFFF] border-[#E53935]',
    terminals: {
      northWest: 'Mörby centrum',
      southEast: 'Fruängen',
    },
    description: 'Mörby centrum – T-Centralen – Fruängen',
  },

  // Blå linjen (T-Centralen Blue #008DD0)
  10: {
    id: 10,
    name: 'Blå linje 10',
    color: 'blue',
    colorHex: '#008DD0',
    bgClass: 'bg-[#008DD0]',
    textClass: 'text-[#008DD0]',
    badgeBg: 'bg-[#008DD0] text-[#FFFFFF] border-[#008DD0]',
    terminals: {
      northWest: 'Hjulsta',
      southEast: 'Kungsträdgården',
    },
    description: 'Hjulsta – Fridhemsplan – Kungsträdgården',
  },
  11: {
    id: 11,
    name: 'Blå linje 11',
    color: 'blue',
    colorHex: '#008DD0',
    bgClass: 'bg-[#008DD0]',
    textClass: 'text-[#008DD0]',
    badgeBg: 'bg-[#008DD0] text-[#FFFFFF] border-[#008DD0]',
    terminals: {
      northWest: 'Akalla (snart Barkarby)',
      southEast: 'Kungsträdgården (snart Nacka/Gullmarsplan)',
    },
    description: 'Akalla – Fridhemsplan – Kungsträdgården',
  },

  // Gula linjen (Arenastaden Sun #FFD400 — alltid mörk text #16181D)
  25: {
    id: 25,
    name: 'Gul linje 25',
    color: 'yellow',
    colorHex: '#FFD400',
    bgClass: 'bg-[#FFD400]',
    textClass: 'text-[#16181D] dark:text-[#FFD400]',
    badgeBg: 'bg-[#FFD400] text-[#16181D] border-[#FFD400]',
    terminals: {
      northWest: 'Arenastaden',
      southEast: 'Odenplan (senare Älvsjö)',
    },
    description: 'Arenastaden – Hagastaden – Odenplan (under utbyggnad)',
  },
};

export function getColorClasses(color: MetroColor) {
  switch (color) {
    case 'green':
      return {
        hex: '#00A859',
        bg: 'bg-[#00A859]',
        fgOnBg: 'text-[#FFFFFF]',
        text: 'text-[#00A859]',
        border: 'border-[#00A859]',
        borderLeft: 'border-l-[#00A859]',
        badge: 'bg-[#00A859] text-[#FFFFFF]',
        dot: 'bg-[#00A859]',
      };
    case 'red':
      return {
        hex: '#E53935',
        bg: 'bg-[#E53935]',
        fgOnBg: 'text-[#FFFFFF]',
        text: 'text-[#E53935]',
        border: 'border-[#E53935]',
        borderLeft: 'border-l-[#E53935]',
        badge: 'bg-[#E53935] text-[#FFFFFF]',
        dot: 'bg-[#E53935]',
      };
    case 'blue':
      return {
        hex: '#008DD0',
        bg: 'bg-[#008DD0]',
        fgOnBg: 'text-[#FFFFFF]',
        text: 'text-[#008DD0]',
        border: 'border-[#008DD0]',
        borderLeft: 'border-l-[#008DD0]',
        badge: 'bg-[#008DD0] text-[#FFFFFF]',
        dot: 'bg-[#008DD0]',
      };
    case 'yellow':
      return {
        hex: '#FFD400',
        bg: 'bg-[#FFD400]',
        fgOnBg: 'text-[#16181D]',
        text: 'text-[#16181D] dark:text-[#FFD400]',
        border: 'border-[#FFD400]',
        borderLeft: 'border-l-[#FFD400]',
        badge: 'bg-[#FFD400] text-[#16181D]',
        dot: 'bg-[#FFD400]',
      };
  }
}

/**
 * Returnerar den primära färgen för en station baserat på dess linjenummer.
 */
export function getStationPrimaryColor(lines: number[]): MetroColor {
  if (lines.length === 0) return 'blue';
  const first = METRO_LINES[lines[0]];
  return first ? first.color : 'blue';
}
