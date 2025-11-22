'use client';

import React, { useEffect, useState } from 'react';

/**
 * AnimatedDonateMockup
 * - uses the uploaded artwork at /mnt/data/936675b5-ee01-4e09-bb2d-c4a9e42b9cad.png
 * - hand slides in from right, coins animate falling into the donation box and accumulate
 *
 * Drop-in ready. Tailwind classes are used; component also contains local CSS for the animations.
 */

export default function AnimatedDonateMockup() {
  const IMAGE_SRC = '/mnt/data/936675b5-ee01-4e09-bb2d-c4a9e42b9cad.png';
  const [tick, setTick] = useState(0);

  // loop tick to re-run the animation every 5.5s
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 5500);
    return () => clearInterval(id);
  }, []);

  // number of animated coins per cycle
  const COIN_COUNT = 5;
  // coordinates (percent) near the coin slot where coins "land"
  // adjust if your source image has a different slot position
  const BOX_LAND_X = 50; // percent horizontally (50% -> center), tweak if needed
  const BOX_LAND_Y = 58; // percent vertically, tweak to line up with slot

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative rounded-lg overflow-visible">
        {/* Base artwork (your uploaded mockup) */}
        <img
          src={IMAGE_SRC}
          alt="Donate mockup"
          className="w-full h-auto block object-contain"
          style={{ userSelect: 'none', pointerEvents: 'none' }}
        />

        {/* Animated hand (svg) — slides in from right over the image */}
        <div
          key={`hand-${tick}`} // remount to re-trigger CSS animation reliably
          className="absolute top-[6%] right-[-8%] md:top-[4%] md:right-[-6%] lg:top-[2%] lg:right-[-2%] pointer-events-none"
          style={{
            width: '28%', // relative to image width
            maxWidth: 280,
            transformOrigin: 'center',
            animation: 'hand-slide 5.5s linear forwards',
            zIndex: 30,
          }}
          aria-hidden
        >
          {/* simple hand SVG (keeps look consistent and animatable) */}
          <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" className="w-full h-auto">
            <g transform="translate(0,6)">
              <path d="M196 24c-6-12-18-22-30-22-6 0-11 3-16 7l-8 7c-4 3-9 4-14 3-7-2-12-9-17-11-7-3-16-1-22 4-5 5-7 12-9 20-1 6-3 12-8 16-5 4-13 5-20 7-11 3-20 10-29 17-6 5-11 11-13 19-3 13 4 26 12 36 16 20 46 29 73 28 41-1 79-28 90-66 3-9 4-19 1-28-4-10-9-19-14-28z" fill="#f5d3b6"/>
            </g>
          </svg>
        </div>

        {/* Animated coins: we create multiple coin elements, each animates at staggered intervals */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {Array.from({ length: COIN_COUNT }).map((_, i) => {
            // stagger start time for each coin
            const delay = 0.25 * i;
            // random horizontal jitter (small) to make drops look natural
            const jitter = (i - COIN_COUNT / 2) * 6;
            return (
              <div
                key={`coin-${tick}-${i}`}
                className="absolute"
                style={{
                  // start near the right edge; coords are percent of container
                  left: `${70 + jitter * 0.12}%`,
                  top: `${8 + i * 1}%`,
                  width: 36,
                  height: 36,
                  transform: 'translate3d(-50%, -50%, 0)',
                  zIndex: 25,
                  animation: `coin-drop 1.0s ${delay + 0.15}s cubic-bezier(.2,.9,.3,1) forwards, coin-bounce 0.5s ${delay + 1.05}s ease forwards`,
                }}
              >
                {/* coin visual */}
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at 30% 30%, #ffd86b, #f6a800 60%)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
                    border: '2px solid rgba(0,0,0,0.06)',
                    color: '#8a4b00',
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  ₹
                </div>
              </div>
            );
          })}

          {/* small settled coins pile (appear after animation) */}
          <div
            className="absolute"
            style={{
              left: `${BOX_LAND_X}%`,
              top: `${BOX_LAND_Y}%`,
              transform: 'translate(-50%,-50%)',
              width: 72,
              height: 42,
              zIndex: 22,
              pointerEvents: 'none',
              // fade in after coins land
              animation: 'pile-appear 1.5s 1.3s forwards',
              opacity: 0,
            }}
          >
            {/* stacked ellipse coins to simulate accumulation */}
            <div style={{ position: 'absolute', inset: 0 }}>
              <div style={{ position: 'absolute', left: '10%', top: '0%', width: '80%', height: 10, borderRadius: 999, background: 'linear-gradient(90deg,#f6a800,#ffd86b)' , boxShadow:'0 3px 6px rgba(0,0,0,0.12)'}} />
              <div style={{ position: 'absolute', left: '6%', top: '9%', width: '88%', height: 10, borderRadius: 999, background: 'linear-gradient(90deg,#f2a400,#ffd86b)', boxShadow:'0 2px 4px rgba(0,0,0,0.1)' }} />
              <div style={{ position: 'absolute', left: '4%', top: '18%', width: '92%', height: 10, borderRadius: 999, background: 'linear-gradient(90deg,#e88e00,#ffd86b)', boxShadow:'0 1px 3px rgba(0,0,0,0.08)' }} />
            </div>
          </div>
        </div>

        {/* overlay controls (for demo) */}
        <div className="absolute left-4 bottom-4 z-40 flex items-center gap-3">
          <button
            onClick={() => setTick(t => t + 1)}
            className="bg-emerald-600 text-white text-xs px-3 py-2 rounded-md shadow"
            title="Replay animation"
          >
            Replay
          </button>
          <span className="text-xs text-gray-600 bg-white/90 px-2 py-1 rounded">Auto-loop</span>
        </div>

        {/* Styles (local) */}
        <style>{`
          /* Hand slide: starts off-screen right -> slide to centered hand pos -> hold -> exit */
          @keyframes hand-slide {
            0%   { transform: translateX(4%) scale(1) rotate(0deg); opacity: 0; }
            12%  { transform: translateX(0%) scale(1.02) rotate(-2deg); opacity: 1; }
            40%  { transform: translateX(-6%) scale(1.02) rotate(-4deg); }
            60%  { transform: translateX(-6%) scale(1.02) rotate(-4deg); } /* hold while coins drop */
            85%  { transform: translateX(6%) scale(1) rotate(0deg); opacity: 1; }
            100% { transform: translateX(12%) scale(0.98) rotate(0deg); opacity: 0; }
          }

          /* coin drop: fall from hand to box slot (vertical movement) */
          @keyframes coin-drop {
            0%   { transform: translate3d(-50%,-50%,0) translateY(-6vh) scale(0.98); opacity: 0; }
            60%  { transform: translate3d(-50%,-50%,0) translateY(36vh) scale(1.02); opacity: 1; }
            100% { transform: translate3d(-50%,-50%,0) translateY(36vh) scale(1); opacity: 1; }
          }

          /* small bounce on contact */
          @keyframes coin-bounce {
            0% { transform: translateY(0) scaleY(1); }
            25% { transform: translateY(-10%) scaleY(0.95); }
            50% { transform: translateY(0) scaleY(1); }
            100% { transform: translateY(0) scaleY(1); }
          }

          /* pile appear */
          @keyframes pile-appear {
            0% { opacity: 0; transform: translate(-50%,-45%) scale(0.9); }
            60% { opacity: 0.8; transform: translate(-50%,-48%) scale(1.03); }
            100% { opacity: 1; transform: translate(-50%,-50%) scale(1); }
          }

          /* blur helper for glow circle */
          .blur-3xl { filter: blur(46px); }

          /* responsive tweaks */
          @media (max-width: 640px) {
            /* make hand smaller on mobile */
            .hand-small { width: 38% !important; max-width: 160px !important; }
          }
        `}</style>
      </div>
    </div>
  );
}
