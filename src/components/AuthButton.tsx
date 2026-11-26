/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import { useState } from 'react';
import firebaseConfig from '../../firebase-applet-config.json';
import {
  auth,
  db,
  deleteDoc,
  deleteUser,
  doc,
  firebaseSignOut,
  googleProvider,
  reauthenticateWithPopup,
  signInWithPopup,
  type User,
} from '../lib/firebase';
import {
  MetroAlertIcon,
  MetroArrowUpRight,
  MetroCheckIcon,
  MetroCloseIcon,
  MetroCopyIcon,
  MetroLogoutIcon,
  MetroTrashIcon,
  MetroUserIcon,
} from './MetroIcons';

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

  // Account deletion state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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

  const handleOpenDeleteModal = () => {
    setMenuOpen(false);
    setDeleteError(null);
    setShowDeleteModal(true);
  };

  const handleConfirmDeleteAccount = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser || deletingAccount) return;

    setDeletingAccount(true);
    setDeleteError(null);

    const removeUserDataAndAccount = async (activeUser: User) => {
      const userDocRef = doc(db, 'users', activeUser.uid, 'favorites', 'data');
      await deleteDoc(userDocRef);
      await deleteUser(activeUser);
    };

    try {
      await removeUserDataAndAccount(currentUser);
      setShowDeleteModal(false);
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'code' in err) {
        const errorCode = (err as { code: string }).code;

        if (errorCode === 'auth/requires-recent-login') {
          try {
            await reauthenticateWithPopup(currentUser, googleProvider);
            await removeUserDataAndAccount(currentUser);
            setShowDeleteModal(false);
            return;
          } catch (reauthErr: unknown) {
            if (
              typeof reauthErr === 'object' &&
              reauthErr !== null &&
              'code' in reauthErr &&
              (reauthErr as { code: string }).code === 'auth/popup-closed-by-user'
            ) {
              setDeleteError('Bekräftelsen avbröts. Logga in igen för att ta bort kontot.');
            } else {
              setDeleteError('Kunde inte verifiera din inloggning. Försök logga in på nytt och testa igen.');
            }
            return;
          }
        }
      }

      console.error('Delete account error:', err);
      setDeleteError('Kunde inte ta bort kontot just nu. Kontrollera din anslutning och försök igen.');
    } finally {
      setDeletingAccount(false);
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
    return <div className="w-9 h-9 bg-[#FFFFFF]/20 animate-pulse" />;
  }

  return (
    <>
      {user ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="metro-btn flex items-center justify-center w-9 h-9 border border-[#FFFFFF]/40 bg-[#16181D] text-[#FFFFFF] hover:bg-[#00A859] hover:text-[#FFFFFF] hover:border-[#00A859]"
            title={`Inloggad som ${user.displayName || user.email}`}
            aria-label="Konto"
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Profil'}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-mono-tabular text-xs font-bold">
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </span>
            )}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1 w-64 bg-[var(--bg-surface)] border-2 border-[var(--ink-primary)] border-t-[5px] border-t-[#008DD0] z-50 text-xs text-[var(--ink-primary)]">
              <div className="p-3 border-b border-[var(--grid-divider)]">
                <div className="font-bold text-[var(--ink-primary)] truncate">
                  {user.displayName || 'Inloggad användare'}
                </div>
                <div className="text-[11px] text-[var(--ink-secondary)] truncate mt-0.5">
                  {user.email}
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.06em] text-[#00A859] mt-2">
                  <span className="w-2 h-2 bg-[#00A859] shrink-0" />
                  <span>Molnsynk aktiv</span>
                </div>
              </div>

              <div className="divide-y divide-[var(--grid-divider)]">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="metro-btn w-full flex items-center gap-2 px-3 py-2.5 text-[var(--ink-primary)] hover:bg-[#008DD0] hover:text-[#FFFFFF] font-bold uppercase tracking-[0.06em] text-left"
                >
                  <MetroLogoutIcon className="w-3.5 h-3.5" />
                  <span>Logga ut</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenDeleteModal}
                  className="metro-btn w-full flex items-center gap-2 px-3 py-2.5 text-[#E53935] hover:bg-[#E53935] hover:text-[#FFFFFF] font-bold uppercase tracking-[0.06em] text-left"
                >
                  <MetroTrashIcon className="w-3.5 h-3.5" />
                  <span>Ta bort konto</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <button
            type="button"
            onClick={handleLogin}
            disabled={signingIn}
            className="metro-btn inline-flex items-center gap-1.5 h-9 px-3 border border-[#FFFFFF]/40 bg-[#16181D] text-[#FFFFFF] text-xs font-bold uppercase tracking-[0.06em] hover:bg-[#00A859] hover:text-[#FFFFFF] hover:border-[#00A859] disabled:opacity-60"
            title="Logga in för att spara och synka favoriter"
          >
            <MetroUserIcon className="w-3.5 h-3.5" />
            <span>{signingIn ? 'Loggar in...' : 'Logga in'}</span>
          </button>

          {errorMsg && !showDomainModal && (
            <div className="absolute right-0 top-full mt-1 text-[11px] font-bold bg-[#E53935] text-[#FFFFFF] px-2.5 py-1 whitespace-nowrap z-50">
              {errorMsg}
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal for Account Deletion */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#16181D]/80 p-3">
          <div className="w-full max-w-md bg-[var(--bg-surface)] border-2 border-[var(--ink-primary)] border-t-[6px] border-t-[#E53935] text-[var(--ink-primary)]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--grid-divider)]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-[#E53935] text-[#FFFFFF] flex items-center justify-center shrink-0">
                  <MetroTrashIcon className="w-4 h-4" />
                </div>
                <h3 className="font-display text-base font-bold text-[#E53935]">
                  Ta bort konto
                </h3>
              </div>
              <button
                type="button"
                onClick={() => !deletingAccount && setShowDeleteModal(false)}
                disabled={deletingAccount}
                aria-label="Stäng"
                className="metro-btn w-9 h-9 flex items-center justify-center border border-[var(--grid-divider)] text-[var(--ink-secondary)] hover:bg-[#16181D] hover:text-[#FFFFFF] disabled:opacity-50"
              >
                <MetroCloseIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 text-sm leading-relaxed">
              <p className="text-[var(--ink-secondary)]">
                Om du tar bort ditt konto raderas din användare och dina sparade favoriter permanent
                från databasen i Firebase. Åtgärden går inte att ångra.
              </p>

              <p className="font-bold text-[var(--ink-primary)]">
                Är du säker på att du vill ta bort ditt konto?
              </p>

              {deleteError && (
                <div className="p-2.5 border-l-[4px] border-l-[#E53935] bg-[#E53935]/10 text-[#E53935] text-xs font-bold">
                  {deleteError}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-[var(--grid-divider)] flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={deletingAccount}
                className="metro-btn flex-1 py-2.5 px-4 bg-[var(--bg-canvas)] text-[var(--ink-primary)] border border-[var(--grid-divider)] hover:bg-[#16181D] hover:text-[#FFFFFF] font-bold text-xs uppercase tracking-[0.06em] disabled:opacity-50"
              >
                Nej, avbryt
              </button>

              <button
                type="button"
                onClick={handleConfirmDeleteAccount}
                disabled={deletingAccount}
                className="metro-btn flex-1 py-2.5 px-4 bg-[#E53935] text-[#FFFFFF] hover:bg-[#16181D] hover:text-[#FFFFFF] font-bold text-xs uppercase tracking-[0.06em] disabled:opacity-60"
              >
                {deletingAccount ? 'Tar bort...' : 'Ja, ta bort konto'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Firebase Authorized Domain Configuration */}
      {showDomainModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#16181D]/80 p-3">
          <div className="w-full max-w-md bg-[var(--bg-surface)] border-2 border-[var(--ink-primary)] border-t-[6px] border-t-[#F26D21] text-[var(--ink-primary)]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--grid-divider)]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-[#F26D21] text-[#16181D] flex items-center justify-center shrink-0">
                  <MetroAlertIcon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-[0.02em]">
                  Auktorisera domänen i Firebase
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDomainModal(false)}
                aria-label="Stäng"
                className="metro-btn w-9 h-9 flex items-center justify-center border border-[var(--grid-divider)] text-[var(--ink-secondary)] hover:bg-[#16181D] hover:text-[#FFFFFF]"
              >
                <MetroCloseIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 text-xs text-[var(--ink-secondary)] leading-relaxed space-y-3">
              <p>
                Google tillåter endast inloggningar från domäner som uttryckligen har lagts till i
                ditt Firebase-projekt. Eftersom du nyligen kopplat din egen domän (
                <strong className="text-[var(--ink-primary)]">{currentHostname}</strong>) behöver den
                godkännas i Firebase Console en gång.
              </p>

              <div className="p-3 bg-[var(--bg-canvas)] border border-[var(--grid-divider)] border-l-[4px] border-l-[#008DD0] space-y-2">
                <div className="font-bold text-[var(--ink-primary)] uppercase tracking-[0.06em] text-[11px] flex items-center justify-between">
                  <span>Domän att lägga till</span>
                  <button
                    type="button"
                    onClick={handleCopyDomain}
                    className="metro-btn inline-flex items-center gap-1 px-2 py-1 bg-[#008DD0] text-[#FFFFFF] hover:bg-[#00A859] text-[10px] font-bold uppercase tracking-[0.06em]"
                  >
                    {copiedDomain ? (
                      <MetroCheckIcon className="w-3 h-3" />
                    ) : (
                      <MetroCopyIcon className="w-3 h-3" />
                    )}
                    <span>{copiedDomain ? 'Kopierad' : 'Kopiera'}</span>
                  </button>
                </div>
                <div className="font-mono-tabular text-xs text-[var(--ink-primary)] bg-[var(--bg-surface)] px-2.5 py-2 border border-[var(--grid-divider)]">
                  {currentHostname}
                </div>
              </div>

              <div className="space-y-1.5 pt-1 text-xs">
                <div className="font-bold text-[var(--ink-primary)] uppercase tracking-[0.06em] text-[11px]">
                  Gör så här (30 sekunder)
                </div>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Öppna inställningarna i Firebase Console via knappen nedan.</li>
                  <li>
                    Scrolla ner till sektionen{' '}
                    <strong className="text-[var(--ink-primary)]">"Authorized domains"</strong>{' '}
                    (Auktoriserade domäner).
                  </li>
                  <li>
                    Klicka på <strong className="text-[var(--ink-primary)]">"Add domain"</strong> och
                    klistra in <code className="font-mono-tabular">{currentHostname}</code> (samt{' '}
                    <code className="font-mono-tabular">vercel.app</code> om du använder
                    förhandsvisningar).
                  </li>
                </ol>
              </div>
            </div>

            <div className="p-3 border-t border-[var(--grid-divider)] flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <a
                href={firebaseAuthSettingsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="metro-btn flex-1 py-2.5 px-4 bg-[#008DD0] text-[#FFFFFF] hover:bg-[#00A859] font-bold text-xs uppercase tracking-[0.06em] text-center flex items-center justify-center gap-1.5"
              >
                <span>Öppna Firebase Console</span>
                <MetroArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setShowDomainModal(false)}
                className="metro-btn py-2.5 px-4 bg-[var(--bg-canvas)] text-[var(--ink-primary)] border border-[var(--grid-divider)] hover:bg-[#16181D] hover:text-[#FFFFFF] font-bold text-xs uppercase tracking-[0.06em]"
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
