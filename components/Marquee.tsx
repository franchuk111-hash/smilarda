const items = [
  'Покрівля', 'Утеплення фасаду', 'Гідроізоляція', 'Фундаменти', 'Мурування',
  'Стяжка підлоги', 'Ремонт під ключ', 'Septik', 'Реконструкція', 'Штукатурка',
];

export default function Marquee() {
  const loop = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">
        {loop.map((t, i) => (
          <span className="m" key={i}>
            <span className="d" />
            {t === 'Septik' ? 'Септики' : t}
          </span>
        ))}
      </div>
    </div>
  );
}
