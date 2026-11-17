import React from 'react';
import PageHero from '../components/PageHero';
import Services from '../components/Services';
import Process from '../components/Process';
import Contact from '../components/Contact';

export default function ServicesPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Services"
        title="Everything digital, in one flow."
        highlight={[3]}
        intro="Quality that lasts. Speed to market. From strategy and design to development, hosting and growth."
      />
      <Services />
      <Process />
      <Contact />
    </div>
  );
}

