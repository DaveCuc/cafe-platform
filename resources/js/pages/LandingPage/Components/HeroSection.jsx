import React, { useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/Components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion, useScroll, useTransform } from "framer-motion";

const fadeUp = {
    initial: { opacity: 0, y: 80 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1 }
};

/*
// Extracción de imágenes de forma local (Original)
const imageModules = import.meta.glob('/public/Fotos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true,
    import: 'default',
});

const carouselImages = Object.values(imageModules).sort((a, b) => String(a).localeCompare(String(b)));
*/

// Imágenes del Clúster de Caficultores y fincas de la Sierra Negra desde Internet
const carouselImages = [
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1920", // Cafetal y granos seleccionados
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1920", // Finca de café de especialidad
    "https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&q=80&w=1920", // Cosecha manual de café bajo sombra
    "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=1920"  // Proceso de secado y selección
];

export default function HeroSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
    const imageBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(3px)"]);
    const logoOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
    const logoScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.05]);
    const logoY = useTransform(scrollYProgress, [0, 0.25], [0, -300]);

    const textOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
    const textY = useTransform(scrollYProgress, [0.1, 0.25], [50, 0]);

    return (
        <div ref={containerRef} className="relative h-[200vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden text-white flex justify-center">
                {/* Background Carousel scaled and blurred on scroll */}
                <motion.div style={{ scale: imageScale, filter: imageBlur }} className="absolute inset-0 w-full h-full origin-center">
                    <Carousel
                        plugins={[
                            Autoplay({
                                delay: 5000,
                                stopOnInteraction: false,
                            }),
                        ]}
                        className="w-full h-full"
                        opts={{ loop: true }}
                    >
                        <CarouselContent>
                            {(carouselImages.length ? carouselImages : Array.from({ length: 5 }, (_, index) => `https://picsum.photos/1920/1080?random=${index + 1}`)).map((imageSrc, index) => (
                                <CarouselItem key={`${imageSrc}-${index}`}>
                                    <div className="relative w-full h-screen">
                                        <img
                                            src={imageSrc}
                                            alt={`Foto galería ${index + 1}`}
                                            className="object-cover w-full h-full absolute inset-0"
                                            onError={(e) => { e.target.src = 'https://picsum.photos/1920/1080?random=' + index; }}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent >
                        <CarouselPrevious className="left-4 hidden" />
                        <CarouselNext className="right-4 hidden" />
                    </Carousel>
                </motion.div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 z-[5]" />

                {/* Logo Wrapper for Scroll Animations */}
                <motion.div
                    style={{ opacity: logoOpacity, scale: logoScale, y: logoY }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10 origin-bottom"
                >
                    <motion.div {...fadeUp} className="w-full flex justify-center items-center">
                        <img
                            src="/logo2.svg"
                            alt="Logo"
                            className="w-[80%] md:w-[60%] lg:w-[50%] max-w-[1000px] h-auto object-contain drop-shadow-2xl"
                        />
                    </motion.div>
                </motion.div>

                {/* Text Wrapper for Scroll Animations */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className="absolute center-0 bottom-0 w-full md:w-2/3 lg:w-1/2 p-8 md:p-16 lg:px-24 lg:pb-40 z-10"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg text-center leading-tight">
                        Modelo de Clúster para la Caficultura de la Sierra Negra de Puebla
                    </h2>
                    <p className="text-lg md:text-md font-light drop-shadow-md text-center mb-8">
                        Diseño, análisis territorial y propuesta estratégica para una cadena de valor competitiva y sostenible.
                    </p>
                    <div className="flex justify-center">
                        <a
                            href="https://doi.org/10.37811/cl_rcm.v9i6.21431"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-gobmx-dorado-oscuro hover:bg-gobmx-dorado-claro text-white font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95"
                        >
                            Descargar Investigación
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
