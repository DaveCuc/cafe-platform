import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { CheckCircle, XCircle } from "lucide-react";
import { router } from "@inertiajs/react";

export const CourseProgressButton = ({ chapterId, courseId, nextChapterId, isCompleted }) => {
  const [isLoading, setIsLoading] = useState(false);
  const confetti = useConfettiStore();

  const onClick = () => {
    setIsLoading(true);
    router.put(`/courses/${courseId}/chapters/${chapterId}/progress`, {
      isCompleted: !isCompleted
    }, {
      onSuccess: () => {
        if (!isCompleted && !nextChapterId) {
          confetti.onOpen();
        }
        if (!isCompleted && nextChapterId) {
          router.visit(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      },
      onFinish: () => setIsLoading(false)
    });
  }

  return (
    <Button 
      onClick={onClick} 
      disabled={isLoading} 
      size="sm" 
      variant="outline"
      className={`w-full md:w-auto rounded-none font-bold uppercase tracking-wider transition-colors ${isCompleted ? "border-black text-black bg-white hover:bg-black hover:text-white dark:border-gray-300 dark:text-gray-300 dark:bg-transparent dark:hover:bg-gray-300 dark:hover:text-black" : "bg-brand border-brand text-white hover:bg-brand-darker dark:bg-brand-dark dark:border-brand-dark dark:hover:bg-brand-darker"}`}
    >
      {isCompleted ? "Marcar como incompleto" : "Marcar como completado"}
      {isCompleted ? <XCircle className="h-4 w-4 ml-2" /> : <CheckCircle className="h-4 w-4 ml-2" />}
    </Button>
  );
};
