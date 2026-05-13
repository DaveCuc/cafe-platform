import { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

function formatPrice(price) {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN"
    }).format(price || 0);
}

export const CourseEnrollButton = ({
  courseId,
  price,
  isFree
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const canCheckout = isFree || Number(price) > 0;

  const onClick = async () => {
    if (!canCheckout) return;

    try {
      setIsLoading(true);
      router.post(`/courses/${courseId}/checkout`, {}, {
        preserveScroll: true,
        onError: (errors) => {
          const firstError = Object.values(errors || {})[0];
          if (firstError) {
            alert(firstError);
          }
        },
      });
    } catch {
      console.error("Algo salió mal");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading || !canCheckout}
      size="sm"
      className="w-full md:w-auto"
    >
      {isFree ? "Inscribirse" : (canCheckout ? `Comprar por ${formatPrice(price)}` : "No disponible")}
    </Button>
  )
}

export const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      router.put(`/courses/${courseId}/chapters/${chapterId}/progress`, {
        isCompleted: !isCompleted
      }, {
        preserveScroll: true,
        onSuccess: () => {
          if (!isCompleted && !nextChapterId) {
            console.log("¡Confeti!");
          }
          if (!isCompleted && nextChapterId) {
            router.visit(`/courses/${courseId}/chapters/${nextChapterId}`);
          }
        }
      });
    } catch {
      console.error("Algo salió mal al actualizar progreso");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto bg-green-700 text-white"
    >
      {isCompleted ? "Desmarcar completado" : "Marcar como Completado"}
    </Button>
  )
}
