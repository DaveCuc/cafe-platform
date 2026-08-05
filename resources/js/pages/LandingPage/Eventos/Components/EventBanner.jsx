import React from 'react';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/Components/ui/button';

export default function EventBanner({ event, isScrolled }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const cleanDate = dateStr.substring(0, 10);
    return new Date(cleanDate + 'T12:00:00').toLocaleDateString('es-ES', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const isPastEvent = event.event_date ? new Date(event.event_date.substring(0, 10) + 'T23:59:59') < new Date() : false;

  return (
    <div className={`sticky top-[80px] z-40 bg-brand-mint shadow-xl transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-white">
          {event.event_date && (
            <div className="flex items-center text-lg md:text-xl font-bold uppercase tracking-wider">
              <Calendar className="w-6 h-6 md:w-8 md:h-8 mr-3 text-white" />
              {formatDate(event.event_date)}
            </div>
          )}
          {event.event_time && (
            <div className="flex items-center text-lg md:text-xl font-bold uppercase tracking-wider">
              <Clock className="w-6 h-6 md:w-8 md:h-8 mr-3 text-white" />
              {event.event_time}
            </div>
          )}
        </div>
        <div className="w-full md:w-auto">
          {isPastEvent ? (
            <Button size="lg" disabled className="w-full md:w-auto bg-[#e5e5e5] text-[#9ca3af] cursor-not-allowed px-10 py-6 md:py-8 rounded-none text-base md:text-lg font-extrabold tracking-widest uppercase">
              Evento Finalizado
            </Button>
          ) : event.rsvp_link ? (
            <a href={event.rsvp_link} target="_blank" rel="noopener noreferrer" className="block w-full md:w-auto">
              <Button size="lg" className="w-full md:w-auto bg-white hover:bg-gray-100 text-brand rounded-none px-10 py-6 md:py-8 text-base md:text-lg font-extrabold tracking-widest uppercase transition-colors shadow-sm">
                RSVP / Registrarme <ExternalLink className="w-5 h-5 ml-3" />
              </Button>
            </a>
          ) : (
            <Button size="lg" disabled className="w-full md:w-auto bg-[#e5e5e5] text-[#9ca3af] cursor-not-allowed px-10 py-6 md:py-8 rounded-none text-base md:text-lg font-extrabold tracking-widest uppercase">
              Registro no disponible
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
