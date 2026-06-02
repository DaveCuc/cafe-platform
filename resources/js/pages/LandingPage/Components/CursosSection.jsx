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
                    <span className="inline-block text-brand-mint font-semibold tracking-widest text-sm uppercase mb-6 border-b border-brand-mint pb-1">Desarrollo Sostenible</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8 leading-tight">
                        Únete a nuestra <span className="font-light">comunidad</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white max-w-3xl mx-auto font-light leading-relaxed">
                        Forma parte de la red de prestadores de servicios de la Reserva de la Biosfera Tehuacán-Cuicatlán. Accede a herramientas de profesionalización y aumenta la visibilidad de tu proyecto ecoturístico para fortalecer el desarrollo sostenible de la región.
                    </p>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 relative z-10">
                <motion.div {...fadeRight} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                    <div className="bg-white p-10 md:p-14 border border-gray-100 institutional-shadow hover:institutional-shadow-strong transition-all h-full flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-brand-soft rounded-none mb-8 flex items-center justify-center border border-brand/10">
                            <span className="text-2xl font-bold text-brand">01</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4 tracking-tight">Explora Nuestros Cursos</h2>
                        <div className="w-12 h-1 bg-brand mb-6"></div>
                        <p className="text-gray-600 mb-10 flex-grow text-base font-light leading-relaxed">
                            Capacítate con módulos enfocados en gestión turística, atención al visitante y prácticas de sostenibilidad. Contenido diseñado para mejorar la calidad de tus servicios y fortalecer tus competencias como anfitrión local.
                        </p>
                        <Link href="/cursos" className="w-full">
                            <Button className="w-full rounded-none bg-brand text-white hover:bg-brand-dark transition-colors duration-300 px-8 py-6 text-sm font-semibold uppercase tracking-wide">
                                Conocer Cursos
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                <motion.div {...fadeLeft} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                    <div className="bg-brand-dark p-10 md:p-14 border border-brand-darker institutional-shadow hover:institutional-shadow-strong transition-all h-full flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-brand-darker rounded-none mb-8 flex items-center justify-center border border-brand-mint/10">
                            <span className="text-2xl font-bold text-brand-mint">02</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">Date a Conocer</h2>
                        <div className="w-12 h-1 bg-brand-mint mb-6"></div>
                        <p className="text-white mb-10 flex-grow text-base font-light leading-relaxed">
                            Registra tu iniciativa, alojamiento o recorrido en nuestro directorio digital. Conecta de manera directa con turistas que buscan alternativas de consumo local, experiencias auténticas y responsables dentro de la reserva.
                        </p>
                        <Link href="/directorio" className="w-full">
                            <Button className="w-full rounded-none bg-white text-brand-dark hover:bg-brand-mint transition-colors duration-300 px-8 py-6 text-sm font-semibold uppercase tracking-wide">
                                Ver Directorio
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
