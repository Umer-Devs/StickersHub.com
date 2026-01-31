import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { CarCard } from './index';
import { useCars } from '../context/CarContext';

const FeaturedCars = () => {
    const { cars } = useCars();

    // Show top 6 cars for featured section
    const featuredCars = cars.slice(0, 6);

    return (
        <section className="py-24 bg-white">
            <div className="custom-padding">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="space-y-4">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-theme-blue font-black uppercase tracking-[0.3em] text-sm"
                        >
                            Exclusive Collection
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black text-primary-blue uppercase   "
                        >
                            Featured <span className="text-theme-blue">Vehicles</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link to="/explore" className="group flex items-center gap-3 text-primary-blue font-black uppercase tracking-widest text-sm hover:text-theme-blue transition-colors">
                            View All Inventory
                            <div className="w-10 h-10 rounded-full border-2 border-primary-blue/10 flex items-center justify-center group-hover:border-theme-blue group-hover:bg-theme-blue group-hover:text-white transition-all">
                                <ChevronRight size={20} />
                            </div>
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {featuredCars.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>

                <div className="mt-16 flex justify-center md:hidden">
                    <Link to="/explore" className="w-full">
                        <button className="w-full py-5 bg-primary-blue text-white rounded-lg font-black uppercase tracking-widest hover:bg-theme-blue transition-all shadow-xl shadow-blue-500/10 active:scale-[0.98]">
                            View All Cars
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCars;
