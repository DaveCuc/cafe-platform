import React, { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import { Pencil, PlusCircle, Video, Image as ImageIcon } from "lucide-react";
import { Button } from "@/Components/ui/button";

export const ChapterVideoForm = ({ initialData, courseId, chapterId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isVideoRequired, setIsVideoRequired] = useState(initialData.is_video_required ?? true);
  
  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    video: null,
  });

  const toggleEdit = () => {
    setIsEditing((current) => !current);
    if (isEditing) {
      reset();
      clearErrors();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!data.video) return;

    post(`/teacher/courses/${courseId}/chapters/${chapterId}/video`, {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        toggleEdit();
      },
    });
  };

  const onToggleVideoRequired = (e) => {
    const checked = e.target.checked;
    setIsVideoRequired(!checked); // Si checked=true (no incluir video), isRequired=false
    router.patch(`/teacher/courses/${courseId}/chapters/${chapterId}`, {
      is_video_required: !checked
    }, { preserveScroll: true });
  };

  return (
    <>
      <div className="mt-6 flex flex-row items-start space-x-3 rounded-md border p-4 bg-brand-pale">
        <input 
          type="checkbox"
          id="no_video_checkbox"
          checked={!isVideoRequired}
          onChange={onToggleVideoRequired}
          className="mt-1 h-4 w-4 text-brand-soft rounded border-brand-soft focus:ring-brand-soft cursor-pointer"
        />
        <div className="space-y-1 leading-none">
          <label htmlFor="no_video_checkbox" className="text-sm font-medium text-brand-text cursor-pointer">
            No incluir video
          </label>
        </div>
      </div>

      {isVideoRequired && (
        <div className="mt-4 border bg-brand-pale rounded-md p-4">
          <div className="font-medium flex items-center justify-between">
            Video del capítulo
            <Button onClick={toggleEdit} variant="ghost" className="bg-white hover:bg-brand-soft hover:text-white">
              {isEditing && <>Cancelar</>}
              {!isEditing && !initialData.video_url && (
                <><PlusCircle className="h-4 w-4 mr-2" /> Agregar video</>
              )}
              {!isEditing && initialData.video_url && (
                <><Pencil className="h-4 w-4 mr-2" /> Cambiar video</>
              )}
            </Button>
          </div>

          {!isEditing && (
            !initialData.video_url ? (
              <div className="flex items-center justify-center h-60 bg-brand-pale mt-2 rounded-md">
                <Video className="h-10 w-10 text-brand-ink" />
              </div>
            ) : (
              <div className="relative aspect-video mt-2">
                <video
                  controls
                  controlsList="nodownload"
                  preload="metadata"
                  className="object-cover rounded-md w-full h-full bg-black"
                  src={initialData.video_url}
                />
              </div>
            )
          )}

          {isEditing && (
            <form onSubmit={onSubmit} className="space-y-4 mt-4">
               {errors.video && <div className="text-red-600 text-sm font-semibold bg-red-100 p-2 rounded-md">{errors.video}</div>}
               <input 
                  type="file"
                  accept="video/mp4,video/x-m4v,video/*"
                  onChange={e => setData('video', e.target.files[0])}
                     className="w-full text-sm text-brand-ink file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-soft file:text-white hover:file:bg-brand-dark cursor-pointer"
               />
               <Button disabled={!data.video || processing} type="submit">Guardar Video</Button>
               <div className="text-xs text-muted-foreground mt-4">
                 Sube el video de este capítulo (MP4 recomendado).
               </div>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export const ChapterImageForm = ({ initialData, courseId, chapterId }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    image: null,
  });

  const toggleEdit = () => {
    setIsEditing((current) => !current);
    if (isEditing) {
      reset();
      clearErrors();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!data.image) return;

    post(`/teacher/courses/${courseId}/chapters/${chapterId}/image`, {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        toggleEdit();
      },
    });
  };

  return (
    <div className="mt-6 border bg-brand-pale rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Imagen del capítulo (Opcional)
        <Button onClick={toggleEdit} variant="ghost" className="bg-white hover:bg-brand-soft hover:text-white">
          {isEditing && <>Cancelar</>}
          {!isEditing && !initialData.image_url && (
            <><PlusCircle className="h-4 w-4 mr-2" /> Agregar imagen</>
          )}
          {!isEditing && initialData.image_url && (
            <><Pencil className="h-4 w-4 mr-2" /> Cambiar imagen</>
          )}
        </Button>
      </div>

      {!isEditing && (
        !initialData.image_url ? (
          <div className="flex items-center justify-center h-60 bg-brand-pale mt-2 rounded-md">
            <ImageIcon className="h-10 w-10 text-brand-ink" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <img
              alt="Imagen del capítulo"
              className="object-cover rounded-md w-full h-full"
              src={initialData.image_url}
            />
          </div>
        )
      )}

      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
           {errors.image && <div className="text-red-600 text-sm font-semibold bg-red-100 p-2 rounded-md">{errors.image}</div>}
           <input 
              type="file"
              accept="image/*"
              onChange={e => setData('image', e.target.files[0])}
                 className="w-full text-sm text-brand-ink file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-soft file:text-white hover:file:bg-brand-dark cursor-pointer"
           />
           <Button disabled={!data.image || processing} type="submit">Guardar Imagen</Button>
        </form>
      )}
    </div>
  );
};
