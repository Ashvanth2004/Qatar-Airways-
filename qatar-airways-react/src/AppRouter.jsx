import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Destinations from './Destinations.jsx';
import Book from './Book.jsx';
import Experience from './Experience.jsx';
import PrivilegeClub from './PrivilegeClub.jsx';
import Header from './Header.jsx';

function ResultsPage() {
  return (
    <div className="app-content">
      <Header />
      <div className="light-sweep" aria-hidden="true" />
      <h1 style={{ color: 'white', textAlign: 'center', paddingTop: '120px', fontSize: '36px', fontFamily: 'Playfair Display, serif' }}>
        Flight Results Page
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', fontSize: '16px', marginTop: '12px' }}>
        Your search results will appear here.
      </p>
    </div>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="app-content">
      <Header />
      <div className="light-sweep" aria-hidden="true" />
      <h1 style={{ color: 'white', textAlign: 'center', paddingTop: '120px', fontSize: '36px', fontFamily: 'Playfair Display, serif' }}>
        {title}
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', fontSize: '16px', marginTop: '12px' }}>
        This is a placeholder page. Content to be added.
      </p>
    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/book" element={<Book />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/privilege-club" element={<PrivilegeClub />} />

        {/* Placeholder routes for links that don't have a dedicated page yet */}
        <Route path="/terms" element={<PlaceholderPage title="Terms & Conditions" />} />
        <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
        <Route path="/help" element={<PlaceholderPage title="Help" />} />
        <Route path="/search" element={<PlaceholderPage title="Search" />} />
        <Route path="/language" element={<PlaceholderPage title="Language Selection" />} />
        <Route path="/forgot-password" element={<PlaceholderPage title="Forgot Password" />} />
      </Routes>
    </BrowserRouter>
  );
}