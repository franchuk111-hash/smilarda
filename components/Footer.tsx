import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site">
      <div className="container">
        <div className="fcols">
          <div>
            <h4>Сміла Буд</h4>
            <p>Інформаційний портал про будівництво та ремонт у Смілі й Черкаській області: гайди, орієнтовні ціни, поради з вибору підрядника.</p>
          </div>
          <div>
            <h4>Розділи</h4>
            <Link href="/poslugy">Види робіт</Link>
            <Link href="/tsiny">Ціни 2026</Link>
            <Link href="/blog">Блог</Link>
            <Link href="/robota">Робота</Link>
            <Link href="/kontakty">Контакти</Link>
          </div>
          <div>
            <h4>Популярне</h4>
            <Link href="/blog/pokrivlya">Вибір покрівлі</Link>
            <Link href="/blog/uteplennya">Утеплення фасаду</Link>
            <Link href="/blog/remont">Ремонт під ключ</Link>
          </div>
          <div>
            <h4>Партнери</h4>
            <a href="https://vgb.team/" target="_blank" rel="noopener">V.G.BuildingTeam ↗</a>
            <a href="https://robota-smila.com.ua/" target="_blank" rel="noopener">Робота у Смілі ↗</a>
            <a href="tel:+380977799513">+38 (097) 779 95 13</a>
          </div>
        </div>
        <div className="fbottom">
          <span>© 2026 smilarda.org.ua — Сміла Буд. Будівництво та ремонт у Смілі.</span>
          <span>
            Партнери:{' '}
            <a href="https://vgb.team/" target="_blank" rel="noopener" style={{ color: '#fdba74' }}>vgb.team</a>{' · '}
            <a href="https://robota-smila.com.ua/" target="_blank" rel="noopener" style={{ color: '#fdba74' }}>robota-smila.com.ua</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
