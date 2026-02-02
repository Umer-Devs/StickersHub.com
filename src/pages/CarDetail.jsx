import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCars } from '../context/CarContext';
import { Header, Footer } from '../componenets';
import {
    MapPin,
    CheckCircle2,
    ChevronLeft,
    Phone,
    Gauge,
    Fuel,
    Settings,
    Palette,
    FileText,
    AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const CarDetail = () => {
    const { id } = useParams();
    const { cars } = useCars();
    const [car, setCar] = useState(null);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const foundCar = cars.find(c => c.id === parseInt(id));
        setCar(foundCar);
        setActiveImage(0); // Reset image index on car change
        window.scrollTo(0, 0);
    }, [id, cars]);

    if (!car) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-black text-primary-blue uppercase">Car Not Found</h2>
                    <Link to="/explore" className="inline-block px-8 py-4 bg-primary-blue text-white rounded-lg font-black uppercase tracking-widest text-xs hover:bg-theme-blue transition-all">
                        Return to Inventory
                    </Link>
                </div>
            </div>
        );
    }

    // Normalized Image Logic
    const images = (car.images && car.images.length > 0)
        ? car.images.map(img => (typeof img === 'string' ? img : img.url))
        : [car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200"];

    // Normalized Data Logic
    const isAvailable = car.isAvailable !== undefined ? car.isAvailable : !!car.is_available;
    const fuelType = car.fuelType || car.fuel_type || 'N/A';
    const bodyType = car.bodyType || car.body_type || 'N/A';
    const transmission = car.transmission || car.transmission_type || 'N/A';
    const carOptions = car.options || [];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-inter">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <div className="custom-padding max-w-7xl mx-auto">

                    {/* Header Section */}
                    <div className="mb-10">
                        <Link to="/explore" className="inline-flex items-center gap-2 text-gray-400 font-bold uppercase tracking-widest text-[10px] hover:text-theme-blue transition-colors mb-6 group">
                            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Inventory
                        </Link>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-3 py-1 bg-theme-blue/10 text-theme-blue text-[10px] font-black uppercase tracking-widest rounded-full">
                                        {car.year} Model
                                    </span>
                                    {isAvailable ? (
                                        <span className="px-3 py-1 bg-green-500/10 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Available
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 bg-red-500/10 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Sold Out
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-primary-blue uppercase tracking-tight leading-none">
                                    {car.make} <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-blue to-blue-400">{car.model}</span>
                                </h1>
                                <p className="mt-3 text-gray-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                    <MapPin size={14} className="text-theme-blue" /> {car.city}, {car.country}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">Total Price</p>
                                <div className="text-4xl flex gap-1 font-black text-primary-blue tracking-tighter">
                                    {car.price.toLocaleString()} <span className="text-2xl text-theme-blue mt-3">€</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                        {/* Left Column (Images + Description) */}
                        <div className="lg:col-span-8 space-y-10">
                            {/* Gallery */}
                            <div className="space-y-4">
                                <motion.div
                                    className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative group border border-gray-100"
                                >
                                    <img
                                        src={images[activeImage]}
                                        alt="Main View"
                                        className={`w-full h-full object-cover transition-all duration-700 ${!isAvailable ? 'grayscale opacity-80' : ''}`}
                                    />
                                    {!isAvailable && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                                            <span className="text-4xl font-black text-white uppercase tracking-widest border-4 border-white p-4">Sold Out</span>
                                        </div>
                                    )}
                                </motion.div>

                                {images.length > 1 && (
                                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                        {images.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveImage(idx)}
                                                className={`relative w-24 h-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-black shadow-lg scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                            >
                                                <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx}`} />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Key Features Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: 'Mileage', value: `${(car.mileage || 0).toLocaleString()} km`, icon: <Gauge /> },
                                    { label: 'Transmission', value: transmission, icon: <Settings /> },
                                    { label: 'Fuel', value: fuelType, icon: <Fuel /> },
                                    { label: 'Body', value: bodyType, icon: <Palette /> },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center gap-2 group hover:border-black transition-all">
                                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                                            {React.cloneElement(stat.icon, { size: 18 })}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-black uppercase tracking-widest">{stat.label}</p>
                                            <p className="text-sm font-black text-gray-800 mt-0.5">{stat.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Description */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                                <h3 className="text-lg font-black text-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <FileText size={20} className="text-black" />
                                    Vehicle Overview
                                </h3>
                                <div className="prose prose-sm max-w-none text-gray-800 font-medium leading-loose">
                                    {car.description || "No description provided for this vehicle."}
                                </div>
                            </div>

                            {/* Options */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                                <h3 className="text-lg font-black text-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <CheckCircle2 size={20} className="text-black" />
                                    Features & Options
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {carOptions.map((opt, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-black hover:text-white transition-colors group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-black group-hover:bg-white shrink-0" />
                                            <span className="text-xs font-bold uppercase tracking-wide">{opt}</span>
                                        </div>
                                    ))}
                                    {carOptions.length === 0 && (
                                        <p className="text-gray-400 text-sm italic">No specific options listed.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column (Sticky Sidebar) */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200 sticky top-32">
                                <h3 className="text-sm font-black text-black uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">Purchase Summary</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-xs font-bold text-gray-600">Make</span>
                                        <span className="text-sm font-black text-black">{car.make}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-xs font-bold text-gray-600">Model</span>
                                        <span className="text-sm font-black text-black">{car.model}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-xs font-bold text-gray-600">Year</span>
                                        <span className="text-sm font-black text-black">{car.year}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-xs font-bold text-gray-600">Mileage</span>
                                        <span className="text-sm font-black text-black">{(car.mileage || 0).toLocaleString()} km</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-xs font-bold text-gray-600">Fuel Type</span>
                                        <span className="text-sm font-black text-black">{fuelType}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-xs font-bold text-gray-600">Transmission</span>
                                        <span className="text-sm font-black text-black">{transmission}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-xs font-bold text-gray-600">Body Type</span>
                                        <span className="text-sm font-black text-black">{bodyType}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-xs font-bold text-gray-600">Color</span>
                                        <span className="text-sm font-black text-black">{car.color || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-xs font-bold text-gray-600">Location</span>
                                        <span className="text-sm font-black text-black text-right">{car.city}, {car.country}</span>
                                    </div>

                                    <div className="flex justify-between items-center py-2 pt-4">
                                        <span className="text-xs font-bold text-gray-600">Total Price</span>
                                        <span className="text-2xl font-black text-primary-blue">{car.price.toLocaleString()} €</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Link to="/inquiry" className="block w-full">
                                        <button
                                            disabled={!isAvailable}
                                            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${isAvailable
                                                ? 'bg-black text-white hover:bg-gray-900 hover:shadow-xl hover:-translate-y-1'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                        >
                                            {isAvailable ? <Phone size={16} /> : <AlertCircle size={16} />}
                                            {isAvailable ? 'Contact Dealer' : 'Sold Out'}
                                        </button>
                                    </Link>
                                    <Link to="/inquiry" className="block w-full">
                                        <button className="w-full py-4 rounded-xl border-2 border-black text-black font-black uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all">
                                            Request Callback
                                        </button>
                                    </Link>
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-50 text-center">
                                    <p className="text-[10px] text-gray-400 font-medium">
                                        *Prices may vary based on financing options.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CarDetail;
