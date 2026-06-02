import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { SearchInput } from "./Components/SearchInput";
import { Categories } from "./Components/Categories";
import { CoursesList } from "./Components/CoursesList";

export default function SearchIndex({ categories, courses }) {
  return (
    <MainLayout>
      <Head title="Explorar Cursos" />
      
      {/* Search Input móvil */}
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      
      <div className="p-6 space-y-6">
        <div className="bg-white p-4 rounded-none shadow-sm border border-brand-soft">
           <Categories items={categories} />
        </div>
        
        <CoursesList items={courses} />
      </div>
    </MainLayout>
  );
}
