import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Loader2, PlusCircle, BookOpen, ClipboardList } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { CourseContentList } from "./CourseContentList";
import { cn } from "@/lib/utils";

export const CourseContentForm = ({ initialData, courseId }) => {
  const [isCreatingType, setIsCreatingType] = useState(null); // 'chapter' or 'exam' or null
  const [isUpdating, setIsUpdating] = useState(false);
  const [title, setTitle] = useState("");

  const toggleCreating = (type) => {
    if (isCreatingType === type) {
      setIsCreatingType(null);
    } else {
      setIsCreatingType(type);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const endpoint = isCreatingType === 'chapter' 
          ? `/teacher/courses/${courseId}/chapters` 
          : `/teacher/courses/${courseId}/exams`;
    router.post(endpoint, { title }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsUpdating(false);
        setTitle("");
        setIsCreatingType(null);
      },
      onError: () => setIsUpdating(false)
    });
  };

  const onReorder = (updateData) => {
    setIsUpdating(true);
    router.put(`/teacher/courses/${courseId}/content/reorder`, {
      list: updateData
    }, {
      preserveScroll: true,
      onSuccess: () => setIsUpdating(false),
      onError: () => setIsUpdating(false)
    });
  }

  const onEditChapter = (id) => {
    router.visit(`/teacher/courses/${courseId}/chapters/${id}`);
  }
  
  const onEditExam = (id) => {
    router.visit(`/teacher/courses/${courseId}/exams/${id}`);
  }

  // Combinar y ordenar
  const chaptersForSort = (initialData.chapters || []).map(ch => ({...ch, type: 'chapter'}));
  const examsForSort = (initialData.exams || []).map(ex => ({...ex, type: 'exam'}));
  const combinedContent = [...chaptersForSort, ...examsForSort].sort((a, b) => a.position - b.position);

  const isCreating = isCreatingType !== null;
  const hasContent = combinedContent.length > 0;
  const allPublished = hasContent && combinedContent.every(item => item.is_published);
  const hasDrafts = hasContent && combinedContent.some(item => !item.is_published);

  return (
    <div className="relative mt-6 border bg-brand-pale rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-brand-pale/40 top-0 right-0 rounded-md flex items-center justify-center z-10">
          <Loader2 className="animate-spin h-6 w-6 text-brand-soft" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between pb-3">
        <div className="flex items-center gap-x-2">
          Contenido del curso
          {allPublished && (
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
              Completo
            </span>
          )}
          {hasDrafts && (
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-semibold">
              Borradores pendientes
            </span>
          )}
        </div>
        
        {!isCreating && (
          <div className="flex gap-2">
            <Button onClick={() => toggleCreating('chapter')} variant="ghost" size="sm" className="bg-white hover:bg-brand-soft hover:text-white">
              <BookOpen className="h-4 w-4 mr-2" /> Añadir Capítulo
            </Button>
            <Button onClick={() => toggleCreating('exam')} variant="ghost" size="sm" className="bg-white hover:bg-brand-soft hover:text-white">
              <ClipboardList className="h-4 w-4 mr-2" /> Añadir Examen
            </Button>
          </div>
        )}
        {isCreating && (
           <Button onClick={() => toggleCreating(null)} variant="ghost" size="sm" className="bg-white hover:bg-brand-soft hover:text-white">
             Cancelar
           </Button>
        )}
      </div>

      {isCreating && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
           <Input
              disabled={isUpdating}
              placeholder={isCreatingType === 'chapter' ? "Ej. 'Introducción al curso'" : "Ej. 'Examen final' o 'Cuestionario'"}
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="bg-white"
              required
            />
            <Button disabled={!title || isUpdating} type="submit">
                {isCreatingType === 'chapter' ? "Crear Capítulo" : "Crear Examen"}
            </Button>
        </form>
      )}

      {!isCreating && (
        <div className={cn("text-sm mt-2", combinedContent.length === 0 && "text-brand-ink italic")}>
          {combinedContent.length === 0 && "No hay contenido creado aún."}
          <CourseContentList
            onEditChapter={onEditChapter}
            onEditExam={onEditExam}
            onReorder={onReorder}
            items={combinedContent}
          />
        </div>
      )}

      {!isCreating && combinedContent.length > 0 && (
        <p className="text-xs text-muted-foreground mt-4">
          Arrastra y suelta para reordenar los capítulos y exámenes
        </p>
      )}
    </div>
  );
};