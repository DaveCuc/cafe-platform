import React from "react";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, LayoutDashboard, ListChecks, ArrowLeftCircle } from "lucide-react";
import MainLayout from "@/Layouts/MainLayout";
import { Banner } from "@/Components/banner";
import { IconBadge } from "@/Components/icon-badge";
import { Actions } from "./Components/Actions";

import { TitleForm, DescriptionForm, SettingsForm } from "./Components/SettingsForms";
import { QuestionsForm } from "./Components/QuestionsForm";

export default function ExamEditor({ course, exam }) {
    const isSetupComplete = exam.title && exam.questions?.length > 0;
    const completionText = isSetupComplete ? "(Completado)" : "(Faltan pasos)";

    return (
        <MainLayout>
            <Head title={`Editar Examen: ${exam.title}`} />

            {!exam.is_published && (
                <Banner variant="warningSolid" label="Este examen no será visible hasta que lo publiques y el curso esté publicado." />
            )}

            <div className="p-6 pb-20 max-w-6xl mx-auto">
                <Link href={`/teacher/courses/${course.id}`} className="flex items-center text-sm hover:opacity-75 transition mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver a la configuración del curso
                </Link>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-bold">Configuración del examen</h1>
                        <span className="text-sm text-brand-text">
                            Completa la configuración {completionText}
                        </span>
                    </div>
                    <Actions
                        disabled={!isSetupComplete}
                        courseId={course.id}
                        examId={exam.id}
                        isPublished={exam.is_published}
                    />
                </div>

                <div>
                    <div>
                        <div className="flex items-center gap-x-2 pt-5">
                            <IconBadge variant="teacher" size="md" icon={LayoutDashboard} />
                            <h2 className="text-xl font-semibold">Personaliza tu examen</h2>
                        </div>
                        <TitleForm initialData={exam} courseId={course.id} examId={exam.id} />
                        <DescriptionForm initialData={exam} courseId={course.id} examId={exam.id} />
                        <SettingsForm initialData={exam} courseId={course.id} examId={exam.id} />
                    </div>
                </div>

                <div>
                    <div>
                        <div className="flex items-center gap-x-2 mb-6 pt-5">
                            <IconBadge variant="teacher" size="md" icon={ListChecks} />
                            <h2 className="text-xl font-semibold">Preguntas del examen</h2>
                        </div>
                        <QuestionsForm initialData={exam} courseId={course.id} examId={exam.id} />
                    </div>
                </div>

                
            </div>
        </MainLayout>
    );
}
