import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Lock, User } from 'lucide-react';

interface AuthProps {
    onLoginSuccess: (user: any) => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate authentication
        const user = {
            id: '123',
            name: mode === 'signup' ? name : 'Sanjay Naveen',
            email: email,
            address: 'Awfis OMR, Chennai, Tamil Nadu, 600096, India',
            phone: '+91 8190000232'
        };
        onLoginSuccess(user);
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center py-24 px-4 overflow-hidden">
            <div className="max-w-md w-full space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-serif tracking-tight">
                        {mode === 'login' ? 'Welcome Back.' : 'Join the Family.'}
                    </h1>
                    <p className="text-gray-500 uppercase tracking-[0.2em] text-[10px] font-black">
                        {mode === 'login' ? 'Please enter your account details' : 'Create an account for personalized shopping'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <AnimatePresence mode="wait">
                        {mode === 'signup' && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="relative"
                            >
                                <User className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="FULL NAME"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border-b border-gray-200 py-4 pl-8 focus:outline-none focus:border-black transition-colors text-xs tracking-widest font-black uppercase"
                                    required
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="relative">
                        <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="email"
                            placeholder="EMAIL ADDRESS"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-b border-gray-200 py-4 pl-8 focus:outline-none focus:border-black transition-colors text-xs tracking-widest font-black uppercase"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="password"
                            placeholder="PASSWORD"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-b border-gray-200 py-4 pl-8 focus:outline-none focus:border-black transition-colors text-xs tracking-widest font-black uppercase"
                            required
                        />
                    </div>

                    <div className="space-y-6 pt-4">
                        <button
                            type="submit"
                            className="w-full btn-primary py-5 group flex items-center justify-center gap-4"
                        >
                            {mode === 'login' ? 'LOG IN' : 'SIGN UP'}
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                                className="text-[10px] text-gray-400 uppercase tracking-widest font-bold hover:text-black transition-colors"
                            >
                                {mode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                            </button>
                        </div>
                    </div>
                </form>

                <div className="pt-12 border-t border-gray-50 flex justify-center gap-8">
                    <span className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">Secure SSL Checkout</span>
                    <span className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">Global Shipping</span>
                </div>
            </div>
        </div>
    );
};

export default Auth;
