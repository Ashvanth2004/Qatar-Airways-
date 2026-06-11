import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getUserByEmail } from './api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('qa_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem('qa_user');
    } finally {
      setLoading(false);
    }
  }, []);

  async function login(email, password) {
    const res = await loginUser(email, password);
    if (res.success) {
      const userData = res.data;
      setUser(userData);
      localStorage.setItem('qa_user', JSON.stringify(userData));
      return userData;
    }
    throw new Error(res.message || 'Login failed');
  }

  async function register(fullName, email, password) {
    const res = await registerUser(fullName, email, password);
    if (!res.success) {
      throw new Error(res.message || 'Registration failed');
    }
    return res.data;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('qa_user');
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}