/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import { MetroArrowUpRight, MetroMailIcon } from './MetroIcons';

const LINE_SYSTEM_LEGEND = [
  { lines: [10, 11], name: 'Blå linjen', bg: 'bg-[#008DD0]', fg: 'text-[#FFFFFF]' },
  { lines: [13, 14], name: 'Röda linjen', bg: 'bg-[#E53935]', fg: 'text-[#FFFFFF]' },
  { lines: [17, 18, 19], name: 'Gröna linjen', bg: 'bg-[#00A859]', fg: 'text-[#FFFFFF]' },
];

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Primary Editorial Banner Block */}
      <section className="bg-[var(--bg-surface)] border border-[var(--grid-divider)] border-t-[6px] border-t-[#008DD0] grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-[var(--grid-divider)]">
        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#008DD0] text-[#FFFFFF] flex items-center justify-center font-display font-bold text-2xl shrink-0">
              T
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#008DD0] leading-none">
              Om Rätt Vagn
            </h2>
          </div>

          <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
            <strong className="text-[var(--ink-primary)]">Rätt Vagn</strong> hjälper dig att kliva
            på i rätt ände av tåget. Genom att veta i vilken riktning tåget färdas och i vilken ände
            av perrongen dina önskade uppgångar ligger, kan du spara tid och slippa gå hela
            perrongens längd när du kommer fram.
          </p>
        </div>

        {/* Stockholm Metro Line System Key — only lines in the database */}
        <div className="p-5 sm:p-6 bg-[var(--bg-canvas)] flex flex-col justify-between gap-3">
          <h3 className="font-display text-base font-bold text-[var(--ink-primary)]">
            Linjenät i databasen
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
            {LINE_SYSTEM_LEGEND.map((item) => (
              <div
                key={item.name}
                className={`p-2.5 ${item.bg} ${item.fg} flex flex-col justify-between min-h-[68px]`}
              >
                <div className="flex items-center gap-1 flex-wrap">
                  {item.lines.map((num) => (
                    <span
                      key={num}
                      className="font-mono-tabular text-xs font-bold px-1.5 py-0.5 bg-[#16181D]/15"
                    >
                      {num}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-bold mt-2">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Asymmetric Two-Column Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
        {/* Developer / Maintainer */}
        <section className="bg-[var(--bg-surface)] border border-[var(--grid-divider)] border-l-[5px] border-l-[#008DD0] p-5 space-y-3.5">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#008DD0] leading-tight">
            Om mig & Kontakt
          </h3>

          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
            Sidan drivs och vidareutvecklas av{' '}
            <strong className="text-[var(--ink-primary)]">Emil Rapp</strong> (GitHub:{' '}
            <span className="font-mono-tabular text-xs font-semibold text-[var(--ink-primary)]">
              @rappos
            </span>
            ). Hittar du något som inte stämmer på en perrong, saknar en ny uppgång eller har idéer
            på förbättringar? Hör gärna av dig!
          </p>

          <div className="divide-y divide-[var(--grid-divider)] border border-[var(--grid-divider)]">
            <a
              href="mailto:emilemail4@gmail.com"
              className="metro-btn flex items-center justify-between gap-2 px-3.5 py-3 bg-[var(--bg-canvas)] hover:bg-[#008DD0] text-[var(--ink-primary)] hover:text-[#FFFFFF] text-xs font-bold"
            >
              <span className="flex items-center gap-2 min-w-0">
                <MetroMailIcon className="w-4 h-4 shrink-0" />
                <span className="font-mono-tabular truncate">emilemail4@gmail.com</span>
              </span>
              <MetroArrowUpRight className="w-4 h-4 shrink-0" />
            </a>

            <a
              href="https://github.com/rappos/rattvagn"
              target="_blank"
              rel="noopener noreferrer"
              className="metro-btn flex items-center justify-between gap-2 px-3.5 py-3 bg-[var(--bg-canvas)] hover:bg-[#008DD0] text-[var(--ink-primary)] hover:text-[#FFFFFF] text-xs font-bold"
            >
              <span>Detta projekt på GitHub (rappos/rattvagn)</span>
              <MetroArrowUpRight className="w-4 h-4 shrink-0" />
            </a>
          </div>
        </section>

        {/* Right Stack: Offline/PWA + Origin/Credits */}
        <div className="space-y-3">
          {/* Offline & PWA */}
          <section className="bg-[var(--bg-surface)] border border-[var(--grid-divider)] border-l-[5px] border-l-[#00A859] p-5 space-y-3">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#00A859] leading-tight">
              Fungerar offline & PWA
            </h3>

            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
              Rätt Vagn fungerar som en app på mobilen (PWA) och all stationsdata finns sparad
              direkt i enheten så du kan kolla rätt vagn även nere i tunnelbanan utan mottagning.
            </p>

            <ul className="space-y-1.5 text-xs text-[var(--ink-primary)]">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-[#00A859] mt-1 shrink-0" />
                <span>All stations- och uppgångsdata fungerar offline.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-[#00C2CB] mt-1 shrink-0" />
                <span>
                  Spara favoritstationer och favoritsträckor lokalt eller synkat via Google-inlogg.
                </span>
              </li>
            </ul>
          </section>

          {/* Origin & Credits */}
          <section className="bg-[var(--bg-surface)] border border-[var(--grid-divider)] border-l-[5px] border-l-[#E53935] p-5 space-y-3">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#E53935] leading-tight">
              Ursprung & Cred
            </h3>

            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
              Idén och den ursprungliga databasen kommer från det öppna projektet{' '}
              <strong className="text-[var(--ink-primary)]">"Rätt Uppgång"</strong> skapat av{' '}
              <strong className="text-[var(--ink-primary)]">Joakim Loxdal</strong> (mrkickling) med
              hjälp av gemenskapen på r/stockholm.
            </p>

            <a
              href="https://github.com/mrkickling/Rattuppgang"
              target="_blank"
              rel="noopener noreferrer"
              className="metro-btn w-full flex items-center justify-between gap-2 px-3.5 py-3 bg-[var(--bg-canvas)] border border-[var(--grid-divider)] hover:bg-[#E53935] hover:border-[#E53935] hover:text-[#FFFFFF] text-xs font-bold text-[var(--ink-primary)]"
            >
              <span>Ursprungligt projekt (mrkickling/Rattuppgang)</span>
              <MetroArrowUpRight className="w-4 h-4 shrink-0" />
            </a>
          </section>
        </div>
      </div>

      {/* Terms of Service & Privacy Policy */}
      <section className="bg-[var(--bg-surface)] border border-[var(--grid-divider)] grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[var(--grid-divider)]">
        {/* Användarvillkor */}
        <div className="p-5 space-y-2.5">
          <h3 className="font-display text-base sm:text-lg font-bold text-[var(--ink-primary)] leading-tight">
            Användarvillkor
          </h3>
          <div className="space-y-2 text-xs text-[var(--ink-secondary)] leading-relaxed">
            <p>
              <strong className="text-[var(--ink-primary)]">Rätt Vagn</strong> är ett kostnadsfritt,
              oberoende hjälpmedel och har ingen koppling till SL eller Region Stockholm.
            </p>
            <p>
              Information om uppgångar, byten och vagnsplacering tillhandahålls i befintligt skick
              utan garanti. Avstängningar, ombyggnationer eller ändrad trafik kan påverka hur en
              station fungerar i praktiken — följ alltid skyltning på plats.
            </p>
            <p>
              Tjänsten får användas fritt för personligt bruk och kan när som helst uppdateras eller
              förändras.
            </p>
          </div>
        </div>

        {/* Integritetspolicy */}
        <div className="p-5 space-y-2.5">
          <h3 className="font-display text-base sm:text-lg font-bold text-[var(--ink-primary)] leading-tight">
            Integritetspolicy
          </h3>
          <div className="space-y-2 text-xs text-[var(--ink-secondary)] leading-relaxed">
            <p>
              Utan inloggning sparas dina favoriter och temaval endast lokalt i din webbläsare
              (localStorage). Vi använder varken spårningscookies eller annonsering.
            </p>
            <p>
              Om du väljer att logga in med Google används Google Firebase för inloggning och för
              att synkronisera dina favoritstationer och favoritsträckor mellan enheter. Endast
              ditt användar-ID samt dina sparade favoriter lagras i databasen.
            </p>
            <p>
              Inga uppgifter säljs eller delas med tredje part. Du kan när som helst radera ditt
              konto och all sparad molndata via{' '}
              <strong className="text-[var(--ink-primary)]">Ta bort konto</strong> i kontomenyn,
              eller genom att mejla{' '}
              <a
                href="mailto:emilemail4@gmail.com"
                className="text-[#008DD0] hover:underline font-medium"
              >
                emilemail4@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
