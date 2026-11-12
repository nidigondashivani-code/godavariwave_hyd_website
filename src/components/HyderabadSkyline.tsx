import React from 'react';
import { motion } from 'framer-motion';

export default function HyderabadSkyline() {
  return (
    <div className="relative w-full overflow-hidden select-none" aria-hidden="true">
      {/* Deep Night Sky Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1F3A]/60 to-[#0B1F3A]" />

      {/* Twinkling Stars in Night Sky */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden">
        {[...Array(24)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#FFFFFF] animate-pulse"
            style={{
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              top: `${(i * 17) % 85}%`,
              left: `${(i * 23) % 98}%`,
              opacity: 0.3 + (i % 5) * 0.15,
              animationDelay: `${(i * 0.4) % 3}s`,
              animationDuration: `${2 + (i % 4)}s`
            }}
          />
        ))}
      </div>

      {/* SVG Futuristic Hyderabad Skyline Silhouette */}
      <svg
        viewBox="0 0 1440 280"
        preserveAspectRatio="none"
        className="relative z-10 w-full h-48 md:h-64"
      >
        <defs>
          {/* Skyline Linear Gradients */}
          <linearGradient id="skyline-glow-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0B1F3A" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="skyline-glow-emerald" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0066CC" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0B1F3A" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="skyline-glow-slate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#004E9A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0B1F3A" stopOpacity="0.98" />
          </linearGradient>

          {/* River Glow */}
          <linearGradient id="river-flow-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0066CC" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0066CC" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* 1. BACKGROUND SKYLINE SILHOUETTES (Financial District Distant Towers) */}
        <g opacity="0.35">
          {/* Distant Glass Skyscraper 1 */}
          <rect x="60" y="80" width="55" height="180" fill="url(#skyline-glow-slate)" />
          <rect x="130" y="110" width="45" height="150" fill="url(#skyline-glow-slate)" />
          <polygon points="130,110 152,85 175,110" fill="#004E9A" />

          {/* Gachibowli High Rises */}
          <rect x="340" y="95" width="70" height="165" fill="url(#skyline-glow-slate)" />
          <rect x="430" y="70" width="60" height="190" fill="url(#skyline-glow-slate)" />

          {/* Madhapur Tech Park Blocks */}
          <rect x="1020" y="100" width="80" height="160" fill="url(#skyline-glow-slate)" />
          <rect x="1120" y="75" width="65" height="185" fill="url(#skyline-glow-slate)" />
          <rect x="1200" y="90" width="75" height="170" fill="url(#skyline-glow-slate)" />
          <rect x="1295" y="60" width="85" height="200" fill="url(#skyline-glow-slate)" />
        </g>

        {/* 2. MID-GROUND ICONIC LANDMARKS */}

        {/* --- A. FINANCIAL DISTRICT TOWERS (Left Zone: x=80 to x=320) --- */}
        <g>
          {/* Modern FinTech Spire */}
          <rect x="195" y="45" width="68" height="215" fill="url(#skyline-glow-slate)" stroke="#0066CC" strokeWidth="0.8" strokeOpacity="0.5" />
          {/* Spire antenna with flashing beacon */}
          <line x1="229" y1="20" x2="229" y2="45" stroke="#0066CC" strokeWidth="1.2" />
          <circle cx="229" cy="20" r="2.2" fill="#38BDF8" className="animate-ping" />

          {/* Window data grid */}
          {[...Array(6)].map((_, row) => (
            <line
              key={`w-left-${row}`}
              x1="205"
              y1={65 + row * 24}
              x2="253"
              y2={65 + row * 24}
              stroke="#FFFFFF"
              strokeWidth="0.8"
              strokeDasharray="2 4"
              opacity="0.45"
            />
          ))}

          {/* Stepped corporate headquarters */}
          <rect x="275" y="75" width="55" height="185" fill="#0f1c29" stroke="#00D4FF" strokeWidth="0.6" strokeOpacity="0.6" />
          <rect x="285" y="55" width="35" height="20" fill="#0f1c29" stroke="#00D4FF" strokeWidth="0.6" strokeOpacity="0.6" />
        </g>

        {/* --- B. CYBER TOWERS (HITEC City Signature Round Building: x=480 to x=640) --- */}
        <g id="cyber-towers-landmark">
          {/* Circular tiered central drum with radial wings */}
          <rect x="500" y="80" width="120" height="180" rx="6" fill="#0c1622" stroke="#0066CC" strokeWidth="1.2" />

          {/* Iconic segmented window bands of Cyber Towers */}
          {[...Array(8)].map((_, i) => (
            <line
              key={`ct-band-${i}`}
              x1="508"
              y1={98 + i * 18}
              x2="612"
              y2={98 + i * 18}
              stroke="#0066CC"
              strokeWidth="1.4"
              strokeDasharray="6 3"
              opacity="0.75"
            />
          ))}

          {/* Cyber Towers Crown & Central Mast */}
          <polygon points="530,80 560,52 590,80" fill="#0f1f2e" stroke="#0066CC" strokeWidth="1" />
          <line x1="560" y1="25" x2="560" y2="52" stroke="#00D4FF" strokeWidth="1.8" />
          <circle cx="560" cy="25" r="2.5" fill="#38BDF8" className="animate-ping" />
        </g>

        {/* --- C. T-HUB (Futuristic Triangular Cantilever Innovation Facility: x=680 to x=820) --- */}
        <g id="t-hub-landmark">
          {/* Sharp futuristic angular polygon */}
          <polygon
            points="680,260 690,135 810,95 825,260"
            fill="#0b1724"
            stroke="#00D4FF"
            strokeWidth="1"
            strokeOpacity="0.8"
          />
          {/* Cantilever overhang facet */}
          <polygon
            points="710,130 810,95 780,180"
            fill="#122538"
            stroke="#0066CC"
            strokeWidth="0.8"
            opacity="0.7"
          />
          {/* Internal diagonal structural trusses */}
          <line x1="695" y1="180" x2="815" y2="140" stroke="#0066CC" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
          <line x1="710" y1="220" x2="820" y2="185" stroke="#0066CC" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
        </g>

        {/* --- D. CHARMINAR HOLOGRAPHIC SILHOUETTE (Center-Right: x=860 to x=1020) --- */}
        <g id="charminar-skyline-silhouette">
          {/* Base Plinth */}
          <rect x="880" y="240" width="120" height="20" fill="#112130" stroke="#38BDF8" strokeWidth="0.8" />

          {/* Four Iconic Minarets */}
          {/* Minaret 1 (Far Left) */}
          <rect x="874" y="65" width="14" height="175" fill="#0d1926" stroke="#00D4FF" strokeWidth="1.2" />
          <ellipse cx="881" cy="65" rx="9" ry="8" fill="url(#skyline-glow-gold)" stroke="#00D4FF" strokeWidth="1" />
          <line x1="881" y1="48" x2="881" y2="57" stroke="#00D4FF" strokeWidth="1.2" />

          {/* Minaret 2 (Inner Left) */}
          <rect x="906" y="75" width="12" height="165" fill="#0d1926" stroke="#00D4FF" strokeWidth="1" />
          <ellipse cx="912" cy="75" rx="8" ry="7" fill="url(#skyline-glow-gold)" stroke="#00D4FF" strokeWidth="1" />

          {/* Minaret 3 (Inner Right) */}
          <rect x="962" y="75" width="12" height="165" fill="#0d1926" stroke="#00D4FF" strokeWidth="1" />
          <ellipse cx="968" cy="75" rx="8" ry="7" fill="url(#skyline-glow-gold)" stroke="#00D4FF" strokeWidth="1" />

          {/* Minaret 4 (Far Right) */}
          <rect x="992" y="65" width="14" height="175" fill="#0d1926" stroke="#00D4FF" strokeWidth="1.2" />
          <ellipse cx="999" cy="65" rx="9" ry="8" fill="url(#skyline-glow-gold)" stroke="#00D4FF" strokeWidth="1" />
          <line x1="999" y1="48" x2="999" y2="57" stroke="#00D4FF" strokeWidth="1.2" />

          {/* Main Grand Central Archway */}
          <path
            d="M918 240 L918 165 Q940 125 962 165 L962 240"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.8"
          />
          <path
            d="M924 240 L924 175 Q940 145 956 175 L956 240"
            fill="none"
            stroke="#0066CC"
            strokeWidth="1"
            strokeDasharray="2 2"
          />

          {/* Upper Gallery & Clock Pediment */}
          <rect x="910" y="125" width="60" height="25" fill="#122538" stroke="#00D4FF" strokeWidth="1" />
          <circle cx="940" cy="137" r="5" fill="none" stroke="#00D4FF" strokeWidth="1.2" />
          <circle cx="940" cy="137" r="1.5" fill="#0066CC" />

          {/* Balcony Rings on Minarets */}
          {[115, 160].map((by) => (
            <React.Fragment key={`balc-${by}`}>
              <line x1="870" y1={by} x2="892" y2={by} stroke="#00D4FF" strokeWidth="1.5" />
              <line x1="988" y1={by} x2="1010" y2={by} stroke="#00D4FF" strokeWidth="1.5" />
            </React.Fragment>
          ))}
        </g>

        {/* --- E. FINANCIAL DISTRICT TOWERS (Right Zone: x=1050 to x=1400) --- */}
        <g>
          {/* High-Tech Glass Tower */}
          <rect x="1060" y="50" width="75" height="210" fill="url(#skyline-glow-slate)" stroke="#0066CC" strokeWidth="0.8" strokeOpacity="0.5" />
          <polygon points="1060,50 1097,25 1135,50" fill="#16293a" stroke="#0066CC" strokeWidth="0.8" />
          <line x1="1097" y1="12" x2="1097" y2="25" stroke="#38BDF8" strokeWidth="1.2" />
          <circle cx="1097" cy="12" r="2" fill="#38BDF8" className="animate-ping" />

          {/* Stepped Corporate Tower */}
          <rect x="1170" y="65" width="85" height="195" fill="#0d1b27" stroke="#00D4FF" strokeWidth="0.8" strokeOpacity="0.5" />
          <rect x="1190" y="45" width="45" height="20" fill="#0d1b27" stroke="#00D4FF" strokeWidth="0.8" strokeOpacity="0.5" />
        </g>

        {/* 3. ARTERIAL IT HIGHWAY & MOVING DATA LIGHTS (Outer Ring Road / Cyberabad traffic) */}
        <line x1="0" y1="250" x2="1440" y2="250" stroke="#1f374e" strokeWidth="3" />
        <line
          x1="0"
          y1="250"
          x2="1440"
          y2="250"
          stroke="#00D4FF"
          strokeWidth="1.5"
          className="flow-dash"
          style={{ strokeDasharray: '12 36' }}
        />
        <line
          x1="0"
          y1="252"
          x2="1440"
          y2="252"
          stroke="#0066CC"
          strokeWidth="1.2"
          className="flow-dash"
          style={{ strokeDasharray: '8 28', animationDirection: 'reverse' }}
        />

        {/* 4. FLOWING DIGITAL GODAVARI RIVER REFLECTION AT THE BOTTOM */}
        <path
          d="M0 262 C 240 252, 480 274, 720 260 S 1200 252, 1440 264 L1440 280 L0 280 Z"
          fill="url(#river-flow-grad)"
        />
        <path
          d="M0 268 C 360 258, 720 278, 1080 264 S 1320 270, 1440 268"
          fill="none"
          stroke="#0066CC"
          strokeWidth="1.8"
          className="flow-dash"
          style={{ strokeDasharray: '6 12' }}
        />
      </svg>
    </div>
  );
}

