'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'motion/react';

const links = [
  { href: '/', label: 'Головна' },
  { href: '/poslugy', label: 'Послуги' },
  { href: '/tsiny', label: 'Ціни' },
  { href: '/blog', label: 'Блог' },
  { href: '/robota', label: 'Робота' },
  { href: '/kontakty', label: 'Контакти' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = (usePathname() || '/').replace(/\/$/, '') || '/';

  return (
    <motion.header
      className="site"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container nav">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          <span className="mark">
            <svg viewBox="0 0 24 24"><path d="M12 3 3 10v11h6v-6h6v6h6V10z" /></svg>
          </span>{' '}
          Буд<b>Сміла</b>
        </Link>
        <nav className={`nav-links${open ? ' open' : ''}`}>
          {links.map((l) => {
            const active = l.href === '/' ? pathname === '/' : pathname === l.href || pathname.startsWith(l.href + '/');
            return (
              <Link key={l.href} href={l.href} className={active ? 'active' : ''} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <a href="https://vgb.team/" target="_blank" rel="noopener" className="btn cta">Замовити прорахунок</a>
        <button className="burger" aria-label="Меню" onClick={() => setOpen((v) => !v)}>☰</button>
      </div>
    </motion.header>
  );
}
