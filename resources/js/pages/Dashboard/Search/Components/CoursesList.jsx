import React from "react";
import { CourseCard } from "./CourseCard";

export const CoursesList = ({ items }) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            chaptersLength={item.chapters?.length || 0}
            price={item.price}
            progress={item.progress}
            category={item.category?.name}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center mt-10 p-8 border border-dashed rounded-none bg-white">
          <p className="text-brand-ink font-medium">No se encontraron cursos con estos filtros.</p>
        </div>
      )}
    </div>
  );
};
