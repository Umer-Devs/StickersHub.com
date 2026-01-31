import React from 'react';
import { motion } from 'framer-motion';
import { Header, Footer, ContactForm } from '../componenets';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />

            {/* Hero Section */}
            <section className="bg-primary-blue pt-40 pb-20 relative overflow-hidden">
                <div className="custom-padding relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-6 py-2 bg-theme-blue/10 border border-theme-blue/20 rounded-full text-theme-blue font-black text-xs uppercase tracking-[0.3em] mb-6"
                    >
                        Contact Us
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1]"
                    >
                        Get in <span className="text-theme-blue">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 text-lg md:text-xl font-medium max-w-2xl mx-auto"
                    >
                        Have questions? Our dedicated team is here to help you every step of the way in your car buying journey.
                    </motion.p>
                </div>
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </section>

            <main className="flex-grow custom-padding -mt-16 mb-24 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

                    {/* Contact Info Cards */}
                    <div className="lg:col-span-2 space-y-6">
                        {[
                            {
                                icon: Phone,
                                title: "Call Us",
                                value: "+351 210 000 000",
                                sub: "Mon-Fri from 9am to 6pm",
                                color: "bg-blue-500"
                            },
                            {
                                icon: Mail,
                                title: "Email Support",
                                value: "support@carzone.pt",
                                sub: "Our team will respond within 24h",
                                color: "bg-theme-blue"
                            },
                            {
                                icon: MapPin,
                                title: "Visit Office",
                                value: "Lisbon Tech District, Portugal",
                                sub: "By appointment only",
                                color: "bg-primary-blue"
                            },
                            {
                                icon: Clock,
                                title: "Working Hours",
                                value: "9:00 AM - 6:00 PM",
                                sub: "Saturday: 10:00 AM - 2:00 PM",
                                color: "bg-slate-700"
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 flex items-center gap-6 group hover:border-theme-blue/30 transition-all"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white shrink-0 shadow-lg shadow-black/10 group-hover:scale-110 transition-transform`}>
                                    <item.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.title}</h4>
                                    <p className="text-xl font-black text-primary-blue mb-1">{item.value}</p>
                                    <p className="text-sm font-medium text-gray-400">{item.sub}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <ContactForm />
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
