import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCars } from '../context/CarContext';
import { Header, Footer } from '../componenets';
import {
    Plus,
    X,
    Save,
    Image as ImageIcon,
    Settings,
    Calendar,
    Check,
    FileText,
    ChevronLeft
} from 'lucide-react';

const AdminCarForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cars, addCar, updateCar } = useCars();
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
        images: [],
        options: []
    });

    const bodyTypes = ["Convertible", "Coupe", "Crossover", "Hatchback", "Minivan", "Pickup", "Sedan", "Sports Car", "Station Wagon", "SUV", "Transporter", "Van"];
    const commonOptions = ["ABS", "Air Conditioning", "Airbag", "Alloy Wheels", "Central Locking", "Cruise Control", "Electric Windows", "Trip Computer", "Immobilizer", "Leather", "Power Steering", "Spoiler", "Sunroof", "Navigation System", "Heated Seats"];


    useEffect(() => {
        if (id) {
            const carToEdit = cars.find(c => c.id === parseInt(id));
            if (carToEdit) {
                setEditingCar(carToEdit);
                setFormData({
                    ...carToEdit,
                    isAvailable: carToEdit.isAvailable !== undefined ? carToEdit.isAvailable : !!carToEdit.is_available
                });
            }
        }
    }, [id, cars]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        // Store File objects and create preview URLs
        const newImages = files.map(file => ({
            file: file,
            preview: URL.createObjectURL(file)
        }));

        setFormData(prev => ({
            ...prev,
            images: [...(prev.images || []), ...newImages]
        }));
    };

    const removeImage = (index) => {
        const imageToRemove = formData.images[index];
        if (imageToRemove.preview) {
            URL.revokeObjectURL(imageToRemove.preview);
        }
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('make', formData.make);
        form.append('model', formData.model);
        form.append('year', formData.year);
        form.append('price', formData.price);
        form.append('mileage', formData.mileage);
        form.append('fuelType', formData.fuelType);
        form.append('transmission', formData.transmission);
        form.append('bodyType', formData.bodyType);
        form.append('country', formData.country);
        form.append('city', formData.city);
        form.append('color', formData.color);
        form.append('power', formData.power);
        form.append('trim', formData.trim);
        form.append('description', formData.description);
        form.append('isAvailable', formData.isAvailable ? '1' : '0');

        formData.options.forEach(option => {
            form.append('options[]', option);
        });

        // Append Images as File objects
        formData.images.forEach((imgObj) => {
            if (imgObj.file) {
                form.append('images[]', imgObj.file);
            } else if (typeof imgObj === 'string') {
                form.append('existing_images[]', imgObj);
            }
        });

        if (editingCar) {
            await updateCar(editingCar.id, form);
        } else {
            await addCar(form);
        }
        navigate('/admin/cars');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <div className="custom-padding max-w-4xl mx-auto">
                    {/* Header Action */}
                    <div className="flex items-center gap-4 mb-8">
                        <button onClick={() => navigate('/admin/cars')} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                            <ChevronLeft size={24} className="text-black" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black text-primary-blue uppercase">
                                {editingCar ? 'Update' : 'Add New'} <span className="text-theme-blue">Vehicle</span>
                            </h1>
                            <p className="text-xs font-bold text-black uppercase tracking-widest">
                                Manage Vehicle Information
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-2xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            {/* Basic Info Grid */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                    <div className="flex items-center gap-2">
                                        <Settings size={16} className="text-theme-blue" />
                                        <h3 className="text-xs font-black text-primary-blue uppercase tracking-widest">Main Characteristics</h3>
                                    </div>
                                    {/* Availability Toggle */}
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${formData.isAvailable ? 'text-green-600' : ' text-black'}`}>
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
                                        <label className="text-[10px] font-black  text-black uppercase tracking-widest ml-1">Make</label>
                                        <input required name="make" value={formData.make} onChange={handleInputChange} className="w-full p-4 bg-gray-100 rounded-lg border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold " placeholder="e.g. BMW" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black  text-black uppercase tracking-widest ml-1">Model</label>
                                        <input required name="model" value={formData.model} onChange={handleInputChange} className="w-full p-4 bg-gray-100 rounded-lg border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold " placeholder="e.g. M4" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black  text-black uppercase tracking-widest ml-1">Year</label>
                                        <input required type="number" name="year" value={formData.year} placeholder='Year' onChange={handleInputChange} className="w-full p-4 bg-gray-100 rounded-lg border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold " />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black  text-black uppercase tracking-widest ml-1">Price (€)</label>
                                        <input required type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full p-4 bg-gray-100 rounded-lg border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold " placeholder="85000" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black  text-black uppercase tracking-widest ml-1">Mileage (KM)</label>
                                        <input required type="number" name="mileage" value={formData.mileage} onChange={handleInputChange} className="w-full p-4 bg-gray-100 rounded-lg border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold " placeholder="5200" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black  text-black uppercase tracking-widest ml-1">Body Type</label>
                                        <select name="bodyType" value={formData.bodyType} onChange={handleInputChange} className="w-full p-4 bg-gray-100 rounded-lg border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold ">
                                            {bodyTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black  text-black uppercase tracking-widest ml-1">Color</label>
                                        <input required name="color" value={formData.color} onChange={handleInputChange} className="w-full p-4 bg-gray-100 rounded-lg border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold " placeholder="e.g. Alpine White" />
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
                                    <label className="text-[10px] font-black  text-black uppercase tracking-widest ml-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-4 bg-gray-100 rounded-lg border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold  resize-none"
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
                                        <label className="text-[10px] font-black  text-black uppercase tracking-widest ml-1">Trim</label>
                                        <input name="trim" value={formData.trim} onChange={handleInputChange} className="w-full p-4 bg-gray-100 rounded-lg border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold " placeholder="e.g. Competition" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black  text-black uppercase tracking-widest ml-1">Power (e.g. 510 HP)</label>
                                        <input name="power" value={formData.power} onChange={handleInputChange} className="w-full p-4 bg-gray-100 rounded-lg border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold " placeholder="375 kW (510 HP)" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black  text-black uppercase tracking-widest ml-1">Fuel Type</label>
                                        <select name="fuelType" value={formData.fuelType} onChange={handleInputChange} className="w-full p-4 bg-gray-100 rounded-lg border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold ">
                                            <option value="Petrol">Petrol</option>
                                            <option value="Diesel">Diesel</option>
                                            <option value="Electric">Electric</option>
                                            <option value="Hybrid">Hybrid</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black  text-black uppercase tracking-widest ml-1">Transmission</label>
                                        <select name="transmission" value={formData.transmission} onChange={handleInputChange} className="w-full p-4 bg-gray-100 rounded-lg border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold ">
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
                                    <div className="md:col-span-2 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] font-black  text-black uppercase tracking-widest ml-1">Vehicle Images</label>
                                            <label className="cursor-pointer bg-theme-blue/10 hover:bg-theme-blue/20 text-theme-blue px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
                                                <Plus size={14} className="inline mr-1" />
                                                Add from PC
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleImageUpload}
                                                />
                                            </label>
                                        </div>

                                        {/* Image Preview Grid */}
                                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                            {(formData.images || []).map((img, idx) => (
                                                <div key={idx} className="relative aspect-video rounded-lg overflow-hidden group border border-gray-100">
                                                    <img src={img.preview || img.url || img} alt="Preview" className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(idx)}
                                                        className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                                                        title="Remove"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                    {idx === 0 && (
                                                        <div className="absolute bottom-0 left-0 right-0 bg-theme-blue text-white text-[8px] font-black uppercase py-1 text-center">
                                                            Main
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            {(!formData.images || formData.images.length === 0) && (
                                                <div className="col-span-full py-12 border-2 border-dashed border-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-300 gap-2">
                                                    <ImageIcon size={32} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">No images uploaded yet</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black  text-black uppercase tracking-widest ml-1">City</label>
                                            <input name="city" value={formData.city} onChange={handleInputChange} className="w-full p-4 bg-gray-100 rounded-lg border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold " placeholder="Lisbon" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black  text-black uppercase tracking-widest ml-1">Country</label>
                                            <input name="country" value={formData.country} onChange={handleInputChange} className="w-full p-4 bg-gray-100 rounded-lg border border-transparent focus:border-theme-blue/30 focus:bg-white outline-none transition-all font-bold " placeholder="Portugal" />
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
                                            className={`p-3 rounded-lg border text-[10px] font-black uppercase    text-center cursor-pointer transition-all ${formData.options.includes(option)
                                                ? 'bg-theme-blue border-theme-blue text-white shadow-lg shadow-theme-blue/20'
                                                : 'bg-white border-gray-100  text-black hover:border-theme-blue/30 hover:text-primary-blue'
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
                                    onClick={() => navigate('/admin/cars')}
                                    className="flex-1 py-5 rounded-lg border-2 border-gray-100  text-black font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-[2] py-5 bg-primary-blue hover:bg-theme-blue text-white rounded-lg font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                                >
                                    <Save size={18} />
                                    {editingCar ? 'Update Vehicle' : 'Save Vehicle'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AdminCarForm;
