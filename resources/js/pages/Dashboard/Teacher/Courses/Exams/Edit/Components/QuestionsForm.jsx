import React, { useState, useRef, useEffect } from "react";
import { router } from "@inertiajs/react";
import { 
  PlusCircle, Trash, Circle, CheckCircle2, 
  Square, CheckSquare, GripVertical, Pencil,
  AlertCircle
} from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

// 1. CONTENEDOR PRINCIPAL
export const QuestionsForm = ({ initialData, courseId, examId }) => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="relative relative mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
      <div className="font-medium flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-brand-soft mb-4">
        Lista de Preguntas
      </div>

      <div className="space-y-6">
        {(!initialData.questions || initialData.questions.length === 0) && !isCreating && (
          <p className="text-center py-10 text-brand-ink italic text-sm">No hay preguntas creadas.</p>
        )}

        {/* Lista de preguntas guardadas */}
        {initialData.questions?.map((question, i) => (
          <QuestionItem 
            key={question.id} 
            question={question} 
            index={i} 
            courseId={courseId} 
            examId={examId} 
          />
        ))}

        {/* Formulario para Crear Nueva Pregunta */}
        {isCreating ? (
          <QuestionBuilder 
            courseId={courseId} 
            examId={examId} 
            onCancel={() => setIsCreating(false)} 
          />
        ) : (
          <div className="flex items-center justify-center pt-4">
            <Button onClick={() => setIsCreating(true)} className="rounded-none bg-black text-white hover:bg-gray-800 font-bold uppercase tracking-wider">
              <PlusCircle className="h-4 w-4 mr-2" /> Agregar Nueva Pregunta
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// 2. VISTA DE LECTURA DE LA PREGUNTA (Solo lectura hasta presionar Editar)
const QuestionItem = ({ question, index, courseId, examId }) => {
  const [isEditing, setIsEditing] = useState(false);

  const onDeleteQuestion = () => {
    if (confirm("¿Estás seguro que deseas eliminar esta pregunta?")) {
      router.delete(`/teacher/courses/${courseId}/exams/${examId}/questions/${question.id}`, { 
        preserveScroll: true 
      });
    }
  };

  // Si está en modo edición, renderizamos el Builder con la data inicial
  if (isEditing) {
    return (
      <QuestionBuilder 
        initialData={question} 
        courseId={courseId} 
        examId={examId} 
        onCancel={() => setIsEditing(false)} 
      />
    );
  }

  // Vista de solo lectura
  const IconCorrect = question.type === "single" ? CheckCircle2 : CheckSquare;
  const IconEmpty = question.type === "single" ? Circle : Square;

  return (
    <div className="bg-white border border-brand-soft rounded-none shadow-sm p-5 transition-all">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold bg-brand text-white px-2 py-0.5 rounded-none uppercase tracking-wider">
              Pregunta {index + 1}
            </span>
            <span className="text-xs text-brand-text italic">
              {question.type === "single" ? "Una sola respuesta correcta" : "Múltiples respuestas posibles"}
            </span>
          </div>
          <p className="font-medium text-brand-ink text-lg">{question.content}</p>
        </div>
        
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Pencil className="w-4 h-4 mr-2" /> Editar
          </Button>
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 px-2" onClick={onDeleteQuestion}>
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-brand-pale">
        <ul className="space-y-2">
          {question.options?.map(option => (
            <li key={option.id} className="flex items-center gap-3 p-2 rounded text-sm hover:bg-gray-50">
              <div className={option.is_correct ? 'text-brand' : 'text-gray-300'}>
                {option.is_correct ? <IconCorrect className="h-4 w-4" /> : <IconEmpty className="h-4 w-4" />}
              </div>
              <span className={`flex-1 ${option.is_correct ? 'font-medium' : ''}`}>
                {option.content}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// 3. CONSTRUCTOR INTERACTIVO (Estilo Google Forms)
const QuestionBuilder = ({ courseId, examId, onCancel, initialData = null }) => {
  const isEditingMode = !!initialData;
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const [content, setContent] = useState(initialData?.content || "");
  const [type, setType] = useState(initialData?.type || "single");
  
  const [options, setOptions] = useState(
    initialData?.options || [
      { id: Date.now(), content: "Opción 1", is_correct: false }
    ]
  );

  const lastInputRef = useRef(null);

  // Agregar una nueva opción vacía
  const handleAddOption = () => {
    const newOption = { id: Date.now(), content: "", is_correct: false };
    setOptions([...options, newOption]);
  };

  // Auto-focus en el nuevo input cuando se agrega
  useEffect(() => {
    if (lastInputRef.current) {
      lastInputRef.current.focus();
    }
  }, [options.length]);

  const handleUpdateOption = (id, newContent) => {
    setOptions(options.map(opt => opt.id === id ? { ...opt, content: newContent } : opt));
    setErrorMsg(""); // Limpiar errores al escribir
  };

  // Lógica para marcar correcta
  const handleToggleCorrect = (id) => {
    if (type === "single") {
      setOptions(options.map(opt => ({
        ...opt,
        is_correct: opt.id === id ? !opt.is_correct : false
      })));
    } else {
      setOptions(options.map(opt => 
        opt.id === id ? { ...opt, is_correct: !opt.is_correct } : opt
      ));
    }
  };

  const handleDeleteOption = (id) => {
    setOptions(options.filter(opt => opt.id !== id));
  };

  // Al cambiar tipo, reiniciar las correctas para obligar a seleccionar manualmente
  const handleTypeChange = (newType) => {
    setType(newType);
    setOptions(options.map(opt => ({ ...opt, is_correct: false })));
  };

  const handleSave = () => {
    setErrorMsg("");
    
    // 1. Filtrar vacías
    const validOptions = options.filter(opt => opt.content.trim() !== "");
    
    // 2. Validar mínimo 2 opciones
    if (validOptions.length < 2) {
      setErrorMsg("Debe haber al menos 2 respuestas con texto.");
      return;
    }

    // 3. Validar opciones únicas (que no se repitan)
    const uniqueOptions = new Set(validOptions.map(o => o.content.trim().toLowerCase()));
    if (uniqueOptions.size !== validOptions.length) {
      setErrorMsg("Las respuestas no pueden estar repetidas.");
      return;
    }

    // 4. Validar que exista al menos una respuesta correcta
    const hasCorrectOption = validOptions.some(opt => opt.is_correct);
    if (!hasCorrectOption) {
      setErrorMsg("Debes seleccionar al menos una respuesta correcta.");
      return;
    }

    setIsSaving(true);
    const payload = { content, type, options: validOptions };

    if (isEditingMode) {
      router.patch(`/teacher/courses/${courseId}/exams/${examId}/questions/${initialData.id}`, payload, {
        preserveScroll: true,
        onSuccess: () => {
          setIsSaving(false);
          if(onCancel) onCancel();
        },
        onError: () => setIsSaving(false)
      });
    } else {
      router.post(`/teacher/courses/${courseId}/exams/${examId}/questions`, payload, {
        preserveScroll: true,
        onSuccess: () => {
          setIsSaving(false);
          setContent("");
          setOptions([{ id: Date.now(), content: "Opción 1", is_correct: false }]);
          if(onCancel) onCancel();
        },
        onError: () => setIsSaving(false)
      });
    }
  };

  const IconCorrect = type === "single" ? CheckCircle2 : CheckSquare;
  const IconEmpty = type === "single" ? Circle : Square;
  const canSave = content.trim().length > 0;

  return (
    <div className={`bg-white border-2 rounded-none shadow-md p-6 mb-6 transition-all ${isEditingMode ? 'border-brand' : 'border-gray-200'}`}>
      <div className="flex justify-between mb-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {isEditingMode ? 'Editando Pregunta' : 'Nueva Pregunta'}
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
        <Textarea 
          placeholder="Escribe la pregunta aquí..." 
          value={content} 
          onChange={e => setContent(e.target.value)} 
          className="flex-1 text-lg font-medium border-0 border-b-2 border-gray-100 rounded-none focus-visible:ring-0 focus-visible:border-brand px-1 bg-gray-50/50 resize-y min-h-[44px]"
          rows={1}
        />
        <div className="w-full md:w-64 shrink-0">
          <Select value={type} onValueChange={handleTypeChange}>
            <SelectTrigger className="bg-white border-gray-200 rounded-none focus:ring-brand">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Varias opciones (1 correcta)</SelectItem>
              <SelectItem value="multiple">Casillas (Múltiples correctas)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2 mb-6 ml-2">
        {options.map((option, index) => (
          <div key={option.id} className="flex items-center gap-3 group">
            <GripVertical className="h-4 w-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab shrink-0" />
            
            <button 
              type="button"
              onClick={() => handleToggleCorrect(option.id)}
              className={`shrink-0 transition-colors ${option.is_correct ? 'text-brand' : 'text-gray-300 hover:text-gray-400'}`}
              title={option.is_correct ? "Desmarcar" : "Marcar como correcta"}
            >
              {option.is_correct ? <IconCorrect className="h-6 w-6" /> : <IconEmpty className="h-6 w-6" />}
            </button>

            <Input 
              ref={index === options.length - 1 ? lastInputRef : null}
              value={option.content}
              onChange={(e) => handleUpdateOption(option.id, e.target.value)}
              placeholder={`Opción ${index + 1}`}
              className="flex-1 border-transparent hover:border-gray-200 focus-visible:border-b-2 focus-visible:border-b-brand focus-visible:ring-0 rounded-none px-2 h-10 shadow-none text-base"
            />

            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-8 w-8 shrink-0 transition-opacity ${options.length > 1 ? 'text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100' : 'opacity-0 pointer-events-none'}`}
              onClick={() => handleDeleteOption(option.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {/* Input Fantasma para agregar opción nueva */}
        <div className="flex items-center gap-3 pl-7 mt-2">
          <IconEmpty className="h-6 w-6 text-gray-200 shrink-0" />
          <Input 
            readOnly
            placeholder="Agregar una opción..."
            onClick={handleAddOption}
            onFocus={handleAddOption}
            className="flex-1 border-transparent cursor-text text-gray-400 hover:border-gray-200 rounded-none px-2 h-10 shadow-none"
          />
        </div>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">
          <AlertCircle className="h-4 w-4" />
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-100 gap-4">
        <span className="text-xs text-gray-500 font-medium flex items-center bg-gray-50 px-3 py-1.5 rounded-none">
          <CheckCircle2 className="h-4 w-4 mr-2 text-brand" /> 
          Haz clic en el icono para marcar la respuesta correcta
        </span>
        
        <div className="flex gap-2 w-full sm:w-auto">
          {onCancel && (
            <Button variant="ghost" onClick={onCancel} disabled={isSaving} className="w-full sm:w-auto">
              Cancelar
            </Button>
          )}
          <Button 
            onClick={handleSave} 
            disabled={!canSave || isSaving}
            className="w-full sm:w-auto rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider"
          >
            {isSaving ? "Guardando..." : "Guardar Pregunta"}
          </Button>
        </div>
      </div>
    </div>
  );
};