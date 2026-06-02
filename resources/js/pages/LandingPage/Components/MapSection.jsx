import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";
import { LuMapPin } from "react-icons/lu";
import { motion } from "framer-motion";

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
};
const fadeRight = {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
};
const fadeLeft = {
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
};

export default function MapSection() {
    const mapImages = [
        { imageUrl: "/storage/landing-page/RutaSal.jpeg", alt: "Sal" },
        { imageUrl: "/storage/landing-page/RutaSal2.jpeg", alt: "Sal" },
        { imageUrl: "/storage/landing-page/RutaSal3.jpeg", alt: "Sal" },
    ];

    const rutas = [
        {
            titulo: "Ruta 1: Onix y Sal",
            descripcion: "Recorre los paisajes de las salinas de Zapotitlán y descubre los métodos prehispánicos de extracción de sal, además de conocer el mundo del ónix.",
        },
        {
            titulo: "Ruta 2: Dinosaurios",
            descripcion: "Descubre los senderos y sitios arqueológicos donde las huellas de dinosaurios cobran vida.",
        },
        {
            titulo: "Ruta 3: Mezcal y Barro",
            descripcion: "Descubre el proceso artesanal de producción de mezcal y la tradicional elaboración de barro negro.",
        },
    ];

    return (
        <section className="bg-brand-dark py-20 lg:py-28 relative overflow-hidden" >
            {/* Soft Background pattern/accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-darker opacity-50 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>

            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <motion.div {...fadeUp}>
                        <div className="text-brand-pale">
                            <span className="inline-block text-brand-mint font-semibold tracking-widest text-sm uppercase mb-4 border-b border-brand-mint pb-1">Itinerarios y Aventuras</span>
                            <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight text-white">
                                Explora Nuestras Rutas <br /><span className="text-brand-mint font-light">Bioculturales</span>
                            </h2>
                            <p className="text-white mb-10 text-lg leading-relaxed font-light">
                                Sumérgete en la vasta riqueza biocultural de la Reserva a través de itinerarios cuidadosamente diseñados. Cada recorrido es una oportunidad única para vivir de cerca el patrimonio natural, aprender de las tradiciones ancestrales y apoyar directamente la economía de las comunidades locales a través de un turismo responsable.
                            </p>
                            <ul className="space-y-8 mb-12">
                                {rutas.map((ruta, index) => (
                                    <motion.li
                                        key={ruta.titulo}
                                        className="flex items-start group"
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-2 mr-4 bg-brand-darker border border-brand-mint/20 group-hover:border-brand-mint/60 transition-colors duration-300">
                                            <LuMapPin className="h-5 w-5 text-brand-mint" />
                                        </div>
                                        <div>
                                            <span className="font-semibold text-lg tracking-wide block text-white group-hover:text-brand-mint transition-colors duration-300">{ruta.titulo}</span>
                                            <p className="text-base text-brand-soft/80 mt-2 font-light">{ruta.descripcion}</p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                            <motion.div {...fadeUp}>
                                <Button asChild className="rounded-none bg-brand-mint text-brand-darker hover:bg-white transition-colors duration-300 px-8 py-6 text-[#052e16] font-semibold tracking-wide">
                                    <Link href="/mapa">Ver mapa completo</Link>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>

                    <div className="w-full max-w-2xl mx-auto lg:ml-auto">
                        <motion.div {...fadeLeft} className="relative">
                            <Carousel className="bg-brand-darker border border-brand-mint/20 institutional-shadow-strong">
                                <CarouselContent>
                                    {mapImages.map((image, index) => (
                                        <CarouselItem key={index}>
                                            <div className="overflow-hidden bg-brand-darker">
                                                <img
                                                    src={image.imageUrl}
                                                    alt={image.alt}
                                                    className="aspect-[4/3] object-cover w-full opacity-90 hover:opacity-100 transition-opacity duration-700"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="ml-16 hidden md:flex border border-brand-mint/30 bg-brand-dark/80 text-brand-mint hover:bg-brand-mint hover:text-brand-darker rounded-none transition-colors" />
                                <CarouselNext className="mr-16 hidden md:flex border border-brand-mint/30 bg-brand-dark/80 text-brand-mint hover:bg-brand-mint hover:text-brand-darker rounded-none transition-colors" />
                            </Carousel>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
