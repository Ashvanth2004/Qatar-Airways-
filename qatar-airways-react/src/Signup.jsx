import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import { useAuth } from './AuthContext.jsx';
import './QatarLanding.css';

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await register(form.fullName, form.email, form.password);
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="app-content">
      <div className="light-sweep" aria-hidden="true" />
      <Header />

      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-card__header">
            <Link to="/" className="auth-card__logo">
              <img src="/img/logo.png" alt="Qatar Airways" />
            </Link>
            <h1 className="auth-card__title">Create Account</h1>
            <p className="auth-card__subtitle">
              Join Privilege Club and earn Avios on every flight.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <p style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '1rem' }}>
                {error}
              </p>
            )}
            <label className="auth-form__field">
              <span className="auth-form__label">Full Name</span>
              <input
                className="auth-form__input"
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </label>

            <label className="auth-form__field">
              <span className="auth-form__label">Email Address</span>
              <input
                className="auth-form__input"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="auth-form__field">
              <span className="auth-form__label">Password</span>
              <div className="auth-form__password-wrap">
                <input
                  className="auth-form__input"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="auth-form__toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </label>

            <label className="auth-form__field">
              <span className="auth-form__label">Confirm Password</span>
              <input
                className="auth-form__input"
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
              />
            </label>

            <label className="auth-form__checkbox" style={{ marginTop: 4 }}>
              <input type="checkbox" required />
              <span>
                I agree to the{' '}
                <Link to="/terms" className="auth-card__link">Terms & Conditions</Link>
                {' '}and{' '}
                <Link to="/privacy" className="auth-card__link">Privacy Policy</Link>
              </span>
            </label>

            <button type="submit" className="btn-primary auth-form__submit">
              Create Account
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <div className="auth-card__divider">
            <span>or sign up with</span>
          </div>

          <div className="auth-card__socials">
            <button className="auth-card__social-btn">
              <span>G</span> Google
            </button>
            <button className="auth-card__social-btn">
              <span>f</span> Facebook
            </button>
            <button className="auth-card__social-btn">
              <span>𝕏</span> X (Twitter)
            </button>
          </div>

          <p className="auth-card__footer">
            Already have an account?{' '}
            <Link to="/login" className="auth-card__link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}