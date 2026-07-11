'use client';

import { motion, useInView, useMotionValue, useSpring, type Variants } from 'motion/react';
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

/** Staggered container — pair with <Item>. */
export function Stagger({ className, style, id, children }: El) {
  return (
    <motion.div
      className={className}
      style={style}
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={containerV}
    >
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

/** Count-up number that animates when scrolled into view. */
export function Counter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1400, bounce: 0 });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  useEffect(() => spring.on('change', (v) => setDisplay(Math.round(v).toString())), [spring]);

  return (
    <span ref={ref}>
      {prefix}
      {inView ? display : '0'}
      {suffix}
    </span>
  );
}
