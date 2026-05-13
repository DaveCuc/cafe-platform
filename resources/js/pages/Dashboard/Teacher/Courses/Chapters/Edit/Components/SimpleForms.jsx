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
    <div className="mt-6 border bg-brand-pale rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Título del capítulo
        <Button onClick={toggleEdit} variant="ghost" className="bg-white hover:bg-brand-soft hover:text-white">
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
          <Button disabled={!title || isLoading} type="submit">Guardar</Button>
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
    <div className="mt-6 border bg-brand-pale rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Descripción del capítulo
        <Button onClick={toggleEdit} variant="ghost" className="bg-white hover:bg-brand-soft hover:text-white">
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
          <Button disabled={!description || isLoading} type="submit">Guardar</Button>
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
    <div className="mt-6 border bg-brand-pale rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Configuración de acceso 
        <Button onClick={toggleEdit} variant="ghost" className="bg-white hover:bg-brand-soft hover:text-white">
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
          <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-white">
            <input 
              type="checkbox"
              id="is_free_checkbox"
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
              className="mt-1 h-4 w-4 text-brand-soft rounded border-brand-soft focus:ring-brand-soft"
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
          <Button disabled={isLoading} type="submit">Guardar</Button>
        </form>
      )}
    </div>
  );
};
