import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { breadcrumb } from '@/components/JsonLd';
import PartnerBand from '@/components/PartnerBand';
import Icon from '@/components/Icon';
import { Reveal, Stagger, Tilt } from '@/components/Motion';

export const metadata: Metadata = {
  title: 'Будівельні послуги у Смілі — покрівля, фасади, ремонт',
  description:
    'Види будівельних і ремонтних робіт у Смілі: покрівля, утеплення фасаду, гідроізоляція, загальнобудівельні роботи, ремонт квартир під ключ і монтаж септиків. Що входить у кожну послугу.',
  alternates: { canonical: '/poslugy' },
};

const services = [
  { id: 'pokrivlya', ico: 'home', h: 'Покрівельні роботи', p: 'Монтаж нової та ремонт старої покрівлі: металочерепиця, профнастил, бітумна (гнучка) черепиця. Влаштування крокв, гідро- й пароізоляції, утеплення даху, монтаж водостічних систем, підшивка карнизів.', price: '690 грн', unit: '/м²', more: 'Як обрати покрівлю →', href: '/blog/pokrivlya' },
  { id: 'fasad', ico: 'brick', h: 'Утеплення фасаду', p: 'Технологія «мокрий фасад»: підготовка основи, монтаж утеплювача (мінвата або пінополістирол), армувальний шар, ґрунтування та декоративна штукатурка (короїд, баранець). Тепліше житло та економія на опаленні.', price: '540 грн', unit: '/м²', more: 'Матеріали та ціни →', href: '/blog/uteplennya' },
  { id: 'gidro', ico: 'droplet', h: 'Гідроізоляція', p: 'Захист конструкцій від вологи: обмазувальна, рулонна (наплавлювана) та проникна гідроізоляція. Фундаменти, підвали, цоколі, тераси, санвузли та пласкі покрівлі. Продовжує строк служби будівлі.', price: '420 грн', unit: '/м²', more: 'Ціни на роботи →', href: '/tsiny' },
  { id: 'zagalno', ico: 'building', h: 'Загальнобудівельні роботи', p: 'Повний цикл: земляні роботи, стрічкові та плитні фундаменти, мурування стін із газоблоку й цегли, монтаж перегородок, стяжки підлоги, реконструкція та прибудови до будинку.', price: '780 грн', unit: '/м²', more: 'Ціни на роботи →', href: '/tsiny' },
  { id: 'remont', ico: 'wrench', h: 'Ремонт квартир і будинків під ключ', p: 'Косметичний і капітальний ремонт: демонтаж, розведення електрики й сантехніки, вирівнювання стін і стель, монтаж підлоги, малярні роботи, укладання плитки та фінішне оздоблення.', price: '3 200 грн', unit: '/м²', more: 'Етапи ремонту →', href: '/blog/remont' },
  { id: 'septyk', ico: 'tank', h: 'Монтаж септиків', p: 'Автономна каналізація для приватного будинку чи дачі: підбір септика під кількість мешканців і тип ґрунту, земляні роботи, установка, підключення й запуск. Рішення «під ключ».', price: '18 000 грн', unit: '/шт', more: 'Замовити консультацію →', href: '/kontakty' },
];

export default function Poslugy() {
  return (
    <>
      <JsonLd data={breadcrumb([{ name: 'Головна', path: '/' }, { name: 'Послуги', path: '/poslugy' }])} />
      <div className="container"><div className="crumbs"><Link href="/">Головна</Link> → Послуги</div></div>

      <section className="block" style={{ paddingTop: 6 }}><div className="container">
        <Reveal>
          <p className="kicker">Види робіт</p>
          <h2 className="title">Будівельні та ремонтні послуги у Смілі</h2>
          <p className="sub">Нижче — основні напрямки робіт із коротким описом того, що входить у кожну послугу. Точний обсяг і кошторис визначають після виїзду майстра на об’єкт.</p>
        </Reveal>
        <Stagger className="services">
          {services.map((s) => (
            <Tilt key={s.id} id={s.id} className="svc">
              <div className="ico"><Icon name={s.ico} /></div>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
              <div className="price">від <b>{s.price}</b>{s.unit}</div>
              <Link className="more" href={s.href}>{s.more}</Link>
            </Tilt>
          ))}
        </Stagger>
      </div></section>

      <PartnerBand
        badge="⭐ Рекомендований підрядник"
        title="Потрібен виконавець у Смілі?"
        text="Усі перелічені роботи виконує місцева бригада V.G.BuildingTeam — із договором, фотозвітом та гарантією. Безкоштовний виїзд на прорахунок по Смілі та району."
      />
    </>
  );
}
