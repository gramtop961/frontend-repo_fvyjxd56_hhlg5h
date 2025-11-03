import React, { useState } from 'react';
import { Phone, Check, X } from 'lucide-react';

export default function LoginPanel({ onLogin, user }) {
  const [phone, setPhone] = useState('9131715292');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');
  const [message, setMessage] = useState(null);

  const requestOtp = (e) => {
    e.preventDefault();
    if (phone === '9131715292') {
      setMessage({ type: 'success', text: 'OTP sent (use 1234 for demo)' });
      setStep('otp');
    } else {
      setMessage({ type: 'error', text: 'Unsupported number in demo. Use 9131715292.' });
    }
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    if (otp === '1234') {
      setMessage({ type: 'success', text: 'Logged in successfully' });
      onLogin({ id: 'demo-user', name: 'Ashwani Karma', phone: '9131715292' });
    } else {
      setMessage({ type: 'error', text: 'Invalid OTP. Use 1234 in this demo.' });
    }
  };

  if (user) {
    return (
      <div className="rounded-2xl border border-slate-200 p-4 md:p-6 bg-white" role="status" aria-label="Logged in">
        <p className="text-sm text-slate-600">Welcome back</p>
        <p className="text-lg font-semibold">{user.name}</p>
        <p className="text-sm text-slate-500">{user.phone}</p>
      </div>
    );
  }

  return (
    <section aria-label="Phone login" className="rounded-2xl border border-slate-200 p-4 md:p-6 bg-white">
      <div className="flex items-center gap-2 mb-3">
        <Phone className="h-5 w-5 text-green-600" aria-hidden />
        <h2 className="text-lg font-semibold">Login with OTP</h2>
      </div>

      {message && (
        <div className={`mb-3 text-sm rounded-md px-3 py-2 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`} role="alert">
          <span className="inline-flex items-center gap-2">
            {message.type === 'success' ? <Check className="h-4 w-4" aria-hidden /> : <X className="h-4 w-4" aria-hidden />}
            {message.text}
          </span>
        </div>
      )}

      {step === 'phone' && (
        <form onSubmit={requestOtp} className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm text-slate-600">Phone number</span>
            <input
              type="tel"
              inputMode="numeric"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 px-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
              aria-label="Phone number"
              required
            />
          </label>
          <button type="submit" className="h-11 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Send OTP</button>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={verifyOtp} className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm text-slate-600">Enter OTP</span>
            <input
              type="password"
              name="otp"
              inputMode="numeric"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="h-11 px-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none tracking-widest"
              aria-label="One-time password"
              required
            />
          </label>
          <div className="flex gap-2">
            <button type="submit" className="h-11 flex-1 rounded-lg bg-slate-900 text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">Verify</button>
            <button type="button" onClick={() => setStep('phone')} className="h-11 px-4 rounded-lg border border-slate-300 hover:bg-slate-50">Change number</button>
          </div>
          <p className="text-xs text-slate-500">Demo: phone 9131715292, OTP 1234</p>
        </form>
      )}
    </section>
  );
}
