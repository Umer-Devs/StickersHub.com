// Router.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';


import {
  ExploreCar,
  Home,
  CarDetail,
  AdminCars,
  AdminLogin,
  Inquiry,
  Contact,
  PrivacyPolicy,
  TermsOfService,
  CookiePolicy,
  ReturnsPolicy,
  AdminCarForm
} from '../pages';
import ProtectedRoute from '../componenets/ProtectedRoute';
import { LenisProvider } from '../componenets';

const Router = () => {
  return (
    <LenisProvider>                {/* ← yahan wrap kar do */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreCar />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/returns" element={<ReturnsPolicy />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/cars"
          element={
            <ProtectedRoute>
              <AdminCars />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/cars/new"
          element={
            <ProtectedRoute>
              <AdminCarForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/cars/edit/:id"
          element={
            <ProtectedRoute>
              <AdminCarForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </LenisProvider>
  );
};

export default Router;