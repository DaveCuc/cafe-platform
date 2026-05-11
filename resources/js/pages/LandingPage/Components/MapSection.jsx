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
    initial: { opacity: 0, y: 100 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1 }
};
const fadeRight = {
    initial: { opacity: 0, x: -100 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 1 }
};
const fadeLeft = {
    initial: { opacity: 0, x: 100 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 1 }
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
            descripcion: "Recorre los paisajes de las salinas de Zapotitlán y descubre los métodos prehispánicos de extracción de sal, ademas de conocer el mundo del onix.",
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
        <section className="bg-brand-seven p-20  mx-auto" >
            <div className="container max-w-7xl mx-auto px-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div {...fadeUp}>
                        <div className="text-white">
                            <h2 className="text-6xl font-bold mb-4 py-5">Explora Nuestras Rutas</h2>
                            <p className="text-white mb-6 text-lg">
                                Sumérgete en la vasta riqueza biocultural de la Reserva a través de itinerarios cuidadosamente diseñados. Cada recorrido es una oportunidad única para vivir de cerca el patrimonio natural, aprender de las tradiciones ancestrales y apoyar directamente la economía de las comunidades locales a través de un turismo responsable.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {rutas.map((ruta) => (
                                    <li key={ruta.titulo} className="flex items-start">
                                        <LuMapPin className="h-5 w-5 text-green-600 mr-3 mt-1" />
                                        <div>
                                            <span className="font-medium block">{ruta.titulo}</span>
                                            <p className="text-md text-white/80 mt-1">{ruta.descripcion}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <motion.div {...fadeUp}>
                                <Button asChild variant="landing_page_secondary" size="lg" className="text-white rounded-md text-base">
                                    <Link href="/mapa">Ver mapa completo</Link>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>

                    <div className="w-full max-w-2xl mx-auto">
                        <motion.div {...fadeLeft}>
                            <Carousel>
                                <CarouselContent>
                                    {mapImages.map((image, index) => (
                                        <CarouselItem key={index}>
                                            <div className="overflow-hidden rounded-lg shadow-lg">
                                                <img
                                                    src={image.imageUrl}
                                                    alt={image.alt}
                                                    className="aspect-[4/3] object-cover w-full"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="ml-16 hidden md:flex" />
                                <CarouselNext className="mr-16 hidden md:flex" />
                            </Carousel>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
