'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Share2, MessageCircle } from 'lucide-react';

export default function GetInvolvedSection() {
  const waysToHelp = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Donate",
      description: "Start with your first donation every contribution today builds a stronger foundation for tomorrow.",
      action: "Donate Now",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Volunteer",
      description: "Join our growing volunteer family. Your time, skills, and presence can touch countless lives.",
      action: "Join Us",
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Spread Awareness",
      description: "Share our mission with your circle. One share can inspire someone to make a life-changing impact.",
      action: "Share",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Partner With Us",
      description: "If you're part of an organization, let’s collaborate and strategically amplify the positive change we create together.",
      action: "Contact",
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.2, ease: "easeOut" } as any
    }),
  };

  return (
    <section id="get-involved" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative -mt-12 md:-mt-16">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-4 tracking-tight">
            Get Involved
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Be part of our founding community and shape a future filled with hope, compassion, and action.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {waysToHelp.map((way, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              custom={index}
              viewport={{ once: true, amount: 0.3 }}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 p-7 text-center hover:-translate-y-2 hover:bg-emerald-50"
            >
              {/* Icon Wrapper */}
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner group-hover:bg-emerald-200 transition-all">
                <span className="text-emerald-700 group-hover:scale-110 transition-transform">
                  {way.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-emerald-700 mb-3">
                {way.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                {way.description}
              </p>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2.5 rounded-lg font-semibold border-2 border-emerald-600 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-all"
              >
                {way.action}
              </motion.button>
            </motion.div>
          ))}
        </div>

      </div>

      {/* subtle background decoration */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-100 rounded-full opacity-20 blur-2xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-52 h-52 bg-emerald-200 rounded-full opacity-20 blur-3xl -z-10"></div>
    </section>
  );
}
