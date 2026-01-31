import React, { useState, useMemo } from 'react';
import { HeroImgOne } from '../../assets';
import { ChevronDown, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCars } from '../../context/CarContext';

const HeroSection = () => {
    const navigate = useNavigate();
    const { cars } = useCars();

    // Get unique countries from cars
    const uniqueCountries = useMemo(() => {
        return [...new Set(cars.map(car => car.country).filter(Boolean))].sort();
    }, [cars]);


    const [filters, setFilters] = useState({
        country: '',
        make: '',
        model: '', // Using 'model' state for Year as per previous ExploreCar logic (Wait, ExploreCar mapped 'model' filter to car.year. Let's align.)
        // Actually, looking at ExploreCar:
        // (filters.model === '' || car.year.toString() === filters.model)
        // So 'model' in filters actually filters by Year? That's confusing naming in ExploreCar but I must match it.
        // Wait, 'HeroSection' has "Car Modal" which seems to be years "2001"..."2026".
        // And 'HeroSection' ALSO has "Year From" / "Year To".
        // Let's look at ExploreCar Again.
        // ExploreCar logic:
        // (filters.make === '' || car.make === filters.make) &&
        // (filters.model === '' || car.year.toString() === filters.model) &&
        // ...
        // (filters.yearFrom === '' || car.year >= parseInt(filters.yearFrom))

        // It seems 'model' filter in ExploreCar is strictly for Year equality?
        // Let's check ExploreCar select options:
        // const carModals = ["2001" ... "2026"];
        // <select name="model" ...> {carModals.map...} </select>
        // label says "Car Model (Year)".

        // Okay, so in ExploreCar, "model" is treating "Year".
        // BUT HeroSection has distinct "Car Modal" (sic, probably Model) AND "Year From/To".
        // "Car Modal" in HeroSection currently maps to a list of years.

        // To avoid confusion and make it work:
        // User wants "sahi hai".
        // I should probably map the "Car Model" field to actual car models if available, or just map it to what ExploreCar expects.
        // Since ExploreCar expects "model" to be a year string, I will stick to that for now to avoid breaking existing logic, 
        // OR I can fix ExploreCar to treat `model` as `model`.

        // OPTION B: Let's assume the user meant "Car Model" to be actual models (like M4, Corolla).
        // BUT ExploreCar uses `carModals` list which are YEARS.
        // I will follow existing ExploreCar pattern to ensure compatibility.

        priceFrom: '',
        priceTo: '',
        yearFrom: '',
        yearTo: '',
        mileageFrom: '',
        mileageTo: '',
        fuelType: '',
        transmission: '',
        bodyType: '',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) queryParams.append(key, value);
        });
        navigate(`/explore?${queryParams.toString()}`);
    };

    const carMakes = ["Toyota", "BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Honda", "Ford", "Nissan", "Hyundai", "Kia", "Tesla", "Porsche", "Lexus", "Land Rover", "Volvo"];
    // HeroSection had "Car Modal" mapped to years. I will keep it consistent with ExploreCar for now, but label it "Car Model (Year)" to match ExploreCar's label or just keep it "Car Model" but use years if that's what the system does.
    // actually, let's look at the arrays.
    const carModals = ["2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];
    const prices = [5000, 10000, 15000, 20000, 30000, 40000, 50000, 75000, 100000];
    const years = Array.from({ length: 16 }, (_, i) => 2025 - i);
    const mileages = [5000, 10000, 20000, 50000, 100000, 150000, 200000];
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
                        <h1 className="text-white font-black leading-[1.05] drop-shadow-2xl text-5xl md:text-6xl lg:text-7xl ">
                            You choose your car online.<br />
                            <span className="text-theme-blue">We inspect it and deliver it.</span>
                        </h1>
                    </motion.div>

                    {/* Premium Horizontal Filter Bar (4 fields per row) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white/95 backdrop-blur-md rounded-lg shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] p-8 md:p-10 w-full border border-white/20"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Row 1 */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Country</label>
                                <div className="relative group">
                                    <select
                                        name="country"
                                        value={filters.country}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">All Countries</option>
                                        {uniqueCountries.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Car Make</label>
                                <div className="relative group">
                                    <select
                                        name="make"
                                        value={filters.make}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">Any Make</option>
                                        {carMakes.map(make => <option key={make} value={make}>{make}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Car Model (Year)</label>
                                <div className="relative group">
                                    <select
                                        name="model"
                                        value={filters.model}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">Any Model</option>
                                        {carModals.map(year => <option key={year} value={year}>{year}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Price From</label>
                                <div className="relative group">
                                    <select
                                        name="priceFrom"
                                        value={filters.priceFrom}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">From</option>
                                        {prices.map(p => <option key={p} value={p}>{p.toLocaleString()} €</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Price To</label>
                                <div className="relative group">
                                    <select
                                        name="priceTo"
                                        value={filters.priceTo}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">To</option>
                                        {prices.map(p => <option key={p} value={p}>{p.toLocaleString()} €</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Year From</label>
                                <div className="relative group">
                                    <select
                                        name="yearFrom"
                                        value={filters.yearFrom}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">Any Year</option>
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Year To</label>
                                <div className="relative group">
                                    <select
                                        name="yearTo"
                                        value={filters.yearTo}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">Any Year</option>
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>


                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Mileage From</label>
                                <div className="relative group">
                                    <select
                                        name="mileageFrom"
                                        value={filters.mileageFrom}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">Any</option>
                                        {mileages.map(m => <option key={m} value={m}>{m.toLocaleString()} km</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Mileage To</label>
                                <div className="relative group">
                                    <select
                                        name="mileageTo"
                                        value={filters.mileageTo}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">Any</option>
                                        {mileages.map(m => <option key={m} value={m}>{m.toLocaleString()} km</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Fuel Type</label>
                                <div className="relative group">
                                    <select
                                        name="fuelType"
                                        value={filters.fuelType}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">Any Fuel</option>
                                        {fuelTypes.map(ft => <option key={ft} value={ft}>{ft}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Transmission</label>
                                <div className="relative group">
                                    <select
                                        name="transmission"
                                        value={filters.transmission}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">Any Transmission</option>
                                        {transmissions.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Body Type</label>
                                <div className="relative group">
                                    <select
                                        name="bodyType"
                                        value={filters.bodyType}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">Any Body</option>
                                        {bodyTypes.map(bt => <option key={bt} value={bt}>{bt}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500" />
                                </div>
                            </div>

                            <div className="flex items-end">
                                <button
                                    onClick={handleSearch}
                                    className="w-full py-4 bg-theme-blue hover:bg-theme-blue/90 text-white rounded-lg font-black text-lg tracking-widest shadow-xl shadow-theme-blue/20 transition-all active:scale-[0.98] uppercase"
                                >
                                    Show Offers
                                </button>
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
