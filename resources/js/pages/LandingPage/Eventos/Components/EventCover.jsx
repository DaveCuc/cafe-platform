import React from 'react';
import { MapPin } from 'lucide-react';

export default function EventCover({ event }) {
  return (
    <div className="pt-20">
      <div className="w-full flex flex-col md:flex-row min-h-[50vh] md:min-h-[60vh] bg-brand">
        
        {/* Bloque sólido de texto */}
        <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-20 flex flex-col justify-center bg-brand z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight uppercase tracking-widest">
            {event.title}
          </h1>
          
          {event.short_description && (
            <p className="mt-8 text-xl text-white/90 max-w-2xl leading-relaxed">
              {event.short_description}
            </p>
          )}
          
          <div className="flex items-center gap-4 mt-10 text-white font-medium">
            {event.location && (
              <div className="flex items-center text-lg bg-black/20 p-4">
                <MapPin className="w-6 h-6 mr-3 text-white" />
                {event.location}
              </div>
            )}
          </div>
        </div>

        {/* Bloque de Imagen */}
        <div className="w-full md:w-1/2 h-[40vh] md:h-auto relative">
          {event.cover_image_url ? (
            <img
              src={event.cover_image_url}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-brand flex items-center justify-center">
              <span className="text-white/20 font-bold uppercase tracking-widest">Sin Portada</span>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
