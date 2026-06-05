import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Pencil } from "lucide-react";
import { Button } from "@/Components/ui/button";

export const CategoryForm = ({ initialData, courseId, options }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [categoryId, setCategoryId] = useState(initialData.category_id || "");
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((c) => !c);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.patch(`/teacher/courses/${courseId}`, { category_id: categoryId }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsLoading(false);
        toggleEdit();
      },
      onError: () => setIsLoading(false)
    });
  };

  const selectedOption = options.find((o) => String(o.value) === String(initialData.category_id));

  return (
    <div className="relative mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
      <div className="font-medium flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-x-2">
            Categoría del curso
            {initialData.category_id ? (
                <div className="flex items-center justify-center rounded-none bg-brand px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">Completado</div>
            ) : (
                <div className="flex items-center justify-center rounded-none bg-red-500 px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">Incompleto</div>
            )}
        </div>
        <Button onClick={toggleEdit} variant={isEditing ? "destructive" : "outline"}
          className={isEditing 
            ? "rounded-none font-bold uppercase tracking-wider"
            : "border-brand text-brand bg-white hover:bg-brand hover:text-white rounded-none font-bold uppercase tracking-wider"}>
          {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2" /> Editar categoría</>}
        </Button>
      </div>
      {!isEditing && (
        <p className={`text-sm mt-2 ${!initialData.category_id ? "text-brand-ink italic" : ""}`}>
          {selectedOption ? selectedOption.label : "Sin categoría"}
        </p>
      )}
      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <select 
            disabled={isLoading} 
            value={categoryId} 
            onChange={e => setCategoryId(e.target.value)} 
            className="w-full rounded-none border border-brand-soft bg-white p-2 text-sm"
            required 
          >
             <option value="" disabled>Selecciona una categoría...</option>
             {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
             ))}
          </select>
          <Button disabled={!categoryId || isLoading} type="submit" className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider w-full md:w-auto">Guardar</Button>
        </form>
      )}
    </div>
  );
};
