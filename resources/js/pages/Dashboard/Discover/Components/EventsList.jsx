import React from "react";
import { Link } from '@inertiajs/react';
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardTitle } from "@/Components/ui/card";
import { ArrowUpRight } from 'lucide-react';

export const EventsList = ({ items = [] }) => {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((event) => (
                    <Card key={event.id} className="group relative min-h-[400px] overflow-hidden rounded-none border-0 bg-black shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
                        <img
                            src={event.image_url || '/storage/landing-page/placeholder.jpg'}
                            alt={event.title}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

                        <div className="relative z-10 flex h-full flex-col justify-end p-5">
                            <Badge variant="outline" className="mb-3 w-fit rounded-none border-white/35 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                                {event.topics && event.topics.length > 0 ? event.topics[0] : 'Evento'}
                            </Badge>

                            <CardTitle className="mb-2 text-xl font-bold leading-tight text-white line-clamp-2">
                                {event.title}
                            </CardTitle>

                            <p className="mb-3 text-sm leading-relaxed text-white/90 line-clamp-2">
                                {event.short_description || "Descubre más detalles sobre este evento."}
                            </p>

                            {event.event_date && (
                                <p className="mb-4 text-sm font-bold text-white">
                                    {new Date(event.event_date.substring(0, 10) + 'T12:00:00').toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                            )}

                            <Button asChild variant="landing_page_secondary" className="w-fit rounded-none px-4 py-2 text-xs font-semibold uppercase tracking-wider">
                                <Link href={`/eventos/${event.id}`} className="inline-flex items-center gap-1.5">
                                    Ver Detalles
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </Link>
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
            
            {items.length === 0 && (
                <div className="text-center text-sm text-brand-ink mt-10">
                    No se encontraron eventos próximos
                </div>
            )}
        </div>
    );
};
