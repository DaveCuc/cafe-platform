import React from 'react';

export default function EventAbout({ event }) {
  return (
    <div className="bg-white p-8 md:p-12 shadow-sm">
      <h2 className="text-3xl font-extrabold uppercase tracking-widest text-brand mb-8">Acerca del evento</h2>
      <div className="prose prose-lg max-w-none text-brand-ink prose-headings:text-brand prose-a:text-brand prose-a:font-bold whitespace-pre-wrap leading-relaxed">
        {event.description || "No hay descripción detallada disponible para este evento."}
      </div>
    </div>
  );
}
