import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { ChaptersList } from "./ChaptersList";
import { cn } from "@/lib/utils";

export const ChaptersForm = ({ initialData, courseId }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [title, setTitle] = useState("");

  const toggleCreating = () => setIsCreating((current) => !current);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    router.post(`/teacher/courses/${courseId}/chapters`, { title }, {
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
    router.put(`/teacher/courses/${courseId}/chapters/reorder`, {
      list: updateData
    }, {
      preserveScroll: true,
      onSuccess: () => setIsUpdating(false),
      onError: () => setIsUpdating(false)
    });
  }

  const onEdit = (id) => {
    router.visit(`/teacher/courses/${courseId}/chapters/${id}`);
  }

  return (
    <div className="relative mt-6 border bg-brand-pale rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-brand-pale/40 top-0 right-0 rounded-md flex items-center justify-center z-10">
          <Loader2 className="animate-spin h-6 w-6 text-brand-soft" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between pb-3">
        Capítulos del curso
        <Button onClick={toggleCreating} variant="ghost" className="bg-white hover:bg-brand-soft hover:text-white">
          {isCreating ? "Cancelar" : <><PlusCircle className="h-4 w-4 mr-2" /> Agregar Capítulo</>}
        </Button> xd
      </div>

      {isCreating && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
           <Input
              disabled={isUpdating}
              placeholder="Ej. 'Introducción al curso'"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="bg-white"
              required
            />
            <Button disabled={!title || isUpdating} type="submit">Crear</Button>
        </form>
      )}

      {!isCreating && (
        <div className={cn("text-sm mt-2", (!initialData.chapters || initialData.chapters.length === 0) && "text-brand-ink italic")}>
          {(!initialData.chapters || initialData.chapters.length === 0) && "No hay capitulos creados aún."}
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters || []}
          />
        </div>
      )}

      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Arrastra y suelta para reordenar los capitulos
        </p>
      )}
    </div>
  );
};
