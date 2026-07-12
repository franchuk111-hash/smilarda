'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/** Vertical scroll drives a horizontal, pinned track (award-site scroll-jack). */
export default function PinnedGallery({
  kicker,
  title,
  sub,
  children,
}: {
  kicker: string;
  title: string;
  sub: string;
  children: ReactNode;
}) {
  const wrap = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const maxRef = useRef(0);
  const [height, setHeight] = useState('300vh');

  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, (v) => -(v * maxRef.current));

  useEffect(() => {
    if (reduced) return;
    const calc = () => {
      if (!track.current || !sticky.current) return;
      const max = Math.max(0, track.current.scrollWidth - sticky.current.clientWidth);
      maxRef.current = max;
      setHeight(`${window.innerHeight + max}px`);
    };
    calc();
    const t = setTimeout(calc, 300);
    window.addEventListener('resize', calc);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', calc);
    };
  }, [reduced]);

  // Reduced motion: no scroll-jack — a plain, swipeable horizontal row.
  if (reduced) {
    return (
      <section className="pinwrap pinwrap--static">
        <div className="pinhead">
          <p className="kicker">{kicker}</p>
          <h2 className="title" style={{ marginBottom: 8 }}>{title}</h2>
          <p className="sub" style={{ margin: 0 }}>{sub}</p>
        </div>
        <div className="pintrack pintrack--scroll">{children}</div>
      </section>
    );
  }

  return (
    <section ref={wrap} className="pinwrap" style={{ height }}>
      <div ref={sticky} className="pinsticky">
        <div className="pinhead">
          <p className="kicker">{kicker}</p>
          <h2 className="title" style={{ marginBottom: 8 }}>{title}</h2>
          <p className="sub" style={{ margin: 0 }}>{sub}</p>
        </div>
        <motion.div ref={track} className="pintrack" style={{ x }}>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
