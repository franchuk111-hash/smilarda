'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const KEY = 'smilarda_cookie_consent'; // 'granted' | 'denied'

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(KEY); } catch {}
    if (saved === 'granted') { updateConsent('granted'); return; }
    if (saved === 'denied') { return; } // за замовчуванням аналітика вимкнена (див. layout)
    setShow(true); // вибору ще не було — показуємо банер
  }, []);

  function updateConsent(v: 'granted' | 'denied') {
    const w = window as unknown as { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[] };
    const payload = { analytics_storage: v, ad_storage: v };
    try {
      if (w.gtag) w.gtag('consent', 'update', payload);
      else (w.dataLayer = w.dataLayer || []).push(['consent', 'update', payload]);
    } catch {}
  }

  function choose(v: 'granted' | 'denied') {
    try { localStorage.setItem(KEY, v); } catch {}
    updateConsent(v);
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Згода на файли cookie">
      <div className="cookie-inner">
        <p className="cookie-text">
          Ми використовуємо файли cookie, щоб сайт працював коректно, та аналітичні cookie — щоб покращувати його.
          Аналітику вмикаємо лише за вашої згоди. Докладніше — у{' '}
          <Link href="/polityka-konfidentsiynosti">Політиці конфіденційності</Link>.
        </p>
        <div className="cookie-actions">
          <button type="button" className="btn ghost" onClick={() => choose('denied')}>Лише необхідні</button>
          <button type="button" className="btn" onClick={() => choose('granted')}>Прийняти всі</button>
        </div>
      </div>
    </div>
  );
}
