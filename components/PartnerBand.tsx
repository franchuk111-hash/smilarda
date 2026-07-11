import { Reveal } from './Motion';

type Props = {
  badge: string;
  title: string;
  text: string;
  cta?: string;
};

export default function PartnerBand({ badge, title, text, cta = 'Перейти на vgb.team ↗' }: Props) {
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
            <a href="https://vgb.team/" target="_blank" rel="noopener" className="btn lg">{cta}</a>
            <a href="tel:+380977799513" className="btn ghost lg" style={{ textAlign: 'center' }}>📞 +38 (097) 779 95 13</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
