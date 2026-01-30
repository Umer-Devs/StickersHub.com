import React, { createContext, useContext, useState, useEffect } from 'react';

const CarContext = createContext();

export const useCars = () => {
    const context = useContext(CarContext);
    if (!context) {
        throw new Error('useCars must be used within a CarProvider');
    }
    return context;
};

const MOCK_CARS = [
    {
        id: 1,
        make: "BMW",
        model: "M4 Competition",
        year: 2023,
        price: 85000,
        mileage: 5200,
        fuelType: "Petrol",
        transmission: "Automatic",
        bodyType: "Coupe",
        country: "Portugal",
        city: "Lisbon",
        color: "Frozen Portimao Blue",
        power: "375 kW (510 HP)",
        trim: "xDrive",
        description: "The BMW M4 Competition Coupe sets the standard for high-performance sports cars. With its powerful M TwinPower Turbo inline 6-cylinder engine and specialized chassis technology, it delivers an adrenaline-pumping driving experience. This specific unit comes in the stunning Frozen Portimao Blue finish with full leather interior.",
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1617814076367-b757c7a72ca2?auto=format&fit=crop&q=80&w=1200",
        options: ["ABS", "Air Conditioning", "Airbag", "Alloy Wheels", "Central Locking", "Cruise Control", "Electric Windows", "Trip Computer", "Immobilizer", "Leather", "Power Steering", "Spoiler"]
    },
    {
        id: 2,
        make: "Mercedes-Benz",
        model: "G63 AMG",
        year: 2024,
        price: 185000,
        mileage: 1200,
        fuelType: "Petrol",
        transmission: "Automatic",
        bodyType: "SUV",
        country: "Germany",
        city: "Stuttgart",
        color: "Obsidian Black",
        power: "430 kW (585 HP)",
        trim: "V8 BiTurbo",
        description: "The legendary G-Wagon in its most powerful AMG form. A perfect blend of off-road capability and luxury performance. Features the iconic side-pipe exhausts and a hand-crafted V8 engine. This 2024 model is practically new with only 1200km on the clock.",
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1200",
        options: ["ABS", "Air Conditioning", "Airbag", "Alloy Wheels", "Central Locking", "Cruise Control", "Navigation System", "Sunroof", "Leather"]
    },
    {
        id: 3,
        make: "Tesla",
        model: "Model S Plaid",
        year: 2023,
        price: 95000,
        mileage: 8500,
        fuelType: "Electric",
        transmission: "Automatic",
        bodyType: "Sedan",
        country: "USA",
        city: "San Jose",
        color: "Solid Black",
        power: "760 kW (1,020 HP)",
        trim: "Tri-Motor",
        description: "Experience the fastest accelerating car in production today. The Tesla Model S Plaid features a tri-motor setup producing over 1000 horsepower. With its minimalist interior and cutting-edge tech, it represents the future of performance driving.",
        isAvailable: false,
        image: "https://images.unsplash.com/photo-1617788138017-80ad42243c2d?auto=format&fit=crop&q=80&w=1200",
        options: ["Autopilot", "Glass Roof", "Heated Seats", "Airbag", "Central Locking", "Cruise Control", "Electric Windows", "Trip Computer", "Immobilizer"]
    },
    {
        id: 4,
        make: "Porsche",
        model: "911 Carrera",
        year: 2022,
        price: 110000,
        mileage: 12000,
        fuelType: "Petrol",
        transmission: "Automatic",
        bodyType: "Coupe",
        country: "Germany",
        city: "Berlin",
        color: "Guards Red",
        power: "283 kW (385 HP)",
        trim: "992",
        description: "The timeless silhouette of the Porsche 911. This Carrera model offers a perfect balance of daily usability and sports car dynamics. Finished in classic Guards Red, it's a true head-turner with impeccable handling.",
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
        options: ["ABS", "Sport Chrono", "Airbag", "Alloy Wheels", "Central Locking", "Cruise Control", "Electric Windows", "Trip Computer", "Immobilizer", "Leather"]
    },
    {
        id: 5,
        make: "Audi",
        model: "RS Q8",
        year: 2024,
        price: 145000,
        mileage: 500,
        fuelType: "Petrol",
        transmission: "Automatic",
        bodyType: "SUV",
        country: "Portugal",
        city: "Porto",
        color: "Nardo Gray",
        power: "441 kW (600 HP)",
        trim: "Quattro",
        description: "Audi's flagship performance SUV. The RS Q8 combines the elegance of a luxury coupe with the versatility of an SUV. Powered by a 4.0L V8 twin-turbo engine, it shares its DNA with the world's finest performance vehicles.",
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=1200",
        options: ["ABS", "Air Conditioning", "Airbag", "Alloy Wheels", "Central Locking", "Cruise Control", "Electric Windows", "Trip Computer", "Immobilizer", "Leather", "Power Steering"]
    },
    {
        id: 6,
        make: "Ferrari",
        model: "SF90 Stradale",
        year: 2024,
        price: 550000,
        mileage: 100,
        fuelType: "Hybrid",
        transmission: "Automatic",
        bodyType: "Coupe",
        country: "Italy",
        city: "Maranello",
        color: "Rosso Corsa",
        power: "735 kW (1,000 HP)",
        trim: "Assetto Fiorano",
        description: "A masterpiece of Italian engineering. The Ferrari SF90 Stradale is the first-ever series production PHEV from Maranello. With its hybrid powertrain delivering 1000 horsepower, it offers performance beyond imagination.",
        isAvailable: true,
        image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1200",
        options: ["Carbon Fiber Wheels", "Launch Control", "Ceramic Brakes", "Airbag", "Alloy Wheels", "Power Steering"]
    },
];

export const CarProvider = ({ children }) => {
    const [cars, setCars] = useState(() => {
        const savedCars = localStorage.getItem('stickershub_cars');
        return savedCars ? JSON.parse(savedCars) : MOCK_CARS;
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        localStorage.setItem('stickershub_cars', JSON.stringify(cars));
    }, [cars]);

    const addCar = (newCar) => {
        setCars(prev => [{ ...newCar, id: Date.now() }, ...prev]);
    };

    const updateCar = (id, updatedCar) => {
        setCars(prev => prev.map(car => car.id === id ? { ...updatedCar, id } : car));
    };

    const deleteCar = (id) => {
        setCars(prev => prev.filter(car => car.id !== id));
    };

    return (
        <CarContext.Provider value={{ cars, loading, addCar, updateCar, deleteCar }}>
            {children}
        </CarContext.Provider>
    );
};
