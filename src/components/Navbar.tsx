import React from 'react';
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
    onCartClick: () => void;
    onLogoClick: () => void;
    onShopClick: () => void;
    onAboutClick: () => void;
    onProfileClick: () => void;
    cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick, onLogoClick, onShopClick, onAboutClick, onProfileClick, cartCount }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const navLinks = [
        { name: 'New In', onClick: onShopClick },
        { name: 'Shop All', onClick: onShopClick },
        { name: 'Best Sellers', onClick: onShopClick },
        { name: 'Clothing', onClick: onShopClick, hasDropdown: true },
        { name: 'About Us', onClick: onAboutClick },
    ];

    return (
        <nav className="sticky top-0 left-0 w-full bg-white z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Left: Logo & Desktop Navigation */}
                    <div className="flex items-center gap-8 xl:gap-12">
                        {/* Mobile Menu Toggle */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-600 hover:text-black focus:outline-none"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        {/* Logo */}
                        <button onClick={onLogoClick} className="text-xl md:text-2xl lg:text-3xl font-serif tracking-[0.05em] font-bold hover:opacity-70 transition-opacity whitespace-nowrap">
                            MacSoghveil
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex lg:space-x-4 xl:space-x-6 items-center">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={link.onClick}
                                    className="text-[10px] xl:text-[11px] whitespace-nowrap uppercase tracking-[0.1em] xl:tracking-[0.15em] font-black text-gray-500 hover:text-black flex items-center gap-0.5 xl:gap-1 transition-all"
                                >
                                    {link.name}
                                    {link.hasDropdown && <ChevronDown size={10} strokeWidth={3} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Icons */}
                    <div className="flex items-center space-x-4 md:space-x-6">
                        <button className="text-gray-500 hover:text-black transition-colors hidden md:block">
                            <Search size={20} strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={onProfileClick}
                            className="text-gray-500 hover:text-black transition-colors hidden md:block"
                        >
                            <User size={20} strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={onCartClick}
                            className="text-gray-500 hover:text-black transition-colors relative p-1"
                        >
                            <ShoppingBag size={22} strokeWidth={2.5} />
                            <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {cartCount}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="lg:hidden fixed inset-0 top-20 bg-white z-[60] overflow-y-auto"
                    >
                        <div className="px-6 py-8 space-y-6">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => {
                                        link.onClick?.();
                                        setIsMenuOpen(false);
                                    }}
                                    className="block w-full text-left text-lg font-black uppercase tracking-widest text-gray-700 hover:text-black transition-colors"
                                >
                                    {link.name}
                                </button>
                            ))}
                            <div className="pt-8 border-t border-gray-100 flex space-x-8">
                                <Search size={22} className="text-gray-400" />
                                <User size={22} className="text-gray-400" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
