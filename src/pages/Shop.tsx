import { ShoppingBag, ChevronRight, Heart } from 'lucide-react';

const products = [
    {
        id: 1,
        name: 'The Colossal Knit Cardigan',
        price: 8500,
        image: 'https://res.cloudinary.com/dq6gr5zjc/image/upload/v1776335213/ChatGPT_Image_Apr_16_2026_03_56_34_PM_qakcty.png',
        category: 'Knitwear'
    },
    {
        id: 2,
        name: 'Strawberry Fields Knit Bag',
        price: 6200,
        image: 'https://res.cloudinary.com/dq6gr5zjc/image/upload/v1776335999/ChatGPT_Image_Apr_16_2026_04_09_44_PM_aiji90.png',
        category: 'Accessories'
    },
    {
        id: 3,
        name: 'Lilac Dusk Chunky Sweater',
        price: 9800,
        image: 'https://res.cloudinary.com/dq6gr5zjc/image/upload/v1776336009/ChatGPT_Image_Apr_16_2026_03_47_28_PM_e0z0yf.png',
        category: 'Knitwear'
    },
    {
        id: 4,
        name: 'Sunny Day Wool Hat',
        price: 4500,
        image: 'https://res.cloudinary.com/dq6gr5zjc/image/upload/v1776336637/a5486d2e-3caa-472f-bb0f-50f3eb33c74a_1_wuwijm.png',
        category: 'Accessories'
    },
    {
        id: 5,
        name: 'Cotton Candy Cardigan',
        price: 8900,
        image: 'https://res.cloudinary.com/dq6gr5zjc/image/upload/v1776337280/ChatGPT_Image_Apr_16_2026_04_31_01_PM_ninrtw.png',
        category: 'Knitwear'
    },
    {
        id: 6,
        name: 'Daisy Dreams Vest',
        price: 7500,
        image: 'https://res.cloudinary.com/dq6gr5zjc/image/upload/v1776337117/ChatGPT_Image_Apr_16_2026_04_27_17_PM_zfnfzn.png',
        category: 'Jackets'
    },
    {
        id: 7,
        name: 'Ocean Breeze Pullover',
        price: 9200,
        image: 'https://res.cloudinary.com/dq6gr5zjc/image/upload/v1776337241/ChatGPT_Image_Apr_16_2026_04_30_12_PM_fjgkgd.png',
        category: 'Knitwear'
    },
    {
        id: 8,
        name: 'Sunset Glow Beanie',
        price: 3200,
        image: 'https://res.cloudinary.com/dq6gr5zjc/image/upload/v1776337415/ChatGPT_Image_Apr_16_2026_04_33_12_PM_lchrfn.png',
        category: 'Accessories'
    }
];

interface ShopProps {
    onProductClick: (product: any) => void;
    onAddToWishlist: (product: any) => void;
}

const Shop: React.FC<ShopProps> = ({ onProductClick, onAddToWishlist }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 mb-8 border-b border-gray-100 pb-4">
                <span>Home</span>
                <ChevronRight size={12} />
                <span className="text-black font-semibold">Shop All</span>
            </div>

            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl md:text-5xl mb-4">Shop All</h1>
                    <p className="text-gray-600">Explore the full MacSoghveil collection.</p>
                </div>
                <div className="hidden md:block">
                    <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">{products.length} Results</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {products.map((product) => (
                    <div key={product.id} className="group cursor-pointer">
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6">
                            <img
                                src={product.image}
                                alt={product.name}
                                onClick={() => onProductClick(product)}
                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAddToWishlist(product);
                                }}
                                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white z-10"
                            >
                                <Heart size={16} />
                            </button>
                            <button className="absolute bottom-4 left-4 right-4 bg-white py-3 text-xs uppercase tracking-widest font-semibold opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-black hover:text-white flex items-center justify-center gap-2">
                                <ShoppingBag size={14} />
                                Quick Add
                            </button>
                        </div>
                        <h3 className="text-lg font-serif mb-2 group-hover:underline">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                        <p className="font-semibold">₹{product.price.toLocaleString('en-IN')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;
