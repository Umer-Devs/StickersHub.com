import React from 'react';
import { motion } from 'framer-motion';
import { Coins, ShieldCheck, BadgeCheck } from 'lucide-react';

const features = [
    {
        icon: Coins,
        title: "Money back guarantee",
        description: "If you don't fall in love with the vehicle, simply return it to us.",
    },
    {
        icon: ShieldCheck,
        title: "Safe purchase",
        description: "We guarantee the technical condition of every vehicle sold.",
    },
    {
        icon: BadgeCheck,
        title: "6-month warranty",
        description: "In addition, with every car you receive an extended warranty.",
    },
];

const CtaOne = () => {
    return (
        
        <section className=" custom-padding mx-auto bg-gray-200 py-12 border-y border-gray-200">
            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-300">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-4 px-6 py-6 md:py-0"
                        >
                            <div className="mt-1">
                                <div className="w-12 h-12 rounded-xl bg-primary-blue/5 flex items-center justify-center text-primary-blue shadow-sm">
                                    <feature.icon size={28} strokeWidth={1.5} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h3 className="text-[#1a2b3b] font-black text-xl tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500 font-medium text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CtaOne;