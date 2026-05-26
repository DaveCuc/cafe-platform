import React, { useMemo, useState } from "react";
import { router } from "@inertiajs/react";
import { Check, ChevronDown, Pencil, Search } from "lucide-react";

import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";

export function GirosDigitalForm({ initialData, tradeId, giros = [] }) {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedGiroIds, setSelectedGiroIds] = useState(
        initialData.giros?.map((giro) => giro.id) || [],
    );
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const selectedGiros = useMemo(
        () => giros.filter((giro) => selectedGiroIds.includes(giro.id)),
        [giros, selectedGiroIds],
    );

    const toggleEdit = () => setIsEditing((current) => !current);

    const toggleGiro = (giroId) => {
        setSelectedGiroIds((current) =>
            current.includes(giroId)
                ? current.filter((id) => id !== giroId)
                : [...current, giroId],
        );
    };

    const filteredGiros = giros.filter((giro) =>
        giro.name.toLowerCase().includes(search.toLowerCase()),
    );

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        router.patch(
            `/directory/trades/${tradeId}`,
            {
                giro_ids: selectedGiroIds,
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
        <div className="mt-6 rounded-md border bg-brand-pale p-4">
            <div className="flex items-center justify-between font-medium">
                Giro
                <Button onClick={toggleEdit} variant="ghost" className="bg-white hover:bg-brand-soft hover:text-white">
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
                <div className="mt-2 space-y-3 text-sm">
                    <div className="flex flex-wrap gap-2">
                        {selectedGiros.length ? (
                            selectedGiros.map((giro) => (
                                <Badge key={giro.id} className="bg-brand-text text-white">
                                    {giro.name}
                                </Badge>
                            ))
                        ) : (
                            <span className="italic text-brand-ink">Sin giros seleccionados</span>
                        )}
                    </div>
                </div>
            ) : (
                <form onSubmit={onSubmit} className="mt-4 space-y-4">
                    <div className="relative">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen((current) => !current)}
                            className="w-full justify-between bg-white"
                        >
                            {selectedGiros.length
                                ? `${selectedGiros.length} giro(s) seleccionado(s)`
                                : "Selecciona uno o más giros"}
                            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>

                        {open && (
                            <div className="absolute z-20 mt-2 w-full rounded-md border bg-white p-3 shadow-lg">
                                <div className="mb-3 flex items-center gap-2 rounded-md border px-3">
                                    <Search className="h-4 w-4 text-brand-ink opacity-50" />
                                    <Input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Buscar giro..."
                                        className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                                    />
                                </div>

                                <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                                    {filteredGiros.length ? (
                                        filteredGiros.map((giro) => {
                                            const isSelected = selectedGiroIds.includes(giro.id);

                                            return (
                                                    <div
                                                    key={giro.id}
                                                    onClick={() => toggleGiro(giro.id)}
                                                        className="flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-left text-sm hover:bg-brand-pale"
                                                >
                                                        <span
                                                            className={cn(
                                                                "flex h-4 w-4 items-center justify-center rounded-sm border",
                                                                isSelected && "border-brand-text bg-brand-text text-white",
                                                            )}
                                                        >
                                                            {isSelected ? <Check className="h-3 w-3" /> : null}
                                                        </span>
                                                    <span>{giro.name}</span>
                                                    </div>
                                            );
                                        })
                                    ) : (
                                        <p className="py-6 text-center text-sm text-brand-ink">
                                            No hay coincidencias.
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {selectedGiros.map((giro) => (
                            <Badge key={giro.id} className="bg-brand-soft text-white">
                                {giro.name}
                            </Badge>
                        ))}
                    </div>

                    <Button type="submit" disabled={isLoading}>
                        Guardar
                    </Button>
                </form>
            )}
        </div>
    );
}
