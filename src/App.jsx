import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';
import { CarProvider } from './context/CarContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CarProvider>
          <Router />
        </CarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;