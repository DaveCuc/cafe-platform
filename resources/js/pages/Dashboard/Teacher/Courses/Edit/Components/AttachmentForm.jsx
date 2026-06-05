import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { PlusCircle, File, Loader2, X } from "lucide-react";
import { Button } from "@/Components/ui/button";

export const AttachmentForm = ({ initialData, courseId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((c) => !c);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    router.post(`/teacher/courses/${courseId}/attachments`, {
      attachment: file,
      name: file.name
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsLoading(false);
        setFile(null);
        toggleEdit();
      },
      onError: () => setIsLoading(false)
    });
  };

  const onDelete = (id) => {
    setDeletingId(id);
    router.delete(`/teacher/courses/${courseId}/attachments/${id}`, {
      preserveScroll: true,
      onFinish: () => setDeletingId(null),
    });
  };

  return (
    <div className="relative mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
      <div className="font-medium flex flex-wrap items-center justify-between gap-2">
        Archivos del curso
        <Button onClick={toggleEdit} variant={isEditing ? "destructive" : "outline"}
          className={isEditing 
            ? "rounded-none font-bold uppercase tracking-wider"
            : "border-brand text-brand bg-white hover:bg-brand hover:text-white rounded-none font-bold uppercase tracking-wider"}>
          {isEditing ? <>Cancelar</> : <><PlusCircle className="h-4 w-4 mr-2" /> Agregar archivo</>}
        </Button>
      </div>

      {!isEditing && (
        <>
          {(!initialData.attachments || initialData.attachments.length === 0) && (
            <p className="text-sm mt-2 text-brand-ink italic">No hay recursos adjuntos aún.</p>
          )}
          {initialData.attachments?.length > 0 && (
            <div className="space-y-2 mt-2">
              {initialData.attachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center p-3 w-full bg-white border-brand-soft border text-brand-ink rounded-none">
                  <File className="h-4 w-4 mr-2 shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id ? (
                    <div className="ml-auto">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : (
                    <button onClick={() => onDelete(attachment.id)} className="ml-auto hover:opacity-75 transition">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
           <div className="relative flex items-center">
             <input 
                id="file-upload"
                type="file"
                onChange={e => setFile(e.target.files[0])}
                   className="hidden"
             />
             <label htmlFor="file-upload" className="cursor-pointer bg-brand text-white px-4 py-2 hover:bg-brand-darker font-bold uppercase tracking-wider text-sm rounded-none border border-brand transition">
               Elegir archivo
             </label>
             <span className="ml-4 text-sm text-brand-ink">
               {file ? file.name : "Ningún archivo seleccionado"}
             </span>
           </div>
           <Button disabled={!file || isLoading} type="submit" className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider w-full md:w-auto">Subir archivo</Button>
           <div className="text-xs text-muted-foreground mt-4">
            Agrega archivos relacionados con el curso, como PDFs, documentos o recursos adicionales.
          </div>
        </form>
      )}
    </div>
  );
};
