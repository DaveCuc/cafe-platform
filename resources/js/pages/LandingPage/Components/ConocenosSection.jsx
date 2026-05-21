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
        <section className="bg-brand-earth p-20 ">
            <div className=" p-5 rounded-3xl py-15 max-w-7xl mx-auto">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <motion.div {...fadeRight}>
                                <img
                                    src="http://www.ittehuacan.edu.mx/posgrado/wp-content/uploads/2024/03/LOGOS.png"
                                    alt="Sobre nosotros"
                                    className="w-full max-w-[600px] h-auto rounded-lg shadow-lg object-cover bg-white"
                                />
                            </motion.div>
                        </div>
                        <div>
                            <motion.div {...fadeUp}>
                                <h2 className="font-bold text-white mb-4 text-6xl">Conócenos</h2>


                                <div className="text-white mb-4">
                                    <h1 className="text-3xl font-bold">Instituto Tecnológico de Tehuacán (ITT)</h1>
                                    <br />
                                    Institución pública de educación superior perteneciente al Tecnológico Nacional de México. Su misión es formar profesionistas de excelencia y agentes de cambio con trascendencia social, mediante educación de calidad, investigación e innovación tecnológica para impulsar el desarrollo sustentable de la región y del país.
                                </div>
                                <div className="text-white mb-4">
                                    <h1 className="text-3xl font-bold">Departamento de Estudios de Posgrado e Investigación (DEPI)</h1>
                                    <br />
                                    Área estratégica del ITT enfocada en la formación de especialistas e investigadores a nivel posgrado. Impulsa el desarrollo de proyectos científicos, tecnológicos y de innovación orientados a brindar soluciones prácticas y sostenibles a las problemáticas de los sectores productivo, social y ambiental de la región.
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
