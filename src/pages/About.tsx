import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] overflow-hidden">
                <img
                    src="/hero-image.png"
                    alt="MacSoghveil Heritage"
                    className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl text-white font-serif tracking-tight"
                    >
                        Our Story
                    </motion.h1>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-4xl mx-auto px-4 py-24">
                <div className="space-y-20">
                    {/* Intro */}
                    <div className="text-center">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-2xl md:text-3xl font-serif italic text-gray-800 leading-relaxed"
                        >
                            "MacSoghveil is a contemporary luxury fashion label rooted in heritage-inspired identity and modern couture expression."
                        </motion.p>
                    </div>

                    {/* The Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-sm uppercase tracking-[0.3em] font-black text-gray-400">The Meaning</h2>
                            <p className="text-gray-600 leading-relaxed">
                                The name itself is a thoughtful blend of Gaelic influence and fashion language, crafted to embody elegance, richness, and timeless sophistication.
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <span className="font-serif italic text-xl mr-2">Mac</span>
                                    <span className="text-sm text-gray-500">LINEAGE & CRAFTSMANSHIP</span>
                                </div>
                                <div>
                                    <span className="font-serif italic text-xl mr-2">Sogh</span>
                                    <span className="text-sm text-gray-500">LUXURY & COMFORT</span>
                                </div>
                                <div>
                                    <span className="font-serif italic text-xl mr-2">Veil</span>
                                    <span className="text-sm text-gray-500">SOFT DRAPING & MYSTERY</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-brand-gray p-12 aspect-square flex items-center justify-center text-center">
                            <p className="text-gray-500 italic text-sm">
                                “Mac” draws from traditional Scottish and Irish lineage, symbolizing legacy. “Sogh” represents luxury and indulgence. “Veil” reflects the essence of fashion.
                            </p>
                        </div>
                    </div>

                    {/* Vision */}
                    <div className="bg-black text-white p-16 md:p-24 text-center space-y-8">
                        <h2 className="text-3xl md:text-5xl font-serif">More than a name—a vision.</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Each piece is designed to evoke quiet opulence, where structure meets softness and tradition meets contemporary artistry. We celebrate both heritage and modernity through refined silhouettes and fluid textures.
                        </p>
                    </div>

                    {/* Experience */}
                    <div className="text-center space-y-6 py-12">
                        <p className="text-xs uppercase tracking-[0.4em] font-black text-gray-900 border-b border-black inline-block pb-2">
                            The Experience
                        </p>
                        <p className="text-xl md:text-2xl text-gray-800 font-serif max-w-3xl mx-auto">
                            At MacSoghveil, fashion is not just worn—it is experienced.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
