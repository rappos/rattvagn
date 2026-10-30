/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cloud, LogOut, User as UserIcon } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { auth, firebaseSignOut, googleProvider, signInWithPopup, type User } from '../lib/firebase';

interface AuthButtonProps {
  user: User | null;
  loading: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ user, loading }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async () => {
    setErrorMsg(null);
    setSigningIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      // Don't alert if closed by user
      const isClosedByUser =
        typeof err === 'object' && err !== null && 'code' in err && err.code === 'auth/popup-closed-by-user';
      if (!isClosedByUser) {
        setErrorMsg('Inloggningen avbröts.');
      }
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

  if (loading) {
    return <div className="w-7 h-7 rounded-full bg-[#EAE5DC] animate-pulse" />;
  }

  if (user) {
    return (
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
    );
  }

  return (
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

      {errorMsg && (
        <div className="absolute right-0 top-full mt-1 text-[10px] text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 whitespace-nowrap z-30">
          {errorMsg}
        </div>
      )}
    </div>
  );
};
