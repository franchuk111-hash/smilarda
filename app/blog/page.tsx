import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { breadcrumb } from '@/components/JsonLd';
import PartnerBand from '@/components/PartnerBand';
import { Reveal, Stagger, Item } from '@/components/Motion';

export const metadata: Metadata = {
  title: 'Блог про будівництво та ремонт у Смілі — поради й гайди',
  description:
    'Статті та гайди про будівництво і ремонт: як вибрати покрівлю, чим утеплити фасад, етапи ремонту квартири під ключ. Практичні поради для мешканців Сміли та Черкаської області.',
  alternates: { canonical: '/blog' },
};

const posts = [
  { href: '/blog/pokrivlya', ico: '🏠', cat: 'Покрівля', h: 'Як вибрати покрівлю для приватного будинку', p: 'Металочерепиця, профнастил чи бітумна черепиця — порівнюємо за ціною, довговічністю, вагою та монтажем.', min: '7 хв читання' },
  { href: '/blog/uteplennya', ico: '🧱', cat: 'Фасад', h: 'Утеплення фасаду: матеріали та ціни 2026', p: 'Мінеральна вата чи пінополістирол, яку товщину обрати та скільки коштує «мокрий фасад» у Смілі.', min: '6 хв читання' },
  { href: '/blog/remont', ico: '🛠️', cat: 'Ремонт', h: 'Ремонт квартири під ключ: етапи та бюджет', p: 'Покрокова послідовність робіт — від демонтажу до чистового оздоблення, щоб нічого не забути й не переплатити.', min: '8 хв читання' },
];

export default function Blog() {
  return (
    <>
      <JsonLd data={breadcrumb([{ name: 'Головна', path: '/' }, { name: 'Блог', path: '/blog' }])} />
      <div className="container"><div className="crumbs"><Link href="/">Головна</Link> → Блог</div></div>

      <section className="block" style={{ paddingTop: 6 }}><div className="container">
        <Reveal>
          <p className="kicker">Блог</p>
          <h2 className="title">Поради з будівництва та ремонту</h2>
          <p className="sub">Розбираємо матеріали, технології та ціни простою мовою — щоб ви ухвалювали зважені рішення щодо свого житла.</p>
        </Reveal>
        <Stagger className="posts">
          {posts.map((p) => (
            <Item key={p.href} hover>
              <Link className="post" href={p.href} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="cover">{p.ico}</div>
                <div className="body">
                  <span className="cat">{p.cat}</span>
                  <h3>{p.h}</h3>
                  <p>{p.p}</p>
                  <span className="meta">{p.min}</span>
                </div>
              </Link>
            </Item>
          ))}
        </Stagger>
      </div></section>

      <PartnerBand
        badge="⭐ Рекомендований підрядник"
        title="Від теорії — до готового об’єкта"
        text="Коли визначитеся з матеріалами й бюджетом, роботи «під ключ» у Смілі виконає бригада V.G.BuildingTeam — із договором і гарантією."
      />
    </>
  );
}
