import React from 'react';
import Header from './Header.jsx';
import './QatarLanding.css';

const tiers = [
  {
    name: 'Silver',
    points: '0 – 24,999',
    color: '#a8b8c8',
    benefits: ['Earn 7 Avios per $1 spent', 'Priority check-in', 'Extra baggage allowance', 'Free seat selection', 'Dedicated service line'],
  },
  {
    name: 'Gold',
    points: '25,000 – 59,999',
    color: 'var(--qa-gold)',
    benefits: ['Earn 8 Avios per $1 spent', 'Lounge access + guest', 'Priority boarding & baggage', '50% bonus Avios', 'Flexible ticket changes'],
    featured: true,
  },
  {
    name: 'Platinum',
    points: '60,000+',
    color: '#e8e0d0',
    benefits: ['Earn 9 Avios per $1 spent', 'First Class lounge access', 'Guaranteed extra legroom', '100% bonus Avios', 'Concierge service', 'Chauffeur upgrades'],
  },
];

const waysToEarn = [
  { icon: '✈️', title: 'Fly with Us', desc: 'Earn Avios on every Qatar Airways flight. The higher your fare class, the more you earn.' },
  { icon: '🏨', title: 'Book Hotels', desc: 'Earn Avios when booking hotels through our partners. Double dip with hotel loyalty programs.' },
  { icon: '🚗', title: 'Car Rentals', desc: 'Rent a car with our partners and earn Avios on every rental, every day.' },
  { icon: '🛍️', title: 'Shop Online', desc: 'Shop at over 1,000 online stores through our shopping portal and earn Avios.' },
  { icon: '💳', title: 'Credit Cards', desc: 'Earn Avios on everyday spending with co-branded credit cards from partner banks.' },
  { icon: '🏆', title: 'Promotions', desc: 'Take advantage of bonus Avios promotions and special offers throughout the year.' },
];

export default function PrivilegeClub() {
  return (
    <div className="app-content">
      <div className="light-sweep" aria-hidden="true" />
      <Header />

      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="page-hero__content">
          <span className="section-label">Privilege Club</span>
          <h1 className="page-hero__title">Loyalty Rewarded</h1>
          <p className="page-hero__desc">
            Join Qatar Airways Privilege Club and earn Avios on every flight and purchase.
            Unlock exclusive benefits, upgrades, and unforgettable experiences.
          </p>
          <div className="hero__actions" style={{ marginTop: '24px' }}>
            <button className="btn-primary">Join for free <span aria-hidden="true">→</span></button>
            <button className="hero__btn-secondary">Learn more</button>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="offer-section" style={{ paddingTop: '40px' }}>
        <div className="offer-section__header">
          <span className="section-label">Membership</span>
          <h2 className="section-title">Choose Your Tier</h2>
          <p className="section-subtitle" style={{ margin: '10px auto 0' }}>
            The more you fly, the more benefits you unlock. From Silver to Platinum, each tier offers exceptional rewards.
          </p>
        </div>

        <div className="offer-section__cards">
          {tiers.map((tier, i) => (
            <div className={`offer-card ${tier.featured ? 'offer-card--premium' : ''}`} key={i}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: tier.color, marginBottom: '4px', fontFamily: 'var(--font-display)' }}>{tier.name}</div>
              <p style={{ color: 'var(--qa-text-muted)', fontSize: '14px', marginBottom: '16px' }}>{tier.points} Qpoints</p>
              <ul className="offer-card__features">
                {tier.benefits.map((ben, j) => (
                  <li className="offer-card__feature" key={j}>
                    <span className="offer-card__check">✓</span>
                    {ben}
                  </li>
                ))}
              </ul>
              <button className={`btn-primary ${tier.featured ? '' : 'btn-gold'}`} style={{ width: '100%' }}>
                {tier.featured ? 'View details' : 'Learn more'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Ways to earn */}
      <section className="features">
        <div className="features__inner">
          <div className="features__header">
            <span className="section-label">Earn Avios</span>
            <h2 className="section-title">Ways to Earn</h2>
            <p className="section-subtitle" style={{ margin: '10px auto 0' }}>
              Avios can be earned through flying and everyday activities. Collect them faster with our partners.
            </p>
          </div>

          <div className="features__grid">
            {waysToEarn.map((item, i) => (
              <div className="features__card" key={i}>
                <div className="features__card-icon">{item.icon}</div>
                <h3 className="features__card-title">{item.title}</h3>
                <p className="features__card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}