import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header, Footer } from '../componenets';
import { Scale, CheckCircle2, AlertTriangle, FileCheck } from 'lucide-react';

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            title: "Acceptance of Terms",
            icon: <Scale className="text-blue-500" />,
            content: "By accessing CarZone Portugal, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our platform."
        },
        {
            title: "Vehicle Acquisition",
            icon: <CheckCircle2 className="text-blue-500" />,
            content: "Our services include sourcing vehicles from across Europe, inspection, and facilitating delivery to Portugal. All specific purchase terms will be outlined in individual sales agreements."
        },
        {
            title: "User Responsibilities",
            icon: <AlertTriangle className="text-blue-500" />,
            content: "Users are responsible for providing accurate information during the inquiry and purchase process. Any fraudulent activity or misuse of the platform may result in immediate termination of services."
        },
        {
            title: "Limitation of Liability",
            icon: <FileCheck className="text-blue-500" />,
            content: "While we strive for excellence, CarZone Portugal is not liable for indirect, incidental, or consequential damages resulting from the use or inability to use our services."
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
                            Terms of <span className="text-blue-600">Service</span>
                        </h1>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                            Effective Date: January 30, 2026
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
                        Please read these terms carefully before engaging with our services.
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TermsOfService;
