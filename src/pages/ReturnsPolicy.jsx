import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header, Footer } from '../componenets';
import { RotateCcw, Truck, Search, Milestone } from 'lucide-react';

const ReturnsPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            title: "Returns Overview",
            icon: <RotateCcw className="text-blue-500" />,
            content: "Due to the nature of car acquisitions and international shipping, returns are handled on a case-by-case basis. We ensure every vehicle undergoes a rigorous inspection before purchase to minimize risks."
        },
        {
            title: "Inspection & Guarantee",
            icon: <Search className="text-blue-500" />,
            content: "We provide comprehensive inspection reports for all vehicles. If a vehicle arrives with significant undocumented defects compared to the pre-purchase report, we will facilitate a resolution process."
        },
        {
            title: "Shipping & Logistics",
            icon: <Truck className="text-blue-500" />,
            content: "In the event of a valid return scenario, CarZone Portugal will assist in coordinating the return logistics. Costs related to return shipping will be determined based on the specific circumstances of the claim."
        },
        {
            title: "Resolution Process",
            icon: <Milestone className="text-blue-500" />,
            content: "To initiate a query regarding your vehicle's condition, please contact our support team within 48 hours of delivery. We aim to resolve all disputes fairly and efficiently within 14 business days."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-inter">
            <Header />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-primary-blue uppercase    mb-4">
                            Returns <span className="text-blue-600">Policy</span>
                        </h1>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                            Effective from: January 30, 2026
                        </p>
                    </motion.div>

                    {/* Content Sections */}
                    <div className="space-y-12">
                        {sections.map((section, idx) => (
                            <motion.section
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 md:p-10 rounded-lg shadow-xl shadow-blue-500/5 border border-gray-100"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-blue-50 rounded-lg">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-2xl font-black text-primary-blue uppercase   ">
                                        {section.title}
                                    </h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    {section.content}
                                </p>
                            </motion.section>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-16 text-center text-gray-400 font-bold uppercase tracking-widest text-[10px]"
                    >
                        We are committed to transparency and quality in every car we deliver.
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ReturnsPolicy;
