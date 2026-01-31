import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header, Footer } from '../componenets';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            title: "Information We Collect",
            icon: <Eye className="text-blue-500" />,
            content: "We collect information you provide directly to us, such as when you create an account, inquire about a vehicle, or communicate with us. This may include your name, email address, phone number, and any other details relevant to your car purchase journey."
        },
        {
            title: "How We Use Your Data",
            icon: <Lock className="text-blue-500" />,
            content: "Your data is used to provide, maintain, and improve our services, including processing vehicle inquiries, facilitating delivery to Portugal, and sending technical notices, updates, and support messages."
        },
        {
            title: "Data Security",
            icon: <Shield className="text-blue-500" />,
            content: "We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure."
        },
        {
            title: "Legal Compliance",
            icon: <FileText className="text-blue-500" />,
            content: "We may disclose your information where required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency) in accordance with EU regulations."
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
                            Privacy <span className="text-blue-600">Policy</span>
                        </h1>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                            Last Updated: January 30, 2026
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
                        For any questions regarding this policy, please contact us at support@carzone.pt
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
