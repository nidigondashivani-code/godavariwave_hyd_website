import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    // 1. Disable browser's automatic scroll restoration on reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // 1b. If user is on the HR Lead Sheet (/lead), do not reset or jump
    const isLead = window.location.pathname.toLowerCase().startsWith('/lead') || window.location.hash.toLowerCase().includes('lead');
    if (isLead) return;

    // 2. Check if user navigated directly to #careers or /careers
    const isCareers = window.location.hash === '#careers' || window.location.pathname === '/careers';
    if (isCareers) {
      setTimeout(() => {
        const el = document.getElementById('careers');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 250);
      return;
    }

    // Clear any lingering URL anchor hash on reload so browser doesn't jump down
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    // 3. Instant jump to first section (top: 0)
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

    // 4. Double check after initial paint to guarantee we start at the first section
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 100);

    // 5. Before unload, reset scroll to 0 so page refreshes from top
    const onBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeunload', onBeforeUnload);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return null;
}
