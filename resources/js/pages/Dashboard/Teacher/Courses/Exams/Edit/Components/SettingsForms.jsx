import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Pencil, Loader2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Checkbox } from "@/Components/ui/checkbox";

export const TitleForm = ({ initialData, courseId, examId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialData?.title || "");
    const [isUpdating, setIsUpdating] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsUpdating(true);
        router.patch(`/teacher/courses/${courseId}/exams/${examId}`, { title }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsUpdating(false);
                toggleEdit();
            },
            onError: () => setIsUpdating(false)
        });
    }

    return (
        <div className="relative mt-6 border bg-brand-pale rounded-md p-4">
            {isUpdating && <div className="absolute h-full w-full bg-brand-pale/40 top-0 right-0 rounded-md flex items-center justify-center z-10"><Loader2 className="animate-spin h-6 w-6 text-brand-soft" /></div>}
            <div className="font-medium flex items-center justify-between">
                Título del examen
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2" /> Editar</>}
                </Button>
            </div>
            {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
            {isEditing && (
                <form onSubmit={onSubmit} className="space-y-4 mt-4">
                    <Input disabled={isUpdating} value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <Button disabled={!title || isUpdating} type="submit">Guardar</Button>
                </form>
            )}
        </div>
    )
}

export const DescriptionForm = ({ initialData, courseId, examId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(initialData?.description || "");
    const [isUpdating, setIsUpdating] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsUpdating(true);
        router.patch(`/teacher/courses/${courseId}/exams/${examId}`, { description }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsUpdating(false);
                toggleEdit();
            },
            onError: () => setIsUpdating(false)
        });
    }

    return (
        <div className="relative mt-6 border bg-brand-pale rounded-md p-4">
            {isUpdating && <div className="absolute h-full w-full bg-brand-pale/40 top-0 right-0 rounded-md flex items-center justify-center z-10"><Loader2 className="animate-spin h-6 w-6 text-brand-soft" /></div>}
            <div className="font-medium flex items-center justify-between">
                Descripción del examen (Max. 200 caracteres)
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2" /> Editar</>}
                </Button>
            </div>
            {!isEditing && <p className="text-sm mt-2">{initialData.description || "Sin descripción"}</p>}
            {isEditing && (
                <form onSubmit={onSubmit} className="space-y-4 mt-4">
                    <Textarea disabled={isUpdating} value={description} onChange={(e) => setDescription(e.target.value)}
                        maxLength={200}
                        required />
                    <div className="text-xs text-brand-ink flex justify-end">
                        {description.length}/200
                    </div>
                    <Button disabled={!description || description.length > 200 || isUpdating} type="submit">Guardar</Button>
                </form>
            )}
        </div>
    )
}

export const SettingsForm = ({ initialData, courseId, examId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const [minScore, setMinScore] = useState(initialData?.min_score ?? 80);
    
    // Separamos el estado para saber si es ilimitado (0 en bd)
    const isInitiallyUnlimited = initialData?.attempts_allowed === 0;
    const [isUnlimited, setIsUnlimited] = useState(isInitiallyUnlimited);
    
    // Si era 0, mostramos un 1 por defecto en el input para cuando desmarquen la casilla
    const [attemptsAllowed, setAttemptsAllowed] = useState(
        isInitiallyUnlimited ? 1 : (initialData?.attempts_allowed ?? 1)
    );

    const toggleEdit = () => {
        // Si cancelamos, revertimos a los valores originales
        if (isEditing) {
            setMinScore(initialData?.min_score ?? 80);
            const initialUnlimited = initialData?.attempts_allowed === 0;
            setIsUnlimited(initialUnlimited);
            setAttemptsAllowed(initialUnlimited ? 1 : (initialData?.attempts_allowed ?? 1));
        }
        setIsEditing((current) => !current);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setIsUpdating(true);

        router.patch(
            `/teacher/courses/${courseId}/exams/${examId}`,
            {
                min_score: Number(minScore),
                // Si está marcado ilimitado, forzamos el 0. Si no, enviamos el número (1 al 10)
                attempts_allowed: isUnlimited ? 0 : Number(attemptsAllowed)
            }, 
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsUpdating(false);
                    toggleEdit();
                },
                onError: () => setIsUpdating(false)
            }
        );
    }

    return (
        <div className="relative mt-6 border bg-brand-pale rounded-md p-4">
            {isUpdating && (
                <div className="absolute h-full w-full bg-brand-pale/40 top-0 left-0 rounded-md flex items-center justify-center z-10">
                    <Loader2 className="animate-spin h-6 w-6 text-brand-soft" />
                </div>
            )}
            <div className="font-medium flex items-center justify-between">
                Opciones de calificación
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2" /> Editar</>}
                </Button>
            </div>

            {!isEditing && (
                <div className="text-sm mt-2 flex flex-col gap-2">
                    <p>
                        <strong>Puntuación mínima:</strong> {initialData.min_score ?? 80}%
                    </p>
                    <p>
                        <strong>Intentos permitidos:</strong> {initialData.attempts_allowed === 0 ? "Ilimitados" : initialData.attempts_allowed}
                    </p>
                </div>
            )}

            {isEditing && (
                <form onSubmit={onSubmit} className="space-y-4 mt-4">
                    <div>
                        <label className="text-xs font-semibold mb-1 block">Puntuación mínima (0 - 100)</label>
                        <Input 
                            type="number" 
                            min="0" 
                            max="100" 
                            disabled={isUpdating} 
                            value={minScore} 
                            onChange={(e) => setMinScore(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    <div>
                        <label className="text-xs font-semibold mb-2 block">Límite de intentos permitidos</label>
                        <div className="flex items-center gap-4">
                            {/* Input numérico bloqueado a 1-10, y se desactiva si es ilimitado */}
                            <Input 
                                type="number"
                                min="1"
                                max="10"
                                disabled={isUpdating || isUnlimited}
                                value={isUnlimited ? "" : attemptsAllowed}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setAttemptsAllowed(val === "" ? "" : Number(val));
                                }}
                                required={!isUnlimited}
                                className="w-24"
                                placeholder={isUnlimited ? "∞" : "1"}
                            />
                            
                            {/* Componente Checkbox (adaptado al estándar de Shadcn/Radix UI) */}
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="unlimited" 
                                    checked={isUnlimited} 
                                    onCheckedChange={(checked) => setIsUnlimited(checked)}
                                    disabled={isUpdating}
                                />
                                <label 
                                    htmlFor="unlimited" 
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                    Intentos ilimitados
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <Button disabled={isUpdating} type="submit">Guardar</Button>
                </form>
            )}
        </div>
    )
}
