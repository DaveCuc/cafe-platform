import React from 'react';
import { Preview } from "@/Components/Preview";
import { User, Phone, Mail } from "lucide-react";

const DescriptionSection = ({ trade }) => {
    if (!trade) return null;

    const hasPersonalContact = trade.personal_name || trade.personal_phone || trade.personal_email;

    return (
        <section className="bg-[#F4F1EA] relative overflow-hidden">
            <div className="container max-w-7xl mx-auto px-5 py-16 md:py-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                    
                    {/* Caja de Descripción */}
                    <div className={`bg-white rounded-none shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-8 md:p-12 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] ${hasPersonalContact ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                        <div className="flex items-center mb-8">
                            <div className="w-12 h-12 bg-brand-soft/50 rounded-none flex items-center justify-center mr-4 text-brand-darker">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                            </div>
                            <h2 className="text-3xl font-extrabold uppercase tracking-widest text-brand-darker">Descripción</h2>
                        </div>
                        
                        {trade.descripcion_larga ? (
                            <div className="prose prose-sm md:prose-base max-w-none text-brand-ink/90 text-justify text-lg leading-relaxed">
                                <Preview value={trade.descripcion_larga} />
                            </div>
                        ) : (
                            <p className="text-brand-ink/60 italic text-lg">No hay descripción detallada disponible para este lugar.</p>
                        )}
                    </div>

                    {/* Tarjeta de Contacto Personal (Estilo Business Card Flotante) */}
                    {hasPersonalContact && (
                        <div className="lg:col-span-1">
                            <div className="bg-[#3E2E24] rounded-none shadow-[0_15px_40px_rgba(0,0,0,0.15)] p-8 text-white transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] sticky top-32">
                                <h2 className="text-xl font-bold uppercase tracking-wider mb-8 text-[#F4F1EA] border-b border-white/20 pb-4">
                                    Contacto Directo
                                </h2>
                                
                                <div className="space-y-6">
                                    {trade.personal_name && (
                                        <div className="flex items-start group">
                                            <div className="bg-white/10 p-2 rounded-none mr-4 group-hover:bg-[#F4F1EA]/20 transition-colors">
                                                <User className="w-5 h-5 text-[#F4F1EA]" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-white/60 uppercase tracking-wider font-semibold mb-1">Nombre</p>
                                                <p className="font-medium text-lg">{trade.personal_name}</p>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {trade.personal_cargo && (
                                        <div className="flex items-start group">
                                            <div className="bg-white/10 p-2 rounded-none mr-4 group-hover:bg-[#F4F1EA]/20 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#F4F1EA]"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                                            </div>
                                            <div>
                                                <p className="text-xs text-white/60 uppercase tracking-wider font-semibold mb-1">Cargo</p>
                                                <p className="font-medium">{trade.personal_cargo}</p>
                                            </div>
                                        </div>
                                    )}

                                    {trade.personal_phone && (
                                        <div className="flex items-start group">
                                            <div className="bg-white/10 p-2 rounded-none mr-4 group-hover:bg-[#F4F1EA]/20 transition-colors">
                                                <Phone className="w-5 h-5 text-[#F4F1EA]" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-white/60 uppercase tracking-wider font-semibold mb-1">Teléfono</p>
                                                <a href={`tel:${trade.personal_phone}`} className="font-medium hover:text-[#F4F1EA] transition-colors">{trade.personal_phone}</a>
                                            </div>
                                        </div>
                                    )}

                                    {trade.personal_email && (
                                        <div className="flex items-start group">
                                            <div className="bg-white/10 p-2 rounded-none mr-4 group-hover:bg-[#F4F1EA]/20 transition-colors">
                                                <Mail className="w-5 h-5 text-[#F4F1EA]" />
                                            </div>
                                            <div className="break-all">
                                                <p className="text-xs text-white/60 uppercase tracking-wider font-semibold mb-1">Correo Electrónico</p>
                                                <a href={`mailto:${trade.personal_email}`} className="font-medium hover:text-[#F4F1EA] transition-colors">
                                                    {trade.personal_email}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default DescriptionSection;