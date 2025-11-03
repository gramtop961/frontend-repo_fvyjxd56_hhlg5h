import React from 'react';
import { ShoppingCart, User } from 'lucide-react';

export default function HeaderNav({ user, cartCount, onOpenCart }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between" aria-label="DeeGee header">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-green-600 text-white grid place-items-center font-bold" aria-hidden>
            DG
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-none">DeeGee</h1>
            <p className="text-xs text-slate-500">Desi Grocers • Ultra-fast</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-slate-700" aria-live="polite">
            <User className="h-5 w-5" aria-hidden />
            <span className="text-sm">{user ? user.name : 'Guest'}</span>
          </div>
          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-slate-900 text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
            aria-label={`Open cart. ${cartCount} items`}
          >
            <ShoppingCart className="h-5 w-5" aria-hidden />
            <span className="text-sm">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] px-1 rounded-full bg-green-500 text-white text-xs grid place-items-center" aria-live="polite">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
