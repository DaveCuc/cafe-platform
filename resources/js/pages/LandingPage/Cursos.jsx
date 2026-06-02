import React from "react";
import { Head } from '@inertiajs/react';
import HomeLayout from '@/Layouts/HomeLayout';
import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/Components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
};
const fadeRight = {
    initial: { opacity: 0, x: -40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
};
const fadeLeft = {
    initial: { opacity: 0, x: 40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
};

const imageModules = import.meta.glob('/public/Directorios/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true,
    import: 'default',
});

const carouselImages = Object.values(imageModules).sort((a, b) => String(a).localeCompare(String(b)));

const RegistroSection = () => {
    return (
        <section className="bg-brand-mint py-24 border-t border-brand-darker">
            <div className="container mx-auto text-center px-4 max-w-3xl">
                <motion.div {...fadeUp}>
                    <span className="inline-block text-brand-darker font-bold tracking-widest text-sm uppercase mb-4 border-b border-[#052e16] pb-1">Profesionalización</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-brand-darker tracking-tight">¿Te gustaría formar parte?</h2>
                    <p className="text-brand-dark text-lg mb-10 font-medium">
                        Explora nuestra oferta educativa y comienza tu proceso de capacitación y certificación hoy mismo.
                    </p>
                </motion.div>
                <motion.div {...fadeUp}>
                    <Button
                        size="lg"
                        className="rounded-none bg-[#052e16] text-white hover:bg-white hover:text-brand-dark transition-colors duration-300 px-10 py-6 text-sm font-semibold uppercase tracking-wide"
                        onClick={() => window.location.assign("/search")}
                    >
                        Buscar Cursos
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}

const CursoSection = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-rose-950 pt-20 pb-24">
            <Carousel plugins={[Autoplay({ delay: 6000, stopOnInteraction: false })]} className="absolute inset-0 w-full h-full" opts={{ loop: true }}>
                <CarouselContent>
                    {(carouselImages.length ? carouselImages : Array.from({ length: 5 }, (_, index) => `https://picsum.photos/1920/1080?random=${index + 1}`)).map((imageSrc, index) => (
                        <CarouselItem key={`${imageSrc}-${index}`}>
                            <div className="relative w-full h-full">
                                <img
                                    src={imageSrc}
                                    alt={`Paisaje Formación ${index + 1}`}
                                    className="object-cover w-full h-full absolute inset-0"
                                    onError={(e) => { e.target.src = 'https://picsum.photos/1920/1080?random=' + index; }}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent >
            </Carousel>

            {/* Deep maroon (guinda) overlay for maximum contrast and elegance */}
            <div className="absolute inset-0 bg-rose-950/85 backdrop-blur-[2px]" />

            <div className="container mx-auto px-4 relative z-10 max-w-7xl mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <motion.div {...fadeUp} >
                            <span className="inline-block text-rose-400 font-semibold tracking-widest text-sm uppercase mb-4 border-b border-rose-400 pb-1">Formación Continua</span>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">Cursos</h1>
                        </motion.div>
                        <motion.div {...fadeUp} >
                            <p className="text-white font-light mb-8 text-2xl md:text-3xl">Capacitación <span className="font-bold text-rose-500">Certificada</span></p>
                        </motion.div>
                        <motion.div {...fadeUp} >
                            <p className="text-gray-200 mb-6 text-lg leading-relaxed font-light">
                                Nuestro programa de formación está diseñado para empoderar a los prestadores de servicios turísticos locales. A través de módulos especializados en gestión, prácticas de sostenibilidad y atención al visitante, brindamos las herramientas necesarias para elevar la calidad de las experiencias dentro de la Reserva.
                            </p>
                        </motion.div>
                        <motion.div {...fadeUp} >
                            <p className="text-gray-200 mb-8 text-lg leading-relaxed font-light">
                                Todos los cursos cuentan con el respaldo académico y la certificación del Instituto Tecnológico de Tehuacán (ITT) y el Departamento de Estudios de Posgrado e Investigación (DEPI). Esta alianza garantiza un estándar de excelencia y avala la profesionalización técnica de las comunidades.
                            </p>
                        </motion.div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <motion.div {...fadeLeft} className="relative">
                            <div className="absolute -inset-4 bg-rose-500/10 blur-xl z-0"></div>
                            <div className="bg-white p-8 md:p-12 relative z-10 rounded-none shadow-2xl border border-rose-900/20 institutional-shadow-strong flex flex-col md:flex-row items-center justify-center gap-8">
                                <img
                                    src="/Institution/itt.png"
                                    alt="Logo ITT"
                                    className="h-32 md:h-40 w-auto object-contain"
                                />
                                <div className="hidden md:block w-px h-32 bg-gray-200"></div>
                                <img
                                    src="/Institution/depi.png"
                                    alt="Logo DEPI"
                                    className="h-32 md:h-40 w-auto object-contain"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const TeacherSection = () => {
    return (
        <section className="bg-brand py-24 border-t border-brand-darker">
            <div className="container mx-auto px-4 text-center max-w-6xl">
                <motion.div {...fadeUp} >
                    <span className="inline-block text-brand-mint font-semibold tracking-widest text-sm uppercase mb-4 border-b border-brand-mint pb-1">Excelencia Académica</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white tracking-tight">Conoce a Nuestro Profesorado</h2>
                </motion.div>
                <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    <motion.div {...fadeRight} >
                        <div className="bg-white p-10 rounded-none border border-brand-dark institutional-shadow hover:institutional-shadow-strong hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
                            <img
                                src="https://i.pravatar.cc/200?img=68"
                                alt="Foto del Profesor 1"
                                className="w-40 h-40 rounded-none mx-auto mb-8 object-cover border-4 border-brand-soft shadow-md"
                            />
                            <h3 className="text-2xl font-bold mb-3 text-brand-darker">Dr. Roberto Sánchez</h3>
                            <p className="text-gray-600 font-light leading-relaxed flex-grow">
                                Especialista en turismo sustentable y desarrollo comunitario. Con más de 15 años de experiencia implementando estrategias de ecoturismo en áreas naturales protegidas.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div {...fadeLeft} >
                        <div className="bg-white p-10 rounded-none border border-brand-dark institutional-shadow hover:institutional-shadow-strong hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
                            <img
                                src="https://i.pravatar.cc/200?img=60"
                                alt="Foto del Profesor 2"
                                className="w-40 h-40 rounded-none mx-auto mb-8 object-cover border-4 border-brand-soft shadow-md"
                            />
                            <h3 className="text-2xl font-bold mb-3 text-brand-darker">Dra. Elena Mendoza</h3>
                            <p className="text-gray-600 font-light leading-relaxed flex-grow">
                                Investigadora principal del ITT en gestión de patrimonio biocultural. Dedicada a la vinculación académica para la preservación de tradiciones y el aprovechamiento responsable del entorno.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default function Cursos() {
    return (
        <HomeLayout>
            <Head title="Cursos y Capacitación" />
            <CursoSection />
            <TeacherSection />
            <RegistroSection />
        </HomeLayout>
    );
}
