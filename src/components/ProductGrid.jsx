import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const demoProducts = [
  { id: 'p1', name: 'Fresh Bananas (1kg)', price: 49, image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=1200&auto=format&fit=crop' },
  { id: 'p2', name: 'A2 Cow Milk (1L)', price: 89, image: 'https://images.unsplash.com/photo-1668762924635-a3683caf32bf?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxGcmVzaCUyMEJhbmFuYXMlMjAlMjgxa2clMjl8ZW58MHwwfHx8MTc2MjIxMDIyNHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: 'p3', name: 'Organic Tomatoes (500g)', price: 39, image: 'https://images.unsplash.com/photo-1668762924635-a3683caf32bf?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxGcmVzaCUyMEJhbmFuYXMlMjAlMjgxa2clMjl8ZW58MHwwfHx8MTc2MjIxMDIyNHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: 'p4', name: 'Basmati Rice (5kg)', price: 499, image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=1200&auto=format&fit=crop' },
  { id: 'p5', name: 'Whole Wheat Atta (5kg)', price: 289, image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?q=80&w=1200&auto=format&fit=crop' },
];

export default function ProductGrid({ onAddToCart }) {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800); // simulate network
    return () => clearTimeout(t);
  }, []);

  const formatter = useMemo(() => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }), []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" aria-busy="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 p-3 animate-pulse">
            <div className="h-28 bg-slate-200 rounded-lg" />
            <div className="h-3 w-3/4 bg-slate-200 rounded mt-3" />
            <div className="h-3 w-1/2 bg-slate-200 rounded mt-2" />
            <div className="h-9 bg-slate-200 rounded mt-4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" role="list" aria-label="Products">
        {demoProducts.map((p) => (
          <motion.button
            layoutId={`card-${p.id}`}
            key={p.id}
            onClick={() => setActive(p)}
            className="text-left rounded-xl border border-slate-200 hover:shadow-lg focus:shadow-lg transition-shadow bg-white"
            role="listitem"
            aria-label={`View ${p.name}`}
          >
            <motion.div layoutId={`image-${p.id}`} className="h-32 w-full overflow-hidden rounded-t-xl">
              <img src={p.image} alt="" className="h-full w-full object-cover" />
            </motion.div>
            <div className="p-3">
              <div className="text-sm font-medium line-clamp-2" title={p.name}>{p.name}</div>
              <div className="mt-1 text-green-700 font-semibold">{formatter.format(p.price)}</div>
              <div className="mt-3">
                <span className="inline-flex h-9 items-center justify-center rounded-lg bg-slate-900 text-white px-3 text-sm">Quick View</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-30 grid place-items-center p-4"
            onClick={() => setActive(null)}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              layoutId={`card-${active.id}`}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full rounded-2xl overflow-hidden bg-white"
            >
              <motion.div layoutId={`image-${active.id}`} className="h-56 w-full overflow-hidden">
                <img src={active.image} alt="Product image" className="h-full w-full object-cover" />
              </motion.div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{active.name}</h3>
                <p className="mt-1 text-green-700 font-semibold">{formatter.format(active.price)}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    className="h-11 flex-1 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                    onClick={() => {
                      onAddToCart(active);
                      setActive(null);
                    }}
                    aria-label={`Add ${active.name} to cart`}
                  >
                    Add to Cart
                  </button>
                  <button className="h-11 px-4 rounded-lg border" onClick={() => setActive(null)} aria-label="Close">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
