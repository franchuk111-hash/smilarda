'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Icon from './Icon';
import ThemeToggle from './ThemeToggle';

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
  const [scrolled, setScrolled] = useState(false);
  const pathname = (usePathname() || '/').replace(/\/$/, '') || '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`site${scrolled ? ' scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container nav">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          <span className="mark"><Icon name="home" /></span> Сміла <b>Буд</b>
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
        <ThemeToggle />
        <Link href="/kalkulyator" className="btn cta">Розрахувати вартість</Link>
        <button className="burger" aria-label="Меню" onClick={() => setOpen((v) => !v)}>☰</button>
      </div>
    </motion.header>
  );
}
