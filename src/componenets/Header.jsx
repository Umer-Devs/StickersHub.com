import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, Heart, ShoppingCart, User, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Cars', path: '/explore' },
    { name: 'Inquiry', path: '/inquiry' },
    { name: 'Contact', path: '/contact' },
  ];

  const languages = [
    { name: 'English (UK)', code: 'EN', flag: '🇬🇧' },
    { name: 'Arabic (UAE)', code: 'AR', flag: '🇦🇪' },
    { name: 'French (FR)', code: 'FR', flag: '🇫🇷' },
  ];

  const [selectedLang, setSelectedLang] = useState(languages[0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <nav
      className={` w-full z-[100] transition-all duration-500 ${isScrolled
        ? 'bg-white/40 backdrop-blur-xl border-b border-gray-100 py-3 shadow-lg shadow-black/[0.03]'
        : 'bg-white py-6'
        }`}
    >
      <div className="custom-padding flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-12">
          <Link to="/" className="group relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-black italic  text-primary-blue flex items-center"
            >
              CarZone Portugal
              <span className="text-primary-blue animate-pulse ml-2">.</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative group py-2"
              >
                <span className={`text-[15px] font-semibold transition-colors duration-300 ${location.pathname === link.path ? 'text-primary-blue' : 'text-primary-blue/80 hover:text-primary-blue'
                  }`}>
                  {link.name}
                </span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-blue transform transition-transform duration-300 origin-left ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-5">
          <div className="flex items-center gap-1 border-r border-gray-200 pr-5 mr-2">
            {[
              { icon: Search, label: 'Search' },

            ].map((item, idx) => (
              <button
                key={idx}
                className="p-2.5 text-primary-blue/70 hover:text-primary-blue hover:bg-gray-100 rounded-full transition-all duration-300 group"
                title={item.label}
              >
                <item.icon size={20} strokeWidth={2.2} />
              </button>
            ))}
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdown(!langDropdown)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-200 transition-all duration-300 border border-transparent hover:border-gray-100"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center text-lg shadow-sm bg-white border border-gray-100">
                {selectedLang.flag}
              </div>
              <span className="text-sm font-bold text-primary-blue">{selectedLang.code}</span>
              <ChevronDown
                size={14}
                className={`text-primary-blue/50 transition-transform duration-300 ${langDropdown ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {langDropdown && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-10"
                    onClick={() => setLangDropdown(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-20 p-2"
                  >
                    <div className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Select Language</div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLang(lang);
                          setLangDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${selectedLang.code === lang.code ? 'bg-primary-blue/5 text-primary-blue' : 'hover:bg-gray-50 text-primary-blue'
                          }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-xl leading-none">{lang.flag}</span>
                          <span className="text-sm font-semibold">{lang.name}</span>
                        </span>
                        {selectedLang.code === lang.code && (
                          <motion.div layoutId="active-lang" className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>


        </div>

        {/* Mobile Navbar Elements */}
        <div className="flex lg:hidden items-center gap-4">
          <button className="p-2 text-primary-blue">
            <Search size={24} />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`z-[110] p-2 rounded-xl transition-colors ${isOpen ? 'text-white' : 'text-primary-blue'}`}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Premium Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-primary-blue z-[105] flex flex-col lg:hidden"
          >
            <div className="flex-1 flex flex-col pt-8 px-8 sm:px-16 gap-10">
              <div className="flex flex-col gap-6">
                <motion.p variants={itemVariants} className="text-white/50 text-xs font-bold uppercase tracking-[0.2em]">Menu</motion.p>
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={itemVariants}>
                    <Link
                      to={link.path}
                      className="text-xl font-black text-white hover:text-gray-300 transition-colors flex items-center justify-between group"
                    >
                      {link.name}
                      <motion.span
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        className="w-4 h-4 rounded-full bg-white"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>





            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
