import React from "react";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import MainLayout from "@/Layouts/MainLayout";

import { ChapterTitleForm, ChapterDescriptionForm, ChapterAccessForm } from "./Components/SimpleForms";
import { ChapterVideoForm, ChapterImageForm } from "./Components/VideoForm";
import { ChapterActions } from "./Components/Actions";
import { Banner } from "@/Components/banner";
import { IconBadge } from "@/Components/icon-badge";

export default function ChapterEditor({ courseId, chapter }) {
  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.is_video_required ? chapter.video_url : true,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <MainLayout>
      <Head title={`Editar Capítulo: ${chapter.title}`} />
      
      {!chapter.is_published && (
        <Banner label="Este capítulo no está publicado aún, no será visible para los estudiantes." variant="warningSolid" />
      )}

      <div className="p-6 pb-20 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a la configuración del curso
            </Link>

            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-bold">Creación del capítulo</h1>
                <span className="text-sm text-brand-text">
                  Completa todos los campos {completionText}
                </span>
              </div>
              <ChapterActions 
                disabled={!isComplete} 
                courseId={courseId} 
                chapterId={chapter.id} 
                isPublished={chapter.is_published} 
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {/* Columna Izquierda */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge variant="teacher" size="md" icon={LayoutDashboard} />
                <h2 className="text-xl font-semibold">Personaliza tu capítulo</h2>
              </div>
              <ChapterTitleForm initialData={chapter} courseId={courseId} chapterId={chapter.id} />
              <ChapterDescriptionForm initialData={chapter} courseId={courseId} chapterId={chapter.id} />
            </div>
            
            <div>
              <div className="flex items-center gap-x-2 mt-8">
                <IconBadge variant="teacher" size="md" icon={Eye} />
                <h2 className="text-xl font-semibold">Configuración de acceso</h2>
              </div>
              <ChapterAccessForm initialData={chapter} courseId={courseId} chapterId={chapter.id} />
            </div>
          </div>

          {/* Columna Derecha */}
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge variant="teacher" size="md" icon={Video} />
              <h2 className="text-xl font-semibold">Media del capítulo</h2>
            </div>
            <ChapterVideoForm initialData={chapter} courseId={courseId} chapterId={chapter.id} /> 
            <ChapterImageForm initialData={chapter} courseId={courseId} chapterId={chapter.id} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
