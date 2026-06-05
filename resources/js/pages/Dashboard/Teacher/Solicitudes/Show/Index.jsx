import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { ArrowLeft, CheckCircle, XCircle, FileText, Image as ImageIcon } from "lucide-react";

import MainLayout from "@/Layouts/MainLayout";
import { Banner } from "@/Components/banner";
import { Button } from "@/Components/ui/button";
import { Preview } from "@/Components/Preview";
import { Textarea } from "@/Components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

export default function TeacherSolicitudShow({ trade }) {
    const [isRejectOpen, setIsRejectOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");

    const approve = () => {
        router.patch(`/teacher/solicitudes/${trade.id}/approve`);
    };

    const reject = () => {
        if (!rejectReason.trim()) return;
        router.patch(`/teacher/solicitudes/${trade.id}/reject`, { rejection_reason: rejectReason }, {
            onSuccess: () => {
                setIsRejectOpen(false);
                setRejectReason("");
            }
        });
    };

    const canReview = trade.status === "pending";

    return (
        <MainLayout>
            <Head title={`Solicitud: ${trade.comercial_name || "Sin Nombre"}`} />

            {trade.status === "pending" && (
                <Banner
                    variant="warning"
                    label="Solicitud pendiente de revisión."
                />
            )}

            {trade.status === "approved" && (
                <Banner
                    variant="success"
                    label="Solicitud aprobada y visible públicamente."
                />
            )}

            {trade.status === "rejected" && (
                <Banner
                    variant="warning"
                    label="Solicitud rechazada."
                />
            )}

            <div className="mx-auto max-w-6xl p-6 pb-20">
                <Link href="/teacher/solicitudes" className="mb-6 inline-flex items-center text-sm hover:opacity-80">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a solicitudes
                </Link>

                {trade.rejection_reason && (
                    <div className="mb-6 rounded-none border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm">
                        <h3 className="font-bold text-base">Motivo de rechazo anterior reportado al negocio:</h3>
                        <p className="mt-1 text-sm">{trade.rejection_reason}</p>
                    </div>
                )}

                <div className="rounded-none border bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-6">
                        <div className="flex items-center gap-4">
                            {trade.image_url ? (
                                <img src={trade.image_url} alt={trade.comercial_name} className="h-20 w-20 rounded-none object-cover border" />
                            ) : (
                                <div className="flex h-20 w-20 items-center justify-center rounded-none bg-white text-brand-ink border border-brand-soft">
                                    Sin foto
                                </div>
                            )}
                            <div>
                                <h1 className="text-2xl font-bold text-brand-text">{trade.comercial_name || "Nombre Comercial No Definido"}</h1>
                                <p className="mt-1 text-sm text-brand-ink">
                                    Solicitante: {trade.user?.name || "Sin usuario"} ({trade.user?.email || "sin correo"})
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-4 sm:mt-0">
                            <Button
                                onClick={approve}
                                disabled={!canReview}
                                className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider"
                            >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Aprobar
                            </Button>

                            <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        disabled={!canReview}
                                        variant="destructive"
                                        className="rounded-none font-bold uppercase tracking-wider"
                                    >
                                        <XCircle className="mr-2 h-4 w-4" />
                                        Rechazar
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="rounded-none">
                                    <DialogHeader>
                                        <DialogTitle>Rechazar Solicitud</DialogTitle>
                                        <DialogDescription>
                                            Por favor, indica el motivo del rechazo. Este comentario será visible para el solicitante.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Textarea
                                        value={rejectReason}
                                        onChange={(e) => setRejectReason(e.target.value)}
                                        placeholder="Escribe el motivo del rechazo aquí..."
                                        className="min-h-[100px] rounded-none border-brand-soft focus-visible:ring-brand"
                                    />
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsRejectOpen(false)} className="rounded-none">Cancelar</Button>
                                        <Button variant="destructive" onClick={reject} disabled={!rejectReason.trim()} className="rounded-none">Confirmar Rechazo</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                        {/* Banner de comentario de rechazo */}
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Columna Izquierda */}
                        <div className="space-y-8">
                            <section>
                                <h2 className="mb-3 text-lg font-semibold text-brand-text">Acerca del negocio</h2>
                                <div className="space-y-4 rounded-none border border-brand-soft bg-white p-5 text-sm text-brand-ink">
                                    <div>
                                        <span className="font-bold">Giros: </span>
                                        {(trade.giros || []).length
                                            ? trade.giros.map((giro) => giro.name).join(", ")
                                            : "Sin giros"}
                                    </div>
                                    <div>
                                        <span className="font-bold">Descripción Corta: </span>
                                        <p className="mt-1">{trade.descripcion_corta || "Sin descripción corta"}</p>
                                    </div>
                                    <div>
                                        <span className="font-bold">Descripción Larga: </span>
                                        {trade.descripcion_larga ? (
                                            <div className="mt-2 rounded-none bg-white p-3 border border-brand-soft">
                                                <Preview value={trade.descripcion_larga} />
                                            </div>
                                        ) : (
                                            <p className="mt-1">Sin descripción larga</p>
                                        )}
                                    </div>
                                    <div>
                                        <span className="font-bold">Actividades: </span>
                                        {trade.activities?.length ? (
                                            <ul className="ml-5 mt-1 list-disc">
                                                {trade.activities.map((act, i) => <li key={i}>{act}</li>)}
                                            </ul>
                                        ) : (
                                            <p className="mt-1">Sin actividades</p>
                                        )}
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="mb-3 text-lg font-semibold text-brand-text">Galería de Imágenes</h2>
                                <div className="rounded-none border border-brand-soft bg-white p-5">
                                    {trade.gallery_images?.length ? (
                                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                            {trade.gallery_images.map((img, i) => (
                                                <img key={i} src={img} alt={`Galería ${i}`} className="h-24 w-full rounded-none object-cover border bg-white" />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-brand-ink">Sin imágenes en galería</p>
                                    )}
                                </div>
                            </section>

                            <section>
                                <h2 className="mb-3 text-lg font-semibold text-brand-text">Certificados</h2>
                                <div className="rounded-none border border-brand-soft bg-white p-5">
                                    {trade.certificates?.length ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {trade.certificates.map((cert) => (
                                                <Dialog key={cert.id}>
                                                    <DialogTrigger asChild>
                                                        <button className="flex w-full items-center gap-x-3 overflow-hidden border border-brand-soft bg-brand-pale/50 p-2 hover:bg-brand-pale transition-colors text-left cursor-pointer">
                                                            <div className="flex-shrink-0 h-10 w-10 bg-white border border-brand-soft flex items-center justify-center text-brand">
                                                                {cert.file_url.endsWith('.pdf') ? <FileText size={20} /> : <ImageIcon size={20} />}
                                                            </div>
                                                            <div className="flex flex-col truncate flex-grow">
                                                                <span className="text-sm font-semibold text-brand-text truncate">{cert.name}</span>
                                                                {cert.issued_at && (
                                                                    <span className="text-xs text-brand-ink">{new Date(cert.issued_at).toLocaleDateString('es-ES')}</span>
                                                                )}
                                                            </div>
                                                        </button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-0 gap-0">
                                                        <DialogHeader className="p-4 border-b bg-white">
                                                            <DialogTitle className="text-brand-text">{cert.name}</DialogTitle>
                                                            <DialogDescription>Vista previa del certificado</DialogDescription>
                                                        </DialogHeader>
                                                        <div className="flex-grow overflow-hidden bg-gray-100/50">
                                                            {cert.file_url.endsWith('.pdf') ? (
                                                                <iframe src={cert.file_url} className="w-full h-full border-0" title={cert.name} />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center p-4">
                                                                    <img src={cert.file_url} alt={cert.name} className="max-w-full max-h-full object-contain drop-shadow-md" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-brand-ink">Sin certificados</p>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Columna Derecha */}
                        <div className="space-y-8">
                            <section>
                                <h2 className="mb-3 text-lg font-semibold text-brand-text">Contacto del Negocio</h2>
                                <div className="space-y-3 rounded-none border border-brand-soft bg-white p-5 text-sm text-brand-ink">
                                    <p><strong>Teléfono:</strong> {trade.phone || "No definido"}</p>
                                    <p><strong>Correo:</strong> {trade.email || "No definido"}</p>
                                    <p>
                                        <strong>Sitio web:</strong>{" "}
                                        {trade.website ? (
                                            <a href={trade.website} target="_blank" rel="noreferrer" className="text-brand-text underline hover:text-brand-soft">
                                                {trade.website}
                                            </a>
                                        ) : "No definido"}
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="mb-3 text-lg font-semibold text-brand-text">Ubicación</h2>
                                <div className="space-y-3 rounded-none border border-brand-soft bg-white p-5 text-sm text-brand-ink">
                                    <p><strong>Región:</strong> {trade.region?.name || trade.region || "No definida"}</p>
                                    <p><strong>Municipio:</strong> {trade.municipio?.name || "No definido"}</p>
                                    <p><strong>Dirección:</strong> {trade.address || "No definida"}</p>
                                    <p>
                                        <strong>Coordenadas Mapa:</strong>{" "}
                                        {trade.map_location ? (
                                            <a href={`https://www.google.com/maps/search/?api=1&query=${trade.map_location}`} target="_blank" rel="noreferrer" className="text-brand-text underline hover:text-brand-soft">
                                                {trade.map_location} (Ver en Maps)
                                            </a>
                                        ) : "No definidas"}
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="mb-3 text-lg font-semibold text-brand-text">Contacto Personal (Propietario)</h2>
                                <div className="space-y-3 rounded-none border border-brand-soft bg-white p-5 text-sm text-brand-ink">
                                    <p><strong>Nombre:</strong> {trade.personal_name || "No definido"}</p>
                                    <p><strong>Teléfono:</strong> {trade.personal_phone || "No definido"}</p>
                                    <p><strong>Correo:</strong> {trade.personal_email || "No definido"}</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
