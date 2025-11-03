import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

function ConfettiBurst({ show }) {
  if (!show) return null;
  const pieces = Array.from({ length: 40 });
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {pieces.map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 1, y: -20, x: Math.random() * window.innerWidth }}
          animate={{
            y: [ -20, window.innerHeight + 20 ],
            rotate: [0, 360],
          }}
          transition={{ duration: 1.2 + Math.random(), ease: 'easeOut' }}
          className="absolute block w-2 h-3 rounded-sm"
          style={{
            backgroundColor: [`#16a34a`, `#f59e0b`, `#ef4444`, `#3b82f6`, `#a855f7`][i % 5],
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

export default function CartCheckout({ open, onClose, cart, onRemove, onClear, onSuccess, onFailure, orders, user }) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const total = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.qty, 0), [cart]);

  useEffect(() => {
    if (!open) {
      setProcessing(false);
      setError(null);
      setShowConfetti(false);
    }
  }, [open]);

  const formatter = useMemo(() => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }), []);

  const simulatePayment = async (status) => {
    setProcessing(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 700));
    if (status === 'success') {
      setShowConfetti(true);
      onSuccess();
      setTimeout(() => {
        setProcessing(false);
        onClose();
      }, 1200);
    } else {
      setProcessing(false);
      setError('Payment failed. Please try again.');
      onFailure();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 grid place-items-end md:place-items-center p-4 bg-black/40"
          aria-modal="true"
          role="dialog"
          aria-label="Checkout"
        >
          <ConfettiBurst show={showConfetti} />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="w-full max-w-2xl bg-white rounded-t-2xl md:rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">Payment Simulator</h3>
                <p className="text-xs text-slate-500">DeeGee demo checkout</p>
              </div>
              <button className="h-9 w-9 rounded-full hover:bg-slate-100 grid place-items-center" onClick={onClose} aria-label="Close checkout">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 grid gap-3 max-h-[65vh] overflow-auto">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-600">Payable</p>
                  <p className="text-2xl font-bold text-green-700">{formatter.format(total)}</p>
                </div>
                <div className="text-sm text-slate-600">
                  <p className="font-medium">{user ? user.name : 'Guest'}</p>
                  <p className="text-slate-500">{user ? user.phone : 'Not logged in'}</p>
                </div>
              </div>

              <div className="rounded-xl border p-3">
                <h4 className="font-medium mb-2">Items</h4>
                <ul className="grid gap-2">
                  {cart.map((i) => (
                    <li key={i.id} className="flex items-center justify-between text-sm">
                      <span>{i.name} × {i.qty}</span>
                      <span>{formatter.format(i.price * i.qty)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {error && (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2" role="alert">{error}</div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  className="h-11 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                  onClick={() => simulatePayment('success')}
                  disabled={processing}
                  aria-label="Simulate payment success"
                >
                  {processing ? 'Processing...' : 'Success'}
                </button>
                <button
                  className="h-11 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                  onClick={() => simulatePayment('failure')}
                  disabled={processing}
                  aria-label="Simulate payment failure"
                >
                  {processing ? 'Processing...' : 'Failure'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
