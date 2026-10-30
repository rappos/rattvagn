/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Linjedefinitioner för Stockholms tunnelbana.
 * Alla linjer är modulärt definierade och lätta att utöka för framtida projekt.
 */

import type { MetroColor, MetroLineInfo } from '../types/metro';

export const METRO_LINES: Record<number, MetroLineInfo> = {
  // Gröna linjen (Trunk 1)
  17: {
    id: 17,
    name: 'Grön linje 17',
    color: 'green',
    colorHex: '#189747',
    bgClass: 'bg-emerald-600',
    textClass: 'text-emerald-700 dark:text-emerald-400',
    badgeBg:
      'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
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
    colorHex: '#189747',
    bgClass: 'bg-emerald-600',
    textClass: 'text-emerald-700 dark:text-emerald-400',
    badgeBg:
      'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
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
    colorHex: '#189747',
    bgClass: 'bg-emerald-600',
    textClass: 'text-emerald-700 dark:text-emerald-400',
    badgeBg:
      'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    terminals: {
      northWest: 'Hässelby strand',
      southEast: 'Hagsätra',
    },
    description: 'Hässelby strand – T-Centralen – Hagsätra',
  },

  // Röda linjen (Trunk 2)
  13: {
    id: 13,
    name: 'Röd linje 13',
    color: 'red',
    colorHex: '#D8232A',
    bgClass: 'bg-rose-600',
    textClass: 'text-rose-700 dark:text-rose-400',
    badgeBg:
      'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
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
    colorHex: '#D8232A',
    bgClass: 'bg-rose-600',
    textClass: 'text-rose-700 dark:text-rose-400',
    badgeBg:
      'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
    terminals: {
      northWest: 'Mörby centrum',
      southEast: 'Fruängen',
    },
    description: 'Mörby centrum – T-Centralen – Fruängen',
  },

  // Blå linjen (Trunk 3)
  10: {
    id: 10,
    name: 'Blå linje 10',
    color: 'blue',
    colorHex: '#007AC9',
    bgClass: 'bg-sky-600',
    textClass: 'text-sky-700 dark:text-sky-400',
    badgeBg:
      'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800',
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
    colorHex: '#007AC9',
    bgClass: 'bg-sky-600',
    textClass: 'text-sky-700 dark:text-sky-400',
    badgeBg:
      'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800',
    terminals: {
      northWest: 'Akalla (snart Barkarby)',
      southEast: 'Kungsträdgården (snart Nacka/Gullmarsplan)',
    },
    description: 'Akalla – Fridhemsplan – Kungsträdgården',
  },

  // Gula linjen (Framtida / under utbyggnad)
  25: {
    id: 25,
    name: 'Gul linje 25',
    color: 'yellow',
    colorHex: '#E8A900',
    bgClass: 'bg-amber-500',
    textClass: 'text-amber-700 dark:text-amber-400',
    badgeBg:
      'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
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
        bg: 'bg-[#138A36]',
        text: 'text-[#138A36]',
        border: 'border-[#138A36]',
        badge: 'bg-[#EAF5EE] text-[#138A36] border border-[#C8E7D3]',
        dot: 'bg-[#138A36]',
      };
    case 'red':
      return {
        bg: 'bg-[#D32F2F]',
        text: 'text-[#D32F2F]',
        border: 'border-[#D32F2F]',
        badge: 'bg-[#FDF0F0] text-[#D32F2F] border border-[#F8CCCC]',
        dot: 'bg-[#D32F2F]',
      };
    case 'blue':
      return {
        bg: 'bg-[#006298]',
        text: 'text-[#006298]',
        border: 'border-[#006298]',
        badge: 'bg-[#EAF3F9] text-[#006298] border border-[#C4DFEE]',
        dot: 'bg-[#006298]',
      };
    case 'yellow':
      return {
        bg: 'bg-[#D97706]',
        text: 'text-[#D97706]',
        border: 'border-[#D97706]',
        badge: 'bg-[#FEF7EA] text-[#D97706] border border-[#FBE3B5]',
        dot: 'bg-[#D97706]',
      };
  }
}
