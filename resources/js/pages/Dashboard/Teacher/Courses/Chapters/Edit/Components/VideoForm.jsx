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
      <div className="relative mt-6 flex flex-row items-start space-x-3 rounded-none border border-brand-soft p-4 bg-white shadow-sm">
        <input 
          type="checkbox"
          id="no_video_checkbox"
          checked={!isVideoRequired}
          onChange={onToggleVideoRequired}
          className="mt-1 h-4 w-4 text-brand rounded-none border-brand focus:ring-brand cursor-pointer"
        />
        <div className="space-y-1 leading-none">
          <label htmlFor="no_video_checkbox" className="text-sm font-medium text-brand-text cursor-pointer">
            No incluir video
          </label>
        </div>
      </div>

      {isVideoRequired && (
        <div className="relative mt-4 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
          <div className="font-medium flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-x-2">
                Video del capítulo
                {initialData.video_url ? (
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
              <div className="flex items-center justify-center h-60 bg-white border border-brand-soft mt-2 rounded-none">
                <Video className="h-10 w-10 text-brand-ink" />
              </div>
            ) : (
              <div className="relative aspect-video mt-2">
                <video
                  controls
                  controlsList="nodownload"
                  preload="metadata"
                  className="object-cover rounded-none w-full h-full bg-black"
                  src={initialData.video_url}
                />
              </div>
            )
          )}

          {isEditing && (
            <form onSubmit={onSubmit} className="space-y-4 mt-4">
               {errors.video && <div className="text-red-600 text-sm font-semibold bg-red-100 p-2 rounded-none">{errors.video}</div>}
               <div className="relative flex items-center">
                 <input 
                    id="file-upload-video"
                    type="file"
                    accept="video/mp4,video/x-m4v,video/*"
                    onChange={e => setData('video', e.target.files[0])}
                       className="hidden"
                 />
                 <label htmlFor="file-upload-video" className="cursor-pointer bg-brand text-white px-4 py-2 hover:bg-brand-darker font-bold uppercase tracking-wider text-sm rounded-none border border-brand transition">
                   Elegir archivo
                 </label>
                 <span className="ml-4 text-sm text-brand-ink">
                   {data.video ? data.video.name : "Ningún archivo seleccionado"}
                 </span>
               </div>
               <Button disabled={!data.video || processing} type="submit" className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider">Guardar Video</Button>
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
    <div className="relative mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
      <div className="font-medium flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-x-2">
            Imagen del capítulo (Opcional)
            {initialData.image_url ? (
                <div className="flex items-center justify-center rounded-none bg-brand px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">Completado</div>
            ) : null}
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
            <><Pencil className="h-4 w-4 mr-2" /> Cambiar imagen</>
          )}
        </Button>
      </div>

      {!isEditing && (
        !initialData.image_url ? (
          <div className="flex items-center justify-center h-60 bg-white border border-brand-soft mt-2 rounded-none">
            <ImageIcon className="h-10 w-10 text-brand-ink" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <img
              alt="Imagen del capítulo"
              className="object-cover rounded-none w-full h-full"
              src={initialData.image_url}
            />
          </div>
        )
      )}

      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
           {errors.image && <div className="text-red-600 text-sm font-semibold bg-red-100 p-2 rounded-none">{errors.image}</div>}
           <div className="relative flex items-center">
             <input 
                id="file-upload-image"
                type="file"
                accept="image/*"
                onChange={e => setData('image', e.target.files[0])}
                   className="hidden"
             />
             <label htmlFor="file-upload-image" className="cursor-pointer bg-brand text-white px-4 py-2 hover:bg-brand-darker font-bold uppercase tracking-wider text-sm rounded-none border border-brand transition">
               Elegir archivo
             </label>
             <span className="ml-4 text-sm text-brand-ink">
               {data.image ? data.image.name : "Ningún archivo seleccionado"}
             </span>
           </div>
           <Button disabled={!data.image || processing} type="submit" className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider">Guardar Imagen</Button>
        </form>
      )}
    </div>
  );
};
