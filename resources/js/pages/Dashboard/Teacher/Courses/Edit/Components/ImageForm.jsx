import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { CustomFileUpload } from "@/Components/CustomFileUpload";

export const ImageForm = ({ initialData, courseId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    // Laravel procesará esto como un POST normal porque web.php define Route::post()
    router.post(`/teacher/courses/${courseId}/image`, {
      image: file,
    }, {
      preserveScroll: true,
      onProgress: (e) => setProgress(e.percentage),
      onSuccess: () => {
        setIsLoading(false);
        setProgress(0);
        setFile(null);
        toggleEdit();
      },
      onError: () => {
        setIsLoading(false);
        setProgress(0);
      }
    });
  };

  return (
    <div className="relative mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
      <div className="font-medium flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-x-2">
            Fotografía del curso
            {initialData.image_url ? (
                <div className="flex items-center justify-center rounded-none bg-brand px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">Completado</div>
            ) : (
                <div className="flex items-center justify-center rounded-none bg-red-500 px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">Incompleto</div>
            )}
        </div>
        <Button onClick={toggleEdit} variant={isEditing ? "destructive" : "outline"}
          className={isEditing 
            ? "rounded-none font-bold uppercase tracking-wider"
            : "border-brand text-brand bg-white hover:bg-brand hover:text-white rounded-none font-bold uppercase tracking-wider"}>
          {isEditing && <>Cancelar</>}
          {!isEditing && !initialData.image_url && (
            <><PlusCircle className="h-4 w-4 mr-2" /> Agregar imagen</>
          )}
          {!isEditing && initialData.image_url && (
            <><Pencil className="h-4 w-4 mr-2" /> Editar imagen</>
          )}
        </Button>
      </div>

      {!isEditing && (
        !initialData.image_url ? (
          <div className="flex items-center justify-center h-60 bg-brand-pale mt-2 rounded-none">
            <ImageIcon className="h-10 w-10 text-brand-ink" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <img
              alt="Upload"
              className="object-cover rounded-none w-full h-full"
              src={initialData.image_url}
            />
          </div>
        )
      )}

      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
           <CustomFileUpload
               id="course-image-upload"
               accept="image/*"
               file={file}
               onChange={(e) => setFile(e.target.files?.[0] || null)}
               isLoading={isLoading}
               progress={progress}
           />
           <Button disabled={!file || isLoading} type="submit" className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider">Guardar Imagen</Button>
           <div className="text-xs text-muted-foreground mt-4">
             Se recomienda una relación de aspecto de 16:9
           </div>
        </form>
      )}
    </div>
  );
};
