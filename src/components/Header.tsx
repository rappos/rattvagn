/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Info, MapPin, Train, WifiOff } from 'lucide-react';
import type React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import type { User } from '../lib/firebase';
import { AuthButton } from './AuthButton';
import { PWAInstallButton } from './PWAInstallButton';

export type TabType = 'resor' | 'stationer' | 'om';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  user: User | null;
  authLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, user, authLoading }) => {
  const isOnline = useOnlineStatus();

  return (
    <header className="bg-[#FAF8F5] border-b border-[#E7E2D9] sticky top-0 z-40 transition-colors">
      <div className="max-w-xl mx-auto px-4 pt-3 pb-2 sm:py-3">
        {/* Top bar: Brand + Actions */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          {/* Logo & Name */}
          <div
            onClick={() => setActiveTab('resor')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            {/* Stockholm Metro 'T' symbol */}
            <div className="w-8 h-8 rounded-full bg-[#005A9C] text-white flex items-center justify-center font-black text-lg shadow-2xs group-hover:scale-105 transition-transform">
              T
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-[#1F1D1A] tracking-tight leading-none">
                Rätt Vagn
              </h1>
              <p className="text-[11px] text-[#78736B] leading-tight">Stockholms tunnelbana</p>
            </div>
          </div>

          {/* Right utilities: Offline status, PWA Install, Auth */}
          <div className="flex items-center gap-2">
            {!isOnline && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-medium"
                title="Nedkopplad – sparade data används"
              >
                <WifiOff className="w-3 h-3 text-amber-700" />
                <span className="hidden xs:inline">Offline</span>
              </span>
            )}

            <PWAInstallButton />
            <AuthButton user={user} loading={authLoading} />
          </div>
        </div>

        {/* Tab Navigation: Stationer | Resor | Om */}
        <nav className="flex items-center p-1 bg-[#EFECE6] rounded-xl border border-[#E5E0D8]">
          <button
            type="button"
            onClick={() => setActiveTab('resor')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'resor'
                ? 'bg-[#FFFFFF] text-[#1F1D1A] shadow-xs'
                : 'text-[#6B665F] hover:text-[#1F1D1A]'
            }`}
          >
            <Train className="w-3.5 h-3.5" />
            <span>Resor</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('stationer')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'stationer'
                ? 'bg-[#FFFFFF] text-[#1F1D1A] shadow-xs'
                : 'text-[#6B665F] hover:text-[#1F1D1A]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Stationer</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('om')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'om'
                ? 'bg-[#FFFFFF] text-[#1F1D1A] shadow-xs'
                : 'text-[#6B665F] hover:text-[#1F1D1A]'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Om</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
