import React from 'react';
import PageHero from '../components/PageHero';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <div className="relative w-full max-w-full overflow-x-hidden">
      <PageHero
        eyebrow="Contact"
        title="Let's start your journey."
        highlight={[3]}
        intro="Share your requirements, discuss them with our experts, get a free quote — and start the project."
      />
      <Contact />
    </div>
  );
}

