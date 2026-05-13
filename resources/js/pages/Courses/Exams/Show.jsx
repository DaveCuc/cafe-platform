import React from "react";
import { Head, Link } from "@inertiajs/react";
import { CourseLayout } from "../Show/Components/CourseLayout";
import { Banner } from "@/Components/banner";
import { Button } from "@/Components/ui/button";

export default function ExamShow({ course, exam, attempts, hasPassed }) {
    const isOwner = course.user_id === window.page?.props?.auth?.user?.id;
    const canAttempt = isOwner || !exam.attempts_allowed || attempts.length < exam.attempts_allowed;

    const maxScore = attempts.reduce((max, att) => att.score > max ? att.score : max, 0);

    return (
        <CourseLayout course={course} currentExamId={exam.id}>
            <Head title={`${course.title} - ${exam.title}`} />
            {!exam.is_published && (
                <Banner
                    variant="warning"
                    label="Este examen no está publicado. Solo tú puedes verlo."
                />
            )}
            <div className="flex flex-col max-w-4xl mx-auto pb-20 mt-8">
                <div className="p-6">
                    <h2 className="text-3xl font-bold mb-4">{exam.title}</h2>
                    {exam.description && (
                        <div className="text-brand-ink/80 mb-6 bg-brand-pale/30 p-4 rounded-md border border-brand-soft/50">
                            {exam.description}
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-6 mb-8 mt-8">
                        <div className="bg-white border text-center p-6 rounded-lg flex-1 shadow-sm">
                            <div className="text-sm text-brand-text mb-2">Intentos permitidos</div>
                            <div className="text-2xl font-bold text-brand-ink">{exam.attempts_allowed || "Ilimitados"}
                            </div>
                            <br />
                            <div className="text-sm text-brand-text mb-2">Puntuación mínima para aprobar</div>
                            <div className="text-2xl font-bold text-brand-ink">{exam.min_score ? `${exam.min_score}%` : '80%'}</div>
                        </div>
                        <div className="bg-white border text-center p-6 rounded-lg flex-1 shadow-sm">
                            <div className="text-2xl font-bold text-brand-text mb-2">Tu Calificación</div>
                            <div className="text-8xl font-bold text-brand-ink">
                                {attempts.length > 0 ? `${maxScore}%` : "Sin intentos"}
                            </div>
                        </div>
                    </div>


                    {!hasPassed && attempts.length > 0 && !canAttempt && (
                        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-md mb-8 text-center font-medium">
                            Has agotado todos tus intentos para este examen.
                        </div>
                    )}

                    {hasPassed && (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-md mb-8 text-center">
                            <h3 className="text-xl font-bold mb-2">¡Felicidades!</h3>
                            <p>Has aprobado este examen con una puntuación máxima de {maxScore}%</p>
                        </div>
                    )}


                    <div className="flex justify-center pb-10">
                        {canAttempt && (
                            <Link href={`/courses/${course.id}/exams/${exam.id}/take`}>
                                <Button size="lg" className="w-full md:w-auto px-8" as="span">
                                    {attempts.length > 0 ? "Reintentar Examen" : "Comenzar Examen"}
                                </Button>
                            </Link>
                        )}
                    </div>




                    {attempts.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4">Tus intentos anteriores</h3>

                            <div className="border rounded-md overflow-hidden bg-white">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-brand-pale text-brand-ink uppercase text-xs">
                                        <tr>
                                            <th className="px-6 py-3">Intento</th>
                                            <th className="px-6 py-3">Puntuación</th>
                                            <th className="px-6 py-3 text-right">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attempts.map((attempt, i) => (
                                            <tr key={attempt.id} className="border-b last:border-0 hover:bg-brand-soft/10">
                                                <td className="px-6 py-4 font-medium">#{attempts.length - i}</td>
                                                <td className="px-6 py-4">{attempt.score}%</td>
                                                <td className="px-6 py-4 text-right">
                                                    {attempt.score >= exam.min_score ? (
                                                        <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-semibold">Aprobado</span>
                                                    ) : (
                                                        <span className="bg-rose-100 text-rose-800 px-2 py-1 rounded text-xs font-semibold">Reprobado</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    

                    
                </div>
            </div>
        </CourseLayout>
    )
}
