import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header, Footer, InquiryForm } from '../componenets';
import { Mail, Phone, Shield, Search, CheckCircle, Truck, ArrowRight } from 'lucide-react';
import { InquiryPage } from '../assets';

const Inquiry = () => {
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
                    backgroundImage: `linear-gradient(to right, rgba(10, 31, 58, 0.95), rgba(10, 31, 58, 0.4), transparent), url(${InquiryPage})`
                }}
            >
                <div className="custom-padding relative z-10 w-full">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-theme-blue/20 border border-theme-blue/30 rounded-full text-theme-blue font-black text-[10px] uppercase tracking-[0.3em] mb-8"
                        >
                            <Search size={14} />
                            Car Finder Service
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9]    er"
                        >
                            Find Your <br />
                            <span className="text-theme-blue italic">Perfect Match.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white/60 text-lg md:text-xl font-medium max-w-2xl leading-relaxed"
                        >
                            Can't find what you're looking for in our inventory? Our sourcing experts have access to over 1.5 million vehicles across Europe. Tell us your dream specs.
                        </motion.p>
                    </div>
                </div>
            </section>

            <main className="flex-grow custom-padding relative z-20 -mt-20 mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Inquiry Form Card */}
                    <div className="lg:col-span-8">
                        <InquiryForm />
                    </div>

                    {/* Sidebar with Integrated Steps */}
                    <div className="lg:col-span-4 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-primary-blue rounded-lg p-10 text-white shadow-2xl relative overflow-hidden group"
                        >
                            <h3 className="text-2xl font-black mb-8 uppercase    flex items-center gap-3">
                                Our Process
                                <div className="w-12 h-[2px] bg-theme-blue" />
                            </h3>

                            <div className="space-y-10">
                                {[
                                    { icon: Search, title: 'Expert Sourcing', desc: 'We scan private & dealer networks.' },
                                    { icon: Shield, title: 'History Check', desc: 'Full mechanical & legal verification.' },
                                    { icon: CheckCircle, title: 'Quality Report', desc: 'Detailed photos & health checklist.' },
                                    { icon: Truck, title: 'Safe Delivery', desc: 'Direct delivery to your doorstep.' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-5 group/item">
                                        <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 group-hover/item:bg-theme-blue transition-all duration-500 shrink-0">
                                            <item.icon size={22} className="text-theme-blue group-hover/item:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-white text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                                            <p className="text-white/40 text-xs font-semibold leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Decorative Background Icon */}
                            <Search className="absolute -bottom-10 -right-10 w-40 h-40 text-white/5 rotate-12" />
                        </motion.div>

                        {/* Contact Quick Link */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white border border-gray-100 rounded-lg p-10 shadow-xl shadow-blue-500/5 group hover:border-theme-blue/30 transition-all cursor-pointer"
                        >
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Direct Support</h4>
                            <p className="text-xl font-black text-primary-blue mb-6">Need a quote right now?</p>

                            <div className="space-y-4">
                                <a href="tel:+351210000000" className="flex items-center gap-3 text-primary-blue/70 hover:text-theme-blue transition-colors font-bold text-sm">
                                    <Phone size={18} className="text-theme-blue" />
                                    +351 210 000 000
                                </a>
                                <a href="mailto:support@carzone.pt" className="flex items-center gap-3 text-primary-blue/70 hover:text-theme-blue transition-colors font-bold text-sm">
                                    <Mail size={18} className="text-theme-blue" />
                                    support@carzone.pt
                                </a>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between text-theme-blue group-hover:gap-4 transition-all">
                                <span className="font-black text-xs uppercase tracking-widest">Visit Showroom</span>
                                <ArrowRight size={16} />
                            </div>
                        </motion.div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Inquiry;

