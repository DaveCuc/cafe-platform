import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { motion } from "framer-motion";

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
};

export default function MapSection() {
    const rutas = [
        {
            titulo: "Meta 1: Trazabilidad y Ubicación",
            descripcion: "Mapeo territorial de proveedores y tiendas de café. Permite a los compradores y clientes geolocalizar fincas productoras y puntos de venta de café de especialidad de la Sierra Negra.",
            imageUrl: "/Fotos/Recorridos/onix.jpg",
            align: "left"
        },
        {
            titulo: "Meta 2: Profesionalización y Cursos",
            descripcion: "Capacitación constante a productores y vendedores locales. Programas de tecnificación agrícola y comercialización digital para aumentar la competitividad de la cadena de valor.",
            imageUrl: "/Fotos/Recorridos/dinosaurios.jpg",
            align: "right"
        },
        {
            titulo: "Meta 3: Articulación Comercial",
            descripcion: "Directorio interactivo de clientes y proveedores que conecta directamente a los caficultores de la Sierra Negra con mercados locales, nacionales y de comercio justo.",
            imageUrl: "/Fotos/Recorridos/mezcal.jpg",
            align: "left"
        },
    ];

    return (
        <section className="bg-brand-dark py-20 lg:py-28 relative overflow-hidden">
            {/* Soft Background pattern/accent */}

            <div className="container max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">

                {/* Textos a conservar intactos */}
                <motion.div {...fadeUp} className="text-center max-w-3xl mb-16 md:mb-24 relative z-20">
                    <span className="inline-block text-brand-mint font-semibold tracking-widest text-sm uppercase mb-4 border-b border-brand-mint pb-1">Objetivos del Clúster</span>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight text-white">Metas de la Red <br /><span className="text-brand-mint font-light">de Caficultores</span></h2>
                    <p className="text-white mb-10 text-lg leading-relaxed font-light">A través del Clúster Cafetalero de la Sierra Negra, implementamos metas y rutas estratégicas de comercialización, capacitación y digitalización para integrar a los productores, tiendas locales y proveedores en un modelo de prosperidad y gobernanza local.</p>
                </motion.div>

                {/* Road and Cards Container */}
                <div className="relative w-full max-w-5xl mx-auto pb-10">

                    {/* SVG Winding Road Background (Versión Original Suave - Corregida y Ensanchada) */}
                    <svg
                        className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[240px] md:w-[450px] lg:w-[600px] z-0 drop-shadow-2xl"
                        preserveAspectRatio="none"
                        viewBox="-150 0 500 1200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Outer White Edge */}
                        <path
                            d="M100 0 C 300 150, 300 250, 100 400 C -100 550, -100 650, 100 800 C 300 950, 300 1050, 100 1200"

                            strokeWidth="96"
                            strokeOpacity="0.2"
                            strokeLinecap="butt"
                            className="z-[-1]"
                        />
                        {/* Asphalt */}
                        <path
                            d="M100 0 C 300 150, 300 250, 100 400 C -100 550, -100 650, 100 800 C 300 950, 300 1050, 100 1200"
                            stroke="#1a1a1a"
                            strokeWidth="80"
                            strokeLinecap="butt"
                        />
                        {/* Dashed Line */}
                        <path
                            d="M100 0 C 300 150, 300 250, 100 400 C -100 550, -100 650, 100 800 C 300 950, 300 1050, 100 1200"
                            stroke="#ffffff"
                            strokeWidth="10"
                            strokeDasharray="20 40"
                        />
                    </svg>

                    {/* Rutas (Cards + Pins) */}
                    <div className="relative z-10 flex flex-col gap-16 md:gap-32 py-10">
                        {rutas.map((ruta, index) => {
                            const isLeft = ruta.align === 'left';

                            return (
                                <div key={index} className={`flex flex-col md:flex-row items-center justify-center w-full relative ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                                    {/* Card */}
                                    <motion.div
                                        className={`w-full md:w-[45%] flex ${isLeft ? 'md:justify-end' : 'md:justify-start'} px-4 md:px-0`}
                                        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <div className="bg-white p-6 md:p-8 w-full max-w-md shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] relative z-20 group hover:-translate-y-2 transition-transform duration-300">
                                            <div className="mb-6">
                                                <h3 className="text-xl md:text-2xl font-bold text-brand-darker mb-3">{ruta.titulo}</h3>
                                                <p className="text-gray-600 font-light text-sm md:text-base leading-relaxed">
                                                    {ruta.descripcion}
                                                </p>
                                            </div>
                                            <div className="overflow-hidden w-full relative">
                                                <img
                                                    src={ruta.imageUrl}
                                                    alt={ruta.titulo}
                                                    className="w-full h-48 md:h-56 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Map Pin */}
                                    <div className="hidden md:flex w-[10%] justify-center relative z-30">
                                        <motion.div
                                            className="text-[#dc2626] drop-shadow-2xl"
                                            style={{ transform: `translateX(${isLeft ? 'clamp(60px, 16vw, 200px)' : 'clamp(-60px, -16vw, -200px)'})` }}
                                            initial={{ scale: 0, y: -20 }}
                                            whileInView={{ scale: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                                        >
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 lg:w-24 lg:h-24 -mt-8">
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                                <circle cx="12" cy="9" r="3" fill="#ffffff" />
                                            </svg>
                                        </motion.div>
                                    </div>

                                    {/* Empty space for the other side (with Decorative Graphics) */}
                                    <div className="hidden md:flex flex-col items-center justify-center md:w-[45%] h-full absolute md:relative pointer-events-none z-0">
                                        {/* Elementos Ruta 1 */}
                                        {index === 0 && (
                                            <>
                                                <motion.img
                                                    animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                                                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                                    src="/Decorativo/onix.svg"
                                                    className="absolute w-48 lg:w-64  filter invert top-[20%] right-[10%] lg:right-[20%]"
                                                    alt="decorativo mapa"
                                                />
                                            </>
                                        )}
                                        {/* Elementos Ruta 2 */}
                                        {index === 1 && (
                                            <>
                                                <motion.img
                                                    animate={{ y: [0, -10, 0], rotate: [-10, 0, -10] }}
                                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                                    src="/Decorativo/huella.svg"
                                                    className="absolute w-32 lg:w-48  filter invert top-[10%] left-[10%] lg:left-[20%]"
                                                    alt="decorativo huella"
                                                />
                                                <motion.img
                                                    animate={{ y: [0, 10, 0], rotate: [10, 20, 10] }}
                                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                                    src="/Decorativo/huella.svg"
                                                    className="absolute w-20 lg:w-32  filter invert bottom-[10%] right-[10%] lg:right-[30%]"
                                                    alt="decorativo huella"
                                                />
                                            </>
                                        )}
                                        {/* Elementos Ruta 3 */}
                                        {index === 2 && (
                                            <>
                                                <motion.img
                                                    animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                                                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                                                    src="/Decorativo/mezcal.svg"
                                                    className="absolute w-48 lg:w-64  filter invert top-[5%] left-[5%] lg:left-[10%]"
                                                    alt="decorativo agave"
                                                />
                                                <motion.img
                                                    animate={{ y: [0, 10, 0], rotate: [-15, -5, -15] }}
                                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                                    src="/Decorativo/caballito.svg"
                                                    className="absolute w-20 lg:w-28  filter invert top-[40%] right-[10%] lg:right-[20%]"
                                                    alt="decorativo caballito"
                                                />
                                                <motion.img
                                                    animate={{ scale: [1, 1.05, 1], rotate: [10, 15, 10] }}
                                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                                    src="/Decorativo/corazon.svg"
                                                    className="absolute w-32 lg:w-40  filter invert bottom-[5%] left-[20%] lg:left-[30%]"
                                                    alt="decorativo corazon"
                                                />
                                            </>
                                        )}
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Botón intacto (Tamaño aumentado) */}
                <motion.div {...fadeUp} className="mt-20 md:mt-32 relative z-20">
                    <Button asChild className="rounded-none bg-brand-mint text-brand-darker hover:bg-white transition-colors duration-300 px-12 py-8 text-lg lg:text-xl text-[#052e16] font-bold tracking-widest shadow-2xl hover:-translate-y-1">
                        <Link href="/mapa">Ver mapa completo</Link>
                    </Button>
                </motion.div>

            </div>
        </section>
    );
}
