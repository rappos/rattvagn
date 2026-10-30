/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Download, Share, X } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';

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
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1F1D1A] text-[#FAF8F5] text-xs font-semibold hover:bg-black active:scale-95 transition-all shadow-xs"
        title="Installera som app på din mobil"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Installera app</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D9D3C7] bg-[#FAF8F5] text-[#3D3A35] text-xs font-medium hover:bg-white active:scale-95 transition-all"
        >
          <Download className="w-3.5 h-3.5 text-[#006298]" />
          <span>Spara app</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fadeIn">
            <div className="w-full max-w-sm rounded-2xl bg-[#FFFFFF] border border-[#E7E2D9] p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#F0ECE1]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#006298] text-white font-bold flex items-center justify-center text-xs">
                    T
                  </div>
                  <h3 className="text-sm font-bold text-[#1F1D1A]">
                    Installera Rätt Vagn på iPhone
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-[#524E48] leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#F0ECE1] font-bold text-[#1F1D1A] flex items-center justify-center shrink-0 text-[11px]">
                    1
                  </span>
                  <p>
                    Tryck på <strong>Dela-ikonen</strong>{' '}
                    <Share className="inline w-3.5 h-3.5 mx-0.5 text-[#006298]" /> i Safaris nedre
                    verktygsfält.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#F0ECE1] font-bold text-[#1F1D1A] flex items-center justify-center shrink-0 text-[11px]">
                    2
                  </span>
                  <p>
                    Scrolla ned och välj <strong>Lägg till på hemskärmen</strong>.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#F0ECE1] font-bold text-[#1F1D1A] flex items-center justify-center shrink-0 text-[11px]">
                    3
                  </span>
                  <p>
                    Tryck på <strong>Lägg till</strong> uppe till höger. Klart!
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-xl bg-[#1F1D1A] text-white font-semibold text-xs hover:bg-black transition-colors"
              >
                Uppfattat
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
