import React from "react";
import { Link } from "@inertiajs/react";
import { BookOpen } from "lucide-react";
import { IconBadge } from "@/Components/icon-badge";

export const CourseCard = ({ id, title, imageUrl, chaptersLength, price, progress, category }) => {
  const formatPrice = (p) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(p);

  const resolveImageUrl = (url) => {
    if (!url) return '/logo.svg';
    if (url.startsWith('http') || url.startsWith('https')) return url;
    if (url.startsWith('/')) return url; // Fotos legacy de NextJS (/Fotos/Foto.jpg)
    return `/storage/${url}`; // Archivos subidos localmente a Storage en este nuevo sistema
  };

  return (
    <Link href={`/courses/${id}`}>
      <div className="group bg-white dark:bg-[#252525] border-0 shadow-lg dark:shadow-xl hover:shadow-md hover:translate-y-1 transition-all overflow-hidden rounded-none flex flex-col h-full">
        <div className="relative w-full aspect-video rounded-none overflow-hidden bg-brand-pale dark:bg-black border-0">
          <img 
            className="object-cover w-full h-full" 
            alt={title} 
            src={resolveImageUrl(imageUrl)} 
            onError={(e) => { e.target.onerror = null; e.target.src = '/logo.svg'; }} 
          />
        </div>
        <div className="flex flex-col p-6 h-auto min-h-[10rem] flex-grow">
          <div className="text-xl md:text-2xl font-bold group-hover:text-brand transition text-brand-ink dark:text-white uppercase tracking-wide">
            {title}
          </div>
          <p className="text-sm font-semibold text-brand-ink/70 dark:text-gray-400 mt-2">{category}</p>
          <div className="my-4 flex items-center gap-x-2 text-sm font-semibold text-brand-ink dark:text-gray-300">
            <div className="flex items-center gap-x-1">
              <IconBadge size="sm" icon={BookOpen} />
              <span>{chaptersLength} {chaptersLength === 1 ? "Capítulo" : "Capítulos"}</span>
            </div>
          </div>
          
          <div className="mt-auto pt-4 border-t-0">
            {progress !== null ? (
              <div className="w-full pt-2">
                 <p className="text-sm font-bold text-brand dark:text-white mb-2 uppercase tracking-wider">{Math.round(progress)}% Completado</p>
                 <div className="w-full bg-brand-pale dark:bg-gray-700 rounded-none h-2 border-0">
                   <div className="bg-brand-dark dark:bg-white h-2 rounded-none transition-all" style={{ width: `${progress}%` }}></div>
                 </div>
              </div>
            ) : (
              <p className="text-xl mt-2 font-black text-brand dark:text-white bg-brand-pale dark:bg-brand-dark p-2 text-center uppercase tracking-wider border-0">
                {price === 0 || price === null ? "Gratis" : formatPrice(price)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
