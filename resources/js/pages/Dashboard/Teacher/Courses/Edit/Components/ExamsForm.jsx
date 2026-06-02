import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { ExamsList } from "./ExamsList";
import { cn } from "@/lib/utils";

export const ExamsForm = ({ initialData, courseId }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [title, setTitle] = useState("");

  const toggleCreating = () => setIsCreating((current) => !current);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    router.post(`/teacher/courses/${courseId}/exams`, { title }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsUpdating(false);
        setTitle("");
        toggleCreating();
      },
      onError: () => setIsUpdating(false)
    });
  };

  const onReorder = (updateData) => {
    setIsUpdating(true);
    router.put(`/teacher/courses/${courseId}/exams/reorder`, {
      list: updateData
    }, {
      preserveScroll: true,
      onSuccess: () => setIsUpdating(false),
      onError: () => setIsUpdating(false)
    });
  }

  const onEdit = (id) => {
    router.visit(`/teacher/courses/${courseId}/exams/${id}`);
  }

  return (
    <div className="relative relative mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
      {isUpdating && (
        <div className="absolute h-full w-full bg-brand-pale/40 top-0 right-0 rounded-none flex items-center justify-center z-10">
          <Loader2 className="animate-spin h-6 w-6 text-brand-soft" />
        </div>
      )}
      <div className="font-medium flex flex-wrap items-center justify-between gap-2 pb-3">
        Exámenes del curso
        <Button onClick={toggleCreating} variant={isCreating ? "destructive" : "outline"}
          className={isCreating 
            ? "rounded-none font-bold uppercase tracking-wider"
            : "border-black text-black bg-white hover:bg-black hover:text-white rounded-none font-bold uppercase tracking-wider"}>
          {isCreating ? "Cancelar" : <><PlusCircle className="h-4 w-4 mr-2" /> Agregar Examen</>}
        </Button>
      </div>

      {isCreating ? (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
           <Input
              disabled={isUpdating}
              placeholder="Ej. 'Examen final' o 'Cuestionario Módulo 1'"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="bg-white"
              required
            />
            <Button disabled={!title || isUpdating} type="submit" className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider">Crear Examen</Button>
        </form>
      ) : (
        <div className={cn("text-sm mt-2", (!initialData.exams || initialData.exams.length === 0) && "text-brand-ink italic")}>
          {(!initialData.exams || initialData.exams.length === 0) && "No hay exámenes creados aún."}
          <ExamsList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.exams || []}
          />
        </div>
      )}

      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Arrastra y suelta para reordenar los exámenes
        </p>
      )}
    </div>
  );
};
