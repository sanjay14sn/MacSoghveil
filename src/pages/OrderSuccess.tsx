import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface OrderSuccessProps {
    onContinueShopping: () => void;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ onContinueShopping }) => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center py-24 px-4 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full text-center space-y-12"
            >
                <div className="relative inline-block">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute inset-0 bg-green-100 rounded-full scale-150 blur-2xl -z-10"
                    />
                    <CheckCircle2 size={80} className="text-black mx-auto" strokeWidth={1} />
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl font-serif tracking-tight">Thank You.</h1>
                    <p className="text-gray-500 uppercase tracking-[0.2em] text-xs font-black">Order #MSV-2026-8812</p>
                </div>

                <div className="bg-gray-50 border border-gray-100 p-8 space-y-4 text-sm text-gray-600 leading-relaxed italic font-serif">
                    <p>"Your masterpiece is being prepared. Each MacSoghveil piece is handmade to order specifically for you. We will notify you once it’s on its way."</p>
                </div>

                <div className="space-y-6 pt-4">
                    <button
                        onClick={onContinueShopping}
                        className="w-full btn-primary py-5 group flex items-center justify-center gap-4"
                    >
                        CONTINUE SHOPPING
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                    </button>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">A confirmation email has been sent to your inbox.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderSuccess;
