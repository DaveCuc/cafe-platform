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
                className="min-h-screen bg-brand-pale dark:bg-[#121212] relative overflow-hidden transition-colors"
            >
                 <Head title={`Rendiendo Examen: ${exam.title}`} />
                 
                 <AnimatePresence>
                     {(isGenerating || isConcluding) && (
                         <motion.div 
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             exit={{ opacity: 0 }}
                             className="absolute inset-0 bg-brand-pale dark:bg-[#121212] z-20 flex flex-col items-center justify-center p-6"
                         >
                             <motion.div
                                 animate={{ scale: [1, 1.1, 1] }}
                                 transition={{ repeat: Infinity, duration: 1.5 }}
                                 className="w-20 h-20 bg-brand dark:bg-brand-dark rounded-none flex items-center justify-center mb-6 shadow-xl"
                             >
                                 <Loader2 className="w-10 h-10 text-white animate-spin" />
                             </motion.div>
                             <motion.h2 
                                 animate={{ opacity: [0.5, 1, 0.5] }}
                                 transition={{ repeat: Infinity, duration: 2 }}
                                 className="text-2xl font-bold text-brand-ink dark:text-white"
                             >
                                 {isGenerating ? "Generando examen..." : "Evaluando respuestas..."}
                             </motion.h2>
                             <p className="text-brand-text dark:text-gray-400 mt-2 text-center max-w-md">
                                 {isGenerating 
                                    ? "Preparando tus preguntas y configurando el entorno para tu prueba. No cierres esta ventana."
                                    : "Guardando tus resultados y calcúlando calificación. Un momento por favor."}
                             </p>
                         </motion.div>
                     )}
                 </AnimatePresence>

                 <div className="max-w-4xl mx-auto p-8 md:p-16 mb-20 bg-white dark:bg-[#1a1a1a] min-h-screen shadow-xl rounded-none relative z-10 transition-colors">
                 <button type="button" onClick={handleCancel} className="flex items-center text-sm hover:opacity-75 transition mb-10 text-brand-text dark:text-gray-400 cursor-pointer font-bold uppercase tracking-wider">
                     <ArrowLeft className="h-4 w-4 mr-2" />
                     Volver o Cancelar
                 </button>
                 
                 <h1 className="text-4xl md:text-5xl font-black mb-12 text-brand-ink dark:text-white leading-tight">{exam.title}</h1>
                 
                 {exam.questions?.length === 0 ? (
                     <p className="text-brand-ink dark:text-gray-400 italic">Este examen no tiene preguntas aún.</p>
                 ) : (
                     <form onSubmit={handleSubmit} className="space-y-16">
                         {exam.questions?.map((question, i) => (
                             <div key={question.id} className="border-0 rounded-none p-8 md:p-12 bg-white dark:bg-[#252525] shadow-lg relative transition-colors">
                                 <h3 className="font-bold text-xl md:text-2xl mb-6 flex gap-6 text-brand-ink dark:text-white leading-relaxed">
                                     <span className="text-white bg-brand dark:bg-brand-dark px-4 py-2 rounded-none text-lg font-black align-top shadow-md">
                                         {i + 1}
                                     </span>
                                     <div className="pt-1">
                                         {question.content}
                                     </div>
                                 </h3>
                                 <span className="text-xs font-bold text-brand-text dark:text-gray-400 mb-6 uppercase tracking-widest block ml-16 md:ml-20">
                                     {question.type === 'single' ? 'Selecciona una opción' : 'Selecciona múltiples opciones'}
                                 </span>
                                 
                                 <div className="space-y-4 ml-16 md:ml-20">
                                     {question.options?.map(option => (
                                         <label key={option.id} className={`flex items-start gap-4 p-5 md:p-6 border-0 rounded-none cursor-pointer transition-all shadow-md ${answers[question.id]?.includes(option.id) ? 'bg-brand dark:bg-brand-dark text-white' : 'bg-brand-pale dark:bg-[#1a1a1a] text-brand-ink dark:text-gray-300 hover:bg-brand/10 dark:hover:bg-brand/20 hover:-translate-y-1'}`}>
                                             <input 
                                                 type={question.type === 'single' ? 'radio' : 'checkbox'} 
                                                 name={`q-${question.id}`}
                                                 checked={answers[question.id]?.includes(option.id) || false}
                                                 onChange={() => handleOptionSelect(question.id, option.id, question.type === 'multiple')}
                                                 className="mt-1 w-5 h-5 accent-brand border-none outline-none shadow-none focus:ring-0 rounded-none cursor-pointer"
                                             />
                                             <span className={`text-base md:text-lg font-bold leading-relaxed ${answers[question.id]?.includes(option.id) ? 'text-white' : 'text-brand-ink dark:text-gray-300'}`}>
                                                 {option.content}
                                             </span>
                                         </label>
                                     ))}
                                 </div>
                             </div>
                         ))}
                         
                         <div className="pt-10 flex justify-end flex-col items-end">
                             {!allAnswered && (
                                 <p className="text-rose-500 dark:text-rose-400 font-bold text-sm mb-4 uppercase tracking-widest bg-rose-50 dark:bg-rose-950 p-4">Debes responder todas las preguntas para entregar el examen.</p>
                             )}
                             <Button type="submit" disabled={isConcluding || !allAnswered} size="lg" className="px-12 py-8 text-xl font-black uppercase tracking-wider rounded-none bg-brand text-white hover:bg-brand-dark border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all w-full md:w-auto">
                                 {isConcluding && <Loader2 className="w-6 h-6 mr-3 animate-spin" />}
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
