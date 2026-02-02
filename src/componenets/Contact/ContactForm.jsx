import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, MessageSquare, Tag } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';


const ContactForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
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
        console.log('Contact form submitted:', formData);
        toast.success('Thank you for your message! Our team will contact you shortly.', {
            duration: 5000,
            position: 'top-right',
        });
        setFormData({
            fullName: '',
            email: '',
            subject: '',
            message: '',
            agreement: false
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-2xl p-8 md:p-12 border border-blue-50/50"
        >
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
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

                    {/* Subject */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-theme-blue transition-colors">
                                <Tag size={20} />
                            </div>
                            <select
                                name="subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all shadow-sm"
                            >
                                <option value="">Select Subject</option>
                                <option value="general">General Inquiry</option>
                                <option value="partnership">Partnership</option>
                                <option value="support">Customer Support</option>
                                <option value="feedback">Feedback</option>
                            </select>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Message</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-6 text-gray-400 group-focus-within:text-theme-blue transition-colors">
                                <MessageSquare size={20} />
                            </div>
                            <textarea
                                name="message"
                                rows="6"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="How can we help you today?"
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-lg text-primary-blue font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-theme-blue/20 transition-all shadow-sm resize-none"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Agreement */}
                <div className="flex items-center gap-3 ml-1">
                    <input
                        type="checkbox"
                        id="agreement-contact"
                        name="agreement"
                        required
                        checked={formData.agreement}
                        onChange={handleChange}
                        className="w-5 h-5 rounded-lg border-2 border-gray-200 text-theme-blue focus:ring-theme-blue/20 transition-all cursor-pointer"
                    />
                    <label htmlFor="agreement-contact" className="text-sm font-medium text-gray-500 cursor-pointer">
                        I agree to the <Link to={'/privacy'}><span className="text-primary-blue font-bold underline">Privacy Policy</span></Link>
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-5 bg-theme-blue hover:bg-primary-blue text-white rounded-lg font-black text-lg tracking-widest shadow-xl shadow-theme-blue/20 transition-all active:scale-[0.98] uppercase flex items-center justify-center gap-3 group"
                >
                    Send Message
                    <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </form>
        </motion.div>
    );
};

export default ContactForm;
