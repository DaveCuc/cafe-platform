import React from 'react';

export default function EventLocation({ event }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const cleanDate = dateStr.substring(0, 10);
    return new Date(cleanDate + 'T12:00:00').toLocaleDateString('es-ES', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <section className="w-full bg-[#800000] text-white py-16 md:py-24">
      <div className="max-w-[1140px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row flex-wrap gap-12 justify-between">

          {/* CUÁNDO */}
          <div className="flex-1 min-w-[300px]">
            <div className="flex flex-row gap-6 items-start">
              <div className="w-[60px] min-w-[60px] shrink-0 bg-white p-2.5 rounded-xl shadow-md flex items-center justify-center">
                <img
                  src="https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/contentbuilder/GDG_Bevy_WebIcons_Date_sMFTBzv.svg"
                  alt="Cuándo"
                  className="w-full h-auto max-w-full"
                />
              </div>
              <div>
                <h3 className="text-3xl font-extrabold mb-3 text-white">Cuándo</h3>
                <p className="text-xl font-medium leading-relaxed text-white/90">
                  {event.event_date ? formatDate(event.event_date) : "Fecha por confirmar"}
                  {event.event_time && <><br /><span className="text-white font-semibold mt-1 block">{event.event_time}</span></>}
                </p>
              </div>
            </div>
          </div>

          {/* DÓNDE */}
          <div className="flex-1 min-w-[300px]">
            <div className="flex flex-row gap-6 items-start">
              <div className="w-[60px] min-w-[60px] shrink-0 bg-white p-2.5 rounded-xl shadow-md flex items-center justify-center">
                <img
                  src="https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/contentbuilder/GDG_Bevy_WebIcons_Location_o00TWea.svg"
                  alt="Dónde"
                  className="w-full h-auto max-w-full"
                />
              </div>
              <div>
                <h3 className="text-3xl font-extrabold mb-3 text-white">Dónde</h3>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location || "Ubicación por confirmar")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-mint transition-colors text-white/90 block"
                >
                  <p className="text-xl font-medium leading-relaxed">
                    {event.location ? event.location.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    )) : "Ubicación por confirmar"}
                  </p>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
