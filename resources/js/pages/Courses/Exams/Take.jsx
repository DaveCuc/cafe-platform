import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { CourseLayout } from "../Show/Components/CourseLayout";
import { motion, AnimatePresence } from "framer-motion";

export default function ExamTake({ course, exam, progressCount, purchase }) {
    const [answers, setAnswers] = useState({});
    const [isGenerating, setIsGenerating] = useState(true);
    const [isConcluding, setIsConcluding] = useState(false);
    const [slideState, setSlideState] = useState('in'); // 'in' o 'out'
    const [actionType, setActionType] = useState(null); // 'cancel' o 'submit'

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsGenerating(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    const allAnswered = exam.questions?.length > 0 && exam.questions.every(
        (q) => answers[q.id] && answers[q.id].length > 0
    );

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

    const handleCancel = () => {
        setActionType('cancel');
        setSlideState('out');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!allAnswered) return;
        setIsConcluding(true);
        setTimeout(() => {
            setActionType('submit');
            setSlideState('out');
        }, 2000); // Muestra la carga de finalizar unos segundos antes del barrido a la derecha
    }

    return (
        <CourseLayout course={course} currentExamId={exam.id} progressCount={progressCount} purchase={purchase} hideSidebar={true}>
            <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: slideState === 'in' ? 0 : "100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                onAnimationComplete={() => {
                    if (slideState === 'out') {
                        if (actionType === 'cancel') {
                            router.visit(route("courses.exams.show", { course: course.id, exam: exam.id }));
                        } else if (actionType === 'submit') {
                            router.post(`/courses/${course.id}/exams/${exam.id}/take`, { answers }, {
                                preserveScroll: true
                            });
                        }
                    }
                }}
                className="min-h-screen bg-brand-pale relative overflow-hidden"
            >
                 <Head title={`Rendiendo Examen: ${exam.title}`} />
                 
                 <AnimatePresence>
                     {(isGenerating || isConcluding) && (
                         <motion.div 
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             exit={{ opacity: 0 }}
                             className="absolute inset-0 bg-brand-pale z-20 flex flex-col items-center justify-center p-6"
                         >
                             <motion.div
                                 animate={{ scale: [1, 1.1, 1] }}
                                 transition={{ repeat: Infinity, duration: 1.5 }}
                                 className="w-20 h-20 bg-brand-soft rounded-full flex items-center justify-center mb-6 shadow-lg"
                             >
                                 <Loader2 className="w-10 h-10 text-brand-ink animate-spin" />
                             </motion.div>
                             <motion.h2 
                                 animate={{ opacity: [0.5, 1, 0.5] }}
                                 transition={{ repeat: Infinity, duration: 2 }}
                                 className="text-2xl font-bold text-brand-ink"
                             >
                                 {isGenerating ? "Generando examen..." : "Evaluando respuestas..."}
                             </motion.h2>
                             <p className="text-brand-text mt-2 text-center max-w-md">
                                 {isGenerating 
                                    ? "Preparando tus preguntas y configurando el entorno para tu prueba. No cierres esta ventana."
                                    : "Guardando tus resultados y calcúlando calificación. Un momento por favor."}
                             </p>
                         </motion.div>
                     )}
                 </AnimatePresence>

                 <div className="max-w-3xl mx-auto p-6 md:p-10 mb-20 bg-white min-h-screen shadow-sm md:rounded-lg relative z-10">
                 <button type="button" onClick={handleCancel} className="flex items-center text-sm hover:opacity-75 transition mb-6 text-brand-text cursor-pointer">
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
                         
                         <div className="pt-6 border-t flex justify-end flex-col items-end">
                             {!allAnswered && (
                                 <p className="text-rose-500 text-sm mb-3">Debes responder todas las preguntas para entregar el examen.</p>
                             )}
                             <Button type="submit" disabled={isConcluding || !allAnswered} size="lg" className="px-10">
                                 {isConcluding && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                 Entregar Examen
                             </Button>
                         </div>
                     </form>
                 )}
             </div>
        </motion.div>
        </CourseLayout>
    )
}
