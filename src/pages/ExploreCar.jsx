import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header, Footer, CarCard } from '../componenets';
import { ChevronDown, Search, FilterX, RotateCcw, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCars } from '../context/CarContext';
import { ExploreCars } from '../assets';
import { useLocation } from 'react-router-dom';

const ExploreCar = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { cars: allCars, loading: contextLoading } = useCars();

    const [filters, setFilters] = useState({
        country: '',
        make: '',
        model: '',
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

    // Update filters from URL query params
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const newFilters = { ...filters };
        let hasChanges = false;

        Object.keys(newFilters).forEach(key => {
            const paramValue = searchParams.get(key);
            if (paramValue !== null && paramValue !== newFilters[key]) {
                newFilters[key] = paramValue;
                hasChanges = true;
            }
        });

        if (hasChanges) {
            setFilters(newFilters);
        }
    }, [location.search]);

    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;


    const carMakes = ["Toyota", "BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Honda", "Ford", "Nissan", "Hyundai", "Kia", "Tesla", "Porsche", "Lexus", "Land Rover", "Volvo"];
    const carModals = ["2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];
    const prices = [0, 5000, 10000, 15000, 20000, 30000, 40000, 50000, 75000, 100000, 200000, 500000];
    const years = Array.from({ length: 26 }, (_, i) => 2026 - i);
    const mileages = [0, 5000, 10000, 20000, 50000, 100000, 150000, 200000];
    const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "LPG", "Hydrogen"];
    const transmissions = ["Automatic", "Manual", "Semi-Automatic"];
    const bodyTypes = ["Convertible", "Coupe", "Crossover", "Hatchback", "Minivan", "Pickup", "Sedan", "Sports Car", "Station Wagon", "SUV", "Transporter", "Van"];

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setCurrentPage(1);
    };

    const resetFilters = () => {
        setFilters({
            country: '',
            make: '',
            model: '',
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
        setCurrentPage(1);
    };

    const applyFilters = useCallback(async () => {
        setLoading(true);
        // Artificial delay for premium feel
        await new Promise(resolve => setTimeout(resolve, 800));

        const filtered = allCars.filter(car => {
            return (
                (filters.country === '' || car.country === filters.country) &&
                (filters.make === '' || car.make === filters.make) &&
                (filters.model === '' || car.year.toString() === filters.model) &&
                (filters.fuelType === '' || car.fuelType === filters.fuelType) &&
                (filters.transmission === '' || car.transmission === filters.transmission) &&
                (filters.bodyType === '' || car.bodyType === filters.bodyType) &&
                (filters.priceFrom === '' || car.price >= parseInt(filters.priceFrom)) &&
                (filters.priceTo === '' || car.price <= parseInt(filters.priceTo)) &&
                (filters.yearFrom === '' || car.year >= parseInt(filters.yearFrom)) &&
                (filters.yearTo === '' || car.year <= parseInt(filters.yearTo)) &&
                (filters.mileageFrom === '' || car.mileage >= parseInt(filters.mileageFrom)) &&
                (filters.mileageTo === '' || car.mileage <= parseInt(filters.mileageTo))
            );
        });

        setFilteredCars(filtered);
        setLoading(false);
    }, [filters, allCars]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
    const paginatedCars = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredCars.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredCars, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    const uniqueCountries = useMemo(() => {
        return [...new Set(allCars.map(car => car.country).filter(Boolean))].sort();
    }, [allCars]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            {/* Premium Hero Section with Background Image */}
            <section
                className="relative min-h-[400px] md:min-h-[500px] pt-48 pb-32 flex items-center overflow-hidden bg-primary-blue bg-cover bg-top bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(10, 31, 58, 0.95), rgba(10, 31, 58, 0.4), transparent), url(${ExploreCars})`
                }}
            >
                <div className="custom-padding relative z-10 w-full text-center lg:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9]    er"
                    >
                        Find Your <br />
                        <span className="text-theme-blue italic">Dream Car.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/60 text-lg md:text-xl font-medium max-w-2xl leading-relaxed"
                    >
                        Browse through our exclusive collection of premium vehicles across Europe.
                    </motion.p>
                </div>
            </section>

            <main className="flex-grow custom-padding -mt-16 mb-20 relative z-20">
                <div className="flex flex-col gap-10">

                    {/* Advanced Filter Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/95 backdrop-blur-md rounded-lg shadow-2xl p-8 md:p-10 border border-white/20"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Country */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Country</label>
                                <div className="relative group">
                                    <select
                                        name="country"
                                        value={filters.country}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">All Countries</option>
                                        {uniqueCountries.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-theme-blue" />
                                </div>
                            </div>

                            {/* Make */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Car Make</label>
                                <div className="relative group">
                                    <select
                                        name="make"
                                        value={filters.make}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">Any Make</option>
                                        {carMakes.map(make => <option key={make} value={make}>{make}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-theme-blue" />
                                </div>
                            </div>

                            {/* Modal */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Car Model (Year)</label>
                                <div className="relative group">
                                    <select
                                        name="model"
                                        value={filters.model}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">Any Year</option>
                                        {carModals.map(modal => <option key={modal} value={modal}>{modal}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-theme-blue" />
                                </div>
                            </div>

                            {/* Body Type */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Body Type</label>
                                <div className="relative group">
                                    <select
                                        name="bodyType"
                                        value={filters.bodyType}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">Any Body</option>
                                        {bodyTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-theme-blue" />
                                </div>
                            </div>

                            {/* Price From */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Price From</label>
                                <div className="relative group">
                                    <select
                                        name="priceFrom"
                                        value={filters.priceFrom}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">From</option>
                                        {prices.map(p => <option key={p} value={p}>{p.toLocaleString()} €</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-theme-blue" />
                                </div>
                            </div>

                            {/* Price To */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Price To</label>
                                <div className="relative group">
                                    <select
                                        name="priceTo"
                                        value={filters.priceTo}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">To</option>
                                        {prices.map(p => <option key={p} value={p}>{p.toLocaleString()} €</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-theme-blue" />
                                </div>
                            </div>

                            {/* Year From */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Year From</label>
                                <div className="relative group">
                                    <select
                                        name="yearFrom"
                                        value={filters.yearFrom}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">Any Year</option>
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-theme-blue" />
                                </div>
                            </div>

                            {/* Year To */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Year To</label>
                                <div className="relative group">
                                    <select
                                        name="yearTo"
                                        value={filters.yearTo}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">Any Year</option>
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-theme-blue" />
                                </div>
                            </div>

                            {/* Mileage From */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Mileage From</label>
                                <div className="relative group">
                                    <select
                                        name="mileageFrom"
                                        value={filters.mileageFrom}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">Any</option>
                                        {mileages.map(m => <option key={m} value={m}>{m.toLocaleString()} km</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-theme-blue" />
                                </div>
                            </div>

                            {/* Mileage To */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Mileage To</label>
                                <div className="relative group">
                                    <select
                                        name="mileageTo"
                                        value={filters.mileageTo}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">Any</option>
                                        {mileages.map(m => <option key={m} value={m}>{m.toLocaleString()} km</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-theme-blue" />
                                </div>
                            </div>

                            {/* Fuel Type */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Fuel Type</label>
                                <div className="relative group">
                                    <select
                                        name="fuelType"
                                        value={filters.fuelType}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">Any Fuel</option>
                                        {fuelTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-theme-blue" />
                                </div>
                            </div>

                            {/* Transmission */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Transmission</label>
                                <div className="relative group">
                                    <select
                                        name="transmission"
                                        value={filters.transmission}
                                        onChange={handleFilterChange}
                                        className="w-full p-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all cursor-pointer shadow-sm"
                                    >
                                        <option value="">Any</option>
                                        {transmissions.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-theme-blue" />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <button
                                    onClick={resetFilters}
                                    className="w-full py-4 bg-gray-100 hover:bg-gray-200 text-primary-blue rounded-lg font-black text-sm tracking-widest transition-all active:scale-[0.98] uppercase flex items-center justify-center gap-2"
                                >
                                    <RotateCcw size={16} />
                                    Reset Filters
                                </button>
                                <button
                                    onClick={applyFilters}
                                    disabled={loading}
                                    className="w-full py-4 bg-theme-blue hover:bg-theme-blue/90 text-white rounded-lg font-black text-sm tracking-widest transition-all active:scale-[0.98] uppercase flex items-center justify-center gap-2 shadow-xl shadow-theme-blue/30 disabled:opacity-50"
                                >
                                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                                    Show Offers
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Results Count */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <span className="bg-theme-blue text-white px-4 py-2 flex items-center justify-center rounded-lg font-black text-lg min-w-[3rem]">
                                {filteredCars.length}
                            </span>
                            <h2 className="text-2xl font-black text-primary-blue uppercase   ">Vehicles Available</h2>
                        </div>
                    </div>

                    {/* Dynamic Results Grid */}
                    <div className="relative min-h-[400px]">
                        {loading && (
                            <div className="absolute inset-0 bg-gray-50/50 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-lg">
                                <div className="flex flex-col items-center gap-4">
                                    <Loader2 size={48} className="text-theme-blue animate-spin" />
                                    <span className="font-black text-primary-blue uppercase tracking-widest">Uplifting Offers...</span>
                                </div>
                            </div>
                        )}

                        <AnimatePresence mode="popLayout">
                            {paginatedCars.length > 0 ? (
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
                                >
                                    {paginatedCars.map(car => (
                                        <CarCard key={car.id} car={car} />
                                    ))}
                                </motion.div>
                            ) : !loading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-lg p-20 flex flex-col items-center text-center gap-6 shadow-sm border border-gray-100 w-full"
                                >
                                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                                        <FilterX size={48} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-black text-primary-blue uppercase   ">No Matching Offers</h3>
                                        <p className="text-gray-400 font-medium max-w-sm mx-auto">
                                            We couldn't find any vehicles matching these specific criteria. Try broadening your search or resetting filters.
                                        </p>
                                    </div>
                                    <button
                                        onClick={resetFilters}
                                        className="px-10 py-4 bg-primary-blue text-white rounded-lg font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg"
                                    >
                                        Try Again
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Pagination UI */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-3 mt-12">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="w-12 h-12 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-primary-blue hover:border-theme-blue hover:text-theme-blue transition-all disabled:opacity-30 disabled:pointer-events-none shadow-sm"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className="flex items-center gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`w-12 h-12 rounded-lg font-black text-sm transition-all shadow-sm ${currentPage === i + 1
                                            ? 'bg-theme-blue text-white'
                                            : 'bg-white border border-gray-100 text-primary-blue hover:border-theme-blue hover:text-theme-blue'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="w-12 h-12 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-primary-blue hover:border-theme-blue hover:text-theme-blue transition-all disabled:opacity-30 disabled:pointer-events-none shadow-sm"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ExploreCar;
