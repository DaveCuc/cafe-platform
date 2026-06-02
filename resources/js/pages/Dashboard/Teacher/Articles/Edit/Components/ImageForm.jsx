import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { Button } from "@/Components/ui/button";

export const ImageForm = ({ initialData, articleId, label = "Imagen", endpoint, field = "image_url" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    router.post(endpoint, {
      image: file,
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

  const currentImageUrl = initialData[field];

  return (
    <div className="relative mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
      <div className="font-medium flex flex-wrap items-center justify-between gap-2">
        {label}
        <Button onClick={toggleEdit} variant={isEditing ? "destructive" : "outline"}
          className={isEditing 
            ? "rounded-none font-bold uppercase tracking-wider"
            : "border-brand text-brand bg-white hover:bg-brand hover:text-white rounded-none font-bold uppercase tracking-wider"}>
          {isEditing && <>Cancelar</>}
          {!isEditing && !currentImageUrl && (
            <><PlusCircle className="h-4 w-4 mr-2" /> Agregar imagen</>
          )}
          {!isEditing && currentImageUrl && (
            <><Pencil className="h-4 w-4 mr-2" /> Editar imagen</>
          )}
        </Button>
      </div>

      {!isEditing && (
        !currentImageUrl ? (
          <div className="flex items-center justify-center h-60 bg-brand-pale mt-2 rounded-none">
            <ImageIcon className="h-10 w-10 text-brand-ink" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <img
              alt="Upload"
              className="object-cover rounded-none w-full h-full"
              src={currentImageUrl}
            />
          </div>

        )
      )}

      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
           <div className="relative flex items-center">
             <input 
                id={`file-upload-${field}`}
                type="file"
                accept="image/*"
                onChange={e => setFile(e.target.files[0])}
                   className="hidden"
             />
             <label htmlFor={`file-upload-${field}`} className="cursor-pointer bg-brand text-white px-4 py-2 hover:bg-brand-darker font-bold uppercase tracking-wider text-sm rounded-none border border-brand transition">
               Elegir archivo
             </label>
             <span className="ml-4 text-sm text-brand-ink">
               {file ? file.name : "Ningún archivo seleccionado"}
             </span>
           </div>
           <Button disabled={!file || isLoading} type="submit" className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider">Guardar Imagen</Button>
        </form>
      )}
    </div>
  );
};
