import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header, Footer } from '../componenets';
import { Cookie, MousePointer2, BarChart3, Settings } from 'lucide-react';

const CookiePolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            title: "What are Cookies?",
            icon: <Cookie className="text-blue-500" />,
            content: "Cookies are small text files stored on your device to help us recognize you and provide a personalized experience. They help us remember your preferences and understand how you interact with our site."
        },
        {
            title: "Essential Cookies",
            icon: <MousePointer2 className="text-blue-500" />,
            content: "These are necessary for the website to function. They include cookies that enable you to log in to secure areas, use a shopping cart, or make use of e-billing services."
        },
        {
            title: "Performance Cookies",
            icon: <BarChart3 className="text-blue-500" />,
            content: "We use these to analyze how visitors use our website and monitor website performance. This allows us to provide a high-quality experience by customizing our offering."
        },
        {
            title: "Managing Cookies",
            icon: <Settings className="text-blue-500" />,
            content: "Most web browsers allow some control of most cookies through the browser settings. You can choose to block or delete cookies, but this may affect your user experience on our site."
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
                            Cookie <span className="text-blue-600">Policy</span>
                        </h1>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                            Last Revised: January 30, 2026
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
                        By using our site, you consent to our use of cookies according to this policy.
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CookiePolicy;
