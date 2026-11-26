/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Skarpa geometriska skyltikoner för Stockholms tunnelbana.
 * Alla linjer använder räta vinklar (strokeLinecap="square", strokeLinejoin="miter").
 */

import type React from 'react';

interface IconProps {
  className?: string;
  filled?: boolean;
}

const baseProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.25,
  strokeLinecap: 'square' as const,
  strokeLinejoin: 'miter' as const,
  'aria-hidden': true as const,
};

export const MetroArrowRight: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <path d="M3 12H19" />
    <path d="M13 6L19 12L13 18" />
  </svg>
);

export const MetroArrowUpRight: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <path d="M6 18L18 6" />
    <path d="M9 6H18V15" />
  </svg>
);

export const MetroSwapIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <path d="M7 4V19" />
    <path d="M3 8L7 4L11 8" />
    <path d="M17 20V5" />
    <path d="M13 16L17 20L21 16" />
  </svg>
);

export const MetroBookmarkIcon: React.FC<IconProps> = ({
  className = 'w-4 h-4',
  filled = false,
}) => (
  <svg
    {...baseProps}
    fill={filled ? 'currentColor' : 'none'}
    className={className}
  >
    <path d="M5 3H19V21L12 16L5 21V3Z" />
  </svg>
);

export const MetroCloseIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <path d="M5 5L19 19" />
    <path d="M19 5L5 19" />
  </svg>
);

export const MetroCheckIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <path d="M4 12.5L9.5 18L20 6" />
  </svg>
);

export const MetroChevronDown: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <path d="M5 9L12 16L19 9" />
  </svg>
);

export const MetroChevronUp: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <path d="M5 15L12 8L19 15" />
  </svg>
);

export const MetroSearchIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <rect x="3" y="3" width="13" height="13" />
    <path d="M16 16L21 21" />
  </svg>
);

export const MetroCrosshairIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <rect x="6" y="6" width="12" height="12" />
    <path d="M12 2V6M12 18V22M2 12H6M18 12H22" />
    <rect x="10.5" y="10.5" width="3" height="3" fill="currentColor" stroke="none" />
  </svg>
);

export const MetroTransferIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <path d="M3 8H19" />
    <path d="M15 4L19 8L15 12" />
    <path d="M21 16H5" />
    <path d="M9 12L5 16L9 20" />
  </svg>
);

export const MetroElevatorIcon: React.FC<IconProps> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg {...baseProps} className={className}>
    <rect x="3" y="3" width="18" height="18" />
    <path d="M9 15V9M9 9L6.5 11.5M9 9L11.5 11.5" />
    <path d="M15 9V15M15 15L12.5 12.5M15 15L17.5 12.5" />
  </svg>
);

export const MetroStairsIcon: React.FC<IconProps> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg {...baseProps} className={className}>
    <path d="M3 20H8V15H13V10H18V5H21" />
  </svg>
);

export const MetroTrainIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <rect x="4" y="3" width="16" height="14" />
    <path d="M4 11H20" />
    <path d="M8 21L10 17M16 21L14 17" />
    <rect x="7" y="13" width="2" height="2" fill="currentColor" stroke="none" />
    <rect x="15" y="13" width="2" height="2" fill="currentColor" stroke="none" />
  </svg>
);

export const MetroGridIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

export const MetroInfoIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <rect x="3" y="3" width="18" height="18" />
    <path d="M12 11V17" />
    <rect x="10.75" y="6.75" width="2.5" height="2.5" fill="currentColor" stroke="none" />
  </svg>
);

export const MetroSunIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <rect x="8" y="8" width="8" height="8" />
    <path d="M12 2V5M12 19V22M2 12H5M19 12H22M4.9 4.9L7 7M17 17L19.1 19.1M19.1 4.9L17 7M7 17L4.9 19.1" />
  </svg>
);

export const MetroMoonIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <path d="M19 14.5A7.5 7.5 0 0 1 9.5 5H8V19H19V14.5Z" />
  </svg>
);

export const MetroDownloadIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <path d="M12 3V15" />
    <path d="M7 10L12 15L17 10" />
    <path d="M4 19H20" />
  </svg>
);

export const MetroShareIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <path d="M12 15V3" />
    <path d="M7 8L12 3L17 8" />
    <path d="M4 13V20H20V13" />
  </svg>
);

export const MetroUserIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <rect x="8" y="3" width="8" height="8" />
    <path d="M4 21V15H20V21" />
  </svg>
);

export const MetroLogoutIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <path d="M10 4H4V20H10" />
    <path d="M10 12H20" />
    <path d="M16 8L20 12L16 16" />
  </svg>
);

export const MetroFilterIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <path d="M3 6H21M6 12H18M9 18H15" />
  </svg>
);

export const MetroAlertIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <path d="M12 3L22 20H2L12 3Z" />
    <path d="M12 10V14" />
    <rect x="11" y="16" width="2" height="2" fill="currentColor" stroke="none" />
  </svg>
);

export const MetroCopyIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <rect x="9" y="9" width="12" height="12" />
    <path d="M15 9V3H3V15H9" />
  </svg>
);

export const MetroMailIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <rect x="2" y="4" width="20" height="16" />
    <path d="M2 6L12 13L22 6" />
  </svg>
);

export const MetroSpinnerIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={`${className} animate-spin`}>
    <path d="M12 3H21V12" />
    <path d="M12 21H3V12" opacity="0.35" />
  </svg>
);

export const MetroHouseIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <path d="M3 11L12 3L21 11" />
    <path d="M5 9.5V20H19V9.5" />
    <path d="M10 20V14H14V20" />
  </svg>
);

export const MetroTrashIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg {...baseProps} className={className}>
    <path d="M4 6H20" />
    <path d="M9 6V3H15V6" />
    <path d="M6 6L7 20H17L18 6" />
    <path d="M10 10V16M14 10V16" />
  </svg>
);

