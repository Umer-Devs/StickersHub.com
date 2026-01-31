import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Gauge,
    Fuel,
    Settings,
    MapPin,
    ArrowUpRight,
    Calendar
} from 'lucide-react';

const CarCard = ({ car }) => {
    // Normalize data from possible backend formats
    const isAvailable = car.isAvailable !== undefined ? car.isAvailable : !!car.is_available;
    const fuelType = car.fuelType || car.fuel_type || 'N/A';
    const bodyType = car.bodyType || car.body_type || 'N/A';
    const transmission = car.transmission || car.transmission_type || 'N/A';
    const imageSrc = car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800";

    // Truncate description logic
    const truncateDescription = (text, wordLimit) => {
        if (!text) return '';
        const words = text.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return text;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-theme-blue/10 border border-gray-100 transition-all duration-500 flex flex-col h-full"
        >
            {/* Image Section */}
            <Link to={`/car/${car.id}`} className="block relative aspect-[20/9] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                <img
                    src={imageSrc}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/20 shadow-xl ${isAvailable
                        ? 'bg-green-500/80 text-white'
                        : 'bg-red-500/80 text-white'
                        }`}>
                        {isAvailable ? 'Available' : 'Sold'}
                    </span>
                </div>

                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 text-white/90">
                    <MapPin size={10} className="text-theme-blue" />
                    <span className="text-[9px] uppercase font-bold tracking-[0.1em]">{car.country || 'Europe'}</span>
                </div>
            </Link>

            {/* Content Section */}
            <div className="p-4 flex flex-col gap-3 flex-grow">
                {/* Title & Info */}
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                            <Calendar size={10} className="text-gray-400" />
                            <span className="font-bold text-gray-400 uppercase text-[9px] tracking-widest">{car.year}</span>
                        </div>
                        <span className="px-2 py-0.5 bg-gray-100 text-primary-blue rounded text-[8px] font-bold uppercase tracking-tighter">
                            {bodyType}
                        </span>
                    </div>
                    <Link to={`/car/${car.id}`} className="block">
                        <h3 className="text-lg font-black text-primary-blue uppercase leading-tight group-hover:text-theme-blue transition-colors duration-300 truncate">
                            {car.make} <span className="text-theme-blue">{car.model}</span>
                        </h3>
                    </Link>
                </div>

                {/* Specs Grid - Normalized Data */}
                <div className="grid grid-cols-3 gap-1 bg-gray-50/80 p-2 rounded-xl border border-gray-50">
                    <div className="flex flex-col items-center text-center">
                        <Gauge size={20} className="text-theme-blue/70 mb-0.5" />
                        <span className="font-bold text-primary-blue">{parseInt(car.mileage).toLocaleString()}</span>
                        <span className="font-bold text-gray-400 uppercase tracking-tighter text-center w-full ">KM</span>
                    </div>
                    <div className="flex flex-col items-center text-center border-x border-gray-200 px-0.5">
                        <Settings size={20} className="text-theme-blue/70 mb-0.5" />
                        <span className="font-bold text-primary-blue truncate w-full">{transmission}</span>
                        <span className="font-bold text-gray-400 uppercase tracking-tighter text-center w-full ">Trans</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Fuel size={20} className="text-theme-blue/70 mb-0.5" />
                        <span className="font-bold text-primary-blue truncate w-full text-sm    ">{fuelType}</span>
                        <span className="font-bold text-gray-400 uppercase tracking-tighter text-center w-full ">Fuel</span>
                    </div>
                </div>

                {/* Description - 2 lines only */}
                <p className="text-gray-500 leading-relaxed line-clamp-2">
                    {truncateDescription(car.description, 18)}
                </p>

                {/* Price & Action */}
                <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-400 text-[11px] uppercase tracking-widest">Price</span>
                        <div className="text-xl font-black text-primary-blue flex items-baseline gap-0.5">
                            {parseInt(car.price).toLocaleString()}
                            <span className="text-theme-blue text-xs font-bold">€</span>
                        </div>
                    </div>
                    <Link
                        to={`/car/${car.id}`}
                        className="w-10 h-10 rounded-xl bg-primary-blue flex items-center justify-center text-white hover:bg-theme-blue transition-all duration-300 group/btn shadow-md"
                    >
                        <ArrowUpRight size={18} className="group-hover/btn:rotate-45 transition-transform duration-300" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default CarCard;

