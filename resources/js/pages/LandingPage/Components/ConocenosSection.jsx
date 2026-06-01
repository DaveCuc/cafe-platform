import React from 'react';
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


export default function ConocenosSection() {
    return (
        <section className="bg-brand-earth px-4 py-12 md:px-8 md:py-20">
            <div className="max-w-7xl mx-auto rounded-3xl p-5 md:p-8">
                <div className="container mx-auto px-4">
                    <motion.div {...fadeUp} className="w-full max-w-6xl mx-auto">
                        <h2 className="text-center font-bold text-white mb-10 text-4xl md:text-6xl">Conócenos</h2>

                        <div className="space-y-10 md:space-y-14 text-white">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
                                <motion.div {...fadeRight} className="flex justify-center md:justify-start">
                                    <img
                                        src="/Institution/itt.png"
                                        alt="ITT"
                                        className="w-full max-w-[560px] h-64 sm:h-72 md:h-80 rounded-2xl shadow-lg object-contain bg-white"
                                    />
                                </motion.div>

                                <div className="text-center md:text-left">
                                    <h1 className="text-2xl md:text-3xl font-bold mb-4">Instituto Tecnológico de Tehuacán (ITT)</h1>
                                    <p className="text-sm md:text-base leading-7 text-white/90 max-w-2xl mx-auto md:mx-0">
                                        Institución pública de educación superior perteneciente al Tecnológico Nacional de México. Su misión es formar profesionistas de excelencia y agentes de cambio con trascendencia social, mediante educación de calidad, investigación e innovación tecnológica para impulsar el desarrollo sustentable de la región y del país.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
                                <div className="text-center md:text-right md:order-1">
                                    <h1 className="text-2xl md:text-3xl font-bold mb-4">Departamento de Estudios de Posgrado e Investigación (DEPI)</h1>
                                    <p className="text-sm md:text-base leading-7 text-white/90 max-w-2xl mx-auto md:ml-auto md:mr-0">
                                        Área estratégica del ITT enfocada en la formación de especialistas e investigadores a nivel posgrado. Impulsa el desarrollo de proyectos científicos, tecnológicos y de innovación orientados a brindar soluciones prácticas y sostenibles a las problemáticas de los sectores productivo, social y ambiental de la región.
                                    </p>
                                </div>

                                <motion.div {...fadeLeft} className="flex justify-center md:justify-end md:order-2">
                                    <img
                                        src="/Institution/depi.png"
                                        alt="DEPI"
                                        className="w-full max-w-[560px] h-64 sm:h-72 md:h-80 rounded-2xl shadow-lg object-contain bg-white"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
