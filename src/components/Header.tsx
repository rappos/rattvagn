/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import type { ThemeMode } from '../hooks/useTheme';
import type { User } from '../lib/firebase';
import { AuthButton } from './AuthButton';
import {
  MetroHouseIcon,
  MetroInfoIcon,
  MetroMoonIcon,
  MetroSunIcon,
  MetroTrainIcon,
} from './MetroIcons';
import { PWAInstallButton } from './PWAInstallButton';

export type TabType = 'resor' | 'stationer' | 'om';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  user: User | null;
  authLoading: boolean;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  user,
  authLoading,
  theme,
  onToggleTheme,
}) => {
  const isOnline = useOnlineStatus();

  return (
    <header className="sticky top-0 z-40 bg-[#008DD0] dark:bg-[#16181D] text-[#FFFFFF] border-b border-[#16181D]/20 dark:border-[#2E3340]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        {/* Compact Platform Signboard Row */}
        <div className="flex items-center justify-between gap-2 h-13 sm:h-14">
          {/* Brand Anchor + Desktop Nav */}
          <div className="flex items-center gap-6 min-w-0">
            <button
              type="button"
              onClick={() => setActiveTab('resor')}
              className="flex items-center gap-2.5 text-left group shrink-0"
            >
              {/* Razor-sharp Stockholm Metro T square mark */}
              <div className="w-8 h-8 bg-[#FFFFFF] dark:bg-[#008DD0] text-[#008DD0] dark:text-[#FFFFFF] flex items-center justify-center font-display font-bold text-xl leading-none shrink-0 group-hover:bg-[#00A859] group-hover:text-[#FFFFFF]">
                T
              </div>
              <span className="font-display text-base sm:text-lg font-bold tracking-[-0.02em] text-[#FFFFFF] leading-none">
                RÄTT VAGN
              </span>
            </button>

            {/* Desktop Inline Navigation Tabs */}
            <nav
              aria-label="Huvudmeny"
              className="hidden md:flex items-stretch h-14 border-l border-[#FFFFFF]/20 dark:border-[#2E3340]"
            >
              {(
                [
                  { id: 'resor', label: 'Resor', Icon: MetroTrainIcon },
                  { id: 'stationer', label: 'Stationer', Icon: MetroHouseIcon },
                  { id: 'om', label: 'Om', Icon: MetroInfoIcon },
                ] as const
              ).map(({ id, label, Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className={`metro-btn relative px-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] border-r border-[#FFFFFF]/20 dark:border-[#2E3340] ${
                      isActive
                        ? 'bg-[#16181D] dark:bg-[#1F222A] text-[#FFFFFF]'
                        : 'text-[#FFFFFF]/85 hover:bg-[#16181D]/25 dark:hover:bg-[#1F222A] hover:text-[#FFFFFF]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#00A859]" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Utilities: Offline Block, Theme Switch, PWA Install, Auth */}
          <div className="flex items-center gap-1.5 shrink-0">
            {!isOnline && (
              <span
                className="inline-flex items-center gap-1.5 h-9 px-2.5 bg-[#E53935] text-[#FFFFFF] text-[11px] font-bold uppercase tracking-[0.06em]"
                title="Nedkopplad – sparade stationsdata används"
              >
                <span className="w-2 h-2 bg-[#FFFFFF]" />
                <span className="hidden xs:inline">Offline</span>
              </span>
            )}

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Byt till ljust läge' : 'Byt till nattågsläge'}
              title={theme === 'dark' ? 'Dagsläge' : 'Nattåg (mörkt läge)'}
              className="metro-btn w-9 h-9 flex items-center justify-center border border-[#FFFFFF]/35 bg-[#16181D]/20 dark:bg-[#1F222A] text-[#FFFFFF] hover:bg-[#00A859] hover:text-[#FFFFFF] hover:border-[#00A859]"
            >
              {theme === 'dark' ? (
                <MetroSunIcon className="w-4 h-4" />
              ) : (
                <MetroMoonIcon className="w-4 h-4" />
              )}
            </button>

            <PWAInstallButton />
            <AuthButton user={user} loading={authLoading} />
          </div>
        </div>
      </div>

      {/* Mobile Full-Bleed Signboard Tab Strip */}
      <nav
        aria-label="Mobilmeny"
        className="md:hidden grid grid-cols-3 border-t border-[#FFFFFF]/25 dark:border-[#2E3340] bg-[#16181D]"
      >
        {(
          [
            { id: 'resor', label: 'Resor', Icon: MetroTrainIcon },
            { id: 'stationer', label: 'Stationer', Icon: MetroHouseIcon },
            { id: 'om', label: 'Om', Icon: MetroInfoIcon },
          ] as const
        ).map(({ id, label, Icon }, idx) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`metro-btn relative h-11 px-2 flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] ${
                idx < 2 ? 'border-r border-[#2E3340]' : ''
              } ${
                isActive
                  ? 'bg-[#1F222A] text-[#FFFFFF]'
                  : 'bg-[#16181D] text-[#9BA3B4] hover:text-[#FFFFFF]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
              {isActive && <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#00A859]" />}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
