import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Pencil } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Editor } from "@/Components/Editor";
import { Preview } from "@/Components/Preview";

export const ChapterTitleForm = ({ initialData, courseId, chapterId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((c) => !c);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.patch(`/teacher/courses/${courseId}/chapters/${chapterId}`, { title }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsLoading(false);
        toggleEdit();
      },
      onError: () => setIsLoading(false)
    });
  };

  return (
    <div className="relative mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
      <div className="font-medium flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-x-2">
            Título del capítulo
            {initialData.title ? (
                <div className="flex items-center justify-center rounded-none bg-brand px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">Completado</div>
            ) : (
                <div className="flex items-center justify-center rounded-none bg-red-500 px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">Incompleto</div>
            )}
        </div>
        <Button onClick={toggleEdit} variant={isEditing ? "destructive" : "outline"}
          className={isEditing 
            ? "rounded-none font-bold uppercase tracking-wider"
            : "border-brand text-brand bg-white hover:bg-brand hover:text-white rounded-none font-bold uppercase tracking-wider"}>
          {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2" /> Editar título</>}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <Input 
            disabled={isLoading} 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="Ej. 'Introducción al curso'" 
            className="bg-white" 
            required 
          />
          <Button disabled={!title || isLoading} type="submit" className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider">Guardar</Button>
        </form>
      )}
    </div>
  );
};

export const ChapterDescriptionForm = ({ initialData, courseId, chapterId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(initialData.description || "");
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((c) => !c);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.patch(`/teacher/courses/${courseId}/chapters/${chapterId}`, { description }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsLoading(false);
        toggleEdit();
      },
      onError: () => setIsLoading(false)
    });
  };

  return (
    <div className="relative mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
      <div className="font-medium flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-x-2">
            Descripción del capítulo
            {initialData.description ? (
                <div className="flex items-center justify-center rounded-none bg-brand px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">Completado</div>
            ) : (
                <div className="flex items-center justify-center rounded-none bg-red-500 px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">Incompleto</div>
            )}
        </div>
        <Button onClick={toggleEdit} variant={isEditing ? "destructive" : "outline"}
          className={isEditing 
            ? "rounded-none font-bold uppercase tracking-wider"
            : "border-brand text-brand bg-white hover:bg-brand hover:text-white rounded-none font-bold uppercase tracking-wider"}>
          {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2" /> Editar descripción</>}
        </Button>
      </div>
      {!isEditing && (
        <div className={`text-sm mt-2 ${!initialData.description ? "text-brand-ink italic" : ""}`}>
          {!initialData.description ? "Sin descripción" : (
            <Preview value={initialData.description} />
          )}
        </div>
      )}
      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <Editor 
            value={description}
            onChange={(val) => setDescription(val)}
          />
          <Button disabled={!description || isLoading} type="submit" className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider">Guardar</Button>
        </form>
      )}
    </div>
  );
};

export const ChapterAccessForm = ({ initialData, courseId, chapterId, courseIsFree }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFree, setIsFree] = useState(initialData.is_free || false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((c) => !c);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.patch(`/teacher/courses/${courseId}/chapters/${chapterId}`, { is_free: isFree }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsLoading(false);
        toggleEdit();
      },
      onError: () => setIsLoading(false)
    });
  };

  if (courseIsFree) {
    return null; // Ocultar si el curso entero ya es gratis
  }

  return (
    <div className="relative mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
      <div className="font-medium flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-x-2">
            Configuración de acceso
            {initialData.is_free !== null ? (
                <div className="flex items-center justify-center rounded-none bg-brand px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">Completado</div>
            ) : (
                <div className="flex items-center justify-center rounded-none bg-red-500 px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">Incompleto</div>
            )}
        </div>
        <Button onClick={toggleEdit} variant={isEditing ? "destructive" : "outline"}
          className={isEditing 
            ? "rounded-none font-bold uppercase tracking-wider"
            : "border-brand text-brand bg-white hover:bg-brand hover:text-white rounded-none font-bold uppercase tracking-wider"}>
          {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2" /> Editar acceso</>}
        </Button>
      </div>
      {!isEditing && (
        <p className={`text-sm mt-2 ${!initialData.is_free ? "text-brand-ink italic" : ""}`}>
          {initialData.is_free 
            ? "Este capítulo es gratuito para una vista previa." 
            : "Este capítulo no es gratuito."}
        </p>
      )}
      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <div className="flex flex-row items-start space-x-3 space-y-0 rounded-none border p-4 bg-white">
            <input 
              type="checkbox"
              id="is_free_checkbox"
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
              className="mt-1 h-4 w-4 text-brand rounded-none border-brand focus:ring-brand"
            />
            <div className="space-y-1 leading-none">
              <label htmlFor="is_free_checkbox" className="text-sm font-medium text-brand-text cursor-pointer">
                Ver este capítulo gratis
              </label>
              <p className="text-sm text-brand-ink">
                Selecciona esta casilla si quieres que el capítulo esté disponible como demostración.
              </p>
            </div>
          </div>
          <Button disabled={isLoading} type="submit" className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider">Guardar</Button>
        </form>
      )}
    </div>
  );
};
