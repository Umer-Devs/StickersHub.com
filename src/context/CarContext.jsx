import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CarContext = createContext();

// Live Laravel API URL
const API_BASE_URL = 'https://atbackend.onlineclassrelief.com/api';

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

    // Fetch cars from backend on mount or when filters change
    const fetchCars = async (filters = {}) => {
        setLoading(true);
        try {
            // Convert filters object to query params string
            // Filter out empty values
            const params = new URLSearchParams();
            Object.keys(filters).forEach(key => {
                if (filters[key] !== '' && filters[key] !== null && filters[key] !== undefined) {
                    params.append(key, filters[key]);
                }
            });

           
            const response = await axios.get(`${API_BASE_URL}/cars`, { params: filters });

            // Normalize image data
            const storageBaseUrl = 'https://atbackend.onlineclassrelief.com/storage/app/public';

            const formatUrl = (path) => {
                if (!path) return null;
                if (path.startsWith('http')) return path;
                // Ensure no double slashes and correct pathing
                const cleanPath = path.startsWith('/') ? path.substring(1) : path;
                return `${storageBaseUrl}/${cleanPath}`;
            };

            const normalizedCars = (response.data || []).map(car => {
                // Process images array
                const processedImages = (car.images || []).map(img => {
                    const path = typeof img === 'string' ? img : (img.path || img.url);
                    return {
                        ...(typeof img === 'object' ? img : {}),
                        url: formatUrl(path)
                    };
                });

                // Get main image
                let mainImage = car.image;
                if (processedImages.length > 0) {
                    mainImage = processedImages[0].url;
                } else if (car.image) {
                    mainImage = formatUrl(car.image);
                }

                return {
                    ...car,
                    // Normalize standard keys for frontend consistency
                    fuelType: car.fuelType || car.fuel_type || 'N/A',
                    bodyType: car.bodyType || car.body_type || 'N/A',
                    transmission: car.transmission || car.transmission_type || 'N/A',
                    isAvailable: car.isAvailable !== undefined ? car.isAvailable : !!car.is_available,
                    images: processedImages,
                    image: mainImage
                };
            });

            setCars(normalizedCars);
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
            // Updated endpoint to /carsstore as requested
            await axios.post(`${API_BASE_URL}/carsstore`, newCar);
            console.log('Car added to backend successfully');
            await fetchCars(); // Refresh list from backend
        } catch (error) {
            console.error('Failed to add car to backend:', error.message);
            if (error.response) {
                console.error('Backend Error Response:', error.response.data);
                toast.error(`Error: ${error.response.data.message || 'Could not save car to backend.'}`);
            } else {
                toast.error('Error: Could not save car to backend.');
            }
        } finally {
            setLoading(false);
        }
    };

    const updateCar = async (id, updatedCar) => {
        setLoading(true);
        try {
            // The backend route is explicitly defined as POST: Route::post('/cars/{id}', ...)
            // Even though we might append _method: PUT for Laravel convention, the actual HTTP verb MUST be POST.
            // We force POST for all updates to match the routes/api.php definition.
            await axios.post(`${API_BASE_URL}/cars/${id}`, updatedCar);

            console.log('Car updated in backend successfully');
            await fetchCars(); // Refresh list from backend
        } catch (error) {
            console.error('Failed to update car in backend:', error.message);
            if (error.response) {
                console.error('Backend Error Response:', error.response.data);
                toast.error(`Error: ${error.response.data.message || 'Could not update car in backend.'}`);
            } else {
                toast.error('Error: Could not update car in backend.');
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteCar = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`${API_BASE_URL}/cars/${id}`);
            console.log('Car deleted from backend successfully');
            await fetchCars();
        } catch (error) {
            console.error('Failed to delete car from backend:', error.message);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(`Error: ${error.response.data.message}`);
                console.error('Backend Error Details:', error.response.data);
            } else {
                toast.error('Error: Could not delete car from backend.');
            }
            setLoading(false);
        }
    };

    return (
        <CarContext.Provider value={{ cars, loading, addCar, updateCar, deleteCar, refreshCars: fetchCars }}>
            {children}
        </CarContext.Provider>
    );
};
