import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import { Preview } from "@/Components/Preview";
import { ArticleCover } from "./Components/ArticleCover";
import { RecentArticlesSidebar } from "./Components/RecentArticlesSidebar";
import { Sun, Moon } from "lucide-react";

export default function ArticleView({ article, recentArticles }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <HomeLayout>
            <Head title={article.title} />
            
            <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-[#1a1a1a] text-gray-100' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-10">
                    
                    {/* Contenedor 1: Enlace de Interés */}
                    <div className="lg:w-2/3 space-y-8">
                        
                        <ArticleCover 
                            imageUrl={article.image_url} 
                            title={article.title}
                            categoryName={article.category?.name}
                            publishedAt={article.published_at}
                            userName={article.user?.name}
                            isDarkMode={isDarkMode}
                        />
                        
                        {/* Contenido */}
                        <div className={`p-8 shadow-sm ${isDarkMode ? 'bg-[#252525]' : 'bg-white'}`}>
                            <div className={`prose max-w-none pb-10 ${isDarkMode ? 'prose-invert prose-brand [&_*]:!text-white' : 'prose-brand'}`}>
                                <Preview value={article.content} />
                            </div>
                        </div>
                    </div>

                    {/* Contenedor 2: Otros Enlaces de Interés */}
                    <RecentArticlesSidebar articles={recentArticles} isDarkMode={isDarkMode} />

                </div>

                {/* Floating Dark Mode Toggle */}
                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`fixed bottom-8 right-8 p-4 shadow-xl z-50 transition-all duration-200 flex items-center justify-center border-2 ${isDarkMode ? 'bg-brand-mint text-white border-brand-mint hover:bg-white hover:text-brand-mint hover:border-brand-mint' : 'bg-brand text-white border-brand hover:bg-white hover:text-brand hover:border-brand'}`}
                    title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                >
                    {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </button>
            </div>
        </HomeLayout>
    );
}