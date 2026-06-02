import React from 'react';
import { Link } from '@inertiajs/react';
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardTitle } from "@/Components/ui/card";
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NewsSection({ recentEvents = [] }) {
    const fadeUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    return (
        <section className="bg-brand-pale py-16 md:py-24 border-b border-gray-200">
            <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                <motion.div {...fadeUp}>
                    <div className="text-center mb-16 md:mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark tracking-tight mb-4">Eventos Recientes</h2>
                        <div className="w-24 h-1 bg-brand mx-auto mb-6"></div>
                        <p className="text-brand-dark/80 text-lg md:text-xl font-medium max-w-2xl mx-auto">Mantente al día con las últimas novedades y actividades de nuestra institución.</p>
                    </div>
                </motion.div>
                
                {recentEvents.length === 0 ? (
                    <div className="text-center text-brand-dark/70 py-12 text-lg">
                        No hay eventos recientes publicados.
                    </div>
                ) : (
                    <motion.div {...fadeUp}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {recentEvents.map((event) => (
                                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} key={event.id}>
                                    <Card className="group relative min-h-[460px] overflow-hidden rounded-none border border-gray-200 bg-white institutional-shadow hover:institutional-shadow-strong transition-all duration-300 flex flex-col">
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={event.image_url || '/storage/landing-page/placeholder.jpg'}
                                                alt={event.title}
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500" />
                                        </div>

                                        <div className="relative z-10 flex flex-col flex-grow p-6 md:p-8 bg-white border-t border-gray-100">
                                            <div className="flex items-center justify-between mb-4">
                                                <Badge variant="outline" className="rounded-none border-brand text-brand px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-brand-soft/30">
                                                    {event.topics && event.topics.length > 0 ? event.topics[0] : 'Evento'}
                                                </Badge>
                                                {event.event_date && (
                                                    <span className="text-xs font-semibold text-brand-dark/60 uppercase tracking-wider">
                                                        {new Date(event.event_date.substring(0, 10) + 'T12:00:00').toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                                )}
                                            </div>

                                            <CardTitle className="mb-4 text-2xl font-bold leading-tight text-brand-dark line-clamp-2 group-hover:text-brand transition-colors duration-300">
                                                {event.title}
                                            </CardTitle>

                                            <p className="mb-8 text-base leading-relaxed text-gray-600 line-clamp-3 flex-grow">
                                                {event.short_description || "Descubre más detalles sobre este evento y participa en nuestras actividades."}
                                            </p>

                                            <Button asChild className="w-full rounded-none bg-brand text-white hover:bg-brand-dark transition-colors duration-300 py-6 text-sm font-semibold tracking-wide">
                                                <Link href={`/eventos/${event.id}`} className="inline-flex items-center justify-center gap-2">
                                                    Ver Detalles
                                                    <ArrowUpRight className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
