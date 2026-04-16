import { useState } from 'react';
import Navbar from './components/Navbar';
import AnnouncementBar from './components/AnnouncementBar';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Auth from './pages/Auth';
import CartDrawer from './components/CartDrawer';

type View = 'home' | 'shop' | 'product' | 'about' | 'profile' | 'checkout' | 'success' | 'auth';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);

  const navigateTo = (view: View, product?: any) => {
    if (view === 'profile' && !user) {
      setCurrentView('auth');
    } else {
      if (product) setSelectedProduct(product);
      setCurrentView(view);
    }
    window.scrollTo(0, 0);
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    navigateTo('profile');
  };

  const handleLogout = () => {
    setUser(null);
    navigateTo('home');
  };

  const handleAddToCart = (product: any, size: string, openCart: boolean = true) => {
    const newItem = {
      ...product,
      id: Date.now(),
      size
    };
    setCartItems(prev => [...prev, newItem]);
    if (openCart) setIsCartOpen(true);
  };

  const handleAddToWishlist = (product: any) => {
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist(prev => [...prev, product]);
    }
  };

  const handleOrderSuccess = () => {
    const newOrder = {
      id: Math.floor(Math.random() * 90000) + 10000,
      items: [...cartItems],
      total: cartItems.reduce((acc, item) => acc + item.price, 0) + 500
    };
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    navigateTo('success');
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <main>
            {/* Hero Section */}
            <section className="relative h-[85vh] w-full bg-gray-100 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-[url('https://res.cloudinary.com/dq6gr5zjc/image/upload/v1776339620/26a7925b-6277-4c9f-8de2-5a0c17a4df42_hhmtsc.png)] bg-cover bg-top" />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-6xl md:text-8xl mb-6">Handmade with Love</h1>
                <p className="text-lg md:text-xl mb-10 tracking-[0.3em] uppercase">Luxury Knitwear from India</p>
                <button
                  onClick={() => navigateTo('shop')}
                  className="btn-primary !bg-white !text-black hover:!bg-black hover:!text-white border-none py-4 px-12"
                >
                  Shop Now
                </button>
              </div>
            </section>

            {/* Featured Collections */}
            <section className="max-w-7xl mx-auto px-4 py-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { title: 'New Arrivals', img: 'https://res.cloudinary.com/dq6gr5zjc/image/upload/v1776338120/Screenshot_2026-04-16_at_4.42.45_PM_xxpkkk.png' },
                  { title: 'Best Sellers', img: 'https://res.cloudinary.com/dq6gr5zjc/image/upload/v1776337836/ChatGPT_Image_Apr_16_2026_04_40_17_PM_tz4icw.png' },

                  { title: 'Jackets', img: '/image.png' }
                ].map((col, i) => (
                  <div key={i} className="group cursor-pointer overflow-hidden relative aspect-[4/5]" onClick={() => navigateTo('shop')}>
                    <img
                      src={col.img}
                      alt={col.title}
                      className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center w-full">
                      <h2 className="text-4xl text-white mb-6 uppercase tracking-widest">{col.title}</h2>
                      <button className="bg-white text-black px-10 py-3 uppercase tracking-widest text-xs font-bold hover:bg-black hover:text-white transition-all shadow-lg">View Collection</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Values Section */}
            <section className="bg-brand-gray py-24 text-center">
              <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-4xl mb-8">Responsibly & Ethically Made</h2>
                <p className="text-lg text-gray-600 italic leading-relaxed">
                  "Each piece is handmade to order by our team of knitters in India. We use high quality, sustainable materials to create timeless pieces that are as unique as you are."
                </p>
                <button className="mt-12 uppercase tracking-[0.2em] text-xs font-bold border-b-2 border-black pb-2 hover:text-gray-500 hover:border-gray-500 transition-all">Our Story</button>
              </div>
            </section>
          </main>
        );
      case 'shop':
        return <Shop onProductClick={(p) => navigateTo('product', p)} onAddToWishlist={handleAddToWishlist} />;
      case 'product':
        return <ProductDetail product={selectedProduct || { id: 1, name: 'The Colossal Knit Cardigan', price: 8500, image: 'https://res.cloudinary.com/dq6gr5zjc/image/upload/v1776335213/ChatGPT_Image_Apr_16_2026_03_56_34_PM_qakcty.png', category: 'Knitwear' }} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />;
      case 'about':
        return <About />;
      case 'profile':
        return (
          <Profile
            user={user}
            orders={orders}
            wishlist={wishlist}
            onLogout={handleLogout}
            onUpdateDetails={setUser}
            onShopNow={() => navigateTo('shop')}
          />
        );
      case 'checkout':
        return <Checkout cartItems={cartItems} onOrderSuccess={handleOrderSuccess} />;
      case 'success':
        return <OrderSuccess onContinueShopping={() => navigateTo('shop')} />;
      case 'auth':
        return <Auth onLoginSuccess={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen selection:bg-black selection:text-white">
      <AnnouncementBar />
      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        onLogoClick={() => navigateTo('home')}
        onShopClick={() => navigateTo('shop')}
        onAboutClick={() => navigateTo('about')}
        onProfileClick={() => navigateTo('profile')}
        cartCount={cartItems.length}
      />

      <div>
        {renderView()}
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={(id) => setCartItems(prev => prev.filter(item => item.id !== id))}
        onCheckoutClick={() => {
          setIsCartOpen(false);
          navigateTo('checkout');
        }}
      />

      <footer className="bg-white border-t border-gray-100 py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl mb-8 font-serif">Join the MacSoghveil family</h3>
            <p className="text-gray-500 mb-10 max-w-md leading-relaxed text-sm">Be the first to hear about new launches, pop-ups, and get early access to our limited-edition releases.</p>
            <div className="flex gap-4 max-w-lg">
              <input type="email" placeholder="YOUR EMAIL ADDRESS" className="flex-1 bg-transparent border-b-2 border-black/10 px-0 py-4 focus:outline-none focus:border-black transition-colors text-sm" />
              <button className="btn-primary !px-12">SIGN UP</button>
            </div>
          </div>
          <div>
            <h4 className="uppercase tracking-[0.2em] text-xs font-black mb-8">Shop</h4>
            <ul className="space-y-4 text-xs tracking-widest font-bold uppercase text-gray-500">
              <li><button onClick={() => navigateTo('shop')} className="hover:text-black transition-colors">Knitwear</button></li>
              <li><a href="#" className="hover:text-black transition-colors">Wool</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-black transition-colors">New In</a></li>
            </ul>
          </div>
          <div>
            <h4 className="uppercase tracking-[0.2em] text-xs font-black mb-8">Support</h4>
            <ul className="space-y-4 text-xs tracking-widest font-bold uppercase text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Handmade to Order</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em]">
          <p>© 2026 MacSoghveil Clone. India.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
