import React from "react";
import { Head, Link } from "@inertiajs/react";
import { FileText, LayoutDashboard, ArrowLeft, Users, Calendar, MapPin } from "lucide-react";
import MainLayout from "@/Layouts/MainLayout";

import { TitleForm, ShortDescriptionForm, DescriptionForm, RsvpForm, DateForm, TimeForm, LocationForm, TopicsForm, PeopleForm } from "./Components/EventForms";
import { ImageForm } from "./Components/ImageForm";
import { Actions } from "./Components/Actions";
import { Banner } from "@/Components/banner";
import { IconBadge } from "@/Components/icon-badge";

export default function EventEditor({ event }) {
  const requiredFields = [
    event.title,
    event.short_description,
    event.description,
    event.location,
    event.event_date,
    event.image_url,
    event.cover_image_url,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <MainLayout>
      <Head title={`Editar Evento: ${event.title}`} />

      {!event.is_published && (
        <Banner variant="warningSolid" label="Este evento no es visible al público hasta que lo publiques." />
      )}

      <div className="p-6 pb-20 max-w-6xl mx-auto">
        <Link href={`/teacher/events`} className="flex items-center text-sm hover:opacity-75 transition mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a la lista de eventos
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold">Configuración del evento</h1>
            <span className="text-sm text-brand-text">
              Completa todos los campos obligatorios {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            eventId={event.id}
            isPublished={event.is_published}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {/* Columna Izquierda */}
          <div className="space-y-6">
            <div>
                <div className="flex items-center gap-x-2 mb-6">
                <IconBadge variant="teacher" size="md" icon={LayoutDashboard} />
                <h2 className="text-xl font-semibold">Portada e Información General</h2>
                </div>

                <TitleForm initialData={event} eventId={event.id} />
                <ShortDescriptionForm initialData={event} eventId={event.id} />
                
                <ImageForm
                initialData={event}
                articleId={event.id}
                label="Imagen de tarjeta (Card)"
                endpoint={`/teacher/events/${event.id}/image`}
                field="image_url"
                />
                <ImageForm
                initialData={event}
                articleId={event.id}
                label="Imagen de portada (Banner Principal)"
                endpoint={`/teacher/events/${event.id}/cover-image`}
                field="cover_image_url"
                />
            </div>

            <div>
                <div className="flex items-center gap-x-2 mb-6">
                <IconBadge variant="teacher" size="md" icon={Calendar} />
                <h2 className="text-xl font-semibold">Cuándo y Dónde (Banner)</h2>
                </div>
                
                <DateForm initialData={event} eventId={event.id} />
                <TimeForm initialData={event} eventId={event.id} />
                <LocationForm initialData={event} eventId={event.id} />
                <RsvpForm initialData={event} eventId={event.id} />
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2 mb-6">
                <IconBadge variant="teacher" size="md" icon={FileText} />
                <h2 className="text-xl font-semibold">Acerca del evento</h2>
              </div>
              <DescriptionForm initialData={event} eventId={event.id} />
              <TopicsForm initialData={event} eventId={event.id} />
            </div>

            <div>
                <div className="flex items-center gap-x-2 mb-6">
                <IconBadge variant="teacher" size="md" icon={Users} />
                <h2 className="text-xl font-semibold">Participantes</h2>
                </div>
                
                <PeopleForm initialData={event} eventId={event.id} field="hosts" label="Anfitriones" />
                <PeopleForm initialData={event} eventId={event.id} field="collaborators" label="Colaboradores" />
                <PeopleForm initialData={event} eventId={event.id} field="organizers" label="Organizadores" />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
