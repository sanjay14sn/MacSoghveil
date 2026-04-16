import React, { useState } from 'react';
import { Star, Truck, ShieldCheck, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

interface ProductDetailProps {
    product: Product;
    onAddToCart: (product: Product, size: string, openCart?: boolean) => void;
    onAddToWishlist: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onAddToWishlist }) => {
    const [openAccordion, setOpenAccordion] = useState<string | null>('Product Description');
    const [selectedSize, setSelectedSize] = useState('M/L');

    const toggleAccordion = (item: string) => {
        setOpenAccordion(openAccordion === item ? null : item);
    };


    const accordionContent: Record<string, React.ReactNode> = {
        'Product Description': (
            <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                <p>The signature {product.name} is a wearable work of art, meticulously handmade using our unique colossal-knit technique.</p>
                <p>Designed for a relaxed, oversized silhouette with dramatic balloon sleeves and a luxurious weight that feels like a warm hug.</p>
            </div>
        ),
        'Size Guide': (
            <div className="text-sm text-gray-600 space-y-2">
                <p><strong>XS/S:</strong> UK 6-10 | US 2-6</p>
                <p><strong>M/L:</strong> UK 12-16 | US 8-12</p>
                <p><strong>XL/2XL:</strong> UK 18-22 | US 14-18</p>
                <p className="italic mt-4">Our cardigans are designed for an oversized fit. If you prefer a more tailored look, we recommend sizing down.</p>
            </div>
        ),
        'Shipping & Returns': (
            <div className="text-sm text-gray-600 space-y-2">
                <p>Each piece is handmade to order specifically for you. Current lead time is 8-9 weeks.</p>
                <p>Worldwide shipping available from our studio in India.</p>
                <p>Returns are accepted within 14 days of delivery for standard sizes.</p>
            </div>
        )
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-16">
                {/* Left: Product Image */}
                <div className="w-full lg:w-3/5">
                    <div className="aspect-[3/4] bg-gray-50 overflow-hidden lg:sticky lg:top-24">
                        <img
                            src={product.image}
                            className="w-full h-full object-cover object-top"
                            alt={product.name}
                        />
                    </div>
                </div>

                {/* Right: Product Details */}
                <div className="w-full lg:w-2/5 lg:sticky lg:top-24 h-fit">
                    <div className="mb-4 flex items-center gap-1 text-black">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                        <span className="text-[10px] uppercase tracking-widest font-bold ml-2">(48 Reviews)</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-tight">{product.name}</h1>
                    <p className="text-2xl font-light mb-8">₹{product.price.toLocaleString('en-IN')}.00</p>

                    <div className="mb-8 p-6 bg-brand-gray/30 border-l-4 border-black italic text-sm text-gray-700 leading-relaxed">
                        Handmade to order specifically for you by our knitters in India. Ships in 8-9 weeks.
                    </div>

                    <div className="space-y-8 mb-12">
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-black">Size</label>
                                <button className="text-[10px] uppercase tracking-[0.2em] font-black border-b border-black">Size Guide</button>
                            </div>
                            <div className="flex gap-3">
                                {['XS/S', 'M/L', 'XL/2XL'].map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`flex-1 border py-4 text-xs tracking-widest font-bold transition-all ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-black'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => onAddToCart(product, selectedSize)}
                                className="w-full btn-primary py-5 text-xs tracking-[0.2em] font-black"
                            >
                                ADD TO BAG
                            </button>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => onAddToCart(product, selectedSize, true)}
                                    className="flex-1 bg-[#f8f8f8] text-black border border-black py-5 text-xs tracking-[0.2em] font-black hover:bg-black hover:text-white transition-all uppercase"
                                >
                                    BUY IT NOW
                                </button>
                                <button
                                    onClick={() => onAddToWishlist(product)}
                                    className="w-16 border border-black/10 flex items-center justify-center hover:border-black transition-colors"
                                >
                                    <Heart size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Accordions */}
                    <div className="border-t border-gray-100 divide-y divide-gray-100">
                        {['Product Description', 'Size Guide', 'Shipping & Returns'].map((item) => (
                            <div key={item} className="py-6">
                                <button
                                    onClick={() => toggleAccordion(item)}
                                    className="w-full flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-black hover:text-gray-500 transition-colors"
                                >
                                    {item}
                                    {openAccordion === item ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                                {openAccordion === item && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        className="pt-6 overflow-hidden"
                                    >
                                        {accordionContent[item]}
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 space-y-6 pt-12 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">
                            <Truck size={18} strokeWidth={1.5} />
                            <span>Worldwide shipping from India</span>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">
                            <ShieldCheck size={18} strokeWidth={1.5} />
                            <span>Secure checkout and payment options</span>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">
                            <Heart size={18} strokeWidth={1.5} />
                            <span>Consciously made and zero waste</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
