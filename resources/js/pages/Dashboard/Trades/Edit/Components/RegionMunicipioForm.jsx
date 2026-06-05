import React, { useMemo, useState } from "react";
import { router } from "@inertiajs/react";
import { Pencil } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Combobox } from "@/Components/ui/combobox";

export function RegionMunicipioForm({ initialData, tradeId, regions = [] }) {
    const [isEditing, setIsEditing] = useState(false);
    const [regionId, setRegionId] = useState(initialData.region_id || "");
    const [municipioId, setMunicipioId] = useState(initialData.municipio_id || "");
    const [isLoading, setIsLoading] = useState(false);

    const currentRegion = useMemo(
        () => regions.find((region) => region.id === regionId),
        [regions, regionId],
    );

    const currentMunicipio = useMemo(
        () => currentRegion?.municipios?.find(m => m.id === municipioId),
        [currentRegion, municipioId]
    );

    // Flatten all municipalities to create options for the Combobox
    const allMunicipiosOptions = useMemo(() => {
        const options = [];
        regions.forEach(region => {
            if (region.municipios) {
                region.municipios.forEach(municipio => {
                    options.push({
                        label: municipio.name,
                        value: municipio.id,
                        regionId: region.id
                    });
                });
            }
        });
        // Optionally sort alphabetically
        return options.sort((a, b) => a.label.localeCompare(b.label));
    }, [regions]);

    const toggleEdit = () => setIsEditing((current) => !current);

    const handleMunicipioChange = (selectedMunicipioId) => {
        setMunicipioId(selectedMunicipioId);
        
        // Find which region this municipio belongs to
        const found = allMunicipiosOptions.find(opt => opt.value === selectedMunicipioId);
        if (found) {
            setRegionId(found.regionId);
        } else {
            setRegionId("");
        }
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
            <div className="font-medium flex flex-wrap items-center justify-between gap-2">
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
                    <p className={initialData.municipio ? "text-brand-text" : "italic text-brand-ink"}>
                        Municipio: {initialData.municipio?.name || "Sin definir"}
                    </p>
                    <p className={currentRegion ? "text-brand-text" : "italic text-brand-ink"}>
                        Región: {currentRegion?.name || "Sin definir"}
                    </p>
                </div>
            ) : (
                <form onSubmit={onSubmit} className="mt-4 space-y-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-brand-dark">Escoge tu municipio</label>
                        <Combobox
                        options={allMunicipiosOptions}
                        value={municipioId}
                        onChange={handleMunicipioChange}
                        buttonPlaceholder="Selecciona o busca un municipio..."
                        searchPlaceholder="Buscar municipio por nombre..."
                    />
                    </div>

                    {currentRegion && (
                        <p className="text-sm text-brand-ink italic">
                            Región asignada automáticamente: <span className="font-medium text-brand-text">{currentRegion.name}</span>
                        </p>
                    )}
                    <Button type="submit" disabled={isLoading} className="w-full md:w-auto rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider">
                        Guardar
                    </Button>
                </form>
            )}
        </div>
    );
}
