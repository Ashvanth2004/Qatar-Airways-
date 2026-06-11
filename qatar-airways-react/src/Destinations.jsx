import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import { getDestinations, getAllFlights } from './api.js';
import './QatarLanding.css';

const staticDestinations = [
  { name: 'London', country: 'United Kingdom', flights: '12 flights weekly', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=750&fit=crop', desc: 'Experience the rich history, world-class museums, and vibrant culture of the British capital.' },
  { name: 'Paris', country: 'France', flights: '10 flights weekly', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=750&fit=crop', desc: 'The City of Light awaits with its iconic landmarks, exquisite cuisine, and romantic ambiance.' },
  { name: 'Tokyo', country: 'Japan', flights: '7 flights weekly', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=750&fit=crop', desc: 'A dazzling blend of ancient traditions and cutting-edge modernity in Japan\'s dynamic capital.' },
  { name: 'New York', country: 'United States', flights: '14 flights weekly', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=750&fit=crop', desc: 'The Big Apple offers world-class entertainment, dining, shopping, and iconic skyline views.' },
  { name: 'Dubai', country: 'UAE', flights: '21 flights weekly', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=750&fit=crop', desc: 'Discover breathtaking architecture, luxury shopping, and desert adventures in this futuristic city.' },
  { name: 'Sydney', country: 'Australia', flights: '8 flights weekly', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&h=750&fit=crop', desc: 'Stunning harbor views, golden beaches, and a vibrant arts scene define this Australian gem.' },
  { name: 'Bangkok', country: 'Thailand', flights: '9 flights weekly', image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&h=750&fit=crop', desc: 'A sensory feast of ornate temples, bustling markets, and world-famous street food.' },
  { name: 'Singapore', country: 'Singapore', flights: '11 flights weekly', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=750&fit=crop', desc: 'A futuristic city-state blending lush gardens, diverse cuisine, and stunning architecture.' },
  { name: 'Istanbul', country: 'Turkey', flights: '6 flights weekly', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=750&fit=crop', desc: 'Where East meets West — explore ancient bazaars, grand mosques, and rich cultural heritage.' },
];

export default function Destinations() {
  const [apiDestinations, setApiDestinations] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await getDestinations();
        if (res.success && Array.isArray(res.data)) {
          setApiDestinations(
            res.data.map((d) => ({
              name: d.name || d.city || 'Unknown',
              country: d.country || '',
              flights: `${d.flightCount || d.count || 0} flights weekly`,
              image: '/img/mainlondon.jpg',
              desc: d.description || `Fly to ${d.name || d.city || 'this destination'} with Qatar Airways.`,
            }))
          );
          return;
        }
      } catch {
        // fall through to static data
      }
      setApiDestinations(staticDestinations);
    }
    load();
  }, []);

  const destinations = apiDestinations.length > 0 ? apiDestinations : staticDestinations;
  return (
    <div className="app-content">
      <div className="light-sweep" aria-hidden="true" />
      <Header />

      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="page-hero__content">
          <span className="section-label">Explore</span>
          <h1 className="page-hero__title">Our Destinations</h1>
          <p className="page-hero__desc">
            Discover over 160 destinations worldwide. From vibrant cities to tropical paradises,
            find your perfect getaway with Qatar Airways.
          </p>
        </div>
      </section>

      <section className="destinations" style={{ paddingTop: '40px' }}>
        <div className="destinations__grid">
          {destinations.map((dest, i) => (
            <div className="destinations__card" key={i}>
              <img className="destinations__card-img" src={dest.image} alt={dest.name} />
              <div className="destinations__card-overlay" />
              <div className="destinations__card-content">
                <h3 className="destinations__card-title">{dest.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginTop: '2px' }}>{dest.country}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '4px', lineHeight: '1.4' }}>{dest.desc}</p>
                <p style={{ color: 'var(--qa-gold)', fontSize: '12px', fontWeight: 700, marginTop: '8px' }}>{dest.flights}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}