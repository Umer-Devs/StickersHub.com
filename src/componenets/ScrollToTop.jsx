// src/components/ScrollToTop.jsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const lenis = useLenis();           // Lenis instance le lo
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Har route change pe top pe jao (smoothly)
        if (lenis) {
            lenis.scrollTo(0, { immediate: false, duration: 1 }); // smooth
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [pathname, lenis]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {       
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        if (lenis) {
            lenis.scrollTo(0, { duration: 1.5, easing: (t) => t }); // custom easing bhi daal sakte ho
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (!show) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6  h-12 w-12  right-6 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
            aria-label="Scroll to top"
        >
            ↑
            {/* ya arrow icon daal sakte ho (heroicons / lucide-react etc) */}
        </button>
    );
};

export default ScrollToTop;