import Link from 'next/link';
import { Reveal } from './Motion';

type Props = {
  badge: string;
  title: string;
  text: string;
  cta?: string;
};

export default function PartnerBand({ badge, title, text, cta = 'Замовити прорахунок' }: Props) {
  return (
    <section className="block">
      <div className="container">
        <Reveal className="partner">
          <div>
            <span className="badge">{badge}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/kontakty" className="btn lg">{cta}</Link>
            <a href="tel:+380684318000" className="btn ghost lg" style={{ textAlign: 'center' }}>📞 +38 (068) 431 8000</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
