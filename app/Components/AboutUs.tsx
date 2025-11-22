'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import teamPhoto from '@/public/About_1.png';

export default function AboutUsPremium() {
  return (
    <section id="about" className="min-h-screen bg-white flex items-center justify-center py-16 lg:py-20 overflow-hidden -mt-12 md:-mt-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 w-full">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16 xl:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            About us
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 text-base sm:text-lg md:text-xl text-emerald-600 font-semibold max-w-4xl mx-auto px-4"
          >
            A new beginning in Islamic charity built on trust and your generosity
          </motion.p>
        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-center">

          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -80, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            // CHANGED: moved image slightly upward
            className="order-2 lg:order-1 flex justify-center lg:justify-end -mt-12 lg:-mt-20"
          >
            <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
              <div className="absolute inset-0 bg-emerald-500 rounded-3xl blur-3xl opacity-20 -z-10 scale-95"></div>
              <div className="rounded-3xl overflow-hidden shadow-2xl border-8 sm:border-12 border-white">
                <Image
                  src={teamPhoto}
                  alt="Universal Muslim Foundation Team"
                  width={1200}
                  height={900}
                  className="w-full h-auto object-cover transition-transform duration-1000 hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 80vw, 600px"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Text */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
            className="space-y-6 sm:space-y-7 order-1 lg:order-2 text-center lg:text-left"
          >
            {[
              "At Universal Muslim Foundation, we are a young, passionate team on a sacred mission to make giving Zakat and Sadaqah simple, transparent, and deeply rewarding.",
              "Every rupee you entrust to us is handled with the utmost care, following strict Shariah guidelines and a 100% donation policy meaning not a single penny is used for Universal Muslim Foundation team on your Zakat or Sadaqah.",
              "From feeding families in crisis to sponsoring orphans and building clean water solutions we exist to turn your generosity into real, lasting change.",
              "This is more than charity. This is a partnership in goodness. A step toward Jannah. Together."
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.3, duration: 0.7 }}
                className={`text-sm sm:text-base md:text-lg leading-relaxed px-4 lg:px-0 ${
                  i === 3 
                    ? "text-emerald-700 font-bold text-lg sm:text-xl md:text-2xl mt-4"
                    : "text-gray-700"
                }`}
              >
                {text}
              </motion.p>
            ))}

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="pt-8 sm:pt-10 flex justify-center lg:justify-start"
            >
                <button className="group inline-flex items-center gap-3 sm:gap-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-7 sm:px-9 py-3.5 sm:py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 -mt-12">
                Start Your Giving Journey
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-3 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
