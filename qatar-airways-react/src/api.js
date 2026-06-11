/**
 * Qatar Airways - API Service Layer
 * Centralized module for all backend API calls.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }

  return data;
}

// ── Auth ──
export function loginUser(email, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function registerUser(fullName, email, password) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ fullName, email, password }),
  });
}

export function getUserByEmail(email) {
  return request(`/auth/user/${encodeURIComponent(email)}`);
}

// ── Flights ──
export function searchFlights(origin, destination, date, passengers = 1, cabinClass = 'Economy') {
  const params = new URLSearchParams({
    origin,
    destination,
    date,
    passengers: String(passengers),
    cabinClass,
  });
  return request(`/flights/search?${params.toString()}`);
}

export function getAllFlights() {
  return request('/flights');
}

export function getFlightById(id) {
  return request(`/flights/${id}`);
}

export function getDestinations() {
  return request('/flights/destinations');
}

// ── Bookings ──
export function createBooking(email, flightId, passengers) {
  return request('/bookings', {
    method: 'POST',
    body: JSON.stringify({ email, flightId, passengers }),
  });
}

export function getUserBookings(email) {
  return request(`/bookings?email=${encodeURIComponent(email)}`);
}

export function getBookingByReference(reference) {
  return request(`/bookings/${encodeURIComponent(reference)}`);
}

export function cancelBooking(id, email) {
  return request(`/bookings/${id}?email=${encodeURIComponent(email)}`, {
    method: 'DELETE',
  });
}