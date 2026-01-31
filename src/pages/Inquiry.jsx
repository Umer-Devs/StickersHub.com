import React from 'react';
import { motion } from 'framer-motion';
import { Header, Footer, InquiryForm } from '../componenets';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Inquiry = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            {/* Hero Section */}
            <section className="bg-primary-blue pt-40 pb-20 relative overflow-hidden">
                <div className="custom-padding relative z-10">
                    <div className="max-w-4xl">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1]"
                        >
                            Vehicle <span className="text-theme-blue">Inquiry</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white/60 text-lg md:text-xl font-medium max-w-2xl"
                        >
                            Looking for a specific car? Let us know your requirements and our experts will find the best deals for you across Europe.
                        </motion.p>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-theme-blue/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
            </section>

            <main className="flex-grow custom-padding -mt-12 mb-24 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Inquiry Form */}
                    <div className="lg:col-span-2">
                        <InquiryForm />
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100"
                        >
                            <h3 className="text-2xl font-black text-primary-blue mb-6 uppercase tracking-tight">How it works?</h3>
                            <div className="space-y-6">
                                {[
                                    { step: '01', title: 'Submit Inquiry', desc: 'Tell us about your dream car and your budget.' },
                                    { step: '02', title: 'Expert Search', desc: 'We search through 1.2M+ offers in Europe.' },
                                    { step: '03', title: 'Quality Check', desc: 'Our team inspects the car for quality and history.' },
                                    { step: '04', title: 'Direct Delivery', desc: 'We handle everything and deliver to your door.' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <span className="text-theme-blue font-black text-xl leading-none">{item.step}</span>
                                        <div>
                                            <h4 className="font-bold text-primary-blue text-sm uppercase tracking-wider mb-1">{item.title}</h4>
                                            <p className="text-gray-400 text-sm font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-primary-blue rounded-[2.5rem] p-10 shadow-2xl text-white relative overflow-hidden group"
                        >
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">Need Immediate Help?</h3>
                                <div className="space-y-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-theme-blue transition-colors">
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Call Us</p>
                                            <p className="font-bold">+351 210 000 000</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-theme-blue transition-colors">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Email Us</p>
                                            <p className="font-bold">support@carzone.pt</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-theme-blue blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Inquiry;
