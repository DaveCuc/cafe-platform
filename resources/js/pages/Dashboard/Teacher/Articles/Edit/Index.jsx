import React from "react";
import { Head, Link } from "@inertiajs/react";
import { FileText, LayoutDashboard, ArrowLeft } from "lucide-react";
import MainLayout from "@/Layouts/MainLayout";

import { TitleForm, ShortDescriptionForm, ContentForm } from "./Components/SimpleForms";
import { CategoryForm } from "./Components/CategoryForm";
import { ImageForm } from "./Components/ImageForm";
import { Actions } from "./Components/Actions";
import { Banner } from "@/Components/banner";
import { IconBadge } from "@/Components/icon-badge";
import { Input } from "@/Components/ui/input";

export default function ArticleEditor({ article, categories }) {
  const mappedCategories = categories.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));

  const requiredFields = [
    article.title,
    article.short_description,
    article.content,
    article.image_url,
    article.card_image_url,
    article.category_id,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <MainLayout>
      <Head title={`Editar Artículo: ${article.title}`} />

      {!article.is_published && (
        <Banner variant="warningSolid" label="Este artículo no es visible al público hasta que lo publiques." />
      )}

      <div className="p-6 pb-20 max-w-6xl mx-auto">
        <Link href={`/teacher/articles`} className="flex items-center text-sm hover:opacity-75 transition mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a la lista de artículos
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold">Configuración del artículo</h1>
            <span className="text-sm text-brand-text">
              Completa todos los campos {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            articleId={article.id}
            isPublished={article.is_published}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {/* Columna Izquierda */}
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge variant="teacher" size="md" icon={LayoutDashboard} />
              <h2 className="text-xl font-semibold">Personaliza tu artículo</h2>
            </div>

            <TitleForm initialData={article} articleId={article.id} />
            <ShortDescriptionForm initialData={article} articleId={article.id} />

            <div className="relative mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
              <div className="font-medium flex flex-wrap items-center justify-between gap-2">
                Autor
              </div>
              <Input
                value={article.user?.name || ""}
                disabled
                className="mt-4 bg-brand-soft"
              />
            </div>


            <CategoryForm initialData={article} articleId={article.id} options={mappedCategories} />

            <ImageForm
              initialData={article}
              articleId={article.id}
              label="Imagen de portada (dentro del artículo)"
              endpoint={`/teacher/articles/${article.id}/image`}
              field="image_url"
            />
            <ImageForm
              initialData={article}
              articleId={article.id}
              label="Imagen de tarjeta (vista previa)"
              endpoint={`/teacher/articles/${article.id}/card-image`}
              field="card_image_url"
            />
          </div>

          {/* Columna Derecha */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2 mb-6">
                <IconBadge variant="teacher" size="md" icon={FileText} />
                <h2 className="text-xl font-semibold">Contenido</h2>
              </div>
              <ContentForm initialData={article} articleId={article.id} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
