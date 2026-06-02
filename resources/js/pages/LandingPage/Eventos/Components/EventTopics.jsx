import React from 'react';

export default function EventTopics({ event }) {
  if (!event.topics || event.topics.length === 0) return null;

  return (
    <div className="lg:col-span-1 lg:row-span-5 order-1 lg:order-1 pr-0 lg:pr-10 mb-10 lg:mb-0">
      <div className="bg-white p-8 rounded-none shadow-sm">
        <h3 className="text-xl font-extrabold uppercase tracking-widest text-brand mb-6">Temas a tratar</h3>
        <div className="flex flex-wrap gap-3">
          {event.topics.map((topic, idx) => (
            <span key={idx} className="bg-brand text-white font-bold px-4 py-2 rounded-none text-sm uppercase tracking-wider">
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
