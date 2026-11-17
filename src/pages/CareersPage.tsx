import React from 'react';
import PageHero from '../components/PageHero';
import Careers from '../components/Careers';
import Contact from '../components/Contact';

export default function CareersPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Careers"
        title="Build the next wave with us."
        highlight={[4]}
        intro="Join Godavari Wave Technologies at Meenakshi Tech Park, Gachibowli. Open roles for freshers and experienced engineers."
      />
      <Careers />
      <Contact />
    </div>
  );
}

