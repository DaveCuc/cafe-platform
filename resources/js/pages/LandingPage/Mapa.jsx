import React from 'react';
import { Head } from '@inertiajs/react';
import HomeLayout from '@/Layouts/HomeLayout';
import { motion } from "framer-motion";
import ContainerMap from './Components/ContainerMap';

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

const InfoSection = () => {
    return (
        <section className="bg-gray-50 pt-24 pb-32 border-t border-gray-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-mint/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div {...fadeUp} className="text-center mb-20">
                    <span className="inline-block text-brand font-bold tracking-widest text-sm uppercase mb-6 border-b border-brand pb-1">Conoce el Territorio</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-darker tracking-tight">Reserva de la Biosfera</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-700 font-medium text-lg leading-relaxed mb-24">
                    <motion.div {...fadeRight} className="border-l-4 border-brand-mint pl-8">
                        <p>
                            La Reserva de la Biosfera Tehuacán-Cuicatlán, reconocida como Patrimonio Mixto de la Humanidad por la UNESCO, abarca un vasto territorio entre los estados de Puebla y Oaxaca. Este mapa interactivo te permite visualizar la magnitud de su riqueza natural, desde los densos bosques de cactáceas hasta las zonas de importancia histórica y arqueológica.
                        </p>
                    </motion.div>
                    <motion.div {...fadeLeft} className="border-l-4 border-brand-mint pl-8">
                        <p>
                            Navega a través de las diferentes regiones para planificar tu visita. Selecciona las rutas para descubrir los ecosistemas únicos, identificar los centros ecoturísticos y conocer la ubicación exacta de las comunidades que lideran los esfuerzos de conservación y turismo sostenible.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Ruta 1: Onix y Sal", desc: "Recorre los paisajes de las salinas de Zapotitlán y descubre los métodos prehispánicos de extracción de sal, además de conocer el mundo del ónix.", img: "/Fotos/Recorridos/onix.jpg" },
                        { title: "Ruta 2: Dinosaurios", desc: "Descubre los senderos y sitios arqueológicos donde las huellas de dinosaurios cobran vida.", img: "/Fotos/Recorridos/dinosaurios.jpg" },
                        { title: "Ruta 3: Mezcal y Barro", desc: "Descubre el proceso artesanal de producción de mezcal y la tradicional elaboración de barro negro.", img: "/Fotos/Recorridos/mezcal.jpg" }
                    ].map((ruta, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="bg-white border border-gray-200 institutional-shadow hover:institutional-shadow-strong hover:border-brand-mint hover:-translate-y-2 transition-all duration-300 rounded-none flex flex-col h-full overflow-hidden"
                        >
                            <div className="relative h-56 w-full overflow-hidden">
                                <div className="absolute inset-0 bg-brand-darker/10 z-10 transition-opacity hover:opacity-0"></div>
                                <img src={ruta.img} alt={ruta.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                            </div>
                            <div className="p-8 md:p-10 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold text-brand-darker mb-4 tracking-tight">{ruta.title}</h3>
                                <div className="w-12 h-1 bg-brand-mint mb-6"></div>
                                <p className="text-gray-600 font-medium leading-relaxed flex-grow">{ruta.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function Mapa() {
    return (
        <HomeLayout>
            <Head title="Mapa Interactivo" />
            <ContainerMap />
            <InfoSection />
        </HomeLayout>
    );
}
