'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import type { ReactNode } from 'react';

/** Wraps a control so it nudges toward the cursor — the classic award-site micro-interaction. */
export default function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.2 });

  function move(e: React.MouseEvent<HTMLSpanElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      style={{ display: 'inline-block', x: sx, y: sy }}
      onMouseMove={move}
      onMouseLeave={reset}
    >
      {children}
    </motion.span>
  );
}
