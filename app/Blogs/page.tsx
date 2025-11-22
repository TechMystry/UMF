'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Heart, BookOpen, FileQuestionMark, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: "The 8 Categories of Zakat Recipients in Quran (Surah At-Tawbah 9:60)",
    excerpt: "Allah specifies exactly 8 groups eligible for Zakat: The poor (Fuqara), needy (Masakin), Zakat collectors (Amilin), those whose hearts are reconciled (Muallafah), freeing captives/slaves (Riqab), debtors (Gharimin), in Allah's cause (Fi Sabilillah), and wayfarers (Ibnus Sabil). Learn who qualifies and why.",
    author: "Mufti Zubair Ahmed",
    date: "November 20, 2025",
    readTime: "8 min read",
    image: "/Blogs/Post1.png",
    slug: "8-categories-zakat-recipients",
    category: "Quranic Guidance"
  },
  {
    id: 2,
    title: "Authentic Hadith: Prophet ﷺ Sending Mu’adh to Yemen on Zakat",
    excerpt: "The Prophet ﷺ instructed Mu’adh ibn Jabal: 'Tell them Allah has made obligatory for them to pay Zakat from their wealth, to be taken from the rich and distributed to the poor.' (Sahih Bukhari). Explore this key hadith on Zakat's implementation.",
    author: "Imam Ahmed Khan",
    date: "November 18, 2025",
    readTime: "5 min read",
    image: "/Blogs/Post2.png",
    slug: "hadith-muadh-yemen-zakat",
    category: "Hadith & Sunnah"
  },
  {
    id: 3,
    title: "Fatwa: Can You Pay Zakat in Advance? Views from 4 Madhabs",
    excerpt: "Hanafi: Permissible if intended for due Zakat. Shafi’i: Allowed but not voluntary. Maliki & Hanbali: Preferable after Hawl. Detailed rulings on early Zakat payment.",
    author: "Sheikh Yusuf",
    date: "November 15, 2025",
    readTime: "6 min read",
    image: "/Blogs/Post3.png",
    slug: "pay-zakat-in-advance",
    category: "Fatwa & Rulings"
  },
  {
    id: 4,
    title: "Sadaqah Jariyah: 7 Deeds That Continue Rewarding After Death",
    excerpt: "Prophet ﷺ: 'When a person dies, deeds end except three: Sadaqah Jariyah, beneficial knowledge, righteous child.' Examples: Building wells, planting trees, teaching Quran, sponsoring orphans, constructing mosques, sharing Islamic books, digital Dawah.",
    author: "Sister Ayesha Rahman",
    date: "November 12, 2025",
    readTime: "9 min read",
    image: "/Blogs/Post4.png",
    slug: "sadaqah-jariyah-benefits",
    category: "Ongoing Charity"
  },
  {
    id: 5,
    title: "Zakat Nisab 2025 India: Gold ₹6,99,840 | Silver ₹61,236",
    excerpt: "Current Nisab: 87.48g gold (₹8,000/g) or 612.36g silver (₹100/g). Calculate 2.5% on savings, gold/silver jewelry, investments held 1 lunar year. Deduct debts.",
    author: "UMF Research Team",
    date: "November 10, 2025",
    readTime: "4 min read",
    image: "/Blogs/Post5.png",
    slug: "zakat-nisab-gold-silver-india",
    category: "Zakat Calculator"
  },
  {
    id: 6,
    title: "Impact Story: Your Zakat Fed 300 Flood Victims in Assam",
    excerpt: "Last monsoon, UMF distributed Zakat to 300 families in Assam floods. Photos, testimonials: 'Your aid saved our lives – JazakAllah.' See how Zakat reaches real needs.",
    author: "Field Officer Bilal",
    date: "November 8, 2025",
    readTime: "7 min read",
    image: "/Blogs/Post6.png",
    slug: "zakat-flood-relief-assam",
    category: "Real Impact"
  },
  {
    id: 7,
    title: "10 Hadiths on Zakat's Rewards: Multiplied 700x by Allah",
    excerpt: "Hadith: 'Charity extinguishes sin like water fire' (Tirmidhi). 'Zakat bridge to Jannah' (Muslim). 'No Zakat = hypocrisy sign' (Bukhari). Full list with Arabic.",
    author: "Hafiz Omar",
    date: "November 5, 2025",
    readTime: "10 min read",
    image: "/Blogs/Post7.png",
    slug: "10-hadiths-zakat-rewards",
    category: "Hadith Collection"
  },
  {
    id: 8,
    title: "Zakat on Cryptocurrency & Stocks: Modern Rulings Explained",
    excerpt: "Crypto as trade goods: 2.5% on profits after Hawl. Stocks: If investment, value-based; if trading, inventory. Fiqh Council rulings for 2025.",
    author: "Dr. Fatima Ali",
    date: "November 2, 2025",
    readTime: "6 min read",
    image: "/Blogs/Post8.png",
    slug: "zakat-crypto-stocks-modern",
    category: "Contemporary Issues"
  },
  {
    id: 9,
    title: "Zakat al-Fitr 2025: Amount, Timing, Who Pays & Distributes",
    excerpt: "Due before Eid prayer: 3kg staple food (wheat ₹250/person in India). Obligatory on every Muslim, including children. Purifies fasting from vain talk.",
    author: "Mufti Khalid",
    date: "October 30, 2025",
    readTime: "5 min read",
    image: "/Blogs/Post9.png",
    slug: "zakat-fitr-2025-guide",
    category: "Ramadan Essentials"
  },
];

const benefitsOfZakat = [
  "Purifies wealth & soul (Quran 9:103)",
  "Increases barakah & rizq (Hadith: Bukhari)",
  "Extinguishes sins like water fire (Tirmidhi)",
  "Protection from Hellfire (Muslim)",
  "Shade on Day of Judgment (Bukhari)",
  "Rewards multiplied 700 times (Quran 2:261)",
  "Draws closer to Allah (Surah Al-Baqarah)",
  "Strengthens ummah bonds (Global Sadaqah)",
  "Fosters gratitude & humility (SAPA-USA)",
  "Promotes social justice (Wikipedia)"
];

const hadiths = [
  {
    arabic: "إِنَّ الصَّدَقَةَ تُطْفِئُ الْخَطِيئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ",
    english: "“Charity extinguishes sin as water extinguishes fire.”",
    source: "Tirmidhi 614 | Sahih"
  },
  {
    arabic: "الزَّكَاةُ جِسْرُ الْإِسْلَامِ",
    english: "“Zakat is the bridge of Islam.”",
    source: "Sunan Ibn Majah | Hasan"
  },
  {
    arabic: "مَا مِنْ يَوْمٍ يُصْبِحُ عَلَى الْعِبَادِ إِلَّا وَمَلَكَانِ يَنْزِلَانِ فَيَقُولُ أَحَدُهُمَا اللَّهُمَّ أَعْطِ مُنْفِقًا خَلَفًا وَيَقُولُ الْآخَرُ اللَّهُمَّ أَمْسِكْ عَلَى مُمْسِكٍ",
    english: "“Every morning two angels descend: One says, 'O Allah, give the spender a successor,' and the other, 'O Allah, hold back the withholder.'”",
    source: "Tirmidhi 2325 | Sahih"
  },
  {
    arabic: "الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ وَفِي كُلٍّ خَيْرٌ احْرِصْ عَلَى مَا يَنْفَعُكَ وَاسْتَعِنْ عَلَى اللَّهِ وَلَا تَعْجَزْ",
    english: "“The strong believer is better and more beloved to Allah than the weak believer, though there is good in both. Be eager for what benefits you, seek Allah's help, and do not be weak.”",
    source: "Muslim 2664"
  }
];

const faqs = [
  {
    question: "Who is eligible to pay Zakat?",
    answer: "Muslim adults of sound mind with wealth ≥ Nisab (87.48g gold or 612.36g silver) held for 1 lunar year. Children with wealth pay via guardian."
  },
  {
    question: "What is Nisab for 2025 in India?",
    answer: "Gold: ₹6,99,840 (87.48g @ ₹8,000/g). Silver: ₹61,236 (612.36g @ ₹100/g). Use lower silver threshold per Hanafi madhab."
  },
  {
    question: "Can Zakat be given to non-Muslims?",
    answer: "Yes, under 'reconciliation of hearts' or wayfarers categories, but majority view prefers Muslims. Consult local scholar."
  },
  {
    question: "Is Zakat due on gold jewelry?",
    answer: "Yes, if held for investment/trade. Personal use exempt per some schools, but Hanafi includes all gold/silver."
  },
  {
    question: "Can I pay Zakat to family?",
    answer: "No to parents, children, spouse. Yes to siblings, cousins, uncles/aunts if needy and below Nisab."
  },
  {
    question: "What if wealth dips below Nisab mid-year?",
    answer: "Restart Hawl (lunar year) from when it reaches Nisab again. No Zakat due if never held full year."
  },
  {
    question: "How to calculate Zakat on business assets?",
    answer: "2.5% on market value of inventory/goods held 1 year, after debts. Exclude fixed assets like machinery."
  },
  {
    question: "When is Zakat al-Fitr due?",
    answer: "Before Eid prayer. Amount: 3-5kg staple food (wheat ₹250/person in India 2025) or cash equivalent."
  },
  {
    question: "Can Zakat fund mosques or schools?",
    answer: "No, directly. But yes if for poor students/orphans under eligible categories."
  },
  {
    question: "What if I can't find direct recipients?",
    answer: "Give to trusted Shariah-compliant NGOs like UMF that distribute to 8 Quranic categories."
  }
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
            Ultimate Guide to Zakat & Sadaqah
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Authentic Quranic verses, Hadiths, benefits, rulings, FAQs, and real impact stories. Fulfill your obligation with knowledge from trusted Islamic sources.
          </p>
        </motion.div>

        {/* Benefits + Hadith Highlight */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 md:p-8 overflow-y-auto max-h-96"
          >
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-emerald-600" />
              <h3 className="text-xl md:text-2xl font-bold text-emerald-800">10+ Spiritual & Social Benefits of Zakat</h3>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              {benefitsOfZakat.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-900 to-emerald-700 text-white rounded-2xl p-6 md:p-8 space-y-4"
          >
            <BookOpen className="w-10 h-10 mb-4 opacity-90" />
            <div className="space-y-3">
              {hadiths.slice(0, 2).map((hadith, i) => (
                <div key={i} className="text-right">
                  <p className="text-lg font-bold leading-relaxed font-arabic mb-1">{hadith.arabic}</p>
                  <p className="text-base italic">"{hadith.english}"</p>
                  <p className="text-xs opacity-90 mt-1">{hadith.source}</p>
                </div>
              ))}
            </div>
            <Link href="/blog/hadith-zakat-collection" className="text-emerald-200 hover:text-white underline text-sm">More Hadiths →</Link>
          </motion.div>
        </div>

        {/* FAQs Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Common Zakat FAQs & Rulings</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-start gap-3 mb-3">
                  <FileQuestionMark className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Blog Grid - Now 10 Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 3) * 0.1 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-48 md:h-56 overflow-hidden bg-gray-200">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between text-xs opacity-90">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="font-medium text-gray-700">{post.author}</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="text-center">
          <p className="mt-4 text-gray-500 text-sm">Sources: Quran, Sahih Bukhari/Muslim, Islamic Relief, SAPA-USA, Global Sadaqah</p>
        </div>
      </div>
    </section>
  );
}