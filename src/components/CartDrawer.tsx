import React from 'react';
import { ShoppingBag, X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    size: string;
}

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onRemoveItem: (id: number) => void;
    onCheckoutClick: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemoveItem, onCheckoutClick }) => {
    const total = items.reduce((acc, item) => acc + item.price, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white z-[70] shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl uppercase tracking-widest font-bold">Your Bag ({items.length})</h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <ShoppingBag size={48} className="text-gray-200" />
                                    <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Your bag is empty</p>
                                    <button onClick={onClose} className="btn-primary">Shop Our Best Sellers</button>
                                </div>
                            ) : (
                                items.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 group">
                                        <div className="w-24 aspect-[3/4] bg-gray-50 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="font-serif text-lg leading-tight">{item.name}</h3>
                                                    <button
                                                        onClick={() => onRemoveItem(item.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Size: {item.size}</p>
                                            </div>
                                            <p className="font-semibold italic">₹{item.price.toLocaleString('en-IN')}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-6 border-t border-gray-100 space-y-6">
                                <div className="flex justify-between items-center uppercase tracking-widest font-bold">
                                    <span>Subtotal</span>
                                    <span>₹{total.toLocaleString('en-IN')}</span>
                                </div>
                                <p className="text-xs text-center text-gray-500 italic">Shipping, taxes, and discounts calculated at checkout.</p>
                                <button
                                    onClick={onCheckoutClick}
                                    className="w-full btn-primary py-4"
                                >
                                    Check Out
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
