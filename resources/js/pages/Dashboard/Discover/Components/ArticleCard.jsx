import React from "react";
import { Link } from "@inertiajs/react";
import { IconBadge } from "@/Components/icon-badge";
import { BookOpen } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const ArticleCard = ({
    id,
    title,
    imageUrl,
    cardImageUrl,
    category,
    user,
    publishedAt,
    shortDescription
}) => {
    const displayImage = cardImageUrl || imageUrl;
    return (
        <Link href={`/articulos/${id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-none p-3 h-full bg-white border-brand-soft">
                <div className="relative w-full aspect-video rounded-none overflow-hidden">
                    {displayImage ? (
                        <img
                            className="object-cover w-full h-full"
                            alt={title}
                            src={displayImage}
                        />
                    ) : (
                        <div className="w-full h-full bg-brand-pale flex items-center justify-center">
                             <BookOpen className="h-10 w-10 text-brand-ink" />
                        </div>
                    )}
                </div>
                
                <div className="flex flex-col pt-2">
                    <div className="text-lg md:text-base font-medium group-hover:text-brand-text transition line-clamp-2">
                        {title}
                    </div>
                    
                    <p className="text-xs text-brand-ink mb-1 mt-1 font-medium">
                        {category?.name || "General"} &middot; {user?.name}
                    </p>
                    
                    {shortDescription && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                            {shortDescription}
                        </p>
                    )}

                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs text-brand-ink">
                        <div className="flex items-center gap-x-1">
                            <IconBadge size="sm" icon={BookOpen} variant="default" />
                            <span>
                                {publishedAt ? format(new Date(publishedAt), "dd MMM, yyyy", { locale: es }) : "Reciente"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
