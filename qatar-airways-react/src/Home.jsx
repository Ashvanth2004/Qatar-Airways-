import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './QatarLanding.css';
import Header from './Header.jsx';

const heroImg = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=1080&fit=crop';
const featureImgs = [
  'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1556388158-158d5feacb45?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=600&h=400&fit=crop',
];
const testimonialImgs = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
];
const offerImgs = [
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1562131447-e0f8c5a2e1e2?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560624051-eb19e5b65fd7?w=600&h=400&fit=crop',
];

const destinations = [
  {
    name: 'London',
    country: 'United Kingdom',
    count: '12 flights weekly',
    featured: true,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=750&fit=crop',
  },
  {
    name: 'Paris',
    country: 'France',
    count: '10 flights weekly',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=750&fit=crop',
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    count: '7 flights weekly',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=750&fit=crop',
  },
  {
    name: 'New York',
    country: 'United States',
    count: '14 flights weekly',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=750&fit=crop',
  },
  {
    name: 'Dubai',
    country: 'UAE',
    count: '21 flights weekly',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=750&fit=crop',
  },
  {
    name: 'Sydney',
    country: 'Australia',
    count: '8 flights weekly',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&h=750&fit=crop',
  },
];

const features = [
  {
    icon: '✈️',
    title: 'Award-Winning Service',
    desc: 'Experience world-class hospitality with our award-winning cabin crew, gourmet dining, and premium entertainment system.',
  },
  {
    icon: '🛋️',
    title: 'Luxury Cabins',
    desc: 'From Qsuite Business Class to First Class suites, enjoy unparalleled comfort and privacy at 35,000 feet.',
  },
  {
    icon: '🌍',
    title: '160+ Destinations',
    desc: 'Connect to over 160 destinations worldwide via our hub in Doha, with seamless connections and premium lounges.',
  },
  {
    icon: '🛡️',
    title: 'Flexible Booking',
    desc: 'Book with confidence. Enjoy free date changes, easy refunds, and 24/7 customer support on every ticket.',
  },
  {
    icon: '🍽️',
    title: 'Gourmet Dining',
    desc: 'Savor regionally-inspired menus crafted by world-renowned chefs, paired with fine wines and premium spirits.',
  },
  {
    icon: '🎬',
    title: 'Best Entertainment',
    desc: 'Access over 4,000 channels of movies, TV shows, music, and games on your personal Oryx One screen.',
  },
];

const offers = [
  {
    price: '499',
    currency: 'USD',
    title: 'Economy Comfort',
    desc: 'Great value for smart travelers',
    features: ['40kg baggage allowance', 'Complimentary meals', 'Seat selection', 'Priority boarding'],
    btnClass: '',
  },
  {
    price: '1,299',
    currency: 'USD',
    title: 'Business Class',
    desc: 'The award-winning Qsuite experience',
    features: ['Qsuite private suite', 'Chauffeur service', 'Lounge access', 'Gourmet dining', '60kg baggage'],
    btnClass: 'offer-card--premium',
  },
  {
    price: '3,999',
    currency: 'USD',
    title: 'First Class',
    desc: 'The pinnacle of luxury travel',
    features: ['Private suite with door', 'Chauffeur & Concierge', 'Spa & Lounge access', 'Caviar & Champagne', '80kg baggage'],
    btnClass: '',
  },
];

const testimonials = [
  {
    text: 'The Qsuite business class experience is truly unmatched. The privacy, service, and dining made our 14-hour flight feel effortless. Qatar Airways sets the standard.',
    name: 'Sarah Mitchell',
    detail: 'Business Traveler',
    initials: 'SM',
  },
  {
    text: 'Flying with Qatar Airways is always a pleasure. The crew goes above and beyond, the entertainment system is incredible, and the lounges in Doha are world-class.',
    name: 'James Anderson',
    detail: 'Frequent Flyer',
    initials: 'JA',
  },
  {
    text: 'We took our family vacation with Qatar Airways and were blown away by the attention to detail. The kids were treated like royalty, and the food was amazing!',
    name: 'Priya Sharma',
    detail: 'Family Traveler',
    initials: 'PS',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    from: 'Doha',
    to: 'United Kingdom',
    date: '18 Jun 2026',
    passengers: '1 Passenger, Economy',
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  }

  function onSearch(e) {
    e.preventDefault();
    navigate('/results', { state: { search: searchParams } });
  }

  return (
    <div className="app-content">
      {/* Animated Background Sweep */}
      <div className="light-sweep" aria-hidden="true" />

      <Header />

      {/* ═══ HERO ═══ */}
      <section className="hero">
        <div className="hero__bg">
          <img className="hero__bg-image" src={heroImg} alt="London skyline" />
          <div className="hero__bg-overlay" />
        </div>

        <div className="hero__content">
          <div className="hero__text">
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              World's Best Airline 2026
            </div>

            <h1 className="hero__title">
              Explore the<br />
              <span className="hero__title-accent">United Kingdom</span>
            </h1>

            <p className="hero__description">
              Fly to London, Manchester, Edinburgh, and Birmingham.
              Experience award-winning service and luxury comfort.
            </p>

            <div className="hero__actions">
              <button className="btn-primary">
                Book now
                <span aria-hidden="true">→</span>
              </button>
              <button className="hero__btn-secondary">
                Explore destinations
              </button>
            </div>

            <div className="hero__stats">
              <div>
                <div className="hero__stat-value">160+</div>
                <div className="hero__stat-label">Destinations</div>
              </div>
              <div>
                <div className="hero__stat-value">#1</div>
                <div className="hero__stat-label">World Airline Awards</div>
              </div>
              <div>
                <div className="hero__stat-value">30M+</div>
                <div className="hero__stat-label">Happy Travelers</div>
              </div>
            </div>
          </div>

          {/* ═══ BOOKING CARD ═══ */}
          <div className="hero__booking">
            <div className="booking-card">
              <div className="booking-card__tabs" role="tablist">
                <button className="booking-card__tab booking-card__tab--active" type="button" role="tab" aria-selected="true">Book</button>
                <button className="booking-card__tab" type="button" role="tab" aria-selected="false">Manage / Check in</button>
                <button className="booking-card__tab" type="button" role="tab" aria-selected="false">Flight status</button>
              </div>

              <div className="booking-card__trip-types" role="radiogroup">
                <label className="booking-card__trip-option">
                  <input type="radio" name="trip" defaultChecked />
                  <span>Return</span>
                </label>
                <label className="booking-card__trip-option">
                  <input type="radio" name="trip" />
                  <span>One way</span>
                </label>
                <label className="booking-card__trip-option">
                  <input type="radio" name="trip" />
                  <span>Multi-city</span>
                </label>
              </div>

              <form className="booking-card__form" onSubmit={onSearch}>
                <label className="booking-card__field">
                  <span className="booking-card__field-label">From</span>
                  <input
                    className="booking-card__input"
                    type="text"
                    name="from"
                    value={searchParams.from}
                    onChange={handleInputChange}
                    placeholder="City or airport"
                  />
                </label>
                <label className="booking-card__field">
                  <span className="booking-card__field-label">To</span>
                  <input
                    className="booking-card__input"
                    type="text"
                    name="to"
                    value={searchParams.to}
                    onChange={handleInputChange}
                    placeholder="City or airport"
                  />
                </label>
                <label className="booking-card__field">
                  <span className="booking-card__field-label">Departure</span>
                  <input
                    className="booking-card__input"
                    type="text"
                    name="date"
                    value={searchParams.date}
                    onChange={handleInputChange}
                    placeholder="Select date"
                  />
                </label>
                <label className="booking-card__field">
                  <span className="booking-card__field-label">Passengers / Class</span>
                  <input
                    className="booking-card__input"
                    type="text"
                    name="passengers"
                    value={searchParams.passengers}
                    onChange={handleInputChange}
                    placeholder="1 Passenger, Economy"
                  />
                </label>

                <button type="submit" className="booking-card__submit">
                  Search flights
                  <span aria-hidden="true">→</span>
                </button>
              </form>

              <div className="booking-card__route" aria-hidden="true">
                <span className="booking-card__dot booking-card__dot--from" />
                <span className="booking-card__line" />
                <span className="booking-card__dot booking-card__dot--to" />
                <span style={{ marginLeft: 6, fontWeight: 700 }}>DOH ✈ LHR</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DESTINATIONS ═══ */}
      <section className="destinations">
        <div className="destinations__header">
          <span className="section-label">Explore</span>
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-subtitle" style={{ margin: '10px auto 0' }}>
            Discover our most sought-after routes, with exceptional service to every corner of the globe.
          </p>
        </div>

        <div className="destinations__grid">
          {destinations.map((dest, i) => (
            <div className="destinations__card" key={i}>
              <img className="destinations__card-img" src={dest.image} alt={dest.name} />
              <div className="destinations__card-overlay" />
              {dest.featured && (
                <span className="destinations__card-featured">Most Popular</span>
              )}
              <div className="destinations__card-content">
                <h3 className="destinations__card-title">{dest.name}</h3>
                <div className="destinations__card-count">{dest.count}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="features">
        <div className="features__inner">
          <div className="features__header">
            <span className="section-label">Why fly with us</span>
            <h2 className="section-title">A World-Class Experience</h2>
            <p className="section-subtitle" style={{ margin: '10px auto 0' }}>
              From the moment you book until you arrive, every detail is crafted with care.
            </p>
          </div>

          <div className="features__grid">
            {features.map((feat, i) => (
              <div className="features__card features__card--with-img" key={i}>
                <div className="features__card-bg" style={{ backgroundImage: `url(${featureImgs[i]})` }} />
                <div className="features__card-overlay" />
                <div className="features__card-content">
                  <div className="features__card-icon">{feat.icon}</div>
                  <h3 className="features__card-title">{feat.title}</h3>
                  <p className="features__card-desc">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OFFERS ═══ */}
      <section className="offer-section">
        <div className="offer-section__header">
          <span className="section-label">Pricing</span>
          <h2 className="section-title">Choose Your Experience</h2>
          <p className="section-subtitle" style={{ margin: '10px auto 0' }}>
            From great value to unparalleled luxury, find the perfect fare for your journey.
          </p>
        </div>

        <div className="offer-section__cards">
          {offers.map((offer, i) => (
            <div className={`offer-card ${offer.btnClass}`} key={i}>
              <div className="offer-card__price">
                ${offer.price}
                <span> / {offer.currency}</span>
              </div>
              <h3 className="offer-card__title">{offer.title}</h3>
              <p className="offer-card__desc">{offer.desc}</p>
              <ul className="offer-card__features">
                {offer.features.map((feat, j) => (
                  <li className="offer-card__feature" key={j}>
                    <span className="offer-card__check">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
              <button className="btn-primary" style={{ width: '100%' }}>
                Select fare
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="testimonials">
        <div className="testimonials__inner">
          <div className="testimonials__header">
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">What Our Passengers Say</h2>
            <p className="section-subtitle" style={{ margin: '10px auto 0' }}>
              Hear from travelers who have experienced the Qatar Airways difference.
            </p>
          </div>

          <div className="testimonials__grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-card__stars" aria-label="5 stars">
                  ★★★★★
                </div>
                <p className="testimonial-card__text">"{t.text}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__detail">{t.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__grid">
            <div className="footer__brand">
              <img className="footer__brand-logo" src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/320px-Qatar_Airways_Logo.svg.png" alt="Qatar Airways" />
              <p>
                Qatar Airways is the national carrier of the State of Qatar. 
                We fly to over 160 destinations worldwide, connecting people 
                and cultures through exceptional service.
              </p>
            </div>

            <div>
              <h4 className="footer__col-title">About</h4>
              <a href="#" className="footer__link">Our Story</a>
              <a href="#" className="footer__link">Careers</a>
              <a href="#" className="footer__link">Press Room</a>
              <a href="#" className="footer__link">Sustainability</a>
            </div>

            <div>
              <h4 className="footer__col-title">Support</h4>
              <a href="#" className="footer__link">Contact Us</a>
              <a href="#" className="footer__link">Baggage</a>
              <a href="#" className="footer__link">Travel Alerts</a>
              <a href="#" className="footer__link">FAQ</a>
            </div>

            <div>
              <h4 className="footer__col-title">Legal</h4>
              <a href="#" className="footer__link">Privacy Policy</a>
              <a href="#" className="footer__link">Terms & Conditions</a>
              <a href="#" className="footer__link">Cookie Policy</a>
              <a href="#" className="footer__link">Accessibility</a>
            </div>
          </div>

          <div className="footer__bottom">
            <p className="footer__copy">
              &copy; 2026 Qatar Airways. All rights reserved.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social-link" aria-label="Facebook">f</a>
              <a href="#" className="footer__social-link" aria-label="Twitter">𝕏</a>
              <a href="#" className="footer__social-link" aria-label="Instagram">📷</a>
              <a href="#" className="footer__social-link" aria-label="YouTube">▶</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}