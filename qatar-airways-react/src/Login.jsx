import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import { useAuth } from './AuthContext.jsx';
import './QatarLanding.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      alert(err.message || 'Login failed. Make sure the backend is running.');
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
            <h1 className="auth-card__title">Welcome Back</h1>
            <p className="auth-card__subtitle">
              Sign in to manage your bookings, earn Avios, and more.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
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
                  placeholder="Enter your password"
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

            <div className="auth-form__options">
              <label className="auth-form__checkbox">
                <input type="checkbox" defaultChecked />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="auth-form__forgot">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn-primary auth-form__submit">
              Sign In
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <div className="auth-card__divider">
            <span>or continue with</span>
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
            Don't have an account?{' '}
            <Link to="/signup" className="auth-card__link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}