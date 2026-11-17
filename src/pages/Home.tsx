import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Story from '../components/Story';
import GovtShowcase from '../components/GovtShowcase';
import Portfolio from '../components/Portfolio';
import TechStack from '../components/TechStack';
import ClientsRiver from '../components/ClientsRiver';
import Comparison from '../components/Comparison';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import Careers from '../components/Careers';
import Contact from '../components/Contact';

function SectionDivider() {
  return (
    <div className="relative w-full max-w-[1450px] mx-auto py-6 sm:py-10 md:py-14 lg:py-16 px-5 md:px-8 xl:px-12 pointer-events-none select-none" aria-hidden="true">
      <div className="relative h-px w-full overflow-hidden opacity-35">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00D4FF]/60 to-transparent" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Story />
      <SectionDivider />
      <GovtShowcase />
      <SectionDivider />
      <Portfolio />
      <SectionDivider />
      <TechStack />
      <SectionDivider />
      <ClientsRiver />
      <SectionDivider />
      <Comparison />
      <SectionDivider />
      <Process />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <Careers />
      <SectionDivider />
      <Contact />
    </>
  );
}

