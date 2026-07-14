import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd, { breadcrumb } from '@/components/JsonLd';
import { Reveal } from '@/components/Motion';
import Calculator from '@/components/Calculator';

export const metadata: Metadata = {
  title: 'Калькулятор вартості ремонту у Смілі — розрахунок онлайн',
  description:
    'Розрахуйте орієнтовну вартість ремонту квартири, будинку чи комерційного приміщення у Смілі та Черкаській області за 1 хвилину. Косметичний, капітальний, під ключ.',
  alternates: { canonical: '/kalkulyator' },
};

export default function KalkulyatorPage() {
  return (
    <>
      <JsonLd data={breadcrumb([{ name: 'Головна', path: '/' }, { name: 'Калькулятор', path: '/kalkulyator' }])} />
      <div className="container"><div className="crumbs"><Link href="/">Головна</Link> → Калькулятор</div></div>

      <section className="block" style={{ paddingTop: 6 }}><div className="container">
        <Reveal>
          <p className="kicker">Розрахунок за 1 хвилину</p>
          <h2 className="title">Калькулятор вартості ремонту</h2>
          <p className="sub">Дізнайтесь орієнтовну ціну ремонту онлайн — оберіть параметри, і ми покажемо приблизний кошторис. Точну вартість визначає майстер після безкоштовного виїзду на об’єкт.</p>
        </Reveal>
        <Reveal>
          <Calculator />
        </Reveal>
      </div></section>
    </>
  );
}
