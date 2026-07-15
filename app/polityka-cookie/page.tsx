import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { breadcrumb } from '@/components/JsonLd';
import { Reveal } from '@/components/Motion';
import CookieSettingsButton from '@/components/CookieSettingsButton';

export const metadata: Metadata = {
  title: 'Політика щодо файлів cookie',
  description:
    'Політика використання файлів cookie на сайті smilarda.org.ua (Сміла Буд): які cookie ми застосовуємо, для чого та як керувати своєю згодою.',
  alternates: { canonical: '/polityka-cookie' },
};

const UPDATED = '14 липня 2026 року';

export default function PolitykaCookie() {
  return (
    <>
      <JsonLd data={breadcrumb([{ name: 'Головна', path: '/' }, { name: 'Політика cookie', path: '/polityka-cookie' }])} />
      <div className="container"><div className="crumbs"><Link href="/">Головна</Link> → Політика cookie</div></div>

      <section className="block" style={{ paddingTop: 6 }}><div className="container">
        <Reveal className="article">
          <h1>Політика щодо файлів cookie</h1>
          <p className="meta">Останнє оновлення: {UPDATED}</p>

          <p>Файли cookie — це невеликі текстові файли, які сайт зберігає у вашому браузері. Вони допомагають сайту
            працювати коректно та збирати знеособлену статистику відвідувань.</p>

          <h2>Які cookie ми використовуємо</h2>
          <ul>
            <li><b>Необхідні (технічні)</b> — потрібні для роботи сайту та запам’ятовування вашого вибору щодо cookie
              й прогресу в калькуляторі. Працюють завжди, згоди не потребують.</li>
            <li><b>Аналітичні</b> (Google Analytics, ідентифікатор G-09V5BVMP18) — допомагають зрозуміти, як відвідувачі
              користуються сайтом. Встановлюються <b>лише після вашої згоди</b>.</li>
          </ul>

          <h2>Як ми запитуємо згоду</h2>
          <p>Під час першого візиту ви бачите банер cookie. До вашого вибору аналітичні cookie <b>вимкнені</b>
            (використовується Google Consent Mode). Ви можете прийняти всі cookie або обмежитися лише необхідними.</p>

          <h2>Як змінити свій вибір</h2>
          <p>Ви можете будь-коли змінити рішення щодо cookie:</p>
          <p><CookieSettingsButton /></p>
          <p>Також cookie можна видалити або заблокувати в налаштуваннях свого браузера. Це не завадить вам залишити заявку.</p>

          <h2>Докладніше</h2>
          <p>Як ми обробляємо персональні дані — у <Link href="/polityka-konfidentsiynosti">Політиці конфіденційності</Link>.
            Питання: <a href="tel:+380977799513">+38 (097) 779 95 13</a>.</p>
        </Reveal>
      </div></section>
    </>
  );
}
