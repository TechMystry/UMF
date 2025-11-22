'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, BookOpen, Droplets, HeartHandshake } from 'lucide-react';

export default function OurServices() {
  const services = [
    {
      icon: <Utensils className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />,
      title: "Feed the Hungry",
      description: "We provide hot, nutritious meals to families who haven’t eaten properly in days — your Sadaqah becomes their hope."
    },
    {
      icon: <BookOpen className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />,
      title: "Education",
      description: "Sponsor an orphan’s schooling — books, uniform, and fees — so they can dream of a better tomorrow."
    },
    {
      icon: <Droplets className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />,
      title: "Clean Water",
      description: "Build hand pumps and water wells that give pure water to entire villages — flowing Sadaqah Jariyah for decades."
    },
    {
      icon: <HeartHandshake className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />,
      title: "Medical Aid",
      description: "Life-saving treatment, medicines, and surgeries for the poor who cannot afford even basic healthcare."
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 sm:mb-16 lg:mb-20 xl:mb-24"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4 leading-tight">
            Our Causes
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-emerald-600 font-semibold max-w-3xl mx-auto px-4">
            Where your Zakat & Sadaqah makes a real difference
          </p>
        </motion.div>

        {/* Services Grid - Fully Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-14 xl:gap-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.8,
                ease: "easeOut"
              }}
              className="group flex flex-col items-start text-left"
            >
              {/* Icon with hover scale */}
              <div className="text-emerald-600 mb-6 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                {service.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg lg:text-base xl:text-lg">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}