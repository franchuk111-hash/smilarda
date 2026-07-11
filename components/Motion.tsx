'use client';

import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform, type Variants } from 'motion/react';
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

type El = { className?: string; style?: CSSProperties; id?: string; children: ReactNode };

/** Fade + slide-up once the block scrolls into view. */
export function Reveal({ className, style, id, children, delay = 0 }: El & { delay?: number }) {
  return (
    <motion.div
      className={className}
      style={style}
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: { opacity: 0, y: 26 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered container — pair with <Item>. Set `mount` for above-the-fold (plays on load). */
export function Stagger({ className, style, id, children, mount = false }: El & { mount?: boolean }) {
  const trigger = mount
    ? { animate: 'show' as const }
    : { whileInView: 'show' as const, viewport: { once: true, margin: '-80px' } };
  return (
    <motion.div className={className} style={style} id={id} initial="hidden" {...trigger} variants={containerV}>
      {children}
    </motion.div>
  );
}

/** A single staggered child. Renders as the element itself (pass the card className). */
export function Item({ className, style, id, children, hover = false }: El & { hover?: boolean }) {
  return (
    <motion.div
      className={className}
      style={style}
      id={id}
      variants={fadeUp}
      whileHover={hover ? { y: -6, transition: { duration: 0.2, ease: EASE } } : undefined}
    >
      {children}
    </motion.div>
  );
}

/** Thin gradient bar at the top that fills as you scroll the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

/** Card that tilts in 3D toward the cursor. Pass the card className. */
export function Tilt({ className, style, id, children }: El & { id?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 220, damping: 18 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 220, damping: 18 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={className}
      id={id}
      variants={fadeUp}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, transformStyle: 'preserve-3d', ...style }}
    >
      {children}
    </motion.div>
  );
}

/** Count-up number that animates when scrolled into view. */
export function Counter({ value, suffix = '', prefix = '', immediate = false }: { value: number; suffix?: string; prefix?: string; immediate?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1.4, bounce: 0 });
  const [display, setDisplay] = useState(0);

  const active = immediate || inView;
  useEffect(() => {
    if (active) mv.set(value);
  }, [active, value, mv]);

  useEffect(() => spring.on('change', (v) => setDisplay(Math.round(v))), [spring]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
