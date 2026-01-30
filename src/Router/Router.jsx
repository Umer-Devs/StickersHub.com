import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { About, Home } from '../pages';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
    );
};

export default Router;