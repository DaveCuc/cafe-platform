import React from "react";
import { Head, Link } from "@inertiajs/react";
import { CircleDollarSign, File, LayoutDashboard, ListChecks, ArrowLeft } from "lucide-react";
import MainLayout from "@/Layouts/MainLayout";

import { TitleForm, DescriptionForm, PriceForm } from "./Components/SimpleForms";
import { CategoryForm } from "./Components/CategoryForm";
import { ImageForm } from "./Components/ImageForm";
import { AttachmentForm } from "./Components/AttachmentForm";
import { CourseContentForm } from "./Components/CourseContentForm";
import { Actions } from "./Components/Actions";
import { Banner } from "@/Components/banner";
import { IconBadge } from "@/Components/icon-badge";

export default function CourseEditor({ course, categories }) {
  const mappedCategories = categories.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));

  const requiredFields = [
    course.title,
    course.description,
    course.image_url,
    course.price !== null || course.is_free,
    course.category_id,
    (course.chapters?.length > 0 || course.exams?.length > 0) &&
    [...(course.chapters || []), ...(course.exams || [])].every(item => item.is_published)
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <MainLayout>
      <Head title={`Editar Curso: ${course.title}`} />
      
      {!course.is_published && isComplete && (
        <Banner variant="warningSolid" label="Este curso no es visible para los estudiantes hasta que lo publiques." />
      )}
      {!course.is_published && !isComplete && (
        <Banner variant="warningSolid" label="A este curso le faltan campos obligatorios para poder ser publicado." />
      )}

      <div className="p-6 pb-20 max-w-6xl mx-auto">
        <Link href={`/teacher/courses`} className="flex items-center text-sm hover:opacity-75 transition mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a la lista de cursos
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold">Configuración del curso</h1>
            <span className="text-sm text-brand-text">
              Completa todos los campos {completionText}
            </span>
          </div>
          <Actions 
            disabled={!isComplete} 
            courseId={course.id} 
            isPublished={course.is_published} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {/* Columna Izquierda */}
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge variant="teacher" size="md" icon={LayoutDashboard} />
              <h2 className="text-xl font-semibold">Personaliza tu curso</h2>
            </div>

            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <CategoryForm initialData={course} courseId={course.id} options={mappedCategories} />
            <ImageForm initialData={course} courseId={course.id} />
          </div>

          {/* Columna Derecha */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2 mb-6">
                <IconBadge variant="teacher" size="md" icon={ListChecks} />
                <h2 className="text-xl font-semibold">Contenido del curso</h2>
              </div>
              <CourseContentForm initialData={course} courseId={course.id} />
            </div>

            <div>
              <div className="flex items-center gap-x-2 mb-6">
                <IconBadge variant="teacher" size="md" icon={CircleDollarSign} />
                <h2 className="text-xl font-semibold">Precio del curso</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id} />
            </div>

            <div>
              <div className="flex items-center gap-x-2 mb-6">
                <IconBadge variant="teacher" size="md" icon={File} />
                <h2 className="text-xl font-semibold">Adjuntar archivos al curso</h2>
              </div>
              <AttachmentForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
