'use client';

import React, { useState } from 'react';
import {
  Heart,
  ArrowRight,
  HandCoins,
  Users,
  Shield,
  X as XIcon,
  CheckCircle,
} from 'lucide-react';

export default function CTA() {
  const [isModalOpen, setModalOpen] = useState(false);

  // Zakat form state
  const [cash, setCash] = useState<string>('0');
  const [bank, setBank] = useState<string>('0');
  const [investments, setInvestments] = useState<string>('0');
  const [businessAssets, setBusinessAssets] = useState<string>('0');
  const [goldGrams, setGoldGrams] = useState<string>('0');
  const [silverGrams, setSilverGrams] = useState<string>('0');
  const [goldPrice, setGoldPrice] = useState<string>('6000');
  const [silverPrice, setSilverPrice] = useState<string>('80');
  const [debts, setDebts] = useState<string>('0');

  // Nisab (gold-based default)
  const [nisabGrams, setNisabGrams] = useState<string>('87.48');
  const [useGoldNisab, setUseGoldNisab] = useState<boolean>(true);

  const [result, setResult] = useState<null | {
    totalAssets: number;
    totalLiabilities: number;
    netZakatable: number;
    zakatDue: number;
    nisabValue: number;
    isAboveNisab: boolean;
  }>(null);

  const parseNumber = (val: string) => {
    const n = Number(val.toString().replace(/,/g, '').trim());
    return Number.isFinite(n) ? n : 0;
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });
  };

  const calculateZakat = (e?: React.FormEvent) => {
    e?.preventDefault();

    const c = parseNumber(cash);
    const b = parseNumber(bank);
    const inv = parseNumber(investments);
    const bus = parseNumber(businessAssets);
    const gGrams = parseNumber(goldGrams);
    const sGrams = parseNumber(silverGrams);
    const gPrice = parseNumber(goldPrice);
    const sPrice = parseNumber(silverPrice);
    const d = parseNumber(debts);
    const nisabG = parseNumber(nisabGrams);

    const goldValue = gGrams * gPrice;
    const silverValue = sGrams * sPrice;

    const totalAssets = c + b + inv + bus + goldValue + silverValue;
    const totalLiabilities = d;

    const netZakatable = Math.max(0, totalAssets - totalLiabilities);
    const nisabValue = useGoldNisab ? nisabG * gPrice : nisabG * sPrice;
    const isAboveNisab = netZakatable >= nisabValue;
    const zakatDue = isAboveNisab ? +(netZakatable * 0.025) : 0;

    setResult({
      totalAssets,
      totalLiabilities,
      netZakatable,
      zakatDue,
      nisabValue,
      isAboveNisab,
    });
  };

  const resetForm = () => {
    setCash('0');
    setBank('0');
    setInvestments('0');
    setBusinessAssets('0');
    setGoldGrams('0');
    setSilverGrams('0');
    setGoldPrice('6000');
    setSilverPrice('80');
    setDebts('0');
    setNisabGrams('87.48');
    setUseGoldNisab(true);
    setResult(null);
  };

  return (
    <section id="cta" className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-emerald-700">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div className="text-center lg:text-left">
              <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Universal Muslim Foundation
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-4">
                Your Zakat<br />
                <span className="text-emerald-600">Changes Lives!</span>
              </h1>

              <p className="text-black mb-6 leading-relaxed max-w-md mx-auto lg:mx-0">
                Join us in fulfilling your Islamic duty of Zakat and Sadaqah.
                Every donation brings hope, dignity, and relief to those in need.
              </p>

              {/* Trust Badge */}
              <div className="flex items-center justify-center lg:justify-start gap-3 mt-6">
                <div className="bg-emerald-100 text-emerald-600 rounded-full p-2">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-black">100% Sharia Compliant</p>
                  <p className="text-black text-sm">Zakat Distribution Guaranteed</p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-center lg:items-end">

              {/* Buttons */}
              <div className="flex flex-col gap-4 w-full max-w-sm">
                <button
                  className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow-md"
                >
                  <HandCoins className="w-5 h-5" />
                  Pay Your Zakat
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Heart className="w-5 h-5" />
                  Give Sadaqah
                </button>

                <button
                  onClick={() => { setModalOpen(true); setResult(null); }}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition shadow-sm"
                >
                  Calculate Zakat
                </button>
              </div>

              {/* Impact Stats */}
              <div className="grid grid-cols-3 gap-6 mt-10 pt-6 border-t border-gray-200 w-full max-w-xs text-center">
                <div>
                  <div className="flex items-center justify-center gap-1 text-emerald-600">
                    <Users className="w-4 h-4" />
                    <span className="text-xl font-bold text-black">100%</span>
                  </div>
                  <p className="text-black text-xs">To Needy</p>
                </div>

                <div>
                  <div className="text-xl font-bold text-emerald-600">0%</div>
                  <p className="text-black text-xs">Admin Fees</p>
                </div>

                <div>
                  <div className="text-xl font-bold text-emerald-600">24/7</div>
                  <p className="text-black text-xs">Support</p>
                </div>
              </div>

              <p className="mt-4 text-sm text-black text-center lg:text-right">
                Accepting: Zakat • Sadaqah • Fitra • Khairat • Hadiyah
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ZAKAT MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setModalOpen(false)}
            aria-hidden="true"
          />

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-auto overflow-auto">
            {/* header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-black">Zakat Calculator</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="Close"
              >
                <XIcon className="w-5 h-5 text-black" />
              </button>
            </div>

            {/* body - HORIZONTAL FORM (responsive) */}
            <form onSubmit={calculateZakat} className="p-6 space-y-4">
              <p className="text-sm text-black">
                Enter your assets and liabilities. Gold/silver price per gram should be current market rates.
              </p>

              {/* Horizontal grid: 1 col mobile, 2 on sm, 4 on md+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-xs font-medium text-black">Cash (INR)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cash}
                    onChange={(e) => setCash(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black">Bank (INR)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black">Investments (INR)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={investments}
                    onChange={(e) => setInvestments(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black">Business Assets (INR)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={businessAssets}
                    onChange={(e) => setBusinessAssets(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black">Gold (grams)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={goldGrams}
                    onChange={(e) => setGoldGrams(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black">Gold price / g (INR)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={goldPrice}
                    onChange={(e) => setGoldPrice(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black">Silver (grams)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={silverGrams}
                    onChange={(e) => setSilverGrams(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black">Silver price / g (INR)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={silverPrice}
                    onChange={(e) => setSilverPrice(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black"
                  />
                </div>

                {/* Debts span full width on md+ */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-black">Debts / Liabilities (INR)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={debts}
                    onChange={(e) => setDebts(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black">Nisab base</label>
                  <select
                    value={useGoldNisab ? 'gold' : 'silver'}
                    onChange={(e) => setUseGoldNisab(e.target.value === 'gold')}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black"
                  >
                    <option value="gold">Gold (recommended)</option>
                    <option value="silver">Silver</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-black">Nisab grams</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={nisabGrams}
                    onChange={(e) => setNisabGrams(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black"
                  />
                </div>

              </div>

              {/* actions */}
              <div className="flex items-center gap-3 pt-4">
                <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-emerald-700 transition">
                  Calculate
                </button>

                <button type="button" onClick={resetForm} className="border px-4 py-2 rounded-md hover:bg-grey-50 transition text-black">
                  Reset
                </button>

                <button type="button" onClick={() => setModalOpen(false)} className="ml-auto text-sm text-black hover:underline">
                  Close
                </button>
              </div>

              {/* result */}
              {result && (
                <div className="mt-4 p-4 border rounded-md bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="text-emerald-600">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div className="text-black">
                      <p className="text-sm">
                        Total assets: <span className="font-medium">{formatCurrency(result.totalAssets)}</span>
                      </p>
                      <p className="text-sm">
                        Total liabilities: <span className="font-medium">{formatCurrency(result.totalLiabilities)}</span>
                      </p>
                      <p className="text-sm">
                        Net zakatable wealth: <span className="font-medium">{formatCurrency(result.netZakatable)}</span>
                      </p>
                      <p className="text-sm">
                        Nisab value ({useGoldNisab ? 'gold' : 'silver'} basis): <span className="font-medium">{formatCurrency(result.nisabValue)}</span>
                      </p>

                      {result.isAboveNisab ? (
                        <p className="mt-2 text-sm font-semibold text-emerald-700">
                          Zakat due (2.5%): {formatCurrency(result.zakatDue)}
                        </p>
                      ) : (
                        <p className="mt-2 text-sm font-semibold text-orange-600">
                          Your net zakatable wealth is below the nisab, so zakat is not due.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
