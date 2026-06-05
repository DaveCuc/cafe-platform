import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Pencil } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Editor } from "@/Components/Editor";
import { Preview } from "@/Components/Preview";
import Checkbox from "@/Components/Checkbox";

export const TitleForm = ({ initialData, courseId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((c) => !c);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.patch(`/teacher/courses/${courseId}`, { title }, {
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
            Título del curso
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
          {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2 " /> Editar título</>}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <Input 
            disabled={isLoading} 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="Ej. 'Curso Nuevo'" 
            className="bg-white" 
            required 
          />
          <Button disabled={!title || isLoading} type="submit" className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider w-full md:w-auto">Guardar</Button>
        </form>
      )}
    </div>
  );
};

export const DescriptionForm = ({ initialData, courseId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(initialData.description || "");
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((c) => !c);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.patch(`/teacher/courses/${courseId}`, { description }, {
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
            Descripción del curso
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
          <Button disabled={!description || isLoading} type="submit" className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider w-full md:w-auto">Guardar</Button>
        </form>
      )}
    </div>
  );
};


