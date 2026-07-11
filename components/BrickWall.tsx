'use client';

import { motion, type Variants } from 'motion/react';

const brickV: Variants = {
  hidden: { opacity: 0, y: -46, rotate: -8 },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.5, delay: d, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

/** A masonry wall that lays itself brick-by-brick (bottom rows first) when scrolled into view. */
export default function BrickWall({ rows = 7, cols = 11 }: { rows?: number; cols?: number }) {
  return (
    <motion.div
      className="brickwall"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      aria-hidden="true"
    >
      {Array.from({ length: rows }).map((_, r) => {
        const offset = r % 2 === 1;
        const fromBottom = rows - 1 - r;
        const count = cols + (offset ? 1 : 0);
        return (
          <motion.div className="brow" key={r} style={offset ? { transform: 'translateX(-45px)' } : undefined}>
            {Array.from({ length: count }).map((_, c) => (
              <motion.span
                className="brick"
                key={c}
                variants={brickV}
                custom={fromBottom * 0.09 + c * 0.02}
              />
            ))}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
