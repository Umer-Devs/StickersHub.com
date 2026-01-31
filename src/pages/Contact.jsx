import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header, Footer, ContactForm } from '../componenets';
import { Mail, Phone, MapPin, Clock, MessageSquare, Globe, ArrowRight } from 'lucide-react';
import { ContactPage } from '../assets';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-outfit">
            <Header />

            {/* Premium Hero Section with Background Image */}
            <section
                className="relative min-h-[400px] md:min-h-[500px] pt-48 pb-32 flex items-center overflow-hidden bg-primary-blue bg-cover bg-top bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(10, 31, 58, 0.95), rgba(10, 31, 58, 0.4), transparent), url(${ContactPage})`
                }}
            >
                <div className="custom-padding relative z-10 w-full lg:text-left">


                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl lg:text-9xl font-black text-white mb-8 leading-[0.85]    er"
                    >
                        We're Here <br />
                        <span className="text-theme-blue italic">To Help.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/60 text-lg md:text-xl font-medium max-w-2xl leading-relaxed"
                    >
                        Whether you're looking to buy your first imported car or have questions about our delivery process, our team is ready to assist you.
                    </motion.p>
                </div>
            </section>

            <main className="flex-grow custom-padding -mt-16 mb-32 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Side: Contact Info & Details */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                            {[
                                {
                                    icon: Phone,
                                    title: "Direct Call",
                                    value: "+351 210 000 000",
                                    sub: "Mon-Fri, 9am - 6pm",
                                    color: "text-blue-500"
                                },
                                {
                                    icon: Mail,
                                    title: "Email Support",
                                    value: "support@carzone.pt",
                                    sub: "Responses within 24 hours",
                                    color: "text-theme-blue"
                                },
                                {
                                    icon: MapPin,
                                    title: "Main Office",
                                    value: "Lisbon Tech District",
                                    sub: "Portugal HQ",
                                    color: "text-primary-blue"
                                }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-8 rounded-lg shadow-xl shadow-blue-500/5 border border-gray-100 flex items-start gap-6 group hover:border-theme-blue/30 transition-all"
                                >
                                    <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center ${item.color} shrink-0 group-hover:bg-primary-blue group-hover:text-white transition-all duration-300`}>
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.title}</h4>
                                        <p className="text-lg font-black text-primary-blue mb-1 leading-tight">{item.value}</p>
                                        <p className="text-sm font-medium text-gray-400">{item.sub}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Location / Extra Info Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-primary-blue rounded-lg p-10 text-white shadow-2xl relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                                    Global Presence
                                    <div className="w-8 h-[2px] bg-theme-blue" />
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <Globe className="text-theme-blue shrink-0" size={20} />
                                        <p className="text-sm font-medium text-white/70 leading-relaxed">
                                            Operating across 12 European countries with logistics centers in Germany, France, and Belgium.
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <Clock className="text-theme-blue shrink-0" size={20} />
                                        <p className="text-sm font-medium text-white/70 leading-relaxed">
                                            Real-time tracking available for all vehicle shipments.
                                        </p>
                                    </div>
                                </div>
                                <button className="mt-10 flex items-center gap-3 font-black text-xs uppercase tracking-widest text-theme-blue hover:text-white transition-colors group">
                                    Learn About Logistics
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                            <Globe className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5" />
                        </motion.div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:col-span-7">
                        <ContactForm />
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;

