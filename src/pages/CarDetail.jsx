import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCars } from '../context/CarContext';
import { Header, Footer } from '../componenets';
import {
    Info,
    MapPin,
    CheckCircle2,
    ChevronLeft,
    Star,
    Copy,
    Phone,
    Gauge,
    Fuel,
    Settings,
    Calendar,
    Palette,
    Zap,
    FileText,
    AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const CarDetail = () => {
    const { id } = useParams();
    const { cars } = useCars();
    const [car, setCar] = useState(null);

    useEffect(() => {
        const foundCar = cars.find(c => c.id === parseInt(id));
        setCar(foundCar);
        window.scrollTo(0, 0);
    }, [id, cars]);

    if (!car) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Info size={40} className="text-gray-300" />
                    </div>
                    <h2 className="text-2xl font-black text-primary-blue uppercase tracking-tight">Car Not Found</h2>
                    <p className="text-gray-400 font-bold text-sm uppercase tracking-widest pb-4">The vehicle you're looking for doesn't exist.</p>
                    <Link to="/explore" className="inline-block px-8 py-4 bg-primary-blue text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-theme-blue transition-all shadow-xl shadow-blue-500/10 active:scale-95">
                        Return to Inventory
                    </Link>
                </div>
            </div>
        );
    }

    const specItems = [
        { label: "Price", value: `${car.price.toLocaleString()} EUR`, icon: <Star size={16} /> },
        { label: "Make", value: car.make, icon: <Settings size={16} /> },
        { label: "Model", value: car.model, icon: <Zap size={16} /> },
        { label: "Year", value: car.year, icon: <Calendar size={16} /> },
        { label: "Mileage", value: `${car.mileage.toLocaleString()} km`, icon: <Gauge size={16} /> },
        { label: "Fuel Type", value: car.fuelType, icon: <Fuel size={16} /> },
        { label: "Transmission", value: car.transmission, icon: <Settings size={16} /> },
        { label: "Body Type", value: car.bodyType, icon: <Palette size={16} /> },
        { label: "Power", value: car.power || "N/A", icon: <Zap size={16} /> },
        { label: "Trim", value: car.trim || "Standard", icon: <CheckCircle2 size={16} /> },
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col font-inter">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <div className="custom-padding max-w-7xl mx-auto">

                    {/* Breadcrumbs & Title */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div className="space-y-4">
                            <Link to="/explore" className="flex items-center gap-2 text-primary-blue/40 font-black uppercase tracking-widest text-[10px] hover:text-theme-blue transition-colors group">
                                <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                Back to Inventory
                            </Link>
                            <div className="space-y-2">
                                <h1 className="text-3xl md:text-5xl font-black text-primary-blue uppercase tracking-tight leading-tight">
                                    {car.year} {car.make} <span className="text-theme-blue">{car.model}</span>
                                </h1>
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
                                        <MapPin size={12} className="text-theme-blue" />
                                        <span className="text-[10px] font-black text-primary-blue uppercase tracking-widest">{car.city}, {car.country}</span>
                                    </div>

                                    {/* Dynamic Availability Status */}
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${car.isAvailable
                                            ? 'bg-green-50 border-green-100'
                                            : 'bg-red-50 border-red-100'
                                        }`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${car.isAvailable ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${car.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                                            {car.isAvailable ? 'Available Now' : 'Sold Out'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">Selling Price</p>
                            <h2 className="text-4xl font-black text-primary-blue leading-none">{car.price.toLocaleString()} <span className="text-theme-blue">€</span></h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Left Column: Media & Description */}
                        <div className="lg:col-span-7 space-y-12">
                            {/* Main Image */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="aspect-[16/10] bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 group relative"
                            >
                                <img
                                    src={car.image}
                                    alt={`${car.make} ${car.model}`}
                                    className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${!car.isAvailable ? 'grayscale opacity-70' : ''}`}
                                />
                                {!car.isAvailable && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                                        <div className="px-10 py-5 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col items-center gap-2">
                                            <AlertCircle size={32} className="text-red-500" />
                                            <span className="text-2xl font-black text-primary-blue uppercase tracking-tighter">Sold Out</span>
                                        </div>
                                    </div>
                                )}
                                <div className="absolute top-6 right-6">
                                    <button className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:bg-white hover:text-primary-blue transition-all">
                                        <Copy size={20} />
                                    </button>
                                </div>
                            </motion.div>

                            {/* Description Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-theme-blue/10 flex items-center justify-center">
                                        <FileText size={20} className="text-theme-blue" />
                                    </div>
                                    <h3 className="text-xl font-black text-primary-blue uppercase tracking-tight">Seller <span className="text-theme-blue">Description</span></h3>
                                </div>
                                <div className="bg-gray-50/50 rounded-[2rem] p-8 border border-gray-100">
                                    <p className="text-gray-500 font-medium leading-relaxed italic">
                                        {car.description || "No description available for this vehicle. Please contact the seller for more details."}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Options Highlights */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {car.options.slice(0, 4).map((option, idx) => (
                                    <div key={idx} className="p-6 bg-white border border-gray-100 rounded-3xl flex flex-col items-center justify-center gap-3 text-center hover:shadow-xl hover:shadow-primary-blue/5 transition-all cursor-default">
                                        <div className="w-10 h-10 rounded-full bg-theme-blue/5 flex items-center justify-center">
                                            <CheckCircle2 size={18} className="text-theme-blue" />
                                        </div>
                                        <span className="text-[10px] font-black text-primary-blue uppercase tracking-widest">{option}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Specifications & Actions */}
                        <div className="lg:col-span-5 space-y-8">

                            {/* Detailed Specs */}
                            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                                <div className="p-8 border-b border-gray-50 bg-gray-50/30">
                                    <h3 className="text-[10px] font-black text-primary-blue uppercase tracking-[0.3em]">Technical Specifications</h3>
                                </div>
                                <div className="divide-y divide-gray-50">
                                    {specItems.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center p-5 px-8 hover:bg-gray-50/50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <span className="text-gray-300">{item.icon}</span>
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</span>
                                            </div>
                                            <span className="text-xs font-black text-primary-blue uppercase tracking-tight">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Full Options List */}
                            <div className="bg-primary-blue rounded-[2.5rem] p-8 text-white space-y-6 shadow-2xl shadow-primary-blue/20">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Full Equipment List</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                                    {car.options.map((option, index) => (
                                        <div key={index} className="flex items-center gap-3 group">
                                            <CheckCircle2 size={14} className="text-theme-blue group-hover:scale-110 transition-transform" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">{option}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-4 pt-4">
                                <button
                                    disabled={!car.isAvailable}
                                    className={`w-full py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 text-sm ${car.isAvailable
                                            ? 'bg-[#FFC107] hover:bg-[#FFB300] text-primary-blue shadow-yellow-500/20 hover:scale-[1.02] active:scale-[0.98]'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed grayscale shadow-none'
                                        }`}
                                >
                                    {car.isAvailable ? <Phone size={18} /> : <AlertCircle size={18} />}
                                    {car.isAvailable ? 'Contact seller' : 'Vehicle Sold'}
                                </button>
                                <button className="w-full py-6 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-[1.5rem] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 text-sm">
                                    Request Information
                                </button>
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
