import React from 'react';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import Story from '../components/Story';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import CountUp from '../components/CountUp';
import { stats } from '../data/companyData';

const drivers = [
  {
    title: 'Driven by purpose',
    text: 'To bridge the gap between ideas and technology, making digital transformation affordable, accessible and impactful.',
  },
  {
    title: 'Worldwide impact',
    text: 'To expand across countries and deliver projects globally as a trusted technology partner.',
  },
  {
    title: 'Training Institute',
    text: 'Godavari Wave Training Institute LLP — hands-on Full Stack, DSA and Python training with career preparation.',
  },
];

export default function AboutPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="About us"
        title="Turning innovative ideas into digital success."
        highlight={[4, 5]}
        intro="Founded in Rajahmundry, we transform businesses with cutting-edge mobile, web and software solutions."
      />

      {/* 4 Stats Grid */}
      <section className="relative px-6 py-20 sm:py-24 md:px-10 bg-[#0B1F3A]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 sm:gap-6 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between"
            >
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#38BDF8] to-[#00D4FF]">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm sm:text-base text-slate-300 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Origin & Story Section */}
      <Story />

      {/* What Drives Us: Purpose, Reach, People */}
      <section className="relative px-6 py-20 sm:py-24 md:px-10 bg-[#0B1F3A]">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="WHAT DRIVES US"
            title="Purpose, reach, people."
            description="Our foundational principles guiding every platform we architect and every community we empower."
            align="center"
          />

          <div className="mt-14 sm:mt-16 grid gap-6 md:grid-cols-3">
            {drivers.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#0F2442] to-[#0A192F] p-7 sm:p-8 shadow-xl backdrop-blur-xl flex flex-col justify-between hover:border-[#00D4FF]/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#00D4FF] uppercase tracking-widest">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300 font-normal">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Contact Section */}
      <Contact />
    </div>
  );
}

