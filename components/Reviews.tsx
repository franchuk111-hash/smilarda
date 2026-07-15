import { Reveal } from './Motion';

const GBP = 'https://share.google/m43A4eiZ2pBRadfph';

export default function Reviews() {
  return (
    <section className="block soft">
      <div className="container">
        <Reveal>
          <p className="kicker center">Відгуки</p>
          <h2 className="title center">Нас оцінюють на 5,0 ★</h2>
          <p className="sub center">Оцінка в Google від клієнтів у Смілі та районі. Усі відгуки — реальні, читайте їх у профілі компанії.</p>
        </Reveal>
        <Reveal className="rating-card">
          <div className="rate-num">5,0</div>
          <div className="rate-stars" aria-hidden="true">★★★★★</div>
          <div className="rate-meta">На основі 3 відгуків у Google</div>
          <div className="rate-actions">
            <a href={GBP} target="_blank" rel="noopener" className="btn lg">Читати відгуки в Google ↗</a>
            <a href={GBP} target="_blank" rel="noopener" className="btn ghost lg">Залишити відгук</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
