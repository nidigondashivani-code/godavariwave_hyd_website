import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export default function FloatingActions() {
  const cleanPhone = companyInfo.phones[0].replace(/[^0-9]/g, '');

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${cleanPhone}?text=Hello%20Godavari%20Wave%20Technologies,%20I%20would%20like%20to%20discuss%20a%20project.`}
        target="_blank"
        rel="noreferrer"
        className="glass group flex h-12 items-center gap-2 rounded-full px-4 text-xs font-semibold text-foreground shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-glass-strong hover:shadow-glow-sea"
        aria-label="Chat on WhatsApp"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#25D366] text-white">
          <MessageSquare className="h-4 w-4 fill-white" />
        </span>
        <span className="hidden sm:inline">WhatsApp us</span>
      </a>
    </div>
  );
}

