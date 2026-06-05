import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Trash } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";

export const Actions = ({ disabled, courseId, isPublished }) => {
  const [isLoading, setIsLoading] = useState(false);
  const confetti = useConfettiStore();

  const onClick = () => {
    setIsLoading(true);
    if (isPublished) {
      router.patch(`/teacher/courses/${courseId}/unpublish`, {}, {
        preserveScroll: true,
        onSuccess: () => setIsLoading(false),
        onError: () => setIsLoading(false)
      });
    } else {
      router.patch(`/teacher/courses/${courseId}/publish`, {}, {
        preserveScroll: true,
        onSuccess: () => {
          setIsLoading(false);
          confetti.onOpen();
        },
        onError: () => setIsLoading(false)
      });
    }
  };

  const onDelete = () => {
    if (window.confirm("¿Estás súper seguro de que deseas eliminar este curso permanentemente?")) {
      setIsLoading(true);
      router.delete(`/teacher/courses/${courseId}`, {
        onSuccess: () => setIsLoading(false),
        onError: () => setIsLoading(false)
      });
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
        className="bg-white border-brand-soft shadow-sm"
      >
        {isPublished ? "Despublicar" : "Publicar Curso"}
      </Button>
      
      <Button 
        size="sm" 
        onClick={onDelete} 
        disabled={isLoading} 
        variant="destructive"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
