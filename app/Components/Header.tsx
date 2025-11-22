'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  // state to keep current moment (updates each second)
  const [now, setNow] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  // New: donate modal state
  const [showDonateModal, setShowDonateModal] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Gregorian (India / IST)
  const gregorian = now.toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Live time in IST (12-hour with seconds)
  const timeIST = now.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }) + ' IST';

  // Hijri (try umalqura first, otherwise fallback to generic islamic)
  const getHijri = (date: Date) => {
    try {
      return new Intl.DateTimeFormat('en-GB-u-ca-islamic-umalqura', {
        timeZone: 'Asia/Kolkata',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date);
    } catch (err) {
      try {
        return new Intl.DateTimeFormat('en-GB-u-ca-islamic', {
          timeZone: 'Asia/Kolkata',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format(date);
      } catch (e) {
        return 'Hijri date unavailable';
      }
    }
  };

  const hijri = getHijri(now);

  // toggle handlers for donate modal
  const openDonateModal = () => setShowDonateModal(true);
  const closeDonateModal = () => setShowDonateModal(false);

  return (
    <header id="header" className="relative">
      {/* Top Bar */}
      <div className="bg-emerald-700 text-white text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 px-4 py-2">
          {/* Left */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>(+91) 9420781681</span>
            </div>

            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Maharashtra, India</span>
            </div>
          </div>

          {/* Right - Gregorian + Live Time + Hijri (condensed on small screens) */}
          <div className="flex items-center gap-3" aria-live="polite">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-white">
              <span className="font-medium">{gregorian}</span>
              <span className="hidden sm:inline-block mx-2 text-white/70">•</span>
              <span className="text-xs text-white/90">{timeIST}</span>
              <span className="hidden md:inline-block mx-2 text-white/70">•</span>
              <span className="text-xs text-white/90 hidden md:inline">Hijri: {hijri}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Split area with nav pill */}
      <div className="relative bg-[linear-gradient(to_bottom,_#047857_0%,_#047857_50%,_white_50%,_white_100%)]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* NAV PILL */}
          <div className="bg-white border border-emerald-500 rounded-full shadow-md px-4 py-3 flex items-center justify-between relative z-10 gap-4">

            {/* Left: Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">UMF</div>
              <span className="hidden sm:inline ml-1 text-lg font-bold text-gray-900">Universal Muslim Foundation</span>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#hero" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium text-sm">Home</a>
              <a href="#about" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium text-sm">About</a>
              <a href="#services" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium text-sm">Causes</a>
              {/* Blog uses Link so it opens the full blog route */}
              <Link href="/Blogs" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium text-sm">Blog</Link>
              <a href="#contact" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium text-sm">Contact</a>

              {/* Donate button — now opens modal with two options */}
              <button
                onClick={openDonateModal}
                className="bg-emerald-600 text-white px-4 py-1.5 rounded-full font-semibold hover:bg-emerald-700 transition-all text-sm"
                aria-haspopup="dialog"
                aria-expanded={showDonateModal}
                aria-controls="donate-modal"
              >
                Donate
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label="Toggle navigation"
                className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

          </div>

          {/* Mobile dropdown (full width, accessible) */}
          <div className={`md:hidden mt-2 transition-all ${open ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg border border-emerald-100 shadow-sm py-3 px-4 flex flex-col gap-2">
              <a href="#hero" className="text-gray-700 py-2">Home</a>
              <a href="#about" className="text-gray-700 py-2">About</a>
              <a href="#services" className="text-gray-700 py-2">Causes</a>
              {/* mobile blog link uses an anchor so we wrap Link as block below */}
              <Link href="/Blogs" className="text-gray-700 py-2 block">Blog</Link>
              <a href="#contact" className="text-gray-700 py-2">Contact</a>

              {/* Mobile donate entry — opens same modal */}
              <button
                onClick={openDonateModal}
                className="bg-emerald-600 text-white text-center py-2 rounded-full mt-1"
              >
                Donate
              </button>

              {/* condensed timing row for small screens */}
              <div className="pt-2 border-t border-emerald-50 text-xs text-gray-600">
                <div>{gregorian}</div>
                <div className="mt-1">{timeIST} • Hijri: {hijri}</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Donate modal (no other changes to header) */}
      {showDonateModal && (
        <div
          id="donate-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="donate-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
        >
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
            <div className="p-4 border-b">
              <h3 id="donate-modal-title" className="text-lg font-semibold text-gray-900">Donate</h3>
              <p className="text-sm text-gray-600 mt-1">Choose how you want to give</p>
            </div>

            <div className="p-4 grid grid-cols-1 gap-4">
              {/* image from uploaded file (local path supplied) */}
              <div className="w-full flex items-center justify-center">
                <img
                  src="/D1.png"
                  alt="donate visual"
                  className="w-full max-w-xs object-contain rounded-md"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/register" className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-full font-semibold transition">
                  Register & Donate
                </Link>

                <Link href="/donate/quick" className="flex-1 inline-flex items-center justify-center gap-2 border border-emerald-600 text-emerald-700 px-4 py-2 rounded-full font-semibold transition">
                  Quick Donate
                </Link>
              </div>

              <div className="pt-2">
                <button
                  onClick={closeDonateModal}
                  className="w-full text-sm text-gray-600 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
