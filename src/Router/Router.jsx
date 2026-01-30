import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ExploreCar, Home, CarDetail, AdminCars, AdminLogin } from '../pages';
import ProtectedRoute from '../componenets/ProtectedRoute';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ExploreCar />} />
            <Route path="/car/:id" element={<CarDetail />} />
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
        </Routes>
    );
};

export default Router;