'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 350, damping: 32, mass: 0.5 });
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    setEnabled(true);
    document.body.classList.add('has-cursor');

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest('a, button, .cell, .work, .burger, input, [role="button"]'));
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.body.classList.remove('has-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} aria-hidden="true" />
      <motion.div className={`cursor-ring${hover ? ' on' : ''}`} style={{ x: rx, y: ry }} aria-hidden="true" />
    </>
  );
}
