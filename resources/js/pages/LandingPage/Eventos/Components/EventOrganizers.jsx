import React from 'react';
import { Users } from 'lucide-react';

export default function EventOrganizers({ organizers }) {
  if (!organizers || organizers.length === 0) return null;
  return (
    <div className="mt-16 flex flex-col items-center">
      <h3 className="text-3xl font-extrabold uppercase tracking-widest text-brand-darker mb-10 text-center">Organizadores</h3>
      <div className="flex flex-wrap justify-center gap-8 w-full">
        {organizers.map((person, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-8 bg-white rounded-none shadow-md hover:-translate-y-1 hover:shadow-xl transition-all w-full sm:w-64 max-w-[280px]">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-brand-pale mb-6 shadow-sm">
              {person.photo_url ? (
                <img src={person.photo_url} alt={person.name} className="w-full h-full object-cover" />
              ) : (
                <Users className="w-16 h-16 text-brand-darker mx-auto mt-8" />
              )}
            </div>
            <h4 className="font-extrabold text-xl text-brand-darker">{person.name}</h4>
            <p className="text-sm font-bold text-brand-darker/70 mt-2 uppercase tracking-wide">{person.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
