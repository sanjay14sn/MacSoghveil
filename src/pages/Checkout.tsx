import React, { useState } from 'react';
import { ChevronRight, ShieldCheck, Lock } from 'lucide-react';

interface CheckoutProps {
    cartItems: any[];
    onOrderSuccess: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onOrderSuccess }) => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const shipping = 500;
    const total = subtotal + shipping;

    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            onOrderSuccess();
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left: Checkout Form */}
                    <div className="flex-1 space-y-12">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-8 pb-4 border-b border-gray-100">
                            <span>Information</span>
                            <ChevronRight size={12} />
                            <span>Shipping</span>
                            <ChevronRight size={12} />
                            <span className="text-black">Payment</span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-12">
                            <section className="space-y-6">
                                <h2 className="text-xl font-serif">Contact Information</h2>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors"
                                    required
                                />
                            </section>

                            <section className="space-y-6">
                                <h2 className="text-xl font-serif">Shipping Address</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="First Name" className="border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors" required />
                                    <input type="text" placeholder="Last Name" className="border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors" required />
                                </div>
                                <input type="text" placeholder="Address" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors" required />
                                <div className="grid grid-cols-3 gap-4">
                                    <input type="text" placeholder="City" className="border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors" required />
                                    <input type="text" placeholder="State" className="border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors" required />
                                    <input type="text" placeholder="PIN Code" className="border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors" required />
                                </div>
                            </section>

                            <section className="space-y-6">
                                <h2 className="text-xl font-serif">Payment Policy</h2>
                                <div className="bg-gray-50 p-6 border border-gray-100 space-y-4">
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <Lock size={18} className="text-gray-400" />
                                        <p>All transactions are secure and encrypted. We do not store your credit card details.</p>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <ShieldCheck size={18} className="text-gray-400" />
                                        <p>Orders are processed in INR (₹). Your bank will handle currency conversion if applicable.</p>
                                    </div>
                                </div>
                            </section>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className={`w-full py-5 text-xs tracking-[0.2em] font-black uppercase transition-all ${isProcessing ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900'
                                    }`}
                            >
                                {isProcessing ? 'Processing Payment...' : 'Complete Purchase'}
                            </button>
                        </form>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="w-full lg:w-[450px]">
                        <div className="bg-brand-gray/30 p-8 sticky top-24">
                            <h2 className="text-sm uppercase tracking-widest font-black mb-8 border-b border-gray-100 pb-4">Order Summary</h2>
                            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-4">
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-20 object-cover object-top" />
                                        <div className="flex-1">
                                            <h3 className="text-sm font-serif">{item.name}</h3>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Size: {item.size}</p>
                                        </div>
                                        <p className="font-semibold text-sm">₹{item.price.toLocaleString('en-IN')}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 border-t border-gray-100 pt-8">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Shipping</span>
                                    <span>₹{shipping.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t border-black/5 pt-4">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
