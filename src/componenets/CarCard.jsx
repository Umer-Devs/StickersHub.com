import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Gauge,
    Fuel,
    Settings,
    ChevronRight,
    CheckCircle2,
    Calendar,
    MapPin,
    AlertCircle
} from 'lucide-react';

const CarCard = ({ car }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary-blue/10 border border-gray-100 transition-all group"
        >
            {/* Image Section */}
            <Link to={`/car/${car.id}`} className="block relative h-64 overflow-hidden">
                <img
                    src={car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <div className={`px-4 py-2 rounded-full backdrop-blur-md border flex items-center gap-2 shadow-lg ${car.isAvailable
                            ? 'bg-green-500/10 border-green-500/20 text-green-500'
                            : 'bg-red-500/10 border-red-500/20 text-red-500'
                        }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${car.isAvailable ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                            {car.isAvailable ? 'Available' : 'Sold Out'}
                        </span>
                    </div>
                </div>

                {/* Country Badge */}
                <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <MapPin size={12} className="text-theme-blue" />
                        {car.country}
                    </div>
                </div>
            </Link>

            {/* Content Section */}
            <div className="p-6 md:p-8 space-y-6">
                <div className="flex justify-between items-start">
                    <Link to={`/car/${car.id}`}>
                        <h3 className="text-xl md:text-2xl font-black text-primary-blue leading-tight mb-1 hover:text-theme-blue transition-colors">
                            {car.make} {car.model}
                        </h3>
                        <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">
                            {car.bodyType}
                        </p>
                    </Link>
                    <div className="text-right">
                        <span className="text-2xl font-black text-theme-blue block">
                            {car.price.toLocaleString()} €
                        </span>
                    </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-gray-300">
                            <Gauge size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Mileage</span>
                        </div>
                        <p className="text-sm font-black text-primary-blue">{car.mileage.toLocaleString()} km</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-gray-300">
                            <Fuel size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Fuel</span>
                        </div>
                        <p className="text-sm font-black text-primary-blue">{car.fuelType}</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-gray-300">
                            <Settings size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Gearbox</span>
                        </div>
                        <p className="text-sm font-black text-primary-blue">{car.transmission}</p>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-300" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{car.year}</span>
                    </div>

                    <Link
                        to={`/car/${car.id}`}
                        className={`flex items-center gap-2 font-black text-sm uppercase cursor-pointer tracking-widest transition-colors group/btn ${car.isAvailable ? 'text-primary-blue hover:text-theme-blue' : 'text-gray-400 hover:text-red-500'
                            }`}
                    >
                        {car.isAvailable ? 'Details' : 'Sold Out'}
                        <ChevronRight size={18} className="translate-y-[1px] group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default CarCard;
