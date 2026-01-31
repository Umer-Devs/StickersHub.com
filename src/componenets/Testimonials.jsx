import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Tomáš R.",
        country: "🇨🇿",
        rating: 5,
        source: "Google",
        text: "Buying a car online through CarZone was the best decision. Everything went very smoothly, professionally and without any problems. Professional and friendly approach from everyone during the process from checking the car, through the purchase and import. Definitely 5 stars for me.",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop" // Mercedes Image
    },
    {
        id: 2,
        name: "Klára R.",
        country: "🇨🇿",
        rating: 5,
        source: "Google",
        text: "Buying a car through CarZone was probably the best service we have ever experienced. From the moment we registered, someone was always looking after us. They advised us on the choice, helped with the purchase, financing, insurance and then constantly informed us both by phone and via SMS.",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop" // Delivery/Car Image
    },
    {
        id: 3,
        name: "Karel V.",
        country: "🇨🇿",
        rating: 5,
        source: "Google",
        text: "Complete satisfaction. A clear website with a wide range of filters, offering far more than enough vehicles from all over Europe. The follow-up service after ordering a vehicle is also top-notch. The customer is informed about every change, every shift, and is offered in a non-intrusive manner.",
        image: "https://images.unsplash.com/photo-1555214107-f2e7c48c56fe?q=80&w=2070&auto=format&fit=crop" // BMW Image
    },
    {
        id: 4,
        name: "Aleš S.",
        country: "🇨🇿",
        rating: 5,
        source: "Google",
        text: "I am very satisfied with the purchase, very helpful approach, information provided throughout the purchase, so I knew exactly how the purchase was going, all information was provided clearly and in detail, with any question I asked, everything was explained to me, the handover of the car was absolutely fine.",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop" // SUV Image
    },
    {
        id: 5,
        name: "Aleš S.",
        country: "🇨🇿",
        rating: 5,
        source: "Google",
        text: "I am very satisfied with the purchase, very helpful approach, information provided throughout the purchase, so I knew exactly how the purchase was going, all information was provided clearly and in detail, with any question I asked, everything was explained to me, the handover of the car was absolutely fine.",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop" // SUV Image
    }
];

const Testimonials = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 bg-[#f8fafc]">
            <div className="custom-padding mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black text-[#1a2b3b]">
                            What do our customers think?
                        </h2>
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-black text-[#1a2b3b]">4.8</span>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} className={i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"} />
                                ))}
                                {/* <div className="relative overflow-hidden w-2.5">
                                    <Star size={20} className="fill-yellow-400 text-yellow-400 absolute left-0" />
                                </div> */}
                            </div>
                            {/* <span className="text-gray-400 font-bold text-sm">18 reviews</span> */}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => scroll('left')}
                            className="p-3 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-[#1a2b3b] hover:border-gray-300 transition-all shadow-sm"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-3 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-[#1a2b3b] hover:border-gray-300 transition-all shadow-sm"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Testimonials Horizontal Scroll */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-6 pb-8 snap-x no-scrollbar"
                >
                    {testimonials.map((t) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="min-w-[300px] md:min-w-[380px] bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 flex flex-col snap-start"
                        >
                            {/* Image Header */}
                            <div className="h-52 w-full overflow-hidden">
                                <img
                                    src={t.image}
                                    alt="Testimonial Car"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Card Content */}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white px-3 py-1 rounded-sm">
                                        Verified Review
                                    </span>
                                    <div className="text-right">
                                        <span className="block text-[10px] text-gray-400 font-bold uppercase   er leading-none">Source</span>
                                        <span className="text-sm font-black text-gray-700">{t.source}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-3">
                                    <h4 className="font-black text-[#1a2b3b] text-lg">{t.name} {t.country}</h4>
                                </div>

                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-gray-600 text-sm font-medium leading-relaxed italic line-clamp-6">
                                    "{t.text}"
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Hide Scrollbar Style */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
        </section>
    );
};

export default Testimonials;
