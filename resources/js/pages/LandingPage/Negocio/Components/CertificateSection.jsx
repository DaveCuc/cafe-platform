import React, { useState } from "react";
import { FileText, Calendar, Award, ZoomIn, X } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";

export const CertificateSection = ({ certificates }) => {
    const [selectedCert, setSelectedCert] = useState(null);

    if (!certificates || certificates.length === 0) return null;

    return (
        <section className="relative bg-[#F4F1EA] overflow-hidden">
            {/* Background Decorative Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3E2E24 1.5px, transparent 1.5px)', backgroundSize: '36px 36px' }}></div>

            <div className="container max-w-7xl mx-auto px-5 py-12 md:py-16 relative z-10">
                <div className="mb-12 flex flex-col items-center justify-center text-center">

                    <h2 className="text-4xl font-extrabold uppercase tracking-widest text-[#3E2E24] mb-6 text-center">
                        Certificaciones y Reconocimientos
                    </h2>
                    <p className="text-[#3E2E24]/80 text-lg max-w-3xl font-light leading-relaxed">
                        Este negocio cuenta con distintivos oficiales que garantizan y respaldan la excelencia, autenticidad y calidad de sus servicios.
                    </p>
                </div>

                <div className="relative px-4 md:px-12">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: false,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className={`-ml-6 py-6 ${certificates.length < 3 ? 'md:justify-center' : ''}`}>
                            {certificates.map((cert) => {
                                const isPdf = cert.file_url.endsWith('.pdf');
                                return (
                                    <CarouselItem key={cert.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                                        <button
                                            onClick={() => setSelectedCert(cert)}
                                            className="block w-full h-full group outline-none text-left"
                                        >
                                            <div className="h-full bg-white relative shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col hover:-translate-y-2">

                                                {/* Image / Icon Container */}
                                                <div className="h-64 bg-[#f8f9fa] flex items-center justify-center relative overflow-hidden">
                                                    {isPdf ? (
                                                        <div className="absolute inset-0 bg-white flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                                                            <FileText className="h-24 w-24 text-[#3E2E24] opacity-40 group-hover:opacity-80 transition-opacity duration-500 drop-shadow-sm" />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <img
                                                                src={cert.file_url}
                                                                alt={cert.name}
                                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                            />
                                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-[#3E2E24]/20 transition-colors duration-500" />
                                                        </>
                                                    )}

                                                    {/* Hover Overlay Icon */}
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none">
                                                        <div className="bg-[#3E2E24] text-[#F4F1EA] p-4 rounded-full shadow-2xl transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                                            <ZoomIn className="w-6 h-6" />
                                                        </div>
                                                    </div>

                                                    {/* Tag */}
                                                    <div className="absolute top-4 left-4 bg-[#3E2E24] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#F4F1EA] shadow-md z-10">
                                                        Documento Oficial
                                                    </div>
                                                </div>

                                                {/* Text Content */}
                                                <div className="p-8 flex flex-col flex-grow bg-white relative z-10">
                                                    <h3 className="font-bold text-xl text-[#3E2E24] mb-6 line-clamp-2 leading-snug transition-colors duration-300">
                                                        {cert.name}
                                                    </h3>
                                                    {cert.issued_at && (
                                                        <div className="flex items-center text-sm text-[#3E2E24]/70 font-medium mt-auto">
                                                            <Calendar className="h-4 w-4 mr-2 text-[#3E2E24]/60" />
                                                            <span>Emitido el {new Date(cert.issued_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>

                        {/* Custom Nav Buttons - Responsivos (desaparecen automáticamente si los elementos caben en la pantalla) */}
                        {certificates.length > 1 && (
                            <>
                                <CarouselPrevious className="-left-4 md:-left-12 h-12 w-12 md:h-14 md:w-14 bg-white rounded-none border-transparent shadow-lg text-[#3E2E24] hover:bg-[#3E2E24] hover:text-[#F4F1EA] transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none" />
                                <CarouselNext className="-right-4 md:-right-12 h-12 w-12 md:h-14 md:w-14 bg-white rounded-none border-transparent shadow-lg text-[#3E2E24] hover:bg-[#3E2E24] hover:text-[#F4F1EA] transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none" />
                            </>
                        )}
                    </Carousel>
                </div>
            </div>

            {/* Modal para previsualizar el certificado */}
            {selectedCert && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 transition-opacity">
                    <div
                        className="absolute inset-0"
                        onClick={() => setSelectedCert(null)}
                    ></div>
                    <div className="relative w-full max-w-5xl h-full max-h-[90vh] bg-white shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300 rounded-none z-10 border-t-4 border-[#3E2E24]">
                        {/* Header Modal */}
                        <div className="flex items-center justify-between p-4 border-b border-[#3E2E24]/10 bg-white">
                            <h3 className="font-bold text-xl text-[#3E2E24] truncate pr-4">{selectedCert.name}</h3>
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="p-2 text-[#3E2E24]/60 hover:text-[#3E2E24] hover:bg-[#F4F1EA] transition-colors rounded-none outline-none focus:ring-2 focus:ring-[#3E2E24]"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Body Modal */}
                        <div className="flex-grow overflow-hidden relative bg-gray-50 flex items-center justify-center p-2">
                            {selectedCert.file_url.endsWith('.pdf') ? (
                                <iframe
                                    src={selectedCert.file_url}
                                    className="w-full h-full border-0 shadow-inner"
                                    title={selectedCert.name}
                                />
                            ) : (
                                <img
                                    src={selectedCert.file_url}
                                    alt={selectedCert.name}
                                    className="max-w-full max-h-full object-contain drop-shadow-lg"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
