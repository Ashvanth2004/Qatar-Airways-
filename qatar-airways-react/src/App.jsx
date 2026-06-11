import React from 'react';
import { AuthProvider } from './AuthContext.jsx';
import AppRouter from './AppRouter.jsx';
import './globals.css';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
