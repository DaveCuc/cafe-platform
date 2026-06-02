import React from "react";
import { Head, Link } from "@inertiajs/react";
import { CourseLayout } from "../Show/Components/CourseLayout";
import { Banner } from "@/Components/banner";
import { Button } from "@/Components/ui/button";

export default function ExamShow({ course, exam, attempts, hasPassed, progressCount, purchase }) {
    const isOwner = course.user_id === window.page?.props?.auth?.user?.id;
    const canAttempt = isOwner || !exam.attempts_allowed || attempts.length < exam.attempts_allowed;

    const maxScore = attempts.reduce((max, att) => att.score > max ? att.score : max, 0);

    return (
        <CourseLayout course={course} currentExamId={exam.id} progressCount={progressCount} purchase={purchase}>
            <Head title={`${course.title} - ${exam.title}`} />
            {!exam.is_published && (
                <Banner
                    variant="warning"
                    label="Este examen no está publicado. Solo tú puedes verlo."
                />
            )}
            <div className="flex flex-col max-w-4xl mx-auto pb-20 mt-8">
                <div className="p-6">
                    <h2 className="text-3xl font-bold mb-4 dark:text-white">{exam.title}</h2>
                    {exam.description && (
                        <div className="text-brand-ink/80 dark:text-gray-300 mb-6 bg-brand-pale/30 dark:bg-[#252525] p-6 rounded-none">
                            {exam.description}
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-6 mb-8 mt-8">
                        <div className="bg-white dark:bg-[#252525] text-center p-8 rounded-none flex-1">
                            <div className="text-sm text-brand-text dark:text-gray-300 mb-2">Intentos permitidos</div>
                            <div className="text-2xl font-bold text-brand-ink dark:text-white">{exam.attempts_allowed || "Ilimitados"}
                            </div>
                            <br />
                            <div className="text-sm text-brand-text dark:text-gray-300 mb-2">Puntuación mínima para aprobar</div>
                            <div className="text-2xl font-bold text-brand-ink dark:text-white">{exam.min_score ? `${exam.min_score}%` : '80%'}</div>
                        </div>
                        <div className="bg-white dark:bg-[#252525] text-center p-8 rounded-none flex-1 flex flex-col justify-center">
                            <div className="text-2xl font-bold text-brand-text dark:text-white mb-2">Tu Calificación</div>
                            <div className={`font-bold text-brand-ink dark:text-white ${attempts.length > 0 ? 'text-8xl' : 'text-3xl mt-4'}`}>
                                {attempts.length > 0 ? `${maxScore}%` : "Sin intentos"}
                            </div>
                        </div>
                    </div>


                    {!hasPassed && attempts.length > 0 && !canAttempt && (
                        <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 p-4 rounded-none mb-8 text-center font-medium">
                            Has agotado todos tus intentos para este examen.
                        </div>
                    )}

                    {hasPassed && (
                        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200 p-6 rounded-none mb-8 text-center">
                            <h3 className="text-xl font-bold mb-2">¡Felicidades!</h3>
                            <p>Has aprobado este examen con una puntuación máxima de {maxScore}%</p>
                        </div>
                    )}


                    <div className="flex justify-center pb-10">
                        {canAttempt && (
                            <Link href={`/courses/${course.id}/exams/${exam.id}/take`}>
                                <Button size="lg" className="w-full md:w-auto px-8 rounded-none bg-brand text-white hover:bg-brand-darker border-0 font-bold uppercase tracking-wider" as="span">
                                    {attempts.length > 0 ? "Reintentar Examen" : "Comenzar Examen"}
                                </Button>
                            </Link>
                        )}
                    </div>




                    {attempts.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4 dark:text-white">Tus intentos anteriores</h3>

                            <div className="rounded-none overflow-hidden bg-white dark:bg-[#252525]">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-brand-pale dark:bg-brand-darker text-brand-ink dark:text-gray-200 uppercase text-xs">
                                        <tr>
                                            <th className="px-6 py-3">Intento</th>
                                            <th className="px-6 py-3">Puntuación</th>
                                            <th className="px-6 py-3 text-right">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attempts.map((attempt, i) => (
                                            <tr key={attempt.id} className="border-b dark:border-brand-soft/20 last:border-0 hover:bg-brand-soft/10 dark:hover:bg-brand-dark/50">
                                                <td className="px-6 py-4 font-medium dark:text-white">#{attempts.length - i}</td>
                                                <td className="px-6 py-4 dark:text-gray-300">{attempt.score}%</td>
                                                <td className="px-6 py-4 text-right">
                                                    {attempt.score >= exam.min_score ? (
                                                        <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-none text-xs font-semibold">Aprobado</span>
                                                    ) : (
                                                        <span className="bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-100 px-2 py-1 rounded-none text-xs font-semibold">Reprobado</span>
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
