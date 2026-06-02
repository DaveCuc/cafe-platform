import React from "react";
import { Head, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { SearchInput } from "./Components/SearchInput";
import { Categories } from "./Components/Categories";
import { ArticlesList } from "./Components/ArticlesList";
import { EventsList } from "./Components/EventsList";

import { CategoryItem } from "./Components/CategoryItem";
import { Calendar } from "lucide-react";

export default function DiscoverIndex({ categories, articles, events }) {
  const { filters } = usePage().props;
  const isEvents = filters?.categoryId === 'eventos';

  return (
    <MainLayout>
      <Head title="Descubrir" />
      
      {/* Search Input móvil */}
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-1 gap-1">
          <div className="md:col-span-4 bg-white p-4 rounded-none shadow-sm border border-brand-soft">
             <h3 className="text-sm font-bold text-brand-text mb-3 uppercase tracking-wider">Artículos</h3>
             <Categories items={categories} />
          </div>
          
          <div className="md:col-start-5 bg-white p-4 rounded-none shadow-sm border border-brand-soft flex flex-col justify-center">
             <h3 className="text-sm font-bold text-brand-text mb-3 uppercase tracking-wider text-center">Eventos</h3>
             <div className="flex justify-center">
                 <CategoryItem
                     label="Próximos Eventos"
                     value="eventos"
                     isSpecial={true}
                 />
             </div>
          </div>
        </div>
        
        {isEvents ? (
          <EventsList items={events} />
        ) : (
          <ArticlesList items={articles} />
        )}
      </div>
    </MainLayout>
  );
}
