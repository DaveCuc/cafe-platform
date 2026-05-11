import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { CourseLayout } from "../Show/Components/CourseLayout";

export default function ExamTake({ course, exam, progressCount }) {
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOptionSelect = (questionId, optionId, isMultiple) => {
        setAnswers(prev => {
            const newAnswers = { ...prev };
            
            if (isMultiple) {
                // Toggle para multiple choice
                if (!newAnswers[questionId]) newAnswers[questionId] = [];
                
                if (newAnswers[questionId].includes(optionId)) {
                    newAnswers[questionId] = newAnswers[questionId].filter(id => id !== optionId);
                } else {
                    newAnswers[questionId] = [...newAnswers[questionId], optionId];
                }
            } else {
                // Radio button para single choice
                newAnswers[questionId] = [optionId];
            }
            
            return newAnswers;
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        router.post(`/courses/${course.id}/exams/${exam.id}/take`, { answers }, {
            preserveScroll: true,
            onError: () => setIsSubmitting(false)
        });
    }

    return (
        <CourseLayout course={course} progressCount={progressCount} currentExamId={exam.id} purchase={true}>
            <div className="min-h-screen bg-brand-pale">
                 <Head title={`Rendiendo Examen: ${exam.title}`} />
                 <div className="max-w-3xl mx-auto p-6 md:p-10 mb-20 bg-white min-h-screen shadow-sm md:rounded-lg">
                 <button onClick={() => router.visit(route("courses.exams.show", { course: course.id, exam: exam.id }))} className="flex items-center text-sm hover:opacity-75 transition mb-6 text-brand-text">
                     <ArrowLeft className="h-4 w-4 mr-2" />
                     Volver o Cancelar
                 </button>
                 
                 <h1 className="text-3xl font-bold mb-8 text-brand-ink">{exam.title}</h1>
                 
                 {exam.questions?.length === 0 ? (
                     <p className="text-brand-ink italic">Este examen no tiene preguntas aún.</p>
                 ) : (
                     <form onSubmit={handleSubmit} className="space-y-12">
                         {exam.questions?.map((question, i) => (
                             <div key={question.id} className="border border-brand-soft rounded-lg p-6 bg-brand-pale/10 shadow-sm relative">
                                 <h3 className="font-semibold text-lg mb-4 flex gap-4">
                                     <span className="text-brand-ink bg-brand-soft px-3 py-1 rounded text-sm font-bold align-top">
                                         {i + 1}
                                     </span>
                                     <div>
                                         {question.content}
                                     </div>
                                 </h3>
                                 <span className="text-xs text-brand-text mb-4 italic block ml-14">
                                     {question.type === 'single' ? 'Selecciona una opción' : 'Selecciona múltiples opciones'}
                                 </span>
                                 
                                 <div className="space-y-3 ml-14">
                                     {question.options?.map(option => (
                                         <label key={option.id} className={`flex items-start gap-4 p-4 border rounded cursor-pointer transition ${answers[question.id]?.includes(option.id) ? 'bg-brand-soft/20 border-brand-soft' : 'bg-white hover:bg-brand-pale border-gray-200'}`}>
                                             <input 
                                                 type={question.type === 'single' ? 'radio' : 'checkbox'} 
                                                 name={`q-${question.id}`}
                                                 checked={answers[question.id]?.includes(option.id) || false}
                                                 onChange={() => handleOptionSelect(question.id, option.id, question.type === 'multiple')}
                                                 className="mt-1"
                                             />
                                             <span className="text-sm font-medium leading-tight">
                                                 {option.content}
                                             </span>
                                         </label>
                                     ))}
                                 </div>
                             </div>
                         ))}
                         
                         <div className="pt-6 border-t flex justify-end">
                             <Button type="submit" disabled={isSubmitting} size="lg" className="px-10">
                                 {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                 Entregar Examen
                             </Button>
                         </div>
                     </form>
                 )}
             </div>
        </div>
        </CourseLayout>
    )
}
