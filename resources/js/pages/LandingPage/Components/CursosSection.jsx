import React from 'react';
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
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


export default function CursosSection() {
    return (
        <section className="p-20  mx-auto bg-brand-nine">

            <div className="text-brand-pale container mx-auto px-4 text-center max-w-7xl">
                <motion.div {...fadeUp}>
                    <h1 className="text-6xl font-bold text-brand-pale pale-brand-ink py-5">Únete a nuestra comunidad</h1>
                    <p className="mt-4 text-2xl text-brand-pale max-w-xl mx-auto text-brand-ink">
                        Forma parte de la red de prestadores de servicios de la Reserva de la Biosfera Tehuacán-Cuicatlán. Accede a herramientas de profesionalización y aumenta la visibilidad de tu proyecto ecoturístico para fortalecer el desarrollo sostenible de la región.
                    </p>
                </motion.div>
            </div>

            <div className="container mx-auto px-4 mt-16 max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div {...fadeRight}>
                    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">

                        <h2 className="text-4xl font-bold text-brand-text mb-4">Explora Nuestros Cursos</h2>
                        <p className="text-brand-ink mb-8 flex-grow text-lg ">
                            Capacítate con módulos enfocados en gestión turística, atención al visitante y prácticas de sostenibilidad. Contenido diseñado para mejorar la calidad de tus servicios y fortalecer tus competencias como anfitrión local.
                        </p>
                        <Link href="/cursos">
                            <Button variant="landing_page_secondary" className=" text-white rounded-md px-8 py-6 text-lg">
                                Conocer Cursos
                            </Button>
                        </Link>

                    </div>
                </motion.div>
                <motion.div {...fadeLeft}>
                    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">

                        <h2 className="text-4xl font-bold text-brand-text mb-4">Date a Conocer</h2>
                        <p className="mb-8 flex-grow text-lg">
                            Registra tu iniciativa, alojamiento o recorrido en nuestro directorio digital. Conecta de manera directa con turistas que buscan alternativas de consumo local, experiencias auténticas y responsables dentro de la reserva.
                        </p>
                        <Link href="/directorio">
                            <Button variant="landing_page_secondary" className=" text-white rounded-md px-8 py-6 text-lg">
                                Ver Directorio
                            </Button>
                        </Link>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
