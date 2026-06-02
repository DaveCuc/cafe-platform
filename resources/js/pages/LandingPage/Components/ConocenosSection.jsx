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
            {/* Elegant Background Accents */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-40 transform -skew-x-12 origin-top"></div>
            
            <div className="max-w-7xl mx-auto p-8 md:p-16 bg-white border border-gray-200 institutional-shadow-strong z-10 relative">
                {/* Minimalist corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-brand"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-brand"></div>

                <div className="container mx-auto px-4 relative z-20">
                    <motion.div {...fadeUp} className="w-full max-w-5xl mx-auto">
                        <div className="text-center mb-20 md:mb-28">
                            <h2 className="inline-block font-bold text-brand-dark text-4xl md:text-5xl tracking-tight mb-4">
                                Conócenos
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
                                    <span className="text-brand font-semibold tracking-wider text-sm uppercase mb-2 block">Nuestra Casa de Estudios</span>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-6 text-brand-dark leading-tight">Instituto Tecnológico de Tehuacán (ITT)</h3>
                                    <p className="text-base md:text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto md:mx-0 font-light">
                                        Institución pública de educación superior perteneciente al Tecnológico Nacional de México. Su misión es formar profesionistas de excelencia y agentes de cambio con trascendencia social, mediante educación de calidad, investigación e innovación tecnológica para impulsar el desarrollo sustentable de la región y del país.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                                <div className="text-center md:text-right md:order-1">
                                    <span className="text-brand font-semibold tracking-wider text-sm uppercase mb-2 block">Investigación e Innovación</span>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-6 text-brand-dark leading-tight">Departamento de Estudios de Posgrado e Investigación</h3>
                                    <p className="text-base md:text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto md:ml-auto md:mr-0 font-light">
                                        Área estratégica del ITT enfocada en la formación de especialistas e investigadores a nivel posgrado. Impulsa el desarrollo de proyectos científicos, tecnológicos y de innovación orientados a brindar soluciones prácticas y sostenibles a las problemáticas de los sectores productivo, social y ambiental de la región.
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
