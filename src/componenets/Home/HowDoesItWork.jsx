import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    {
        number: "01.",
        title: "Choose anywhere in Europe",
        description: "No more compromises! With us, you have an unrivaled selection of cars in one place.",
        image: "https://img.freepik.com/free-vector/travel-concept-illustration_114360-1247.jpg?t=st=1710427000&exp=1710430600&hmac=placeholder1" // Illustrative placeholder
    },
    {
        number: "02.",
        title: "We'll inspect the car closely",
        description: "A certified mechanic will thoroughly inspect your car. You will decide according to the result after.",
        image: "https://img.freepik.com/free-vector/auto-service-concept-illustration_114360-2815.jpg?t=st=1710427000&exp=1710430600&hmac=placeholder2" // Illustrative placeholder
    },
    {
        number: "03.",
        title: "We'll deliver it to your home",
        description: "We arrange all the paperwork, registration and delivery. All you need to do is enjoy your new car.",
        image: "https://img.freepik.com/free-vector/delivery-service-concept-illustration_114360-143.jpg?t=st=1710427000&exp=1710430600&hmac=placeholder3" // Illustrative placeholder
    }
];

const HowDoesItWork = () => {
    return (
        <section className=" mt-[2%] bg-white">
            <div className="custom-padding py-16  ">
                {/* Section Title */}
                <div className="text-center mb-20 ">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-[#1a2b3b]"
                    >
                        How does it work?
                    </motion.h2>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-start"
                        >
                            {/* Illustration Placeholder */}
                            <div className="w-full aspect-video mb-8 overflow-hidden rounded-2xl flex items-center justify-center bg-gray-50">
                                {/* Using lucide icons as placeholders for now since direct illustration links can be finicky */}
                                <div className="relative w-full h-full flex items-center justify-center text-primary-blue/20">
                                    <img
                                        src={`https://api.dicebear.com/7.x/shapes/svg?seed=${step.title}&backgroundColor=f8fafc`}
                                        alt="Illustration"
                                        className="w-40 h-40 opacity-80"
                                    />
                                </div>
                            </div>

                            <span className="text-primary-blue font-black text-xl mb-4">
                                {step.number}
                            </span>

                            <h3 className="text-2xl font-black text-[#1a2b3b] mb-4 leading-tight">
                                {step.title}
                            </h3>

                            <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <button className="px-12 py-5 bg-[#2d3e9d] text-white font-black rounded-xl hover:bg-[#1a2b3b] transition-all transform hover:scale-105 shadow-xl shadow-blue-900/20 text-lg uppercase tracking-wider">
                        Want to know more?
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default HowDoesItWork;