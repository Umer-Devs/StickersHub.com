import React from 'react';
import { motion } from 'framer-motion';

const brands = [
    { name: "Renault", logo: "https://logo.clearbit.com/renault.com" },
    { name: "Peugeot", logo: "https://logo.clearbit.com/peugeot.com" },
    { name: "Dacia", logo: "https://logo.clearbit.com/dacia.com" },
    { name: "Citroen", logo: "https://logo.clearbit.com/citroen.com" },
    { name: "Mercedes", logo: "https://logo.clearbit.com/mercedes-benz.com" },
    { name: "Audi", logo: "https://logo.clearbit.com/audi.com" },
    { name: "BMW", logo: "https://logo.clearbit.com/bmw.com" },
    { name: "Ford", logo: "https://logo.clearbit.com/ford.com" },
    { name: "Chevrolet", logo: "https://logo.clearbit.com/chevrolet.com" },
    { name: "Toyota", logo: "https://logo.clearbit.com/toyota.com" },
    { name: "Honda", logo: "https://logo.clearbit.com/honda.com" },
    { name: "Volkswagen", logo: "https://logo.clearbit.com/vw.com" },
];

const Category = () => {
    return (
        <section className="bg-gray-100">
            <div className="custom-padding  py-12 ">
                <div className="text-center ">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-primary-blue mb-6"
                    >
                        Explore Popular Brands
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-gray-500 font-medium text-lg my-6"
                    >
                        Find the perfect car from your favorite manufacturer
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {brands.map((brand, index) => (
                        <motion.div
                            key={brand.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{
                               
                            }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl bg-gray-50/50 cursor-pointer group transition-all"
                        >
                            <div className="w-16 h-16 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                <img
                                    src={brand.logo}
                                    alt={`${brand.name} logo`}
                                    className="max-w-full max-h-full object-contain transition-all duration-300"
                                />
                            </div>
                            <span className="font-bold text-gray-700 group-hover:text-primary-blue transition-colors">
                                {brand.name}
                            </span>
                        </motion.div>
                    ))}
                </div>

               
            </div>
        </section>
    );
};

export default Category;