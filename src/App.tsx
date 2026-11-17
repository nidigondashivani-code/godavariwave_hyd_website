import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import SmoothScroll from './components/SmoothScroll';
import ConnectModal from './components/ConnectModal';
import LeadDashboard from './components/LeadDashboard';

// Pages
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import SolutionsPage from './pages/SolutionsPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';

const getNormalizedRoute = () => {
  if (typeof window === 'undefined') return '/';
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  if (
    path === '/lead' ||
    path === '/leads' ||
    path.startsWith('/lead/') ||
    path.startsWith('/leads/') ||
    hash === '#/lead' ||
    hash === '#lead' ||
    hash === '#/leads' ||
    hash === '#leads'
  ) {
    return '/lead';
  }

  if (path === '/services' || hash === '#/services') return '/services';
  if (path === '/solutions' || hash === '#/solutions') return '/solutions';
  if (path === '/portfolio' || hash === '#/portfolio') return '/portfolio';
  if (path === '/about' || hash === '#/about') return '/about';
  if (path === '/careers' || hash === '#/careers') return '/careers';
  if (path === '/contact' || hash === '#/contact') return '/contact';

  return '/';
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => getNormalizedRoute());

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(getNormalizedRoute());
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
  if (currentRoute === '/lead') {
    return (
      <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground antialiased selection:bg-secondary selection:text-ocean">
        <Cursor />
        <LeadDashboard
          onBackToSite={() => {
            window.history.pushState(null, '', '/');
            setCurrentRoute('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
    );
  }

  const renderContent = () => {
    switch (currentRoute) {
      case '/services':
        return <ServicesPage />;
      case '/solutions':
        return <SolutionsPage />;
      case '/portfolio':
        return <PortfolioPage />;
      case '/about':
        return <AboutPage />;
      case '/careers':
        return <CareersPage />;
      case '/contact':
        return <ContactPage />;
      default:
        return <Home />;
    }
  };

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
          {renderContent()}
        </main>
        <Footer />
      </div>
    </div>
  );
}
