import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Trash } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { ConfirmModal } from "@/Components/modals/confirm-modal";

export const Actions = ({ disabled, courseId, examId, isPublished }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = () => {
    setIsLoading(true);
    
    if (isPublished) {
      router.patch(`/teacher/courses/${courseId}/exams/${examId}/unpublish`, {}, {
        onFinish: () => setIsLoading(false)
      });
    } else {
      router.patch(`/teacher/courses/${courseId}/exams/${examId}/publish`, {}, {
        onFinish: () => setIsLoading(false)
      });
    }
  }
  
  const onDelete = () => {
    setIsLoading(true);

    router.delete(`/teacher/courses/${courseId}/exams/${examId}`, {
      onFinish: () => setIsLoading(false)
    });
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Anular publicación" : "Publicar"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}
