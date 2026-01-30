import React from 'react';
import { HeroImgOne } from '../../assets';
import { ChevronDown, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const carMakes = ["Toyota", "BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Honda", "Ford", "Nissan", "Hyundai", "Kia", "Tesla", "Porsche", "Lexus", "Land Rover", "Volvo"];
    const carModals = ["2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];
    const prices = ["5,000 €", "10,000 €", "15,000 €", "20,000 €", "30,000 €", "40,000 €", "50,000 €", "75,000 €", "100,000 €"];
    const years = Array.from({ length: 16 }, (_, i) => 2025 - i);
    const mileages = ["5,000", "10,000", "20,000", "50,000", "100,000", "150,000", "200,000"];
    const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "LPG", "Hydrogen"];
    const transmissions = ["Automatic", "Manual", "Semi-Automatic"];
    const bodyTypes = ["Compact", "Convertible", "Coupe", "SUV", "Sedan", "Station Wagon", "Van", "Transporter"];

    return (
        <main
            className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(to right, rgba(50, 75, 94, 0.9), rgba(33, 60, 81, 0.4)), url(${HeroImgOne})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="custom-padding w-full relative z-10">
                <div className="flex flex-col gap-12 max-w-7xl">
                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-white font-black leading-[1.05] drop-shadow-2xl text-5xl md:text-6xl lg:text-8xl">
                            You choose your car online.<br />
                            <span className="text-theme-blue">We inspect it and deliver it.</span>
                        </h1>
                    </motion.div>

                    {/* Premium Horizontal Filter Bar (4 fields per row) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] p-8 md:p-10 w-full border border-white/20"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Row 1 */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Country</label>
                                <div className="relative group">
                                    <div className="flex items-center gap-3 w-full p-4 bg-gray-50 border border-transparent rounded-2xl group-hover:bg-white group-hover:border-red-500/30 transition-all cursor-pointer shadow-sm">
                                        <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                                            <img src="https://flagcdn.com/pt.svg" alt="Portugal" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="font-bold text-primary-blue">Portugal</span>
                                        <ChevronDown size={18} className="ml-auto text-gray-400 group-hover:text-red-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Car Make</label>
                                <div className="relative group">
                                    <select className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm">
                                        <option value="">Any Make</option>
                                        {carMakes.map(make => <option key={make} value={make.toLowerCase()}>{make}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Car Modal</label>
                                <div className="relative group">
                                    <select className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm">
                                        <option value="">Any Modal</option>
                                        {carModals.map(make => <option key={make} value={make.toLowerCase()}>{make}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Price From</label>
                                <div className="relative group">
                                    <select className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm">
                                        <option value="">From</option>
                                        {prices.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Price To</label>
                                <div className="relative group">
                                    <select className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm">
                                        <option value="">To</option>
                                        {prices.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Year From</label>
                                <div className="relative group">
                                    <select className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm">
                                        <option value="">Any Year</option>
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Year To</label>
                                <div className="relative group">
                                    <select className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm">
                                        <option value="">Any Year</option>
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>


                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Mileage From</label>
                                <div className="relative group">
                                    <select className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm">
                                        <option value="">Any</option>
                                        {mileages.map(m => <option key={m} value={m}>{m} km</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Mileage To</label>
                                <div className="relative group">
                                    <select className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm">
                                        <option value="">Any</option>
                                        {mileages.map(m => <option key={m} value={m}>{m} km</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Fuel Type</label>
                                <div className="relative group">
                                    <select className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm">
                                        <option value="">Any Fuel</option>
                                        {fuelTypes.map(ft => <option key={ft} value={ft}>{ft}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Transmission</label>
                                <div className="relative group">
                                    <select className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm">
                                        <option value="">Any Transmission</option>
                                        {transmissions.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Body Type</label>
                                <div className="relative group">
                                    <select className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm">
                                        <option value="">Any Body</option>
                                        {bodyTypes.map(bt => <option key={bt} value={bt}>{bt}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>

                            <div className="flex items-end">
                                <Link to="/explore" className="w-full">
                                    <button className="w-full py-4 bg-theme-blue hover:bg-theme-blue/90 text-white rounded-2xl font-black text-lg tracking-widest shadow-xl shadow-theme-blue/20 transition-all active:scale-[0.98] uppercase">
                                        Show Offers
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bottom Features */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center gap-8"
                    >
                        <Link to="/explore">
                            <button className="flex items-center gap-4 bg-white/10 backdrop-blur-lg border border-white/20 px-10 py-5 rounded-full text-white font-black hover:bg-white/20 transition-all group">
                                <span>Explore Market</span>
                                <Search size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-primary-blue bg-gray-200 overflow-hidden shadow-lg">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 40}`} alt="user" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-black text-lg leading-tight">1.2M+ Real Offers</span>
                                <span className="text-theme-blue text-[10px] uppercase font-bold tracking-[0.2em]">Verified Listings</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Subtle Gradient Overlays */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-500/5 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </main>
    );
};

export default HeroSection;
