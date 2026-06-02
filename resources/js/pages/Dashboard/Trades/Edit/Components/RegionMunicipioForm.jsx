import React, { useMemo, useState } from "react";
import { router } from "@inertiajs/react";
import { Pencil } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";

export function RegionMunicipioForm({ initialData, tradeId, regions = [] }) {
    const [isEditing, setIsEditing] = useState(false);
    const [regionId, setRegionId] = useState(initialData.region_id || "");
    const [municipioId, setMunicipioId] = useState(initialData.municipio_id || "");
    const [isLoading, setIsLoading] = useState(false);

    const currentRegion = useMemo(
        () => regions.find((region) => region.id === regionId),
        [regions, regionId],
    );

    const municipios = currentRegion?.municipios || [];

    const toggleEdit = () => setIsEditing((current) => !current);

    const handleRegionChange = (value) => {
        setRegionId(value);
        setMunicipioId("");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        router.patch(
            `/directory/trades/${tradeId}`,
            {
                region_id: regionId,
                municipio_id: municipioId,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                    setIsEditing(false);
                },
                onError: () => setIsLoading(false),
            },
        );
    };

    return (
        <div className="relative mt-6 rounded-none border border-brand-soft bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between font-medium">
                <div className="flex items-center gap-x-2">
                    Ubicación geográfica
                    {(initialData.region_id || initialData.municipio_id) && (
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
                    {isEditing ? (
                        "Cancelar"
                    ) : (
                        <>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                        </>
                    )}
                </Button>
            </div>

            {!isEditing ? (
                <div className="mt-2 space-y-1 text-sm">
                    <p className={currentRegion ? "text-brand-text" : "italic text-brand-ink"}>
                        Región: {currentRegion?.name || "Sin definir"}
                    </p>
                    <p className={initialData.municipio ? "text-brand-text" : "italic text-brand-ink"}>
                        Municipio: {initialData.municipio?.name || "Sin definir"}
                    </p>
                    
                </div>
            ) : (
                <form onSubmit={onSubmit} className="mt-4 space-y-4">
                    <Select value={regionId} onValueChange={handleRegionChange}>
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Selecciona una región" />
                        </SelectTrigger>
                        <SelectContent>
                            {regions.map((region) => (
                                <SelectItem key={region.id} value={region.id}>
                                    {region.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={municipioId} onValueChange={setMunicipioId} disabled={!regionId}>
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Selecciona un municipio" />
                        </SelectTrigger>
                        <SelectContent>
                            {municipios.map((municipio) => (
                                <SelectItem key={municipio.id} value={municipio.id}>
                                    {municipio.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    
                    <Button type="submit" disabled={isLoading} className="rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider">
                        Guardar
                    </Button>
                </form>
            )}
        </div>
    );
}
