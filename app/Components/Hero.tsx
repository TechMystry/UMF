'use client';

import React, { useState } from "react";
import { CheckCircle2, Heart, Users, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function NGOHeroSection() {
  const [donationAmount, setDonationAmount] = useState("50");

  return (
    <div id='hero' className="min-h-screen bg-white flex flex-col relative -mt-12 md:-mt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50L80 20L50 50L20 80L50 50Z' fill='%230066cc' fill-opacity='0.2'/%3E%3C/svg%3E")`,
            backgroundSize: "120px 120px",
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Mobile: Image First → Content Below | Desktop: Side by Side */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 xl:gap-20">

            {/* RIGHT SIDE - IMAGE (Appears FIRST on Mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex-1 flex items-center justify-center w-full order-1 lg:order-2"
            >
              <div className="relative w-full max-w-lg">
                <img
                  src="/hero_img.png"
                  alt="Charity and Donation"
                                  />
              </div>
            </motion.div>

            {/* LEFT SIDE - CONTENT (Appears BELOW image on Mobile) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="flex-1 text-center lg:text-left w-full order-2 lg:order-1"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6"
              >
                Together We Can
                <br className="hidden sm:block" />
                <span className="text-emerald-700">Change The World</span>
              </motion.h1>

              {/* Hadees Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                <div className="bg-emerald-50 rounded-2xl p-6 sm:p-8 border border-emerald-100">
                  <p className="text-gray-900 text-lg sm:text-xl lg:text-2xl leading-relaxed text-right font-arabic mb-3">
                    "الزَّكَاةُ تُطَهِّرُ الْمَالَ وَتُرَبِّي الْعِبَادَةَ"
                  </p>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-2">
                    "Zakat purifies wealth and nurtures worship"
                  </p>
                  <p className="text-gray-500 text-sm">- Islamic Teaching</p>
                </div>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
              >
                <button className="bg-emerald-800 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-base sm:text-lg">
                  <Heart className="w-5 h-5" />
                  Donate Now
                </button>
                <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-emerald-50 transition-all duration-300 text-base sm:text-lg">
                  Learn More
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}