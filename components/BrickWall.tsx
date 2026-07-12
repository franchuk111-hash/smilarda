'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { useRef } from 'react';

// One synthesized brick "clack" (noise burst + low thump) via Web Audio.
function clack(ctx: AudioContext, t: number) {
  const dur = 0.09;
  const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2.2);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 1500 + Math.random() * 900;
  bp.Q.value = 0.8;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.5, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(bp).connect(g).connect(ctx.destination);
  src.start(t);
  src.stop(t + dur);

  const o = ctx.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(190, t);
  o.frequency.exponentialRampToValueAtTime(75, t + 0.09);
  const g2 = ctx.createGain();
  g2.gain.setValueAtTime(0.0001, t);
  g2.gain.exponentialRampToValueAtTime(0.32, t + 0.004);
  g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
  o.connect(g2).connect(ctx.destination);
  o.start(t);
  o.stop(t + 0.14);
}

const brickV: Variants = {
  hidden: { opacity: 0, y: -46, rotate: -8 },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.5, delay: d, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

// Dense dust cloud + sparks kicked up the moment a brick lands.
const dustV: Variants = {
  hidden: { opacity: 0, scale: 0.35, y: 0 },
  show: (d: number) => ({
    opacity: [0, 1, 0],
    scale: [0.35, 1.4, 2.1],
    y: [0, -14, -32],
    transition: { duration: 0.75, delay: d + 0.38, times: [0, 0.28, 1], ease: 'easeOut' },
  }),
};

/** A masonry wall that lays itself brick-by-brick (bottom rows first), kicking up dust on impact. */
export default function BrickWall({ rows = 7, cols = 11 }: { rows?: number; cols?: number }) {
  const reduced = useReducedMotion();
  const actx = useRef<AudioContext | null>(null);

  function playLaying() {
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!actx.current) actx.current = new AC();
      const ctx = actx.current;
      if (ctx.state === 'suspended') ctx.resume();
      const t0 = ctx.currentTime + 0.02;
      for (let i = 0; i < 9; i++) clack(ctx, t0 + i * 0.072 + Math.random() * 0.015);
    } catch {}
  }

  return (
    <motion.div
      className="brickwall"
      initial={reduced ? undefined : 'hidden'}
      whileInView={reduced ? undefined : 'show'}
      viewport={{ once: true, margin: '-80px' }}
      onClick={playLaying}
      role="button"
      tabIndex={0}
      aria-label="Відтворити звук кладки цегли"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          playLaying();
        }
      }}
    >
      {Array.from({ length: rows }).map((_, r) => {
        const offset = r % 2 === 1;
        const fromBottom = rows - 1 - r;
        const count = cols + (offset ? 1 : 0);
        return (
          <motion.div className="brow" key={r} style={offset ? { transform: 'translateX(-45px)' } : undefined}>
            {Array.from({ length: count }).map((_, c) => {
              const d = fromBottom * 0.09 + c * 0.02;
              return (
                <span className="bcell" key={c}>
                  <motion.span className="brick" variants={reduced ? undefined : brickV} custom={d} />
                  {!reduced && <motion.span className="dust" variants={dustV} custom={d} />}
                </span>
              );
            })}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
