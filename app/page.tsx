import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PartnerBand from '@/components/PartnerBand';
import Icon from '@/components/Icon';
import Marquee from '@/components/Marquee';
import Magnetic from '@/components/Magnetic';
import BentoCard from '@/components/BentoCard';
import BrickWall from '@/components/BrickWall';
import PinnedGallery from '@/components/PinnedGallery';
import WorkImage from '@/components/WorkImage';
import { Reveal, Stagger, Item, Counter } from '@/components/Motion';

export const metadata: Metadata = {
  title: 'Будівництво та ремонт у Смілі — ціни, поради, підрядники 2026 | Сміла Буд',
  description:
    'Сміла Буд — місцевий портал про будівництво та ремонт у Смілі й Черкаській області. Орієнтовні ціни на роботи, гайди з покрівлі, утеплення, гідроізоляції та вибору перевіреного підрядника.',
  alternates: { canonical: '/' },
};

const services = [
  { ico: 'home', h: 'Покрівельні роботи', p: 'Монтаж і ремонт покрівлі: металочерепиця, профнастил, бітумна черепиця, водостічні системи та утеплення даху.', price: '690 грн', unit: '/м²', more: 'Як обрати покрівлю →', href: '/blog/pokrivlya' },
  { ico: 'brick', h: 'Утеплення фасаду', p: 'Мокрий фасад, мінеральна вата чи пінополістирол, декоративна штукатурка. Тепліше житло й менші рахунки за опалення.', price: '540 грн', unit: '/м²', more: 'Матеріали та ціни →', href: '/blog/uteplennya' },
  { ico: 'droplet', h: 'Гідроізоляція', p: 'Захист фундаменту, підвалу, покрівлі та санвузлів від вологи. Обмазувальна, рулонна та проникна гідроізоляція.', price: '420 грн', unit: '/м²', more: 'Детальні ціни →', href: '/tsiny' },
  { ico: 'building', h: 'Загальнобудівельні роботи', p: 'Фундаменти, мурування, перегородки, стяжки, реконструкція та прибудови. Повний цикл — від котловану до здачі.', price: '780 грн', unit: '/м²', more: 'Усі роботи →', href: '/poslugy' },
  { ico: 'wrench', h: 'Ремонт квартир під ключ', p: 'Косметичний і капітальний ремонт: демонтаж, електрика, сантехніка, стіни, стеля, підлога та фінішне оздоблення.', price: '3 200 грн', unit: '/м²', more: 'Етапи ремонту →', href: '/blog/remont' },
  { ico: 'tank', h: 'Монтаж септиків', p: 'Автономна каналізація для приватного будинку чи дачі: підбір, установка й запуск септика під ваш ґрунт.', price: '18 000 грн', unit: '/шт', more: 'Докладніше →', href: '/poslugy' },
];

const why = [
  { ico: 'clipboard', h: 'Кошторис наперед', p: 'Дивіться орієнтовні ціни за м² до старту, щоб реально спланувати бюджет.' },
  { ico: 'shield', h: 'Перевірений підрядник', p: 'Договір, фото робіт і гарантія — ознаки бригади, якій можна довіряти.' },
  { ico: 'package', h: 'Правильні матеріали', p: 'Підбір матеріалів під клімат і бюджет економить гроші на роках експлуатації.' },
  { ico: 'pin', h: 'Локально у Смілі', p: 'Місцева бригада швидше виїжджає на об’єкт і знає особливості регіону.' },
];

const posts = [
  { href: '/blog/pokrivlya', ico: 'home', cat: 'Покрівля', h: 'Як вибрати покрівлю для приватного будинку', p: 'Металочерепиця, профнастил чи бітумна черепиця — порівнюємо за ціною, довговічністю та монтажем.', min: 'Читати · 7 хв' },
  { href: '/blog/uteplennya', ico: 'brick', cat: 'Фасад', h: 'Утеплення фасаду: матеріали та ціни 2026', p: 'Мінвата чи пінопласт, товщина утеплювача та скільки коштує «мокрий фасад» у Смілі.', min: 'Читати · 6 хв' },
  { href: '/blog/remont', ico: 'wrench', cat: 'Ремонт', h: 'Ремонт квартири під ключ: етапи та бюджет', p: 'Покрокова послідовність робіт — від демонтажу до чистового оздоблення, щоб нічого не забути.', min: 'Читати · 8 хв' },
];

const jobs = [
  { ico: 'brick', h: 'Муляр', p: 'Мурування стін і перегородок із газоблоку та цегли.' },
  { ico: 'home', h: 'Покрівельник', p: 'Монтаж металочерепиці, профнастилу, гнучкої черепиці.' },
  { ico: 'roller', h: 'Оздоблювальник', p: 'Штукатурка, шпаклівка, фарбування, укладання плитки.' },
  { ico: 'hardhat', h: 'Підсобник', p: 'Старт без досвіду з можливістю опанувати ремесло.' },
];

const works = [
  { n: '01', scene: 'house', type: 'Будівництво під ключ', h: 'Приватний будинок', area: '120 м² · Сміла' },
  { n: '02', scene: 'interior', type: 'Капітальний ремонт', h: 'Квартира під ключ', area: '65 м² · вул. Незалежності' },
  { n: '03', scene: 'facade', type: 'Мокрий фасад', h: 'Утеплення котеджу', area: '180 м² · Сміла' },
  { n: '04', scene: 'roof', type: 'Покрівля', h: 'Металочерепиця', area: '140 м² · район' },
  { n: '05', scene: 'mansard', type: 'Реконструкція', h: 'Мансардний дах', area: '90 м² · Сміла' },
  { n: '06', scene: 'septic', type: 'Автономна каналізація', h: 'Монтаж септика', area: 'приватний двір' },
];

const steps = [
  { n: '01', h: 'Заявка', p: 'Ви залишаєте запит — телефоном або через форму на сайті.' },
  { n: '02', h: 'Виїзд і замір', p: 'Майстер безкоштовно виїжджає на об’єкт у Смілі.' },
  { n: '03', h: 'Кошторис', p: 'Отримуєте детальний прозорий кошторис і графік.' },
  { n: '04', h: 'Роботи', p: 'Бригада виконує роботи за договором із фотозвітом.' },
  { n: '05', h: 'Здача під ключ', p: 'Приймаєте готовий об’єкт із гарантією на роботи.' },
];

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Сміла Буд',
          alternateName: 'smilarda.org.ua',
          url: 'https://smilarda.org.ua/',
          inLanguage: 'uk-UA',
          description: 'Портал про будівництво та ремонт у Смілі та Черкаській області: ціни, поради, підрядники.',
        }}
      />

      <section className="hero">
        <div className="grid-bg" />
        <span className="orb o1" /><span className="orb o2" />
        <div className="floaty">
          <span className="tile" style={{ top: 0, left: 130 }}><Icon name="building" /></span>
          <span className="tile" style={{ top: 96, left: 235 }}><Icon name="home" /></span>
          <span className="tile" style={{ top: 190, left: 40 }}><Icon name="droplet" /></span>
          <span className="tile" style={{ top: 236, left: 200 }}><Icon name="wrench" /></span>
        </div>
        <div className="container hero-reveal">
          <span className="badge"><span className="dot" /> Сміла та Черкаська область</span>
          <h1>Будівництво та ремонт <em>під ключ</em> у Смілі</h1>
          <p className="lead">Місцевий довідник із будівельних робіт: орієнтовні ціни 2026 року, покрокові гайди та перевірені підрядники Сміли. Розберіться в матеріалах і бюджеті ще до початку робіт.</p>
          <div className="hero-actions">
            <Magnetic><Link href="/tsiny" className="btn lg">Подивитися ціни 2026</Link></Magnetic>
            <Magnetic><Link href="/poslugy" className="btn glass lg">Види робіт</Link></Magnetic>
          </div>
          <div className="stats">
            <div className="s"><b><Counter value={12} suffix="+" immediate /></b><span>видів робіт</span></div>
            <div className="s"><b>2026</b><span>актуальні ціни</span></div>
            <div className="s"><b>1–3 <span style={{ fontSize: 18 }}>дні</span></b><span>виїзд на прорахунок</span></div>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="block"><div className="container">
        <Reveal>
          <p className="kicker center">Що ми робимо</p>
          <h2 className="title center">Основні види будівельних робіт</h2>
          <p className="sub center">Найпоширеніші напрямки, які замовляють мешканці Сміли та району. Ціни орієнтовні — точну вартість рахують після виїзду на об’єкт.</p>
        </Reveal>
        <Stagger className="bento">
          <BentoCard className="big">
            <div>
              <p className="kicker">Повний цикл</p>
              <h3>Будівництво та ремонт під ключ у Смілі</h3>
              <p>Від фундаменту до чистового оздоблення — одна бригада, договір і гарантія на всі роботи.</p>
            </div>
            <Link href="/poslugy" className="btn lg">Усі послуги →</Link>
          </BentoCard>
          {services.map((s) => (
            <BentoCard key={s.h}>
              <div className="ico"><Icon name={s.ico} /></div>
              <h3>{s.h}</h3>
              <div className="price">від <b>{s.price}</b>{s.unit}</div>
              <Link className="more" href={s.href}>{s.more}</Link>
            </BentoCard>
          ))}
          <BentoCard className="wide">
            <div>
              <p className="kicker">Безкоштовно</p>
              <h3 style={{ margin: 0 }}>Виїзд майстра на прорахунок</h3>
            </div>
            <a href="tel:+380684318000" className="btn ghost lg">📞 +38 (068) 431 8000</a>
          </BentoCard>
        </Stagger>
      </div></section>

      <div className="kinetic" aria-hidden="true">
        <div className="ktrack">
          {['Будуємо', 'Ремонтуємо', 'Утеплюємо', 'Будуємо', 'Ремонтуємо', 'Утеплюємо'].map((w, i) => (
            <span className={`k${i % 3 === 1 ? ' fill' : ''}`} key={i}>{w} •</span>
          ))}
        </div>
      </div>

      <section className="block brickband"><div className="container">
        <Reveal>
          <p className="kicker center">Надійно</p>
          <h2 className="title center">Мур, що тримає роки</h2>
          <p className="sub center">Рівна кладка, якісний розчин і дотримання технології — основа будинку, який не дасть тріщин. Дивіться, як зводиться стіна.</p>
        </Reveal>
        <BrickWall />
        <div className="brick-hint"><span>🔊 Клікніть на стіну — почуйте, як лягає цегла</span></div>
      </div></section>

      <section className="block soft"><div className="container">
        <Reveal>
          <p className="kicker center">Чому це важливо</p>
          <h2 className="title center">Як не переплатити за будівництво</h2>
          <p className="sub center">Порахуйте бюджет заздалегідь і перевірте підрядника — тоді ремонт не перетвориться на довгобуд.</p>
        </Reveal>
        <Stagger className="grid4">
          {why.map((w) => (
            <Item key={w.h} className="feat">
              <div className="ico"><Icon name={w.ico} /></div>
              <h3>{w.h}</h3>
              <p>{w.p}</p>
            </Item>
          ))}
        </Stagger>
      </div></section>

      <PinnedGallery
        kicker="Портфоліо"
        title="Наші роботи у Смілі"
        sub="Гортайте — реальні об’єкти, зведені та відремонтовані місцевою бригадою у Смілі та районі."
      >
        {works.map((w) => (
          <div key={w.n} className="work">
            <div className="wbg"><WorkImage scene={w.scene} /></div>
            <div className="wn">{w.n}</div>
            <div className="wcap">
              <div className="wtype">{w.type}</div>
              <h3>{w.h}</h3>
              <div className="warea">{w.area}</div>
            </div>
          </div>
        ))}
      </PinnedGallery>

      <section className="block"><div className="container">
        <Reveal>
          <p className="kicker center">Як ми працюємо</p>
          <h2 className="title center">Від заявки до готового об’єкта</h2>
          <p className="sub center">Прозорий процес у п’ять кроків — ви завжди розумієте, що відбувається й скільки це коштує.</p>
        </Reveal>
        <Stagger className="steps">
          {steps.map((st) => (
            <Item key={st.n} className="stepc">
              <div className="n">{st.n}</div>
              <h3>{st.h}</h3>
              <p>{st.p}</p>
            </Item>
          ))}
        </Stagger>
      </div></section>

      <PartnerBand
        badge="🏗️ Будівельна компанія · 5,0 ★ Google"
        title="Сміла Буд — будівництво та ремонт у Смілі"
        text="Місцева бригада, що виконує покрівлю, утеплення фасадів, гідроізоляцію, загальнобудівельні роботи та ремонт під ключ. Безкоштовний виїзд на прорахунок і договір на всі роботи."
      />

      <section className="block soft"><div className="container">
        <Reveal>
          <p className="kicker center">Корисне</p>
          <h2 className="title center">Останні статті та гайди</h2>
          <p className="sub center">Розбираємо матеріали, технології та ціни простою мовою.</p>
        </Reveal>
        <Stagger className="posts">
          {posts.map((p) => (
            <Item key={p.href} className="post" hover>
              <Link href={p.href} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="cover"><Icon name={p.ico} /></div>
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
        <Reveal style={{ textAlign: 'center', marginTop: 34 }}>
          <Link href="/blog" className="btn ghost lg">Усі статті блогу</Link>
        </Reveal>
      </div></section>

      <section className="block"><div className="container">
        <Reveal>
          <p className="kicker center">Робота у Смілі</p>
          <h2 className="title center">Шукаєте роботу в будівництві?</h2>
          <p className="sub center">Будівельним бригадам Сміли постійно потрібні мулярі, покрівельники, оздоблювальники та підсобники — зокрема й без досвіду.</p>
        </Reveal>
        <Stagger className="grid4">
          {jobs.map((j) => (
            <Item key={j.h} className="feat">
              <div className="ico"><Icon name={j.ico} /></div>
              <h3>{j.h}</h3>
              <p>{j.p}</p>
            </Item>
          ))}
        </Stagger>
        <Reveal style={{ textAlign: 'center', marginTop: 30 }}>
          <a href="https://robota-smila.com.ua/" target="_blank" rel="noopener" className="btn lg">Вакансії Сміли на robota-smila.com.ua ↗</a>
          <Link href="/robota" className="btn ghost lg" style={{ marginLeft: 10 }}>Про роботу в будівництві</Link>
        </Reveal>
      </div></section>

      <section className="block"><div className="container">
        <Reveal className="seo-text">
          <h2>Будівництво та ремонт у Смілі, Черкаська область</h2>
          <p><b>Сміла Буд (smilarda.org.ua)</b> — місцева будівельна компанія у місті Сміла та Черкаській області. Виконуємо будівництво та ремонт під ключ, а також ведемо портал із орієнтовними цінами 2026 року, гайдами й порадами, щоб ви могли спланувати бюджет ще до початку робіт.</p>
          <p>Ми виконуємо <b>покрівельні роботи</b>, <b>утеплення фасадів</b>, <b>гідроізоляцію</b>, загальнобудівельні роботи, <b>ремонт квартир під ключ</b> та монтаж автономної каналізації. На кожен об’єкт — договір, кошторис і гарантія; виїзд майстра на замір по Смілі та району безкоштовний.</p>
          <p>Потрібен прорахунок? Зателефонуйте <a href="tel:+380684318000">+38 (068) 431 8000</a> або залиште заявку на сторінці <Link href="/kontakty">Контакти</Link> — і майстер «Сміла Буд» безкоштовно виїде на об’єкт.</p>
        </Reveal>
      </div></section>
    </>
  );
}
