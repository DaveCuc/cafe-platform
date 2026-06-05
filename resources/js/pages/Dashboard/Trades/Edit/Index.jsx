import React from "react";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Building2, Contact, FileImage, MapPin, UserSquare2 } from "lucide-react";

import MainLayout from "@/Layouts/MainLayout";
import { Banner } from "@/Components/banner";
import { IconBadge } from "@/Components/icon-badge";
import {
    ComercialNameForm,
    ShortDescriptionForm,
    LongDescriptionForm,
    ActivitiesForm,
    BusinessContactForm,
    PersonalContactForm,
} from "./Components/SimpleForms";
import { ImageForm } from "./Components/ImageForm";
import { BusinessAddressForm } from "./Components/BusinessAddressForm";
import { Actions } from "./Components/Actions";
import { GirosDigitalForm } from "./Components/GirosDigitalForm";
import { RegionMunicipioForm } from "./Components/RegionMunicipioForm";
import { ContentGalleryForm } from "./Components/ContentGalleryForm";
import { CertificateForm } from "./Components/CertificateForm";

export default function TradeEditor({ trade, giros, regions }) {
    const requiredFields = [
        trade.comercial_name,
        trade.descripcion_corta,
        trade.descripcion_larga,
        (trade.activities || []).length ? "ok" : "",
        trade.phone,
        trade.address,
        trade.image_url,
        trade.region_id,
        trade.municipio_id,
        trade.personal_name,
        trade.personal_cargo,
        trade.personal_phone,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const isComplete = requiredFields.every(Boolean) && (trade.giros?.length || 0) > 0;
    const canSubmit = isComplete && (trade.status === "draft" || trade.status === "rejected");

    return (
        <MainLayout>
            <Head title={`Editar Registro: ${trade.comercial_name || "Trade"}`} />

            {trade.status === "draft" && (
                <Banner
                    variant="warningSolid"
                    label="Completa los datos y envía tu solicitud para revisión."
                />
            )}

            {trade.status === "pending" && (
                <Banner
                    variant="warning"
                    label="Tu solicitud está en revisión por el equipo docente."
                />
            )}

            {trade.status === "approved" && (
                <Banner
                    variant="success"
                    label="Tu negocio fue aprobado y ya es visible para el público."
                />
            )}

            {trade.status === "rejected" && (
                <Banner
                    variant="warning"
                    label="Tu solicitud fue rechazada. Ajusta la información y vuelve a enviarla."
                />
            )}

            <div className="mx-auto max-w-6xl p-6 pb-20">
                <Link href="/trade" className="mb-6 flex items-center text-sm transition hover:opacity-75">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a la lista de registros
                </Link>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-bold text-brand-text">Configuración del negocio</h1>
                        <span className="text-sm text-brand-text">
                            Completa todos los campos ({completedFields}/{totalFields})
                        </span>
                    </div>
                    <Actions
                        canSubmit={canSubmit}
                        tradeId={trade.id}
                        status={trade.status}
                    />
                </div>

                {/* Banner con el comentario del motivo del rechazo de su solicitud */}
                {(trade.status === "rejected" || trade.status === "pending") && trade.rejection_reason && (
                    <div className="mt-6 rounded-none border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm">
                        <h3 className="font-bold text-base">Motivo del rechazo anterior:</h3>
                        <p className="mt-1 text-sm">{trade.rejection_reason}</p>
                    </div>
                )}

                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-6">
                        <div className="flex items-center gap-x-2">
                            <IconBadge variant="teacher" size="md" icon={Building2} />
                            <h2 className="text-xl font-semibold">Personaliza tu negocio</h2>
                        </div>

                        <ComercialNameForm initialData={trade} tradeId={trade.id} />
                        <GirosDigitalForm initialData={trade} tradeId={trade.id} giros={giros} />
                        <ShortDescriptionForm initialData={trade} tradeId={trade.id} />
                        <LongDescriptionForm initialData={trade} tradeId={trade.id} />
                        <ActivitiesForm initialData={trade} tradeId={trade.id} />
                        <CertificateForm initialData={trade} tradeId={trade.id} />

                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="mb-6 flex items-center gap-x-2">
                                <IconBadge variant="teacher" size="md" icon={Contact} />
                                <h2 className="text-xl font-semibold">Forma de Contacto</h2>
                            </div>
                            <BusinessContactForm initialData={trade} tradeId={trade.id} />
                            <PersonalContactForm initialData={trade} tradeId={trade.id} />
                        </div>


                        <div>
                            <div className="mb-6 flex items-center gap-x-2">
                                <IconBadge variant="teacher" size="md" icon={MapPin} />
                                <h2 className="text-xl font-semibold">Ubicación geográfica</h2>
                            </div>
                            <RegionMunicipioForm initialData={trade} tradeId={trade.id} regions={regions} />
                            <BusinessAddressForm initialData={trade} tradeId={trade.id} />
                        </div>

                        <div>
                            <div className="mb-6 flex items-center gap-x-2">
                                <IconBadge variant="teacher" size="md" icon={FileImage} />
                                <h2 className="text-xl font-semibold">Contenido</h2>
                            </div>
                            <ImageForm initialData={trade} tradeId={trade.id} />

                            <ContentGalleryForm initialData={trade} tradeId={trade.id} />
                        </div>


                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
