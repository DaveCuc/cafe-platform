import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";

import { Button } from "@/Components/ui/button";

export const ImageForm = ({ initialData, tradeId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!file) return;

        setIsLoading(true);

        router.post(
            `/directory/trades/${tradeId}/image`,
            { image: file },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                    setFile(null);
                    toggleEdit();
                },
                onError: () => setIsLoading(false),
            },
        );
    };

    return (
        <div className="relative mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between font-medium">
                <div className="flex items-center gap-x-2">
                    Foto del negocio
                    {initialData.image_url && (
                        <div className="flex items-center justify-center rounded-none bg-brand px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
                            Completado
                        </div>
                    )}
                </div>
                <Button 
                    onClick={toggleEdit} 
                    variant={isEditing ? "destructive" : "outline"}
                    className={isEditing 
                        ? "rounded-none font-bold uppercase tracking-wider" 
                        : "border-brand text-brand bg-white hover:bg-brand hover:text-white rounded-none font-bold uppercase tracking-wider"}
                >
                    {isEditing && <>Cancelar</>}
                    {!isEditing && !initialData.image_url && (
                        <>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Agregar imagen
                        </>
                    )}
                    {!isEditing && initialData.image_url && (
                        <>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar imagen
                        </>
                    )}
                </Button>
            </div>

            {!isEditing &&
                (!initialData.image_url ? (
                    <div className="mt-2 flex h-60 items-center justify-center rounded-none bg-brand-pale">
                        <ImageIcon className="h-10 w-10 text-brand-ink" />
                    </div>
                ) : (
                    <div className="relative mt-2 aspect-video">
                        <img
                            alt="Negocio"
                            className="h-full w-full rounded-none object-cover"
                            src={initialData.image_url}
                        />
                    </div>
                ))}

            {isEditing && (
                <form onSubmit={onSubmit} className="mt-4 space-y-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full cursor-pointer text-sm text-brand-ink file:mr-4 file:rounded-none file:border-0 file:bg-brand-soft file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-dark"
                    />
                    <Button disabled={!file || isLoading} type="submit" className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider">
                        Guardar imagen
                    </Button>
                    <div className="mt-4 text-xs text-muted-foreground">
                        Se recomienda una relación de aspecto de 16:9
                    </div>
                </form>
            )}
        </div>
    );
};
