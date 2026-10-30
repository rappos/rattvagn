/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExternalLink, Heart, Smartphone } from 'lucide-react';
import type React from 'react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-4 max-w-xl mx-auto">
      {/* Introduction Card */}
      <div className="bg-[#FFFFFF] border border-[#E7E2D9] rounded-2xl p-5 shadow-2xs space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#006298] text-white flex items-center justify-center font-black text-xl shadow-2xs">
            T
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#1F1D1A]">Om Rätt Vagn</h2>
            <p className="text-xs text-[#78736B]">Enkel hjälpreda för Stockholms tunnelbana</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#45423D] leading-relaxed">
          <strong>Rätt Vagn</strong> hjälper dig att kliva på i rätt ände av tåget. Genom att veta i
          vilken riktning tåget färdas och i vilken ände av perrongen dina önskade uppgångar ligger,
          kan du spara tid och slippa gå hela perrongens längd när du kommer fram.
        </p>
      </div>

      {/* Origin & Credits Card */}
      <div className="bg-[#FFFFFF] border border-[#E7E2D9] rounded-2xl p-5 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-[#1F1D1A] flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-[#D32F2F]" />
          <span>Ursprung & Cred</span>
        </h3>

        <p className="text-xs sm:text-sm text-[#45423D] leading-relaxed">
          Denna webbapp är en moderniserad och vidareutvecklad version baserad på det öppna
          projektet <strong>"Rätt Uppgång"</strong> som ursprungligen skapades av{' '}
          <span className="font-semibold text-[#1F1D1A]">Joakim Loxdal</span> (mrkickling).
        </p>

        <div className="pt-1 flex flex-col gap-2">
          <a
            href="https://github.com/mrkickling/Rattuppgang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E2D9] hover:border-[#1F1D1A] text-xs font-semibold text-[#1F1D1A] transition-all"
          >
            <span>Ursprungligt projekt (GitHub: mrkickling/Rattuppgang)</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#78736B]" />
          </a>

          <a
            href="https://github.com/emilemail4/rattvagn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E2D9] hover:border-[#1F1D1A] text-xs font-semibold text-[#1F1D1A] transition-all"
          >
            <span>Detta projekt på GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#78736B]" />
          </a>
        </div>
      </div>

      {/* Offline & PWA features */}
      <div className="bg-[#FFFFFF] border border-[#E7E2D9] rounded-2xl p-5 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-[#1F1D1A] flex items-center gap-1.5">
          <Smartphone className="w-4 h-4 text-[#138A36]" />
          <span>Fungerar offline & PWA</span>
        </h3>

        <p className="text-xs sm:text-sm text-[#45423D] leading-relaxed">
          Rätt Vagn är en fullvärdig <strong>Progressive Web App (PWA)</strong>. Det betyder att du
          kan lägga till den på mobilens hemskärm och använda den även i tunnelbanetunnlar utan
          internetuppkoppling.
        </p>

        <ul className="text-xs text-[#524E48] space-y-1.5 pl-4 list-disc">
          <li>All stations- och uppgångsdata är inbyggd och fungerar offline.</li>
          <li>Du kan spara favoritstationer och favoritsträckor.</li>
          <li>Loggar du in via Google synkas dina favoriter säkert mellan enheter med Firebase.</li>
        </ul>
      </div>

      {/* Developer note */}
      <div className="p-4 bg-[#FAF8F5] border border-[#E7E2D9] rounded-2xl text-[11px] text-[#78736B] leading-relaxed text-center">
        Instruktioner för att utöka med nya stationer och linjer (som Gula linjen eller
        förlängningen till Barkarby/Nacka) finns dokumenterade i projektets <code>README.md</code>.
      </div>
    </div>
  );
};
