import React from 'react';
import Header from './Header.jsx';
import './QatarLanding.css';

const cabins = [
  {
    name: 'First Class',
    tagline: 'The Pinnacle of Luxury',
    desc: 'Experience ultimate privacy and personalized service in our exclusive First Class suites. Enjoy gourmet dining, premium champagne, and a dedicated concierge.',
    features: ['Private suite with closing door', 'Personalized gourmet menu', 'Premium Champagne & Caviar', 'Exclusive lounge access', 'Chauffeur service', 'Turn-down bedding service'],
    icon: '👑',
  },
  {
    name: 'Business Class',
    tagline: 'Award-Winning Qsuite',
    desc: 'Our revolutionary Qsuite features the industry\'s first double bed in business class. Enjoy privacy, space, and exceptional service throughout your journey.',
    features: ['Qsuite private suite', 'Lie-flat bed', 'A la carte dining', 'Priority boarding', 'Lounge access', 'Large entertainment screen'],
    icon: '🛋️',
  },
  {
    name: 'Premium Economy',
    tagline: 'Extra Comfort, Elevated',
    desc: 'More space, enhanced dining, and priority services. The perfect balance of comfort and value for your long-haul travels.',
    features: ['Extra legroom', 'Premium meal service', 'Priority check-in', 'Larger seat with more recline', 'Noise-canceling headphones', 'Amenity kit'],
    icon: '💺',
  },
  {
    name: 'Economy Class',
    tagline: 'Exceptional Value',
    desc: 'Award-winning economy service with generous legroom, delicious complimentary meals, and access to over 4,000 entertainment channels.',
    features: ['Complimentary meals', 'Personal entertainment', '40kg baggage allowance', 'Seat selection', 'USB charging', 'Wi-Fi available'],
    icon: '✈️',
  },
];

const amenities = [
  { icon: '🍽️', title: 'Gourmet Dining', desc: 'Regionally-inspired menus crafted by world-class chefs with premium wine pairings.' },
  { icon: '🎬', title: 'Oryx One Entertainment', desc: 'Over 4,000 channels of movies, TV, music, games, and live sports on your personal screen.' },
  { icon: '📶', title: 'Stay Connected', desc: 'High-speed Wi-Fi and USB charging at every seat. Stay productive or entertained.' },
  { icon: '🧴', title: 'Amenity Kits', desc: 'Premium amenity kits featuring luxury skincare brands and comfort essentials.' },
  { icon: '🍸', title: 'Premium Beverages', desc: 'Curated selection of fine wines, champagne, spirits, and signature cocktails.' },
  { icon: '🛡️', title: 'Award-Winning Service', desc: 'Recognized as World\'s Best Airline by Skytrax, our cabin crew delivers exceptional hospitality.' },
];

export default function Experience() {
  return (
    <div className="app-content">
      <div className="light-sweep" aria-hidden="true" />
      <Header />

      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="page-hero__content">
          <span className="section-label">Experience</span>
          <h1 className="page-hero__title">A World of Comfort</h1>
          <p className="page-hero__desc">
            From the moment you step onboard, every detail is designed to make your journey
            as exceptional as the destination itself.
          </p>
        </div>
      </section>

      {/* Cabins */}
      <section className="features" style={{ borderTop: 'none' }}>
        <div className="features__inner">
          <div className="features__header">
            <span className="section-label">Cabins</span>
            <h2 className="section-title">Choose Your Experience</h2>
            <p className="section-subtitle" style={{ margin: '10px auto 0' }}>
              Every cabin class offers a uniquely elevated experience, from luxurious suites to exceptional economy.
            </p>
          </div>

          <div className="offer-section__cards">
            {cabins.map((cabin, i) => (
              <div className="offer-card" key={i} style={{ padding: '28px' }}>
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{cabin.icon}</div>
                <h3 className="offer-card__title" style={{ fontSize: '20px' }}>{cabin.name}</h3>
                <p style={{ color: 'var(--qa-gold)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '8px' }}>{cabin.tagline}</p>
                <p className="offer-card__desc">{cabin.desc}</p>
                <ul className="offer-card__features">
                  {cabin.features.map((feat, j) => (
                    <li className="offer-card__feature" key={j}>
                      <span className="offer-card__check">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button className="btn-primary" style={{ width: '100%' }}>Learn more</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="offer-section" style={{ paddingTop: '40px' }}>
        <div className="offer-section__header">
          <span className="section-label">Onboard</span>
          <h2 className="section-title">Premium Amenities</h2>
          <p className="section-subtitle" style={{ margin: '10px auto 0' }}>
            Every detail thoughtfully curated for your comfort and enjoyment.
          </p>
        </div>

        <div className="features__grid">
          {amenities.map((item, i) => (
            <div className="features__card" key={i}>
              <div className="features__card-icon">{item.icon}</div>
              <h3 className="features__card-title">{item.title}</h3>
              <p className="features__card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}