import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';
import { CarProvider } from './context/CarContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import './index.css';
import { ScrollToTop } from './componenets';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CarProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <Router />
          <ScrollToTop />
        </CarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
