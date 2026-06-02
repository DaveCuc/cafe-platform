import React from "react";
import { BookOpen } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/Components/ui/badge";

export const ArticleCover = ({ imageUrl, title, categoryName, publishedAt, userName, isDarkMode }) => {
    return (
        <div className="w-full flex flex-col shadow-sm rounded-none overflow-hidden">
            
            {/* Contenedor de la Imagen */}
            <div className="w-full h-[40vh] md:h-[50vh] bg-black">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className="w-full h-full bg-brand flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-white" />
                    </div>
                )}
            </div>
            
            {/* Bloque Sólido para Texto (Brutalismo - Debajo de la imagen) */}
            <div className={`w-full p-8 md:p-12 ${isDarkMode ? 'bg-[#252525]' : 'bg-brand'}`}>
                <div className="flex items-center gap-x-2 mb-6">
                    <Badge variant="outline" className={`rounded-none uppercase tracking-widest font-bold border-transparent ${isDarkMode ? 'bg-white/20 text-white' : 'bg-brand-darker text-brand-mint'}`}>
                        {categoryName || "General"}
                    </Badge>
                    <span className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-white/90'}`}>
                        {publishedAt ? format(new Date(publishedAt), "dd MMM yyyy", { locale: es }) : "Publicado recientemente"}
                    </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white max-w-4xl leading-tight uppercase tracking-wide">
                    {title}
                </h1>
                <div className="flex items-center gap-x-3 mt-8 text-sm">
                    <div className={`h-10 w-10 rounded-none flex items-center justify-center font-extrabold text-lg shadow-sm border ${isDarkMode ? 'bg-white text-[#252525] border-white' : 'bg-brand-mint text-brand-darker border-brand-darker'}`}>
                        {userName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className={`font-bold uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-brand-mint'}`}>Por {userName}</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
};
