'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    // Skip the intro for reduced-motion users or after it's been seen this session.
    if (reduced || sessionStorage.getItem('pl-seen')) {
      setDone(true);
      return;
    }
    let v = 0;
    const id = setInterval(() => {
      v = Math.min(100, v + Math.random() * 16 + 6);
      setPct(Math.round(v));
      if (v >= 100) {
        clearInterval(id);
        sessionStorage.setItem('pl-seen', '1');
        setTimeout(() => setDone(true), 350);
      }
    }, 110);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="pl-inner">
            <div className="pl-logo">
              <span className="mark">
                <svg viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></svg>
              </span>
              Буд<b>Сміла</b>
            </div>
            <div className="pl-bar"><motion.span style={{ scaleX: pct / 100 }} /></div>
            <div className="pl-pct">{pct}%</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
