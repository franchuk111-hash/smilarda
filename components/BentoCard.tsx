'use client';

import { motion } from 'motion/react';
import type { CSSProperties, ReactNode } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

/** Bento cell with a cursor-following spotlight glow (award-site staple). */
export default function BentoCard({
  className = '',
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  function move(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }

  return (
    <motion.div className={`cell ${className}`} style={style} variants={fadeUp} onMouseMove={move}>
      {children}
    </motion.div>
  );
}
