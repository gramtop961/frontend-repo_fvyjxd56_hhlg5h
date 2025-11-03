import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import HeaderNav from './components/HeaderNav.jsx';
import LoginPanel from './components/LoginPanel.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import CartCheckout from './components/CartCheckout.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([
    {
      id: 'ord-1001',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      total: 588,
      items: [
        { id: 'p4', name: 'Basmati Rice (5kg)', qty: 1, price: 499 },
        { id: 'p3', name: 'Organic Tomatoes (500g)', qty: 1, price: 39 },
        { id: 'p1', name: 'Fresh Bananas (1kg)', qty: 1, price: 49 },
      ],
      user: { id: 'demo-user', name: 'Ashwani Karma', phone: '9131715292' },
    },
  ]);
  const [cartOpen, setCartOpen] = useState(false);

  const formatter = useMemo(() => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }), []);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setCart([]);

  const handleSuccess = () => {
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const order = {
      id: `ord-${Math.floor(Math.random() * 9000) + 1000}`,
      date: new Date().toISOString(),
      total,
      items: cart.map(({ id, name, qty, price }) => ({ id, name, qty, price })),
      user: user || { id: 'guest', name: 'Guest', phone: '' },
    };
    setOrders((prev) => [order, ...prev]);
    clearCart();
  };

  const handleFailure = () => {
    // no-op; error displayed in modal
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <HeaderNav user={user} cartCount={cart.reduce((s, i) => s + i.qty, 0)} onOpenCart={() => setCartOpen(true)} />

      <main className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 grid gap-6">
          <section className="rounded-2xl p-6 bg-gradient-to-r from-green-600 to-green-500 text-white overflow-hidden relative">
            <motion.h2 initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="text-2xl md:text-3xl font-bold">
              DeeGee — Desi Grocers at lightning speed
            </motion.h2>
            <motion.p initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.05 }} className="mt-1 text-green-50">
              Fresh picks, delivered in minutes. Prices in ₹.
            </motion.p>
            <div className="pointer-events-none absolute -right-10 -bottom-10 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold">Today’s picks</h3>
              <p className="text-sm text-slate-500">Tap a product to view and add</p>
            </div>
            <ProductGrid onAddToCart={addToCart} />
          </section>
        </div>

        <div className="grid gap-6">
          <LoginPanel onLogin={(u) => setUser(u)} user={user} />

          <section className="rounded-2xl border border-slate-200 p-4 md:p-6 bg-white">
            <h3 className="text-lg font-semibold">Your cart</h3>
            {cart.length === 0 ? (
              <p className="text-sm text-slate-500 mt-2">Your cart is empty.</p>
            ) : (
              <ul className="mt-3 grid gap-3">
                {cart.map((i) => (
                  <li key={i.id} className="flex items-center justify-between gap-3 text-sm">
                    <div>
                      <p className="font-medium">{i.name}</p>
                      <p className="text-slate-500">Qty {i.qty} • {formatter.format(i.price)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{formatter.format(i.price * i.qty)}</span>
                      <button className="px-3 h-9 rounded-lg border hover:bg-slate-50" onClick={() => removeFromCart(i.id)} aria-label={`Remove ${i.name}`}>
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-slate-600">Subtotal</span>
              <span className="text-lg font-bold text-green-700">{formatter.format(cart.reduce((s, i) => s + i.price * i.qty, 0))}</span>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                className="h-11 flex-1 rounded-lg bg-slate-900 text-white disabled:opacity-50"
                disabled={cart.length === 0}
                onClick={() => setCartOpen(true)}
              >
                Checkout
              </button>
              <button className="h-11 px-4 rounded-lg border disabled:opacity-50" disabled={cart.length === 0} onClick={clearCart}>Clear</button>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 p-4 md:p-6 bg-white">
            <h3 className="text-lg font-semibold">Order history</h3>
            {orders.length === 0 ? (
              <p className="text-sm text-slate-500 mt-2">No orders yet.</p>
            ) : (
              <ul className="mt-3 grid gap-3">
                {orders.map((o) => (
                  <li key={o.id} className="rounded-xl border p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Order {o.id}</span>
                      <span className="text-slate-500">{new Date(o.date).toLocaleString()}</span>
                    </div>
                    <div className="mt-1 text-green-700 font-semibold">{formatter.format(o.total)}</div>
                    <ul className="mt-2 text-sm text-slate-600 list-disc pl-5">
                      {o.items.map((i) => (
                        <li key={i.id + i.qty}>{i.name} × {i.qty}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>

      <CartCheckout
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        onClear={clearCart}
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        orders={orders}
        user={user}
      />
    </div>
  );
}

export default App;
