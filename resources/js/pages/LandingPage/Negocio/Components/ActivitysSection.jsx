import React from 'react';
import { Star } from 'lucide-react';

const ActivitysSection = ({ activities }) => {
    if (!activities || activities.length === 0) return null;

    return (
        <section className="bg-[#3E2E24]">
            <div className=" container max-w-7xl mx-auto px-5 py-8 md:py-12">
                <div className=" p-6 md:p-8">
                    <h2 className="text-4xl font-extrabold uppercase tracking-widest text-white mb-8 text-center">Actividades</h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {activities.map((act, index) => (
                            <div
                                key={index}
                                className="flex items-center px-4 py-2 bg-white rounded-none shadow-md text-brand-darker font-bold text-sm transition-transform hover:-translate-y-1 hover:shadow-lg"
                            >
                                <Star className="w-4 h-4 mr-2 text-brand" />
                                {act}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ActivitysSection;