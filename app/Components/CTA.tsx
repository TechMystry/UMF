'use client';

import React, { useState, useEffect } from 'react';
import {
  Heart,
  ArrowRight,
  HandCoins,
  Users,
  Shield,
  X as XIcon,
  CheckCircle,
  Loader2,
} from 'lucide-react';

// Types for gold and silver API response
interface GoldPriceData {
  price: number;
  currency: string;
}

interface SilverPriceData {
  price: number;
  currency: string;
}

export default function CTA() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [goldPrice, setGoldPrice] = useState<string>('6000');
  const [silverPrice, setSilverPrice] = useState<string>('80');

  // Zakat form state
  const [cash, setCash] = useState<string>('0');
  const [bank, setBank] = useState<string>('0');
  const [investments, setInvestments] = useState<string>('0');
  const [businessAssets, setBusinessAssets] = useState<string>('0');
  const [goldGrams, setGoldGrams] = useState<string>('0');
  const [silverGrams, setSilverGrams] = useState<string>('0');
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

  // Fetch real gold and silver prices
  const fetchGoldPrice = async (): Promise<number> => {
    try {
      // Using a free gold price API (example - you might need to replace with a working free API)
      const response = await fetch('https://api.metals.live/v1/spot/gold');
      const data = await response.json();
      return data[0]?.price || 6000; // Fallback to 6000 if API fails
    } catch (error) {
      console.error('Error fetching gold price:', error);
      return 6000; // Default fallback price
    }
  };

  const fetchSilverPrice = async (): Promise<number> => {
    try {
      // Using a free silver price API (example - you might need to replace with a working free API)
      const response = await fetch('https://api.metals.live/v1/spot/silver');
      const data = await response.json();
      return data[0]?.price || 80; // Fallback to 80 if API fails
    } catch (error) {
      console.error('Error fetching silver price:', error);
      return 80; // Default fallback price
    }
  };

  const fetchMarketPrices = async () => {
    setLoading(true);
    try {
      const [gold, silver] = await Promise.all([
        fetchGoldPrice(),
        fetchSilverPrice()
      ]);
      
      setGoldPrice(gold.toString());
      setSilverPrice(silver.toString());
    } catch (error) {
      console.error('Error fetching market prices:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchMarketPrices();
    }
  }, [isModalOpen]);

  const parseNumber = (val: string) => {
    const n = Number(val.toString().replace(/,/g, '').trim());
    return Number.isFinite(n) ? n : 0;
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });
  };

  // Live calculation effect
  useEffect(() => {
    const calculateZakat = () => {
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

    calculateZakat();
  }, [
    cash, bank, investments, businessAssets, 
    goldGrams, silverGrams, goldPrice, silverPrice, 
    debts, nisabGrams, useGoldNisab
  ]);

  const resetForm = () => {
    setCash('0');
    setBank('0');
    setInvestments('0');
    setBusinessAssets('0');
    setGoldGrams('0');
    setSilverGrams('0');
    setDebts('0');
    setNisabGrams('87.48');
    setUseGoldNisab(true);
    setResult(null);
    fetchMarketPrices(); // Refresh prices on reset
  };

  const handlePayNow = () => {
    // Here you would integrate with your payment gateway
    alert('Redirecting to payment gateway...');
    // window.location.href = '/payment'; // Uncomment and set your payment route
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

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-auto overflow-auto max-h-[90vh]">
            {/* header */}
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
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
            <div className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <p className="text-sm text-black flex-1">
                  Enter your assets and liabilities. Calculations update automatically as you type.
                </p>
                
                {/* Refresh Prices Button */}
                <button
                  type="button"
                  onClick={fetchMarketPrices}
                  disabled={loading}
                  className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-200 transition disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : null}
                  Refresh Gold/Silver Prices
                </button>
              </div>

              {/* Current Prices Display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center sm:text-left">
                  <span className="text-sm font-medium text-gray-700">Current Gold Price:</span>
                  <span className="ml-2 text-sm font-semibold text-amber-600">
                    {formatCurrency(parseNumber(goldPrice))}/gram
                    {loading && <Loader2 className="w-3 h-3 animate-spin inline ml-1" />}
                  </span>
                </div>
                <div className="text-center sm:text-right">
                  <span className="text-sm font-medium text-gray-700">Current Silver Price:</span>
                  <span className="ml-2 text-sm font-semibold text-gray-600">
                    {formatCurrency(parseNumber(silverPrice))}/gram
                    {loading && <Loader2 className="w-3 h-3 animate-spin inline ml-1" />}
                  </span>
                </div>
              </div>

              {/* Horizontal grid: 1 col mobile, 2 on sm, 4 on md+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-xs font-medium text-black">Cash (INR)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cash}
                    onChange={(e) => setCash(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black">Bank (INR)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black">Investments (INR)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={investments}
                    onChange={(e) => setInvestments(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black">Business Assets (INR)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={businessAssets}
                    onChange={(e) => setBusinessAssets(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black">Gold (grams)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={goldGrams}
                    onChange={(e) => setGoldGrams(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black">Gold price / g (INR)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={goldPrice}
                    onChange={(e) => setGoldPrice(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
                    placeholder="6000"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black">Silver (grams)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={silverGrams}
                    onChange={(e) => setSilverGrams(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black">Silver price / g (INR)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={silverPrice}
                    onChange={(e) => setSilverPrice(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
                    placeholder="80"
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
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black">Nisab base</label>
                  <select
                    value={useGoldNisab ? 'gold' : 'silver'}
                    onChange={(e) => setUseGoldNisab(e.target.value === 'gold')}
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                    className="mt-1 w-full border rounded-md px-3 py-2 text-black focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="87.48"
                  />
                </div>

              </div>

              {/* actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                <button type="button" onClick={resetForm} className="w-full sm:w-auto border px-4 py-2 rounded-md hover:bg-gray-50 transition text-black font-medium">
                  Reset Form
                </button>

                <button type="button" onClick={() => setModalOpen(false)} className="w-full sm:w-auto ml-auto text-sm text-black hover:underline font-medium">
                  Close Calculator
                </button>
              </div>

              {/* result */}
              {result && (
                <div className="mt-6 p-4 border rounded-lg bg-gray-50 border-emerald-200">
                  <div className="flex items-start gap-3">
                    <div className="text-emerald-600 mt-1">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div className="text-black flex-1">
                      <h4 className="font-semibold text-lg mb-3 text-emerald-700">Zakat Calculation Result</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <div className="space-y-2">
                          <p className="text-sm flex justify-between">
                            <span>Total Assets:</span>
                            <span className="font-medium">{formatCurrency(result.totalAssets)}</span>
                          </p>
                          <p className="text-sm flex justify-between">
                            <span>Total Liabilities:</span>
                            <span className="font-medium">{formatCurrency(result.totalLiabilities)}</span>
                          </p>
                          <p className="text-sm flex justify-between">
                            <span>Net Zakatable Wealth:</span>
                            <span className="font-medium">{formatCurrency(result.netZakatable)}</span>
                          </p>
                          <p className="text-sm flex justify-between">
                            <span>Nisab Value ({useGoldNisab ? 'gold' : 'silver'}):</span>
                            <span className="font-medium">{formatCurrency(result.nisabValue)}</span>
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-center">
                          {result.isAboveNisab ? (
                            <div className="text-center">
                              <p className="text-2xl font-bold text-emerald-700 mb-2">
                                {formatCurrency(result.zakatDue)}
                              </p>
                              <p className="text-sm font-semibold text-emerald-600">
                                Zakat Due (2.5%)
                              </p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <p className="text-lg font-semibold text-orange-600 mb-2">
                                Below Nisab Threshold
                              </p>
                              <p className="text-sm text-orange-600">
                                Zakat is not due
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Pay Now Button - Only show if Zakat is due */}
                      {result.isAboveNisab && result.zakatDue > 0 && (
                        <div className="mt-4 pt-4 border-t border-emerald-200">
                          <button
                            onClick={handlePayNow}
                            className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow-md"
                          >
                            <HandCoins className="w-5 h-5" />
                            Pay Zakat Now - {formatCurrency(result.zakatDue)}
                            <ArrowRight className="w-5 h-5" />
                          </button>
                          <p className="text-xs text-center text-gray-600 mt-2">
                            100% of your Zakat goes directly to those in need
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}