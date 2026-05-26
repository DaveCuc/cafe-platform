import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { ImageIcon, PlusCircle, Trash2 } from "lucide-react";

import { Button } from "@/Components/ui/button";

const GALLERY_LIMIT = 10;

export function ContentGalleryForm({ initialData, tradeId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const gallery = initialData.gallery_images || [];
    const remainingSlots = Math.max(GALLERY_LIMIT - gallery.length, 0);

    const onUpload = (e) => {
        e.preventDefault();

        if (!files.length || !remainingSlots) {
            return;
        }

        setIsLoading(true);

        const nextFiles = files.slice(0, remainingSlots);
        const formData = new FormData();

        nextFiles.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });

        router.post(
            `/directory/trades/${tradeId}/gallery-image`,
            formData,
            {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    setFiles([]);
                    setIsLoading(false);
                },
                onError: () => setIsLoading(false),
            },
        );
    };

    const onDelete = (imageUrl) => {
        setIsLoading(true);

        router.delete(`/directory/trades/${tradeId}/gallery-image`, {
            data: { image_url: imageUrl },
            preserveScroll: true,
            onSuccess: () => setIsLoading(false),
            onError: () => setIsLoading(false),
        });
    };

    return (
        <div className="mt-6 rounded-md border bg-brand-pale p-4">
            <div className="flex items-center justify-between font-medium">
                Fotografías del negocio
                <Button onClick={() => setIsEditing((current) => !current)} variant="ghost" className="bg-white hover:bg-brand-soft hover:text-white">
                    {isEditing ? "Cerrar" : <><PlusCircle className="mr-2 h-4 w-4" />Gestionar</>}
                </Button>
            </div>

            <p className="mt-2 text-xs text-brand-ink">Límite de 10 fotografías ({gallery.length}/{GALLERY_LIMIT}).</p>
            {!!files.length && (
                <p className="mt-1 text-xs text-brand-ink">Seleccionadas: {files.length} fotografía{files.length === 1 ? "" : "s"}.</p>
            )}

            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                {gallery.length ? (
                    gallery.map((imageUrl) => (
                        <div key={imageUrl} className="relative overflow-hidden rounded-md border bg-white">
                            <img src={imageUrl} alt="Contenido del negocio" className="h-28 w-full object-cover" />
                            {isEditing && (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute right-2 top-2"
                                    onClick={() => onDelete(imageUrl)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex h-28 items-center justify-center rounded-md border bg-white text-sm text-brand-ink">
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Sin fotografías de contenido
                    </div>
                )}
            </div>

            {isEditing && (
                <form onSubmit={onUpload} className="mt-4 space-y-3">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setFiles(Array.from(e.target.files || []))}
                        className="w-full cursor-pointer text-sm text-brand-ink file:mr-4 file:rounded-md file:border-0 file:bg-brand-soft file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-dark"
                    />
                    <Button disabled={!files.length || isLoading || !remainingSlots} type="submit">
                        Subir fotografía{files.length > 1 ? "s" : ""}
                    </Button>
                </form>
            )}
        </div>
    );
}
