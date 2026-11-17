/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AlertTriangle,
  Check,
  Cloud,
  Copy,
  ExternalLink,
  LogOut,
  User as UserIcon,
  X,
} from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import firebaseConfig from '../../firebase-applet-config.json';
import { auth, firebaseSignOut, googleProvider, signInWithPopup, type User } from '../lib/firebase';

interface AuthButtonProps {
  user: User | null;
  loading: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ user, loading }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [copiedDomain, setCopiedDomain] = useState(false);

  const currentHostname =
    typeof window !== 'undefined' ? window.location.hostname : 'tbana.emilrapp.se';

  const firebaseAuthSettingsUrl = `https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/settings`;

  const handleLogin = async () => {
    setErrorMsg(null);
    setSigningIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'code' in err) {
        const errorCode = (err as { code: string }).code;

        if (errorCode === 'auth/popup-closed-by-user') {
          // Normal user cancel, don't show error
          return;
        }

        if (errorCode === 'auth/unauthorized-domain') {
          setShowDomainModal(true);
          setErrorMsg('Domänen behöver godkännas i Firebase');
          return;
        }

        if (errorCode === 'auth/popup-blocked') {
          setErrorMsg('Popup-fönstret blockerades av webbläsaren.');
          return;
        }

        if (errorCode === 'auth/network-request-failed') {
          setErrorMsg('Nätverksfel vid inloggning.');
          return;
        }
      }

      setErrorMsg('Inloggningen avbröts.');
    } finally {
      setSigningIn(false);
    }
  };

  const handleLogout = async () => {
    setMenuOpen(false);
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleCopyDomain = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(currentHostname);
      setCopiedDomain(true);
      setTimeout(() => setCopiedDomain(false), 2000);
    }
  };

  if (loading) {
    return <div className="w-7 h-7 rounded-full bg-[#EAE5DC] animate-pulse" />;
  }

  return (
    <>
      {user ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-1.5 p-1 rounded-full border border-[#D9D3C7] bg-[#FFFFFF] hover:border-[#1F1D1A] transition-all"
            title={`Inloggad som ${user.displayName || user.email}`}
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Profil'}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-[#006298] text-white flex items-center justify-center text-xs font-bold">
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D9] p-3 shadow-xl z-50 text-xs">
              <div className="pb-2 border-b border-[#F0ECE1] mb-2">
                <div className="font-bold text-[#1F1D1A] truncate">
                  {user.displayName || 'Inloggad användare'}
                </div>
                <div className="text-[11px] text-[#78736B] truncate">{user.email}</div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 mt-1 font-medium">
                  <Cloud className="w-3 h-3" />
                  <span>Favoriter synkas med molnet</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-rose-700 hover:bg-rose-50 transition-colors font-medium text-left"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logga ut</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <button
            type="button"
            onClick={handleLogin}
            disabled={signingIn}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D9D3C7] bg-[#FFFFFF] text-[#3D3A35] text-xs font-medium hover:border-[#1F1D1A] hover:text-[#1F1D1A] active:scale-95 transition-all"
            title="Logga in för att spara och synka favoriter"
          >
            <UserIcon className="w-3.5 h-3.5 text-[#6B665F]" />
            <span>{signingIn ? 'Loggar in...' : 'Logga in'}</span>
          </button>

          {errorMsg && !showDomainModal && (
            <div className="absolute right-0 top-full mt-1 text-[10px] text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 whitespace-nowrap z-30">
              {errorMsg}
            </div>
          )}
        </div>
      )}

      {/* Modal for Firebase Authorized Domain Configuration */}
      {showDomainModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-[#FFFFFF] border border-[#E7E2D9] p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#F0ECE1]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#1F1D1A]">Auktorisera domänen i Firebase</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDomainModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-[#524E48] leading-relaxed space-y-2.5">
              <p>
                Google tillåter endast inloggningar från domäner som uttryckligen har lagts till i
                ditt Firebase-projekt. Eftersom du nyligen kopplat din egen domän (
                <strong>{currentHostname}</strong>) behöver den godkännas i Firebase Console en
                gång.
              </p>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E7E2D9] space-y-2">
                <div className="font-semibold text-[#1F1D1A] flex items-center justify-between">
                  <span>Domän att lägga till:</span>
                  <button
                    type="button"
                    onClick={handleCopyDomain}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#006298] hover:underline"
                  >
                    {copiedDomain ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{copiedDomain ? 'Kopierad!' : 'Kopiera'}</span>
                  </button>
                </div>
                <div className="font-mono text-xs text-[#1F1D1A] bg-white px-2 py-1.5 rounded-lg border border-[#D9D3C7]">
                  {currentHostname}
                </div>
              </div>

              <div className="space-y-1.5 pt-1 text-xs">
                <div className="font-semibold text-[#1F1D1A]">Gör så här (tar 30 sekunder):</div>
                <ol className="list-decimal pl-4 space-y-1 text-[#524E48]">
                  <li>Öppna inställningarna i Firebase Console via knappen nedan.</li>
                  <li>
                    Scrolla ner till sektionen <strong>"Authorized domains"</strong> (Auktoriserade
                    domäner).
                  </li>
                  <li>
                    Klicka på <strong>"Add domain"</strong> och klistra in{' '}
                    <code>{currentHostname}</code> (samt <code>vercel.app</code> om du använder
                    förhandsvisningar).
                  </li>
                </ol>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
              <a
                href={firebaseAuthSettingsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-2 px-3 rounded-xl bg-[#006298] hover:bg-[#005180] text-white font-semibold text-xs text-center flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <span>Öppna Firebase Console</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setShowDomainModal(false)}
                className="w-full sm:w-auto py-2 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#EAE5DC] text-[#45423D] font-semibold text-xs border border-[#E7E2D9] transition-colors"
              >
                Stäng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
