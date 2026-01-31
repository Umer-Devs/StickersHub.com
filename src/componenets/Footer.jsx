import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Home", path: "/" },
        { name: "Explore Cars", path: "/explore" },
        { name: "Inquiry", path: "/inquiry" },
        { name: "Contact", path: "/contact" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Cookie Policy", path: "/cookies" },
        { name: "Returns", path: "/returns" },
      ]
    }
  ];

  return (
    <footer className="bg-[#1a2b3b] text-white pt-24 pb-12 overflow-hidden">
      <div className="custom-padding mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="inline-block">
              <div className="text-3xl font-black italic text-white flex items-center">
                CarZone Portugal
                <span className="text-blue-500 animate-pulse ml-2">.</span>
              </div>
            </Link>
            <p className="text-gray-400 font-medium leading-relaxed max-w-sm">
              Your trusted partner for buying cars across Europe. We handle inspection, purchase, and delivery right to your door in Portugal.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ y: -5, color: "#3b82f6" }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-gray-400 transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="space-y-8">
              <h4 className="text-lg font-black uppercase tracking-widest text-white/50">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white font-bold transition-colors flex items-center group"
                    >
                      <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter / Contact */}
          <div className="space-y-8">
            <h4 className="text-lg font-black uppercase tracking-widest text-white/50">Contact Us</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-blue-500 shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-500 uppercase   er mb-1">Email</p>
                  <p className="text-gray-300 font-bold">support@carzone.pt</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-blue-500 shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-500 uppercase   er mb-1">Phone</p>
                  <p className="text-gray-300 font-bold">+351 210 000 000</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-blue-500 shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-gray-500 uppercase   er mb-1">Office</p>
                  <p className="text-gray-300 font-bold">Lisbon Tech District, Portugal</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-center items-center gap-8">
          <p className="text-gray-500 font-bold text-sm">
            © {currentYear} CarZone Portugal. All rights reserved.
          </p>

        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] -z-10 rounded-full" />
    </footer>
  );
};

export default Footer;
