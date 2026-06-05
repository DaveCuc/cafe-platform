import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";

export const CourseEnrollButton = ({ courseId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = () => {
    setIsLoading(true);
    router.post(`/courses/${courseId}/checkout`, {}, {
       onError: (errors) => {
         console.error("Error al inscribirse:", errors);
         alert(Object.values(errors)[0] || "Ocurrio un error al intentar inscribirse.");
       },
       onFinish: () => setIsLoading(false)
    });
  }

  return (
    <Button onClick={onClick} disabled={isLoading} size="sm" className="w-full md:w-auto rounded-none bg-brand border-brand text-white hover:bg-brand-darker dark:bg-brand-dark dark:border-brand-dark dark:hover:bg-brand-darker font-bold uppercase tracking-wider">
      Inscribirse
    </Button>
  )
};
