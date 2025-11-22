'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import teamPhoto from '@/public/About_1.png';

export default function AboutUsPremium() {
  return (
    <section id="about" className="py-16 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            About us
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-lg sm:text-xl text-emerald-600 font-semibold max-w-4xl mx-auto"
          >
            A new beginning in Islamic charity built on trust and your generosity
          </motion.p>
        </motion.div>

        {/* Responsive Layout: Text First → Image Below on Mobile */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">

          {/* TEXT CONTENT - Appears FIRST on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
            className="order-1 lg:order-1 space-y-6 text-center lg:text-left"
          >
            {[
              "At Universal Muslim Foundation, we are a young, passionate team on a sacred mission to make giving Zakat and Sadaqah simple, transparent, and deeply rewarding.",
              "Every rupee you entrust to us is handled with the utmost care, following strict Shariah guidelines and a 100% donation policy meaning not a single penny is used for Universal Muslim Foundation team on your Zakat or Sadaqah.",
              "From feeding families in crisis to sponsoring orphans and building clean water solutions we exist to turn your generosity into real, lasting change.",
              "This is more than charity. This is a partnership in goodness. A step toward Jannah. Together."
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.3, duration: 0.7 }}
                className={`text-base sm:text-lg leading-relaxed text-gray-700 ${
                  i === 3 
                    ? "text-emerald-700 font-bold text-xl sm:text-2xl mt-8"
                    : ""
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
              className="pt-10 flex justify-center lg:justify-start"
            >
              <button className="group inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Start Your Giving Journey
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>

          {/* IMAGE - Appears BELOW text on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="order-2 lg:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
              <div className="absolute inset-0 bg-emerald-500 rounded-3xl blur-3xl opacity-20 -z-10"></div>
              <div>
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
        </div>
      </div>
    </section>
  );
}