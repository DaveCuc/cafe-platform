import React from 'react';
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

export default function ConocenosSection() {
    return (
        <section className="bg-brand-pale px-4 py-20 md:px-8 md:py-32 relative overflow-hidden">


            <div className="max-w-7xl mx-auto p-8 md:p-16 bg-white border border-gray-200 institutional-shadow-strong z-10 relative">
                {/* Minimalist corner accents */}



                <div className="container mx-auto px-4 relative z-20">
                    <motion.div {...fadeUp} className="w-full max-w-5xl mx-auto">
                        <div className="text-center mb-20 md:mb-28">
                            <h2 className="inline-block font-bold text-brand-dark text-4xl md:text-5xl tracking-tight mb-4">
                                Contexto y Problemática
                            </h2>
                            <div className="w-24 h-1 bg-brand mx-auto"></div>
                        </div>

                        <div className="space-y-20 md:space-y-32">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                                <motion.div {...fadeRight} className="flex justify-center md:justify-start">
                                    <div className="p-4 bg-white border border-gray-100 institutional-shadow hover:institutional-shadow-strong transition-shadow duration-300">
                                        <img
                                            src="/Institution/itt.png"
                                            alt="ITT"
                                            className="w-full max-w-[500px] h-64 sm:h-72 md:h-80 rounded-none object-contain bg-white"
                                        />
                                    </div>
                                </motion.div>

                                <div className="text-center md:text-left">
                                    <span className="text-brand font-semibold tracking-wider text-sm uppercase mb-2 block">Ventajas Competitivas</span>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-6 text-brand-dark leading-tight">La Caficultura en la Sierra Negra de Puebla</h3>
                                    <p className="text-base md:text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto md:mx-0 font-light">
                                        La caficultura en la Sierra Negra de Puebla es una actividad estratégica en las dimensiones económica, social y ambiental. La región cuenta con ventajas competitivas excepcionales como suelos volcánicos fértiles, microclimas favorables y una valiosa experiencia agrícola heredada generación tras generación.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                                <div className="text-center md:text-right md:order-1">
                                    <span className="text-brand font-semibold tracking-wider text-sm uppercase mb-2 block">Desafíos del Sector</span>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-6 text-brand-dark leading-tight">Limitaciones y Desafíos Actuales</h3>
                                    <p className="text-base md:text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto md:ml-auto md:mr-0 font-light">
                                        La producción cafetalera de la región está dominada por pequeñas parcelas (menores a 3 hectáreas) con baja tecnificación e infraestructura de beneficio deficiente. Esto da como resultado rendimientos promedio de apenas 6 a 8 quintales por hectárea, muy por debajo de la media nacional, aunado a una débil gobernanza y articulación institucional.
                                    </p>
                                </div>

                                <motion.div {...fadeLeft} className="flex justify-center md:justify-end md:order-2">
                                    <div className="p-4 bg-white border border-gray-100 institutional-shadow hover:institutional-shadow-strong transition-shadow duration-300">
                                        <img
                                            src="/Institution/depi.png"
                                            alt="DEPI"
                                            className="w-full max-w-[500px] h-64 sm:h-72 md:h-80 rounded-none object-contain bg-white"
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
