import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

interface Splash {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

export default function Cursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mainDotRef = useRef<HTMLDivElement>(null);
  const trail1Ref = useRef<HTMLDivElement>(null);
  const trail2Ref = useRef<HTMLDivElement>(null);
  const trail3Ref = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Apply water-cursor-enabled to root elements to hide the OS arrow cursor everywhere
    document.documentElement.classList.add('water-cursor-enabled');
    document.body.classList.add('water-cursor-enabled');

    let mouseX = -500;
    let mouseY = -500;
    let prevMouseX = -500;
    let prevMouseY = -500;
    let lastRippleX = -500;
    let lastRippleY = -500;

    let t1X = -500, t1Y = -500;
    let t2X = -500, t2Y = -500;
    let t3X = -500, t3Y = -500;

    let hasReceivedPosition = false;
    let isTouchActive = false;

    const ripples: Ripple[] = [];
    const splashes: Splash[] = [];

    let animId = 0;

    const setVisible = (visible: boolean) => {
      if (containerRef.current) {
        containerRef.current.style.opacity = visible ? '1' : '0';
      }
    };

    const updatePosition = (clientX: number, clientY: number, targetEl: HTMLElement | null) => {
      mouseX = clientX;
      mouseY = clientY;

      if (!hasReceivedPosition) {
        hasReceivedPosition = true;
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        lastRippleX = mouseX;
        lastRippleY = mouseY;
        t1X = mouseX; t1Y = mouseY;
        t2X = mouseX; t2Y = mouseY;
        t3X = mouseX; t3Y = mouseY;
      }

      setVisible(true);

      const hovered = !!targetEl?.closest?.('a, button, [data-cursor], input, textarea, select, [role="button"], label');
      setIsHovered(hovered);

      // Spawn subtle water ripples when moving across the screen
      const distSinceRipple = Math.hypot(mouseX - lastRippleX, mouseY - lastRippleY);
      if (distSinceRipple > 42) {
        ripples.push({
          x: mouseX,
          y: mouseY,
          radius: 5,
          maxRadius: hovered ? 46 : 32,
          opacity: 0.5,
          speed: 1.2,
        });
        lastRippleX = mouseX;
        lastRippleY = mouseY;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        isTouchActive = true;
        // Don't show persistent mouse cursor on touch gestures
        setVisible(false);
        return;
      }
      isTouchActive = false;
      updatePosition(e.clientX, e.clientY, e.target as HTMLElement | null);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchActive) return;
      updatePosition(e.clientX, e.clientY, e.target as HTMLElement | null);
    };

    const handlePointerDown = (e: PointerEvent | MouseEvent) => {
      if ('pointerType' in e && e.pointerType === 'touch') return;

      const cx = e.clientX;
      const cy = e.clientY;

      // Double concentric water ripple ring on click
      ripples.push({
        x: cx,
        y: cy,
        radius: 4,
        maxRadius: 60,
        opacity: 0.85,
        speed: 2.4,
      });
      ripples.push({
        x: cx,
        y: cy,
        radius: 2,
        maxRadius: 38,
        opacity: 0.7,
        speed: 1.6,
      });

      // Water droplets splashing outward
      for (let i = 0; i < 7; i++) {
        const angle = (Math.PI * 2 * i) / 7 + (Math.random() - 0.5) * 0.4;
        const speed = 2.4 + Math.random() * 2.8;
        splashes.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1.5 + Math.random() * 2,
          alpha: 0.9,
        });
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      if (hasReceivedPosition && !isTouchActive) {
        setVisible(true);
      }
    };

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('mousedown', handlePointerDown, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Liquid animation loop
    const animate = () => {
      if (hasReceivedPosition) {
        // Fluid trailing beads interpolation (water tension lag)
        t1X += (mouseX - t1X) * 0.38;
        t1Y += (mouseY - t1Y) * 0.38;

        t2X += (t1X - t2X) * 0.28;
        t2Y += (t1Y - t2Y) * 0.28;

        t3X += (t2X - t3X) * 0.2;
        t3Y += (t2Y - t3Y) * 0.2;

        // Calculate velocity and elongation for teardrop water deformation
        const vx = mouseX - prevMouseX;
        const vy = mouseY - prevMouseY;
        const speed = Math.hypot(vx, vy);
        const angle = Math.atan2(vy, vx);

        const stretchX = 1 + Math.min(speed * 0.015, 0.45);
        const stretchY = 1 - Math.min(speed * 0.01, 0.22);

        prevMouseX = mouseX;
        prevMouseY = mouseY;

        // Update main water droplet
        if (mainDotRef.current) {
          if (speed > 1.5) {
            mainDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) rotate(${angle}rad) scale(${stretchX}, ${stretchY})`;
          } else {
            mainDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) rotate(0rad) scale(1, 1)`;
          }
        }

        // Update trailing water beads
        if (trail1Ref.current) {
          trail1Ref.current.style.transform = `translate3d(${t1X}px, ${t1Y}px, 0)`;
        }
        if (trail2Ref.current) {
          trail2Ref.current.style.transform = `translate3d(${t2X}px, ${t2Y}px, 0)`;
        }
        if (trail3Ref.current) {
          trail3Ref.current.style.transform = `translate3d(${t3X}px, ${t3Y}px, 0)`;
        }
      }

      // Render ripples & splashes on canvas
      const canvas = canvasRef.current;
      if (canvas) {
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw water ripples
          for (let i = ripples.length - 1; i >= 0; i--) {
            const r = ripples[i];
            r.radius += r.speed;
            r.opacity *= 0.96;

            if (r.opacity <= 0.02 || r.radius >= r.maxRadius) {
              ripples.splice(i, 1);
              continue;
            }

            // Outer ripple ring
            ctx.beginPath();
            ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 212, 255, ${r.opacity.toFixed(3)})`;
            ctx.lineWidth = 1.4;
            ctx.stroke();

            // Inner refraction ring
            if (r.radius > 8) {
              ctx.beginPath();
              ctx.arc(r.x, r.y, Math.max(0, r.radius - 6), 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(56, 189, 248, ${(r.opacity * 0.5).toFixed(3)})`;
              ctx.lineWidth = 1.0;
              ctx.stroke();
            }
          }

          // Draw splash droplets
          for (let i = splashes.length - 1; i >= 0; i--) {
            const s = splashes[i];
            s.x += s.vx;
            s.y += s.vy;
            s.vx *= 0.94;
            s.vy *= 0.94;
            s.alpha *= 0.94;

            if (s.alpha <= 0.02) {
              splashes.splice(i, 1);
              continue;
            }

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(56, 189, 248, ${s.alpha.toFixed(3)})`;
            ctx.shadowColor = '#00D4FF';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove('water-cursor-enabled');
      document.body.classList.remove('water-cursor-enabled');
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={containerRef}
      className="water-cursor-container"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2147483647,
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity 0.22s ease-out',
      }}
    >
      {/* Universal stylesheet ensuring native OS cursor is hidden on all elements and modals */}
      <style>{`
        html.water-cursor-enabled,
        html.water-cursor-enabled *,
        html.water-cursor-enabled body,
        html.water-cursor-enabled body *,
        html.water-cursor-enabled #connect-modal-overlay,
        html.water-cursor-enabled #connect-modal-overlay *,
        html.water-cursor-enabled [role="dialog"],
        html.water-cursor-enabled [role="dialog"] *,
        html.water-cursor-enabled input,
        html.water-cursor-enabled textarea,
        html.water-cursor-enabled select,
        html.water-cursor-enabled button,
        html.water-cursor-enabled a {
          cursor: none !important;
        }
      `}</style>

      {/* Fullscreen Canvas for Live Water Ripples & Splash Droplets on Top of All Elements & Modals */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2147483646,
          pointerEvents: 'none',
          width: '100vw',
          height: '100vh',
        }}
      />

      {/* Trailing Liquid Water Beads */}
      <div
        ref={trail3Ref}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 rounded-full will-change-transform"
        style={{
          position: 'fixed',
          zIndex: 2147483647,
          pointerEvents: 'none',
          width: '5px',
          height: '5px',
          marginLeft: '-2.5px',
          marginTop: '-2.5px',
          background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(0, 212, 255, 0.6))',
          boxShadow: '0 0 6px rgba(0, 212, 255, 0.7)',
          opacity: isHovered ? 0 : 0.65,
          transition: 'opacity 0.2s ease',
        }}
      />

      <div
        ref={trail2Ref}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 rounded-full will-change-transform"
        style={{
          position: 'fixed',
          zIndex: 2147483647,
          pointerEvents: 'none',
          width: '8px',
          height: '8px',
          marginLeft: '-4px',
          marginTop: '-4px',
          background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95), rgba(0, 212, 255, 0.75))',
          boxShadow: '0 0 8px rgba(0, 212, 255, 0.8)',
          opacity: isHovered ? 0 : 0.8,
          transition: 'opacity 0.2s ease',
        }}
      />

      <div
        ref={trail1Ref}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 rounded-full will-change-transform"
        style={{
          position: 'fixed',
          zIndex: 2147483647,
          pointerEvents: 'none',
          width: '12px',
          height: '12px',
          marginLeft: '-6px',
          marginTop: '-6px',
          background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,1), rgba(0, 212, 255, 0.85))',
          boxShadow: '0 0 10px rgba(0, 212, 255, 0.85)',
          opacity: isHovered ? 0 : 0.85,
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* Primary Glassy Water Droplet Cursor */}
      <div
        ref={mainDotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 will-change-transform flex items-center justify-center"
        style={{
          position: 'fixed',
          zIndex: 2147483647,
          pointerEvents: 'none',
          width: isHovered ? '46px' : '22px',
          height: isHovered ? '46px' : '22px',
          marginLeft: isHovered ? '-23px' : '-11px',
          marginTop: isHovered ? '-23px' : '-11px',
          borderRadius: isHovered ? '50%' : '52% 48% 50% 50% / 48% 52% 48% 52%',
          background: isHovered
            ? 'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.3) 0%, rgba(0, 212, 255, 0.35) 45%, rgba(11,31,58,0.2) 80%, rgba(0, 212, 255, 0.5) 100%)'
            : 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #38BDF8 32%, #0066CC 70%, #00D4FF 100%)',
          border: isHovered
            ? '1.5px solid rgba(0, 212, 255, 0.85)'
            : '1.5px solid rgba(255, 255, 255, 0.9)',
          boxShadow: isHovered
            ? '0 0 24px rgba(0, 212, 255, 0.75), inset 0 0 12px rgba(255,255,255,0.45)'
            : '0 0 14px rgba(0, 212, 255, 0.7), 0 0 26px rgba(56, 189, 248, 0.4), inset 0 0 8px rgba(255,255,255,0.6)',
          transition: 'width 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), margin 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.22s ease, border 0.22s ease, background 0.22s ease',
        }}
      >
        {/* Specular White Water Glint */}
        <span
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            top: isHovered ? '9px' : '3px',
            left: isHovered ? '9px' : '3px',
            width: isHovered ? '7px' : '4.5px',
            height: isHovered ? '7px' : '4.5px',
            opacity: 0.95,
            filter: 'blur(0.2px)',
            transition: 'top 0.2s ease, left 0.2s ease, width 0.2s ease, height 0.2s ease',
          }}
        />

        {/* Precision Center Point */}
        <span
          className="rounded-full bg-[#0B1F3A] pointer-events-none transition-all duration-200"
          style={{
            width: isHovered ? '0px' : '3.5px',
            height: isHovered ? '0px' : '3.5px',
            opacity: isHovered ? 0 : 0.85,
          }}
        />
      </div>
    </div>,
    document.body
  );
}
