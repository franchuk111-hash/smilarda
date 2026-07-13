import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { breadcrumb } from '@/components/JsonLd';
import { Reveal, Stagger, Item } from '@/components/Motion';

export const metadata: Metadata = {
  title: 'Контакти — будівельна компанія Сміла Буд',
  description:
    'Контакти Сміла Буд у Смілі: адреса бульвар Бобринського 4, телефон +38 (097) 779 95 13, графік роботи. Будівництво та ремонт під ключ. Безкоштовний виїзд на прорахунок.',
  alternates: { canonical: '/kontakty' },
};

const GBP = 'https://share.google/m43A4eiZ2pBRadfph';

export default function Kontakty() {
  return (
    <>
      <JsonLd data={breadcrumb([{ name: 'Головна', path: '/' }, { name: 'Контакти', path: '/kontakty' }])} />
      <div className="container"><div className="crumbs"><Link href="/">Головна</Link> → Контакти</div></div>

      <section className="block" style={{ paddingTop: 6 }}><div className="container">
        <Reveal>
          <p className="kicker">Контакти</p>
          <h2 className="title">Зв’язатися зі «Сміла Буд»</h2>
          <p className="sub">Будівельна компанія у Смілі — будівництво та ремонт під ключ. Зателефонуйте або замовте безкоштовний виїзд майстра на прорахунок.</p>
        </Reveal>

        <Stagger className="contact-grid">
          <Item className="contact-card">
            <h3>Сміла Буд</h3>
            <div className="contact-row"><span className="ico">🏢</span><div><b>Будівельна компанія</b><span>Будівництво та ремонт під ключ · 5,0 ★ у Google (3 відгуки)</span></div></div>
            <div className="contact-row"><span className="ico">📞</span><div><b><a href="tel:+380977799513">+38 (097) 779 95 13</a></b><span>Дзвінки, Viber, Telegram</span></div></div>
            <div className="contact-row"><span className="ico">📍</span><div><b>бульвар Бобринського, 4</b><span>Сміла, Черкаська область, 20700</span></div></div>
            <div className="contact-row"><span className="ico">🕒</span><div><b>Пн–Сб, 8:00–19:00</b><span>Неділя — за домовленістю</span></div></div>
            <div className="contact-row"><span className="ico">🗺️</span><div><b><a href={GBP} target="_blank" rel="noopener">Профіль у Google · Маршрут</a></b><span>Відгуки, фото та як дістатися</span></div></div>
            <div className="contact-row"><span className="ico">🌐</span><div><b><a href="https://vgb.team/" target="_blank" rel="noopener">vgb.team</a></b><span>Портфоліо робіт, послуги та ціни</span></div></div>
            <p style={{ marginTop: 20 }}><a href="tel:+380977799513" className="btn lg">📞 Замовити прорахунок</a></p>
          </Item>

          <Item className="contact-card">
            <h3>Про компанію</h3>
            <p style={{ color: 'var(--muted)' }}>«Сміла Буд» — місцева будівельна компанія з понад 10-річним досвідом. Виконуємо покрівельні роботи, утеплення фасадів, гідроізоляцію, загальнобудівельні роботи та ремонт квартир і будинків під ключ у Смілі та районі.</p>
            <p style={{ color: 'var(--muted)' }}>На кожен об’єкт — договір, кошторис і гарантія на роботи. Виїзд майстра на замір по місту та району — безкоштовний.</p>
            <div className="contact-row" style={{ marginTop: 8 }}><span className="ico">🧭</span><div><b>Послуги та ціни</b><span><Link href="/poslugy">Види робіт</Link> · <Link href="/tsiny">Ціни 2026</Link> · <Link href="/blog">Поради</Link></span></div></div>
            <div className="contact-row"><span className="ico">📚</span><div><b>Гайди</b><span><Link href="/blog/pokrivlya">Покрівля</Link> · <Link href="/blog/uteplennya">Фасад</Link> · <Link href="/blog/remont">Ремонт</Link></span></div></div>
          </Item>
        </Stagger>
      </div></section>
    </>
  );
}
