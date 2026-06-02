import React from "react";
import { IconBadge } from "@/Components/icon-badge";

export const InfoCard = ({ numberOfItems, variant, label, icon: Icon }) => {
  const normalizedVariant = variant === "success" ? "success" : "info";

  return (
    <div className="border rounded-none flex items-center gap-x-2 p-4 bg-white shadow-sm hover:shadow-md transition">
      <IconBadge variant={normalizedVariant} size="md" icon={Icon} />
      <div className="ml-2">
        <p className="font-semibold text-brand-text tracking-tight">{label}</p>
        <p className="text-brand-ink text-sm font-medium">
          {numberOfItems} {numberOfItems === 1 ? "Curso" : "Cursos"}
        </p>
      </div>
    </div>
  );
};
