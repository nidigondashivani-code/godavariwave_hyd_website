import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Story from './components/Story';
import GovtShowcase from './components/GovtShowcase';
import Portfolio from './components/Portfolio';
import TechStack from './components/TechStack';
import ClientsRiver from './components/ClientsRiver';
import Comparison from './components/Comparison';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import SmoothScroll from './components/SmoothScroll';
import ConnectModal from './components/ConnectModal';
import LeadDashboard from './components/LeadDashboard';

const checkIsLeadPath = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return (
    path === '/lead' ||
    path === '/leads' ||
    path.startsWith('/lead/') ||
    path.startsWith('/leads/') ||
    hash === '#/lead' ||
    hash === '#lead' ||
    hash === '#/leads' ||
    hash === '#leads'
  );
};

export default function App() {
  const [isLeadRoute, setIsLeadRoute] = useState<boolean>(() => checkIsLeadPath());

  useEffect(() => {
    const handleLocationChange = () => {
      setIsLeadRoute(checkIsLeadPath());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('gw_route_change', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('gw_route_change', handleLocationChange);
    };
  }, []);

  // When /lead or /leads is in URL, render the confidential HR Leads Dashboard
  if (isLeadRoute) {
    return (
      <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground antialiased selection:bg-secondary selection:text-ocean">
        <Cursor />
        <LeadDashboard
          onBackToSite={() => {
            window.history.pushState(null, '', '/');
            setIsLeadRoute(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground antialiased selection:bg-secondary selection:text-ocean">
      <ConnectModal />
      <SmoothScroll />
      <Cursor />

      {/* Background Aurora Drift Glows */}
      <div className="flow-aurora pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      {/* Main Layout */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main id="main" className="flex-1">
          <Hero />
          <Services />
          <Story />
          <GovtShowcase />
          <Portfolio />
          <TechStack />
          <ClientsRiver />
          <Comparison />
          <Process />
          <Testimonials />
          <Careers />

          {/* 200px vertical gap between Careers and Contact sections */}
          <div className="h-[200px] w-full" aria-hidden="true" style={{ height: '200px' }} />

          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
