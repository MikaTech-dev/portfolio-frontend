import { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // using requestAnimationFrame ensures we only update styles once per screen repaint (60fps limit max)
    // this avoids React state entirely for zero-lag CPU/GPU performance.
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (glowRef.current) {
            glowRef.current.style.setProperty('--x', `${e.clientX}px`);
            glowRef.current.style.setProperty('--y', `${e.clientY}px`);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#0a0514]">
      {/* Subtle Dot Grid Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: 'radial-gradient(#b26ef7 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Interactive Mouse Spotlight Glow mapped to cursor coordinates via native CSS Vars */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-100 mix-blend-screen"
        style={{
          background: `radial-gradient(600px circle at var(--x, 50vw) var(--y, 50vh), rgba(124, 58, 237, 0.15), transparent 80%)`
        }}
      />

      {/* Static Vignette / Corner Accents so the page is never totally empty */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-40 pointer-events-none"
           style={{ background: 'radial-gradient(circle at top right, rgba(142, 61, 255, 0.15) 0%, transparent 60%)' }} />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] opacity-30 pointer-events-none"
           style={{ background: 'radial-gradient(circle at bottom left, rgba(124, 58, 237, 0.15) 0%, transparent 60%)' }} />
    </div>
  );
}
