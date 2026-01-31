import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, Phone, MessageSquare, Car, Euro } from 'lucide-react';
import { toast } from 'react-hot-toast';


const InquiryForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        carInterest: '',
        budget: '',
        message: '',
        agreement: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Inquiry submitted:', formData);
        toast.success('Thank you for your inquiry! We will get back to you soon.', {
            duration: 5000,
            position: 'top-right',
        });
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            carInterest: '',
            budget: '',
            message: '',
            agreement: false
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-2xl p-8 md:p-12 border border-gray-100"
        >
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Full Name */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-theme-blue transition-colors">
                                <User size={20} />
                            </div>
                            <input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-theme-blue transition-colors">
                                <Mail size={20} />
                            </div>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-theme-blue transition-colors">
                                <Phone size={20} />
                            </div>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+351 912 345 678"
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Car Interest */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Vehicle of Interest</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-theme-blue transition-colors">
                                <Car size={20} />
                            </div>
                            <input
                                type="text"
                                name="carInterest"
                                value={formData.carInterest}
                                onChange={handleChange}
                                placeholder="e.g. BMW M4 2023"
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Budget */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Preferred Budget Range</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-theme-blue transition-colors">
                                <Euro size={20} />
                            </div>
                            <select
                                name="budget"
                                required
                                value={formData.budget}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all shadow-sm"
                            >
                                <option value="">Select Budget</option>
                                <option value="10k-20k">10,000 € - 20,000 €</option>
                                <option value="20k-50k">20,000 € - 50,000 €</option>
                                <option value="50k-100k">50,000 € - 100,000 €</option>
                                <option value="100k+">100,000 € +</option>
                            </select>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Specific Requirements / Message</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-6 text-gray-400 group-focus-within:text-theme-blue transition-colors">
                                <MessageSquare size={20} />
                            </div>
                            <textarea
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us more about what you're looking for..."
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all shadow-sm resize-none"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Agreement */}
                <div className="flex items-center gap-3 ml-1">
                    <input
                        type="checkbox"
                        id="agreement"
                        name="agreement"
                        required
                        checked={formData.agreement}
                        onChange={handleChange}
                        className="w-5 h-5 rounded-lg border-2 border-gray-200 text-theme-blue focus:ring-theme-blue/20 transition-all cursor-pointer"
                    />
                    <label htmlFor="agreement" className="text-sm font-medium text-gray-500 cursor-pointer">
                        I agree to the <span className="text-primary-blue font-bold underline">Privacy Policy</span> and Terms.
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-5 bg-primary-blue hover:bg-theme-blue text-white rounded-lg font-black text-lg tracking-widest shadow-xl shadow-primary-blue/20 transition-all active:scale-[0.98] uppercase flex items-center justify-center gap-3 group"
                >
                    Submit Inquiry
                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </form>
        </motion.div>
    );
};

export default InquiryForm;
