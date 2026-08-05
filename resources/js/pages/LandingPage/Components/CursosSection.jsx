import React from 'react';
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
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

export default function CursosSection() {
    return (
        <section className="py-24 lg:py-32 bg-brand border-y border-brand-dark relative z-10 overflow-hidden">
            {/* Elegant Background Pattern */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            <div className="container mx-auto px-6 text-center max-w-5xl relative z-10">
                <motion.div {...fadeUp} className="mb-20">
                    <span className="inline-block text-white/90 font-semibold tracking-widest text-sm uppercase mb-6 border-b border-white/40 pb-1">Propuesta de Valor</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8 leading-tight">
                        El Modelo <span className="font-light">de Clúster</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white max-w-3xl mx-auto font-light leading-relaxed">
                        Desarrollo territorial basado en un modelo de clúster fundamentado en el "Diamante de Porter" y el "Modelo de las Cuatro Hélices" (Academia, Industria, Gobierno y Comunidad) para fortalecer la cadena de valor del café, promover la innovación productiva y aumentar la captura de valor agregado en la región.
                    </p>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 relative z-10">
                <motion.div {...fadeRight} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                    <div className="bg-white p-10 md:p-14 border border-gray-100 institutional-shadow hover:institutional-shadow-strong transition-all h-full flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-brand-soft rounded-none mb-8 flex items-center justify-center border border-brand/10">
                            <span className="text-2xl font-bold text-brand">01</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4 tracking-tight">Dimensión Económica</h2>
                        <div className="w-12 h-1 bg-brand mb-6"></div>
                        <p className="text-gray-600 mb-10 flex-grow text-base font-light leading-relaxed">
                            Estructura productiva y competitividad. Impulsa la creación de micro tostadores locales, unidades de empaque, certificación de calidad y la diversificación hacia el agroturismo regional.
                        </p>
                        <Link href="/cursos" className="w-full mt-auto">
                            <Button className="w-full rounded-none bg-brand text-white border-2 border-brand hover:bg-white hover:text-brand hover:border-brand transition-all duration-300 px-8 py-6 text-sm font-semibold uppercase tracking-wide">
                                Ver Cursos
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                <motion.div {...fadeUp} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                    <div className="bg-brand-dark p-10 md:p-14 border border-brand-darker institutional-shadow hover:institutional-shadow-strong transition-all h-full flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-brand-darker rounded-none mb-8 flex items-center justify-center border border-white/20">
                            <span className="text-2xl font-bold text-white">02</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">Social e Institucional</h2>
                        <div className="w-12 h-1 bg-white mb-6"></div>
                        <p className="text-white/80 mb-10 flex-grow text-base font-light leading-relaxed">
                            Inclusión y gobernanza participativa. Fomenta el fortalecimiento organizativo, ecosistemas de innovación sostenibles y la cooperación interinstitucional constante.
                        </p>
                        <Link href="/directorio" className="w-full mt-auto">
                            <Button className="w-full rounded-none bg-white text-brand-dark border-2 border-white hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 px-8 py-6 text-sm font-semibold uppercase tracking-wide">
                                Ver Directorio
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                <motion.div {...fadeLeft} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                    <div className="bg-white p-10 md:p-14 border border-gray-100 institutional-shadow hover:institutional-shadow-strong transition-all h-full flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-brand-soft rounded-none mb-8 flex items-center justify-center border border-brand/10">
                            <span className="text-2xl font-bold text-brand">03</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4 tracking-tight">Ambiental y Tecnológica</h2>
                        <div className="w-12 h-1 bg-brand mb-6"></div>
                        <p className="text-gray-600 mb-10 flex-grow text-base font-light leading-relaxed">
                            Producción responsable alineada a la Agenda 2030. Adopción de prácticas agroecológicas bajo sombra para conservación de biodiversidad y mejora de sistemas de beneficio.
                        </p>
                        <Link href="/mapa" className="w-full mt-auto">
                            <Button className="w-full rounded-none bg-brand text-white hover:bg-brand-dark transition-colors duration-300 px-8 py-6 text-sm font-semibold uppercase tracking-wide">
                                Ver Mapa
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
