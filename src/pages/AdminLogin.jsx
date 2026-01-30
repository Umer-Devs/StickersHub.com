import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Header, Footer } from '../componenets';
import { motion } from 'framer-motion';
import {
    Lock,
    Mail,
    ChevronRight,
    AlertCircle,
    ShieldCheck,
    Eye,
    EyeOff
} from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Artificial delay for premium feel
        await new Promise(resolve => setTimeout(resolve, 800));

        const success = login(email, password);
        if (success) {
            navigate('/admin/cars');
        } else {
            setError('Invalid email or password. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-inter">
            <Header />

            <main className="flex-grow flex items-center justify-center pt-20 pb-20 custom-padding">
                <div className="w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[2.5rem] shadow-2xl shadow-primary-blue/5 border border-gray-100 p-8 md:p-12 space-y-10 relative overflow-hidden"
                    >
                        {/* Decorative Background Element */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-theme-blue/5 rounded-full blur-3xl saturate-150" />

                        {/* Header */}
                        <div className="text-center space-y-3 relative z-10">
                            <div className="w-16 h-16 bg-primary-blue rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20">
                                <ShieldCheck size={32} className="text-white" />
                            </div>
                            <h1 className="text-3xl font-black text-primary-blue uppercase tracking-tight">Admin <span className="text-theme-blue">Login</span></h1>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Secure Access to Management Portal</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-[10px] font-black uppercase tracking-widest"
                                >
                                    <AlertCircle size={16} />
                                    {error}
                                </motion.div>
                            )}

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-theme-blue transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            required
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="admin@gmail.com"
                                            className="w-full pl-12 pr-4 py-5 bg-gray-50 border border-transparent rounded-[1.25rem] outline-none focus:bg-white focus:border-theme-blue/30 focus:shadow-xl focus:shadow-theme-blue/5 transition-all font-bold text-sm text-primary-blue"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-theme-blue transition-colors">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            required
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full pl-12 pr-12 py-5 bg-gray-50 border border-transparent rounded-[1.25rem] outline-none focus:bg-white focus:border-theme-blue/30 focus:shadow-xl focus:shadow-theme-blue/5 transition-all font-bold text-sm text-primary-blue"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-primary-blue transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-6 bg-primary-blue hover:bg-theme-blue text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3 relative overflow-hidden group active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Authorized Login
                                        <ChevronRight size={18} className="translate-y-[1px] group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="text-center pt-4 relative z-10">
                            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest leading-relaxed">
                                Restricted area. Unauthorized access will be monitored and reported according to security protocols.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AdminLogin;
