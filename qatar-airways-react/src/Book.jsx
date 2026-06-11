import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import './QatarLanding.css';

export default function Book() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: '1',
    cabin: 'Economy',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  }

  function handleSearch(e) {
    e.preventDefault();
    navigate('/results', { state: { search: searchParams } });
  }

  return (
    <div className="app-content">
      <div className="light-sweep" aria-hidden="true" />
      <Header />

      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="page-hero__content">
          <span className="section-label">Book</span>
          <h1 className="page-hero__title">Book Your Flight</h1>
          <p className="page-hero__desc">
            Find the best fares and book your next journey with confidence.
            Flexible tickets with free changes and 24/7 support.
          </p>
        </div>
      </section>

      <section className="book-section">
        <div className="book-section__inner">
          <div className="booking-card" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div className="booking-card__tabs" role="tablist">
              <button className="booking-card__tab booking-card__tab--active" type="button">Flights</button>
              <button className="booking-card__tab" type="button">Hotels</button>
              <button className="booking-card__tab" type="button">Car Hire</button>
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

            <form className="booking-card__form" onSubmit={handleSearch}>
              <label className="booking-card__field">
                <span className="booking-card__field-label">From</span>
                <input className="booking-card__input" type="text" name="from" value={searchParams.from} onChange={handleChange} placeholder="City or airport" required />
              </label>
              <label className="booking-card__field">
                <span className="booking-card__field-label">To</span>
                <input className="booking-card__input" type="text" name="to" value={searchParams.to} onChange={handleChange} placeholder="City or airport" required />
              </label>
              <label className="booking-card__field">
                <span className="booking-card__field-label">Departure</span>
                <input className="booking-card__input" type="date" name="departure" value={searchParams.departure} onChange={handleChange} required />
              </label>
              <label className="booking-card__field">
                <span className="booking-card__field-label">Return</span>
                <input className="booking-card__input" type="date" name="return" value={searchParams.return} onChange={handleChange} />
              </label>
              <label className="booking-card__field">
                <span className="booking-card__field-label">Passengers</span>
                <select className="booking-card__input" name="passengers" value={searchParams.passengers} onChange={handleChange}>
                  {[1,2,3,4,5,6,7,8,9].map(n => <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>)}
                </select>
              </label>
              <label className="booking-card__field">
                <span className="booking-card__field-label">Cabin Class</span>
                <select className="booking-card__input" name="cabin" value={searchParams.cabin} onChange={handleChange}>
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">Business Class</option>
                  <option value="First">First Class</option>
                </select>
              </label>
              <button type="submit" className="booking-card__submit">
                Search flights <span aria-hidden="true">→</span>
              </button>
            </form>

            <div className="booking-card__route" aria-hidden="true">
              <span className="booking-card__dot booking-card__dot--from" />
              <span className="booking-card__line" />
              <span className="booking-card__dot booking-card__dot--to" />
              <span style={{ marginLeft: 6, fontWeight: 700 }}>Your Journey</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}