import React from 'react';
import { Preview } from "@/Components/Preview";
import { User, Phone, Mail } from "lucide-react";

const DescriptionSection = ({ trade }) => {
    if (!trade) return null;

    const hasPersonalContact = trade.personal_name || trade.personal_phone || trade.personal_email;

    return (
        <section className="bg-[#3E2E24] relative overflow-hidden">
            {/* Background Decorative Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '36px 36px' }}></div>

            <div className="container max-w-7xl mx-auto px-5 py-16 md:py-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

                    {/* Caja de Descripción */}
                    <div className={`bg-[#F4F1EA] rounded-none shadow-2xl p-8 md:p-12 transition-all duration-500 hover:shadow-xl ${hasPersonalContact ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                        <div className="flex items-center mb-8">

                            <h2 className="text-3xl font-extrabold uppercase tracking-widest text-[#3E2E24]">Descripción</h2>
                        </div>

                        {trade.descripcion_larga ? (
                            <div className="text-justify leading-relaxed">
                                <Preview
                                    value={trade.descripcion_larga}
                                    className="prose prose-lg md:prose-xl max-w-none text-[#3E2E24]/90"
                                />
                            </div>
                        ) : (
                            <p className="text-[#3E2E24]/60 italic text-lg md:text-xl">No hay descripción detallada disponible para este lugar.</p>
                        )}
                    </div>

                    {/* Tarjeta de Contacto Personal (Estilo Business Card Flotante) */}
                    {hasPersonalContact && (
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-none shadow-2xl p-8 md:p-10 text-[#3E2E24] transform transition-all duration-300 hover:-translate-y-2 sticky top-32">
                                <h2 className="text-2xl font-bold uppercase tracking-wider mb-8 text-[#3E2E24] border-b border-[#3E2E24]/20 pb-4">
                                    Contacto Directo
                                </h2>

                                <div className="space-y-8">
                                    {trade.personal_name && (
                                        <div className="flex items-start group">
                                            <div className="bg-[#F4F1EA] p-3 md:p-4 rounded-none mr-5 group-hover:bg-[#3E2E24]/10 transition-colors">
                                                <User className="w-6 h-6 text-[#3E2E24]" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#3E2E24]/60 uppercase tracking-wider font-semibold mb-1">Nombre</p>
                                                <p className="font-bold text-lg md:text-xl">{trade.personal_name}</p>
                                            </div>
                                        </div>
                                    )}

                                    {trade.personal_cargo && (
                                        <div className="flex items-start group">
                                            <div className="bg-[#F4F1EA] p-3 md:p-4 rounded-none mr-5 group-hover:bg-[#3E2E24]/10 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3E2E24]"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#3E2E24]/60 uppercase tracking-wider font-semibold mb-1">Cargo</p>
                                                <p className="font-bold text-lg md:text-xl">{trade.personal_cargo}</p>
                                            </div>
                                        </div>
                                    )}

                                    {trade.personal_phone && (
                                        <div className="flex items-start group">
                                            <div className="bg-[#F4F1EA] p-3 md:p-4 rounded-none mr-5 group-hover:bg-[#3E2E24]/10 transition-colors">
                                                <Phone className="w-6 h-6 text-[#3E2E24]" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#3E2E24]/60 uppercase tracking-wider font-semibold mb-1">Teléfono</p>
                                                <a href={`tel:${trade.personal_phone}`} className="font-bold text-lg md:text-xl hover:opacity-70 transition-opacity">{trade.personal_phone}</a>
                                            </div>
                                        </div>
                                    )}

                                    {trade.personal_email && (
                                        <div className="flex items-start group">
                                            <div className="bg-[#F4F1EA] p-3 md:p-4 rounded-none mr-5 group-hover:bg-[#3E2E24]/10 transition-colors">
                                                <Mail className="w-6 h-6 text-[#3E2E24]" />
                                            </div>
                                            <div className="break-all">
                                                <p className="text-sm text-[#3E2E24]/60 uppercase tracking-wider font-semibold mb-1">Correo Electrónico</p>
                                                <a href={`mailto:${trade.personal_email}`} className="font-bold text-lg md:text-xl hover:opacity-70 transition-opacity">
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