import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const logoUrl = 'https://www.qatarairways.com/content/dam/qatar-airways/common/logo/QA-Logo-Gold.png';

const navLinks = [
  { label: 'Destinations', path: '/destinations' },
  { label: 'Book', path: '/book' },
  { label: 'Experience', path: '/experience' },
  { label: 'Privilege Club', path: '/privilege-club' },
];

export default function Header() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        {/* Logo */}
        <Link to="/" className="header__logo">
          <img src={logoUrl} alt="Qatar Airways" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="header__nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="header__nav-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="header__actions">
          <Link to="/help" className="header__action-link">Help</Link>
          <Link to="/search" className="header__action-link" aria-label="Search">&#128269;</Link>
          <Link to="/language" className="header__action-link">EN</Link>
          {user ? (
            <>
              <span className="header__user-name">{user.fullName}</span>
              <button onClick={logout} className="header__action-link" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header__action-link">Login</Link>
              <Link to="/signup" className="header__signup-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className={`header__hamburger ${mobileOpen ? 'header__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`header__mobile ${mobileOpen ? 'header__mobile--open' : ''}`}>
        <nav className="header__mobile-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="header__mobile-link"
            >
              {link.label}
            </Link>
          ))}
          <hr className="header__mobile-divider" />
          {user ? (
            <>
              <span className="header__mobile-link" style={{ opacity: 0.7 }}>{user.fullName}</span>
              <button onClick={logout} className="header__mobile-link" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit', textAlign: 'left', width: '100%' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header__mobile-link">Login</Link>
              <Link to="/signup" className="header__mobile-link header__mobile-link--signup">Sign Up</Link>
            </>
          )}
          <Link to="/help" className="header__mobile-link">Help</Link>
        </nav>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div className="header__overlay" onClick={() => setMobileOpen(false)} />
      )}
    </header>
  );
}