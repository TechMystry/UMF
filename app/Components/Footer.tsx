'use client';

import React from 'react';
import {
  Moon,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Heart,
  ArrowUp
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      className="relative text-white overflow-hidden bg-cover bg-center bg-fixed min-h-screen"
      style={{
        backgroundImage: "url('/footer_bg_img.jpg')",
      }}
    >
      {/* Dark overlay for main content */}
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 — Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Moon className="w-10 h-10 text-emerald-400" />
              <h3 className="text-2xl font-bold">Universal Muslim Foundation</h3>
            </div>
            <p className="text-gray-200 leading-relaxed text-sm">
              Serving humanity with compassion and barakah.<br />
              100% of your Zakat & Sadaqah reaches those in need.
            </p>
            <div className="flex items-center gap-2 text-emerald-300">
              <Heart className="w-5 h-5 fill-current" />
              <span className="font-medium text-sm">Trusted by thousands worldwide</span>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-emerald-400">Quick Links</h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li><a href="#hero" className="hover:text-emerald-300 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-emerald-300 transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-emerald-300 transition-colors">Our Services</a></li>
              <li><a href="#get-involved" className="hover:text-emerald-300 transition-colors">Get Involved</a></li>
              <li><a href="#cta" className="hover:text-emerald-300 transition-colors">Donate</a></li>
              <li><a href="#contact" className="hover:text-emerald-300 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3 — Contact + Social */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-emerald-400">Get in Touch</h4>
            <div className="space-y-3 text-gray-200 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-emerald-400 mt-1" />
                <div>
                  <p>Mohol, Solapur</p>
                  <p className="text-gray-300">Maharashtra, India</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-emerald-400" />
                <p>(+91) 9420781681</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-emerald-400" />
                <p>info@universalmuslimfoundation.org</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-emerald-500/80 transition-all group"
                >
                  <Icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright & Credit — Left & Right Aligned */}
        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 max-w-5xl mx-auto">
            <p>© 2025 Universal Muslim Foundation. All rights reserved.</p>

            <p className="flex items-center gap-1.5">
              Developed with <Heart className="w-4 h-4 fill-emerald-400 text-emerald-400" /> by{' '}
              <a
                href="https://wa.me/918805526198"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-300 hover:text-yellow-300 transition-colors"
              >
                TechMystry
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* BIG TEXT — Moved UP, perfect single line */}
<div className="absolute inset-x-0 bottom-24 md:bottom-32 text-center">
  <h1
    className="text-white font-black tracking-tighter leading-none inline-block"
    style={{
      fontSize: 'clamp(2rem, 6.8vw, 6.8rem)',
      letterSpacing: '-0.04em',
      textShadow: '0 12px 40px rgba(0,0,0,0.95)',
      whiteSpace: 'nowrap',
      transform: 'translateX(-0.4%)',   // ← This moves it left by ~1 letter
      maxWidth: '100vw',
      overflow: 'hidden',
    }}
  >
    Universal Muslim Foundation
  </h1>
</div>

      {/* Back to Top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-2xl flex items-center justify-center z-50 transition-all hover:scale-110"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
      >
        <ArrowUp className="w-7 h-7 text-white" />
      </motion.button>
    </footer>
  );
}