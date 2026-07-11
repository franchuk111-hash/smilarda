import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { breadcrumb } from '@/components/JsonLd';
import { Reveal, Stagger, Item } from '@/components/Motion';

export const metadata: Metadata = {
  title: 'Контакти — будівництво та ремонт у Смілі',
  description:
    'Контакти порталу БудСміла та рекомендованого підрядника V.G.BuildingTeam у Смілі: телефон, месенджери, графік роботи. Замовте безкоштовний виїзд на прорахунок.',
  alternates: { canonical: '/kontakty' },
};

export default function Kontakty() {
  return (
    <>
      <JsonLd data={breadcrumb([{ name: 'Головна', path: '/' }, { name: 'Контакти', path: '/kontakty' }])} />
      <div className="container"><div className="crumbs"><Link href="/">Головна</Link> → Контакти</div></div>

      <section className="block" style={{ paddingTop: 6 }}><div className="container">
        <Reveal>
          <p className="kicker">Контакти</p>
          <h2 className="title">Зв’язатися та замовити роботи у Смілі</h2>
          <p className="sub">БудСміла — інформаційний портал. Замовлення будівельних і ремонтних робіт виконує наш рекомендований підрядник V.G.BuildingTeam.</p>
        </Reveal>

        <Stagger className="contact-grid">
          <Item className="contact-card">
            <h3>Рекомендований підрядник</h3>
            <div className="contact-row"><span className="ico">🏢</span><div><b>V.G.BuildingTeam</b><span>Будівництво та ремонт під ключ</span></div></div>
            <div className="contact-row"><span className="ico">📞</span><div><b><a href="tel:+380977799513">+38 (097) 779 95 13</a></b><span>Дзвінки, Viber</span></div></div>
            <div className="contact-row"><span className="ico">🌐</span><div><b><a href="https://vgb.team/" target="_blank" rel="noopener">vgb.team</a></b><span>Портфоліо, послуги та ціни</span></div></div>
            <div className="contact-row"><span className="ico">📍</span><div><b>Сміла, Черкаська область</b><span>Виїзд по місту та району</span></div></div>
            <div className="contact-row"><span className="ico">🕒</span><div><b>Пн–Сб, 8:00–19:00</b><span>Неділя — за домовленістю</span></div></div>
            <p style={{ marginTop: 20 }}><a href="https://vgb.team/" target="_blank" rel="noopener" className="btn lg">Замовити прорахунок ↗</a></p>
          </Item>

          <Item className="contact-card">
            <h3>Про портал БудСміла</h3>
            <p style={{ color: 'var(--muted)' }}>Ми публікуємо орієнтовні ціни, гайди та поради з будівництва й ремонту, щоб мешканці Сміли могли спланувати роботи та обрати надійного виконавця.</p>
            <p style={{ color: 'var(--muted)' }}>Портал не виконує роботи безпосередньо — за замовленнями звертайтеся до рекомендованого підрядника за контактами ліворуч.</p>
            <div className="contact-row" style={{ marginTop: 8 }}><span className="ico">🧭</span><div><b>Розділи сайту</b><span><Link href="/poslugy">Послуги</Link> · <Link href="/tsiny">Ціни</Link> · <Link href="/blog">Блог</Link> · <Link href="/robota">Робота</Link></span></div></div>
            <div className="contact-row"><span className="ico">📚</span><div><b>Корисні статті</b><span><Link href="/blog/pokrivlya">Покрівля</Link> · <Link href="/blog/uteplennya">Фасад</Link> · <Link href="/blog/remont">Ремонт</Link></span></div></div>
          </Item>
        </Stagger>
      </div></section>
    </>
  );
}
