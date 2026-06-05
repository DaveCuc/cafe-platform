import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { PlusCircle, FileBadge, Trash, FileText, Image as ImageIcon } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { CustomFileUpload } from "@/Components/CustomFileUpload";
import { Label } from "@/Components/ui/label";

export const CertificateForm = ({ initialData, tradeId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [issuedAt, setIssuedAt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const certificates = initialData.certificates || [];

    const toggleEdit = () => {
        setIsEditing((current) => !current);
        if (isEditing) {
            setFile(null);
            setName("");
            setIssuedAt("");
            setProgress(0);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!file || !name) return;

        setIsLoading(true);

        router.post(
            `/directory/trades/${tradeId}/certificates`,
            { name, issued_at: issuedAt, file },
            {
                preserveScroll: true,
                onProgress: (e) => setProgress(e.percentage),
                onSuccess: () => {
                    setIsLoading(false);
                    toggleEdit();
                },
                onError: () => {
                    setIsLoading(false);
                    setProgress(0);
                },
            },
        );
    };

    const onDelete = (certificateId) => {
        if (!confirm("¿Estás seguro de que deseas eliminar este certificado?")) return;

        setIsLoading(true);
        router.delete(`/directory/trades/${tradeId}/certificates/${certificateId}`, {
            preserveScroll: true,
            onSuccess: () => setIsLoading(false),
            onError: () => setIsLoading(false),
        });
    };

    return (
        <div className="relative mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
            <div className="font-medium flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-x-2">
                    Certificados
                    {certificates.length > 0 && (
                        <div className="flex items-center justify-center rounded-none bg-brand px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
                            {certificates.length} Agregado(s)
                        </div>
                    )}
                </div>
                <Button 
                    onClick={toggleEdit} 
                    variant={isEditing ? "destructive" : "outline"}
                    className={isEditing 
                        ? "w-full md:w-auto rounded-none font-bold uppercase tracking-wider" 
                        : "w-full md:w-auto border-brand text-brand bg-white hover:bg-brand hover:text-white rounded-none font-bold uppercase tracking-wider"}
                >
                    {isEditing ? (
                        <>Cancelar</>
                    ) : (
                        <>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Agregar certificado
                        </>
                    )}
                </Button>
            </div>

            {!isEditing && (
                <div className="mt-4">
                    {certificates.length === 0 && (
                        <div className="flex h-32 items-center justify-center rounded-none bg-brand-pale text-brand-ink italic text-sm">
                            No hay certificados agregados
                        </div>
                    )}
                    {certificates.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {certificates.map((cert) => (
                                <div key={cert.id} className="relative flex items-center justify-between border border-brand-soft bg-brand-pale/50 p-3 shadow-sm group">
                                    <div className="flex items-center gap-x-3 overflow-hidden">
                                        <div className="flex-shrink-0 h-10 w-10 bg-white border border-brand-soft flex items-center justify-center text-brand">
                                            {cert.file_url.endsWith('.pdf') ? <FileText size={20} /> : <ImageIcon size={20} />}
                                        </div>
                                        <div className="flex flex-col truncate">
                                            <span className="text-sm font-semibold text-brand-text truncate">{cert.name}</span>
                                            {cert.issued_at && (
                                                <span className="text-xs text-brand-ink">{new Date(cert.issued_at).toLocaleDateString('es-ES')}</span>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => onDelete(cert.id)}
                                        disabled={isLoading}
                                        className="ml-2 p-2 text-red-500 hover:bg-red-100 transition-colors rounded-none"
                                        title="Eliminar certificado"
                                    >
                                        <Trash className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {isEditing && (
                <form onSubmit={onSubmit} className="mt-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="cert-name">Nombre del Certificado</Label>
                        <Input
                            id="cert-name"
                            disabled={isLoading}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ej. Distintivo M, ISO 9001..."
                            className="bg-white rounded-none"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cert-date">Fecha de Emisión (Opcional)</Label>
                        <Input
                            id="cert-date"
                            type="date"
                            disabled={isLoading}
                            value={issuedAt}
                            onChange={(e) => setIssuedAt(e.target.value)}
                            className="bg-white rounded-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Archivo (PDF o Imagen)</Label>
                        <CustomFileUpload
                            id="certificate-upload"
                            accept="image/*,.pdf"
                            file={file}
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            isLoading={isLoading}
                            progress={progress}
                        />
                    </div>
                    <Button disabled={!file || !name || isLoading} type="submit" className="w-full md:w-auto rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider">
                        Guardar Certificado
                    </Button>
                </form>
            )}
        </div>
    );
};
