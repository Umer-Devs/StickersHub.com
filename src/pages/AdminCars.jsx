import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCars } from '../context/CarContext';
import { Header, Footer } from '../componenets';
import { useNavigate } from 'react-router-dom';
import {
    Trash2,
    Edit3,
    PlusCircle,
    Settings,
    ChevronDown
} from 'lucide-react';

const AdminCars = () => {
    const { cars, deleteCar } = useCars();
    const navigate = useNavigate();

    const bodyTypes = ["Convertible", "Coupe", "Crossover", "Hatchback", "Minivan", "Pickup", "Sedan", "Sports Car", "Station Wagon", "SUV", "Transporter", "Van"];

    const handleDelete = (id) => {
        if (window.confirm('Realmente deseja excluir este veículo?')) {
            deleteCar(id);
        }
    };

    // Filter State
    const [filterBodyType, setFilterBodyType] = useState('');
    const [filterCountry, setFilterCountry] = useState('');

    // Get unique countries from cars
    const uniqueCountries = [...new Set(cars.map(car => car.country).filter(Boolean))].sort();

    const filteredCars = cars.filter(car =>
        (filterBodyType === '' || car.bodyType === filterBodyType) &&
        (filterCountry === '' || car.country === filterCountry)
    );

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <div className="custom-padding max-w-7xl mx-auto">
                    {/* Header Action */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                        <div className="space-y-1 text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-black text-primary-blue uppercase   ">Vehicle <span className="text-theme-blue">Management</span></h1>
                            <p className=" text-black font-bold uppercase tracking-widest text-xs">Total Vehicles: {cars.length}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex gap-4">
                                <div className="relative group">
                                    <select
                                        value={filterCountry}
                                        onChange={(e) => setFilterCountry(e.target.value)}
                                        className="appearance-none bg-white px-6 py-4 pr-12 rounded-lg font-bold text-xs uppercase tracking-widest text-primary-blue shadow-sm border border-gray-100 outline-none focus:border-theme-blue cursor-pointer"
                                    >
                                        <option value="">All Countries</option>
                                        {uniqueCountries.map(country => <option key={country} value={country}>{country}</option>)}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-blue pointer-events-none" />
                                </div>
                                <div className="relative group">
                                    <select
                                        value={filterBodyType}
                                        onChange={(e) => setFilterBodyType(e.target.value)}
                                        className="appearance-none bg-white px-6 py-4 pr-12 rounded-lg font-bold text-xs uppercase tracking-widest text-primary-blue shadow-sm border border-gray-100 outline-none focus:border-theme-blue cursor-pointer"
                                    >
                                        <option value="">All Body Types</option>
                                        {bodyTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-blue pointer-events-none" />
                                </div>
                            </div>
                            <button
                                onClick={() => navigate('/admin/cars/new')}
                                className="bg-theme-blue hover:bg-theme-blue/90 text-white px-8 py-4 rounded-lg font-black uppercase tracking-widest  flex items-center gap-2 shadow-xl shadow-theme-blue/30 transition-all active:scale-95"
                            >
                                <PlusCircle size={20} />
                                Add New Vehicle
                            </button>
                        </div>
                    </div>

                    {/* Dashboard List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCars.map(car => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                key={car.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all group"
                            >
                                {/* Image Area */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                    <img
                                        src={car.image || 'https://placehold.co/600x400?text=No+Image'}
                                        alt={`${car.make} ${car.model}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-sm ${(car.isAvailable || car.is_available)
                                            ? 'bg-green-500/90 text-white'
                                            : 'bg-red-500/90 text-white'
                                            }`}>
                                            {(car.isAvailable || car.is_available) ? 'Available' : 'Sold'}
                                        </span>
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <div className="px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-md text-white text-[10px] font-black uppercase tracking-widest">
                                            {car.year}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-5 space-y-4">
                                    <div>
                                        <p className="text-[10px] font-bold  text-black uppercase tracking-widest mb-1">{car.bodyType}</p>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-black text-primary-blue uppercase leading-tight">
                                                {car.make} <span className="text-theme-blue">{car.model}</span>
                                            </h3>
                                            <span className="font-black text-primary-blue text-lg">
                                                {parseInt(car.price).toLocaleString()} <span className="text-theme-blue ">€</span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Quick Stats Grid */}
                                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-50">
                                        <div className="text-center">
                                            <span className="block text-[9px] font-bold  text-black uppercase tracking-widest">Fuel</span>
                                            <span className="text-xs font-bold text-primary-blue">{car.fuelType}</span>
                                        </div>
                                        <div className="text-center border-l border-gray-50">
                                            <span className="block text-[9px] font-bold  text-black uppercase tracking-widest">Trans.</span>
                                            <span className="text-xs font-bold text-primary-blue">{car.transmission}</span>
                                        </div>
                                        <div className="text-center border-l border-gray-50">
                                            <span className="block text-[9px] font-bold  text-black uppercase tracking-widest">KMs</span>
                                            <span className="text-xs font-bold text-primary-blue">{(car.mileage || 0).toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-1">
                                        <button
                                            onClick={() => navigate(`/admin/cars/edit/${car.id}`)}
                                            className="flex-1 py-3 bg-blue-50 hover:bg-theme-blue hover:text-white text-primary-blue rounded-lg font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all"
                                        >
                                            <Edit3 size={14} /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(car.id)}
                                            className="flex-1 py-3 bg-red-50 hover:bg-red-500 hover:text-white text-red-500 rounded-lg font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all"
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Empty State */}
                        {cars.length === 0 && (
                            <div className="col-span-full py-20 text-center space-y-4">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                                    <Settings size={32} className="text-gray-300" />
                                </div>
                                <h3 className="text-xl font-black text-gray-300 uppercase tracking-widest">No Vehicles Found</h3>
                                <p className=" text-black ">Get started by adding a new vehicle to the inventory.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AdminCars;
