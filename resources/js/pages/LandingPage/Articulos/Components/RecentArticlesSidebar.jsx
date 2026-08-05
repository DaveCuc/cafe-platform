import React from "react";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardTitle } from "@/Components/ui/card";
import { ArrowUpRight } from "lucide-react";

export const RecentArticlesSidebar = ({ articles, isDarkMode }) => {
    return (
        <div className="lg:w-1/3">
            <h2 className={`text-2xl font-extrabold uppercase tracking-widest mb-6 ${isDarkMode ? 'text-brand-mint' : 'text-brand-darker'}`}>Enlaces de Interés Recientes</h2>
            <div className="flex flex-col gap-8">
                {articles.length === 0 ? (
                    <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-muted-foreground'}`}>No hay más enlaces de interés disponibles.</p>
                ) : (
                    articles.map((recent) => (
                        <Card key={recent.id} className={`group relative min-h-[300px] overflow-hidden rounded-none border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col ${isDarkMode ? 'bg-[#252525]' : 'bg-white'}`}>

                            <div className="relative h-40 w-full overflow-hidden">
                                {(recent.card_image_url || recent.image_url) ? (
                                    <img
                                        src={recent.card_image_url || recent.image_url}
                                        alt={recent.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-brand flex items-center justify-center">
                                        <span className="text-white font-bold uppercase">Sin Imagen</span>
                                    </div>
                                )}
                            </div>

                            <div className="relative z-10 flex flex-1 flex-col justify-end p-6">
                                <Badge variant="outline" className={`mb-4 w-fit rounded-none px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest border-0 ${isDarkMode ? 'bg-brand text-white' : 'bg-brand-mint text-white'}`}>
                                    {recent.category?.name || "General"}
                                </Badge>

                                <CardTitle className={`mb-2 text-xl font-extrabold leading-tight line-clamp-2 uppercase tracking-wide ${isDarkMode ? 'text-white' : 'text-brand-darker'}`}>
                                    {recent.title}
                                </CardTitle>

                                <p className={`text-xs font-bold mb-2 uppercase tracking-wide ${isDarkMode ? 'text-white' : 'text-brand'}`}>
                                    Por {recent.user?.name} &middot; {recent.published_at ? format(new Date(recent.published_at), "dd MMM yyyy", { locale: es }) : "Reciente"}
                                </p>

                                <p className={`mb-6 text-sm leading-relaxed line-clamp-2 font-medium ${isDarkMode ? 'text-white/90' : 'text-brand-darker'}`}>
                                    {recent.short_description}
                                </p>

                                <Button asChild className={`w-full rounded-none px-4 py-6 text-sm font-extrabold uppercase tracking-widest border-2 transition-all duration-200 ${isDarkMode ? 'bg-brand text-white border-brand hover:bg-white hover:text-brand hover:border-brand' : 'bg-brand-mint text-white border-brand-mint hover:bg-white hover:text-brand-mint hover:border-brand-mint'}`}>
                                    <Link href={`/articulos/${recent.id}`} className="inline-flex items-center justify-center gap-2">
                                        Ver enlace
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};
