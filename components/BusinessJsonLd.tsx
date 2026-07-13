import JsonLd from './JsonLd';

const business = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': 'https://smilarda.org.ua/#business',
  name: 'Сміла Буд',
  url: 'https://smilarda.org.ua/',
  telephone: '+380684318000',
  description:
    'Будівельна компанія у Смілі: будівництво та ремонт під ключ — покрівля, утеплення фасадів, гідроізоляція, загальнобудівельні роботи, ремонт квартир і будинків.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'бульвар Бобринського, 4',
    addressLocality: 'Сміла',
    addressRegion: 'Черкаська область',
    postalCode: '20700',
    addressCountry: 'UA',
  },
  areaServed: { '@type': 'City', name: 'Сміла' },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '19:00',
    },
  ],
  priceRange: '₴₴',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '3' },
  sameAs: ['https://share.google/m43A4eiZ2pBRadfph'],
};

export default function BusinessJsonLd() {
  return <JsonLd data={business} />;
}
