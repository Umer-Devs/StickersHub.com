import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCars } from '../context/CarContext';
import { Header, Footer } from '../componenets';
import {
    Plus,
    Trash2,
    Edit3,
    PlusCircle,
    X,
    Save,
    Image as ImageIcon,
    Settings,
    MapPin,
    Calendar,
    Gauge,
    Fuel,
    ChevronDown,
    Check,
    FileText,
    CircleDot
} from 'lucide-react';

const AdminCars = () => {
    const { cars, addCar, updateCar, deleteCar } = useCars();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCar, setEditingCar] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: 2024,
        price: '',
        mileage: '',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        bodyType: 'Sedan',
        country: 'Portugal',
        city: 'Lisbon',
        color: '',
        power: '',
        trim: '',
        description: '',
        isAvailable: true,
        image: '',
        options: []
    });

    const bodyTypes = ["Compact", "Convertible", "Coupe", "SUV", "Sedan", "Station Wagon", "Van", "Transporter"];
    const commonOptions = ["ABS", "Air Conditioning", "Airbag", "Alloy Wheels", "Central Locking", "Cruise Control", "Electric Windows", "Trip Computer", "Immobilizer", "Leather", "Power Steering", "Spoiler", "Sunroof", "Navigation System", "Heated Seats"];

    const handleOpenModal = (car = null) => {
        if (car) {
            setEditingCar(car);
            setFormData({ ...car });
        } else {
            setEditingCar(null);
            setFormData({
                make: '', model: '', year: 2024, price: '', mileage: '',
                fuelType: 'Petrol', transmission: 'Automatic', bodyType: 'Sedan',
                country: 'Portugal', city: 'Lisbon', color: '', power: '',
                trim: '', description: '', isAvailable: true, image: '', options: []
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCar(null);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleOptionToggle = (option) => {
        setFormData(prev => ({
            ...prev,
            options: prev.options.includes(option)
                ? prev.options.filter(o => o !== option)
                : [...prev.options, option]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = {
            ...formData,
            price: parseFloat(formData.price),
            mileage: parseInt(formData.mileage),
            year: parseInt(formData.year)
        };

        if (editingCar) {
            updateCar(editingCar.id, dataToSave);
        } else {
            addCar(dataToSave);
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Realmente deseja excluir este veículo?')) {
            deleteCar(id);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <div className="custom-padding max-w-7xl mx-auto">
                    {/* Header Action */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                        <div className="space-y-1 text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-black text-primary-blue uppercase tracking-tight">Vehicle <span className="text-theme-blue">Management</span></h1>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total Vehicles: {cars.length}</p>
                        </div>
                        <button
                            onClick={() => handleOpenModal()}
                            className="bg-theme-blue hover:bg-theme-blue/90 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center gap-2 shadow-xl shadow-theme-blue/30 transition-all active:scale-95"
                        >
                            <PlusCircle size={20} />
                            Add New Vehicle
                        </button>
                    </div>

                    {/* Dashboard List */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Vehicle</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Year</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Price</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {cars.map(car => (
                                        <tr key={car.id} className="hover:bg-gray-50/30 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                                        <img src={car.image} alt={car.make} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-primary-blue uppercase text-sm leading-tight">{car.make} {car.model}</p>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{car.bodyType}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="font-black text-primary-blue text-sm">{car.year}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="font-black text-theme-blue text-sm">{car.price.toLocaleString()} €</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${car.isAvailable
                                                        ? 'bg-green-50 border-green-100 text-green-600'
                                                        : 'bg-red-50 border-red-100 text-red-600'
                                                    }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${car.isAvailable ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">
                                                        {car.isAvailable ? 'Available' : 'Sold Out'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end items-center gap-2">
                                                    <button
                                                        onClick={() => handleOpenModal(car)}
                                                        className="p-3 text-primary-blue hover:text-theme-blue hover:bg-blue-50 rounded-xl transition-all"
                                                        title="Edit"
                                                    >
                                                        <Edit3 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(car.id)}
                                                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal for Add/Edit */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-primary-blue/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl"
                        >
                            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-8 flex justify-between items-center z-20">
                                <div>
                                    <h2 className="text-2xl font-black text-primary-blue uppercase tracking-tight">
                                        {editingCar ? 'Update' : 'Add New'} <span className="text-theme-blue">Vehicle</span>
                                    </h2>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Car Details & Integration</p>
                                </div>
                                <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X size={24} className="text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-10">
                                {/* Basic Info Grid */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                        <div className="flex items-center gap-2">
                                            <Settings size={16} className="text-theme-blue" />
                                            <h3 className="text-xs font-black text-primary-blue uppercase tracking-widest">Main Characteristics</h3>
                                        </div>
                                        {/* Availability Toggle */}
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${formData.isAvailable ? 'text-green-600' : 'text-gray-400'}`}>
                                                {formData.isAvailable ? 'Available' : 'Mark as Sold'}
                                            </span>
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    name="isAvailable"
                                                    checked={formData.isAvailable}
                                                    onChange={handleInputChange}
                                                    className="sr-only"
                                                />
                                                <div className={`w-12 h-6 rounded-full transition-colors ${formData.isAvailable ? 'bg-green-500' : 'bg-gray-200'}`} />
                                                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.isAvailable ? 'translate-x-6' : 'translate-x-0'}`} />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Make</label>
                                            <input required name="make" value={formData.make} onChange={handleInputChange} className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold text-sm" placeholder="e.g. BMW" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Model</label>
                                            <input required name="model" value={formData.model} onChange={handleInputChange} className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold text-sm" placeholder="e.g. M4" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Year</label>
                                            <input required type="number" name="year" value={formData.year} onChange={handleInputChange} className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold text-sm" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Price (€)</label>
                                            <input required type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold text-sm" placeholder="85000" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mileage (KM)</label>
                                            <input required type="number" name="mileage" value={formData.mileage} onChange={handleInputChange} className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold text-sm" placeholder="5200" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Body Type</label>
                                            <select name="bodyType" value={formData.bodyType} onChange={handleInputChange} className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold text-sm">
                                                {bodyTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Description Section */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                                        <FileText size={16} className="text-theme-blue" />
                                        <h3 className="text-xs font-black text-primary-blue uppercase tracking-widest">Vehicle Description</h3>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold text-sm resize-none"
                                            placeholder="Write a detailed description of the vehicle..."
                                        />
                                    </div>
                                </div>

                                {/* Tech Specs */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                                        <Calendar size={16} className="text-theme-blue" />
                                        <h3 className="text-xs font-black text-primary-blue uppercase tracking-widest">Technical Specifications</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Trim</label>
                                            <input name="trim" value={formData.trim} onChange={handleInputChange} className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold text-sm" placeholder="e.g. Competition" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Power (e.g. 510 HP)</label>
                                            <input name="power" value={formData.power} onChange={handleInputChange} className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold text-sm" placeholder="375 kW (510 HP)" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Fuel Type</label>
                                            <select name="fuelType" value={formData.fuelType} onChange={handleInputChange} className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold text-sm">
                                                <option value="Petrol">Petrol</option>
                                                <option value="Diesel">Diesel</option>
                                                <option value="Electric">Electric</option>
                                                <option value="Hybrid">Hybrid</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Transmission</label>
                                            <select name="transmission" value={formData.transmission} onChange={handleInputChange} className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold text-sm">
                                                <option value="Automatic">Automatic</option>
                                                <option value="Manual">Manual</option>
                                                <option value="Semi-Automatic">Semi-Automatic</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Media & Location */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                                        <ImageIcon size={16} className="text-theme-blue" />
                                        <h3 className="text-xs font-black text-primary-blue uppercase tracking-widest">Media & Location</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Image URL</label>
                                            <input required name="image" value={formData.image} onChange={handleInputChange} className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold text-sm text-theme-blue underline" placeholder="https://..." />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
                                                <input name="city" value={formData.city} onChange={handleInputChange} className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold text-sm" placeholder="Lisbon" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Country</label>
                                                <input name="country" value={formData.country} onChange={handleInputChange} className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold text-sm" placeholder="Portugal" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Options Select */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                                        <Check size={16} className="text-theme-blue" />
                                        <h3 className="text-xs font-black text-primary-blue uppercase tracking-widest">Included Options</h3>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                        {commonOptions.map(option => (
                                            <div
                                                key={option}
                                                onClick={() => handleOptionToggle(option)}
                                                className={`p-3 rounded-xl border text-[10px] font-black uppercase tracking-tight text-center cursor-pointer transition-all ${formData.options.includes(option)
                                                        ? 'bg-theme-blue border-theme-blue text-white shadow-lg shadow-theme-blue/20'
                                                        : 'bg-white border-gray-100 text-gray-400 hover:border-theme-blue/30 hover:text-primary-blue'
                                                    }`}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Form Footer */}
                                <div className="pt-10 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="flex-1 py-5 rounded-2xl border-2 border-gray-100 text-gray-400 font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] py-5 bg-primary-blue hover:bg-theme-blue text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        <Save size={18} />
                                        {editingCar ? 'Update Vehicle' : 'Save Vehicle'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default AdminCars;
