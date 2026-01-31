import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CarContext = createContext();

// You can change this to your real Laravel API URL
const API_BASE_URL = 'http://localhost:8000/api';

export const useCars = () => {
    const context = useContext(CarContext);
    if (!context) {
        throw new Error('useCars must be used within a CarProvider');
    }
    return context;
};

export const CarProvider = ({ children }) => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch cars from backend on mount
    const fetchCars = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/cars`);
            setCars(response.data || []);
        } catch (error) {
            console.error('Failed to fetch cars from backend:', error.message);
            // If backend fails, we show nothing as per user request
            setCars([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const addCar = async (newCar) => {
        setLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/cars`, newCar);
            console.log('Car added to backend successfully');
            await fetchCars(); // Refresh list from backend
        } catch (error) {
            console.error('Failed to add car to backend:', error.message);
            alert('Error: Could not save car to backend.');
        } finally {
            setLoading(false);
        }
    };

    const updateCar = async (id, updatedCar) => {
        setLoading(true);
        try {
            await axios.put(`${API_BASE_URL}/cars/${id}`, updatedCar);
            console.log('Car updated in backend successfully');
            await fetchCars(); // Refresh list from backend
        } catch (error) {
            console.error('Failed to update car in backend:', error.message);
            alert('Error: Could not update car in backend.');
        } finally {
            setLoading(false);
        }
    };

    const deleteCar = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`${API_BASE_URL}/cars/${id}`);
            console.log('Car deleted from backend successfully');
            await fetchCars(); // Refresh list from backend
        } catch (error) {
            console.error('Failed to delete car from backend:', error.message);
            alert('Error: Could not delete car from backend.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <CarContext.Provider value={{ cars, loading, addCar, updateCar, deleteCar, refreshCars: fetchCars }}>
            {children}
        </CarContext.Provider>
    );
};
