import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";

export const CourseEnrollButton = ({ courseId, price }) => {
  const [isLoading, setIsLoading] = useState(false);
  const canCheckout = Number(price) > 0;

  const formatPrice = (p) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(p);

  const onClick = () => {
    if (!canCheckout) return;

    setIsLoading(true);
    router.post(`/courses/${courseId}/checkout`, {}, {
       onError: (errors) => {
         console.error("Error Checkout Stripe:", errors);
         alert(Object.values(errors)[0] || "Ocurrio un error al intentar generar la orden de Stripe.");
       },
       onFinish: () => setIsLoading(false)
    });
  }

  return (
    <Button onClick={onClick} disabled={isLoading || !canCheckout} size="sm" className="w-full md:w-auto rounded-none bg-brand border-brand text-white hover:bg-brand-darker dark:bg-brand-dark dark:border-brand-dark dark:hover:bg-brand-darker font-bold uppercase tracking-wider">
      {canCheckout ? `Inscribirse por ${formatPrice(price)}` : "Curso no disponible para compra"}
    </Button>
  )
};
