import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/Components/ui/badge";

const fadeUp = {
    initial: { opacity: 0, y: 80 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false },
    transition: { duration: 1 }
};

export default function HeroSection({ trade }) {
    const bgImage = trade.image_url || 'https://picsum.photos/1920/1080?random=1';
    const regionName = trade.region?.name || trade.region || 'Región no definida';
    const municipioName = trade.municipio?.name || 'Municipio no definido';

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
    const imageBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(3px)"]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0, 0]);
    const contentScale = useTransform(scrollYProgress, [0, 0.3, 1], [1, 1.05, 1.05]);
    const contentY = useTransform(scrollYProgress, [0, 0.3, 1], [0, -200, -200]);

    return (
        <div ref={containerRef} className="relative h-[200vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden text-white flex justify-center">
                <motion.img
                    style={{ scale: imageScale, filter: imageBlur }}
                    src={bgImage}
                    alt={trade?.comercial_name || 'Imagen de fondo'}
                    className="absolute inset-0 w-full h-full object-cover origin-center"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Content Wrapper for Scroll Animations */}
                <motion.div
                    style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
                    className="absolute inset-0 w-full h-full flex justify-center z-10 origin-bottom"
                >
                    {/* Entrance Animation */}
                    <motion.div {...fadeUp} className="w-full flex justify-center h-full">
                        <div className="relative z-10 h-full flex items-end w-full pb-32">
                            <div className="container mx-auto px-4 md:px-8">
                                <div>
                                    <Badge className="inline-flex items-center rounded-none border border-white/40 bg-white/10 px-5 py-2 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md shadow-lg md:text-base mb-2">
                                        Región
                                    </Badge>
                                    <h2 className='text-6xl md:text-8xl lg:text-9xl font-extrabold mb-2 drop-shadow-xl pt-2 tracking-tight'>{regionName}</h2>
                                    <p className="text-3xl md:text-5xl lg:text-6xl font-medium drop-shadow-lg opacity-90">{municipioName}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
