/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { MetroCloseIcon, MetroDownloadIcon, MetroShareIcon } from './MetroIcons';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    setIsInstalling(true);
    try {
      await install();
    } finally {
      setIsInstalling(false);
    }
  };

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={handleInstallClick}
        disabled={isInstalling}
        className="metro-btn inline-flex items-center gap-1.5 h-9 px-3 bg-[#00A859] text-[#FFFFFF] text-xs font-bold uppercase tracking-[0.06em] hover:bg-[#FFFFFF] hover:text-[#16181D] disabled:opacity-60"
        title="Installera som app på din mobil"
      >
        <MetroDownloadIcon className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Installera</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="metro-btn inline-flex items-center gap-1.5 h-9 px-3 bg-[#00A859] text-[#FFFFFF] text-xs font-bold uppercase tracking-[0.06em] hover:bg-[#FFFFFF] hover:text-[#16181D]"
          title="Spara Rätt Vagn som app på iPhone"
        >
          <MetroDownloadIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Spara app</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#16181D]/80 p-3">
            <div className="w-full max-w-sm bg-[var(--bg-surface)] border-2 border-[var(--ink-primary)] border-t-[6px] border-t-[#008DD0] text-[var(--ink-primary)]">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--grid-divider)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-[#008DD0] text-[#FFFFFF] font-display font-bold flex items-center justify-center text-sm">
                    T
                  </div>
                  <h3 className="text-sm font-bold text-[var(--ink-primary)] uppercase tracking-[0.02em]">
                    Installera på iPhone
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label="Stäng"
                  className="metro-btn w-9 h-9 flex items-center justify-center border border-[var(--grid-divider)] text-[var(--ink-secondary)] hover:bg-[#16181D] hover:text-[#FFFFFF] dark:hover:bg-[#00A859] dark:hover:text-[#FFFFFF]"
                >
                  <MetroCloseIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="divide-y divide-[var(--grid-divider)] text-xs text-[var(--ink-primary)]">
                <div className="flex items-start gap-3 p-4">
                  <span className="w-6 h-6 bg-[#008DD0] text-[#FFFFFF] font-mono-tabular font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </span>
                  <p className="leading-relaxed">
                    Tryck på <strong>Dela-ikonen</strong>{' '}
                    <MetroShareIcon className="inline w-3.5 h-3.5 mx-0.5 text-[#008DD0]" /> i Safaris
                    nedre verktygsfält.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-4">
                  <span className="w-6 h-6 bg-[#008DD0] text-[#FFFFFF] font-mono-tabular font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </span>
                  <p className="leading-relaxed">
                    Scrolla ned och välj <strong>Lägg till på hemskärmen</strong>.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-4">
                  <span className="w-6 h-6 bg-[#008DD0] text-[#FFFFFF] font-mono-tabular font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </span>
                  <p className="leading-relaxed">
                    Tryck på <strong>Lägg till</strong> uppe till höger. Klart!
                  </p>
                </div>
              </div>

              <div className="p-3 border-t border-[var(--grid-divider)]">
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  className="metro-btn w-full py-2.5 px-4 bg-[#008DD0] text-[#FFFFFF] hover:bg-[#00A859] hover:text-[#FFFFFF] font-bold text-xs uppercase tracking-[0.08em]"
                >
                  Uppfattat
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
