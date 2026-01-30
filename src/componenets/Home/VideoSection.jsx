import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VideoSection = () => {
    return (
        <section className="bg-white py-20 overflow-hidden">
            <div className="custom-padding mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative max-w-6xl mx-auto group cursor-pointer"
                >
                    {/* Video Thumbnail / Illustration Background */}
                    <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(33,60,81,0.3)] bg-[#213c51]">
                        <video
                            src="https://carvago.com/_next/static/media/howItWorksPreviewBig.c8514def.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full  object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/80 via-transparent to-transparent" />

                        {/* Centered Play Button */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="relative mb-4"
                            >
                                {/* Ripples */}
                                <div className="absolute inset-0 animate-ping rounded-full bg-red-500/30" />
                                <div className="absolute inset-0 animate-ping rounded-full bg-red-500/20 delay-300" />

                                <div className="w-20 h-20 md:w-24 md:h-24 bg-red-500 rounded-full flex items-center justify-center shadow-2xl relative z-10 transition-colors group-hover:bg-white">
                                    <Play fill="red" size={32} className="text-white ml-2" />
                                </div>
                            </motion.div>
                            <span className="text-white font-black text-xl md:text-2xl tracking-tight drop-shadow-md">
                                Play video
                            </span>
                        </div>

                        
                    </div>

                   
                </motion.div>
            </div>
        </section>
    );
};

export default VideoSection;