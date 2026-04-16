import React, { useState } from 'react';
import { Package, User, Heart, Settings, LogOut, ChevronRight, MapPin, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfileProps {
    user: any;
    orders: any[];
    wishlist: any[];
    onLogout: () => void;
    onUpdateDetails: (details: any) => void;
    onShopNow: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, orders, wishlist, onLogout, onUpdateDetails, onShopNow }) => {
    const [activeTab, setActiveTab] = useState<'orders' | 'saved' | 'details' | 'settings'>('orders');
    const [isEditing, setIsEditing] = useState(false);

    // Editable state for details
    const [editName, setEditName] = useState(user?.name || '');
    const [editEmail, setEditEmail] = useState(user?.email || '');
    const [editPhone, setEditPhone] = useState(user?.phone || '');
    const [editAddress, setEditAddress] = useState(user?.address || '');

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateDetails({
            name: editName,
            email: editEmail,
            phone: editPhone,
            address: editAddress
        });
        setIsEditing(false);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'orders':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                        <h3 className="text-sm uppercase tracking-[0.3em] font-black text-gray-400 mb-8 border-b border-gray-100 pb-4">Order History</h3>
                        {orders.length === 0 ? (
                            <div className="bg-gray-50 p-12 text-center rounded-lg border-2 border-dashed border-gray-200">
                                <Package size={40} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500 font-serif italic">You haven't placed any orders yet.</p>
                                <button onClick={onShopNow} className="mt-8 btn-primary !px-12">Visit the Shop</button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {orders.map((order, i) => (
                                    <div key={i} className="border border-gray-100 p-6 rounded-lg space-y-4 hover:border-black/10 transition-colors">
                                        <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-black text-gray-400">
                                            <span>Order #{order.id}</span>
                                            <span className="bg-gray-100 px-3 py-1 rounded text-black">Processing</span>
                                        </div>
                                        <div className="flex flex-wrap gap-4">
                                            {order.items.map((item: any, idx: number) => (
                                                <div key={idx} className="w-16 h-20 bg-gray-50 rounded overflow-hidden">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" title={item.name} />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="pt-4 border-t border-gray-50 flex justify-between items-center font-bold">
                                            <span className="text-xs uppercase tracking-widest text-gray-400">Total</span>
                                            <span className="font-serif">₹{order.total.toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                );
            case 'saved':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                        <h3 className="text-sm uppercase tracking-[0.3em] font-black text-gray-400 mb-8 border-b border-gray-100 pb-4">Saved Items</h3>
                        {wishlist.length === 0 ? (
                            <div className="bg-gray-50 p-12 text-center rounded-lg border-2 border-dashed border-gray-200">
                                <Heart size={40} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500 font-serif italic">Your wishlist is currently empty.</p>
                                <button onClick={onShopNow} className="mt-8 btn-primary !px-12">Browse Collection</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {wishlist.map((item, i) => (
                                    <div key={i} className="group cursor-pointer space-y-3">
                                        <div className="aspect-[3/4] overflow-hidden bg-gray-50 relative">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                                            <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Heart size={14} fill="black" />
                                            </button>
                                        </div>
                                        <h4 className="text-[10px] uppercase tracking-widest font-black leading-tight h-8 line-clamp-2">{item.name}</h4>
                                        <p className="font-serif italic text-sm">₹{item.price.toLocaleString('en-IN')}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                );
            case 'details':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                            <h3 className="text-sm uppercase tracking-[0.3em] font-black text-gray-400">Personal Details</h3>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="text-[10px] uppercase tracking-widest font-black border-b border-black"
                                >
                                    Edit Details
                                </button>
                            )}
                        </div>

                        {isEditing ? (
                            <form onSubmit={handleUpdate} className="space-y-8 max-w-lg">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                                    <input value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                                    <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Phone Number</label>
                                    <input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Primary Address</label>
                                    <textarea value={editAddress} onChange={(e) => setEditAddress(e.target.value)} rows={3} className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black resize-none" />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="submit" className="btn-primary flex-1">Save Changes</button>
                                    <button type="button" onClick={() => setIsEditing(false)} className="px-8 border border-gray-200 uppercase tracking-widest text-[10px] font-black">Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <MapPin size={18} className="text-gray-400 mt-1" />
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Shipping Address</p>
                                            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{user.address}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Mail size={18} className="text-gray-400 mt-1" />
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Email</p>
                                            <p className="text-sm text-gray-600 font-serif italic">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <User size={18} className="text-gray-400 mt-1" />
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Name</p>
                                            <p className="text-sm text-gray-600">{user.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Phone size={18} className="text-gray-400 mt-1" />
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Phone</p>
                                            <p className="text-sm text-gray-600">{user.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                );
            case 'settings':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                        <h3 className="text-sm uppercase tracking-[0.3em] font-black text-gray-400 mb-8 border-b border-gray-100 pb-4">Account Settings</h3>
                        <div className="space-y-8 max-w-lg">
                            {[
                                { title: 'Order Notifications', desc: 'Receive updates on your order status and shipping tracking.' },
                                { title: 'Marketing Communications', desc: 'Receive early access to new collections and limited releases.' },
                                { title: 'Personalized Experience', desc: 'Allow us to curate your shop based on your preferences.' }
                            ].map((s, i) => (
                                <div key={i} className="flex justify-between items-center gap-12 group">
                                    <div className="space-y-1">
                                        <p className="text-xs uppercase tracking-widest font-black leading-tight">{s.title}</p>
                                        <p className="text-[10px] text-gray-400 font-bold leading-normal">{s.desc}</p>
                                    </div>
                                    <div className="w-12 h-6 bg-black rounded-full p-1 relative cursor-pointer">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                                    </div>
                                </div>
                            ))}

                            <div className="pt-12">
                                <button className="text-[10px] uppercase tracking-widest font-black text-red-500 hover:text-red-700 transition-colors">Deactivate Account</button>
                            </div>
                        </div>
                    </motion.div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-16">
                    {/* Sidebar */}
                    <div className="w-full md:w-1/4">
                        <div className="mb-12">
                            <h2 className="text-3xl font-serif mb-2">My Account</h2>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Logged in as {user.name.split(' ')[0]}</p>
                        </div>

                        <nav className="flex flex-col space-y-2">
                            {[
                                { id: 'orders', name: 'My Orders', icon: Package },
                                { id: 'saved', name: 'Saved Items', icon: Heart },
                                { id: 'details', name: 'Personal Details', icon: User },
                                { id: 'settings', name: 'Settings', icon: Settings }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => { setActiveTab(item.id as any); setIsEditing(false); }}
                                    className={`flex items-center justify-between py-4 px-6 text-[10px] uppercase tracking-[0.2em] font-black transition-all rounded ${activeTab === item.id ? 'bg-black text-white' : 'text-gray-400 hover:bg-gray-50 hover:text-black'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <item.icon size={16} />
                                        {item.name}
                                    </div>
                                    <ChevronRight size={14} className={activeTab === item.id ? 'opacity-100' : 'opacity-0'} />
                                </button>
                            ))}
                            <button
                                onClick={onLogout}
                                className="flex items-center gap-4 py-4 px-6 text-[10px] uppercase tracking-[0.2em] font-black text-red-500 hover:bg-red-50 transition-all rounded mt-8"
                            >
                                <LogOut size={16} />
                                Log Out
                            </button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
